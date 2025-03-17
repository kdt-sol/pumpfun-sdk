import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlySignerAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getProgramDerivedAddress, getStructDecoder, getStructEncoder, transformEncoder } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const EXTEND_ACCOUNT_DISCRIMINATOR = new Uint8Array([234, 102, 194, 203, 150, 72, 62, 229])

export const getExtendAccountDiscriminatorBytes = () => fixEncoderSize(getBytesEncoder(), 8).encode(EXTEND_ACCOUNT_DISCRIMINATOR)

export type ExtendAccountInstruction<
    TProgram extends string = typeof PUMP_PROGRAM_ADDRESS,
    TAccountAccount extends string | IAccountMeta = string,
    TAccountUser extends string | IAccountMeta = string,
    TAccountSystemProgram extends | string
    | IAccountMeta = '11111111111111111111111111111111',
    TAccountEventAuthority extends string | IAccountMeta = string,
    TAccountProgram extends string | IAccountMeta = string,
    TRemainingAccounts extends readonly IAccountMeta[] = []
> = IInstruction<TProgram> &
    IInstructionWithData<Uint8Array> &
    IInstructionWithAccounts<
        [
            TAccountAccount extends string
                ? WritableAccount<TAccountAccount>
                : TAccountAccount,
            TAccountUser extends string
                ? ReadonlySignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser>
                : TAccountUser,
            TAccountSystemProgram extends string
                ? ReadonlyAccount<TAccountSystemProgram>
                : TAccountSystemProgram,
            TAccountEventAuthority extends string
                ? ReadonlyAccount<TAccountEventAuthority>
                : TAccountEventAuthority,
            TAccountProgram extends string
                ? ReadonlyAccount<TAccountProgram>
                : TAccountProgram,
            ...TRemainingAccounts
        ]
    >

export type ExtendAccountInstructionData = {
    discriminator: ReadonlyUint8Array
}

// eslint-disable-next-line ts/no-empty-object-type
export type ExtendAccountInstructionDataArgs = {}

export function getExtendAccountInstructionDataEncoder(): Encoder<ExtendAccountInstructionDataArgs> {
    return transformEncoder(
        getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
        (value) => ({ ...value, discriminator: EXTEND_ACCOUNT_DISCRIMINATOR }),
    )
}

export function getExtendAccountInstructionDataDecoder(): Decoder<ExtendAccountInstructionData> {
    return getStructDecoder([
        ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ])
}

export function getExtendAccountInstructionDataCodec(): Codec<
    ExtendAccountInstructionDataArgs,
    ExtendAccountInstructionData
> {
    return combineCodec(
        getExtendAccountInstructionDataEncoder(),
        getExtendAccountInstructionDataDecoder(),
    )
}

export type ExtendAccountAsyncInput<
    TAccountAccount extends string = string,
    TAccountUser extends string = string,
    TAccountSystemProgram extends string = string,
    TAccountEventAuthority extends string = string,
    TAccountProgram extends string = string
> = {
    account: Address<TAccountAccount>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    eventAuthority?: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export async function getExtendAccountInstructionAsync<
    TAccountAccount extends string,
    TAccountUser extends string,
    TAccountSystemProgram extends string,
    TAccountEventAuthority extends string,
    TAccountProgram extends string,
    TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS
>(
    input: ExtendAccountAsyncInput<
        TAccountAccount,
        TAccountUser,
        TAccountSystemProgram,
        TAccountEventAuthority,
        TAccountProgram
    >,
    config?: { programAddress?: TProgramAddress },
): Promise<
        ExtendAccountInstruction<
            TProgramAddress,
            TAccountAccount,
            TAccountUser,
            TAccountSystemProgram,
            TAccountEventAuthority,
            TAccountProgram
        >
    > {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        account: { value: input.account ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: false },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<
        keyof typeof originalAccounts,
        ResolvedAccount
    >

    // Resolve default values.
    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value = '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
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
            getAccountMeta(accounts.account),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getExtendAccountInstructionDataEncoder().encode({}),
    }

    return instruction as ExtendAccountInstruction<TProgramAddress, TAccountAccount, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram>
}

export type ExtendAccountInput<TAccountAccount extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string, TAccountEventAuthority extends string = string, TAccountProgram extends string = string> = {
    account: Address<TAccountAccount>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export function getExtendAccountInstruction<TAccountAccount extends string, TAccountUser extends string, TAccountSystemProgram extends string, TAccountEventAuthority extends string, TAccountProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: ExtendAccountInput<TAccountAccount, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram>, config?: { programAddress?: TProgramAddress }): ExtendAccountInstruction<TProgramAddress, TAccountAccount, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram> {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        account: { value: input.account ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: false },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<keyof typeof originalAccounts, ResolvedAccount>

    // Resolve default values.
    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value = '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.account),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getExtendAccountInstructionDataEncoder().encode({}),
    }

    return instruction as ExtendAccountInstruction<TProgramAddress, TAccountAccount, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram>
}

export type ParsedExtendAccountInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> = {
    programAddress: Address<TProgram>
    accounts: {
        account: TAccountMetas[0]
        user: TAccountMetas[1]
        systemProgram: TAccountMetas[2]
        eventAuthority: TAccountMetas[3]
        program: TAccountMetas[4]
    }
    data: ExtendAccountInstructionData
}

export function parseExtendAccountInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedExtendAccountInstruction<TProgram, TAccountMetas> {
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
            account: getNextAccount(),
            user: getNextAccount(),
            systemProgram: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getExtendAccountInstructionDataDecoder().decode(instruction.data),
    }
}
