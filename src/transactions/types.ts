import type { Address, TransactionSigner } from '@solana/kit'
import type { BondingCurve } from '../generated'

export interface CreateTradeTransactionParams {
    mint: Address
    bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>
    user: TransactionSigner
    amount: bigint
    slippage: number
    feeRecipient?: Address
}
