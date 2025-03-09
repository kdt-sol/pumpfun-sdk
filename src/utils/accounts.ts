import { AccountRole, type Address, type IAccountMeta, type IAccountSignerMeta, upgradeRoleToSigner } from '@solana/kit'
import type { ResolvedAccount } from './types'
import { isTransactionSigner } from './signers'
import { expectAddress } from './asserts'

export const getAccountMetaFactory = (programAddress: Address, optionalAccountStrategy: 'omitted' | 'programId') => (account: ResolvedAccount): IAccountMeta | IAccountSignerMeta | undefined => {
    if (!account.value) {
        if (optionalAccountStrategy === 'omitted') {
            return
        }

        return Object.freeze({ address: programAddress, role: AccountRole.READONLY })
    }

    const writableRole = account.isWritable ? AccountRole.WRITABLE : AccountRole.READONLY
    const role = isTransactionSigner(account.value) ? upgradeRoleToSigner(writableRole) : writableRole

    return Object.freeze({ address: expectAddress(account.value), role, ...(isTransactionSigner(account.value) ? { signer: account.value } : {}) })
}
