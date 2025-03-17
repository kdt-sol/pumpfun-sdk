import { type Address, type Codec, type Decoder, type Encoder, type Option, type OptionOrNullable, combineCodec, getAddressDecoder, getAddressEncoder, getI64Decoder, getI64Encoder, getOptionDecoder, getOptionEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder } from '@solana/kit'

export type CompletePumpAmmMigrationEvent = {
    user: Address
    mint: Address
    creator: Option<Address>
    mintAmount: bigint
    solAmount: bigint
    poolMigrationFee: bigint
    creatorFee: bigint
    bondingCurve: Address
    timestamp: bigint
    pool: Address
}

export type CompletePumpAmmMigrationEventArgs = {
    user: Address
    mint: Address
    creator: OptionOrNullable<Address>
    mintAmount: number | bigint
    solAmount: number | bigint
    poolMigrationFee: number | bigint
    creatorFee: number | bigint
    bondingCurve: Address
    timestamp: number | bigint
    pool: Address
}

export const getCompletePumpAmmMigrationEventEncoder = (): Encoder<CompletePumpAmmMigrationEventArgs> => getStructEncoder([
    ['user', getAddressEncoder()],
    ['mint', getAddressEncoder()],
    ['creator', getOptionEncoder(getAddressEncoder())],
    ['mintAmount', getU64Encoder()],
    ['solAmount', getU64Encoder()],
    ['poolMigrationFee', getU64Encoder()],
    ['creatorFee', getU64Encoder()],
    ['bondingCurve', getAddressEncoder()],
    ['timestamp', getI64Encoder()],
    ['pool', getAddressEncoder()],
])

export const getCompletePumpAmmMigrationEventDecoder = (): Decoder<CompletePumpAmmMigrationEvent> => getStructDecoder([
    ['user', getAddressDecoder()],
    ['mint', getAddressDecoder()],
    ['creator', getOptionDecoder(getAddressDecoder())],
    ['mintAmount', getU64Decoder()],
    ['solAmount', getU64Decoder()],
    ['poolMigrationFee', getU64Decoder()],
    ['creatorFee', getU64Decoder()],
    ['bondingCurve', getAddressDecoder()],
    ['timestamp', getI64Decoder()],
    ['pool', getAddressDecoder()],
])

export const getCompletePumpAmmMigrationEventCodec = (): Codec<CompletePumpAmmMigrationEventArgs, CompletePumpAmmMigrationEvent> => combineCodec(
    getCompletePumpAmmMigrationEventEncoder(),
    getCompletePumpAmmMigrationEventDecoder(),
)

export const COMPLETE_PUMP_AMM_MIGRATION_EVENT_IDENTITY = Buffer.from([189, 233, 93, 185, 92, 148, 234, 148])
