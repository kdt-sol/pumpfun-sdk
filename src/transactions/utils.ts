import type { FeeConfig, Global } from '../generated'
import type { ComputeFeesBpsParams } from '../utils'

export const getFeeInfo = (global: Pick<Global, 'feeBasisPoints' | 'creatorFeeBasisPoints'>, feeConfig?: Pick<FeeConfig, 'feeTiers'>, marketCap?: bigint): ComputeFeesBpsParams => ({
    feeBasisPoints: global.feeBasisPoints,
    creatorFeeBasisPoints: global.creatorFeeBasisPoints,
    feeTiers: feeConfig?.feeTiers,
    marketCap,
})
