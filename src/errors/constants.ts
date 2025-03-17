export const PUMP_ERROR__NOT_AUTHORIZED = 0x17_70
export const PUMP_ERROR__ALREADY_INITIALIZED = 0x17_71
export const PUMP_ERROR__TOO_MUCH_SOL_REQUIRED = 0x17_72
export const PUMP_ERROR__TOO_LITTLE_SOL_RECEIVED = 0x17_73
export const PUMP_ERROR__MINT_DOES_NOT_MATCH_BONDING_CURVE = 0x17_74
export const PUMP_ERROR__BONDING_CURVE_COMPLETE = 0x17_75
export const PUMP_ERROR__BONDING_CURVE_NOT_COMPLETE = 0x17_76
export const PUMP_ERROR__NOT_INITIALIZED = 0x17_77
export const PUMP_ERROR__WITHDRAW_TOO_FREQUENT = 0x17_78
export const PUMP_ERROR__NEW_SIZE_SHOULD_BE_GREATER_THAN_CURRENT_SIZE = 0x17_79
export const PUMP_ERROR__ACCOUNT_TYPE_NOT_SUPPORTED = 0x17_7A
export const PUMP_ERROR__INITIAL_REAL_TOKEN_RESERVES_SHOULD_BE_LESS_THAN_TOKEN_TOTAL_SUPPLY = 0x17_7B
export const PUMP_ERROR__INITIAL_VIRTUAL_TOKEN_RESERVES_SHOULD_BE_GREATER_THAN_INITIAL_REAL_TOKEN_RESERVES = 0x17_7C
export const PUMP_ERROR__FEE_BASIS_POINTS_GREATER_THAN_MAXIMUM = 0x17_7D
export const PUMP_ERROR__ALL_ZEROS_WITHDRAW_AUTHORITY = 0x17_7E
export const PUMP_ERROR__POOL_MIGRATION_FEE_SHOULD_BE_LESS_THAN_FINAL_REAL_SOL_RESERVES = 0x17_7F
export const PUMP_ERROR__POOL_MIGRATION_FEE_SHOULD_BE_GREATER_THAN_CREATOR_FEE_PLUS_MAX_MIGRATE_FEES = 0x17_80
export const PUMP_ERROR__DISABLED_WITHDRAW = 0x17_81
export const PUMP_ERROR__DISABLED_MIGRATE = 0x17_82
export const PUMP_ERROR__INVALID_CREATOR = 0x17_83
export const PUMP_ERROR__BUY_ZERO_AMOUNT = 0x17_84
export const PUMP_ERROR__NOT_ENOUGH_TOKENS_TO_BUY = 0x17_85
export const PUMP_ERROR__SELL_ZERO_AMOUNT = 0x17_86
export const PUMP_ERROR__NOT_ENOUGH_TOKENS_TO_SELL = 0x17_87
export const PUMP_ERROR__OVERFLOW = 0x17_88
export const PUMP_ERROR__TRUNCATION = 0x17_89
export const PUMP_ERROR__DIVISION_BY_ZERO = 0x17_8A
export const PUMP_ERROR__NOT_ENOUGH_REMAINING_ACCOUNTS = 0x17_8B
export const PUMP_ERROR__ALL_FEE_RECIPIENTS_SHOULD_BE_NON_ZERO = 0x17_8C
export const PUMP_ERROR__UNSORTED_NOT_UNIQUE_FEE_RECIPIENTS = 0x17_8D
export const PUMP_ERROR__CREATOR_SHOULD_NOT_BE_ZERO = 0x17_8E

export const PUMP_ERROR_MESSAGES = {
    [PUMP_ERROR__ACCOUNT_TYPE_NOT_SUPPORTED]: `Account type not supported`,
    [PUMP_ERROR__ALL_FEE_RECIPIENTS_SHOULD_BE_NON_ZERO]: `All fee recipients should be non-zero`,
    [PUMP_ERROR__ALL_ZEROS_WITHDRAW_AUTHORITY]: `Withdraw authority cannot be set to System Program ID`,
    [PUMP_ERROR__ALREADY_INITIALIZED]: `The program is already initialized.`,
    [PUMP_ERROR__BONDING_CURVE_COMPLETE]: `The bonding curve has completed and liquidity migrated to raydium.`,
    [PUMP_ERROR__BONDING_CURVE_NOT_COMPLETE]: `The bonding curve has not completed.`,
    [PUMP_ERROR__BUY_ZERO_AMOUNT]: `Buy zero amount`,
    [PUMP_ERROR__CREATOR_SHOULD_NOT_BE_ZERO]: `Creator should not be zero`,
    [PUMP_ERROR__DISABLED_MIGRATE]: `Migrate instruction is disabled`,
    [PUMP_ERROR__DISABLED_WITHDRAW]: `Migrate instruction is disabled`,
    [PUMP_ERROR__DIVISION_BY_ZERO]: `Division by zero`,
    [PUMP_ERROR__FEE_BASIS_POINTS_GREATER_THAN_MAXIMUM]: `fee_basis_points greater than maximum`,
    [PUMP_ERROR__INITIAL_REAL_TOKEN_RESERVES_SHOULD_BE_LESS_THAN_TOKEN_TOTAL_SUPPLY]: `initial_real_token_reserves should be less than token_total_supply`,
    [PUMP_ERROR__INITIAL_VIRTUAL_TOKEN_RESERVES_SHOULD_BE_GREATER_THAN_INITIAL_REAL_TOKEN_RESERVES]: `initial_virtual_token_reserves should be greater than initial_real_token_reserves`,
    [PUMP_ERROR__INVALID_CREATOR]: `Invalid creator pubkey`,
    [PUMP_ERROR__MINT_DOES_NOT_MATCH_BONDING_CURVE]: `The mint does not match the bonding curve.`,
    [PUMP_ERROR__NEW_SIZE_SHOULD_BE_GREATER_THAN_CURRENT_SIZE]: `new_size should be > current_size`,
    [PUMP_ERROR__NOT_AUTHORIZED]: `The given account is not authorized to execute this instruction.`,
    [PUMP_ERROR__NOT_ENOUGH_REMAINING_ACCOUNTS]: `Not enough remaining accounts`,
    [PUMP_ERROR__NOT_ENOUGH_TOKENS_TO_BUY]: `Not enough tokens to buy`,
    [PUMP_ERROR__NOT_ENOUGH_TOKENS_TO_SELL]: `Not enough tokens to sell`,
    [PUMP_ERROR__NOT_INITIALIZED]: `The program is not initialized.`,
    [PUMP_ERROR__OVERFLOW]: `Overflow`,
    [PUMP_ERROR__POOL_MIGRATION_FEE_SHOULD_BE_GREATER_THAN_CREATOR_FEE_PLUS_MAX_MIGRATE_FEES]: `pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES`,
    [PUMP_ERROR__POOL_MIGRATION_FEE_SHOULD_BE_LESS_THAN_FINAL_REAL_SOL_RESERVES]: `pool_migration_fee should be less than final_real_sol_reserves`,
    [PUMP_ERROR__SELL_ZERO_AMOUNT]: `Sell zero amount`,
    [PUMP_ERROR__TOO_LITTLE_SOL_RECEIVED]: `slippage: Too little SOL received to sell the given amount of tokens.`,
    [PUMP_ERROR__TOO_MUCH_SOL_REQUIRED]: `slippage: Too much SOL required to buy the given amount of tokens.`,
    [PUMP_ERROR__TRUNCATION]: `Truncation`,
    [PUMP_ERROR__UNSORTED_NOT_UNIQUE_FEE_RECIPIENTS]: `Unsorted or not unique fee recipients`,
    [PUMP_ERROR__WITHDRAW_TOO_FREQUENT]: `Withdraw too frequent`,
}
