import { type Address, type Codec, type Decoder, type Encoder, combineCodec, getAddressDecoder, getAddressEncoder, getI64Decoder, getI64Encoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder } from '@solana/kit'

export type ExtendAccountEvent = {
    account: Address
    user: Address
    currentSize: bigint
    newSize: bigint
    timestamp: bigint
}

export type ExtendAccountEventArgs = {
    account: Address
    user: Address
    currentSize: number | bigint
    newSize: number | bigint
    timestamp: number | bigint
}

export const getExtendAccountEventEncoder = (): Encoder<ExtendAccountEventArgs> => getStructEncoder([
    ['account', getAddressEncoder()],
    ['user', getAddressEncoder()],
    ['currentSize', getU64Encoder()],
    ['newSize', getU64Encoder()],
    ['timestamp', getI64Encoder()],
])

export const getExtendAccountEventDecoder = (): Decoder<ExtendAccountEvent> => getStructDecoder([
    ['account', getAddressDecoder()],
    ['user', getAddressDecoder()],
    ['currentSize', getU64Decoder()],
    ['newSize', getU64Decoder()],
    ['timestamp', getI64Decoder()],
])

export const getExtendAccountEventCodec = (): Codec<ExtendAccountEventArgs, ExtendAccountEvent> => combineCodec(
    getExtendAccountEventEncoder(),
    getExtendAccountEventDecoder(),
)

export const EXTEND_ACCOUNT_EVENT_IDENTITY = Buffer.from([97, 97, 215, 144, 93, 146, 22, 124])
