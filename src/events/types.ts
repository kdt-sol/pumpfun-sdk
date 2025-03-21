import type { CompleteEvent, CompletePumpAmmMigrationEvent, CreateEvent, ExtendAccountEvent, SetParamsEvent, TradeEvent, UpdateGlobalAuthorityEvent } from '../generated'
import type { PumpEvent } from './identify'

export type ParsedLog =
    | ({ eventType: PumpEvent.COMPLETE, data: CompleteEvent })
    | ({ eventType: PumpEvent.COMPLETE_AMM_MIGRATION, data: CompletePumpAmmMigrationEvent })
    | ({ eventType: PumpEvent.CREATE, data: CreateEvent })
    | ({ eventType: PumpEvent.EXTEND_ACCOUNT, data: ExtendAccountEvent })
    | ({ eventType: PumpEvent.SET_PARAMS, data: SetParamsEvent })
    | ({ eventType: PumpEvent.TRADE, data: TradeEvent })
    | ({ eventType: PumpEvent.UPDATE_GLOBAL_AUTHORITY, data: UpdateGlobalAuthorityEvent })
