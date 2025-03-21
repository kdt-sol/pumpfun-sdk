import { getCompleteEventDecoder, getCompletePumpAmmMigrationEventDecoder, getCreateEventDecoder, getExtendAccountEventDecoder, getSetParamsEventDecoder, getTradeEventDecoder, getUpdateGlobalAuthorityEventDecoder } from '../generated'
import { COMPLETE_EVENT_IDENTITY, COMPLETE_PUMP_AMM_MIGRATION_EVENT_IDENTITY, CREATE_EVENT_IDENTITY, EXTEND_ACCOUNT_EVENT_IDENTITY, SET_PARAMS_EVENT_IDENTITY, TRADE_EVENT_IDENTITY, UPDATE_GLOBAL_AUTHORITY_EVENT_IDENTITY } from './constants'

export enum PumpEvent {
    COMPLETE,
    COMPLETE_AMM_MIGRATION,
    CREATE,
    EXTEND_ACCOUNT,
    SET_PARAMS,
    TRADE,
    UPDATE_GLOBAL_AUTHORITY,
}

export const EVENT_DECODERS = {
    [PumpEvent.COMPLETE]: getCompleteEventDecoder(),
    [PumpEvent.COMPLETE_AMM_MIGRATION]: getCompletePumpAmmMigrationEventDecoder(),
    [PumpEvent.CREATE]: getCreateEventDecoder(),
    [PumpEvent.EXTEND_ACCOUNT]: getExtendAccountEventDecoder(),
    [PumpEvent.SET_PARAMS]: getSetParamsEventDecoder(),
    [PumpEvent.TRADE]: getTradeEventDecoder(),
    [PumpEvent.UPDATE_GLOBAL_AUTHORITY]: getUpdateGlobalAuthorityEventDecoder(),
}

export function identifyPumpEvent(identity: Buffer): PumpEvent {
    if (identity.equals(COMPLETE_EVENT_IDENTITY)) {
        return PumpEvent.COMPLETE
    }

    if (identity.equals(COMPLETE_PUMP_AMM_MIGRATION_EVENT_IDENTITY)) {
        return PumpEvent.COMPLETE_AMM_MIGRATION
    }

    if (identity.equals(CREATE_EVENT_IDENTITY)) {
        return PumpEvent.CREATE
    }

    if (identity.equals(EXTEND_ACCOUNT_EVENT_IDENTITY)) {
        return PumpEvent.EXTEND_ACCOUNT
    }

    if (identity.equals(SET_PARAMS_EVENT_IDENTITY)) {
        return PumpEvent.SET_PARAMS
    }

    if (identity.equals(TRADE_EVENT_IDENTITY)) {
        return PumpEvent.TRADE
    }

    if (identity.equals(UPDATE_GLOBAL_AUTHORITY_EVENT_IDENTITY)) {
        return PumpEvent.UPDATE_GLOBAL_AUTHORITY
    }

    throw new Error('The provided event could not be identified as a pump event.')
}
