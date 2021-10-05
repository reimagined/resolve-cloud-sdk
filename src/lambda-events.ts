import { LinkDeployment, UnlinkDeployment } from './commands/deployments/event-stores'

import {
  CreateReadModel,
  DropReadModel,
  ListReadModels,
  PauseReadModel,
  ResetReadModel,
  ResumeReadModel,
} from './commands/deployments/read-models'

import {
  PauseSaga,
  ResetSaga,
  ResumeSaga,
  ListSagas,
  SetSagaProperty,
  GetSagaProperty,
  DeleteSagaProperty,
  ListSagaProperties,
} from './commands/deployments/sagas'

/* Deployments */
import {
  DescribeDeployment,
  ListDeployments,
  CreateDeployment,
  GetDeploymentUploadSignedUrl,
  GetDeploymentByApplicationName,
  GetDeploymentByTag,
  DropDeployment,
  BuildDeployment,
  BootstrapDeployment,
  ShutdownDeployment,
  SetDeploymentDomain,
  UnsetDeploymentDomain,
  SetDeploymentTag,
  UnsetDeploymentTag,
} from './commands/deployments/lifecycle'

/* Event stores */
import {
  CloneEventStore,
  CreateEventStore,
  DropEventStore,
  DescribeEventStore,
  ListEventStores,
  GetEventStore,
  ImportEventStore,
  ExportEventStore,
  GetImportUrls,
  GetExportUrls,
  UploadEventsToS3,
  ClearEventStore,
  FreezeEventStore,
  UnfreezeEventStore,
} from './commands/event-stores'

/* Envs */
import { UpdateEnvironmentVariables, ListEnvironmentVariables } from './commands/deployments/envs'

/* Cognito */
import {
  AttachClientAppUrls,
  DetachClientAppUrls,
  GetUser,
  GetUserIdByEmail,
  CreateUser,
  DropUser,
  ListUsers,
} from './commands/cognito'

/* Domains */
import {
  CreateDomain,
  DropDomain,
  GetDomain,
  ListDomains,
  ReleaseDomain,
  /* Domain users */
  AddDomainUser,
  RemoveDomainUser,
  SetDomainUsers,
  /* Domain verify */
  VerifyDomain,
  GetVerificationCode,
  /* Domain Virtual hosts */
  SetVirtualHost,
  UnsetVirtualHost,
  ListVirtualHosts,
} from './commands/domains'

/* DNS */
import { CreateDnsRecord, DeleteDnsRecord, ListDnsRecords } from './commands/dns'

/* Tracing */
import {
  EnableTracing,
  DisableTracing,
  GetSummaries,
  GetTracingDetails,
  GetTracingStatus,
} from './commands/deployments/tracing'

/* Logs */
import { EnableLogs, DisableLogs, GetLogs, RemoveLogs } from './commands/deployments/logs'

/* Certificates */
import {
  EnsureCertificate,
  DropCertificate,
  GetCertificateById,
  ListCertificates,
  GetCertificateByDomainName,
} from './commands/certificates'

/* Install / Uninstall  */
import { InstallStageResources, UninstallStageResources } from './commands/stage-resources'

import {
  InstallAssetsBucket,
  InstallVersionResources,
  UninstallAssetsBucket,
  UninstallVersionAssetsFolder,
  UninstallVersionResources,
  GetAssetsStageBucketUploadSignedUrls,
  GetAssetsVersionBucketUploadSignedUrls,
} from './commands/version-resources'

import {
  GetClientAppConfig,
  Describe,
  ListVersions,
  EnsureRdsUser,
  DescribeExecution,
} from './commands/cloud'

import { DescribeRDSClusters } from './commands/rds'

export type InstallerLambdaEvent =
  | GetClientAppConfig['Event']
  | InstallStageResources['Event']
  | UninstallStageResources['Event']
  | InstallVersionResources['Event']
  | UninstallVersionResources['Event']
  | UninstallVersionAssetsFolder['Event']
  | InstallAssetsBucket['Event']
  | UninstallAssetsBucket['Event']
  | GetAssetsStageBucketUploadSignedUrls['Event']
  | GetAssetsVersionBucketUploadSignedUrls['Event']
  | Describe['Event']
  | EnsureCertificate['Event']
  | DropCertificate['Event']
  | GetCertificateById['Event']
  | GetCertificateByDomainName['Event']
  | ListCertificates['Event']
  | CreateDomain['Event']
  | DropDomain['Event']
  | ListDomains['Event']
  | VerifyDomain['Event']
  | GetVerificationCode['Event']
  | GetDomain['Event']
  | ReleaseDomain['Event']
  | CreateUser['Event']
  | DropUser['Event']
  | GetUser['Event']
  | GetUserIdByEmail['Event']
  | ListUsers['Event']
  | AttachClientAppUrls['Event']
  | DetachClientAppUrls['Event']
  | SetVirtualHost['Event']
  | UnsetVirtualHost['Event']
  | ListVirtualHosts['Event']
  | EnableLogs['Event']
  | DisableLogs['Event']
  | GetLogs['Event']
  | RemoveLogs['Event']
  | UpdateEnvironmentVariables['Event']
  | ListEnvironmentVariables['Event']
  | EnableTracing['Event']
  | DisableTracing['Event']
  | GetTracingDetails['Event']
  | GetSummaries['Event']
  | GetTracingStatus['Event']
  | DescribeDeployment['Event']
  | ListDeployments['Event']
  | CreateDeployment['Event']
  | GetDeploymentUploadSignedUrl['Event']
  | SetDeploymentDomain['Event']
  | UnsetDeploymentDomain['Event']
  | BuildDeployment['Event']
  | DropDeployment['Event']
  | GetDeploymentByApplicationName['Event']
  | GetDeploymentByTag['Event']
  | ListEventStores['Event']
  | GetEventStore['Event']
  | EnsureRdsUser['Event']
  | SetDomainUsers['Event']
  | AddDomainUser['Event']
  | RemoveDomainUser['Event']
  | ListVersions['Event']
  | CreateDnsRecord['Event']
  | DeleteDnsRecord['Event']
  | ListDnsRecords['Event']
  | SetDeploymentTag['Event']
  | UnsetDeploymentTag['Event']
  | DescribeExecution['Event']
  | DescribeRDSClusters['Event']
  /* Factory */
  | DescribeEventStore['Event']
  | CreateEventStore['Event']
  | DropEventStore['Event']
  | CloneEventStore['Event']
  | LinkDeployment['Event']
  | UnlinkDeployment['Event']
  | CreateReadModel['Event']
  | DropReadModel['Event']
  | ListReadModels['Event']
  | PauseReadModel['Event']
  | ResetReadModel['Event']
  | ResumeReadModel['Event']
  | ListSagas['Event']
  | PauseSaga['Event']
  | ResetSaga['Event']
  | ResumeSaga['Event']
  | ListSagaProperties['Event']
  | GetSagaProperty['Event']
  | DeleteSagaProperty['Event']
  | SetSagaProperty['Event']
  | BootstrapDeployment['Event']
  | ShutdownDeployment['Event']
  | ImportEventStore['Event']
  | ExportEventStore['Event']
  | GetImportUrls['Event']
  | GetExportUrls['Event']
  | UploadEventsToS3['Event']
  | ClearEventStore['Event']
  | FreezeEventStore['Event']
  | UnfreezeEventStore['Event']
