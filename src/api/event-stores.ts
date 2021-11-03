import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../schemas'
import { FactoryEventNames } from '../constants'

/* DescribeEventStore */

export const DescribeEventStoreSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.describeEventStore),
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
  Result: t.type({
    events: t.union([t.number, t.null]),
    secrets: t.union([t.number, t.null]),
    modifiedAt: t.union([t.number, t.null]),
    createdAt: t.union([t.number, t.null]),
    isFrozen: t.union([t.boolean, t.null]),
  }),
})

export type DescribeEventStore = ExtractSchemaTypes<typeof DescribeEventStoreSchema>

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
