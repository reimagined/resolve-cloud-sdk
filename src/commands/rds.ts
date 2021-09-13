import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

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
