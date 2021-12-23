import * as t from 'io-ts'

import { InstallerEventNames } from '../../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../../schemas'
import { UpdateEnvironmentVariablesSchema } from '../../envs'

const Namespace = 'Deployments / Environment variables'

/* SetEnvironmentVariables */

export const SetEnvironmentVariablesSchema = defineSchema({
  Namespace,
  Description: 'Set environment variables for a deployment.',
  Path: '/v0/deployments/:deploymentId/environment',
  Method: 'PUT',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({
    variables: t.record(t.string, t.string),
  }),
  Query: t.type({}),
  Event: UpdateEnvironmentVariablesSchema.Event,
  Result: UpdateEnvironmentVariablesSchema.Result,
  ArgumentsTransformer: ({ deploymentId, variables }) => ({
    params: { deploymentId },
    body: { variables },
    query: {},
  }),
})

export type SetEnvironmentVariables = ExtractSchemaTypes<typeof SetEnvironmentVariablesSchema>

/* RemoveEnvironmentVariables */

export const RemoveEnvironmentVariablesSchema = defineSchema({
  Namespace,
  Description: 'Remove environment variables.',
  Path: '/v0/deployments/:deploymentId/environment',
  Method: 'DELETE',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({
    variables: t.array(t.string),
  }),
  Query: t.type({}),
  Event: UpdateEnvironmentVariablesSchema.Event,
  Result: UpdateEnvironmentVariablesSchema.Result,
  ArgumentsTransformer: ({ deploymentId, variables }) => ({
    params: { deploymentId },
    body: { variables },
    query: {},
  }),
})

export type RemoveEnvironmentVariables = ExtractSchemaTypes<typeof RemoveEnvironmentVariablesSchema>

/* ListEnvironmentVariables */

export const ListEnvironmentVariablesSchema = defineSchema({
  Namespace,
  Description: "Get a list of a deployment's environment variables.",
  Path: '/v0/deployments/:deploymentId/environment',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.listEnvironmentVariables),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.record(t.string, t.string),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type ListEnvironmentVariables = ExtractSchemaTypes<typeof ListEnvironmentVariablesSchema>
