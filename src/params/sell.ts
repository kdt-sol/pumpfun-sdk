import { type SellInput, getSellInstruction } from '../generated'
import { type TradeInstructionParamsInput, getTradeInstructionParams } from './trade'

export interface SellInstructionParamsInput extends TradeInstructionParamsInput {
    minSolOutput: number | bigint
}

export async function getSellInstructionParams(input: SellInstructionParamsInput): Promise<SellInput> {
    return { ...(await getTradeInstructionParams(input)), minSolOutput: input.minSolOutput }
}

export async function createSellInstruction(input: SellInstructionParamsInput) {
    return getSellInstruction(await getSellInstructionParams(input))
}
