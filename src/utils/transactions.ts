import { type BaseTransactionMessage, prependTransactionMessageInstructions } from '@solana/kit'
import { getSetComputeUnitLimitInstruction, getSetComputeUnitPriceInstruction } from '@solana-program/compute-budget'
import { MICRO_LAMPORTS_PER_LAMPORT } from '../constants'

export interface PriorityFee {
    units: number
    lamports: bigint
}

export function setTransactionPriorityFee<TTransaction extends BaseTransactionMessage>({ units, lamports }: PriorityFee, transactionMessage: TTransaction) {
    const microLamports = BigInt(Math.trunc(Number(lamports) / units * MICRO_LAMPORTS_PER_LAMPORT))
    const instructions = [getSetComputeUnitLimitInstruction({ units }), getSetComputeUnitPriceInstruction({ microLamports })]

    return prependTransactionMessageInstructions(instructions, transactionMessage)
}
