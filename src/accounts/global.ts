import { type Account, type Address, type Codec, type Decoder, type EncodedAccount, type Encoder, type FetchAccountConfig, type FetchAccountsConfig, type MaybeAccount, type MaybeEncodedAccount, type ReadonlyUint8Array, assertAccountExists, assertAccountsExist, combineCodec, decodeAccount, fetchEncodedAccount, fetchEncodedAccounts, fixDecoderSize, fixEncoderSize, getAddressDecoder, getAddressEncoder, getBooleanDecoder, getBooleanEncoder, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder, transformEncoder } from '@solana/kit'

export const GLOBAL_DISCRIMINATOR = new Uint8Array([167, 232, 232, 177, 200, 108, 114, 127])

export function getGlobalDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(GLOBAL_DISCRIMINATOR)
}

export interface Global {
    discriminator: ReadonlyUint8Array
    initialized: boolean
    authority: Address
    feeRecipient: Address
    initialVirtualTokenReserves: bigint
    initialVirtualSolReserves: bigint
    initialRealTokenReserves: bigint
    tokenTotalSupply: bigint
    feeBasisPoints: bigint
}

export interface GlobalArgs {
    initialized: boolean
    authority: Address
    feeRecipient: Address
    initialVirtualTokenReserves: number | bigint
    initialVirtualSolReserves: number | bigint
    initialRealTokenReserves: number | bigint
    tokenTotalSupply: number | bigint
    feeBasisPoints: number | bigint
}

export const getGlobalEncoder = (): Encoder<GlobalArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['initialized', getBooleanEncoder()],
        ['authority', getAddressEncoder()],
        ['feeRecipient', getAddressEncoder()],
        ['initialVirtualTokenReserves', getU64Encoder()],
        ['initialVirtualSolReserves', getU64Encoder()],
        ['initialRealTokenReserves', getU64Encoder()],
        ['tokenTotalSupply', getU64Encoder()],
        ['feeBasisPoints', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: GLOBAL_DISCRIMINATOR }),
)

export const getGlobalDecoder = (): Decoder<Global> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['initialized', getBooleanDecoder()],
    ['authority', getAddressDecoder()],
    ['feeRecipient', getAddressDecoder()],
    ['initialVirtualTokenReserves', getU64Decoder()],
    ['initialVirtualSolReserves', getU64Decoder()],
    ['initialRealTokenReserves', getU64Decoder()],
    ['tokenTotalSupply', getU64Decoder()],
    ['feeBasisPoints', getU64Decoder()],
])

export function getGlobalCodec(): Codec<GlobalArgs, Global> {
    return combineCodec(getGlobalEncoder(), getGlobalDecoder())
}

export function decodeGlobal<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress>): Account<Global, TAddress>
export function decodeGlobal<TAddress extends string = string>(encodedAccount: MaybeEncodedAccount<TAddress>): MaybeAccount<Global, TAddress>

export function decodeGlobal<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>): Account<Global, TAddress> | MaybeAccount<Global, TAddress> {
    return decodeAccount(encodedAccount as MaybeEncodedAccount<TAddress>, getGlobalDecoder())
}

export async function fetchGlobal<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<Account<Global, TAddress>> {
    const maybeAccount = await fetchMaybeGlobal(rpc, address, config)

    assertAccountExists(maybeAccount)

    return maybeAccount
}

export async function fetchMaybeGlobal<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<MaybeAccount<Global, TAddress>> {
    const maybeAccount = await fetchEncodedAccount(rpc, address, config)

    return decodeGlobal(maybeAccount)
}

export async function fetchAllGlobal(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<Account<Global>>> {
    const maybeAccounts = await fetchAllMaybeGlobal(rpc, addresses, config)

    assertAccountsExist(maybeAccounts)

    return maybeAccounts
}

export async function fetchAllMaybeGlobal(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<MaybeAccount<Global>>> {
    const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config)

    return maybeAccounts.map((maybeAccount) => decodeGlobal(maybeAccount))
}

export function getGlobalSize(): number {
    return 113
}
