import { appendTransactionMessageInstruction, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getSellInstructionParams } from '../params'
import { calculateSolOut, getAssociatedTokenAddress, getMinSolOut } from '../utils'
import { type Global, getSellInstruction } from '../generated'
import type { CreateTradeTransactionParams } from './types'

export interface CreateSellTransactionParams extends CreateTradeTransactionParams {
    global: Pick<Global, 'feeBasisPoints'>
}

export async function createSellTransaction({ mint, bondingCurve, global, user, amount, slippage, feeRecipient }: CreateSellTransactionParams) {
    const solOut = calculateSolOut(bondingCurve, amount, global.feeBasisPoints)
    const minSolOutput = getMinSolOut(solOut, slippage)
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)
    const params = await getSellInstructionParams({ mint, amount, user, minSolOutput, tokenAccount, feeRecipient })

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => appendTransactionMessageInstruction(getSellInstruction(params), message),
    )
}
