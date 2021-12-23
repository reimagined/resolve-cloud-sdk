# API

- Auth
  - [authAuthWhoAmI](#authauthwhoami)
  - [authLogin](#authlogin)
  - [authLogout](#authlogout)
  - [authRefreshToken](#authrefreshtoken)
- Deployments
  - [bootstrapDeployment](#bootstrapdeployment)
  - [buildDeployment](#builddeployment)
  - [createDeployment](#createdeployment)
  - [describeDeployment](#describedeployment)
  - [dropDeployment](#dropdeployment)
  - [getDeploymentUploadSignedUrl](#getdeploymentuploadsignedurl)
  - [listDeployments](#listdeployments)
  - [shutdownDeployment](#shutdowndeployment)
  - Sagas
    - [listSagas](#listsagas)
    - [pauseSaga](#pausesaga)
    - [resetSaga](#resetsaga)
    - [resumeSaga](#resumesaga)
    - Properties
      - [deleteSagaProperty](#deletesagaproperty)
      - [getSagaProperty](#getsagaproperty)
      - [listSagaProperties](#listsagaproperties)
      - [setSagaProperty](#setsagaproperty)
  - Logs
    - [disableLogs](#disablelogs)
    - [enableLogs](#enablelogs)
    - [getLogs](#getlogs)
    - [removeLogs](#removelogs)
  - Tracing
    - [disableTracing](#disabletracing)
    - [enableTracing](#enabletracing)
    - [getSummaries](#getsummaries)
    - [getTracingDetails](#gettracingdetails)
    - [getTracingStatus](#gettracingstatus)
  - Environment variables
    - [listEnvironmentVariables](#listenvironmentvariables)
    - [removeEnvironmentVariables](#removeenvironmentvariables)
    - [setEnvironmentVariables](#setenvironmentvariables)
  - Read models
    - [listReadModels](#listreadmodels)
    - [pauseReadModel](#pausereadmodel)
    - [resetReadModel](#resetreadmodel)
    - [resumeReadModel](#resumereadmodel)
  - Domains
    - [setDeploymentDomain](#setdeploymentdomain)
    - [unsetDeploymentDomain](#unsetdeploymentdomain)
- Event stores
  - [clearEventStore](#cleareventstore)
  - [cloneEventStore](#cloneeventstore)
  - [createEventStore](#createeventstore)
  - [dropEventStore](#dropeventstore)
  - [exportEventStore](#exporteventstore)
  - [freezeEventStore](#freezeeventstore)
  - [getEventStore](#geteventstore)
  - [getExportUrls](#getexporturls)
  - [getImportUrls](#getimporturls)
  - [importEventStore](#importeventstore)
  - [linkDeployment](#linkdeployment)
  - [listEventStores](#listeventstores)
  - [unfreezeEventStore](#unfreezeeventstore)
  - [unlinkDeployment](#unlinkdeployment)
- Domains
  - [createDomain](#createdomain)
  - [dropDomain](#dropdomain)
  - [getVerificationCode](#getverificationcode)
  - [listDomains](#listdomains)
  - [releaseDomain](#releasedomain)
  - [verifyDomain](#verifydomain)
- System
  - [describeExecution](#describeexecution)
  - [getClientAppConfig](#getclientappconfig)
  - [heartbeat](#heartbeat)
  - [listVersions](#listversions)
- Certificates
  - [dropCertificate](#dropcertificate)
  - [ensureCertificate](#ensurecertificate)
  - [listCertificates](#listcertificates)

---

## authAuthWhoAmI

Get the current user's profile information.

#### Method

```
GET
```
#### Path

```
/v0/auth/whoami
```

#### Result

```ts
{
  userId: string
  userName: string
  isAdmin: boolean
}
```


---

## authLogin

Log in to reSolve Cloud.

#### Method

```
POST
```
#### Path

```
/v0/auth/login
```

#### Body

```ts
{
  userName: string
  password: string
}
```

#### Result

```ts
void
```


---

## authLogout

Log out of reSolve Cloud.

#### Method

```
POST
```
#### Path

```
/v0/auth/logout
```

#### Result

```ts
void
```


---

## authRefreshToken

Refresh your authentication token on reSolve Cloud.

#### Method

```
POST
```
#### Path

```
/v0/auth/refreshToken
```

#### Result

```ts
void
```


---

## bootstrapDeployment

Run the specified deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/bootstrap
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## buildDeployment

Build an uploaded application on the cloud.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/upload
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
Partial<{
  npmRegistry: string
}>
```

#### Result

```ts
{
  installLog: string
  files: Array<string>
}
```


---

## clearEventStore

Remove all events from an event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/clear
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
void
```


---

## cloneEventStore

Create a new event store based on the specified event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/clone
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
{
  eventStoreId: string
  eventStoreDatabaseName: string
}
```


---

## createDeployment

Create a new deployment.

#### Method

```
POST
```
#### Path

```
/v0/deployments
```

#### Body

```ts
{
  applicationName: string
  version: string
  eventStoreId: string
} & Partial<{ domain: string }>
```

#### Result

```ts
{
  deploymentId: string
  applicationName: string
  version: string
  domains: Array<string>
} & Partial<{ eventStoreId: string }>
```


---

## createDomain

Create a new domain with the specified certificate based on a list of aliases.

#### Method

```
POST
```
#### Path

```
/v0/domains
```

#### Body

```ts
{
  certificateId: string
  aliases: Array<string>
} & Partial<{ domainId: string }>
```

#### Result

```ts
{
  domainId: string
  domainType:
    | "proxy"
    | "static"
    | "uploader"
  domainName: string
  resourceARN: string
  aliases: Array<string>
  verified: boolean
  owner: string
  users: "*" | Array<string>
  verificationCode: string
  certificateId: string
}
```


---

## createEventStore

Create a new event store.

#### Method

```
POST
```
#### Path

```
/v0/event-stores
```

#### Body

```ts
{ version: string }
```

#### Result

```ts
{ eventStoreId: string }
```


---

## deleteSagaProperty

Delete a saga property.

#### Method

```
DELETE
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/properties/:key
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
  key: string
}
```

#### Result

```ts
void
```


---

## describeDeployment

Obtain information about a deployment.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
{
  deploymentId: string
  applicationName: string
  version: string
  domains: Array<string>
} & Partial<{ eventStoreId: string }>
```


---

## describeExecution

Get the status of a long-running operation specified by its ID.

#### Method

```
GET
```
#### Path

```
/v0/describe-execution/:executionId
```

#### Params

```ts
{ executionId: string }
```

#### Result

```ts
{
  status:
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "TIMED_OUT"
    | "ABORTED"
  output: any
}
```


---

## disableLogs

Disable logs for a deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/logs/disable
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## disableTracing

Disable performance tracing for a deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/tracing/disable
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## dropCertificate

Remove the specified certificate.

#### Method

```
DELETE
```
#### Path

```
/v0/certificates/:certificateId
```

#### Params

```ts
{ certificateId: string }
```

#### Result

```ts
void
```


---

## dropDeployment

Remove an existing deployment.

#### Method

```
DELETE
```
#### Path

```
/v0/deployments/:deploymentId
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
Partial<{
  withEventStore: boolean
}>
```

#### Result

```ts
void
```


---

## dropDomain

Remove the specified domain.

#### Method

```
DELETE
```
#### Path

```
/v0/domains/:domainId
```

#### Params

```ts
{ domainId: string }
```

#### Result

```ts
void
```


---

## dropEventStore

Remove an existing event store.

#### Method

```
DELETE
```
#### Path

```
/v0/event-stores/:eventStoreId
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
void
```


---

## enableLogs

Enable logs for a deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/logs/enable
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
Partial<{
  logLevel:
    | "log"
    | "error"
    | "warn"
    | "debug"
    | "info"
    | "verbose"
  scope: string
}>
```

#### Result

```ts
void
```


---

## enableTracing

Enable performance tracing for a deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/tracing/enable
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## ensureCertificate

Check an SSL certificate's validity.

#### Method

```
PUT
```
#### Path

```
/v0/certificates
```

#### Body

```ts
{
  certificate: string
  key: string
} & Partial<{
  certificateId: string
  chain: string
}>
```

#### Result

```ts
string
```


---

## exportEventStore

Export events from the specified event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/export
```

#### Params

```ts
{ eventStoreId: string }
```

#### Query

```ts
Partial<{
  cursor: string
}>
```

#### Result

```ts
void
```


---

## freezeEventStore

Disable event store updates.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/freeze
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
void
```


---

## getClientAppConfig

Get reSolve Cloud's app client ID and user pool ID on Amazon Cognito.

#### Method

```
GET
```
#### Path

```
/v0/client-app-config
```

#### Result

```ts
{
  clientId: string
  userPoolId: string
}
```


---

## getDeploymentUploadSignedUrl

Get URLs used to upload an application's source code and static resources.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/upload
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
{
  codeUploadUrl: string
  staticUploadUrl: string
}
```


---

## getEventStore

Get information about the specified event store.

#### Method

```
GET
```
#### Path

```
/v0/event-stores/:eventStoreId
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
{
  eventStoreClusterArn: string
  eventStoreSecretArn: string
  eventStoreDatabaseName: string
  version: string
  eventStoreId: string
  linkedDeployments: Array<string>
  region: string
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
}
```


---

## getExportUrls

Get URLs used to download files that contain events and secrets to import as well as a file that contains information about the status of the export process.

#### Method

```
GET
```
#### Path

```
/v0/event-stores/:eventStoreId/export
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
{
  eventsExportUrl: string
  secretsExportUrl: string
  statusFileUrl: string
}
```


---

## getImportUrls

Get URLs used to upload files that contain events and secrets to import.

#### Method

```
GET
```
#### Path

```
/v0/event-stores/:eventStoreId/import
```

#### Params

```ts
{ eventStoreId: string }
```

#### Query

```ts
{
  eventsPartCount: string
  secretsPartCount: string
}
```

#### Result

```ts
{
  eventsImportUrls: Array<string>
  secretsImportUrls: Array<string>
}
```


---

## getLogs

Get logs for a time interval.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/logs
```

#### Params

```ts
{ deploymentId: string }
```

#### Query

```ts
Partial<{
  startTime: string
  endTime: string
  filterPattern: string
  streamLimit: string
}>
```

#### Result

```ts
string
```


---

## getSagaProperty

Get a saga property's value.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/properties/:key
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
  key: string
}
```

#### Result

```ts
{ [K in string]: any }
```


---

## getSummaries

Get the list of a deployment's performance tracing summaries for the specified time interval.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/tracing/summary
```

#### Params

```ts
{ deploymentId: string }
```

#### Query

```ts
{
  startTime: string
  endTime: string
} & Partial<{
  filterExpression: string
}>
```

#### Result

```ts
Array<
  Partial<{
    id: string
    responseTime: number
    http: Partial<{
      httpURL: string
      httpStatus: number
      httpMethod: string
      userAgent: string
      clientIp: string
    }>
  }> & { [K in string]: any }
>
```


---

## getTracingDetails

Get details on the specified performance trace.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/tracing/details
```

#### Params

```ts
{ deploymentId: string }
```

#### Query

```ts
{
  traceIds: Array<string>
}
```

#### Result

```ts
Array<{
  [K in string]: any
}>
```


---

## getTracingStatus

Check whether performance tracing is enabled for a deployment.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/tracing/status
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
"enabled" | "disabled"
```


---

## getVerificationCode

Get a code to add to a verification record within your domain zone.

#### Method

```
GET
```
#### Path

```
/v0/domains/:domainId/verification-code
```

#### Params

```ts
{ domainId: string }
```

#### Result

```ts
{
  verificationCode: string
}
```


---

## heartbeat

Check if the service is available.

#### Method

```
HEAD
```
#### Path

```
/v0/
```

#### Result

```ts
void
```


---

## importEventStore

Import events into the specified event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/import
```

#### Params

```ts
{ eventStoreId: string }
```

#### Body

```ts
{ partIndex: number }
```

#### Result

```ts
void
```


---

## linkDeployment

Connect an existing application deployment to the specified event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/link
```

#### Params

```ts
{ eventStoreId: string }
```

#### Body

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## listCertificates

Get a list of the available SSL certificates.

#### Method

```
GET
```
#### Path

```
/v0/certificates
```

#### Result

```ts
Array<
  {
    certificateId: string
    additionalNames: Array<string>
    resourceARN: string
  } & Partial<{
    domainName: string
    importedAt: string
    issuer: string
    notBefore: string
    notAfter: string
  }>
>
```


---

## listDeployments

Get a list of existing deployments.

#### Method

```
GET
```
#### Path

```
/v0/deployments
```

#### Query

```ts
Partial<{
  applicationName: string
}>
```

#### Result

```ts
Array<
  {
    deploymentId: string
    applicationName: string
    version: string
    domains: Array<string>
  } & Partial<{ eventStoreId: string }>
>
```


---

## listDomains

Get a list of the available domains.

#### Method

```
GET
```
#### Path

```
/v0/domains
```

#### Result

```ts
Array<{
  domainId: string
  domainType:
    | "proxy"
    | "static"
    | "uploader"
  domainName: string
  resourceARN: string
  aliases: Array<string>
  verified: boolean
  owner: string
  users: "*" | Array<string>
  verificationCode: string
  certificateId: string
}>
```


---

## listEnvironmentVariables

Get a list of a deployment's environment variables.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/environment
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
{ [K in string]: string }
```


---

## listEventStores

Get a list of objects that describe available event stores.

#### Method

```
GET
```
#### Path

```
/v0/event-stores
```

#### Result

```ts
Array<{
  version: string
  eventStoreId: string
  linkedDeployments: Array<string>
  eventStoreDatabaseName: string
  events: number | null
  secrets: number | null
  modifiedAt: number | null
  createdAt: number | null
  isFrozen: boolean | null
}>
```


---

## listReadModels

Obtain the list of a deployment's read models.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/read-models
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
Array<{
  name: string
  status: string | null
  successEvent:
    | { [K in string]: any }
    | null
  failedEvent:
    | { [K in string]: any }
    | null
  errors: Array<{
    name: string
    message: string
    stack: string
  }>
}>
```


---

## listSagaProperties

Get the list of assigned saga properties.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/properties
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
}
```

#### Result

```ts
any
```


---

## listSagas

Get the list of a deployment's sagas.

#### Method

```
GET
```
#### Path

```
/v0/deployments/:deploymentId/sagas
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
Array<{
  name: string
  status: string | null
  successEvent:
    | { [K in string]: any }
    | null
  failedEvent:
    | { [K in string]: any }
    | null
  errors: Array<{
    name: string
    message: string
    stack: string
  }>
}>
```


---

## listVersions

Get a list of the available reSolve versions.

#### Method

```
GET
```
#### Path

```
/v0/runtimes
```

#### Result

```ts
Array<string>
```


---

## pauseReadModel

Pause read model updates.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/read-models/:readModelName/pause
```

#### Params

```ts
{
  deploymentId: string
  readModelName: string
}
```

#### Result

```ts
void
```


---

## pauseSaga

Pause saga updates.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/pause
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
}
```

#### Result

```ts
any
```


---

## releaseDomain

Release a domain from the associated application deployments.

#### Method

```
DELETE
```
#### Path

```
/v0/domains
```

#### Body

```ts
{ domain: string }
```

#### Result

```ts
void
```


---

## removeEnvironmentVariables

Remove environment variables.

#### Method

```
DELETE
```
#### Path

```
/v0/deployments/:deploymentId/environment
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
{
  variables: Array<string>
}
```

#### Result

```ts
void
```


---

## removeLogs

Remove a deployment's logs.

#### Method

```
DELETE
```
#### Path

```
/v0/deployments/:deploymentId/logs
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## resetReadModel

Reset a read model's persistent state.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/read-models/:readModelName/reset
```

#### Params

```ts
{
  deploymentId: string
  readModelName: string
}
```

#### Result

```ts
void
```


---

## resetSaga

Reset a saga's persistent state.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/reset
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
}
```

#### Result

```ts
void
```


---

## resumeReadModel

Resume read model updates.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/read-models/:readModelName/resume
```

#### Params

```ts
{
  deploymentId: string
  readModelName: string
}
```

#### Result

```ts
void
```


---

## resumeSaga

Resume saga updates.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/resume
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
}
```

#### Result

```ts
void
```


---

## setDeploymentDomain

Assigns a domain to a deployment.

#### Method

```
PUT
```
#### Path

```
/v0/deployments/:deploymentId/domain
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
{ domain: string }
```

#### Result

```ts
void
```


---

## setEnvironmentVariables

Set environment variables for a deployment.

#### Method

```
PUT
```
#### Path

```
/v0/deployments/:deploymentId/environment
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
{
  variables: { [K in string]: string }
}
```

#### Result

```ts
void
```


---

## setSagaProperty

Assign a value to a saga property.

#### Method

```
PUT
```
#### Path

```
/v0/deployments/:deploymentId/sagas/:sagaName/properties
```

#### Params

```ts
{
  deploymentId: string
  sagaName: string
}
```

#### Body

```ts
{
  key: string
  value: string
}
```

#### Result

```ts
void
```


---

## shutdownDeployment

Shut down a deployment.

#### Method

```
PATCH
```
#### Path

```
/v0/deployments/:deploymentId/shutdown
```

#### Params

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## unfreezeEventStore

Resume event store updates.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/unfreeze
```

#### Params

```ts
{ eventStoreId: string }
```

#### Result

```ts
void
```


---

## unlinkDeployment

Disconnect an application deployment from the specified event store.

#### Method

```
PATCH
```
#### Path

```
/v0/event-stores/:eventStoreId/unlink
```

#### Params

```ts
{ eventStoreId: string }
```

#### Body

```ts
{ deploymentId: string }
```

#### Result

```ts
void
```


---

## unsetDeploymentDomain

Detach a domain from a deployment.

#### Method

```
DELETE
```
#### Path

```
/v0/deployments/:deploymentId/domain
```

#### Params

```ts
{ deploymentId: string }
```

#### Body

```ts
{ domain: string }
```

#### Result

```ts
void
```


---

## verifyDomain

Verify a domain after a verification record was added to the domain zone.

#### Method

```
PATCH
```
#### Path

```
/v0/domains/:domainId/verify
```

#### Params

```ts
{ domainId: string }
```

#### Result

```ts
void
```

