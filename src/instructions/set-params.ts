import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, type WritableSignerAccount, combineCodec, fixDecoderSize, fixEncoderSize, getAddressDecoder, getAddressEncoder, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, getU64Decoder, getU64Encoder, transformEncoder } from '@solana/web3.js'
import { PUMP_PROGRAM_ADDRESS, SYSTEM_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const SET_PARAMS_DISCRIMINATOR = new Uint8Array([27, 234, 178, 52, 147, 2, 187, 141])

export function getSetParamsDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(SET_PARAMS_DISCRIMINATOR)
}

export type SetParamsInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountGlobal extends string | IAccountMeta = string, TAccountUser extends string | IAccountMeta = string, TAccountSystemProgram extends | string | IAccountMeta = typeof SYSTEM_PROGRAM_ADDRESS, TAccountEventAuthority extends string | IAccountMeta = string, TAccountProgram extends string | IAccountMeta = string, TRemainingAccounts extends readonly IAccountMeta[] = []> = IInstruction<TProgram> & IInstructionWithData<Uint8Array> & IInstructionWithAccounts<[TAccountGlobal extends string ? WritableAccount<TAccountGlobal> : TAccountGlobal, TAccountUser extends string ? WritableSignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser> : TAccountUser, TAccountSystemProgram extends string ? ReadonlyAccount<TAccountSystemProgram> : TAccountSystemProgram, TAccountEventAuthority extends string ? ReadonlyAccount<TAccountEventAuthority> : TAccountEventAuthority, TAccountProgram extends string ? ReadonlyAccount<TAccountProgram> : TAccountProgram, ...TRemainingAccounts]>

export interface SetParamsInstructionData {
    discriminator: ReadonlyUint8Array
    feeRecipient: Address
    initialVirtualTokenReserves: bigint
    initialVirtualSolReserves: bigint
    initialRealTokenReserves: bigint
    tokenTotalSupply: bigint
    feeBasisPoints: bigint
}

export interface SetParamsInstructionDataArgs {
    feeRecipient: Address
    initialVirtualTokenReserves: number | bigint
    initialVirtualSolReserves: number | bigint
    initialRealTokenReserves: number | bigint
    tokenTotalSupply: number | bigint
    feeBasisPoints: number | bigint
}

export const getSetParamsInstructionDataEncoder = (): Encoder<SetParamsInstructionDataArgs> => transformEncoder(
    getStructEncoder([
        ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
        ['feeRecipient', getAddressEncoder()],
        ['initialVirtualTokenReserves', getU64Encoder()],
        ['initialVirtualSolReserves', getU64Encoder()],
        ['initialRealTokenReserves', getU64Encoder()],
        ['tokenTotalSupply', getU64Encoder()],
        ['feeBasisPoints', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: SET_PARAMS_DISCRIMINATOR }),
)

export const getSetParamsInstructionDataDecoder = (): Decoder<SetParamsInstructionData> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['feeRecipient', getAddressDecoder()],
    ['initialVirtualTokenReserves', getU64Decoder()],
    ['initialVirtualSolReserves', getU64Decoder()],
    ['initialRealTokenReserves', getU64Decoder()],
    ['tokenTotalSupply', getU64Decoder()],
    ['feeBasisPoints', getU64Decoder()],
])

export function getSetParamsInstructionDataCodec(): Codec<SetParamsInstructionDataArgs, SetParamsInstructionData> {
    return combineCodec(getSetParamsInstructionDataEncoder(), getSetParamsInstructionDataDecoder())
}

export interface SetParamsInput<TAccountGlobal extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string, TAccountEventAuthority extends string = string, TAccountProgram extends string = string> {
    global: Address<TAccountGlobal>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
    eventAuthority: Address<TAccountEventAuthority>
    program: Address<TAccountProgram>
    feeRecipient: SetParamsInstructionDataArgs['feeRecipient']
    initialVirtualTokenReserves: SetParamsInstructionDataArgs['initialVirtualTokenReserves']
    initialVirtualSolReserves: SetParamsInstructionDataArgs['initialVirtualSolReserves']
    initialRealTokenReserves: SetParamsInstructionDataArgs['initialRealTokenReserves']
    tokenTotalSupply: SetParamsInstructionDataArgs['tokenTotalSupply']
    feeBasisPoints: SetParamsInstructionDataArgs['feeBasisPoints']
}

export function getSetParamsInstruction<TAccountGlobal extends string, TAccountUser extends string, TAccountSystemProgram extends string, TAccountEventAuthority extends string, TAccountProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: SetParamsInput<TAccountGlobal, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram>, config?: { programAddress?: TProgramAddress }): SetParamsInstruction<TProgramAddress, TAccountGlobal, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram> {
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: true },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
        eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
        program: { value: input.program ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<keyof typeof originalAccounts, ResolvedAccount>
    const args = { ...input }

    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value = SYSTEM_PROGRAM_ADDRESS
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
            getAccountMeta(accounts.eventAuthority),
            getAccountMeta(accounts.program),
        ],
        programAddress,
        data: getSetParamsInstructionDataEncoder().encode(
            args as SetParamsInstructionDataArgs,
        ),
    }

    return instruction as SetParamsInstruction<TProgramAddress, TAccountGlobal, TAccountUser, TAccountSystemProgram, TAccountEventAuthority, TAccountProgram>
}

export interface ParsedSetParamsInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> {
    programAddress: Address<TProgram>
    accounts: {
        global: TAccountMetas[0]
        user: TAccountMetas[1]
        systemProgram: TAccountMetas[2]
        eventAuthority: TAccountMetas[3]
        program: TAccountMetas[4]
    }
    data: SetParamsInstructionData
}

export function parseSetParamsInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedSetParamsInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 5) {
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
            user: getNextAccount(),
            systemProgram: getNextAccount(),
            eventAuthority: getNextAccount(),
            program: getNextAccount(),
        },
        data: getSetParamsInstructionDataDecoder().decode(instruction.data),
    }
}
