import { appendTransactionMessageInstruction, createTransactionMessage, pipe, setTransactionMessageFeePayer } from '@solana/kit'
import { getSellInstructionParams } from '../params'
import { calculateSolOut, createExtendAccountInstruction, getAssociatedTokenAddress, getMarketCapInLamports, getMinSolOut, isLegacyBondingCurve } from '../utils'
import { getSellInstruction } from '../generated'
import type { CreateTradeTransactionParams } from './types'
import { getFeeInfo } from './utils'

export type CreateSellTransactionParams = CreateTradeTransactionParams

export async function createSellTransaction({ mint, bondingCurve, global, user, amount, slippage, feeRecipient, feeConfig, supply }: CreateSellTransactionParams) {
    const isLegacy = isLegacyBondingCurve(bondingCurve)

    const marketCap = supply ? getMarketCapInLamports(bondingCurve, supply) : undefined
    const feeInfo = getFeeInfo(global, feeConfig, marketCap)

    const solOut = calculateSolOut(bondingCurve, amount, feeInfo)
    const minSolOutput = getMinSolOut(solOut, slippage)
    const tokenAccount = await getAssociatedTokenAddress(mint, user.address)
    const params = await getSellInstructionParams({ mint, amount, user, minSolOutput, tokenAccount, feeRecipient, creator: bondingCurve.creator })

    return pipe(
        createTransactionMessage({ version: 'legacy' }),
        (message) => setTransactionMessageFeePayer(user.address, message),
        (message) => (isLegacy ? appendTransactionMessageInstruction(createExtendAccountInstruction(user, params.bondingCurve), message) : message),
        (message) => appendTransactionMessageInstruction(getSellInstruction(params), message),
    )
}
