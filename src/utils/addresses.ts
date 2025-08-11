import { type Address, getAddressEncoder, getProgramDerivedAddress } from '@solana/kit'
import { ASSOCIATED_TOKEN_PROGRAM_ADDRESS, BONDING_CURVE_SEED, CREATOR_VAULT_SEED, GLOBAL_VOLUME_ACCUMULATOR_SEED, TOKEN_PROGRAM_ADDRESS, USER_VOLUME_ACCUMULATOR_SEED } from '../constants'
import { PUMP_PROGRAM_ADDRESS } from '../generated'

export async function getAssociatedTokenAddress(mint: Address, owner: Address, programId: Address = TOKEN_PROGRAM_ADDRESS, associatedTokenProgramId: Address = ASSOCIATED_TOKEN_PROGRAM_ADDRESS) {
    const encoder = getAddressEncoder()
    const seeds = [encoder.encode(owner), encoder.encode(programId), encoder.encode(mint)]

    return getProgramDerivedAddress({ programAddress: associatedTokenProgramId, seeds }).then(([address]) => address)
}

export async function getBondingCurveAddress(mint: Address) {
    return getProgramDerivedAddress({ programAddress: PUMP_PROGRAM_ADDRESS, seeds: [BONDING_CURVE_SEED, getAddressEncoder().encode(mint)] }).then(([address]) => address)
}

export async function getCreatorVaultAddress(creator: Address) {
    return getProgramDerivedAddress({ programAddress: PUMP_PROGRAM_ADDRESS, seeds: [CREATOR_VAULT_SEED, getAddressEncoder().encode(creator)] }).then(([address]) => address)
}

export async function getAssociatedBondingCurveAddress(mint: Address, bondingCurve: Address) {
    return getAssociatedTokenAddress(mint, bondingCurve)
}

export async function getGlobalVolumeAccumulatorAddress() {
    return getProgramDerivedAddress({ programAddress: PUMP_PROGRAM_ADDRESS, seeds: [GLOBAL_VOLUME_ACCUMULATOR_SEED] }).then(([address]) => address)
}

export async function getUserVolumeAccumulatorAddress(user: Address) {
    return getProgramDerivedAddress({ programAddress: PUMP_PROGRAM_ADDRESS, seeds: [USER_VOLUME_ACCUMULATOR_SEED, getAddressEncoder().encode(user)] }).then(([address]) => address)
}
