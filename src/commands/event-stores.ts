import * as t from 'io-ts'
import { InstallerEventNames, FactoryEventNames } from '../constants'
import { RDSUserSchema } from '../schemas'

/* CreateEventStore */

export const CreateEventStoreEventSchema = t.type({
  name: t.literal(FactoryEventNames.createEventStore),
  payload: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    postgresAdminSecretArn: t.string,
    assetsBucketName: t.string,
  }),
})

export type CreateEventStoreEvent = t.TypeOf<typeof CreateEventStoreEventSchema>

export const CreateEventStoreResultSchema = t.type({
  eventStoreId: t.string,
  eventStoreDatabaseName: t.string,
  eventBusLambdaArn: t.string,
})

export type CreateEventStoreResult = t.TypeOf<typeof CreateEventStoreResultSchema>

/* CloneEventStore */

export const CloneEventStoreEventSchema = t.type({
  name: t.literal(FactoryEventNames.cloneEventStore),
  payload: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    postgresAdminSecretArn: t.string,
    assetsBucketName: t.string,
    eventStoreId: t.string,
  }),
})

export type CloneEventStoreEvent = t.TypeOf<typeof CloneEventStoreEventSchema>

export const CloneEventStoreResultSchema = t.type({
  eventStoreId: t.string,
  eventStoreDatabaseName: t.string,
  eventBusLambdaArn: t.string,
})

export type CloneEventStoreResult = t.TypeOf<typeof CloneEventStoreResultSchema>

/* DropEventStore */

export const DropEventStoreEventSchema = t.type({
  name: t.literal(FactoryEventNames.dropEventStore),
  payload: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    postgresAdminSecretArn: t.string,
    eventStoreId: t.string,
  }),
})

export type DropEventStoreEvent = t.TypeOf<typeof DropEventStoreEventSchema>

export const DropEventStoreResultSchema = t.void

export type DropEventStoreResult = t.TypeOf<typeof DropEventStoreResultSchema>

/* DescribeEventStore */

export const DescribeEventStoreEventSchema = t.type({
  name: t.literal(FactoryEventNames.describeEventStore),
  payload: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    postgresAdminSecretArn: t.string,
    eventStoreId: t.string,
  }),
})

export type DescribeEventStoreEvent = t.TypeOf<typeof DescribeEventStoreEventSchema>

export const DescribeEventStoreResultSchema = t.type({
  events: t.union([t.number, t.null]),
  secrets: t.union([t.number, t.null]),
  modifiedAt: t.union([t.number, t.null]),
  createdAt: t.union([t.number, t.null]),
  isFrozen: t.boolean,
})

export type DescribeEventStoreResult = t.TypeOf<typeof DescribeEventStoreResultSchema>

/* ListEventStores */

export const ListEventStoresEventSchema = t.type({
  name: t.literal(InstallerEventNames.listEventStores),
  payload: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    postgresAdminSecretArn: t.string,
  }),
})

export type ListEventStoresEvent = t.TypeOf<typeof ListEventStoresEventSchema>

export const ListEventStoresResultSchema = t.array(
  t.type({
    eventStoreId: t.string,
    version: t.string,
    linkedDeployments: t.array(t.string),
    eventStoreDatabaseName: t.string,
    eventBusLambdaArn: t.string,
    events: t.union([t.number, t.null]),
    secrets: t.union([t.number, t.null]),
    modifiedAt: t.union([t.number, t.null]),
    createdAt: t.union([t.number, t.null]),
    isFrozen: t.union([t.boolean, t.null]),
  })
)

export type ListEventStoresResult = t.TypeOf<typeof ListEventStoresResultSchema>

/* GetEventStore */

export const GetEventStoreEventSchema = t.type({
  name: t.literal(InstallerEventNames.getEventStore),
  payload: t.type({
    userId: t.string,
    eventStoreId: t.string,
  }),
})

export type GetEventStoreEvent = t.TypeOf<typeof GetEventStoreEventSchema>

export const GetEventStoreResultSchema = t.type({
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
})

export type GetEventStoreResult = t.TypeOf<typeof GetEventStoreResultSchema>
