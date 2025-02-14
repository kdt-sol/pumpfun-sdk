import type { PumpEvent } from './identify'
import type { CompleteEvent } from './complete'
import type { CreateEvent } from './create'
import type { SetParamsEvent } from './set-params'
import type { TradeEvent } from './trade'

export type ParsedLog =
    | ({ eventType: PumpEvent.COMPLETE, data: CompleteEvent })
    | ({ eventType: PumpEvent.CREATE, data: CreateEvent })
    | ({ eventType: PumpEvent.SET_PARAMS, data: SetParamsEvent })
    | ({ eventType: PumpEvent.TRADE, data: TradeEvent })
