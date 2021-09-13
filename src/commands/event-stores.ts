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
