import {
  CreateReadModel,
  DropReadModel,
  ListReadModels,
  PauseReadModel,
  ResetReadModel,
  ResumeReadModel,
} from './api/v0/deployments/read-models'

import { PauseSaga, ResetSaga, ResumeSaga, ListSagas } from './api/v0/deployments/sagas'

import {
  SetSagaProperty,
  GetSagaProperty,
  DeleteSagaProperty,
  ListSagaProperties,
} from './api/v0/deployments/saga-properties'

/* Auth */
import { AuthAuthWhoAmI, AuthLogin, AuthLogout, AuthRefreshToken } from './api/v0/auth'

/* Deployments */
import {
  DescribeDeployment,
  ListDeployments,
  CreateDeployment,
  GetDeploymentUploadSignedUrl,
  DropDeployment,
  BuildDeployment,
  BootstrapDeployment,
  ShutdownDeployment,
} from './api/v0/deployments/lifecycle'

/* Domains */
import { SetDeploymentDomain, UnsetDeploymentDomain } from './api/v0/deployments/domains'

/* Event stores */
import {
  CloneEventStore,
  CreateEventStore,
  DropEventStore,
  ListEventStores,
  GetEventStore,
  ImportEventStore,
  ExportEventStore,
  GetImportUrls,
  GetExportUrls,
  ClearEventStore,
  FreezeEventStore,
  UnfreezeEventStore,
  LinkDeployment,
  UnlinkDeployment,
} from './api/v0/event-stores'

import { DescribeEventStore, UploadEventsToS3 } from './api/event-stores'

/* Envs */
import { UpdateEnvironmentVariables } from './api/envs'
import { ListEnvironmentVariables } from './api/v0/deployments/envs'

/* Cognito */
import {
  AttachClientAppUrls,
  DetachClientAppUrls,
  GetUser,
  GetUserIdByEmail,
  CreateUser,
  DropUser,
  ListUsers,
} from './api/cognito'

/* Domains */
import {
  CreateDomain,
  DropDomain,
  ListDomains,
  ReleaseDomain,
  /* Domain verify */
  VerifyDomain,
  GetVerificationCode,
} from './api/v0/domains'

import { GetDomain } from './api/domains'

/* Domain users */
import { AddDomainUser, RemoveDomainUser, SetDomainUsers } from './api/domain-users'

/* Domain Virtual hosts */
import { SetVirtualHost, UnsetVirtualHost, ListVirtualHosts } from './api/domain-virtual-hosts'

/* DNS */
import { CreateDnsRecord, DeleteDnsRecord, ListDnsRecords } from './api/dns'

/* Tracing */
import {
  EnableTracing,
  DisableTracing,
  GetSummaries,
  GetTracingDetails,
  GetTracingStatus,
} from './api/v0/deployments/tracing'

/* Logs */
import { EnableLogs, DisableLogs, GetLogs, RemoveLogs } from './api/v0/deployments/logs'

/* Certificates */
import { EnsureCertificate, DropCertificate, ListCertificates } from './api/v0/certificates'

import { GetCertificateById, GetCertificateByDomainName } from './api/certificates'

/* Install / Uninstall  */
import { InstallStageResources, UninstallStageResources } from './api/stage-resources'

import {
  InstallAssetsBucket,
  InstallVersionResources,
  UninstallAssetsBucket,
  UninstallVersionAssetsFolder,
  UninstallVersionResources,
  GetAssetsStageBucketUploadSignedUrls,
  GetAssetsVersionBucketUploadSignedUrls,
} from './api/version-resources'

import { GetClientAppConfig, ListVersions, DescribeExecution } from './api/v0/cloud'

import { DescribeRDSClusters, EnsureRdsUser } from './api/rds'

// TODO remove
export type InstallerLambdaEvent =
  | AuthLogin['Event']
  | AuthLogout['Event']
  | AuthRefreshToken['Event']
  | AuthAuthWhoAmI['Event']
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
