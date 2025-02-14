import { type ReadonlyUint8Array, containsBytes, fixEncoderSize, getBytesEncoder } from '@solana/web3.js'
import { transform, tryCatch } from '@kdt310722/utils/function'

export enum PumpInstruction {
    Initialize,
    SetParams,
    Create,
    Buy,
    Sell,
    Withdraw,
}

export const INITIALIZE_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([175, 175, 109, 31, 13, 152, 155, 237]))

export const SET_PARAMS_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([27, 234, 178, 52, 147, 2, 187, 141]))

export const CREATE_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([24, 30, 200, 40, 5, 28, 7, 119]))

export const BUY_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([102, 6, 61, 18, 1, 218, 235, 234]))

export const SELL_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([51, 230, 133, 164, 1, 127, 131, 173]))

export const WITHDRAW_INSTRUCTION_START_BYTES = fixEncoderSize(getBytesEncoder(), 8).encode(new Uint8Array([183, 18, 70, 156, 148, 109, 161, 34]))

export function identifyPumpInstruction(instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array): PumpInstruction {
    const data = 'data' in instruction ? instruction.data : instruction

    if (containsBytes(data, INITIALIZE_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.Initialize
    }

    if (containsBytes(data, SET_PARAMS_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.SetParams
    }

    if (containsBytes(data, CREATE_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.Create
    }

    if (containsBytes(data, BUY_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.Buy
    }

    if (containsBytes(data, SELL_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.Sell
    }

    if (containsBytes(data, WITHDRAW_INSTRUCTION_START_BYTES, 0)) {
        return PumpInstruction.Withdraw
    }

    throw new Error('The provided instruction could not be identified as a pump instruction.')
}

export function isPumpInstruction(instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array) {
    return tryCatch(() => transform(identifyPumpInstruction(instruction), () => true), false)
}
