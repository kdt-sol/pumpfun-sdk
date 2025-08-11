import { type BuyInput, getBuyInstruction } from '../generated'
import { getGlobalVolumeAccumulatorAddress, getUserVolumeAccumulatorAddress } from '../utils'
import { type TradeInstructionParamsInput, getTradeInstructionParams } from './trade'

export interface BuyInstructionParamsInput extends TradeInstructionParamsInput {
    maxSolCost: number | bigint
}

export async function getBuyInstructionParams(input: BuyInstructionParamsInput): Promise<BuyInput> {
    const globalVolumeAccumulator = await getGlobalVolumeAccumulatorAddress()
    const userVolumeAccumulator = await getUserVolumeAccumulatorAddress(input.user.address)

    return { ...(await getTradeInstructionParams(input)), maxSolCost: input.maxSolCost, globalVolumeAccumulator, userVolumeAccumulator }
}

export async function createBuyInstruction(input: BuyInstructionParamsInput) {
    return getBuyInstruction(await getBuyInstructionParams(input))
}
