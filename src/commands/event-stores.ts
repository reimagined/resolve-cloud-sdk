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

export const CreateEventStoreResultSchema = t.type({})

export type CreateEventStoreResult = t.TypeOf<typeof CreateEventStoreResultSchema>

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

export const DropEventStoreResultSchema = t.type({})

export type DropEventStoreResult = t.TypeOf<typeof DropEventStoreResultSchema>

/* ListEventStores */

export const ListEventStoresEventSchema = t.type({
  name: t.literal(InstallerEventNames.listEventStores),
  payload: t.type({
    userId: t.string,
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
    eventBusDatabaseName: t.string,
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
