import { type Account, type Address, type Codec, type Decoder, type EncodedAccount, type Encoder, type FetchAccountConfig, type FetchAccountsConfig, type MaybeAccount, type MaybeEncodedAccount, type ReadonlyUint8Array, assertAccountExists, assertAccountsExist, combineCodec, decodeAccount, fetchEncodedAccount, fetchEncodedAccounts, fixDecoderSize, fixEncoderSize, getBooleanDecoder, getBooleanEncoder, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder, transformEncoder } from '@solana/kit'

export const BONDING_CURVE_DISCRIMINATOR = new Uint8Array([23, 183, 248, 55, 96, 216, 172, 96])

export function getBondingCurveDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(BONDING_CURVE_DISCRIMINATOR)
}

export interface BondingCurve {
    discriminator: ReadonlyUint8Array
    virtualTokenReserves: bigint
    virtualSolReserves: bigint
    realTokenReserves: bigint
    realSolReserves: bigint
    tokenTotalSupply: bigint
    complete: boolean
}

export interface BondingCurveArgs {
    virtualTokenReserves: number | bigint
    virtualSolReserves: number | bigint
    realTokenReserves: number | bigint
    realSolReserves: number | bigint
    tokenTotalSupply: number | bigint
    complete: boolean
}

export const getBondingCurveEncoder = (): Encoder<BondingCurveArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['virtualTokenReserves', getU64Encoder()],
        ['virtualSolReserves', getU64Encoder()],
        ['realTokenReserves', getU64Encoder()],
        ['realSolReserves', getU64Encoder()],
        ['tokenTotalSupply', getU64Encoder()],
        ['complete', getBooleanEncoder()],
    ]),
    (value) => ({ ...value, discriminator: BONDING_CURVE_DISCRIMINATOR }),
)

export const getBondingCurveDecoder = (): Decoder<BondingCurve> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['virtualTokenReserves', getU64Decoder()],
    ['virtualSolReserves', getU64Decoder()],
    ['realTokenReserves', getU64Decoder()],
    ['realSolReserves', getU64Decoder()],
    ['tokenTotalSupply', getU64Decoder()],
    ['complete', getBooleanDecoder()],
])

export function getBondingCurveCodec(): Codec<BondingCurveArgs, BondingCurve> {
    return combineCodec(getBondingCurveEncoder(), getBondingCurveDecoder())
}

export function decodeBondingCurve<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress>): Account<BondingCurve, TAddress>
export function decodeBondingCurve<TAddress extends string = string>(encodedAccount: MaybeEncodedAccount<TAddress>): MaybeAccount<BondingCurve, TAddress>

export function decodeBondingCurve<TAddress extends string = string>(encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>): Account<BondingCurve, TAddress> | MaybeAccount<BondingCurve, TAddress> {
    return decodeAccount(encodedAccount as MaybeEncodedAccount<TAddress>, getBondingCurveDecoder())
}

export async function fetchBondingCurve<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<Account<BondingCurve, TAddress>> {
    const maybeAccount = await fetchMaybeBondingCurve(rpc, address, config)

    assertAccountExists(maybeAccount)

    return maybeAccount
}

export async function fetchMaybeBondingCurve<TAddress extends string = string>(rpc: Parameters<typeof fetchEncodedAccount>[0], address: Address<TAddress>, config?: FetchAccountConfig): Promise<MaybeAccount<BondingCurve, TAddress>> {
    return decodeBondingCurve(await fetchEncodedAccount(rpc, address, config))
}

export async function fetchAllBondingCurve(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<Account<BondingCurve>>> {
    const maybeAccounts = await fetchAllMaybeBondingCurve(rpc, addresses, config)

    assertAccountsExist(maybeAccounts)

    return maybeAccounts
}

export async function fetchAllMaybeBondingCurve(rpc: Parameters<typeof fetchEncodedAccounts>[0], addresses: Address[], config?: FetchAccountsConfig): Promise<Array<MaybeAccount<BondingCurve>>> {
    const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config)

    return maybeAccounts.map((maybeAccount) => decodeBondingCurve(maybeAccount))
}

export function getBondingCurveSize(): number {
    return 49
}
