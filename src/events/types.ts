import type { AdminSetCreatorEvent, AdminSetIdlAuthorityEvent, AdminUpdateTokenIncentivesEvent, ClaimTokenIncentivesEvent, CloseUserVolumeAccumulatorEvent, CollectCreatorFeeEvent, CompleteEvent, CompletePumpAmmMigrationEvent, CreateEvent, ExtendAccountEvent, InitUserVolumeAccumulatorEvent, SetCreatorEvent, SetMetaplexCreatorEvent, SetParamsEvent, SyncUserVolumeAccumulatorEvent, TradeEvent, UpdateGlobalAuthorityEvent } from '../generated'
import type { PumpEvent } from './identify'

export type ParsedLog =
    | { eventType: PumpEvent.ADMIN_SET_CREATOR, data: AdminSetCreatorEvent }
    | { eventType: PumpEvent.ADMIN_SET_IDL_AUTHORITY, data: AdminSetIdlAuthorityEvent }
    | { eventType: PumpEvent.ADMIN_UPDATE_TOKEN_INCENTIVES, data: AdminUpdateTokenIncentivesEvent }
    | { eventType: PumpEvent.CLAIM_TOKEN_INCENTIVES, data: ClaimTokenIncentivesEvent }
    | { eventType: PumpEvent.CLOSE_USER_VOLUME_ACCUMULATOR, data: CloseUserVolumeAccumulatorEvent }
    | { eventType: PumpEvent.COLLECT_CREATOR_FEE, data: CollectCreatorFeeEvent }
    | { eventType: PumpEvent.COMPLETE, data: CompleteEvent }
    | { eventType: PumpEvent.COMPLETE_AMM_MIGRATION, data: CompletePumpAmmMigrationEvent }
    | { eventType: PumpEvent.CREATE, data: CreateEvent }
    | { eventType: PumpEvent.EXTEND_ACCOUNT, data: ExtendAccountEvent }
    | { eventType: PumpEvent.INIT_USER_VOLUME_ACCUMULATOR, data: InitUserVolumeAccumulatorEvent }
    | { eventType: PumpEvent.SET_CREATOR, data: SetCreatorEvent }
    | { eventType: PumpEvent.SET_METAPLEX_CREATOR, data: SetMetaplexCreatorEvent }
    | { eventType: PumpEvent.SET_PARAMS, data: SetParamsEvent }
    | { eventType: PumpEvent.SYNC_USER_VOLUME_ACCUMULATOR, data: SyncUserVolumeAccumulatorEvent }
    | { eventType: PumpEvent.TRADE, data: TradeEvent }
    | { eventType: PumpEvent.UPDATE_GLOBAL_AUTHORITY, data: UpdateGlobalAuthorityEvent }
