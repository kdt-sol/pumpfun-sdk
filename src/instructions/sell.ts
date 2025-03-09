import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, type WritableSignerAccount, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder, transformEncoder } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS, SYSTEM_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const SELL_DISCRIMINATOR = new Uint8Array([51, 230, 133, 164, 1, 127, 131, 173])

export function getSellDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(SELL_DISCRIMINATOR)
}

export type SellInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountGlobal extends string | IAccountMeta = string, TAccountFeeRecipient extends string | IAccountMeta = string, TAccountMint extends string | IAccountMeta = string, TAccountBondingCurve extends string | IAccountMeta = string, TAccountAssociatedBondingCurve extends string | IAccountMeta = string, TAccountAssociatedUser extends string | IAccountMeta = string, TAccountUser extends string | IAccountMeta = string, TAccountSystemProgram extends | string | IAccountMeta = typeof SYSTEM_PROGRAM_ADDRESS, TAccountAssociatedTokenProgram extends string | IAccountMeta = string, TAccountTokenProgram extends | string | IAccountMeta = typeof TOKEN_PROGRAM_ADDRESS, TAccountEventAuthority extends string | IAccountMeta = string, TAccountProgram extends string | IAccountMeta = string, TRemainingAccounts extends readonly IAccountMeta[] = []> = IInstruction<TProgram> & IInstructionWithData<Uint8Array> & IInstructionWithAccounts<[
    TAccountGlobal extends string ? ReadonlyAccount<TAccountGlobal> : TAccountGlobal, TAccountFeeRecipient extends string ? WritableAccount<TAccountFeeRecipient> : TAccountFeeRecipient, TAccountMint extends string ? ReadonlyAccount<TAccountMint> : TAccountMint, TAccountBondingCurve extends string ? WritableAccount<TAccountBondingCurve> : TAccountBondingCurve, TAccountAssociatedBondingCurve extends string ? WritableAccount<TAccountAssociatedBondingCurve> : TAccountAssociatedBondingCurve, TAccountAssociatedUser extends string ? WritableAccount<TAccountAssociatedUser> : TAccountAssociatedUser, TAccountUser extends string ? WritableSignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser> : TAccountUser, TAccountSystemProgram extends string ? ReadonlyAccount<TAccountSystemProgram> : TAccountSystemProgram, TAccountAssociatedTokenProgram extends string ? ReadonlyAccount<TAccountAssociatedTokenProgram> : TAccountAssociatedTokenProgram, TAccountTokenProgram extends string ? ReadonlyAccount<TAccountTokenProgram> : TAccountTokenProgram, TAccountEventAuthority extends string ? ReadonlyAccount<TAccountEventAuthority> : TAccountEventAuthority, TAccountProgram extends string ? ReadonlyAccount<TAccountProgram> : TAccountProgram, ...TRemainingAccounts
]>

export interface SellInstructionData {
    discriminator: ReadonlyUint8Array
    amount: bigint
    minSolOutput: bigint
}

export interface SellInstructionDataArgs {
    amount: number | bigint
    minSolOutput: number | bigint
}

export const getSellInstructionDataEncoder = (): Encoder<SellInstructionDataArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['amount', getU64Encoder()],
        ['minSolOutput', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: SELL_DISCRIMINATOR }),
)

export const getSellInstructionDataDecoder = (): Decoder<SellInstructionData> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['amount', getU64Decoder()],
    ['minSolOutput', getU64Decoder()],
])

export function getSellInstructionDataCodec(): Codec<SellInstructionDataArgs, SellInstructionData> {
    return combineCodec(getSellInstructionDataEncoder(), getSellInstructionDataDecoder())
}

export interface SellInput<TAccountGlobal extends string = string, TAccountFeeRecipient extends string = string, TAccountMint extends string = string, TAccountBondingCurve extends string = string, TAccountAssociatedBondingCurve extends string = string, TAccountAssociatedUser extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string, TAccountAssociatedTokenProgram extends string = string, TAccountTokenProgram extends string = string, TAccountEventAuthority extends string = string, TAccountProgram extends string = string> {
    global: Address<TAccountGlobal>
    feeRecipient: Address<TAccountFeeRecipient>
    mint: Address<TAccountMint>
    bondingCurve: Address<TAccountBondingCurve>
    associatedBondingCurve: Address<TAccountAssociatedBondingCurve>
    associatedUser: Address<TAccountAssociatedUser>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    associatedTokenProgram: Address<TAccountAssociatedTokenProgram>
    tokenProgram?: Address<TAccountTokenProgram>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
    amount: SellInstructionDataArgs['amount']
    minSolOutput: SellInstructionDataArgs['minSolOutput']
}

export function getSellInstruction<TAccountGlobal extends string, TAccountFeeRecipient extends string, TAccountMint extends string, TAccountBondingCurve extends string, TAccountAssociatedBondingCurve extends string, TAccountAssociatedUser extends string, TAccountUser extends string, TAccountSystemProgram extends string, TAccountAssociatedTokenProgram extends string, TAccountTokenProgram extends string, TAccountEventAuthority extends string, TAccountProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: SellInput<TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountAssociatedTokenProgram, TAccountTokenProgram, TAccountEventAuthority, TAccountProgram>, config?: { programAddress?: TProgramAddress }): SellInstruction<TProgramAddress, TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountAssociatedTokenProgram, TAccountTokenProgram, TAccountEventAuthority, TAccountProgram> {
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: false },
        feeRecipient: { value: input.feeRecipient ?? null, isWritable: true },
        mint: { value: input.mint ?? null, isWritable: false },
        bondingCurve: { value: input.bondingCurve ?? null, isWritable: true },
        associatedBondingCurve: { value: input.associatedBondingCurve ?? null, isWritable: true },
        associatedUser: { value: input.associatedUser ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: true },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        associatedTokenProgram: { value: input.associatedTokenProgram ?? null, isWritable: false },
        tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
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

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.feeRecipient),
            getAccountMeta(accounts.mint),
            getAccountMeta(accounts.bondingCurve),
            getAccountMeta(accounts.associatedBondingCurve),
            getAccountMeta(accounts.associatedUser),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.associatedTokenProgram),
            getAccountMeta(accounts.tokenProgram),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getSellInstructionDataEncoder().encode(args as SellInstructionDataArgs),
    }

    return instruction as SellInstruction<TProgramAddress, TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountAssociatedTokenProgram, TAccountTokenProgram, TAccountEventAuthority, TAccountProgram>
}

export type ParsedSellInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> = {
    programAddress: Address<TProgram>
    accounts: {
        global: TAccountMetas[0]
        feeRecipient: TAccountMetas[1]
        mint: TAccountMetas[2]
        bondingCurve: TAccountMetas[3]
        associatedBondingCurve: TAccountMetas[4]
        associatedUser: TAccountMetas[5]
        user: TAccountMetas[6]
        systemProgram: TAccountMetas[7]
        associatedTokenProgram: TAccountMetas[8]
        tokenProgram: TAccountMetas[9]
        eventAuthority: TAccountMetas[10]
        program: TAccountMetas[11]
    }
    data: SellInstructionData
}

export function parseSellInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedSellInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 12) {
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
            feeRecipient: getNextAccount(),
            mint: getNextAccount(),
            bondingCurve: getNextAccount(),
            associatedBondingCurve: getNextAccount(),
            associatedUser: getNextAccount(),
            user: getNextAccount(),
            systemProgram: getNextAccount(),
            associatedTokenProgram: getNextAccount(),
            tokenProgram: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getSellInstructionDataDecoder().decode(instruction.data),
    }
}
