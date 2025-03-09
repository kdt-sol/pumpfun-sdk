import { type Address, type Codec, type Decoder, type Encoder, addDecoderSizePrefix, addEncoderSizePrefix, combineCodec, getAddressDecoder, getAddressEncoder, getStructDecoder, getStructEncoder, getU32Decoder, getU32Encoder, getUtf8Decoder, getUtf8Encoder } from '@solana/kit'

export interface CreateEvent {
    name: string
    symbol: string
    uri: string
    mint: Address
    bondingCurve: Address
    user: Address
}

export type CreateEventArgs = CreateEvent

export const getCreateEventEncoder = (): Encoder<CreateEventArgs> => getStructEncoder([
    ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['mint', getAddressEncoder()],
    ['bondingCurve', getAddressEncoder()],
    ['user', getAddressEncoder()],
])

export const getCreateEventDecoder = (): Decoder<CreateEvent> => getStructDecoder([
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['mint', getAddressDecoder()],
    ['bondingCurve', getAddressDecoder()],
    ['user', getAddressDecoder()],
])

export function getCreateEventCodec(): Codec<CreateEventArgs, CreateEvent> {
    return combineCodec(getCreateEventEncoder(), getCreateEventDecoder())
}

export const CREATE_EVENT_IDENTITY = Buffer.from([27, 114, 169, 77, 222, 235, 99, 118])
