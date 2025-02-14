import { type Address, type Codec, type Decoder, type Encoder, combineCodec, getAddressDecoder, getAddressEncoder, getBooleanDecoder, getBooleanEncoder, getI64Decoder, getI64Encoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder } from '@solana/web3.js'

export interface TradeEvent {
    mint: Address
    solAmount: bigint
    tokenAmount: bigint
    isBuy: boolean
    user: Address
    timestamp: bigint
    virtualSolReserves: bigint
    virtualTokenReserves: bigint
    realSolReserves: bigint
    realTokenReserves: bigint
}

export interface TradeEventArgs {
    mint: Address
    solAmount: number | bigint
    tokenAmount: number | bigint
    isBuy: boolean
    user: Address
    timestamp: number | bigint
    virtualSolReserves: number | bigint
    virtualTokenReserves: number | bigint
    realSolReserves: number | bigint
    realTokenReserves: number | bigint
}

export const getTradeEventEncoder = (): Encoder<TradeEventArgs> => getStructEncoder([
    ['mint', getAddressEncoder()],
    ['solAmount', getU64Encoder()],
    ['tokenAmount', getU64Encoder()],
    ['isBuy', getBooleanEncoder()],
    ['user', getAddressEncoder()],
    ['timestamp', getI64Encoder()],
    ['virtualSolReserves', getU64Encoder()],
    ['virtualTokenReserves', getU64Encoder()],
    ['realSolReserves', getU64Encoder()],
    ['realTokenReserves', getU64Encoder()],
])

export const getTradeEventDecoder = (): Decoder<TradeEvent> => getStructDecoder([
    ['mint', getAddressDecoder()],
    ['solAmount', getU64Decoder()],
    ['tokenAmount', getU64Decoder()],
    ['isBuy', getBooleanDecoder()],
    ['user', getAddressDecoder()],
    ['timestamp', getI64Decoder()],
    ['virtualSolReserves', getU64Decoder()],
    ['virtualTokenReserves', getU64Decoder()],
    ['realSolReserves', getU64Decoder()],
    ['realTokenReserves', getU64Decoder()],
])

export function getTradeEventCodec(): Codec<TradeEventArgs, TradeEvent> {
    return combineCodec(getTradeEventEncoder(), getTradeEventDecoder())
}

export const TRADE_EVENT_IDENTITY = Buffer.from([189, 219, 127, 211, 78, 230, 97, 238])
