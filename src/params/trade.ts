import type { Address, TransactionSigner } from '@solana/kit'
import { EVENT_AUTHORITY_ADDRESS, FEE_RECIPIENT_ADDRESS, GLOBAL_ACCOUNT_ADDRESS } from '../constants'
import { getAssociatedBondingCurveAddress, getBondingCurveAddress, getCreatorVaultAddress } from '../utils'
import { PUMP_PROGRAM_ADDRESS } from '../generated'

export interface TradeInstructionParamsInput {
    mint: Address
    user: TransactionSigner
    tokenAccount: Address
    amount: number | bigint
    creator: Address
    creatorVault?: Address
    bondingCurve?: Address
    feeRecipient?: Address
    eventAuthority?: Address
}

export async function getTradeInstructionParams(input: TradeInstructionParamsInput) {
    const bondingCurve = input.bondingCurve ?? (await getBondingCurveAddress(input.mint))
    const associatedBondingCurve = await getAssociatedBondingCurveAddress(input.mint, bondingCurve)
    const creatorVault = input.creatorVault ?? (await getCreatorVaultAddress(input.creator))

    return <const>{ global: GLOBAL_ACCOUNT_ADDRESS, feeRecipient: input.feeRecipient ?? FEE_RECIPIENT_ADDRESS, mint: input.mint, bondingCurve, associatedBondingCurve, associatedUser: input.tokenAccount, user: input.user, eventAuthority: input.eventAuthority ?? EVENT_AUTHORITY_ADDRESS, program: PUMP_PROGRAM_ADDRESS, amount: input.amount, creatorVault }
}
