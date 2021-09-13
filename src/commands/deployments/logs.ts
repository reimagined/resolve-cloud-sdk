import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

/* DisableLogs */

export const DisableLogsSchema = defineSchema({
  Path: '/deployments/:deploymentId/logs/disable',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.disableLogs),
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

export type DisableLogs = ExtractSchemaTypes<typeof DisableLogsSchema>

/* EnableLogs */

const LogLevelSchema = t.union([
  t.literal('log'),
  t.literal('error'),
  t.literal('warn'),
  t.literal('debug'),
  t.literal('info'),
  t.literal('verbose'),
])

export const EnableLogsSchema = defineSchema({
  Path: '/deployments/:deploymentId/logs/enable',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.partial({
    logLevel: LogLevelSchema,
    scope: t.string,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.enableLogs),
    payload: t.intersection([
      t.type({
        deploymentId: t.string,
        userId: t.string,
      }),
      t.partial({
        logLevel: LogLevelSchema,
        scope: t.string,
      }),
    ]),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, scope, logLevel }) => ({
    params: { deploymentId },
    body: { scope, logLevel },
    query: {},
  }),
})

export type EnableLogs = ExtractSchemaTypes<typeof EnableLogsSchema>

/* GetLogs */

export const GetLogsSchema = defineSchema({
  Path: '/deployments/:deploymentId/logs',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.partial({
    startTime: t.string,
    endTime: t.string,
    filterPattern: t.string,
    streamLimit: t.string,
  }),
  Event: t.type({
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
  }),
  Result: t.string,
  ArgumentsTransformer: ({ deploymentId, streamLimit, startTime, endTime, filterPattern }) => ({
    params: { deploymentId },
    body: {},
    query: {
      streamLimit,
      startTime,
      endTime,
      filterPattern,
    },
  }),
})

export type GetLogs = ExtractSchemaTypes<typeof GetLogsSchema>

/* RemoveLogs */

export const RemoveLogsSchema = defineSchema({
  Path: '/deployments/:deploymentId/logs',
  Method: 'DELETE',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.removeLogs),
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

export type RemoveLogs = ExtractSchemaTypes<typeof RemoveLogsSchema>
