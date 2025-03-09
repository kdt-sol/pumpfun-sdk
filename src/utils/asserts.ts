import { type Address, type ProgramDerivedAddress, type TransactionSigner, isProgramDerivedAddress } from '@solana/kit'
import { isTransactionSigner } from './signers'
import type { AddressLike } from './types'

export function expectSome<T>(value: T | null | undefined): T {
    if (value == null) {
        throw new Error('Expected a value but received null or undefined.')
    }

    return value
}

export function expectAddress<T extends string = string>(value: AddressLike<T> | null | undefined): Address<T> {
    if (!value) {
        throw new Error('Expected a Address.')
    }

    if (typeof value === 'object' && 'address' in value) {
        return value.address
    }

    if (Array.isArray(value)) {
        return value[0]
    }

    return value as Address<T>
}

export function expectProgramDerivedAddress<T extends string = string>(value: AddressLike<T> | null | undefined): ProgramDerivedAddress<T> {
    if (!value || !Array.isArray(value) || !isProgramDerivedAddress(value)) {
        throw new Error('Expected a ProgramDerivedAddress.')
    }

    return value
}

export function expectTransactionSigner<T extends string = string>(value: AddressLike<T> | null | undefined): TransactionSigner<T> {
    if (!value || !isTransactionSigner(value)) {
        throw new Error('Expected a TransactionSigner.')
    }

    return value
}
