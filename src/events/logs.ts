import { tryCatch } from '@kdt310722/utils/function'
import { notNullish } from '@kdt310722/utils/common'
import { PUMP_PROGRAM_ADDRESS } from '../constants'
import type { ParsedLog } from './types'
import { EVENT_DECODERS, identifyPumpEvent } from './identify'

export const PROGRAM_INVOKE_MESSAGE = `Program ${PUMP_PROGRAM_ADDRESS} invoke`

export const PROGRAM_SUCCESS_MESSAGE = `Program ${PUMP_PROGRAM_ADDRESS} success`

export const PROGRAM_DATA_MESSAGE = 'Program data:'

export function * parseLogs(logs: string[] | readonly string[], throwsOnIdentifyError = true) {
    let invoked = 0

    for (const log of logs) {
        if (log.startsWith(PROGRAM_INVOKE_MESSAGE)) {
            invoked++
        } else if (log.startsWith(PROGRAM_SUCCESS_MESSAGE)) {
            invoked--
        } else if (log.startsWith(PROGRAM_DATA_MESSAGE) && invoked > 0) {
            const data = Buffer.from(log.slice(PROGRAM_DATA_MESSAGE.length + 1), 'base64')
            const eventType = tryCatch(() => identifyPumpEvent(data.subarray(0, 8)), null, () => throwsOnIdentifyError)

            if (notNullish(eventType)) {
                yield { eventType, data: EVENT_DECODERS[eventType].decode(data.subarray(8)) } as ParsedLog
            }
        }
    }
}
