import { type Address, type Codec, type Decoder, type Encoder, combineCodec, getAddressDecoder, getAddressEncoder, getI64Decoder, getI64Encoder, getStructDecoder, getStructEncoder } from '@solana/kit'

export interface CompleteEvent {
    user: Address
    mint: Address
    bondingCurve: Address
    timestamp: bigint
}

export interface CompleteEventArgs {
    user: Address
    mint: Address
    bondingCurve: Address
    timestamp: number | bigint
}

export const getCompleteEventEncoder = (): Encoder<CompleteEventArgs> => getStructEncoder([
    ['user', getAddressEncoder()],
    ['mint', getAddressEncoder()],
    ['bondingCurve', getAddressEncoder()],
    ['timestamp', getI64Encoder()],
])

export const getCompleteEventDecoder = (): Decoder<CompleteEvent> => getStructDecoder([
    ['user', getAddressDecoder()],
    ['mint', getAddressDecoder()],
    ['bondingCurve', getAddressDecoder()],
    ['timestamp', getI64Decoder()],
])

export function getCompleteEventCodec(): Codec<CompleteEventArgs, CompleteEvent> {
    return combineCodec(getCompleteEventEncoder(), getCompleteEventDecoder())
}

export const COMPLETE_EVENT_IDENTITY = Buffer.from([95, 114, 97, 156, 212, 46, 152, 8])
