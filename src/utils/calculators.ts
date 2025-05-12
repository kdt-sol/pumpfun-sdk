import { BigIntMath } from '@kdt310722/utils/number'
import type { BondingCurve, Global } from '../generated'

export function getCreatorFeeBasisPoints(global: Pick<Global, 'creatorFeeBasisPoints'>, isLegacyBondingCurve: boolean) {
    return isLegacyBondingCurve ? 0n : global.creatorFeeBasisPoints
}

export function ceilDiv(a: bigint, b: bigint) {
    return (a + b - 1n) / b
}

export function computeFee(amount: bigint, feeBasisPoints: bigint) {
    return ceilDiv(amount * feeBasisPoints, 10_000n)
}

export function getFee(amount: bigint, feeBasisPoints: bigint, creatorFeeBasisPoints: bigint) {
    const protocolFee = computeFee(amount, feeBasisPoints)
    const creatorFee = computeFee(amount, creatorFeeBasisPoints)

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

export function calculateTokenOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>, solIn: bigint, feeBasisPoints: bigint, creatorFeeBasisPoints: bigint) {
    if (solIn === 0n || bondingCurve.realTokenReserves === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves, realTokenReserves } = bondingCurve
    const totalFeeBasisPoints = feeBasisPoints + creatorFeeBasisPoints
    const inputAmount = (solIn * 10_000n) / (totalFeeBasisPoints + 10_000n)
    const tokensReceived = (inputAmount * virtualTokenReserves) / (virtualSolReserves + inputAmount)

    return BigIntMath.min(tokensReceived, realTokenReserves)
}

export function calculateSolOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves'>, tokenIn: bigint, feeBasisPoints: bigint, creatorFeeBasisPoints: bigint) {
    if (tokenIn === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves } = bondingCurve
    const numerator = tokenIn * virtualSolReserves
    const denominator = virtualTokenReserves + tokenIn
    const amountOut = numerator / denominator

    return amountOut - getFee(amountOut, feeBasisPoints, creatorFeeBasisPoints)
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

export function calculateSolIn(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>, tokenAmount: bigint, feeBasisPoints: bigint, creatorFeeBasisPoints: bigint) {
    if (tokenAmount === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves, realTokenReserves } = bondingCurve
    const minAmount = BigIntMath.min(tokenAmount, realTokenReserves)
    const solCost = (minAmount * virtualSolReserves) / (virtualTokenReserves - minAmount) + 1n

    return solCost + getFee(solCost, feeBasisPoints, creatorFeeBasisPoints)
}
