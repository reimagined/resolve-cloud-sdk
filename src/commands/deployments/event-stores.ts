import * as t from 'io-ts'
import { FactoryEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../../schemas'

/* LinkDeployment */

export const LinkDeploymentSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/link',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({ deploymentId: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.linkDeployment),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId, deploymentId }) => ({
    params: { eventStoreId },
    body: { deploymentId },
    query: {},
  }),
})

export type LinkDeployment = ExtractSchemaTypes<typeof LinkDeploymentSchema>

/* UnlinkDeployment */

export const UnlinkDeploymentSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/unlink',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({ deploymentId: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.unlinkDeployment),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId, deploymentId }) => ({
    params: { eventStoreId },
    body: { deploymentId },
    query: {},
  }),
})

export type UnlinkDeployment = ExtractSchemaTypes<typeof UnlinkDeploymentSchema>
