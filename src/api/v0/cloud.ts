import * as t from 'io-ts'

import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

const Namespace = 'System'

/* Heartbeat */

export const HeartbeatSchema = defineSchema({
  Namespace,
  Description: 'Check if the service is available.',
  Path: '/v0',
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
  Namespace,
  Description: 'Get a list of the available reSolve versions.',
  Path: '/v0/runtimes',
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
  Namespace,
  Description: 'Get the status of a long-running operation specified by its ID.',
  Path: '/v0/describe-execution/:executionId',
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
      userId: t.string,
    }),
  }),
  Result: t.type({
    status: t.union([
      t.literal('RUNNING'),
      t.literal('SUCCEEDED'),
      t.literal('FAILED'),
      t.literal('TIMED_OUT'),
      t.literal('ABORTED'),
    ]),
    output: t.any,
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
  Namespace,
  Description: "Get reSolve Cloud's app client ID and user pool ID on Amazon Cognito.",
  Path: '/v0/client-app-config',
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
    clientId: t.string,
    userPoolId: t.string,
  }),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type GetClientAppConfig = ExtractSchemaTypes<typeof GetClientAppConfigSchema>
