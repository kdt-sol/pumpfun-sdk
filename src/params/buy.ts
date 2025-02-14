import { type BuyInput, getBuyInstruction } from '../instructions'
import { type TradeInstructionParamsInput, getTradeInstructionParams } from './trade'

export interface BuyInstructionParamsInput extends TradeInstructionParamsInput {
    maxSolCost: number | bigint
}

export async function getBuyInstructionParams(input: BuyInstructionParamsInput): Promise<BuyInput> {
    return { ...(await getTradeInstructionParams(input)), maxSolCost: input.maxSolCost }
}

export async function createBuyInstruction(input: BuyInstructionParamsInput) {
    return getBuyInstruction(await getBuyInstructionParams(input))
}
