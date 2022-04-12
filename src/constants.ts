export const STAGE_TAG_NAME = 'resolve-stage'
export const VERSION_TAG_NAME = 'resolve-version'
export const RESOURCE_TAG_NAME = 'resolve-resource'
export const MANAGER_TAG_NAME = 'resolve-manager'
export const DOMAIN_TYPE_TAG_NAME = 'resolve-domain-type'
export const DOMAIN_CUSTOM_NAME_TAG_NAME = 'resolve-domain-custom-name'
export const DOMAIN_NAME_TAG_NAME = 'resolve-domain-name'
export const CERTIFICATE_ID_TAG_NAME = 'resolve-certificate-id'
export const USER_ID_TAG_NAME = 'resolve-user-id'
export const DOMAIN_USERS_TAG_NAME = 'resolve-users'
export const EVENT_STORE_ID_TAG_NAME = 'resolve-event-store-id'
export const LINKED_DEPLOYMENTS_TAG_NAME = 'resolve-linked-deployments'
export const DEPLOYMENT_ID_TAG_NAME = 'resolve-deployment-id'
export const APPLICATION_NAME_TAG_NAME = 'resolve-application-name'
export const RDS_CLUSTER_NAME_TAG_NAME = 'resolve-rds-cluster-name'
export const DEPLOYMENT_TAG_TAG_NAME = 'resolve-deployment-tag'
export const CREATED_AT_TAG_NAME = 'resolve-created-at'

export const EDGE_REGION = 'us-east-1'

export const EVENT_STORE_DATABASE_NAME = 'event-store'
export const READ_MODELS_DATABASE_NAME = 'read-models'
export const SYSTEM_DATABASE_NAME = 'system'

export const CONNECTIONS_TABLE_NAME = 'connections'
export const SUBSCRIPTIONS_TABLE_NAME = 'subscriptions'
export const PATTERNS_TABLE_NAME = 'patterns'
export const NOTIFICATIONS_TABLE_NAME = 'notifications'
export const SUBSCRIBERS_TABLE_NAME = 'subscribers'
export const BATCHES_TABLE_NAME = 'batches'

export const SERIAL_SQL_TYPE = 'serial'
export const LONG_INTEGER_SQL_TYPE = 'bigint'
export const JSON_SQL_TYPE = 'jsonb'
export const STRING_SQL_TYPE = 'VARCHAR(100)'
export const TEXT_SQL_TYPE = 'TEXT'

export const HEADER_EXECUTION_MODE = 'x-resolve-execution-mode'

export enum DomainCustomNames {
  DEPLOYMENTS = 'deployments',
  SYSTEM = 'system',
  STATIC = 'static',
  UPLOADER = 'uploader',
}

export enum FactoryEventNames {
  /* EventStore */
  createEventStore = 'createEventStore',
  dropEventStore = 'dropEventStore',
  describeEventStore = 'describeEventStore',
  cloneEventStore = 'cloneEventStore',
  linkDeployment = 'linkDeployment',
  unlinkDeployment = 'unlinkDeployment',
  clearEventStore = 'clearEventStore',
  freezeEventStore = 'freezeEventStore',
  unfreezeEventStore = 'unfreezeEventStore',
  importEventStore = 'importEventStore',
  exportEventStore = 'exportEventStore',
  getImportUrls = 'getImportUrls',
  getExportUrls = 'getExportUrls',
  uploadEventsToS3 = 'uploadEventsToS3',
  /* ReadModel */
  createReadModel = 'createReadModel',
  dropReadModel = 'dropReadModel',
  listReadModels = 'listReadModels',
  pauseReadModel = 'pauseReadModel',
  resetReadModel = 'resetReadModel',
  resumeReadModel = 'resumeReadModel',
  /* Saga */
  listSagas = 'listSagas',
  pauseSaga = 'pauseSaga',
  resetSaga = 'resetSaga',
  resumeSaga = 'resumeSaga',
  listSagaProperties = 'listSagaProperties',
  setSagaProperty = 'setSagaProperty',
  deleteSagaProperty = 'deleteSagaProperty',
  getSagaProperty = 'getSagaProperty',
  /* Lifecycle */
  bootstrapDeployment = 'bootstrapDeployment',
  shutdownDeployment = 'shutdownDeployment',
  dropEventSubscribers = 'dropEventSubscribers',
}

export enum BuilderEventNames {
  buildCode = 'buildCode',
  deployStatic = 'deployStatic',
}

export enum InstallerEventNames {
  heartbeat = 'heartbeat',
  authLogin = 'authLogin',
  authLogout = 'authLogout',
  authRefreshToken = 'authRefreshToken',
  authWhoAmI = 'authWhoAmI',
  installStageResources = 'installStageResources',
  uninstallStageResources = 'uninstallStageResources',
  installVersionResources = 'installVersionResources',
  uninstallVersionResources = 'uninstallVersionResources',
  uninstallVersionAssetsFolder = 'uninstallVersionAssetsFolder',
  installAssetsBucket = 'installAssetsBucket',
  uninstallAssetsBucket = 'uninstallAssetsBucket',
  getAssetsStageBucketUploadSignedUrls = 'getAssetsStageBucketUploadSignedUrls',
  getAssetsVersionBucketUploadSignedUrls = 'getAssetsVersionBucketUploadSignedUrls',
  describe = 'describe',
  describeExecution = 'describeExecution',
  ensureCertificate = 'ensureCertificate',
  dropCertificate = 'dropCertificate',
  getCertificateById = 'getCertificateById',
  listCertificates = 'listCertificates',
  getCertificateByDomainName = 'getCertificateByDomainName',
  createStaticDomain = 'createStaticDomain',
  createProxyDomain = 'createProxyDomain',
  createUploaderDomain = 'createUploaderDomain',
  dropDomain = 'dropDomain',
  setDomainUsers = 'setDomainUsers',
  addDomainUser = 'addDomainUser',
  removeDomainUser = 'removeDomainUser',
  releaseDomain = 'releaseDomain',
  getDomain = 'getDomain',
  listDomains = 'listDomains',
  verifyDomain = 'verifyDomain',
  getVerificationCode = 'getVerificationCode',
  createUser = 'createUser',
  dropUser = 'dropUser',
  getUser = 'getUser',
  getUserIdByEmail = 'getUserIdByEmail',
  listUsers = 'listUsers',
  attachClientAppUrls = 'attachClientAppUrls',
  detachClientAppUrls = 'detachClientAppUrls',
  executeFactory = 'executeFactory',
  setVirtualHost = 'setVirtualHost',
  unsetVirtualHost = 'unsetVirtualHost',
  listVirtualHosts = 'listVirtualHosts',
  getClientAppConfig = 'getClientAppConfig',
  enableLogs = 'enableLogs',
  disableLogs = 'disableLogs',
  getLogs = 'getLogs',
  removeLogs = 'removeLogs',
  updateEnvironmentVariables = 'updateEnvironmentVariables',
  listEnvironmentVariables = 'listEnvironmentVariables',
  enableTracing = 'enableTracing',
  disableTracing = 'disableTracing',
  getTracingDetails = 'getTracingDetails',
  getSummaries = 'getSummaries',
  getTracingStatus = 'getTracingStatus',
  describeDeployment = 'describeDeployment',
  listDeployments = 'listDeployments',
  createDeployment = 'createDeployment',
  getDeploymentUploadSignedUrl = 'getDeploymentUploadSignedUrl',
  buildDeployment = 'buildDeployment',
  dropDeployment = 'dropDeployment',
  getDeploymentByApplicationName = 'getDeploymentByApplicationName',
  getDeploymentByTag = 'getDeploymentByTag',
  setDeploymentDomain = 'setDeploymentDomain',
  unsetDeploymentDomain = 'unsetDeploymentDomain',
  listEventStores = 'listEventStores',
  ensureRdsUser = 'ensureRdsUser',
  listVersions = 'listVersions',
  createDnsRecord = 'createDnsRecord',
  deleteDnsRecord = 'deleteDnsRecord',
  listDnsRecords = 'listDnsRecords',
  listHostedZones = 'listHostedZones',
  getEventStore = 'getEventStore',
  setDeploymentTag = 'setDeploymentTag',
  unsetDeploymentTag = 'unsetDeploymentTag',
  describeRDSClusters = 'describeRDSClusters',
  addNotificationsWebhook = 'addNotificationsWebhook',
  deleteNotificationsWebhook = 'deleteNotificationsWebhook',
  listNotificationsWebhooks = 'listNotificationsWebhooks',
  ensureRuntime = 'ensureRuntime',
  switchApplicationsRuntime = 'switchApplicationsRuntime',
  findRuntime = 'findRuntime',
}

export type RequestMode = 'SYNC' | 'ASYNC'
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
