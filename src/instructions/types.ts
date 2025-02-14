import type { PUMP_PROGRAM_ADDRESS } from '../constants'
import type { PumpInstruction } from './identify'
import type { ParsedWithdrawInstruction } from './withdraw'
import type { ParsedSellInstruction } from './sell'
import type { ParsedBuyInstruction } from './buy'
import type { ParsedCreateInstruction } from './create'
import type { ParsedSetParamsInstruction } from './set-params'
import type { ParsedInitializeInstruction } from './initialize'

export type ParsedPumpInstruction<TProgram extends string = typeof PUMP_PROGRAM_ADDRESS> =
    | ({ instructionType: PumpInstruction.Initialize } & ParsedInitializeInstruction<TProgram>)
    | ({ instructionType: PumpInstruction.SetParams } & ParsedSetParamsInstruction<TProgram>)
    | ({ instructionType: PumpInstruction.Create } & ParsedCreateInstruction<TProgram>)
    | ({ instructionType: PumpInstruction.Buy } & ParsedBuyInstruction<TProgram>)
    | ({ instructionType: PumpInstruction.Sell } & ParsedSellInstruction<TProgram>)
    | ({ instructionType: PumpInstruction.Withdraw } & ParsedWithdrawInstruction<TProgram>)
