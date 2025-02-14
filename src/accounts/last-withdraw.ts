import { type Account, type Address, type Codec, type Decoder, type EncodedAccount, type Encoder, type FetchAccountConfig, type FetchAccountsConfig, type MaybeAccount, type MaybeEncodedAccount, type ReadonlyUint8Array, assertAccountExists, assertAccountsExist, combineCodec, decodeAccount, fetchEncodedAccount, fetchEncodedAccounts, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getI64Decoder, getI64Encoder, getStructDecoder, getStructEncoder, transformEncoder } from '@solana/web3.js'

export const LAST_WITHDRAW_DISCRIMINATOR = new Uint8Array([203, 18, 220, 103, 120, 145, 187, 2])

export function getLastWithdrawDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(LAST_WITHDRAW_DISCRIMINATOR)
}

export interface LastWithdraw {
    discriminator: ReadonlyUint8Array
    lastWithdrawTimestamp: bigint
}

export interface LastWithdrawArgs {
    lastWithdrawTimestamp: number | bigint
}

export const getLastWithdrawEncoder = (): Encoder<LastWithdrawArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['lastWithdrawTimestamp', getI64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: LAST_WITHDRAW_DISCRIMINATOR }),
)

export const getLastWithdrawDecoder = (): Decoder<LastWithdraw> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['lastWithdrawTimestamp', getI64Decoder()],
])

export function getLastWithdrawCodec(): Codec<LastWithdrawArgs, LastWithdraw> {
    return combineCodec(getLastWithdrawEncoder(), getLastWithdrawDecoder())
}

export function decodeLastWithdraw<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress>): Account<LastWithdraw, TAddress>
export function decodeLastWithdraw<TAddress extends string = string>(encodedAccount: MaybeEncodedAccount<TAddress>): MaybeAccount<LastWithdraw, TAddress>

export function decodeLastWithdraw<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>): Account<LastWithdraw, TAddress> | MaybeAccount<LastWithdraw, TAddress> {
    return decodeAccount(encodedAccount as MaybeEncodedAccount<TAddress>, getLastWithdrawDecoder())
}

export async function fetchLastWithdraw<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<Account<LastWithdraw, TAddress>> {
    const maybeAccount = await fetchMaybeLastWithdraw(rpc, address, config)

    assertAccountExists(maybeAccount)

    return maybeAccount
}

export async function fetchMaybeLastWithdraw<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<MaybeAccount<LastWithdraw, TAddress>> {
    const maybeAccount = await fetchEncodedAccount(rpc, address, config)

    return decodeLastWithdraw(maybeAccount)
}

export async function fetchAllLastWithdraw(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<Account<LastWithdraw>>> {
    const maybeAccounts = await fetchAllMaybeLastWithdraw(rpc, addresses, config)

    assertAccountsExist(maybeAccounts)

    return maybeAccounts
}

export async function fetchAllMaybeLastWithdraw(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<MaybeAccount<LastWithdraw>>> {
    const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config)

    return maybeAccounts.map((maybeAccount) => decodeLastWithdraw(maybeAccount))
}

export function getLastWithdrawSize(): number {
    return 16
}
