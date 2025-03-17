import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlySignerAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getProgramDerivedAddress, getStructDecoder, getStructEncoder, transformEncoder } from '@solana/kit'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'
import { PUMP_PROGRAM_ADDRESS } from '../constants'

export const UPDATE_GLOBAL_AUTHORITY_DISCRIMINATOR = new Uint8Array([
    227, 181, 74, 196, 208, 21, 97, 213,
])

export function getUpdateGlobalAuthorityDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(
        UPDATE_GLOBAL_AUTHORITY_DISCRIMINATOR,
    )
}

export type UpdateGlobalAuthorityInstruction<
    TProgram extends string = typeof PUMP_PROGRAM_ADDRESS,
    TAccountGlobal extends string | IAccountMeta = string,
    TAccountAuthority extends string | IAccountMeta = string,
    TAccountNewAuthority extends string | IAccountMeta = string,
    TAccountEventAuthority extends string | IAccountMeta = string,
    TAccountProgram extends string | IAccountMeta = string,
    TRemainingAccounts extends readonly IAccountMeta[] = []
> = IInstruction<TProgram> &
    IInstructionWithData<Uint8Array> &
    IInstructionWithAccounts<
        [
            TAccountGlobal extends string
                ? WritableAccount<TAccountGlobal>
                : TAccountGlobal,
            TAccountAuthority extends string ? ReadonlySignerAccount<TAccountAuthority> & IAccountSignerMeta<TAccountAuthority> : TAccountAuthority,
            TAccountNewAuthority extends string ? ReadonlySignerAccount<TAccountNewAuthority> & IAccountSignerMeta<TAccountNewAuthority>
                : TAccountNewAuthority,
            TAccountEventAuthority extends string
                ? ReadonlyAccount<TAccountEventAuthority>
                : TAccountEventAuthority,
            TAccountProgram extends string
                ? ReadonlyAccount<TAccountProgram>
                : TAccountProgram,
            ...TRemainingAccounts
        ]
    >

export type UpdateGlobalAuthorityInstructionData = {
    discriminator: ReadonlyUint8Array
}

// eslint-disable-next-line ts/no-empty-object-type
export type UpdateGlobalAuthorityInstructionDataArgs = {}

export function getUpdateGlobalAuthorityInstructionDataEncoder(): Encoder<UpdateGlobalAuthorityInstructionDataArgs> {
    return transformEncoder(
        getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
        (value) => ({
            ...value,
            discriminator: UPDATE_GLOBAL_AUTHORITY_DISCRIMINATOR,
        }),
    )
}

export function getUpdateGlobalAuthorityInstructionDataDecoder(): Decoder<UpdateGlobalAuthorityInstructionData> {
    return getStructDecoder([
        ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ])
}

export function getUpdateGlobalAuthorityInstructionDataCodec(): Codec<
    UpdateGlobalAuthorityInstructionDataArgs,
    UpdateGlobalAuthorityInstructionData
> {
    return combineCodec(
        getUpdateGlobalAuthorityInstructionDataEncoder(),
        getUpdateGlobalAuthorityInstructionDataDecoder(),
    )
}

export type UpdateGlobalAuthorityAsyncInput<
    TAccountGlobal extends string = string,
    TAccountAuthority extends string = string,
    TAccountNewAuthority extends string = string,
    TAccountEventAuthority extends string = string,
    TAccountProgram extends string = string
> = {
    global?: Address<TAccountGlobal>
    authority: TransactionSigner<TAccountAuthority>
    newAuthority: TransactionSigner<TAccountNewAuthority>
    eventAuthority?: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export async function getUpdateGlobalAuthorityInstructionAsync<
    TAccountGlobal extends string,
    TAccountAuthority extends string,
    TAccountNewAuthority extends string,
    TAccountEventAuthority extends string,
    TAccountProgram extends string,
    TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS
>(
    input: UpdateGlobalAuthorityAsyncInput<
        TAccountGlobal,
        TAccountAuthority,
        TAccountNewAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >,
    config?: { programAddress?: TProgramAddress },
): Promise<
        UpdateGlobalAuthorityInstruction<
            TProgramAddress,
            TAccountGlobal,
            TAccountAuthority,
            TAccountNewAuthority,
            TAccountEventAuthority,
            TAccountProgram
        >
    > {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: true },
        authority: { value: input.authority ?? null, isWritable: false },
        newAuthority: { value: input.newAuthority ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<
        keyof typeof originalAccounts,
        ResolvedAccount
    >

    // Resolve default values.
    if (!accounts.global.value) {
        accounts.global.value = await getProgramDerivedAddress({
            programAddress,
            seeds: [
                getBytesEncoder().encode(new Uint8Array([103, 108, 111, 98, 97, 108])),
            ],
        })
    }

    if (!accounts.eventAuthority.value) {
        accounts.eventAuthority.value = await getProgramDerivedAddress({
            programAddress,
            seeds: [
                getBytesEncoder().encode(
                    new Uint8Array([
                        95,
                        95,
                        101,
                        118,
                        101,
                        110,
                        116,
                        95,
                        97,
                        117,
                        116,
                        104,
                        111,
                        114,
                        105,
                        116,
                        121,
                    ]),
                ),
            ],
        })
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.authority),
            getAccountMeta(accounts.newAuthority),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getUpdateGlobalAuthorityInstructionDataEncoder().encode({}),
    } as UpdateGlobalAuthorityInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountAuthority,
        TAccountNewAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >

    return instruction
}

export type UpdateGlobalAuthorityInput<
    TAccountGlobal extends string = string,
    TAccountAuthority extends string = string,
    TAccountNewAuthority extends string = string,
    TAccountEventAuthority extends string = string,
    TAccountProgram extends string = string
> = {
    global: Address<TAccountGlobal>
    authority: TransactionSigner<TAccountAuthority>
    newAuthority: TransactionSigner<TAccountNewAuthority>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export function getUpdateGlobalAuthorityInstruction<
    TAccountGlobal extends string,
    TAccountAuthority extends string,
    TAccountNewAuthority extends string,
    TAccountEventAuthority extends string,
    TAccountProgram extends string,
    TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS
>(
    input: UpdateGlobalAuthorityInput<
        TAccountGlobal,
        TAccountAuthority,
        TAccountNewAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >,
    config?: { programAddress?: TProgramAddress },
): UpdateGlobalAuthorityInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountAuthority,
        TAccountNewAuthority,
        TAccountEventAuthority,
        TAccountProgram
    > {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: true },
        authority: { value: input.authority ?? null, isWritable: false },
        newAuthority: { value: input.newAuthority ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<
        keyof typeof originalAccounts,
        ResolvedAccount
    >

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.authority),
            getAccountMeta(accounts.newAuthority),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getUpdateGlobalAuthorityInstructionDataEncoder().encode({}),
    } as UpdateGlobalAuthorityInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountAuthority,
        TAccountNewAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >

    return instruction
}

export type ParsedUpdateGlobalAuthorityInstruction<
    TProgram extends string = typeof PUMP_PROGRAM_ADDRESS,
    TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
    programAddress: Address<TProgram>
    accounts: {
        global: TAccountMetas[0]
        authority: TAccountMetas[1]
        newAuthority: TAccountMetas[2]
        eventAuthority: TAccountMetas[3]
        program: TAccountMetas[4]
    }
    data: UpdateGlobalAuthorityInstructionData
}

export function parseUpdateGlobalAuthorityInstruction<
    TProgram extends string,
    TAccountMetas extends readonly IAccountMeta[]
>(
    instruction: IInstruction<TProgram> &
        IInstructionWithAccounts<TAccountMetas> &
        IInstructionWithData<Uint8Array>,
): ParsedUpdateGlobalAuthorityInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 5) {
        // TODO: Coded error.
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
            global: getNextAccount(),
            authority: getNextAccount(),
            newAuthority: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getUpdateGlobalAuthorityInstructionDataDecoder().decode(
            instruction.data,
        ),
    }
}
