import * as t from 'io-ts'

import {
  Heartbeat,
  HeartbeatSchema,
  GetClientAppConfigSchema,
  ListVersionsSchema,
} from './api/v0/cloud'

import {
  CreateDeploymentSchema,
  DropDeploymentSchema,
  DescribeDeploymentSchema,
  ListDeployments,
  ListDeploymentsSchema,
  BootstrapDeploymentSchema,
  ShutdownDeploymentSchema,
  BuildDeploymentSchema,
  GetDeploymentUploadSignedUrlSchema,
} from './api/v0/deployments/lifecycle'

import {
  SetDeploymentDomainSchema,
  UnsetDeploymentDomainSchema,
} from './api/v0/deployments/domains'

import {
  ListEnvironmentVariablesSchema,
  RemoveEnvironmentVariablesSchema,
  SetEnvironmentVariablesSchema,
} from './api/v0/deployments/envs'

import {
  DisableLogsSchema,
  EnableLogsSchema,
  GetLogsSchema,
  GetLogs,
  RemoveLogsSchema,
} from './api/v0/deployments/logs'

import {
  ListSagasSchema,
  PauseSagaSchema,
  ResetSagaSchema,
  ResumeSagaSchema,
} from './api/v0/deployments/sagas'

import {
  ListSagaPropertiesSchema,
  SetSagaPropertySchema,
  GetSagaPropertySchema,
  DeleteSagaPropertySchema,
} from './api/v0/deployments/saga-properties'

import {
  ListReadModelsSchema,
  PauseReadModelSchema,
  ResetReadModelSchema,
  ResumeReadModelSchema,
} from './api/v0/deployments/read-models'

import {
  GetTracingDetailsSchema,
  GetTracingStatusSchema,
  GetSummariesSchema,
  EnableTracingSchema,
  DisableTracingSchema,
} from './api/v0/deployments/tracing'

import {
  ListEventStoresSchema,
  CloneEventStoreSchema,
  CreateEventStoreSchema,
  DropEventStoreSchema,
  GetEventStoreSchema,
  ClearEventStoreSchema,
  FreezeEventStoreSchema,
  UnfreezeEventStoreSchema,
  ExportEventStoreSchema,
  ImportEventStoreSchema,
  GetExportUrlsSchema,
  GetImportUrlsSchema,
  GetImportUrls,
  LinkDeploymentSchema,
  UnlinkDeploymentSchema,
} from './api/v0/event-stores'

import {
  ListCertificatesSchema,
  DropCertificateSchema,
  EnsureCertificateSchema,
} from './api/v0/certificates'

import {
  CreateDomainSchema,
  DropDomainSchema,
  GetVerificationCodeSchema,
  ListDomainsSchema,
  VerifyDomainSchema,
  ReleaseDomainSchema,
  // SetDomainUsersSchema /* deprecated */,
  // AddDomainUserSchema /* deprecated */,
  // RemoveDomainUserSchema  /* deprecated */,
} from './api/v0/domains'

import { SetupOptions } from './cloud-sdk-setup-options'
import { validate } from './validate'
import request from './request'
import formatPath from './format-path'
import { RequestMethod, RequestMode } from './constants'
import { Deployment } from './schemas'
import { FatalError } from './fatal-error'

export const createCloudSdk = () => {
  let options: SetupOptions = {}

  const createCloudSDKMethod = <
    T extends {
      Event: t.Any
      Result: t.Any
      Path: string
      Method: RequestMethod
      Mode: RequestMode
      Params: t.Any
      Body: t.Any
      Query: t.Any
      ArgumentsTransformer: (args: any) => {
        params: any
        body: any
        query: any
      }
    }
  >(
    schema: T
  ) => {
    return async (
      args?: t.TypeOf<T['Params']> & t.TypeOf<T['Body']> & t.TypeOf<T['Query']>
    ): Promise<t.TypeOf<T['Result']>> => {
      const transformedArgs = schema.ArgumentsTransformer(args ?? {})

      const params = validate(schema.Params, transformedArgs.params)
      const query = validate(schema.Query, transformedArgs.query)
      const body = validate(schema.Body, transformedArgs.body)

      const result = await request({
        mode: schema.Mode,
        method: schema.Method,
        path: formatPath(schema.Path, params),
        body,
        query,
        ...options,
      })

      return result
    }
  }

  return {
    /* Setup */
    setup(params: SetupOptions) {
      options = params
    },

    /* System */
    async heartbeat(
      args: Heartbeat['Params'] & Heartbeat['Query'] & Heartbeat['Body'] = {}
    ): Promise<Heartbeat['Result']> {
      const params = validate(HeartbeatSchema.Params, {} as Heartbeat['Params'])
      const query = validate(HeartbeatSchema.Query, {} as Heartbeat['Query'])
      const body = validate(HeartbeatSchema.Body, {} as Heartbeat['Body'])

      await request({
        mode: HeartbeatSchema.Mode,
        method: HeartbeatSchema.Method,
        path: formatPath(HeartbeatSchema.Path, params),
        body,
        query,
        ...options,
      })
    },

    async getDeploymentByApplicationName(args: {
      applicationName: string
    }): Promise<Deployment | null> {
      const params = validate(ListDeploymentsSchema.Params, {} as ListDeployments['Params'])
      const query = validate(ListDeploymentsSchema.Query, {
        applicationName: args.applicationName,
      } as ListDeployments['Query'])
      const body = validate(ListDeploymentsSchema.Body, {} as ListDeployments['Body'])

      const deployments = await request({
        mode: ListDeploymentsSchema.Mode,
        method: ListDeploymentsSchema.Method,
        path: formatPath(ListDeploymentsSchema.Path, params),
        body,
        query,
        ...options,
      })

      if (deployments.length > 1) {
        throw new FatalError(`Duplicate applicationName = "${args.applicationName}"`)
      }

      const [deployment] = deployments

      return deployment ?? null
    },

    getClientAppConfig: createCloudSDKMethod(GetClientAppConfigSchema),
    listVersions: createCloudSDKMethod(ListVersionsSchema),
    /* Deployments */
    createDeployment: createCloudSDKMethod(CreateDeploymentSchema),
    dropDeployment: createCloudSDKMethod(DropDeploymentSchema),
    describeDeployment: createCloudSDKMethod(DescribeDeploymentSchema),
    // listDeployments: createCloudSDKMethod(ListDeploymentsSchema),
    async listDeployments(args = {}): Promise<ListDeployments['Result']> {
      void args

      const params = validate(ListDeploymentsSchema.Params, {} as ListDeployments['Params'])
      const query = validate(ListDeploymentsSchema.Query, {} as ListDeployments['Query'])
      const body = validate(ListDeploymentsSchema.Body, {} as ListDeployments['Body'])

      const result = await request({
        mode: ListDeploymentsSchema.Mode,
        method: ListDeploymentsSchema.Method,
        path: formatPath(ListDeploymentsSchema.Path, params),
        body,
        query,
        ...options,
      })

      return result
    },

    bootstrapDeployment: createCloudSDKMethod(BootstrapDeploymentSchema),
    shutdownDeployment: createCloudSDKMethod(ShutdownDeploymentSchema),
    buildDeployment: createCloudSDKMethod(BuildDeploymentSchema),
    getDeploymentUploadSignedUrl: createCloudSDKMethod(GetDeploymentUploadSignedUrlSchema),
    setDeploymentDomain: createCloudSDKMethod(SetDeploymentDomainSchema),
    unsetDeploymentDomain: createCloudSDKMethod(UnsetDeploymentDomainSchema),
    /* Link/unlink EventStore <-> Deployment */
    linkDeployment: createCloudSDKMethod(LinkDeploymentSchema),
    unlinkDeployment: createCloudSDKMethod(UnlinkDeploymentSchema),
    /* EnvironmentVariables */
    listEnvironmentVariables: createCloudSDKMethod(ListEnvironmentVariablesSchema),
    removeEnvironmentVariables: createCloudSDKMethod(RemoveEnvironmentVariablesSchema),
    setEnvironmentVariables: createCloudSDKMethod(SetEnvironmentVariablesSchema),
    /* Logs */
    disableLogs: createCloudSDKMethod(DisableLogsSchema),
    enableLogs: createCloudSDKMethod(EnableLogsSchema),
    // getLogs: createCloudSDKMethod(GetLogsSchema),
    async getLogs(args: {
      deploymentId: string
      streamLimit?: number
      startTime?: number
      endTime?: number
      filterPattern?: string
    }): Promise<GetLogs['Result']> {
      const params = validate(GetLogsSchema.Params, {
        deploymentId: args.deploymentId,
      } as GetLogs['Params'])
      const query = validate(GetLogsSchema.Query, {
        streamLimit: args.streamLimit == null ? args.streamLimit : undefined,
        startTime: args.startTime == null ? args.startTime : undefined,
        endTime: args.endTime == null ? args.endTime : undefined,
        filterPattern: args.filterPattern == null ? args.filterPattern : undefined,
      } as GetLogs['Query'])
      const body = validate(GetLogsSchema.Body, {} as GetLogs['Body'])

      const result = await request({
        mode: GetLogsSchema.Mode,
        method: GetLogsSchema.Method,
        path: formatPath(GetLogsSchema.Path, params),
        body,
        query,
        ...options,
      })

      return result
    },

    removeLogs: createCloudSDKMethod(RemoveLogsSchema),
    /* Sagas */
    listSagas: createCloudSDKMethod(ListSagasSchema),
    pauseSaga: createCloudSDKMethod(PauseSagaSchema),
    resetSaga: createCloudSDKMethod(ResetSagaSchema),
    resumeSaga: createCloudSDKMethod(ResumeSagaSchema),
    listSagaProperties: createCloudSDKMethod(ListSagaPropertiesSchema),
    setSagaProperty: createCloudSDKMethod(SetSagaPropertySchema),
    getSagaProperty: createCloudSDKMethod(GetSagaPropertySchema),
    deleteSagaProperty: createCloudSDKMethod(DeleteSagaPropertySchema),
    /* ReadModels */
    listReadModels: createCloudSDKMethod(ListReadModelsSchema),
    pauseReadModel: createCloudSDKMethod(PauseReadModelSchema),
    resetReadModel: createCloudSDKMethod(ResetReadModelSchema),
    resumeReadModel: createCloudSDKMethod(ResumeReadModelSchema),
    /* Tracing */
    getTracingDetails: createCloudSDKMethod(GetTracingDetailsSchema),
    getTracingStatus: createCloudSDKMethod(GetTracingStatusSchema),
    getSummaries: createCloudSDKMethod(GetSummariesSchema),
    enableTracing: createCloudSDKMethod(EnableTracingSchema),
    disableTracing: createCloudSDKMethod(DisableTracingSchema),
    /* EventStores */
    listEventStores: createCloudSDKMethod(ListEventStoresSchema),
    cloneEventStore: createCloudSDKMethod(CloneEventStoreSchema),
    createEventStore: createCloudSDKMethod(CreateEventStoreSchema),
    dropEventStore: createCloudSDKMethod(DropEventStoreSchema),
    getEventStore: createCloudSDKMethod(GetEventStoreSchema),
    clearEventStore: createCloudSDKMethod(ClearEventStoreSchema),
    freezeEventStore: createCloudSDKMethod(FreezeEventStoreSchema),
    unfreezeEventStore: createCloudSDKMethod(UnfreezeEventStoreSchema),
    exportEvents: createCloudSDKMethod(ExportEventStoreSchema),
    importEvents: createCloudSDKMethod(ImportEventStoreSchema),
    getExportUrls: createCloudSDKMethod(GetExportUrlsSchema),
    // getImportUrls: createCloudSDKMethod(GetImportUrlsSchema),
    async getImportUrls(args: {
      eventStoreId: string
      eventsPartCount: number
      secretsPartCount: number
    }): Promise<GetImportUrls['Result']> {
      const params = validate(GetImportUrlsSchema.Params, {
        eventStoreId: args.eventStoreId,
      } as GetImportUrls['Params'])
      const query = validate(GetImportUrlsSchema.Query, {
        eventsPartCount: `${args.eventsPartCount}`,
        secretsPartCount: `${args.secretsPartCount}`,
      } as GetImportUrls['Query'])
      const body = validate(GetImportUrlsSchema.Body, {} as GetImportUrls['Body'])

      const result = await request({
        mode: GetImportUrlsSchema.Mode,
        method: GetImportUrlsSchema.Method,
        path: formatPath(GetImportUrlsSchema.Path, params),
        body,
        query,
        ...options,
      })

      return result
    },

    /* Certificates */
    listCertificates: createCloudSDKMethod(ListCertificatesSchema),
    dropCertificate: createCloudSDKMethod(DropCertificateSchema),
    ensureCertificate: createCloudSDKMethod(EnsureCertificateSchema),
    /* Domains */
    createDomain: createCloudSDKMethod(CreateDomainSchema),
    dropDomain: createCloudSDKMethod(DropDomainSchema),
    getVerificationCode: createCloudSDKMethod(GetVerificationCodeSchema),
    listDomains: createCloudSDKMethod(ListDomainsSchema),
    verifyDomain: createCloudSDKMethod(VerifyDomainSchema),
    releaseDomain: createCloudSDKMethod(ReleaseDomainSchema),
  }
}

export type CloudSdk = ReturnType<typeof createCloudSdk>
