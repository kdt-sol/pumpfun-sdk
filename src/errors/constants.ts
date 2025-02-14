export const PUMP_ERROR__NOT_AUTHORIZED = 0x17_70 // 6000
export const PUMP_ERROR__ALREADY_INITIALIZED = 0x17_71 // 6001
export const PUMP_ERROR__TOO_MUCH_SOL_REQUIRED = 0x17_72 // 6002
export const PUMP_ERROR__TOO_LITTLE_SOL_RECEIVED = 0x17_73 // 6003
export const PUMP_ERROR__MINT_DOES_NOT_MATCH_BONDING_CURVE = 0x17_74 // 6004
export const PUMP_ERROR__BONDING_CURVE_COMPLETE = 0x17_75 // 6005
export const PUMP_ERROR__BONDING_CURVE_NOT_COMPLETE = 0x17_76 // 6006
export const PUMP_ERROR__NOT_INITIALIZED = 0x17_77 // 6007
export const PUMP_ERROR__WITHDRAW_TOO_FREQUENT = 0x17_78 // 6008

export const PUMP_ERROR_MESSAGES = {
    [PUMP_ERROR__ALREADY_INITIALIZED]: 'The program is already initialized.',
    [PUMP_ERROR__BONDING_CURVE_COMPLETE]: 'The bonding curve has completed and liquidity migrated to raydium.',
    [PUMP_ERROR__BONDING_CURVE_NOT_COMPLETE]: 'The bonding curve has not completed.',
    [PUMP_ERROR__MINT_DOES_NOT_MATCH_BONDING_CURVE]: 'The mint does not match the bonding curve.',
    [PUMP_ERROR__NOT_AUTHORIZED]: 'The given account is not authorized to execute this instruction.',
    [PUMP_ERROR__NOT_INITIALIZED]: 'The program is not initialized.',
    [PUMP_ERROR__TOO_LITTLE_SOL_RECEIVED]: 'slippage: Too little SOL received to sell the given amount of tokens.',
    [PUMP_ERROR__TOO_MUCH_SOL_REQUIRED]: 'slippage: Too much SOL required to buy the given amount of tokens.',
    [PUMP_ERROR__WITHDRAW_TOO_FREQUENT]: 'Withdraw too frequent',
}
