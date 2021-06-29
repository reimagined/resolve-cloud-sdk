import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'

/* RDS Clusters */

export const DescribeRDSClustersEventSchema = t.type({
  name: t.literal(InstallerEventNames.describeRDSClusters),
  payload: t.UnknownRecord,
})

export type DescribeRDSClustersEvent = t.TypeOf<typeof DescribeRDSClustersEventSchema>

export const DescribeRDSClustersResultSchema = t.type({
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
})

export type DescribeRDSClustersResult = t.TypeOf<typeof DescribeRDSClustersResultSchema>
