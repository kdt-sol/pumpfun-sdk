import { type Address, type TransactionSigner, appendTransactionMessageInstruction, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import type { BondingCurve, Global } from '../accounts'
import { calculateSolOut, getAssociatedTokenAddress, getMinSolOut } from '../utils'
import { getSellInstructionParams } from '../params'
import { getSellInstruction } from '../instructions'

export interface CreateSellTransactionParams {
    mint: Address
    bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves'>
    global: Pick<Global, 'feeBasisPoints'>
    user: TransactionSigner
    amount: bigint
    slippage: number
}

export async function createSellTransaction({ mint, bondingCurve, global, user, amount, slippage }: CreateSellTransactionParams) {
    const solOut = calculateSolOut(bondingCurve, amount, global.feeBasisPoints)
    const minSolOutput = getMinSolOut(solOut, slippage)
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)
    const params = await getSellInstructionParams({ mint, amount, user, minSolOutput, tokenAccount })

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => appendTransactionMessageInstruction(getSellInstruction(params), message),
    )
}
