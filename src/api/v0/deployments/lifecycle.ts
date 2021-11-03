import * as t from 'io-ts'

import { FactoryEventNames, InstallerEventNames } from '../../../constants'
import { defineSchema, ExtractSchemaTypes, DeploymentSchema } from '../../../schemas'

const Namespace = 'Deployments'

/* CreateDeployment */

export const CreateDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments',
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
      domain: t.string,
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
  ArgumentsTransformer: (args) => ({
    params: {},
    body: args,
    query: {},
  }),
})

export type CreateDeployment = ExtractSchemaTypes<typeof CreateDeploymentSchema>

/* DropDeployment */

export const DropDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId',
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

/* ListDeployments */

export const ListDeploymentsSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.partial({ applicationName: t.string }),
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
  ArgumentsTransformer: ({ applicationName } = {}) => ({
    params: {},
    body: {},
    query: { applicationName },
  }),
})

export type ListDeployments = ExtractSchemaTypes<typeof ListDeploymentsSchema>

/* DescribeDeployment */

export const DescribeDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId',
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

/* BootstrapDeployment */

export const BootstrapDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/bootstrap',
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
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/shutdown',
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

/* Build Deployment */

export const BuildDeploymentSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/upload',
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

/* GetDeploymentUploadSignedUrl */

export const GetDeploymentUploadSignedUrlSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/upload',
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
