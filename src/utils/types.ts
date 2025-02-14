import type { Address, ProgramDerivedAddress, TransactionSigner } from '@solana/web3.js'

export type AddressLike<T extends string = string> = Address<T> | ProgramDerivedAddress<T> | TransactionSigner<T>

export type ResolvedAccount<T extends string = string, U extends AddressLike<T> | null = AddressLike<T> | null> = {
    isWritable: boolean
    value: U
}

export type IInstructionWithByteDelta = {
    byteDelta: number
}
