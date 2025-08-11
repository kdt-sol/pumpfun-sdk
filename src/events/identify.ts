import { getAdminSetCreatorEventDecoder, getAdminSetIdlAuthorityEventDecoder, getAdminUpdateTokenIncentivesEventDecoder, getClaimTokenIncentivesEventDecoder, getCloseUserVolumeAccumulatorEventDecoder, getCollectCreatorFeeEventDecoder, getCompleteEventDecoder, getCompletePumpAmmMigrationEventDecoder, getCreateEventDecoder, getExtendAccountEventDecoder, getInitUserVolumeAccumulatorEventDecoder, getSetCreatorEventDecoder, getSetMetaplexCreatorEventDecoder, getSetParamsEventDecoder, getSyncUserVolumeAccumulatorEventDecoder, getTradeEventDecoder, getUpdateGlobalAuthorityEventDecoder } from '../generated'
import { ADMIN_SET_CREATOR_EVENT_IDENTITY, ADMIN_SET_IDL_AUTHORITY_EVENT_IDENTITY, ADMIN_UPDATE_TOKEN_INCENTIVES_EVENT_IDENTITY, CLAIM_TOKEN_INCENTIVES_EVENT_IDENTITY, CLOSE_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY, COLLECT_CREATOR_FEE_EVENT_IDENTITY, COMPLETE_EVENT_IDENTITY, COMPLETE_PUMP_AMM_MIGRATION_EVENT_IDENTITY, CREATE_EVENT_IDENTITY, EXTEND_ACCOUNT_EVENT_IDENTITY, INIT_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY, SET_CREATOR_EVENT_IDENTITY, SET_METAPLEX_CREATOR_EVENT_IDENTITY, SET_PARAMS_EVENT_IDENTITY, SYNC_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY, TRADE_EVENT_IDENTITY, UPDATE_GLOBAL_AUTHORITY_EVENT_IDENTITY } from './constants'

export enum PumpEvent {
    ADMIN_SET_CREATOR,
    ADMIN_SET_IDL_AUTHORITY,
    ADMIN_UPDATE_TOKEN_INCENTIVES,
    CLAIM_TOKEN_INCENTIVES,
    CLOSE_USER_VOLUME_ACCUMULATOR,
    COLLECT_CREATOR_FEE,
    COMPLETE,
    COMPLETE_AMM_MIGRATION,
    CREATE,
    EXTEND_ACCOUNT,
    INIT_USER_VOLUME_ACCUMULATOR,
    SET_CREATOR,
    SET_METAPLEX_CREATOR,
    SET_PARAMS,
    SYNC_USER_VOLUME_ACCUMULATOR,
    TRADE,
    UPDATE_GLOBAL_AUTHORITY,
}

export const EVENT_DECODERS = {
    [PumpEvent.ADMIN_SET_CREATOR]: getAdminSetCreatorEventDecoder(),
    [PumpEvent.ADMIN_SET_IDL_AUTHORITY]: getAdminSetIdlAuthorityEventDecoder(),
    [PumpEvent.ADMIN_UPDATE_TOKEN_INCENTIVES]: getAdminUpdateTokenIncentivesEventDecoder(),
    [PumpEvent.CLAIM_TOKEN_INCENTIVES]: getClaimTokenIncentivesEventDecoder(),
    [PumpEvent.CLOSE_USER_VOLUME_ACCUMULATOR]: getCloseUserVolumeAccumulatorEventDecoder(),
    [PumpEvent.COLLECT_CREATOR_FEE]: getCollectCreatorFeeEventDecoder(),
    [PumpEvent.COMPLETE]: getCompleteEventDecoder(),
    [PumpEvent.COMPLETE_AMM_MIGRATION]: getCompletePumpAmmMigrationEventDecoder(),
    [PumpEvent.CREATE]: getCreateEventDecoder(),
    [PumpEvent.EXTEND_ACCOUNT]: getExtendAccountEventDecoder(),
    [PumpEvent.INIT_USER_VOLUME_ACCUMULATOR]: getInitUserVolumeAccumulatorEventDecoder(),
    [PumpEvent.SET_CREATOR]: getSetCreatorEventDecoder(),
    [PumpEvent.SET_METAPLEX_CREATOR]: getSetMetaplexCreatorEventDecoder(),
    [PumpEvent.SET_PARAMS]: getSetParamsEventDecoder(),
    [PumpEvent.SYNC_USER_VOLUME_ACCUMULATOR]: getSyncUserVolumeAccumulatorEventDecoder(),
    [PumpEvent.TRADE]: getTradeEventDecoder(),
    [PumpEvent.UPDATE_GLOBAL_AUTHORITY]: getUpdateGlobalAuthorityEventDecoder(),
}

export function identifyPumpEvent(identity: Buffer): PumpEvent {
    if (identity.equals(ADMIN_SET_CREATOR_EVENT_IDENTITY)) {
        return PumpEvent.ADMIN_SET_CREATOR
    }

    if (identity.equals(ADMIN_SET_IDL_AUTHORITY_EVENT_IDENTITY)) {
        return PumpEvent.ADMIN_SET_IDL_AUTHORITY
    }

    if (identity.equals(ADMIN_UPDATE_TOKEN_INCENTIVES_EVENT_IDENTITY)) {
        return PumpEvent.ADMIN_UPDATE_TOKEN_INCENTIVES
    }

    if (identity.equals(CLAIM_TOKEN_INCENTIVES_EVENT_IDENTITY)) {
        return PumpEvent.CLAIM_TOKEN_INCENTIVES
    }

    if (identity.equals(CLOSE_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY)) {
        return PumpEvent.CLOSE_USER_VOLUME_ACCUMULATOR
    }

    if (identity.equals(COLLECT_CREATOR_FEE_EVENT_IDENTITY)) {
        return PumpEvent.COLLECT_CREATOR_FEE
    }

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

    if (identity.equals(SET_CREATOR_EVENT_IDENTITY)) {
        return PumpEvent.SET_CREATOR
    }

    if (identity.equals(SET_METAPLEX_CREATOR_EVENT_IDENTITY)) {
        return PumpEvent.SET_METAPLEX_CREATOR
    }

    if (identity.equals(SET_PARAMS_EVENT_IDENTITY)) {
        return PumpEvent.SET_PARAMS
    }

    if (identity.equals(TRADE_EVENT_IDENTITY)) {
        return PumpEvent.TRADE
    }

    if (identity.equals(INIT_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY)) {
        return PumpEvent.INIT_USER_VOLUME_ACCUMULATOR
    }

    if (identity.equals(SYNC_USER_VOLUME_ACCUMULATOR_EVENT_IDENTITY)) {
        return PumpEvent.SYNC_USER_VOLUME_ACCUMULATOR
    }

    if (identity.equals(UPDATE_GLOBAL_AUTHORITY_EVENT_IDENTITY)) {
        return PumpEvent.UPDATE_GLOBAL_AUTHORITY
    }

    throw new Error('The provided event could not be identified as a pump event.')
}
