import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

/* UpdateEnvironmentVariables */

export const UpdateEnvironmentVariablesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.updateEnvironmentVariables),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
      variables: t.record(t.string, t.union([t.string, t.null])),
    }),
  }),
  Result: t.void,
})
export type UpdateEnvironmentVariables = ExtractSchemaTypes<typeof UpdateEnvironmentVariablesSchema>

/* SetEnvironmentVariables */

export const SetEnvironmentVariablesSchema = defineSchema({
  Path: '/deployments/:deploymentId/environment',
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
  Path: '/deployments/:deploymentId/environment',
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
  Path: '/deployments/:deploymentId/environment',
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
