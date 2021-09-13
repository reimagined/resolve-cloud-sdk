## HEAD: /

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "heartbeat"
  payload: void
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PUT: /certificates

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  certificate: string
  key: string
} & Partial<{
  id: string
  chain: string
}>
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "ensureCertificate"
  payload: {
    userId: string
    certificate: string
    key: string
  } & Partial<{
    certificateId: string
    chain: string
  }>
}
```

</td><td>

```ts
string
```

</td></tr></table>

## GET: /certificates

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listCertificates"
  payload: { userId: string }
}
```

</td><td>

```ts
Array<
  {
    CertificateId: string
    AdditionalNames: Array<string>
    ResourceARN: string
  } & Partial<{
    DomainName: string
    ImportedAt: string
    Issuer: string
    NotBefore: string
    NotAfter: string
  }>
>
```

</td></tr></table>

## DELETE: /certificates/:certificateId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "dropCertificate"
  payload: {
    userId: string
    certificateId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /client-app-config

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getClientAppConfig"
  payload: {}
}
```

</td><td>

```ts
{
  ClientId: string
  UserPoolId: string
}
```

</td></tr></table>

## POST: /deployments

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  applicationName: string
  version: string
  eventStoreId: string
} & Partial<{
  eventStoreDatabaseName: string
  eventBusLambdaArn: string
  domain: string
  deploymentTag: string
}>
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "createDeployment"
  payload: {
    userId: string
    applicationName: string
    version: string
    eventStoreId: string
  } & Partial<{
    domain: string
    deploymentTag: string
  }>
}
```

</td><td>

```ts
{
  deploymentId: string
  applicationName: string
  version: string
  domainName: string
} & Partial<{
  eventStoreId: string
  deploymentTag: string
}>
```

</td></tr></table>

## GET: /deployments

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
Partial<{
  applicationName: string
  deploymentTag: string
}>
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listDeployments"
  payload: {
    userId: string
  } & Partial<{
    applicationName: string
  }>
}
```

</td><td>

```ts
Array<
  {
    deploymentId: string
    applicationName: string
    version: string
    domainName: string
  } & Partial<{
    eventStoreId: string
    deploymentTag: string
  }>
>
```

</td></tr></table>

## DELETE: /deployments/:deploymentId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
Partial<{
  withEventStore: boolean
}>
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "dropDeployment"
  payload: {
    userId: string
    deploymentId: string
  } & Partial<{
    withEventStore: boolean
  }>
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "describeDeployment"
  payload: {
    userId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
{
  deploymentId: string
  applicationName: string
  version: string
  domainName: string
} & Partial<{
  eventStoreId: string
  deploymentTag: string
}>
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/bootstrap

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "bootstrapDeployment"
  payload: {
    version: string
    userId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PUT: /deployments/:deploymentId/domain

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ domain: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "setDeploymentDomain"
  payload: {
    userId: string
    deploymentId: string
    domain: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## DELETE: /deployments/:deploymentId/domain

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ domain: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "unsetDeploymentDomain"
  payload: {
    userId: string
    deploymentId: string
    domain: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PUT: /deployments/:deploymentId/environment

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  variables: { [K in string]: string }
}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "updateEnvironmentVariables"
  payload: {
    deploymentId: string
    userId: string
    variables: {
      [K in string]: string | null
    }
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## DELETE: /deployments/:deploymentId/environment

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  variables: Array<string>
}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "updateEnvironmentVariables"
  payload: {
    deploymentId: string
    userId: string
    variables: {
      [K in string]: string | null
    }
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/environment

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listEnvironmentVariables"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
{ [K in string]: string }
```

</td></tr></table>

## GET: /deployments/:deploymentId/logs

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
Partial<{
  startTime: string
  endTime: string
  filterPattern: string
  streamLimit: string
}>
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getLogs"
  payload: {
    deploymentId: string
    userId: string
  } & Partial<{
    streamLimit: number
    startTime: number
    endTime: number
    filterPattern: string
  }>
}
```

</td><td>

```ts
string
```

</td></tr></table>

## DELETE: /deployments/:deploymentId/logs

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "removeLogs"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/logs/disable

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "disableLogs"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/logs/enable

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

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

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "enableLogs"
  payload: {
    deploymentId: string
    userId: string
  } & Partial<{
    logLevel:
      | "log"
      | "error"
      | "warn"
      | "debug"
      | "info"
      | "verbose"
    scope: string
  }>
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/read-models

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listReadModels"
  payload: {
    version: string
    deploymentId: string
    userId: string
  }
}
```

</td><td>

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

</td></tr></table>

## PATCH: /deployments/:deploymentId/read-models/:readModelName/pause

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "pauseReadModel"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/read-models/:readModelName/reset

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "resetReadModel"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/read-models/:readModelName/resume

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "resumeReadModel"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/sagas

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listSagas"
  payload: {
    version: string
    deploymentId: string
    userId: string
  }
}
```

</td><td>

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

</td></tr></table>

## PATCH: /deployments/:deploymentId/sagas/:sagaName/pause

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "pauseSaga"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
any
```

</td></tr></table>

## PUT: /deployments/:deploymentId/sagas/:sagaName/properties

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  key: string
  value: string
}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "setSagaProperty"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
    key: string
    value: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/sagas/:sagaName/properties

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listSagaProperties"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
any
```

</td></tr></table>

## DELETE: /deployments/:deploymentId/sagas/:sagaName/properties/:key

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "deleteSagaProperty"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
    key: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/sagas/:sagaName/properties/:key

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getSagaProperty"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
    key: string
  }
}
```

</td><td>

```ts
{ [K in string]: any }
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/sagas/:sagaName/reset

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "resetSaga"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/sagas/:sagaName/resume

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "resumeSaga"
  payload: {
    version: string
    deploymentId: string
    userId: string
    eventListener: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/shutdown

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "shutdownDeployment"
  payload: {
    version: string
    userId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PUT: /deployments/:deploymentId/tag

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ deploymentTag: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "setDeploymentTag"
  payload: {
    userId: string
    deploymentId: string
    deploymentTag: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## DELETE: /deployments/:deploymentId/tag

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "unsetDeploymentTag"
  payload: {
    userId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/tracing/details

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{ traceIds: string }
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getTracingDetails"
  payload: {
    deploymentId: string
    userId: string
    traceIds: Array<string>
  }
}
```

</td><td>

```ts
Array<
  { [K in string]: any }
>
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/tracing/disable

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "disableTracing"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/tracing/enable

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "enableTracing"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /deployments/:deploymentId/tracing/status

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getTracingStatus"
  payload: {
    deploymentId: string
    userId: string
  }
}
```

</td><td>

```ts
"enabled" | "disabled"
```

</td></tr></table>

## GET: /deployments/:deploymentId/tracing/summary

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{
  startTime: string
  endTime: string
} & Partial<{
  filterExpression: string
}>
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getSummaries"
  payload: {
    deploymentId: string
    userId: string
    startTime: number
    endTime: number
  } & Partial<{
    filterExpression: string
  }>
}
```

</td><td>

```ts
Array<
  Partial<{
    Id: string
    ResponseTime: number
    Http: Partial<{
      HttpURL: string
      HttpStatus: number
      HttpMethod: string
      UserAgent: string
      ClientIp: string
    }>
  }> &
    { [K in string]: any }
>
```

</td></tr></table>

## PATCH: /deployments/:deploymentId/upload

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
Partial<{
  npmRegistry: string
}>
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "buildDeployment"
  payload: {
    userId: string
    deploymentId: string
  } & Partial<{ npmRegistry: string }>
}
```

</td><td>

```ts
{
  installLog: string
  files: Array<string>
}
```

</td></tr></table>

## GET: /deployments/:deploymentId/upload

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getDeploymentByApplicationName"
  payload: {
    userId: string
    applicationName: string
  } & Partial<{ version: string }>
}
```

</td><td>

```ts
type Schema =
  | ({
      deploymentId: string
      applicationName: string
      version: string
      domainName: string
    } & Partial<{
      eventStoreId: string
      deploymentTag: string
    }>)
  | null
```

</td></tr></table>

## GET: /deployments/:deploymentId/upload

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getDeploymentUploadSignedUrl"
  payload: {
    userId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
{
  codeUploadUrl: string
  staticUploadUrl: string
}
```

</td></tr></table>

## GET: /describe-execution/:executionId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "describeExecution"
  payload: { executionId: string }
}
```

</td><td>

```ts
{
  Status:
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "TIMED_OUT"
    | "ABORTED"
  Output: any
}
```

</td></tr></table>

## POST: /domains

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  certificateId: string
  aliases: Array<string>
} & Partial<{ domainId: string }>
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name:
    | "createStaticDomain"
    | "createProxyDomain"
    | "createUploaderDomain"
  payload: {
    userId: string
    certificateId: string
  } & Partial<{
    aliases: Array<string>
    domainId: string
    customName: string
    users: "*" | Array<string>
    verification: boolean
  }>
}
```

</td><td>

```ts
{
  DomainId: string
  DomainType:
    | "proxy"
    | "static"
    | "uploader"
  DomainName: string
  ResourceARN: string
  Aliases: Array<string>
  Verified: boolean
  Owner: string
  Users: "*" | Array<string>
  VerificationCode: string
  CertificateId: string
}
```

</td></tr></table>

## GET: /domains

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listDomains"
  payload: {
    userId: string
  } & Partial<{ domain: string }>
}
```

</td><td>

```ts
Array<{
  DomainId: string
  DomainType:
    | "proxy"
    | "static"
    | "uploader"
  DomainName: string
  ResourceARN: string
  Aliases: Array<string>
  Verified: boolean
  Owner: string
  Users: "*" | Array<string>
  VerificationCode: string
  CertificateId: string
}>
```

</td></tr></table>

## DELETE: /domains

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ domain: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "releaseDomain"
  payload: {
    userId: string
    domain: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## DELETE: /domains/:domainId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "dropDomain"
  payload: {
    userId: string
    domainId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## POST: /domains/:domainId/users

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ userId: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "addDomainUser"
  payload: {
    userId: string
    domainId: string
    user: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PUT: /domains/:domainId/users

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{
  users: "*" | Array<string>
}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "setDomainUsers"
  payload: {
    userId: string
    domainId: string
    users: "*" | Array<string>
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## DELETE: /domains/:domainId/users/:userId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "removeDomainUser"
  payload: {
    userId: string
    domainId: string
    user: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /domains/:domainId/verification-code

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getVerificationCode"
  payload: {
    userId: string
    domainId: string
  }
}
```

</td><td>

```ts
{
  VerificationCode: string
}
```

</td></tr></table>

## PATCH: /domains/:domainId/verify

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "verifyDomain"
  payload: {
    userId: string
    domainId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## POST: /event-stores

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ version: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "createEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    assetsBucketName: string
  }
}
```

</td><td>

```ts
{
  eventStoreId: string
  eventStoreDatabaseName: string
}
```

</td></tr></table>

## GET: /event-stores

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listEventStores"
  payload: {
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
  }
}
```

</td><td>

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

</td></tr></table>

## DELETE: /event-stores/:eventStoreId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "dropEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /event-stores/:eventStoreId

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "getEventStore"
  payload: {
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
  }
}
```

</td><td>

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

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/clear

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "clearEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/clone

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "cloneEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    assetsBucketName: string
    eventStoreId: string
  }
}
```

</td><td>

```ts
{
  eventStoreId: string
  eventStoreDatabaseName: string
}
```

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/freeze

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "freezeEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/link

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ deploymentId: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "linkDeployment"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/unfreeze

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "unfreezeEventStore"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## PATCH: /event-stores/:eventStoreId/unlink

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{ deploymentId: string }
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "unlinkDeployment"
  payload: {
    version: string
    user: {
      userId: string
      password: string
      secretName: string
      secretArn: string
    }
    eventStoreClusterArn: string
    postgresAdminSecretArn: string
    eventStoreId: string
    deploymentId: string
  }
}
```

</td><td>

```ts
void
```

</td></tr></table>

## GET: /runtimes

<table><tr><th align="center"><img width="441" height="1px"><p><small>Query
</small></p></th><th align="center"><img width="441" height="1"><p><small>Body
</small></p></th></tr><tr><td>

```ts
{}
```

</td><td>

```ts
{}
```

</td></tr>
<tr><th align="center"><img width="441" height="1px"><p><small>Event
</small></p></th><th align="center"><img width="441" height="1"><p><small>Result
</small></p></th></tr><tr><td>

```ts
{
  name: "listVersions"
  payload: UnknownRecord
}
```

</td><td>

```ts
Array<string>
```

</td></tr></table>

