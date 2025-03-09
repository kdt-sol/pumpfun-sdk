import { type Address, type IInstruction, type TransactionSigner, appendTransactionMessageInstructions, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getCreateAssociatedTokenInstruction } from '@solana-program/token'
import type { BondingCurve } from '../accounts'
import { calculateTokenOut, getAssociatedTokenAddress, getMaxSolCost } from '../utils'
import { getBuyInstructionParams } from '../params'
import { getBuyInstruction } from '../instructions'

export interface CreateBuyTransactionParams {
    mint: Address
    bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>
    user: TransactionSigner
    tokenAccounts: Address[]
    amount: bigint
    slippage: number
}

export async function createBuyTransaction({ mint, bondingCurve, user, tokenAccounts, amount, slippage }: CreateBuyTransactionParams) {
    const instructions: IInstruction[] = []
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)

    if (!tokenAccounts.includes(tokenAccount)) {
        instructions.push(getCreateAssociatedTokenInstruction({ mint, owner: user.address, ata: tokenAccount, payer: user }))
    }

    const tokenOut = calculateTokenOut(bondingCurve, amount)
    const maxSolCost = getMaxSolCost(amount, slippage)
    const params = await getBuyInstructionParams({ mint, user, tokenAccount, amount: tokenOut, maxSolCost })

    instructions.push(getBuyInstruction(params))

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => appendTransactionMessageInstructions(instructions, message),
    )
}
