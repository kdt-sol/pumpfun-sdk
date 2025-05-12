import type { ReadonlyUint8Array } from '@solana/kit'
import { transform, tryCatch } from '@kdt310722/utils/function'
import { type BondingCurve, identifyPumpAccount } from '../generated'
import { SYSTEM_PROGRAM_ADDRESS } from '../constants'

export function isPumpAccount(account: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpAccount(account), () => true), false)
}

export function isLegacyBondingCurve(bondingCurve: Pick<BondingCurve, 'creator'>) {
    return bondingCurve.creator === SYSTEM_PROGRAM_ADDRESS
}
