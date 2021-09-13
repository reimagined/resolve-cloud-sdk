import * as t from 'io-ts'
import { FactoryEventNames, InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes, DeploymentSchema } from '../../schemas'

/* BootstrapDeployment */

export const BootstrapDeploymentSchema = defineSchema({
  Path: '/deployments/:deploymentId/bootstrap',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.bootstrapDeployment),
    payload: t.type({
      version: t.string,
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type BootstrapDeployment = ExtractSchemaTypes<typeof BootstrapDeploymentSchema>

/* ShutdownDeployment */

export const ShutdownDeploymentSchema = defineSchema({
  Path: '/deployments/:deploymentId/shutdown',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.shutdownDeployment),
    payload: t.type({
      version: t.string,
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type ShutdownDeployment = ExtractSchemaTypes<typeof ShutdownDeploymentSchema>

/* DropEventSubscribers */

export const DropEventSubscribersSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.dropEventSubscribers),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
})

export type DropEventSubscribers = ExtractSchemaTypes<typeof DropEventSubscribersSchema>

/* BuildDeployment */

export const BuildDeploymentSchema = defineSchema({
  Path: '/deployments/:deploymentId/upload',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.partial({
    npmRegistry: t.string,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.buildDeployment),
    payload: t.intersection([
      t.type({
        userId: t.string,
        deploymentId: t.string,
      }),
      t.partial({
        npmRegistry: t.string,
      }),
    ]),
  }),
  Result: t.type({
    installLog: t.string,
    files: t.array(t.string),
  }),
  ArgumentsTransformer: ({ deploymentId, npmRegistry }) => ({
    params: { deploymentId },
    body: { npmRegistry },
    query: {},
  }),
})

export type BuildDeployment = ExtractSchemaTypes<typeof BuildDeploymentSchema>

/* CreateDeployment */

export const CreateDeploymentSchema = defineSchema({
  Path: '/deployments',
  Method: 'POST',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.intersection([
    t.type({
      applicationName: t.string,
      version: t.string,
      eventStoreId: t.string,
    }),
    t.partial({
      eventStoreDatabaseName: t.string /* deprecated */,
      eventBusLambdaArn: t.string /* deprecated */,
      domain: t.string,
      deploymentTag: t.string,
    }),
  ]),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.createDeployment),
    payload: t.intersection([
      t.type({
        userId: t.string,
        applicationName: t.string,
        version: t.string,
        eventStoreId: t.string,
      }),
      t.partial({
        domain: t.string,
        deploymentTag: t.string,
      }),
    ]),
  }),
  Result: DeploymentSchema,
  ArgumentsTransformer: ({ eventStoreDatabaseName, eventBusLambdaArn, ...args }) => ({
    params: {},
    body: args,
    query: {},
  }),
})

export type CreateDeployment = ExtractSchemaTypes<typeof CreateDeploymentSchema>

/* DropDeployment */

export const DropDeploymentSchema = defineSchema({
  Path: '/deployments/:deploymentId',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.partial({ withEventStore: t.boolean }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.dropDeployment),
    payload: t.intersection([
      t.type({
        userId: t.string,
        deploymentId: t.string,
      }),
      t.partial({
        withEventStore: t.boolean,
      }),
    ]),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, withEventStore }) => ({
    params: { deploymentId },
    body: { withEventStore },
    query: {},
  }),
})

export type DropDeployment = ExtractSchemaTypes<typeof DropDeploymentSchema>

/* GetDeploymentByApplicationName */

export const GetDeploymentByApplicationNameSchema = defineSchema({
  Path: '/deployments/:deploymentId/upload',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getDeploymentByApplicationName),
    payload: t.intersection([
      t.type({
        userId: t.string,
        applicationName: t.string,
      }),
      t.partial({
        version: t.string,
      }),
    ]),
  }),
  Result: t.union([DeploymentSchema, t.null]),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type GetDeploymentByApplicationName = ExtractSchemaTypes<
  typeof GetDeploymentByApplicationNameSchema
>

/* DescribeDeployment */

export const DescribeDeploymentSchema = defineSchema({
  Path: '/deployments/:deploymentId',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.describeDeployment),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: DeploymentSchema,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type DescribeDeployment = ExtractSchemaTypes<typeof DescribeDeploymentSchema>

/* ListDeployments */

export const ListDeploymentsSchema = defineSchema({
  Path: '/deployments',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.partial({ applicationName: t.string, deploymentTag: t.string }),
  Event: t.type({
    name: t.literal(InstallerEventNames.listDeployments),
    payload: t.intersection([
      t.type({
        userId: t.string,
      }),
      t.partial({
        applicationName: t.string,
      }),
    ]),
  }),
  Result: t.array(DeploymentSchema),
  ArgumentsTransformer: ({ applicationName, deploymentTag } = {}) => ({
    params: {},
    body: {},
    query: { applicationName, deploymentTag },
  }),
})

export type ListDeployments = ExtractSchemaTypes<typeof ListDeploymentsSchema>

/* GetDeploymentUploadSignedUrl */

export const GetDeploymentUploadSignedUrlSchema = defineSchema({
  Path: '/deployments/:deploymentId/upload',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getDeploymentUploadSignedUrl),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.type({
    codeUploadUrl: t.string,
    staticUploadUrl: t.string,
  }),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type GetDeploymentUploadSignedUrl = ExtractSchemaTypes<
  typeof GetDeploymentUploadSignedUrlSchema
>

/* SetDeploymentDomain */

export const SetDeploymentDomainSchema = defineSchema({
  Path: '/deployments/:deploymentId/domain',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({ domain: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.setDeploymentDomain),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
      domain: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, domain }) => ({
    params: { deploymentId },
    body: { domain },
    query: {},
  }),
})

export type SetDeploymentDomain = ExtractSchemaTypes<typeof SetDeploymentDomainSchema>

/* UnsetDeploymentDomain */

export const UnsetDeploymentDomainSchema = defineSchema({
  Path: '/deployments/:deploymentId/domain',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({ domain: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.unsetDeploymentDomain),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
      domain: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, domain }) => ({
    params: { deploymentId },
    body: { domain },
    query: {},
  }),
})

export type UnsetDeploymentDomain = ExtractSchemaTypes<typeof UnsetDeploymentDomainSchema>

/* SetDeploymentTag */

export const SetDeploymentTagSchema = defineSchema({
  Path: '/deployments/:deploymentId/tag',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({ deploymentTag: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.setDeploymentTag),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
      deploymentTag: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, deploymentTag }) => ({
    params: { deploymentId },
    body: { deploymentTag },
    query: {},
  }),
})

export type SetDeploymentTag = ExtractSchemaTypes<typeof SetDeploymentTagSchema>

/* UnsetDeploymentTag */

export const UnsetDeploymentTagSchema = defineSchema({
  Path: '/deployments/:deploymentId/tag',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.unsetDeploymentTag),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type UnsetDeploymentTag = ExtractSchemaTypes<typeof UnsetDeploymentTagSchema>

/* GetDeploymentByTag */

export const GetDeploymentByTagSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getDeploymentByTag),
    payload: t.type({
      userId: t.string,
      deploymentTag: t.string,
    }),
  }),
  Result: t.union([DeploymentSchema, t.null]),
})

export type GetDeploymentByTag = ExtractSchemaTypes<typeof GetDeploymentByTagSchema>
