import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes, RDSUserSchema } from '../schemas'

/* RDS Clusters */

export const DescribeRDSClustersSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.describeRDSClusters),
    payload: t.UnknownRecord,
  }),
  Result: t.type({
    eventStoreClusterArn: t.union([t.string, t.null]),
    eventStoreClusterEndpoint: t.union([t.string, t.null]),
    eventStoreClusterPort: t.union([t.number, t.null]),
    readModelsClusterArn: t.union([t.string, t.null]),
    readModelsClusterEndpoint: t.union([t.string, t.null]),
    readModelsClusterPort: t.union([t.number, t.null]),
    systemClusterArn: t.union([t.string, t.null]),
    postgresAdminUsername: t.string,
    postgresAdminPassword: t.string,
    postgresAdminSecretName: t.string,
    postgresAdminSecretArn: t.string,
    systemDatabaseName: t.string,
  }),
})

export type DescribeRDSClusters = ExtractSchemaTypes<typeof DescribeRDSClustersSchema>

/* EnsureRdsUser */

export const EnsureRdsUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.ensureRdsUser),
    payload: t.type({
      userId: t.string,
    }),
  }),
  Result: t.type({
    user: RDSUserSchema,
    eventStoreClusterArn: t.string,
    eventStoreClusterEndpoint: t.string,
    eventStoreClusterPort: t.number,
    readModelsClusterArn: t.string,
    readModelsClusterEndpoint: t.string,
    readModelsClusterPort: t.number,
    postgresAdminPassword: t.string,
    postgresAdminSecretArn: t.string,
    postgresAdminSecretName: t.string,
    postgresAdminUsername: t.string,
  }),
})

export type EnsureRdsUser = ExtractSchemaTypes<typeof EnsureRdsUserSchema>
