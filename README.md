# API

- Deployments
  - [createDeployment](#createdeployment)
  - [dropDeployment](#dropdeployment)
  - [listDeployments](#listdeployments)
  - [describeDeployment](#describedeployment)
  - [bootstrapDeployment](#bootstrapdeployment)
  - [shutdownDeployment](#shutdowndeployment)
  - [buildDeployment](#builddeployment)
  - [getDeploymentUploadSignedUrl](#getdeploymentuploadsignedurl)
  - Domains
    - [setDeploymentDomain](#setdeploymentdomain)
    - [unsetDeploymentDomain](#unsetdeploymentdomain)
  - Environment variables
    - [setEnvironmentVariables](#setenvironmentvariables)
    - [removeEnvironmentVariables](#removeenvironmentvariables)
    - [listEnvironmentVariables](#listenvironmentvariables)
  - Logs
    - [enableLogs](#enablelogs)
    - [disableLogs](#disablelogs)
    - [getLogs](#getlogs)
    - [removeLogs](#removelogs)
  - Read models
    - [pauseReadModel](#pausereadmodel)
    - [resetReadModel](#resetreadmodel)
    - [resumeReadModel](#resumereadmodel)
    - [listReadModels](#listreadmodels)
  - Sagas
    - [pauseSaga](#pausesaga)
    - [resetSaga](#resetsaga)
    - [resumeSaga](#resumesaga)
    - [listSagas](#listsagas)
    - Properties
      - [setSagaProperty](#setsagaproperty)
      - [deleteSagaProperty](#deletesagaproperty)
      - [getSagaProperty](#getsagaproperty)
      - [listSagaProperties](#listsagaproperties)
  - Tracing
    - [disableTracing](#disabletracing)
    - [enableTracing](#enabletracing)
    - [getSummaries](#getsummaries)
    - [getTracingDetails](#gettracingdetails)
    - [getTracingStatus](#gettracingstatus)
- Certificates
  - [ensureCertificate](#ensurecertificate)
  - [dropCertificate](#dropcertificate)
  - [listCertificates](#listcertificates)
- System
  - [heartbeat](#heartbeat)
  - [listVersions](#listversions)
  - [describeExecution](#describeexecution)
  - [getClientAppConfig](#getclientappconfig)
- Domains
  - [createDomain](#createdomain)
  - [dropDomain](#dropdomain)
  - [releaseDomain](#releasedomain)
  - [listDomains](#listdomains)
  - [verifyDomain](#verifydomain)
  - [getVerificationCode](#getverificationcode)
- Event stores
  - [createEventStore](#createeventstore)
  - [dropEventStore](#dropeventstore)
  - [getEventStore](#geteventstore)
  - [listEventStores](#listeventstores)
  - [cloneEventStore](#cloneeventstore)
  - [clearEventStore](#cleareventstore)
  - [freezeEventStore](#freezeeventstore)
  - [unfreezeEventStore](#unfreezeeventstore)
  - [linkDeployment](#linkdeployment)
  - [unlinkDeployment](#unlinkdeployment)
  - [importEventStore](#importeventstore)
  - [exportEventStore](#exporteventstore)
  - [getImportUrls](#getimporturls)
  - [getExportUrls](#getexporturls)

---

## setDeploymentDomain

Deserunt minim elit enim amet consectetur ipsum.

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

## unsetDeploymentDomain

Laborum laboris aliqua sunt minim consequat eiusmod Lorem incididunt nisi ea magna.

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

## setEnvironmentVariables

Mollit cillum eiusmod sint ipsum laboris amet exercitation fugiat aliquip.

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

## removeEnvironmentVariables

Velit voluptate sunt laboris cupidatat ea est culpa qui ex nostrud occaecat deserunt non.

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

## listEnvironmentVariables

Deserunt commodo amet ipsum sunt ex do excepteur cupidatat.

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

## createDeployment

Do ex amet occaecat aliqua elit.

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

## dropDeployment

Lorem sit ullamco fugiat consectetur laborum aliquip veniam sint non.

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

## listDeployments

Irure sit sit sunt ullamco qui.

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

## describeDeployment

Magna minim consectetur deserunt cupidatat nostrud est nostrud ex id commodo in.

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

## bootstrapDeployment

Exercitation ipsum aliqua nulla amet mollit dolor laboris sunt exercitation ea do in magna aliquip.

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

## shutdownDeployment

Officia tempor consectetur exercitation commodo.

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

## buildDeployment

Cillum incididunt irure commodo fugiat.

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

## getDeploymentUploadSignedUrl

Qui ad minim ex ea mollit ut do.

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

## enableLogs

Esse quis ut amet cillum eu qui laboris irure mollit irure fugiat nulla ullamco eiusmod.

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

## disableLogs

Magna sit Lorem id tempor et commodo duis.

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

## getLogs

Laborum tempor occaecat in aliquip veniam tempor ex laborum.

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

## removeLogs

Ullamco proident ullamco reprehenderit nisi cupidatat quis consequat pariatur elit ex sunt laboris excepteur consectetur.

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

## pauseReadModel

Consectetur proident officia elit exercitation nostrud adipisicing est in laborum ex esse excepteur.

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

## resetReadModel

Voluptate quis et laborum tempor laboris reprehenderit sint deserunt pariatur.

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

## resumeReadModel

Quis ex ex non ullamco voluptate cillum proident cillum consequat sunt amet amet Lorem do.

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

## listReadModels

Enim aute laboris reprehenderit pariatur aliquip nisi et dolore proident qui.

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

## setSagaProperty

Magna enim voluptate commodo ut consequat duis voluptate anim eiusmod in voluptate consequat elit aute.

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

## deleteSagaProperty

Ut id cillum magna voluptate ex proident nostrud laboris fugiat adipisicing tempor ipsum.

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

## getSagaProperty

Pariatur ex sint excepteur ipsum.

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

## listSagaProperties

Eiusmod esse nostrud veniam ad pariatur.

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

## pauseSaga

Minim velit fugiat consequat consectetur.

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

## resetSaga

Nulla irure dolor officia commodo commodo.

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

## resumeSaga

Dolor adipisicing aute sunt exercitation minim.

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

## listSagas

Ipsum eu sit pariatur exercitation exercitation ullamco dolor laboris ad.

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

## disableTracing

Fugiat ad consectetur occaecat adipisicing culpa proident ea in duis ad cillum mollit.

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

## enableTracing

Irure eu nisi nulla voluptate laboris laborum sint do pariatur do adipisicing ad.

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

## getSummaries

Irure irure incididunt adipisicing non voluptate minim.

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
  }> &
    { [K in string]: any }
>
```


---

## getTracingDetails

Duis aliquip nostrud nostrud exercitation enim pariatur sunt elit mollit ut sint.

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
Array<
  { [K in string]: any }
>
```


---

## getTracingStatus

Reprehenderit ad ipsum Lorem elit qui velit est duis do culpa ipsum mollit.

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

## ensureCertificate

Amet nulla nisi nulla veniam qui commodo non exercitation Lorem nulla elit.

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

## dropCertificate

Quis nisi dolor sit tempor reprehenderit ullamco esse deserunt in nostrud esse.

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

## listCertificates

Adipisicing voluptate nostrud velit ea.

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

## heartbeat

Ullamco officia cupidatat reprehenderit irure anim voluptate pariatur proident pariatur.

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

## listVersions

Commodo duis voluptate non occaecat mollit cillum sit tempor nostrud minim incididunt culpa.

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

## describeExecution

Ut deserunt amet nostrud elit adipisicing consectetur nostrud sit fugiat ipsum esse.

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

## getClientAppConfig

Duis sint elit exercitation consectetur quis ut id mollit mollit incididunt velit.

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

## createDomain

Eiusmod fugiat elit in tempor do proident quis est eu.

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

## dropDomain

Proident tempor minim non tempor pariatur do nostrud exercitation minim ullamco amet cupidatat exercitation ea.

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

## releaseDomain

Ullamco exercitation cillum nostrud pariatur veniam aliquip.

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

## listDomains

Consectetur eiusmod nostrud et Lorem ad cillum.

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

## verifyDomain

Eu aliqua exercitation et reprehenderit ad sint mollit.

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


---

## getVerificationCode

Minim adipisicing sit dolore duis adipisicing occaecat magna.

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

## createEventStore

Consectetur sit excepteur duis voluptate dolor cillum id dolor ipsum ad amet.

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

## dropEventStore

Adipisicing commodo Lorem exercitation tempor consectetur.

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

## getEventStore

Ut dolor enim ex anim nisi nostrud commodo reprehenderit et magna ad eu magna sunt.

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

## listEventStores

Aliquip cupidatat fugiat deserunt id et elit.

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

## cloneEventStore

Amet in enim nostrud ad cupidatat officia veniam id.

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

## clearEventStore

Consequat ea nisi officia laborum culpa minim sunt.

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

## freezeEventStore

Ullamco quis excepteur ullamco Lorem velit culpa ad.

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

## unfreezeEventStore

Ipsum duis in irure officia laborum.

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

## linkDeployment

In laboris veniam laboris mollit commodo aute esse incididunt ea.

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

## unlinkDeployment

Ea nisi dolore adipisicing nostrud sint do.

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

## importEventStore

Aliqua reprehenderit deserunt ipsum magna nostrud sit commodo minim cupidatat est et commodo.

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

## exportEventStore

Aliqua deserunt aliquip non aute nisi laboris in ut.

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

## getImportUrls

Excepteur nostrud et pariatur ullamco tempor laborum veniam.

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

## getExportUrls

Laborum Lorem excepteur magna pariatur ipsum esse officia deserunt dolore esse incididunt culpa exercitation non.

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

