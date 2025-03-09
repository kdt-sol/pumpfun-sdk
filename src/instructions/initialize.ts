import { type Address, type Codec, type Decoder, type Encoder, type IAccountMeta, type IAccountSignerMeta, type IInstruction, type IInstructionWithAccounts, type IInstructionWithData, type ReadonlyAccount, type ReadonlyUint8Array, type TransactionSigner, type WritableAccount, type WritableSignerAccount, combineCodec, fixDecoderSize, fixEncoderSize, getBytesDecoder, getBytesEncoder, getStructDecoder, getStructEncoder, transformEncoder } from '@solana/kit'
import { PUMP_PROGRAM_ADDRESS, SYSTEM_PROGRAM_ADDRESS } from '../constants'
import { type ResolvedAccount, getAccountMetaFactory } from '../utils'

export const INITIALIZE_DISCRIMINATOR = new Uint8Array([175, 175, 109, 31, 13, 152, 155, 237])

export function getInitializeDiscriminatorBytes() {
    return fixEncoderSize(getBytesEncoder(), 8).encode(INITIALIZE_DISCRIMINATOR)
}

export type InitializeInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountGlobal extends string | IAccountMeta = string, TAccountUser extends string | IAccountMeta = string, TAccountSystemProgram extends | string | IAccountMeta = typeof SYSTEM_PROGRAM_ADDRESS, TRemainingAccounts extends readonly IAccountMeta[] = []> = IInstruction<TProgram> & IInstructionWithData<Uint8Array> & IInstructionWithAccounts<[TAccountGlobal extends string ? WritableAccount<TAccountGlobal> : TAccountGlobal, TAccountUser extends string ? WritableSignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser> : TAccountUser, TAccountSystemProgram extends string ? ReadonlyAccount<TAccountSystemProgram> : TAccountSystemProgram, ...TRemainingAccounts]>

export interface InitializeInstructionData {
    discriminator: ReadonlyUint8Array
}

// eslint-disable-next-line ts/no-empty-object-type
export type InitializeInstructionDataArgs = {}

export const getInitializeInstructionDataEncoder = (): Encoder<InitializeInstructionDataArgs> => transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: INITIALIZE_DISCRIMINATOR }),
)

export const getInitializeInstructionDataDecoder = (): Decoder<InitializeInstructionData> => getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
])

export function getInitializeInstructionDataCodec(): Codec<InitializeInstructionDataArgs, InitializeInstructionData> {
    return combineCodec(getInitializeInstructionDataEncoder(), getInitializeInstructionDataDecoder())
}

export interface InitializeInput<TAccountGlobal extends string = string, TAccountUser extends string = string, TAccountSystemProgram extends string = string> {
    global: Address<TAccountGlobal>
    user: TransactionSigner<TAccountUser>
    systemProgram?: Address<TAccountSystemProgram>
}

export function getInitializeInstruction<TAccountGlobal extends string, TAccountUser extends string, TAccountSystemProgram extends string, TProgramAddress extends Address = typeof PUMP_PROGRAM_ADDRESS>(input: InitializeInput<TAccountGlobal, TAccountUser, TAccountSystemProgram>, config?: { programAddress?: TProgramAddress }): InitializeInstruction<TProgramAddress, TAccountGlobal, TAccountUser, TAccountSystemProgram> {
    const programAddress = config?.programAddress ?? PUMP_PROGRAM_ADDRESS

    const originalAccounts = {
        global: { value: input.global ?? null, isWritable: true },
        user: { value: input.user ?? null, isWritable: true },
        systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    }

    const accounts = originalAccounts as Record<keyof typeof originalAccounts, ResolvedAccount>

    if (!accounts.systemProgram.value) {
        accounts.systemProgram.value = SYSTEM_PROGRAM_ADDRESS
    }

    const getAccountMeta = getAccountMetaFactory(programAddress, 'programId')

    const instruction = {
        accounts: [
            getAccountMeta(accounts.global),
            getAccountMeta(accounts.user),
            getAccountMeta(accounts.systemProgram),
        ],
        programAddress,
        data: getInitializeInstructionDataEncoder().encode({}),
    }

    return instruction as InitializeInstruction<TProgramAddress, TAccountGlobal, TAccountUser, TAccountSystemProgram>
}

export interface ParsedInitializeInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS, TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]> {
    programAddress: Address<TProgram>
    accounts: {
        global: TAccountMetas[0]
        user: TAccountMetas[1]
        systemProgram: TAccountMetas[2]
    }
    data: InitializeInstructionData
}

export function parseInitializeInstruction<TProgram extends string, TAccountMetas extends readonly IAccountMeta[]>(instruction: IInstruction<TProgram> & IInstructionWithAccounts<TAccountMetas> & IInstructionWithData<Uint8Array>): ParsedInitializeInstruction<TProgram, TAccountMetas> {
    if (instruction.accounts.length < 3) {
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
        },
        data: getInitializeInstructionDataDecoder().decode(instruction.data),
    }
}
