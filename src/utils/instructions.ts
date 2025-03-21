import { transform, tryCatch } from '@kdt310722/utils/function'
import type { ReadonlyUint8Array } from '@solana/kit'
import { identifyPumpInstruction } from '../generated'

export function isPumpInstruction(instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpInstruction(instruction), () => true), false)
}
