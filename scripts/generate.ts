import { resolve } from 'node:path'
import { createFromRoot } from 'codama'
import { type AnchorIdl, type IdlV00AccountItem, type IdlV00Instruction, type IdlV00Seed, type IdlV01Instruction, type IdlV01InstructionAccountItem, type IdlV01Seed, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderVisitor } from '@codama/renderers-js'
import bs58 from 'bs58'
import { notNullish } from '@kdt310722/utils/common'

const addressToBytes = (address: string): number[] => [...bs58.decode(address)]

function buildAddressesMap(idl: AnchorIdl) {
    const addresses: Record<string, Record<string, number[]>> = {}

    for (const instruction of idl.instructions) {
        addresses[instruction.name] ??= {}

        for (const account of instruction.accounts) {
            if ('address' in account && notNullish(account.address)) {
                addresses[instruction.name][account.name] = addressToBytes(account.address)
            }
        }
    }

    return addresses
}

function fixSeed(accounts: Record<string, number[]>, seed: IdlV00Seed | IdlV01Seed): IdlV00Seed | IdlV01Seed {
    if (seed.kind === 'account' && notNullish(accounts[seed.path])) {
        return { kind: 'const', value: accounts[seed.path] }
    }

    return seed
}

function fixAccount(accounts: Record<string, number[]>, account: IdlV00AccountItem | IdlV01InstructionAccountItem) {
    if ('pda' in account && notNullish(account.pda) && 'program' in account.pda && account.pda.program?.kind === 'account') {
        account.pda.program = fixSeed(accounts, account.pda.program)
    }

    return account
}

function fixInstruction(accounts: Record<string, number[]>, instruction: IdlV00Instruction | IdlV01Instruction) {
    for (const [i, account] of instruction.accounts.entries()) {
        instruction.accounts[i] = fixAccount(accounts, account)
    }

    return instruction
}

function fixIdl(idl: AnchorIdl) {
    const addresses = buildAddressesMap(idl)

    for (const [i, instruction] of idl.instructions.entries()) {
        idl.instructions[i] = fixInstruction(addresses[instruction.name], instruction)
    }

    return idl
}

const srcPath = resolve(import.meta.dirname, '..', 'src')
const idlPath = resolve(srcPath, 'idl.json')
const generatedPath = resolve(srcPath, 'generated')

import(idlPath).then((idl) => fixIdl(idl)).then((idl) => createFromRoot(rootNodeFromAnchor(idl))).then(async (codama) => {
    await codama.accept(renderVisitor(generatedPath))
})
