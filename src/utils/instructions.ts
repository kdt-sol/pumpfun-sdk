import { transform, tryCatch } from '@kdt310722/utils/function'
import type { Address, ReadonlyUint8Array, TransactionSigner } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS, getExtendAccountInstruction, identifyPumpInstruction } from '../generated'
import { EVENT_AUTHORITY_ADDRESS } from '../constants'

export function isPumpInstruction(instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpInstruction(instruction), () => true), false)
}

export function createExtendAccountInstruction(user: TransactionSigner, bondingCurve: Address) {
    return getExtendAccountInstruction({ account: bondingCurve, user, eventAuthority: EVENT_AUTHORITY_ADDRESS, program: PUMP_PROGRAM_ADDRESS })
}
