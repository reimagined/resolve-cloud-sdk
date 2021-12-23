import * as t from 'io-ts'

import { FactoryEventNames } from '../../../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../../../schemas'

const Namespace = 'Deployments / Read models'

/* PauseReadModel */

export const PauseReadModelSchema = defineSchema({
  Namespace,
  Description: 'Pause read model updates.',
  Path: '/v0/deployments/:deploymentId/read-models/:readModelName/pause',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, readModelName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.pauseReadModel),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, readModelName }) => ({
    params: { deploymentId, readModelName },
    body: {},
    query: {},
  }),
})

export type PauseReadModel = ExtractSchemaTypes<typeof PauseReadModelSchema>

/* ResetReadModel */

export const ResetReadModelSchema = defineSchema({
  Namespace,
  Description: "Reset a read model's persistent state.",
  Path: '/v0/deployments/:deploymentId/read-models/:readModelName/reset',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, readModelName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.resetReadModel),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, readModelName }) => ({
    params: { deploymentId, readModelName },
    body: {},
    query: {},
  }),
})

export type ResetReadModel = ExtractSchemaTypes<typeof ResetReadModelSchema>

/* ResumeReadModel */

export const ResumeReadModelSchema = defineSchema({
  Namespace,
  Description: 'Resume read model updates.',
  Path: '/v0/deployments/:deploymentId/read-models/:readModelName/resume',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, readModelName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.resumeReadModel),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, readModelName }) => ({
    params: { deploymentId, readModelName },
    body: {},
    query: {},
  }),
})

export type ResumeReadModel = ExtractSchemaTypes<typeof ResumeReadModelSchema>

/* ListReadModels */

export const ListReadModelsSchema = defineSchema({
  Namespace,
  Description: "Obtain the list of a deployment's read models.",
  Path: '/v0/deployments/:deploymentId/read-models',
  Method: 'GET',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.listReadModels),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.array(
    t.type({
      name: t.string,
      status: t.union([t.string, t.null]),
      successEvent: t.union([t.record(t.string, t.any), t.null]),
      failedEvent: t.union([t.record(t.string, t.any), t.null]),
      errors: t.array(
        t.type({
          name: t.string,
          message: t.string,
          stack: t.string,
        })
      ),
    })
  ),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type ListReadModels = ExtractSchemaTypes<typeof ListReadModelsSchema>

/* CreateReadModel */

export const CreateReadModelSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.createReadModel),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      user: RDSUserSchema,
      readModelsClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      readModelsClusterEndpoint: t.string,
      readModelsClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.type({
    readModelDatabaseName: t.string,
  }),
})

export type CreateReadModel = ExtractSchemaTypes<typeof CreateReadModelSchema>

/* DropReadModel */

export const DropReadModelSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.dropReadModel),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      user: RDSUserSchema,
      readModelsClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      readModelsClusterEndpoint: t.string,
      readModelsClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.void,
})

export type DropReadModel = ExtractSchemaTypes<typeof DropReadModelSchema>
