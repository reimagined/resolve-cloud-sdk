import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

/* DisableTracing */

export const DisableTracingSchema = defineSchema({
  Path: '/deployments/:deploymentId/tracing/disable',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.disableTracing),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type DisableTracing = ExtractSchemaTypes<typeof DisableTracingSchema>

/* EnableTracing */

export const EnableTracingSchema = defineSchema({
  Path: '/deployments/:deploymentId/tracing/enable',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.enableTracing),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type EnableTracing = ExtractSchemaTypes<typeof EnableTracingSchema>

/* GetSummaries */

export const GetSummariesSchema = defineSchema({
  Path: '/deployments/:deploymentId/tracing/summary',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.intersection([
    t.type({ startTime: t.string, endTime: t.string }),
    t.partial({ filterExpression: t.string }),
  ]),
  Event: t.type({
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
  }),
  Result: t.array(
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
  ),
  ArgumentsTransformer: ({ deploymentId, startTime, endTime, filterExpression }) => ({
    params: { deploymentId },
    body: {},
    query: { startTime, endTime, filterExpression },
  }),
})

export type GetSummaries = ExtractSchemaTypes<typeof GetSummariesSchema>

/* GetTrace */

export const GetTracingDetailsSchema = defineSchema({
  Path: '/deployments/:deploymentId/tracing/details',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({
    traceIds: t.string,
  }),
  Event: t.type({
    name: t.literal(InstallerEventNames.getTracingDetails),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
      traceIds: t.array(t.string),
    }),
  }),
  Result: t.array(t.record(t.string, t.any)),
  ArgumentsTransformer: ({ deploymentId, traceIds }) => ({
    params: { deploymentId },
    body: {},
    query: { traceIds },
  }),
})

export type GetTracingDetails = ExtractSchemaTypes<typeof GetTracingDetailsSchema>

/* GetTracing */

export const GetTracingStatusSchema = defineSchema({
  Path: '/deployments/:deploymentId/tracing/status',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getTracingStatus),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.union([t.literal('enabled'), t.literal('disabled')]),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type GetTracingStatus = ExtractSchemaTypes<typeof GetTracingStatusSchema>
