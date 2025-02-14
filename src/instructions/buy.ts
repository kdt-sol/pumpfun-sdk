import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, type WritableSignerAccount, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder, transformEncoder } from '@solana/web3.js'
import { PUMP_PROGRAM_ADDRESS, RENT_PROGRAM_ADDRESS, SYSTEM_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const BUY_DISCRIMINATOR = new Uint8Array([
    102, 6, 61, 18, 1, 218, 235, 234,
])

export function getBuyDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(BUY_DISCRIMINATOR)
}

export type BuyInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountGlobal extends string | IAccountMeta = string, TAccountFeeRecipient extends string | IAccountMeta = string, TAccountMint extends string | IAccountMeta = string, TAccountBondingCurve extends string | IAccountMeta = string, TAccountAssociatedBondingCurve extends string | IAccountMeta = string, TAccountAssociatedUser extends string | IAccountMeta = string, TAccountUser extends string | IAccountMeta = string, TAccountSystemProgram extends | string | IAccountMeta = typeof SYSTEM_PROGRAM_ADDRESS, TAccountTokenProgram extends | string | IAccountMeta = typeof TOKEN_PROGRAM_ADDRESS, TAccountRent extends | string | IAccountMeta = typeof RENT_PROGRAM_ADDRESS, TAccountEventAuthority extends string | IAccountMeta = string, TAccountProgram extends string | IAccountMeta = string, TRemainingAccounts extends readonly IAccountMeta[] = []> = IInstruction<TProgram> & IInstructionWithData<Uint8Array> & IInstructionWithAccounts<[
    TAccountGlobal extends string ? ReadonlyAccount<TAccountGlobal> : TAccountGlobal, TAccountFeeRecipient extends string ? WritableAccount<TAccountFeeRecipient> : TAccountFeeRecipient, TAccountMint extends string ? ReadonlyAccount<TAccountMint> : TAccountMint, TAccountBondingCurve extends string ? WritableAccount<TAccountBondingCurve> : TAccountBondingCurve, TAccountAssociatedBondingCurve extends string ? WritableAccount<TAccountAssociatedBondingCurve> : TAccountAssociatedBondingCurve, TAccountAssociatedUser extends string ? WritableAccount<TAccountAssociatedUser> : TAccountAssociatedUser, TAccountUser extends string ? WritableSignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser> : TAccountUser, TAccountSystemProgram extends string ? ReadonlyAccount<TAccountSystemProgram> : TAccountSystemProgram, TAccountTokenProgram extends string ? ReadonlyAccount<TAccountTokenProgram> : TAccountTokenProgram, TAccountRent extends string ? ReadonlyAccount<TAccountRent> : TAccountRent, TAccountEventAuthority extends string ? ReadonlyAccount<TAccountEventAuthority> : TAccountEventAuthority, TAccountProgram extends string ? ReadonlyAccount<TAccountProgram> : TAccountProgram, ...TRemainingAccounts
]>

export interface BuyInstructionData {
    discriminator: ReadonlyUint8Array
    amount: bigint
    maxSolCost: bigint
}

export interface BuyInstructionDataArgs {
    amount: number | bigint
    maxSolCost: number | bigint
}

export const getBuyInstructionDataEncoder = (): Encoder<BuyInstructionDataArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['amount', getU64Encoder()],
        ['maxSolCost', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: BUY_DISCRIMINATOR }),
)

export const getBuyInstructionDataDecoder = (): Decoder<BuyInstructionData> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['amount', getU64Decoder()],
    ['maxSolCost', getU64Decoder()],
])

export function getBuyInstructionDataCodec(): Codec<BuyInstructionDataArgs, BuyInstructionData> {
    return combineCodec(getBuyInstructionDataEncoder(), getBuyInstructionDataDecoder())
}

export interface BuyInput<TAccountGlobal extends string = string, TAccountFeeRecipient extends string = string, TAccountMint extends string = string, TAccountBondingCurve extends string = string, TAccountAssociatedBondingCurve extends string = string, TAccountAssociatedUser extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string, TAccountTokenProgram extends string = string, TAccountRent extends string = string, TAccountEventAuthority extends string = string, TAccountProgram extends string = string> {
    global: Address<TAccountGlobal>
    feeRecipient: Address<TAccountFeeRecipient>
    mint: Address<TAccountMint>
    bondingCurve: Address<TAccountBondingCurve>
    associatedBondingCurve: Address<TAccountAssociatedBondingCurve>
    associatedUser: Address<TAccountAssociatedUser>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    tokenProgram?: Address<TAccountTokenProgram>
    rent?: Address<TAccountRent>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
    amount: BuyInstructionDataArgs['amount']
    maxSolCost: BuyInstructionDataArgs['maxSolCost']
}

export function getBuyInstruction<TAccountGlobal extends string, TAccountFeeRecipient extends string, TAccountMint extends string, TAccountBondingCurve extends string, TAccountAssociatedBondingCurve extends string, TAccountAssociatedUser extends string, TAccountUser extends string, TAccountSystemProgram extends string, TAccountTokenProgram extends string, TAccountRent extends string, TAccountEventAuthority extends string, TAccountProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: BuyInput<TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram>, config?: { programAddress?: TProgramAddress }): BuyInstruction<TProgramAddress, TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram> {
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
        tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
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
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.feeRecipient),
            getAccountMeta(accounts.mint),
            getAccountMeta(accounts.bondingCurve),
            getAccountMeta(accounts.associatedBondingCurve),
            getAccountMeta(accounts.associatedUser),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.tokenProgram),
            getAccountMeta(accounts.rent),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getBuyInstructionDataEncoder().encode(args as BuyInstructionDataArgs),
    }

    return instruction as BuyInstruction<TProgramAddress, TAccountGlobal, TAccountFeeRecipient, TAccountMint, TAccountBondingCurve, TAccountAssociatedBondingCurve, TAccountAssociatedUser, TAccountUser, TAccountSystemProgram, TAccountTokenProgram, TAccountRent, TAccountEventAuthority, TAccountProgram>
}

export interface ParsedBuyInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> {
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
        tokenProgram: TAccountMetas[8]
        rent: TAccountMetas[9]
        eventAuthority: TAccountMetas[10]
        program: TAccountMetas[11]
    }
    data: BuyInstructionData
}

export function parseBuyInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedBuyInstruction<TProgram, TAccountMetas> {
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
            tokenProgram: getNextAccount(),
            rent: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getBuyInstructionDataDecoder().decode(instruction.data),
    }
}
