import type { Address, TransactionSigner } from '@solana/kit'
import type { BondingCurve } from '../accounts'

export interface CreateTradeTransactionParams {
    mint: Address
    bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>
    user: TransactionSigner
    amount: bigint
    slippage: number
    feeRecipient?: Address
}
