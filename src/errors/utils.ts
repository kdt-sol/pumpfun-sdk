import { type Address, type SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM, type SolanaError, isProgramError } from '@solana/web3.js'
import { PUMP_PROGRAM_ADDRESS } from '../constants'
import type { PumpError } from './types'
import { PUMP_ERROR_MESSAGES } from './constants'

export function getPumpErrorMessage(code: PumpError) {
    return PUMP_ERROR_MESSAGES[code]
}

export function isPumpError<TProgramErrorCode extends PumpError>(error: unknown, transactionMessage: { instructions: Record<number, { programAddress: Address }> }, code?: TProgramErrorCode): error is SolanaError<typeof SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM> & Readonly<{ context: Readonly<{ code: TProgramErrorCode }> }> {
    return isProgramError<TProgramErrorCode>(error, transactionMessage, PUMP_PROGRAM_ADDRESS, code)
}
