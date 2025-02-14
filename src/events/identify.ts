import { COMPLETE_EVENT_IDENTITY, getCompleteEventDecoder } from './complete'
import { CREATE_EVENT_IDENTITY, getCreateEventDecoder } from './create'
import { SET_PARAMS_EVENT_IDENTITY, getSetParamsEventDecoder } from './set-params'
import { TRADE_EVENT_IDENTITY, getTradeEventDecoder } from './trade'

export enum PumpEvent {
    COMPLETE,
    CREATE,
    SET_PARAMS,
    TRADE,
}

export const EVENT_DECODERS = {
    [PumpEvent.COMPLETE]: getCompleteEventDecoder(),
    [PumpEvent.CREATE]: getCreateEventDecoder(),
    [PumpEvent.SET_PARAMS]: getSetParamsEventDecoder(),
    [PumpEvent.TRADE]: getTradeEventDecoder(),
}

export function identifyPumpEvent(identity: Buffer): PumpEvent {
    if (identity.equals(COMPLETE_EVENT_IDENTITY)) {
        return PumpEvent.COMPLETE
    }

    if (identity.equals(CREATE_EVENT_IDENTITY)) {
        return PumpEvent.CREATE
    }

    if (identity.equals(SET_PARAMS_EVENT_IDENTITY)) {
        return PumpEvent.SET_PARAMS
    }

    if (identity.equals(TRADE_EVENT_IDENTITY)) {
        return PumpEvent.TRADE
    }

    throw new Error('The provided event could not be identified as a pump event.')
}
