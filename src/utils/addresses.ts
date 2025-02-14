import { type Address, getAddressEncoder, getProgramDerivedAddress } from '@solana/web3.js'
import { ASSOCIATED_TOKEN_PROGRAM_ADDRESS, BONDING_CURVE_SEED, PUMP_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from '../constants'

export async function getAssociatedTokenAddress(mint: Address, owner: Address, programId: Address = TOKEN_PROGRAM_ADDRESS, associatedTokenProgramId: Address = ASSOCIATED_TOKEN_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder()
    const seeds = [encoder.encode(owner), encoder.encode(programId), encoder.encode(mint)]

    return getProgramDerivedAddress({ programAddress: associatedTokenProgramId, seeds }).then(([address]) => address)
}

export async function getBondingCurveAddress(mint: Address) {
    return getProgramDerivedAddress({ programAddress: PUMP_PROGRAM_ADDRESS, seeds: [BONDING_CURVE_SEED, getAddressEncoder().encode(mint)] }).then(([address]) => address)
}

export async function getAssociatedBondingCurveAddress(mint: Address, bondingCurve: Address) {
    return getAssociatedTokenAddress(mint, bondingCurve)
}
