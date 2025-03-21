import type { ReadonlyUint8Array } from '@solana/kit'
import { transform, tryCatch } from '@kdt310722/utils/function'
import { identifyPumpAccount } from '../generated'

export function isPumpAccount(account: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpAccount(account), () => true), false)
}
