import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'

/* DisableLogs */

export const DisableLogsEventSchema = t.type({
  name: t.literal(InstallerEventNames.disableLogs),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type DisableLogsEvent = t.TypeOf<typeof DisableLogsEventSchema>

export const DisableLogsResultSchema = t.void

export type DisableLogsResult = t.TypeOf<typeof DisableLogsResultSchema>

/* EnableLogs */

export const EnableLogsEventSchema = t.type({
  name: t.literal(InstallerEventNames.enableLogs),
  payload: t.intersection([
    t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
    t.partial({
      logLevel: t.union([
        t.literal('log'),
        t.literal('error'),
        t.literal('warn'),
        t.literal('debug'),
        t.literal('info'),
        t.literal('verbose'),
      ]),
      scope: t.string,
    }),
  ]),
})

export type EnableLogsEvent = t.TypeOf<typeof EnableLogsEventSchema>

export const EnableLogsResultSchema = t.void

export type EnableLogsResult = t.TypeOf<typeof EnableLogsResultSchema>

/* GetLogs */

export const GetLogsEventSchema = t.type({
  name: t.literal(InstallerEventNames.getLogs),
  payload: t.intersection([
    t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
    t.partial({
      streamLimit: t.number,
      startTime: t.number,
      endTime: t.number,
      filterPattern: t.string,
    }),
  ]),
})

export type GetLogsEvent = t.TypeOf<typeof GetLogsEventSchema>

export const GetLogsResultSchema = t.string

export type GetLogsResult = t.TypeOf<typeof GetLogsResultSchema>

/* RemoveLogs */

export const RemoveLogsEventSchema = t.type({
  name: t.literal(InstallerEventNames.removeLogs),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type RemoveLogsEvent = t.TypeOf<typeof RemoveLogsEventSchema>

export const RemoveLogsResultSchema = t.void

export type RemoveLogsResult = t.TypeOf<typeof RemoveLogsResultSchema>
