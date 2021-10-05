import * as t from 'io-ts'
import { InstallerEventNames, FactoryEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../schemas'

/* CreateEventStore */

export const CreateEventStoreSchema = defineSchema({
  Path: '/event-stores',
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
      assetsBucketName: t.string,
    }),
  }),
  Result: t.type({
    eventStoreId: t.string,
    eventStoreDatabaseName: t.string,
  }),
  ArgumentsTransformer: ({ version }) => ({
    params: {},
    body: { version },
    query: {},
  }),
})

export type CreateEventStore = ExtractSchemaTypes<typeof CreateEventStoreSchema>

/* CloneEventStore */

export const CloneEventStoreSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/clone',
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
      assetsBucketName: t.string,
      eventStoreId: t.string,
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

/* ImportEventStore */

export const ImportEventStoreSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/import',
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
  Path: '/event-stores/:eventStoreId/export',
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
  Path: '/event-stores/:eventStoreId/import',
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
      eventsPartCount: t.string,
      secretsPartCount: t.string,
    }),
  }),
  Result: t.type({
    eventsImportUrls: t.array(t.string),
    secretsImportUrls: t.array(t.string),
  }),
  ArgumentsTransformer: ({ eventStoreId, eventsPartCount, secretsPartCount }) => ({
    params: { eventStoreId },
    body: {},
    query: { eventsPartCount, secretsPartCount },
  }),
})

export type GetImportUrls = ExtractSchemaTypes<typeof GetImportUrlsSchema>

/* GetExportUrls */

export const GetExportUrlsSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/export',
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

/* UploadEventsToS3 */

const UploadEventsToS3EventSchema = t.type({
  name: t.literal(FactoryEventNames.uploadEventsToS3),
  payload: t.intersection([
    t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreId: t.string,
      eventStoreClusterEndpoint: t.string,
      eventStoreClusterPort: t.number,
      bucketName: t.string,
      databaseName: t.string,
    }),
    t.partial({
      cursor: t.union([t.string, t.null]),
      uploadId: t.union([t.string, t.null]),
      parts: t.array(t.any),
      partNumber: t.number,
      done: t.boolean,
    }),
  ]),
})

export const UploadEventsToS3Schema = defineSchema({
  Event: UploadEventsToS3EventSchema,
  Result: UploadEventsToS3EventSchema,
})

export type UploadEventsToS3 = ExtractSchemaTypes<typeof UploadEventsToS3Schema>

/* ClearEventStore */

export const ClearEventStoreSchema = defineSchema({
  Path: '/event-stores/:eventStoreId/clear',
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
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
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
  Path: '/event-stores/:eventStoreId/freeze',
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
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
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
  Path: '/event-stores/:eventStoreId/unfreeze',
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
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
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

/* DropEventStore */

export const DropEventStoreSchema = defineSchema({
  Path: '/event-stores/:eventStoreId',
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
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
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

/* ListEventStores */

export const ListEventStoresSchema = defineSchema({
  Path: '/event-stores',
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

/* GetEventStore */

export const GetEventStoreSchema = defineSchema({
  Path: '/event-stores/:eventStoreId',
  Method: 'GET',
  Mode: 'ASYNC',
  Params: t.type({ eventStoreId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getEventStore),
    payload: t.type({
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
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

/* DescribeEventStore */

export const DescribeEventStoreSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.describeEventStore),
    payload: t.type({
      version: t.string,
      user: RDSUserSchema,
      eventStoreClusterArn: t.string,
      postgresAdminSecretArn: t.string,
      eventStoreId: t.string,
    }),
  }),
  Result: t.type({
    events: t.union([t.number, t.null]),
    secrets: t.union([t.number, t.null]),
    modifiedAt: t.union([t.number, t.null]),
    createdAt: t.union([t.number, t.null]),
    isFrozen: t.boolean,
  }),
})

export type DescribeEventStore = ExtractSchemaTypes<typeof DescribeEventStoreSchema>
