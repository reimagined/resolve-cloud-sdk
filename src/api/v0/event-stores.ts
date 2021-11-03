import * as t from 'io-ts'

import { FactoryEventNames, InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../../schemas'

const Namespace = 'Event stores'

/* CreateEventStore */

export const CreateEventStoreSchema = defineSchema({
  Namespace,
  Path: '/v0/event-stores',
  Method: 'POST',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.type({
    version: t.string,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.createEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.type({
    eventStoreId: t.string,
  }),
  ArgumentsTransformer: ({ version }) => ({
    params: {},
    body: { version },
    query: {},
  }),
})

export type CreateEventStore = ExtractSchemaTypes<typeof CreateEventStoreSchema>

/* DropEventStore */

export const DropEventStoreSchema = defineSchema({
  Namespace,
  Path: '/v0/event-stores/:eventStoreId',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.dropEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})

export type DropEventStore = ExtractSchemaTypes<typeof DropEventStoreSchema>

/* GetEventStore */

export const GetEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId',
  Method: 'GET',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getEventStore),
    payload: t.type({
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.type({
    eventStoreClusterArn: t.string,
    eventStoreSecretArn: t.string,
    eventStoreDatabaseName: t.string,
    version: t.string,
    eventStoreId: t.string,
    linkedDeployments: t.array(t.string),
    region: t.string,
    accessKeyId: t.string,
    secretAccessKey: t.string,
    sessionToken: t.string,
  }),
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})

export type GetEventStore = ExtractSchemaTypes<typeof GetEventStoreSchema>

/* ListEventStores */

export const ListEventStoresSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores',
  Method: 'GET',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.listEventStores),
    payload: t.type({
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.array(
    t.type({
      version: t.string,
      eventStoreId: t.string,
      linkedDeployments: t.array(t.string),
      eventStoreDatabaseName: t.string,
      events: t.union([t.number, t.null]),
      secrets: t.union([t.number, t.null]),
      modifiedAt: t.union([t.number, t.null]),
      createdAt: t.union([t.number, t.null]),
      isFrozen: t.union([t.boolean, t.null]),
    })
  ),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type ListEventStores = ExtractSchemaTypes<typeof ListEventStoresSchema>

/* CloneEventStore */

export const CloneEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/clone',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.cloneEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.type({
    eventStoreId: t.string,
    eventStoreDatabaseName: t.string,
  }),
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})

export type CloneEventStore = ExtractSchemaTypes<typeof CloneEventStoreSchema>

/* ClearEventStore */

export const ClearEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/clear',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.clearEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})
export type ClearEventStore = ExtractSchemaTypes<typeof ClearEventStoreSchema>

/* FreezeEventStore */

export const FreezeEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/freeze',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.freezeEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})
export type FreezeEventStore = ExtractSchemaTypes<typeof FreezeEventStoreSchema>

/* UnfreezeEventStore */

export const UnfreezeEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/unfreeze',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.unfreezeEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      postgresAdminUsername: t.string,
      postgresAdminPassword: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})
export type UnfreezeEventStore = ExtractSchemaTypes<typeof UnfreezeEventStoreSchema>

/* LinkDeployment */

export const LinkDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/link',
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
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/unlink',
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

/* ImportEventStore */

export const ImportEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/import',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({ partIndex: t.number }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.importEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreDatabaseName: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      bucketName: t.string,
      partIndex: t.number,
      accessKeyId: t.string,
      secretAccessKey: t.string,
      sessionToken: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId, partIndex }) => ({
    params: { eventStoreId },
    body: { partIndex },
    query: {},
  }),
})

export type ImportEventStore = ExtractSchemaTypes<typeof ImportEventStoreSchema>

/* ExportEventStore */

export const ExportEventStoreSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/export',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.partial({ cursor: t.string }),
  Event: t.type({
    name: t.literal(FactoryEventNames.exportEventStore),
    payload: t.intersection([
      t.type({
        version: t.string,
        user: RDSUserSchema,
        eventStoreId: t.string,
        eventStoreDatabaseName: t.string,
        eventStoreClusterEndpoint: t.string,
        eventStoreClusterPort: t.number,
        bucketName: t.string,
        importExportStepFunctionArn: t.string,
      }),
      t.partial({
        cursor: t.string,
      }),
    ]),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ eventStoreId, cursor }) => ({
    params: { eventStoreId },
    body: {},
    query: { cursor },
  }),
})

export type ExportEventStore = ExtractSchemaTypes<typeof ExportEventStoreSchema>

/* GetImportUrls */

export const GetImportUrlsSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/import',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({ eventsPartCount: t.string, secretsPartCount: t.string }),
  Event: t.type({
    name: t.literal(FactoryEventNames.getImportUrls),
    payload: t.type({
      version: t.string,
      userId: t.string,
      eventStoreId: t.string,
      bucketName: t.string,
      eventsPartCount: t.number,
      secretsPartCount: t.number,
    }),
  }),
  Result: t.type({
    eventsImportUrls: t.array(t.string),
    secretsImportUrls: t.array(t.string),
  }),
  ArgumentsTransformer: ((args: {
    eventStoreId: string
    eventsPartCount: number
    secretsPartCount: number
  }) => ({
    params: { eventStoreId: args.eventStoreId },
    body: {},
    query: {
      eventsPartCount: `${args.eventsPartCount}`,
      secretsPartCount: `${args.secretsPartCount}`,
    },
  })) as any,
})

export type GetImportUrls = ExtractSchemaTypes<typeof GetImportUrlsSchema>

/* GetExportUrls */

export const GetExportUrlsSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/event-stores/:eventStoreId/export',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.getExportUrls),
    payload: t.type({
      version: t.string,
      userId: t.string,
      eventStoreId: t.string,
      bucketName: t.string,
    }),
  }),
  Result: t.type({
    eventsExportUrl: t.string,
    secretsExportUrl: t.string,
    statusFileUrl: t.string,
  }),
  ArgumentsTransformer: ({ eventStoreId }) => ({
    params: { eventStoreId },
    body: {},
    query: {},
  }),
})

export type GetExportUrls = ExtractSchemaTypes<typeof GetExportUrlsSchema>
