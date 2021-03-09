import * as t from 'io-ts'

import {
  LinkDeploymentEventSchema,
  UnlinkDeploymentEventSchema,
} from './commands/deployments/event-stores'

import {
  CreateReadModelEventSchema,
  DropReadModelEventSchema,
  ListReadModelsEventSchema,
  PauseReadModelEventSchema,
  ResetReadModelEventSchema,
  ResumeReadModelEventSchema,
} from './commands/deployments/read-models'

import {
  PauseSagaEventSchema,
  ResetSagaEventSchema,
  ResumeSagaEventSchema,
  ListSagasEventSchema,
  SetSagaPropertyEventSchema,
  GetSagaPropertyEventSchema,
  DeleteSagaPropertyEventSchema,
  ListSagaPropertiesEventSchema,
} from './commands/deployments/sagas'

/* Deployments */
import {
  DescribeDeploymentEvent,
  ListDeploymentsEvent,
  CreateDeploymentEvent,
  GetDeploymentUploadSignedUrlEvent,
  GetDeploymentByApplicationNameEvent,
  GetDeploymentByTagEvent,
  DropDeploymentEvent,
  BuildDeploymentEvent,
  BootstrapDeploymentEventSchema,
  ShutdownDeploymentEventSchema,
  SetDeploymentDomainEvent,
  UnsetDeploymentDomainEvent,
  SetDeploymentTagEvent,
  UnsetDeploymentTagEvent,
} from './commands/deployments/lifecycle'

/* Event stores */
import {
  CreateEventStoreEventSchema,
  DropEventStoreEventSchema,
  ListEventStoresEvent,
  GetEventStoreEvent,
} from './commands/event-stores'

/* Envs */
import {
  UpdateEnvironmentVariablesEvent,
  ListEnvironmentVariablesEvent,
} from './commands/deployments/envs'

/* Cognito */
import {
  AttachClientAppUrlsEvent,
  DetachClientAppUrlsEvent,
  GetUserEvent,
  GetUserIdByEmailEvent,
  CreateUserEvent,
  DropUserEvent,
  ListUsersEvent,
} from './commands/cognito'

/* Domains */
import {
  CreateDomainEvent,
  DropDomainEvent,
  GetDomainEvent,
  ListDomainsEvent,
  /* Domain users */
  AddDomainUserEvent,
  RemoveDomainUserEvent,
  SetDomainUsersEvent,
  /* Domain verify */
  VerifyDomainEvent,
  GetVerificationCodeEvent,
  /* Domain Virtual hosts */
  SetVirtualHostEvent,
  UnsetVirtualHostEvent,
  ListVirtualHostsEvent,
} from './commands/domains'

/* DNS */
import { CreateDnsRecordEvent, DeleteDnsRecordEvent, ListDnsRecordsEvent } from './commands/dns'

/* Tracing */
import {
  EnableTracingEvent,
  DisableTracingEvent,
  GetSummariesEvent,
  GetTraceEvent,
  GetTracingStatusEvent,
} from './commands/deployments/tracing'

/* Logs */
import { EnableLogsEvent, DisableLogsEvent, GetLogsEvent } from './commands/deployments/logs'

/* Certificates */
import {
  EnsureCertificateEvent,
  DropCertificateEvent,
  GetCertificateByIdEvent,
  ListCertificatesEvent,
  GetCertificateByDomainNameEvent,
} from './commands/certificates'

/* Install / Uninstall  */
import {
  InstallStageResourcesEvent,
  UninstallStageResourcesEvent,
} from './commands/stage-resources'

import {
  InstallAssetsBucketEvent,
  InstallVersionResourcesEvent,
  UninstallAssetsBucketEvent,
  UninstallVersionAssetsFolderEvent,
  UninstallVersionResourcesEvent,
  GetAssetsStageBucketUploadSignedUrlsEvent,
  GetAssetsVersionBucketUploadSignedUrlsEvent,
} from './commands/version-resources'

import {
  GetClientAppConfigEvent,
  DescribeEvent,
  ListVersionsEvent,
  EnsureRdsUserEvent,
  ExecuteFactoryEvent,
  DescribeExecutionEvent,
} from './commands/cloud'

export type InstallerLambdaEvent =
  | GetClientAppConfigEvent
  | InstallStageResourcesEvent
  | UninstallStageResourcesEvent
  | InstallVersionResourcesEvent
  | UninstallVersionResourcesEvent
  | UninstallVersionAssetsFolderEvent
  | InstallAssetsBucketEvent
  | UninstallAssetsBucketEvent
  | GetAssetsStageBucketUploadSignedUrlsEvent
  | GetAssetsVersionBucketUploadSignedUrlsEvent
  | DescribeEvent
  | EnsureCertificateEvent
  | DropCertificateEvent
  | GetCertificateByIdEvent
  | GetCertificateByDomainNameEvent
  | ListCertificatesEvent
  | CreateDomainEvent
  | DropDomainEvent
  | ListDomainsEvent
  | VerifyDomainEvent
  | GetVerificationCodeEvent
  | GetDomainEvent
  | CreateUserEvent
  | DropUserEvent
  | GetUserEvent
  | GetUserIdByEmailEvent
  | ListUsersEvent
  | AttachClientAppUrlsEvent
  | DetachClientAppUrlsEvent
  | ExecuteFactoryEvent
  | SetVirtualHostEvent
  | UnsetVirtualHostEvent
  | ListVirtualHostsEvent
  | EnableLogsEvent
  | DisableLogsEvent
  | GetLogsEvent
  | UpdateEnvironmentVariablesEvent
  | ListEnvironmentVariablesEvent
  | EnableTracingEvent
  | DisableTracingEvent
  | GetTraceEvent
  | GetSummariesEvent
  | GetTracingStatusEvent
  | DescribeDeploymentEvent
  | ListDeploymentsEvent
  | CreateDeploymentEvent
  | GetDeploymentUploadSignedUrlEvent
  | SetDeploymentDomainEvent
  | UnsetDeploymentDomainEvent
  | BuildDeploymentEvent
  | DropDeploymentEvent
  | GetDeploymentByApplicationNameEvent
  | GetDeploymentByTagEvent
  | ListEventStoresEvent
  | GetEventStoreEvent
  | EnsureRdsUserEvent
  | SetDomainUsersEvent
  | AddDomainUserEvent
  | RemoveDomainUserEvent
  | ListVersionsEvent
  | CreateDnsRecordEvent
  | DeleteDnsRecordEvent
  | ListDnsRecordsEvent
  | SetDeploymentTagEvent
  | UnsetDeploymentTagEvent
  | DescribeExecutionEvent

export const FactoryLambdaEventSchema = t.union([
  CreateEventStoreEventSchema,
  DropEventStoreEventSchema,
  LinkDeploymentEventSchema,
  UnlinkDeploymentEventSchema,
  CreateReadModelEventSchema,
  DropReadModelEventSchema,
  ListReadModelsEventSchema,
  PauseReadModelEventSchema,
  ResetReadModelEventSchema,
  ResumeReadModelEventSchema,
  ListSagasEventSchema,
  PauseSagaEventSchema,
  ResetSagaEventSchema,
  ResumeSagaEventSchema,
  ListSagaPropertiesEventSchema,
  GetSagaPropertyEventSchema,
  DeleteSagaPropertyEventSchema,
  SetSagaPropertyEventSchema,
  BootstrapDeploymentEventSchema,
  ShutdownDeploymentEventSchema,
])

export type FactoryLambdaEvent = t.TypeOf<typeof FactoryLambdaEventSchema>
