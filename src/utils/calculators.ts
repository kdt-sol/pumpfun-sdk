import { BigIntMath } from '@kdt310722/utils/number'
import type { BondingCurve } from '../accounts'

export function calculateTokenPrice(virtualSolReserves: bigint, virtualTokenReserves: bigint, decimals = 6n) {
    return (virtualSolReserves * 10n ** decimals) / virtualTokenReserves
}

export function calculateTokenOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves' | 'realTokenReserves'>, solIn: bigint) {
    const { virtualSolReserves, virtualTokenReserves, realTokenReserves } = bondingCurve

    if (solIn === 0n || realTokenReserves === 0n) {
        return 0n
    }

    const productOfReserves = virtualSolReserves * virtualTokenReserves
    const newVirtualSolReserves = virtualSolReserves + solIn
    const newVirtualTokenReserves = productOfReserves / newVirtualSolReserves + 1n
    const amountOut = virtualTokenReserves - newVirtualTokenReserves

    return BigIntMath.min(amountOut, realTokenReserves)
}

export function calculateSolOut(bondingCurve: Pick<BondingCurve, 'virtualSolReserves' | 'virtualTokenReserves'>, tokenIn: bigint, feeBasisPoints: bigint) {
    if (tokenIn === 0n) {
        return 0n
    }

    const { virtualSolReserves, virtualTokenReserves } = bondingCurve

    const numerator = tokenIn * virtualSolReserves
    const denominator = virtualTokenReserves + tokenIn
    const amountOut = numerator / denominator

    return amountOut - ((amountOut * feeBasisPoints) / 10_000n)
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
