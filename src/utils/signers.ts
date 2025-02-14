import type { TransactionSigner } from '@solana/web3.js'
import { isTransactionSigner as web3JsIsTransactionSigner } from '@solana/web3.js'
import type { AddressLike } from './types'

export function isTransactionSigner<TAddress extends string = string>(value: AddressLike<TAddress>): value is TransactionSigner<TAddress> {
    return (!!value && typeof value === 'object' && 'address' in value && web3JsIsTransactionSigner(value))
}
