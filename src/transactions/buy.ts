import { getCreateAssociatedTokenInstruction } from '@solana-program/token'
import { type Address, type IInstruction, appendTransactionMessageInstructions, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getBuyInstructionParams } from '../params'
import { calculateTokenOut, getAssociatedTokenAddress, getMaxSolCost } from '../utils'
import { getBuyInstruction } from '../generated'
import type { CreateTradeTransactionParams } from './types'

export interface CreateBuyTransactionParams extends CreateTradeTransactionParams {
    tokenAccounts: Address[]
}

export async function createBuyTransaction({ mint, bondingCurve, user, tokenAccounts, amount, slippage, feeRecipient }: CreateBuyTransactionParams) {
    const instructions: IInstruction[] = []
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)

    if (!tokenAccounts.includes(tokenAccount)) {
        instructions.push(getCreateAssociatedTokenInstruction({ mint, owner: user.address, ata: tokenAccount, payer: user }))
    }

    const tokenOut = calculateTokenOut(bondingCurve, amount)
    const maxSolCost = getMaxSolCost(amount, slippage)
    const params = await getBuyInstructionParams({ mint, user, tokenAccount, amount: tokenOut, maxSolCost, feeRecipient })

    instructions.push(getBuyInstruction(params))

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => appendTransactionMessageInstructions(instructions, message),
    )
}
