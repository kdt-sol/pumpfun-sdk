import { getCreateAssociatedTokenInstruction } from '@solana-program/token'
import { type Address, type Instruction, appendTransactionMessageInstructions, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getBuyInstructionParams } from '../params'
import { calculateTokenOut, createExtendAccountInstruction, getAssociatedTokenAddress, getMarketCapInLamports, getMaxSolCost, isLegacyBondingCurve } from '../utils'
import { getBuyInstruction } from '../generated'
import type { CreateTradeTransactionParams } from './types'
import { getFeeInfo } from './utils'

export interface CreateBuyTransactionParams extends CreateTradeTransactionParams {
    tokenAccounts: Address[]
}

export async function createBuyTransaction({ mint, bondingCurve, user, tokenAccounts, amount, slippage, feeRecipient, feeConfig, global, supply }: CreateBuyTransactionParams) {
    const instructions: Instruction[] = []
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)
    const isLegacy = isLegacyBondingCurve(bondingCurve)

    if (!tokenAccounts.includes(tokenAccount)) {
        instructions.push(getCreateAssociatedTokenInstruction({ mint, owner: user.address, ata: tokenAccount, payer: user }))
    }

    const marketCap = supply ? getMarketCapInLamports(bondingCurve, supply) : undefined
    const feeInfo = getFeeInfo(global, feeConfig, marketCap)

    const tokenOut = calculateTokenOut(bondingCurve, amount, feeInfo)
    const maxSolCost = getMaxSolCost(amount, slippage)

    const params = await getBuyInstructionParams({
        mint,
        user,
        tokenAccount,
        amount: tokenOut,
        maxSolCost,
        feeRecipient,
        creator: bondingCurve.creator,
    })

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
