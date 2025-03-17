import { type Address, type Codec, type Decoder, type Encoder, combineCodec, getAddressDecoder, getAddressEncoder, getI64Decoder, getI64Encoder, getStructDecoder, getStructEncoder } from '@solana/kit'

export type UpdateGlobalAuthorityEvent = {
    global: Address
    authority: Address
    newAuthority: Address
    timestamp: bigint
}

export type UpdateGlobalAuthorityEventArgs = {
    global: Address
    authority: Address
    newAuthority: Address
    timestamp: number | bigint
}

export const getUpdateGlobalAuthorityEventEncoder = (): Encoder<UpdateGlobalAuthorityEventArgs> => getStructEncoder([
    ['global', getAddressEncoder()],
    ['authority', getAddressEncoder()],
    ['newAuthority', getAddressEncoder()],
    ['timestamp', getI64Encoder()],
])

export const getUpdateGlobalAuthorityEventDecoder = (): Decoder<UpdateGlobalAuthorityEvent> => getStructDecoder([
    ['global', getAddressDecoder()],
    ['authority', getAddressDecoder()],
    ['newAuthority', getAddressDecoder()],
    ['timestamp', getI64Decoder()],
])

export const getUpdateGlobalAuthorityEventCodec = (): Codec<UpdateGlobalAuthorityEventArgs, UpdateGlobalAuthorityEvent> => combineCodec(
    getUpdateGlobalAuthorityEventEncoder(),
    getUpdateGlobalAuthorityEventDecoder(),
)

export const UPDATE_GLOBAL_AUTHORITY_EVENT_IDENTITY = Buffer.from([182, 195, 137, 42, 35, 206, 207, 247])
