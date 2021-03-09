import request from './request'
import { SetupOptions } from './sdk'

export * from './constants'
export * from './generate-id'
export * from './validate'
export * from './schemas'
export * from './commands/builder'
export * from './commands/certificates'
export * from './commands/cloud'
export * from './commands/cognito'
export * from './commands/deployments/lifecycle'
export * from './commands/deployments/envs'
export * from './commands/deployments/event-stores'
export * from './commands/deployments/logs'
export * from './commands/deployments/read-models'
export * from './commands/deployments/sagas'
export * from './commands/deployments/tracing'
export * from './commands/dns'
export * from './commands/domains'
export * from './commands/event-stores'
export * from './commands/stage-resources'
export * from './commands/version-resources'
export * from './lambda-events'

const createCloudSdk = () => {
  let options: SetupOptions = {}

  return {
    /* Setup */
    setup(params: SetupOptions) {
      options = params
    },

    /* System */
    getClientAppConfig: () =>
      request({
        method: 'GET',
        url: '/client-app-config',
        mode: 'SYNC',
        ...options,
      }),
    describeExecution: (params: { executionId: string }) =>
      request({
        method: 'GET',
        url: `/describe-execution/${params.executionId}`,
        mode: 'SYNC',
        ...options,
      }),

    /* Certificates */
    ensureCertificate: (params: {
      certificate: string
      key: string
      chain: string
      certificateId?: string | null
    }) =>
      request({
        method: 'PUT',
        url: `/certificates`,
        body: {
          certificate: params.certificateId,
          key: params.key,
          chain: params.chain,
          id: params.certificateId,
        },
        mode: 'ASYNC',
        ...options,
      }),
    listCertificates: () =>
      request({
        method: 'GET',
        url: '/certificates',
        mode: 'ASYNC',
        ...options,
      }),
    dropCertificate: (params: { certificateId: string }) =>
      request({
        method: 'DELETE',
        url: `/certificates/${params.certificateId}`,
        mode: 'ASYNC',
        ...options,
      }),

    /* Domains */
    createDomain: (params: { domainId: string; certificateId: string; aliases: Array<string> }) =>
      request({
        method: 'POST',
        url: '/domains',
        body: {
          domainId: params.domainId,
          certificateId: params.certificateId,
          aliases: params.aliases,
        },
        mode: 'ASYNC',
      }),
    listDomains: (params: Record<string, any>) =>
      request({
        method: 'GET',
        url: `/domains`,
        mode: 'ASYNC',
      }),
    dropDomain: (params: { domainId: string }) =>
      request({
        method: 'DELETE',
        url: `/domains/${params.domainId}`,
        mode: 'ASYNC',
      }),
    verifyDomain: (params: { domainId: string }) =>
      request({
        method: 'PATCH',
        url: `/domains/${params.domainId}/verify`,
        mode: 'ASYNC',
      }),
    setDomainUsers: (params: { domainId: string; users: '*' | Array<string> }) =>
      request({
        method: 'PUT',
        url: `/domains/${params.domainId}/users`,
        body: {
          users: params.users,
        },
        mode: 'ASYNC',
        ...options,
      }),
    addDomainUser: (params: { domainId: string; userId: string }) =>
      request({
        method: 'POST',
        url: `/domains/${params.domainId}/users`,
        body: {
          userId: params.userId,
        },
        mode: 'ASYNC',
        ...options,
      }),
    removeDomainUser: (params: { domainId: string; userId: string }) =>
      request({
        method: 'DELETE',
        url: `/domains/${params.domainId}/users/${params.userId}`,
        mode: 'ASYNC',
      }),
    getVerificationCode: (params: { domainId: string }) =>
      request({
        method: 'GET',
        url: `/domains/${params.domainId}/verification-code`,
        mode: 'ASYNC',
      }),

    /* Event Stores */
    createEventStore: (params: {
      version: string
      eventStoreId: string
      mode: 'clone' | 'reuse'
    }) =>
      request({
        method: 'POST',
        url: `/event-stores`,
        body: {
          version: params.version,
          eventStoreId: params.eventStoreId,
          mode: params.mode,
        },
        mode: 'ASYNC',
      }),
    dropEventStore: (params: { eventStoreId: string }) =>
      request({
        method: 'DELETE',
        url: `/event-stores/${params.eventStoreId}`,
        mode: 'ASYNC',
      }),
    listEventStores: () =>
      request({
        method: 'GET',
        url: `/event-stores`,
        mode: 'ASYNC',
      }),

    /* Read Models */
    listReadModels: (params: { deploymentId: string }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/read-models`,
        mode: 'ASYNC',
      }),
    pauseReadModel: (params: { deploymentId: string; readModelName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/read-models/${params.readModelName}/pause`,
        mode: 'ASYNC',
      }),
    resetReadModel: (params: { deploymentId: string; readModelName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/read-models/${params.readModelName}/reset`,
        mode: 'ASYNC',
      }),
    resumeReadModel: (params: { deploymentId: string; readModelName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/read-models/${params.readModelName}/resume`,
        mode: 'ASYNC',
      }),

    /* Sagas */
    listSagas: (params: { deploymentId: string }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/sagas`,
        mode: 'ASYNC',
      }),
    pauseSaga: (params: { deploymentId: string; sagaName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/pause`,
        mode: 'ASYNC',
      }),
    resetSaga: (params: { deploymentId: string; sagaName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/reset`,
        mode: 'ASYNC',
      }),
    resumeSaga: (params: { deploymentId: string; sagaName: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/resume`,
        mode: 'ASYNC',
      }),
    setSagaProperty: (params: {
      deploymentId: string
      sagaName: string
      key: string
      value: any
    }) =>
      request({
        method: 'PUT',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/properties/${params.key}`,
        body: {
          value: params.value,
        },
        mode: 'ASYNC',
      }),
    deleteSagaProperty: (params: { deploymentId: string; sagaName: string; key: string }) =>
      request({
        method: 'DELETE',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/properties/${params.key}`,
        mode: 'ASYNC',
      }),
    listSagaProperties: (params: { deploymentId: string; sagaName: string }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/sagas/${params.sagaName}/properties`,
        mode: 'ASYNC',
      }),

    /* Deployments */
    createDeployment: (params: {
      applicationName: string
      version: string
      eventStoreId: string
      eventStoreDatabaseName: string
      eventBusLambdaArn: string
      eventBusDatabaseName: string
      domain?: string
    }) =>
      request({
        method: 'POST',
        url: `/deployments`,
        mode: 'ASYNC',
      }),
    listDeployments: () =>
      request({
        method: 'GET',
        url: `/deployments`,
        mode: 'ASYNC',
      }),
    getDeploymentByApplicationName: (params: { applicationName: string }) =>
      request({
        method: 'GET',
        url: `/deployments`,
        query: {
          applicationName: params.applicationName,
        },
        mode: 'ASYNC',
      }),
    getDeploymentUploadSignedUrl: (params: { deploymentId: string }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/upload`,
        mode: 'ASYNC',
      }),
    buildDeployment: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/upload`,
        mode: 'ASYNC',
      }),
    bootstrapDeployment: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/bootstrap`,
        mode: 'ASYNC',
      }),
    shutdownDeployment: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/shutdown`,
        mode: 'ASYNC',
      }),
    dropDeployment: (params: { deploymentId: string }) =>
      request({
        method: 'DELETE',
        url: `/deployments/${params.deploymentId}`,
        mode: 'ASYNC',
      }),

    /* Environment Variables */
    setEnv: (params: { deploymentId: string; variables: Record<string, string> }) =>
      request({
        method: 'PUT',
        url: `/deployments/${params.deploymentId}/environment`,
        body: { variables: params.variables },
        mode: 'ASYNC',
      }),
    removeEnv: (params: { deploymentId: string; variables: Array<string> }) =>
      request({
        method: 'DELETE',
        url: `/deployments/${params.deploymentId}/environment`,
        mode: 'ASYNC',
      }),

    /* Logs */
    disableLogs: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/logs/disable`,
        mode: 'ASYNC',
      }),
    enableLogs: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/logs/enable`,
        mode: 'ASYNC',
      }),
    getLogs: (params: {
      deploymentId: string
      startTime?: number
      endTime?: number
      filterPattern?: string
      streamLimit?: number
    }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/logs`,
        mode: 'ASYNC',
      }),

    /* Tracing */
    enableTracing: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/tracing/enable`,
        mode: 'ASYNC',
      }),
    disableTracing: (params: { deploymentId: string }) =>
      request({
        method: 'PATCH',
        url: `/deployments/${params.deploymentId}/tracing/disable`,
        mode: 'ASYNC',
      }),
    getTracingDetails: (params: { deploymentId: string; traceIds: Array<string> }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/tracing/details`,
        mode: 'ASYNC',
      }),
    getTracingSummary: (params: {
      deploymentId: string
      startTime: string
      endTime: string
      filterExpression?: string
    }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/tracing/summary`,
        mode: 'ASYNC',
      }),
    getTracingStatus: (params: { deploymentId: string }) =>
      request({
        method: 'GET',
        url: `/deployments/${params.deploymentId}/tracing/status`,
        mode: 'ASYNC',
      }),
  }
}

export default createCloudSdk
