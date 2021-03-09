import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'

/* DisableTracing */

export const DisableTracingEventSchema = t.type({
  name: t.literal(InstallerEventNames.disableTracing),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type DisableTracingEvent = t.TypeOf<typeof DisableTracingEventSchema>

export const DisableTracingResultSchema = t.void

export type DisableTracingResult = t.TypeOf<typeof DisableTracingResultSchema>

/* EnableTracing */

export const EnableTracingEventSchema = t.type({
  name: t.literal(InstallerEventNames.enableTracing),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type EnableTracingEvent = t.TypeOf<typeof EnableTracingEventSchema>

export const EnableTracingResultSchema = t.void

export type EnableTracingResult = t.TypeOf<typeof EnableTracingResultSchema>

/* GetSummaries */

export const GetSummariesEventSchema = t.type({
  name: t.literal(InstallerEventNames.getSummaries),
  payload: t.intersection([
    t.type({
      deploymentId: t.string,
      userId: t.string,
      startTime: t.number,
      endTime: t.number,
    }),
    t.partial({
      filterExpression: t.string,
    }),
  ]),
})

export type GetSummariesEvent = t.TypeOf<typeof GetSummariesEventSchema>

export const GetSummariesResultSchema = t.array(
  t.intersection([
    t.partial({
      Id: t.string,
      ResponseTime: t.number,
      Http: t.partial({
        HttpURL: t.string,
        HttpStatus: t.number,
        HttpMethod: t.string,
        UserAgent: t.string,
        ClientIp: t.string,
      }),
    }),
    t.record(t.string, t.any),
  ])
)

export type GetSummariesResult = t.TypeOf<typeof GetSummariesResultSchema>

/* GetTrace */

export const GetTraceEventSchema = t.type({
  name: t.literal(InstallerEventNames.getTrace),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    traceIds: t.array(t.string),
  }),
})

export type GetTraceEvent = t.TypeOf<typeof GetTraceEventSchema>

export const GetTraceResultSchema = t.array(t.record(t.string, t.any))

export type GetTraceResult = t.TypeOf<typeof GetTraceResultSchema>

/* GetTracing */

export const GetTracingStatusEventSchema = t.type({
  name: t.literal(InstallerEventNames.getTracingStatus),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type GetTracingStatusEvent = t.TypeOf<typeof GetTracingStatusEventSchema>

export const GetTracingStatusResultSchema = t.union([t.literal('enabled'), t.literal('disabled')])

export type GetTracingStatusResult = t.TypeOf<typeof GetTracingStatusResultSchema>
