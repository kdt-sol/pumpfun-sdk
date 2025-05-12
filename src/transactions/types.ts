import type { Address, TransactionSigner } from '@solana/kit'
import type { BondingCurve, Global } from '../generated'

export interface CreateTradeTransactionParams {
    mint: Address
    global: Pick<Global, 'feeBasisPoints' | 'creatorFeeBasisPoints'>
    bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves' | 'creator'>
    user: TransactionSigner
    amount: bigint
    slippage: number
    feeRecipient?: Address
}
