import { getCreateAssociatedTokenInstruction } from '@solana-program/token'
import { type Address, type IInstruction, appendTransactionMessageInstructions, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getBuyInstructionParams } from '../params'
import { calculateTokenOut, createExtendAccountInstruction, getAssociatedTokenAddress, getCreatorFeeBasisPoints, getMaxSolCost, isLegacyBondingCurve } from '../utils'
import { getBuyInstruction } from '../generated'
import type { CreateTradeTransactionParams } from './types'

export interface CreateBuyTransactionParams extends CreateTradeTransactionParams {
    tokenAccounts: Address[]
}

export async function createBuyTransaction({ mint, bondingCurve, user, tokenAccounts, amount, slippage, feeRecipient, global }: CreateBuyTransactionParams) {
    const instructions: IInstruction[] = []
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)
    const isLegacy = isLegacyBondingCurve(bondingCurve)

    if (!tokenAccounts.includes(tokenAccount)) {
        instructions.push(getCreateAssociatedTokenInstruction({ mint, owner: user.address, ata: tokenAccount, payer: user }))
    }

    const tokenOut = calculateTokenOut(bondingCurve, amount, global.feeBasisPoints, getCreatorFeeBasisPoints(global, isLegacy))
    const maxSolCost = getMaxSolCost(amount, slippage)
    const params = await getBuyInstructionParams({ mint, user, tokenAccount, amount: tokenOut, maxSolCost, feeRecipient, creator: bondingCurve.creator })

    if (isLegacy) {
        instructions.push(createExtendAccountInstruction(user, params.bondingCurve))
    }

    instructions.push(getBuyInstruction(params))

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => appendTransactionMessageInstructions(instructions, message),
    )
}
