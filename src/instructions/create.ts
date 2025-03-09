import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, type WritableSignerAccount, addDecoderSizePrefix, addEncoderSizePrefix, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU32Decoder, getU32Encoder, getUtf8Decoder, getUtf8Encoder, transformEncoder } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS, RENT_PROGRAM_ADDRESS, SYSTEM_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const CREATE_DISCRIMINATOR = new Uint8Array([24, 30, 200, 40, 5, 28, 7, 119])

export function getCreateDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(CREATE_DISCRIMINATOR)
}

export type CreateInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMint extends string | IAccountMeta = string, TAccountMintAuthority extends string | IAccountMeta = string, TAccountBondingCurve extends string | IAccountMeta = string, TAccountAssociatedBondingCurve extends string | IAccountMeta = string, TAccountGlobal extends string | IAccountMeta = string, TAccountMplTokenMetadata extends string | IAccountMeta = string, TAccountMetadata extends string | IAccountMeta = string, TAccountUser extends string | IAccountMeta = string, TAccountSystemProgram extends | string | IAccountMeta = typeof SYSTEM_PROGRAM_ADDRESS, TAccountTokenProgram extends | string | IAccountMeta = typeof TOKEN_PROGRAM_ADDRESS, TAccountAssociatedTokenProgram extends string | IAccountMeta = string, TAccountRent extends | string | IAccountMeta = typeof RENT_PROGRAM_ADDRESS, TAccountEventAuthority extends string | IAccountMeta = string, TAccountProgram extends string | IAccountMeta = string, TRemainingAccounts extends readonly IAccountMeta[] = []> = IInstruction<TProgram> & IInstructionWithData<Uint8Array> & IInstructionWithAccounts<[
    TAccountMint extends string ? WritableSignerAccount<TAccountMint> & IAccountSignerMeta<TAccountMint> : TAccountMint, TAccountMintAuthority extends string ? ReadonlyAccount<TAccountMintAuthority> : TAccountMintAuthority, TAccountBondingCurve extends string ? WritableAccount<TAccountBondingCurve> : TAccountBondingCurve, TAccountAssociatedBondingCurve extends string ? WritableAccount<TAccountAssociatedBondingCurve> : TAccountAssociatedBondingCurve, TAccountGlobal extends string ? ReadonlyAccount<TAccountGlobal> : TAccountGlobal, TAccountMplTokenMetadata extends string ? ReadonlyAccount<TAccountMplTokenMetadata> : TAccountMplTokenMetadata, TAccountMetadata extends string ? WritableAccount<TAccountMetadata> : TAccountMetadata, TAccountUser extends string ? WritableSignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser> : TAccountUser, TAccountSystemProgram extends string ? ReadonlyAccount<TAccountSystemProgram> : TAccountSystemProgram, TAccountTokenProgram extends string ? ReadonlyAccount<TAccountTokenProgram> : TAccountTokenProgram, TAccountAssociatedTokenProgram extends string ? ReadonlyAccount<TAccountAssociatedTokenProgram> : TAccountAssociatedTokenProgram, TAccountRent extends string ? ReadonlyAccount<TAccountRent> : TAccountRent, TAccountEventAuthority extends string ? ReadonlyAccount<TAccountEventAuthority> : TAccountEventAuthority, TAccountProgram extends string ? ReadonlyAccount<TAccountProgram> : TAccountProgram, ...TRemainingAccounts
]>

export interface CreateInstructionData {
    discriminator: ReadonlyUint8Array
    name: string
    symbol: string
    uri: string
}

export interface CreateInstructionDataArgs {
    name: string
    symbol: string
    uri: string
}

export const getCreateInstructionDataEncoder = (): Encoder<CreateInstructionDataArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
        ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
        ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({ ...value, discriminator: CREATE_DISCRIMINATOR }),
)

export const getCreateInstructionDataDecoder = (): Decoder<CreateInstructionData> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
])

export function getCreateInstructionDataCodec(): Codec<CreateInstructionDataArgs, CreateInstructionData> {
    return combineCodec(getCreateInstructionDataEncoder(), getCreateInstructionDataDecoder())
}

export interface CreateInput<TAccountMint extends string = string, TAccountMintAuthority extends string = string, TAccountBondingCurve extends string = string, TAccountAssociatedBondingCurve extends string = string, TAccountGlobal extends string = string, TAccountMplTokenMetadata extends string = string, TAccountMetadata extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string, TAccountTokenProgram extends string = string, TAccountAssociatedTokenProgram extends string = string, TAccountRent extends string = string, TAccountEventAuthority extends string = string, TAccountProgram extends string = string> {
    mint: TransactionSigner<TAccountMint>
    mintAuthority: Address<TAccountMintAuthority>
    bondingCurve: Address<TAccountBondingCurve>
    associatedBondingCurve: Address<TAccountAssociatedBondingCurve>
    global: Address<TAccountGlobal>
    mplTokenMetadata: Address<TAccountMplTokenMetadata>
    metadata: Address<TAccountMetadata>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    tokenProgram?: Address<TAccountTokenProgram>
    associatedTokenProgram: Address<TAccountAssociatedTokenProgram>
    rent?: Address<TAccountRent>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
    name: CreateInstructionDataArgs['name']
    symbol: CreateInstructionDataArgs['symbol']
    uri: CreateInstructionDataArgs['uri']
}

export function getCreateInstruction<TAccountMint extends string, TAccountMintAuthority extends string, TAccountBondingCurve extends string, TAccountAssociatedBondingCurve extends string, TAccountGlobal extends string, TAccountMplTokenMetadata extends string, TAccountMetadata extends string, TAccountUser extends string, TAccountSystemProgram extends string, TAccountTokenProgram extends string, TAccountAssociatedTokenProgram extends string, TAccountRent extends string, TAccountEventAuthority extends string, TAccountProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: CreateInput<TAccountMint, TAccountMintAuthority, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountGlobal, TAccountMplTokenMetadata, TAccountMetadata, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountAssociatedTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram>, config?: { programAddress?: TProgramAddress }): CreateInstruction<TProgramAddress, TAccountMint, TAccountMintAuthority, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountGlobal, TAccountMplTokenMetadata, TAccountMetadata, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountAssociatedTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram> {
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    const originalAccounts = {
        mint: { value: input.mint ?? null, isWritable: true },
        mintAuthority: { value: input.mintAuthority ?? null, isWritable: false },
        bondingCurve: { value: input.bondingCurve ?? null, isWritable: true },
        associatedBondingCurve: { value: input.associatedBondingCurve ?? null, isWritable: true },
        global: { value: input.global ?? null, isWritable: false },
        mplTokenMetadata: { value: input.mplTokenMetadata ?? null, isWritable: false },
        metadata: { value: input.metadata ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: true },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
        associatedTokenProgram: { value: input.associatedTokenProgram ?? null, isWritable: false },
        rent: { value: input.rent ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<keyof typeof originalAccounts, ResolvedAccount>
    const args = { ...input }

    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value = SYSTEM_PROGRAM_ADDRESS
    }

    if (!accounts.tokenProgram.value) {
        accounts.tokenProgram.value = TOKEN_PROGRAM_ADDRESS
    }

    if (!accounts.rent.value) {
        accounts.rent.value = RENT_PROGRAM_ADDRESS
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.mint),
            getAccountMeta(accounts.mintAuthority),
            getAccountMeta(accounts.bondingCurve),
            getAccountMeta(accounts.associatedBondingCurve),
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.mplTokenMetadata),
            getAccountMeta(accounts.metadata),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.tokenProgram),
            getAccountMeta(accounts.associatedTokenProgram),
            getAccountMeta(accounts.rent),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getCreateInstructionDataEncoder().encode(args as CreateInstructionDataArgs),
    }

    return instruction as CreateInstruction<TProgramAddress, TAccountMint, TAccountMintAuthority, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountGlobal, TAccountMplTokenMetadata, TAccountMetadata, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountAssociatedTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram>
}

export type ParsedCreateInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> = {
    programAddress: Address<TProgram>
    accounts: {
        mint: TAccountMetas[0]
        mintAuthority: TAccountMetas[1]
        bondingCurve: TAccountMetas[2]
        associatedBondingCurve: TAccountMetas[3]
        global: TAccountMetas[4]
        mplTokenMetadata: TAccountMetas[5]
        metadata: TAccountMetas[6]
        user: TAccountMetas[7]
        systemProgram: TAccountMetas[8]
        tokenProgram: TAccountMetas[9]
        associatedTokenProgram: TAccountMetas[10]
        rent: TAccountMetas[11]
        eventAuthority: TAccountMetas[12]
        program: TAccountMetas[13]
    }
    data: CreateInstructionData
}

export function parseCreateInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedCreateInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 14) {
        throw new Error('Not enough accounts')
    }

    let accountIndex = 0

    const getNextAccount = () => {
        const accountMeta = instruction.accounts[accountIndex]

        accountIndex += 1

        return accountMeta
    }

    return {
        programAddress: instruction.programAddress,
        accounts: {
            mint: getNextAccount(),
            mintAuthority: getNextAccount(),
            bondingCurve: getNextAccount(),
            associatedBondingCurve: getNextAccount(),
            global: getNextAccount(),
            mplTokenMetadata: getNextAccount(),
            metadata: getNextAccount(),
            user: getNextAccount(),
            systemProgram: getNextAccount(),
            tokenProgram: getNextAccount(),
            associatedTokenProgram: getNextAccount(),
            rent: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getCreateInstructionDataDecoder().decode(instruction.data),
    }
}
