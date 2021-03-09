import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { RDSUserSchema } from '../schemas'

/* ExecuteFactory */

export const ExecuteFactoryEventSchema = t.type({
  name: t.literal(InstallerEventNames.executeFactory),
  payload: t.type({
    version: t.string,
    command: t.type({
      name: t.string,
      payload: t.unknown,
    }),
  }),
})

export type ExecuteFactoryEvent = t.TypeOf<typeof ExecuteFactoryEventSchema>

export const ExecuteFactoryResultSchema = t.any

export type ExecuteFactoryResult = t.TypeOf<typeof ExecuteFactoryResultSchema>

/* ListVersions */

export const ListVersionsEventSchema = t.type({
  name: t.literal(InstallerEventNames.listVersions),
  payload: t.UnknownRecord,
})

export type ListVersionsEvent = t.TypeOf<typeof ListVersionsEventSchema>

export const ListVersionsResultSchema = t.array(t.string)

export type ListVersionsResult = t.TypeOf<typeof ListVersionsResultSchema>

/* DescribeEvent */

export const DescribeEventSchema = t.type({
  name: t.literal(InstallerEventNames.describe),
  payload: t.UnknownRecord,
})

export type DescribeEvent = t.TypeOf<typeof DescribeEventSchema>

export const DescribeResultSchema = t.UnknownRecord

export type DescribeResult = t.TypeOf<typeof DescribeResultSchema>

/* EnsureRdsUser */

export const EnsureRdsUserEventSchema = t.type({
  name: t.literal(InstallerEventNames.ensureRdsUser),
  payload: t.type({
    userId: t.string,
  }),
})

export type EnsureRdsUserEvent = t.TypeOf<typeof EnsureRdsUserEventSchema>

export const EnsureRdsUserResultSchema = t.type({
  user: RDSUserSchema,
  eventStoreClusterArn: t.string,
  postgresAdminPassword: t.string,
  postgresAdminSecretArn: t.string,
  postgresAdminSecretName: t.string,
  postgresAdminUsername: t.string,
  readModelsClusterArn: t.string,
})

export type EnsureRdsUserResult = t.TypeOf<typeof EnsureRdsUserResultSchema>

/* DescribeExecution */

export const DescribeExecutionParamsSchema = t.type({
  executionId: t.string,
})
export type DescribeExecutionParams = t.TypeOf<typeof DescribeExecutionParamsSchema>

export const DescribeExecutionBodySchema = t.type({})
export type DescribeExecutionBody = t.TypeOf<typeof DescribeExecutionBodySchema>

export const DescribeExecutionQuerySchema = t.type({})
export type DescribeExecutionQuery = t.TypeOf<typeof DescribeExecutionQuerySchema>

export const DescribeExecutionEventSchema = t.type({
  name: t.literal(InstallerEventNames.describeExecution),
  payload: t.type({
    executionId: t.string,
  }),
})

export type DescribeExecutionEvent = t.TypeOf<typeof DescribeExecutionEventSchema>

export const DescribeExecutionResultSchema = t.type({
  Status: t.union([
    t.literal('RUNNING'),
    t.literal('SUCCEEDED'),
    t.literal('FAILED'),
    t.literal('TIMED_OUT'),
    t.literal('ABORTED'),
  ]),
  Output: t.any,
})

export type DescribeExecutionResult = t.TypeOf<typeof DescribeExecutionResultSchema>

/* GetClientAppConfig */

export const GetClientAppConfigParamsSchema = t.type({})
export type GetClientAppConfigParams = t.TypeOf<typeof GetClientAppConfigParamsSchema>

export const GetClientAppConfigBodySchema = t.type({})
export type GetClientAppConfigBody = t.TypeOf<typeof GetClientAppConfigBodySchema>

export const GetClientAppConfigQuerySchema = t.type({})
export type GetClientAppConfigQuery = t.TypeOf<typeof GetClientAppConfigQuerySchema>

export const GetClientAppConfigEventSchema = t.type({
  name: t.literal(InstallerEventNames.getClientAppConfig),
  payload: GetClientAppConfigBodySchema,
})
export type GetClientAppConfigEvent = t.TypeOf<typeof GetClientAppConfigEventSchema>

export const GetClientAppConfigResultSchema = t.type({
  ClientId: t.string,
  UserPoolId: t.string,
})
export type GetClientAppConfigResult = t.TypeOf<typeof GetClientAppConfigResultSchema>
