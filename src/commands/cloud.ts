import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../schemas'

/* Heartbeat */

export const HeartbeatSchema = defineSchema({
  Path: '/',
  Method: 'HEAD',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.heartbeat),
    payload: t.void,
  }),
  Result: t.void,
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})
export type Heartbeat = ExtractSchemaTypes<typeof HeartbeatSchema>

/* ListVersions */

export const ListVersionsSchema = defineSchema({
  Path: '/runtimes',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.listVersions),
    payload: t.UnknownRecord,
  }),
  Result: t.array(t.string),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type ListVersions = ExtractSchemaTypes<typeof ListVersionsSchema>

/* DescribeExecution */

export const DescribeExecutionSchema = defineSchema({
  Path: '/describe-execution/:executionId',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({
    executionId: t.string,
  }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.describeExecution),
    payload: t.type({
      executionId: t.string,
    }),
  }),
  Result: t.type({
    Status: t.union([
      t.literal('RUNNING'),
      t.literal('SUCCEEDED'),
      t.literal('FAILED'),
      t.literal('TIMED_OUT'),
      t.literal('ABORTED'),
    ]),
    Output: t.any,
  }),
  ArgumentsTransformer: (args: { executionId: string }) => ({
    params: { executionId: args.executionId },
    body: {},
    query: {},
  }),
})

export type DescribeExecution = ExtractSchemaTypes<typeof DescribeExecutionSchema>

/* GetClientAppConfig */

export const GetClientAppConfigSchema = defineSchema({
  Path: '/client-app-config',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getClientAppConfig),
    payload: t.type({}),
  }),
  Result: t.type({
    ClientId: t.string,
    UserPoolId: t.string,
  }),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type GetClientAppConfig = ExtractSchemaTypes<typeof GetClientAppConfigSchema>

/* DescribeEvent */

export const DescribeSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.describe),
    payload: t.UnknownRecord,
  }),
  Result: t.UnknownRecord,
})

export type Describe = ExtractSchemaTypes<typeof DescribeSchema>

/* EnsureRdsUser */

export const EnsureRdsUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.ensureRdsUser),
    payload: t.type({
      userId: t.string,
    }),
  }),
  Result: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    eventStoreClusterEndpoint: t.string,
    eventStoreClusterPort: t.number,
    readModelsClusterArn: t.string,
    readModelsClusterEndpoint: t.string,
    readModelsClusterPort: t.number,
    postgresAdminPassword: t.string,
    postgresAdminSecretArn: t.string,
    postgresAdminSecretName: t.string,
    postgresAdminUsername: t.string,
  }),
})

export type EnsureRdsUser = ExtractSchemaTypes<typeof EnsureRdsUserSchema>
