import { type ReadonlyUint8Array, containsBytes, fixEncoderSize, getBytesEncoder } from '@solana/web3.js'
import { transform, tryCatch } from '@kdt310722/utils/function'

export enum PumpAccount {
    Global,
    LastWithdraw,
    BondingCurve,
}

export const GLOBAL_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([167, 232, 232, 177, 200, 108, 114, 127]))

export const LAST_WITHDRAW_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([203, 18, 220, 103, 120, 145, 187, 2]))

export const BONDING_CURVE_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([23, 183, 248, 55, 96, 216, 172, 96]))

export function identifyPumpAccount(account: { data: ReadonlyUint8Array } | ReadonlyUint8Array): PumpAccount {
    const data = 'data' in account ? account.data : account

    if (containsBytes(data, GLOBAL_START_BYTES, 0)) {
        return PumpAccount.Global
    }

    if (containsBytes(data, LAST_WITHDRAW_START_BYTES, 0)) {
        return PumpAccount.LastWithdraw
    }

    if (containsBytes(data, BONDING_CURVE_START_BYTES, 0)) {
        return PumpAccount.BondingCurve
    }

    throw new Error('The provided account could not be identified as a pump account.')
}

export function isPumpAccount(account: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpAccount(account), () => true), false)
}
