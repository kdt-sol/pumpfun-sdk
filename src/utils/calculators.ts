import { BigIntMath } from '@kdt310722/utils/number'
import { isNullish } from '@kdt310722/utils/common'
import type { BondingCurve, FeeTier, Global } from '../generated'

export function getMarketCapInLamports(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves'>, supply: bigint) {
    return (bondingCurve.virtualSolReserves * supply) / bondingCurve.virtualTokenReserves
}

export function getCreatorFeeBasisPoints(global: Pick<Global, 'creatorFeeBasisPoints'>, isLegacyBondingCurve: boolean) {
    return isLegacyBondingCurve ? 0n : global.creatorFeeBasisPoints
}

export function ceilDiv(a: bigint, b: bigint) {
    return (a + (b - 1n)) / b
}

export function computeFee(amount: bigint, feeBasisPoints: bigint) {
    return ceilDiv(amount * feeBasisPoints, 10_000n)
}

export function calculateFeeTier(feeTiers: FeeTier[], marketCap: bigint) {
    const firstTier = feeTiers[0]

    if (marketCap < firstTier.marketCapLamportsThreshold) {
        return firstTier.fees
    }

    for (const tier of [...feeTiers].reverse()) {
        if (marketCap >= tier.marketCapLamportsThreshold) {
            return tier.fees
        }
    }

    return firstTier.fees
}

export interface ComputeFeesBpsParams {
    feeBasisPoints: bigint
    creatorFeeBasisPoints: bigint
    feeTiers?: FeeTier[]
    marketCap?: bigint
}

export interface CalculatedFeesBps {
    protocolFeeBps: bigint
    creatorFeeBps: bigint
}

export function computeFeesBps({ feeBasisPoints, creatorFeeBasisPoints, feeTiers, marketCap }: ComputeFeesBpsParams): CalculatedFeesBps {
    if (isNullish(feeTiers) || isNullish(marketCap)) {
        return { protocolFeeBps: feeBasisPoints, creatorFeeBps: creatorFeeBasisPoints }
    }

    return calculateFeeTier(feeTiers, marketCap)
}

export function getFee(amount: bigint, config: ComputeFeesBpsParams) {
    const { protocolFeeBps, creatorFeeBps } = computeFeesBps(config)
    const protocolFee = computeFee(amount, protocolFeeBps)
    const creatorFee = computeFee(amount, creatorFeeBps)

    return protocolFee + creatorFee
}

export function calculateTokenPrice(virtualSolReserves: bigint, virtualTokenReserves: bigint, decimals = 6n) {
    return (virtualSolReserves * 10n ** decimals) / virtualTokenReserves
}

export interface CalculateVirtualReservesBeforeParams {
    virtualSolReserves: bigint
    virtualTokenReserves: bigint
    solAmount: bigint
    tokenAmount: bigint
    isBuy: boolean
}

export function calculateVirtualReservesBefore({ virtualSolReserves: solReserves, virtualTokenReserves: tokenReserves, solAmount, tokenAmount, isBuy }: CalculateVirtualReservesBeforeParams) {
    const virtualSolReserves = isBuy ? solReserves - solAmount : solReserves + solAmount
    const virtualTokenReserves = isBuy ? tokenReserves + tokenAmount : tokenReserves - tokenAmount

    return { virtualSolReserves, virtualTokenReserves }
}

export interface CalculateTokenPriceBeforeParams extends CalculateVirtualReservesBeforeParams {
    decimals?: bigint
}

export function calculateTokenPriceBefore({ decimals, ...params }: CalculateTokenPriceBeforeParams) {
    const reserves = calculateVirtualReservesBefore(params)
    const { virtualSolReserves, virtualTokenReserves } = reserves

    return calculateTokenPrice(virtualSolReserves, virtualTokenReserves, decimals)
}

export function calculateTokenOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>, solIn: bigint, feeInfo: ComputeFeesBpsParams) {
    if (solIn === 0n || bondingCurve.realTokenReserves === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves, realTokenReserves } = bondingCurve
    const { protocolFeeBps, creatorFeeBps } = computeFeesBps(feeInfo)

    const totalFeeBasisPoints = protocolFeeBps + creatorFeeBps
    const inputAmount = (solIn * 10_000n) / (totalFeeBasisPoints + 10_000n)
    const tokensReceived = (inputAmount * virtualTokenReserves) / (virtualSolReserves + inputAmount)

    return BigIntMath.min(tokensReceived, realTokenReserves)
}

export function calculateSolOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves'>, tokenIn: bigint, feeInfo: ComputeFeesBpsParams) {
    if (tokenIn === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves } = bondingCurve
    const numerator = tokenIn * virtualSolReserves
    const denominator = virtualTokenReserves + tokenIn
    const amountOut = numerator / denominator

    return amountOut - getFee(amountOut, feeInfo)
}

export function getMaxSolCost(amount: bigint, slippage: number, scaleFactor = 10_000) {
    if (slippage <= 0) {
        return amount
    }

    return amount + ((amount / 100n) * BigInt(Math.trunc(slippage * scaleFactor)) / BigInt(scaleFactor))
}

export function getMinSolOut(amount: bigint, slippage: number, scaleFactor = 10_000) {
    if (slippage <= 0) {
        return amount
    }

    if (slippage >= 100) {
        return 0n
    }

    return amount - ((amount / 100n) * BigInt(Math.trunc(slippage * scaleFactor)) / BigInt(scaleFactor))
}

export function calculateSolIn(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>, tokenAmount: bigint, feeInfo: ComputeFeesBpsParams) {
    if (tokenAmount === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves, realTokenReserves } = bondingCurve
    const minAmount = BigIntMath.min(tokenAmount, realTokenReserves)
    const solCost = (minAmount * virtualSolReserves) / (virtualTokenReserves - minAmount) + 1n

    return solCost + getFee(solCost, feeInfo)
}
