import { type Address, type Codec, type Decoder, type Encoder, combineCodec, getAddressDecoder, getAddressEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder } from '@solana/web3.js'

export interface SetParamsEvent {
    feeRecipient: Address
    initialVirtualTokenReserves: bigint
    initialVirtualSolReserves: bigint
    initialRealTokenReserves: bigint
    tokenTotalSupply: bigint
    feeBasisPoints: bigint
}

export interface SetParamsEventArgs {
    feeRecipient: Address
    initialVirtualTokenReserves: number | bigint
    initialVirtualSolReserves: number | bigint
    initialRealTokenReserves: number | bigint
    tokenTotalSupply: number | bigint
    feeBasisPoints: number | bigint
}

export const getSetParamsEventEncoder = (): Encoder<SetParamsEventArgs> => getStructEncoder([
    ['feeRecipient', getAddressEncoder()],
    ['initialVirtualTokenReserves', getU64Encoder()],
    ['initialVirtualSolReserves', getU64Encoder()],
    ['initialRealTokenReserves', getU64Encoder()],
    ['tokenTotalSupply', getU64Encoder()],
    ['feeBasisPoints', getU64Encoder()],
])

export const getSetParamsEventDecoder = (): Decoder<SetParamsEvent> => getStructDecoder([
    ['feeRecipient', getAddressDecoder()],
    ['initialVirtualTokenReserves', getU64Decoder()],
    ['initialVirtualSolReserves', getU64Decoder()],
    ['initialRealTokenReserves', getU64Decoder()],
    ['tokenTotalSupply', getU64Decoder()],
    ['feeBasisPoints', getU64Decoder()],
])

export function getSetParamsEventCodec(): Codec<SetParamsEventArgs, SetParamsEvent> {
    return combineCodec(getSetParamsEventEncoder(), getSetParamsEventDecoder())
}

export const SET_PARAMS_EVENT_IDENTITY = Buffer.from([223, 195, 159, 246, 62, 48, 143, 131])
