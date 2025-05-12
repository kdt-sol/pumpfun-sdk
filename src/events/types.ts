import type { CollectCreatorFeeEvent, CompleteEvent, CompletePumpAmmMigrationEvent, CreateEvent, ExtendAccountEvent, SetCreatorEvent, SetMetaplexCreatorEvent, SetParamsEvent, TradeEvent, UpdateGlobalAuthorityEvent } from '../generated'
import type { PumpEvent } from './identify'

export type ParsedLog =
    | ({ eventType: PumpEvent.COLLECT_CREATOR_FEE, data: CollectCreatorFeeEvent })
    | ({ eventType: PumpEvent.COMPLETE, data: CompleteEvent })
    | ({ eventType: PumpEvent.COMPLETE_AMM_MIGRATION, data: CompletePumpAmmMigrationEvent })
    | ({ eventType: PumpEvent.CREATE, data: CreateEvent })
    | ({ eventType: PumpEvent.EXTEND_ACCOUNT, data: ExtendAccountEvent })
    | ({ eventType: PumpEvent.SET_CREATOR, data: SetCreatorEvent })
    | ({ eventType: PumpEvent.SET_METAPLEX_CREATOR, data: SetMetaplexCreatorEvent })
    | ({ eventType: PumpEvent.SET_PARAMS, data: SetParamsEvent })
    | ({ eventType: PumpEvent.TRADE, data: TradeEvent })
    | ({ eventType: PumpEvent.UPDATE_GLOBAL_AUTHORITY, data: UpdateGlobalAuthorityEvent })
