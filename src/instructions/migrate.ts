import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlySignerAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, combineCodec, fixDecoderSize, fixEncoderSize, getAddressEncoder, getBytesDecoder, getBytesEncoder, getProgramDerivedAddress, getStructDecoder, getStructEncoder, transformEncoder } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, expectAddress, getAccountMetaFactory } from '../utils'

export const MIGRATE_DISCRIMINATOR = new Uint8Array([
    155, 234, 231, 146, 236, 158, 162, 30,
])

export function getMigrateDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(MIGRATE_DISCRIMINATOR)
}

export type MigrateInstruction<
    TProgram extends string = typeof PUMP_PROGRAM_ADDRESS,
    TAccountGlobal extends string | IAccountMeta = string,
    TAccountWithdrawAuthority extends string | IAccountMeta = string,
    TAccountMint extends string | IAccountMeta = string,
    TAccountBondingCurve extends string | IAccountMeta = string,
    TAccountAssociatedBondingCurve extends string | IAccountMeta = string,
    TAccountUser extends string | IAccountMeta = string,
    TAccountSystemProgram extends | string
    | IAccountMeta = '11111111111111111111111111111111',
    TAccountTokenProgram extends | string
    | IAccountMeta = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    TAccountMetadataAccount extends string | IAccountMeta = string,
    TAccountCreator extends string | IAccountMeta = string,
    TAccountPumpAmm extends | string
    | IAccountMeta = 'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA',
    TAccountPool extends string | IAccountMeta = string,
    TAccountPoolAuthority extends string | IAccountMeta = string,
    TAccountPoolAuthorityMintAccount extends | string
    | IAccountMeta = string,
    TAccountPoolAuthorityWsolAccount extends | string
    | IAccountMeta = string,
    TAccountAmmGlobalConfig extends string | IAccountMeta = string,
    TAccountWsolMint extends | string
    | IAccountMeta = 'So11111111111111111111111111111111111111112',
    TAccountLpMint extends string | IAccountMeta = string,
    TAccountUserPoolTokenAccount extends string | IAccountMeta = string,
    TAccountPoolBaseTokenAccount extends string | IAccountMeta = string,
    TAccountPoolQuoteTokenAccount extends string | IAccountMeta = string,
    TAccountToken2022Program extends | string
    | IAccountMeta = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
    TAccountAssociatedTokenProgram extends | string
    | IAccountMeta = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    TAccountPumpAmmEventAuthority extends string | IAccountMeta = string,
    TAccountEventAuthority extends string | IAccountMeta = string,
    TAccountProgram extends string | IAccountMeta = string,
    TRemainingAccounts extends readonly IAccountMeta[] = []
> = IInstruction<TProgram> &
    IInstructionWithData<Uint8Array> &
    IInstructionWithAccounts<
        [
            TAccountGlobal extends string
                ? ReadonlyAccount<TAccountGlobal>
                : TAccountGlobal,
            TAccountWithdrawAuthority extends string
                ? WritableAccount<TAccountWithdrawAuthority>
                : TAccountWithdrawAuthority,
            TAccountMint extends string
                ? ReadonlyAccount<TAccountMint>
                : TAccountMint,
            TAccountBondingCurve extends string
                ? WritableAccount<TAccountBondingCurve>
                : TAccountBondingCurve,
            TAccountAssociatedBondingCurve extends string
                ? WritableAccount<TAccountAssociatedBondingCurve>
                : TAccountAssociatedBondingCurve,
            TAccountUser extends string
                ? ReadonlySignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser>
                : TAccountUser,
            TAccountSystemProgram extends string
                ? ReadonlyAccount<TAccountSystemProgram>
                : TAccountSystemProgram,
            TAccountTokenProgram extends string
                ? ReadonlyAccount<TAccountTokenProgram>
                : TAccountTokenProgram,
            TAccountMetadataAccount extends string
                ? ReadonlyAccount<TAccountMetadataAccount>
                : TAccountMetadataAccount,
            TAccountCreator extends string
                ? WritableAccount<TAccountCreator>
                : TAccountCreator,
            TAccountPumpAmm extends string
                ? ReadonlyAccount<TAccountPumpAmm>
                : TAccountPumpAmm,
            TAccountPool extends string
                ? WritableAccount<TAccountPool>
                : TAccountPool,
            TAccountPoolAuthority extends string
                ? WritableAccount<TAccountPoolAuthority>
                : TAccountPoolAuthority,
            TAccountPoolAuthorityMintAccount extends string
                ? WritableAccount<TAccountPoolAuthorityMintAccount>
                : TAccountPoolAuthorityMintAccount,
            TAccountPoolAuthorityWsolAccount extends string
                ? WritableAccount<TAccountPoolAuthorityWsolAccount>
                : TAccountPoolAuthorityWsolAccount,
            TAccountAmmGlobalConfig extends string
                ? ReadonlyAccount<TAccountAmmGlobalConfig>
                : TAccountAmmGlobalConfig,
            TAccountWsolMint extends string
                ? ReadonlyAccount<TAccountWsolMint>
                : TAccountWsolMint,
            TAccountLpMint extends string
                ? WritableAccount<TAccountLpMint>
                : TAccountLpMint,
            TAccountUserPoolTokenAccount extends string
                ? WritableAccount<TAccountUserPoolTokenAccount>
                : TAccountUserPoolTokenAccount,
            TAccountPoolBaseTokenAccount extends string
                ? WritableAccount<TAccountPoolBaseTokenAccount>
                : TAccountPoolBaseTokenAccount,
            TAccountPoolQuoteTokenAccount extends string
                ? WritableAccount<TAccountPoolQuoteTokenAccount>
                : TAccountPoolQuoteTokenAccount,
            TAccountToken2022Program extends string
                ? ReadonlyAccount<TAccountToken2022Program>
                : TAccountToken2022Program,
            TAccountAssociatedTokenProgram extends string
                ? ReadonlyAccount<TAccountAssociatedTokenProgram>
                : TAccountAssociatedTokenProgram,
            TAccountPumpAmmEventAuthority extends string
                ? ReadonlyAccount<TAccountPumpAmmEventAuthority>
                : TAccountPumpAmmEventAuthority,
            TAccountEventAuthority extends string
                ? ReadonlyAccount<TAccountEventAuthority>
                : TAccountEventAuthority,
            TAccountProgram extends string
                ? ReadonlyAccount<TAccountProgram>
                : TAccountProgram,
            ...TRemainingAccounts
        ]
    >

export type MigrateInstructionData = { discriminator: ReadonlyUint8Array }

// eslint-disable-next-line ts/no-empty-object-type
export type MigrateInstructionDataArgs = {}

export function getMigrateInstructionDataEncoder(): Encoder<MigrateInstructionDataArgs> {
    return transformEncoder(
        getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
        (value) => ({ ...value, discriminator: MIGRATE_DISCRIMINATOR }),
    )
}

export function getMigrateInstructionDataDecoder(): Decoder<MigrateInstructionData> {
    return getStructDecoder([
        ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ])
}

export function getMigrateInstructionDataCodec(): Codec<
    MigrateInstructionDataArgs,
    MigrateInstructionData
> {
    return combineCodec(
        getMigrateInstructionDataEncoder(),
        getMigrateInstructionDataDecoder(),
    )
}

export type MigrateAsyncInput<
    TAccountGlobal extends string = string,
    TAccountWithdrawAuthority extends string = string,
    TAccountMint extends string = string,
    TAccountBondingCurve extends string = string,
    TAccountAssociatedBondingCurve extends string = string,
    TAccountUser extends string = string,
    TAccountSystemProgram extends string = string,
    TAccountTokenProgram extends string = string,
    TAccountMetadataAccount extends string = string,
    TAccountCreator extends string = string,
    TAccountPumpAmm extends string = string,
    TAccountPool extends string = string,
    TAccountPoolAuthority extends string = string,
    TAccountPoolAuthorityMintAccount extends string = string,
    TAccountPoolAuthorityWsolAccount extends string = string,
    TAccountAmmGlobalConfig extends string = string,
    TAccountWsolMint extends string = string,
    TAccountLpMint extends string = string,
    TAccountUserPoolTokenAccount extends string = string,
    TAccountPoolBaseTokenAccount extends string = string,
    TAccountPoolQuoteTokenAccount extends string = string,
    TAccountToken2022Program extends string = string,
    TAccountAssociatedTokenProgram extends string = string,
    TAccountPumpAmmEventAuthority extends string = string,
    TAccountEventAuthority extends string = string,
    TAccountProgram extends string = string
> = {
    global?: Address<TAccountGlobal>
    withdrawAuthority: Address<TAccountWithdrawAuthority>
    mint: Address<TAccountMint>
    bondingCurve?: Address<TAccountBondingCurve>
    associatedBondingCurve?: Address<TAccountAssociatedBondingCurve>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    tokenProgram?: Address<TAccountTokenProgram>
    metadataAccount?: Address<TAccountMetadataAccount>

    /** metadata account creators only if creators is not None */
    creator: Address<TAccountCreator>
    pumpAmm?: Address<TAccountPumpAmm>
    pool: Address<TAccountPool>
    poolAuthority?: Address<TAccountPoolAuthority>
    poolAuthorityMintAccount: Address<TAccountPoolAuthorityMintAccount>
    poolAuthorityWsolAccount: Address<TAccountPoolAuthorityWsolAccount>
    ammGlobalConfig: Address<TAccountAmmGlobalConfig>
    wsolMint?: Address<TAccountWsolMint>
    lpMint: Address<TAccountLpMint>
    userPoolTokenAccount: Address<TAccountUserPoolTokenAccount>
    poolBaseTokenAccount: Address<TAccountPoolBaseTokenAccount>
    poolQuoteTokenAccount: Address<TAccountPoolQuoteTokenAccount>
    token2022Program?: Address<TAccountToken2022Program>
    associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>
    pumpAmmEventAuthority: Address<TAccountPumpAmmEventAuthority>
    eventAuthority?: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export async function getMigrateInstructionAsync<
    TAccountGlobal extends string,
    TAccountWithdrawAuthority extends string,
    TAccountMint extends string,
    TAccountBondingCurve extends string,
    TAccountAssociatedBondingCurve extends string,
    TAccountUser extends string,
    TAccountSystemProgram extends string,
    TAccountTokenProgram extends string,
    TAccountMetadataAccount extends string,
    TAccountCreator extends string,
    TAccountPumpAmm extends string,
    TAccountPool extends string,
    TAccountPoolAuthority extends string,
    TAccountPoolAuthorityMintAccount extends string,
    TAccountPoolAuthorityWsolAccount extends string,
    TAccountAmmGlobalConfig extends string,
    TAccountWsolMint extends string,
    TAccountLpMint extends string,
    TAccountUserPoolTokenAccount extends string,
    TAccountPoolBaseTokenAccount extends string,
    TAccountPoolQuoteTokenAccount extends string,
    TAccountToken2022Program extends string,
    TAccountAssociatedTokenProgram extends string,
    TAccountPumpAmmEventAuthority extends string,
    TAccountEventAuthority extends string,
    TAccountProgram extends string,
    TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS
>(
    input: MigrateAsyncInput<
        TAccountGlobal,
        TAccountWithdrawAuthority,
        TAccountMint,
        TAccountBondingCurve,
        TAccountAssociatedBondingCurve,
        TAccountUser,
        TAccountSystemProgram,
        TAccountTokenProgram,
        TAccountMetadataAccount,
        TAccountCreator,
        TAccountPumpAmm,
        TAccountPool,
        TAccountPoolAuthority,
        TAccountPoolAuthorityMintAccount,
        TAccountPoolAuthorityWsolAccount,
        TAccountAmmGlobalConfig,
        TAccountWsolMint,
        TAccountLpMint,
        TAccountUserPoolTokenAccount,
        TAccountPoolBaseTokenAccount,
        TAccountPoolQuoteTokenAccount,
        TAccountToken2022Program,
        TAccountAssociatedTokenProgram,
        TAccountPumpAmmEventAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >,
    config?: { programAddress?: TProgramAddress },
): Promise<
        MigrateInstruction<
            TProgramAddress,
            TAccountGlobal,
            TAccountWithdrawAuthority,
            TAccountMint,
            TAccountBondingCurve,
            TAccountAssociatedBondingCurve,
            TAccountUser,
            TAccountSystemProgram,
            TAccountTokenProgram,
            TAccountMetadataAccount,
            TAccountCreator,
            TAccountPumpAmm,
            TAccountPool,
            TAccountPoolAuthority,
            TAccountPoolAuthorityMintAccount,
            TAccountPoolAuthorityWsolAccount,
            TAccountAmmGlobalConfig,
            TAccountWsolMint,
            TAccountLpMint,
            TAccountUserPoolTokenAccount,
            TAccountPoolBaseTokenAccount,
            TAccountPoolQuoteTokenAccount,
            TAccountToken2022Program,
            TAccountAssociatedTokenProgram,
            TAccountPumpAmmEventAuthority,
            TAccountEventAuthority,
            TAccountProgram
        >
    > {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: false },
        withdrawAuthority: {
            value: input.withdrawAuthority ?? null,
            isWritable: true,
        },
        mint: { value: input.mint ?? null, isWritable: false },
        bondingCurve: { value: input.bondingCurve ?? null, isWritable: true },
        associatedBondingCurve: {
            value: input.associatedBondingCurve ?? null,
            isWritable: true,
        },
        user: { value: input.user ?? null, isWritable: false },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
        metadataAccount: {
            value: input.metadataAccount ?? null,
            isWritable: false,
        },
        creator: { value: input.creator ?? null, isWritable: true },
        pumpAmm: { value: input.pumpAmm ?? null, isWritable: false },
        pool: { value: input.pool ?? null, isWritable: true },
        poolAuthority: { value: input.poolAuthority ?? null, isWritable: true },
        poolAuthorityMintAccount: {
            value: input.poolAuthorityMintAccount ?? null,
            isWritable: true,
        },
        poolAuthorityWsolAccount: {
            value: input.poolAuthorityWsolAccount ?? null,
            isWritable: true,
        },
        ammGlobalConfig: {
            value: input.ammGlobalConfig ?? null,
            isWritable: false,
        },
        wsolMint: { value: input.wsolMint ?? null, isWritable: false },
        lpMint: { value: input.lpMint ?? null, isWritable: true },
        userPoolTokenAccount: {
            value: input.userPoolTokenAccount ?? null,
            isWritable: true,
        },
        poolBaseTokenAccount: {
            value: input.poolBaseTokenAccount ?? null,
            isWritable: true,
        },
        poolQuoteTokenAccount: {
            value: input.poolQuoteTokenAccount ?? null,
            isWritable: true,
        },
        token2022Program: {
            value: input.token2022Program ?? null,
            isWritable: false,
        },
        associatedTokenProgram: {
            value: input.associatedTokenProgram ?? null,
            isWritable: false,
        },
        pumpAmmEventAuthority: {
            value: input.pumpAmmEventAuthority ?? null,
            isWritable: false,
        },
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

    if (!accounts.bondingCurve.value) {
        accounts.bondingCurve.value = await getProgramDerivedAddress({
            programAddress,
            seeds: [
                getBytesEncoder().encode(
                    new Uint8Array([
                        98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101,
                    ]),
                ),
                getAddressEncoder().encode(expectAddress(accounts.mint.value)),
            ],
        })
    }

    if (!accounts.associatedBondingCurve.value) {
        accounts.associatedBondingCurve.value = await getProgramDerivedAddress({
            programAddress:
                'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>,
            seeds: [
                getAddressEncoder().encode(expectAddress(accounts.bondingCurve.value)),
                getBytesEncoder().encode(
                    new Uint8Array([
                        6,
                        221,
                        246,
                        225,
                        215,
                        101,
                        161,
                        147,
                        217,
                        203,
                        225,
                        70,
                        206,
                        235,
                        121,
                        172,
                        28,
                        180,
                        133,
                        237,
                        95,
                        91,
                        55,
                        145,
                        58,
                        140,
                        245,
                        133,
                        126,
                        255,
                        0,
                        169,
                    ]),
                ),
                getAddressEncoder().encode(expectAddress(accounts.mint.value)),
            ],
        })
    }

    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value =
            '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
    }

    if (!accounts.tokenProgram.value) {
        accounts.tokenProgram.value =
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>
    }

    if (!accounts.metadataAccount.value) {
        accounts.metadataAccount.value = await getProgramDerivedAddress({
            programAddress:
                'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
            seeds: [
                getBytesEncoder().encode(
                    new Uint8Array([109, 101, 116, 97, 100, 97, 116, 97]),
                ),
                getBytesEncoder().encode(
                    new Uint8Array([
                        11,
                        112,
                        101,
                        177,
                        227,
                        209,
                        124,
                        69,
                        56,
                        157,
                        82,
                        127,
                        107,
                        4,
                        195,
                        205,
                        88,
                        184,
                        108,
                        115,
                        26,
                        160,
                        253,
                        181,
                        73,
                        182,
                        209,
                        188,
                        3,
                        248,
                        41,
                        70,
                    ]),
                ),
                getAddressEncoder().encode(expectAddress(accounts.mint.value)),
            ],
        })
    }

    if (!accounts.pumpAmm.value) {
        accounts.pumpAmm.value =
            'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA' as Address<'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'>
    }

    if (!accounts.poolAuthority.value) {
        accounts.poolAuthority.value = await getProgramDerivedAddress({
            programAddress,
            seeds: [
                getBytesEncoder().encode(
                    new Uint8Array([
                        112, 111, 111, 108, 45, 97, 117, 116, 104, 111, 114, 105, 116, 121,
                    ]),
                ),
                getAddressEncoder().encode(expectAddress(accounts.mint.value)),
            ],
        })
    }

    if (!accounts.wsolMint.value) {
        accounts.wsolMint.value =
            'So11111111111111111111111111111111111111112' as Address<'So11111111111111111111111111111111111111112'>
    }

    if (!accounts.token2022Program.value) {
        accounts.token2022Program.value =
            'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>
    }

    if (!accounts.associatedTokenProgram.value) {
        accounts.associatedTokenProgram.value =
            'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>
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
            getAccountMeta(accounts.withdrawAuthority),
            getAccountMeta(accounts.mint),
            getAccountMeta(accounts.bondingCurve),
            getAccountMeta(accounts.associatedBondingCurve),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.tokenProgram),
            getAccountMeta(accounts.metadataAccount),
            getAccountMeta(accounts.creator),
            getAccountMeta(accounts.pumpAmm),
            getAccountMeta(accounts.pool),
            getAccountMeta(accounts.poolAuthority),
            getAccountMeta(accounts.poolAuthorityMintAccount),
            getAccountMeta(accounts.poolAuthorityWsolAccount),
            getAccountMeta(accounts.ammGlobalConfig),
            getAccountMeta(accounts.wsolMint),
            getAccountMeta(accounts.lpMint),
            getAccountMeta(accounts.userPoolTokenAccount),
            getAccountMeta(accounts.poolBaseTokenAccount),
            getAccountMeta(accounts.poolQuoteTokenAccount),
            getAccountMeta(accounts.token2022Program),
            getAccountMeta(accounts.associatedTokenProgram),
            getAccountMeta(accounts.pumpAmmEventAuthority),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getMigrateInstructionDataEncoder().encode({}),
    } as MigrateInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountWithdrawAuthority,
        TAccountMint,
        TAccountBondingCurve,
        TAccountAssociatedBondingCurve,
        TAccountUser,
        TAccountSystemProgram,
        TAccountTokenProgram,
        TAccountMetadataAccount,
        TAccountCreator,
        TAccountPumpAmm,
        TAccountPool,
        TAccountPoolAuthority,
        TAccountPoolAuthorityMintAccount,
        TAccountPoolAuthorityWsolAccount,
        TAccountAmmGlobalConfig,
        TAccountWsolMint,
        TAccountLpMint,
        TAccountUserPoolTokenAccount,
        TAccountPoolBaseTokenAccount,
        TAccountPoolQuoteTokenAccount,
        TAccountToken2022Program,
        TAccountAssociatedTokenProgram,
        TAccountPumpAmmEventAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >

    return instruction
}

export type MigrateInput<
    TAccountGlobal extends string = string,
    TAccountWithdrawAuthority extends string = string,
    TAccountMint extends string = string,
    TAccountBondingCurve extends string = string,
    TAccountAssociatedBondingCurve extends string = string,
    TAccountUser extends string = string,
    TAccountSystemProgram extends string = string,
    TAccountTokenProgram extends string = string,
    TAccountMetadataAccount extends string = string,
    TAccountCreator extends string = string,
    TAccountPumpAmm extends string = string,
    TAccountPool extends string = string,
    TAccountPoolAuthority extends string = string,
    TAccountPoolAuthorityMintAccount extends string = string,
    TAccountPoolAuthorityWsolAccount extends string = string,
    TAccountAmmGlobalConfig extends string = string,
    TAccountWsolMint extends string = string,
    TAccountLpMint extends string = string,
    TAccountUserPoolTokenAccount extends string = string,
    TAccountPoolBaseTokenAccount extends string = string,
    TAccountPoolQuoteTokenAccount extends string = string,
    TAccountToken2022Program extends string = string,
    TAccountAssociatedTokenProgram extends string = string,
    TAccountPumpAmmEventAuthority extends string = string,
    TAccountEventAuthority extends string = string,
    TAccountProgram extends string = string
> = {
    global: Address<TAccountGlobal>
    withdrawAuthority: Address<TAccountWithdrawAuthority>
    mint: Address<TAccountMint>
    bondingCurve: Address<TAccountBondingCurve>
    associatedBondingCurve: Address<TAccountAssociatedBondingCurve>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    tokenProgram?: Address<TAccountTokenProgram>
    metadataAccount: Address<TAccountMetadataAccount>

    /** metadata account creators only if creators is not None */
    creator: Address<TAccountCreator>
    pumpAmm?: Address<TAccountPumpAmm>
    pool: Address<TAccountPool>
    poolAuthority: Address<TAccountPoolAuthority>
    poolAuthorityMintAccount: Address<TAccountPoolAuthorityMintAccount>
    poolAuthorityWsolAccount: Address<TAccountPoolAuthorityWsolAccount>
    ammGlobalConfig: Address<TAccountAmmGlobalConfig>
    wsolMint?: Address<TAccountWsolMint>
    lpMint: Address<TAccountLpMint>
    userPoolTokenAccount: Address<TAccountUserPoolTokenAccount>
    poolBaseTokenAccount: Address<TAccountPoolBaseTokenAccount>
    poolQuoteTokenAccount: Address<TAccountPoolQuoteTokenAccount>
    token2022Program?: Address<TAccountToken2022Program>
    associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>
    pumpAmmEventAuthority: Address<TAccountPumpAmmEventAuthority>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
}

export function getMigrateInstruction<
    TAccountGlobal extends string,
    TAccountWithdrawAuthority extends string,
    TAccountMint extends string,
    TAccountBondingCurve extends string,
    TAccountAssociatedBondingCurve extends string,
    TAccountUser extends string,
    TAccountSystemProgram extends string,
    TAccountTokenProgram extends string,
    TAccountMetadataAccount extends string,
    TAccountCreator extends string,
    TAccountPumpAmm extends string,
    TAccountPool extends string,
    TAccountPoolAuthority extends string,
    TAccountPoolAuthorityMintAccount extends string,
    TAccountPoolAuthorityWsolAccount extends string,
    TAccountAmmGlobalConfig extends string,
    TAccountWsolMint extends string,
    TAccountLpMint extends string,
    TAccountUserPoolTokenAccount extends string,
    TAccountPoolBaseTokenAccount extends string,
    TAccountPoolQuoteTokenAccount extends string,
    TAccountToken2022Program extends string,
    TAccountAssociatedTokenProgram extends string,
    TAccountPumpAmmEventAuthority extends string,
    TAccountEventAuthority extends string,
    TAccountProgram extends string,
    TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS
>(
    input: MigrateInput<
        TAccountGlobal,
        TAccountWithdrawAuthority,
        TAccountMint,
        TAccountBondingCurve,
        TAccountAssociatedBondingCurve,
        TAccountUser,
        TAccountSystemProgram,
        TAccountTokenProgram,
        TAccountMetadataAccount,
        TAccountCreator,
        TAccountPumpAmm,
        TAccountPool,
        TAccountPoolAuthority,
        TAccountPoolAuthorityMintAccount,
        TAccountPoolAuthorityWsolAccount,
        TAccountAmmGlobalConfig,
        TAccountWsolMint,
        TAccountLpMint,
        TAccountUserPoolTokenAccount,
        TAccountPoolBaseTokenAccount,
        TAccountPoolQuoteTokenAccount,
        TAccountToken2022Program,
        TAccountAssociatedTokenProgram,
        TAccountPumpAmmEventAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >,
    config?: { programAddress?: TProgramAddress },
): MigrateInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountWithdrawAuthority,
        TAccountMint,
        TAccountBondingCurve,
        TAccountAssociatedBondingCurve,
        TAccountUser,
        TAccountSystemProgram,
        TAccountTokenProgram,
        TAccountMetadataAccount,
        TAccountCreator,
        TAccountPumpAmm,
        TAccountPool,
        TAccountPoolAuthority,
        TAccountPoolAuthorityMintAccount,
        TAccountPoolAuthorityWsolAccount,
        TAccountAmmGlobalConfig,
        TAccountWsolMint,
        TAccountLpMint,
        TAccountUserPoolTokenAccount,
        TAccountPoolBaseTokenAccount,
        TAccountPoolQuoteTokenAccount,
        TAccountToken2022Program,
        TAccountAssociatedTokenProgram,
        TAccountPumpAmmEventAuthority,
        TAccountEventAuthority,
        TAccountProgram
    > {
    // Program address.
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    // Original accounts.
    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: false },
        withdrawAuthority: {
            value: input.withdrawAuthority ?? null,
            isWritable: true,
        },
        mint: { value: input.mint ?? null, isWritable: false },
        bondingCurve: { value: input.bondingCurve ?? null, isWritable: true },
        associatedBondingCurve: {
            value: input.associatedBondingCurve ?? null,
            isWritable: true,
        },
        user: { value: input.user ?? null, isWritable: false },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
        metadataAccount: {
            value: input.metadataAccount ?? null,
            isWritable: false,
        },
        creator: { value: input.creator ?? null, isWritable: true },
        pumpAmm: { value: input.pumpAmm ?? null, isWritable: false },
        pool: { value: input.pool ?? null, isWritable: true },
        poolAuthority: { value: input.poolAuthority ?? null, isWritable: true },
        poolAuthorityMintAccount: {
            value: input.poolAuthorityMintAccount ?? null,
            isWritable: true,
        },
        poolAuthorityWsolAccount: {
            value: input.poolAuthorityWsolAccount ?? null,
            isWritable: true,
        },
        ammGlobalConfig: {
            value: input.ammGlobalConfig ?? null,
            isWritable: false,
        },
        wsolMint: { value: input.wsolMint ?? null, isWritable: false },
        lpMint: { value: input.lpMint ?? null, isWritable: true },
        userPoolTokenAccount: {
            value: input.userPoolTokenAccount ?? null,
            isWritable: true,
        },
        poolBaseTokenAccount: {
            value: input.poolBaseTokenAccount ?? null,
            isWritable: true,
        },
        poolQuoteTokenAccount: {
            value: input.poolQuoteTokenAccount ?? null,
            isWritable: true,
        },
        token2022Program: {
            value: input.token2022Program ?? null,
            isWritable: false,
        },
        associatedTokenProgram: {
            value: input.associatedTokenProgram ?? null,
            isWritable: false,
        },
        pumpAmmEventAuthority: {
            value: input.pumpAmmEventAuthority ?? null,
            isWritable: false,
        },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<
        keyof typeof originalAccounts,
        ResolvedAccount
    >

    // Resolve default values.
    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value =
            '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
    }

    if (!accounts.tokenProgram.value) {
        accounts.tokenProgram.value =
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>
    }

    if (!accounts.pumpAmm.value) {
        accounts.pumpAmm.value =
            'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA' as Address<'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'>
    }

    if (!accounts.wsolMint.value) {
        accounts.wsolMint.value =
            'So11111111111111111111111111111111111111112' as Address<'So11111111111111111111111111111111111111112'>
    }

    if (!accounts.token2022Program.value) {
        accounts.token2022Program.value =
            'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>
    }

    if (!accounts.associatedTokenProgram.value) {
        accounts.associatedTokenProgram.value =
            'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.withdrawAuthority),
            getAccountMeta(accounts.mint),
            getAccountMeta(accounts.bondingCurve),
            getAccountMeta(accounts.associatedBondingCurve),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.tokenProgram),
            getAccountMeta(accounts.metadataAccount),
            getAccountMeta(accounts.creator),
            getAccountMeta(accounts.pumpAmm),
            getAccountMeta(accounts.pool),
            getAccountMeta(accounts.poolAuthority),
            getAccountMeta(accounts.poolAuthorityMintAccount),
            getAccountMeta(accounts.poolAuthorityWsolAccount),
            getAccountMeta(accounts.ammGlobalConfig),
            getAccountMeta(accounts.wsolMint),
            getAccountMeta(accounts.lpMint),
            getAccountMeta(accounts.userPoolTokenAccount),
            getAccountMeta(accounts.poolBaseTokenAccount),
            getAccountMeta(accounts.poolQuoteTokenAccount),
            getAccountMeta(accounts.token2022Program),
            getAccountMeta(accounts.associatedTokenProgram),
            getAccountMeta(accounts.pumpAmmEventAuthority),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getMigrateInstructionDataEncoder().encode({}),
    } as MigrateInstruction<
        TProgramAddress,
        TAccountGlobal,
        TAccountWithdrawAuthority,
        TAccountMint,
        TAccountBondingCurve,
        TAccountAssociatedBondingCurve,
        TAccountUser,
        TAccountSystemProgram,
        TAccountTokenProgram,
        TAccountMetadataAccount,
        TAccountCreator,
        TAccountPumpAmm,
        TAccountPool,
        TAccountPoolAuthority,
        TAccountPoolAuthorityMintAccount,
        TAccountPoolAuthorityWsolAccount,
        TAccountAmmGlobalConfig,
        TAccountWsolMint,
        TAccountLpMint,
        TAccountUserPoolTokenAccount,
        TAccountPoolBaseTokenAccount,
        TAccountPoolQuoteTokenAccount,
        TAccountToken2022Program,
        TAccountAssociatedTokenProgram,
        TAccountPumpAmmEventAuthority,
        TAccountEventAuthority,
        TAccountProgram
    >

    return instruction
}

export type ParsedMigrateInstruction<
    TProgram extends string = typeof PUMP_PROGRAM_ADDRESS,
    TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
    programAddress: Address<TProgram>
    accounts: {
        global: TAccountMetas[0]
        withdrawAuthority: TAccountMetas[1]
        mint: TAccountMetas[2]
        bondingCurve: TAccountMetas[3]
        associatedBondingCurve: TAccountMetas[4]
        user: TAccountMetas[5]
        systemProgram: TAccountMetas[6]
        tokenProgram: TAccountMetas[7]
        metadataAccount: TAccountMetas[8]

        /** metadata account creators only if creators is not None */
        creator: TAccountMetas[9]
        pumpAmm: TAccountMetas[10]
        pool: TAccountMetas[11]
        poolAuthority: TAccountMetas[12]
        poolAuthorityMintAccount: TAccountMetas[13]
        poolAuthorityWsolAccount: TAccountMetas[14]
        ammGlobalConfig: TAccountMetas[15]
        wsolMint: TAccountMetas[16]
        lpMint: TAccountMetas[17]
        userPoolTokenAccount: TAccountMetas[18]
        poolBaseTokenAccount: TAccountMetas[19]
        poolQuoteTokenAccount: TAccountMetas[20]
        token2022Program: TAccountMetas[21]
        associatedTokenProgram: TAccountMetas[22]
        pumpAmmEventAuthority: TAccountMetas[23]
        eventAuthority: TAccountMetas[24]
        program: TAccountMetas[25]
    }
    data: MigrateInstructionData
}

export function parseMigrateInstruction<
    TProgram extends string,
    TAccountMetas extends readonly IAccountMeta[]
>(
    instruction: IInstruction<TProgram> &
        IInstructionWithAccounts<TAccountMetas> &
        IInstructionWithData<Uint8Array>,
): ParsedMigrateInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 26) {
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
            withdrawAuthority: getNextAccount(),
            mint: getNextAccount(),
            bondingCurve: getNextAccount(),
            associatedBondingCurve: getNextAccount(),
            user: getNextAccount(),
            systemProgram: getNextAccount(),
            tokenProgram: getNextAccount(),
            metadataAccount: getNextAccount(),
            creator: getNextAccount(),
            pumpAmm: getNextAccount(),
            pool: getNextAccount(),
            poolAuthority: getNextAccount(),
            poolAuthorityMintAccount: getNextAccount(),
            poolAuthorityWsolAccount: getNextAccount(),
            ammGlobalConfig: getNextAccount(),
            wsolMint: getNextAccount(),
            lpMint: getNextAccount(),
            userPoolTokenAccount: getNextAccount(),
            poolBaseTokenAccount: getNextAccount(),
            poolQuoteTokenAccount: getNextAccount(),
            token2022Program: getNextAccount(),
            associatedTokenProgram: getNextAccount(),
            pumpAmmEventAuthority: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getMigrateInstructionDataDecoder().decode(instruction.data),
    }
}
