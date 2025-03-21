import { ASSOCIATED_TOKEN_PROGRAM_ADDRESS } from '../constants'
import { type SellInput, getSellInstruction } from '../generated'
import { type TradeInstructionParamsInput, getTradeInstructionParams } from './trade'

export interface SellInstructionParamsInput extends TradeInstructionParamsInput {
    minSolOutput: number | bigint
}

export async function getSellInstructionParams(input: SellInstructionParamsInput): Promise<SellInput> {
    return { ...(await getTradeInstructionParams(input)), associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ADDRESS, minSolOutput: input.minSolOutput }
}

export async function createSellInstruction(input: SellInstructionParamsInput) {
    return getSellInstruction(await getSellInstructionParams(input))
}
