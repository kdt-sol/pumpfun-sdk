import { tryCatch } from '@kdt310722/utils/function'
import { notNullish } from '@kdt310722/utils/common'
import { PUMP_PROGRAM_ADDRESS } from '../constants'
import type { ParsedLog } from './types'
import { EVENT_DECODERS, identifyPumpEvent } from './identify'

export const PROGRAM_SUCCESS_MESSAGE = `Program ${PUMP_PROGRAM_ADDRESS} success`

export const PROGRAM_DATA_MESSAGE = 'Program data:'

export function parseLogs(logs: string[] | readonly string[], throwsOnIdentifyError = true): ParsedLog[] {
    const parsedLogs: ParsedLog[] = []

    for (let i = 0; i < logs.length; i++) {
        const message = logs[i]

        if (message === PROGRAM_SUCCESS_MESSAGE && logs[i + 1]?.startsWith(PROGRAM_DATA_MESSAGE)) {
            const data = Buffer.from(logs[i + 1].split(': ')[1], 'base64')
            const eventType = tryCatch(() => identifyPumpEvent(data.subarray(0, 8)), null, () => throwsOnIdentifyError)

            if (notNullish(eventType)) {
                parsedLogs.push({ eventType, data: EVENT_DECODERS[eventType].decode(data.subarray(8)) } as ParsedLog)
            }

            i++
        }
    }

    return parsedLogs
}
