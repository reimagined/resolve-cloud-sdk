import * as t from 'io-ts'
import { FactoryEventNames, InstallerEventNames } from '../../constants'
import { DeploymentSchema, Deployment } from '../../schemas'

/* BootstrapDeployment */

export const BootstrapDeploymentEventSchema = t.type({
  name: t.literal(FactoryEventNames.bootstrapDeployment),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type BootstrapDeploymentEvent = t.TypeOf<typeof BootstrapDeploymentEventSchema>

/* BuildDeployment */

export const BuildDeploymentEventSchema = t.type({
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
})

export type BuildDeploymentEvent = t.TypeOf<typeof BuildDeploymentEventSchema>

export const BuildDeploymentResultSchema = t.type({
  installLog: t.string,
  files: t.array(t.string),
})

export type BuildDeploymentResult = t.TypeOf<typeof BuildDeploymentResultSchema>

/* CreateDeployment */

export const CreateDeploymentEventSchema = t.type({
  name: t.literal(InstallerEventNames.createDeployment),
  payload: t.intersection([
    t.type({
      userId: t.string,
      applicationName: t.string,
      version: t.string,
      eventStoreId: t.string,
      eventStoreDatabaseName: t.string,
      eventBusLambdaArn: t.string,
      eventBusDatabaseName: t.string,
    }),
    t.partial({
      domain: t.string,
      deploymentTag: t.string,
    }),
  ]),
})

export type CreateDeploymentEvent = t.TypeOf<typeof CreateDeploymentEventSchema>

export const CreateDeploymentResultSchema = DeploymentSchema
export type CreateDeploymentResult = Deployment

/* DropDeployment */

export const DropDeploymentEventSchema = t.type({
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
})

export type DropDeploymentEvent = t.TypeOf<typeof DropDeploymentEventSchema>

export const DropDeploymentResultSchema = t.void

export type DropDeploymentResult = t.TypeOf<typeof DropDeploymentResultSchema>

/* GetDeploymentByApplicationName */

export const GetDeploymentByApplicationNameEventSchema = t.type({
  name: t.literal(InstallerEventNames.getDeploymentByApplicationName),
  payload: t.type({
    userId: t.string,
    applicationName: t.string,
    version: t.string,
  }),
})

export type GetDeploymentByApplicationNameEvent = t.TypeOf<
  typeof GetDeploymentByApplicationNameEventSchema
>

export const GetDeploymentByApplicationNameResultSchema = t.union([DeploymentSchema, t.null])

export type GetDeploymentByApplicationNameResult = t.TypeOf<
  typeof GetDeploymentByApplicationNameResultSchema
>

/* GetDeploymentByTag */

export const GetDeploymentByTagEventSchema = t.type({
  name: t.literal(InstallerEventNames.getDeploymentByTag),
  payload: t.type({
    userId: t.string,
    deploymentTag: t.string,
  }),
})

export type GetDeploymentByTagEvent = t.TypeOf<typeof GetDeploymentByTagEventSchema>

export const GetDeploymentByTagResultSchema = t.union([DeploymentSchema, t.null])

export type GetDeploymentByTagResult = t.TypeOf<typeof GetDeploymentByTagResultSchema>

/* GetDeploymentUploadSignedUrl */

export const GetDeploymentUploadSignedUrlEventSchema = t.type({
  name: t.literal(InstallerEventNames.getDeploymentUploadSignedUrl),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type GetDeploymentUploadSignedUrlEvent = t.TypeOf<
  typeof GetDeploymentUploadSignedUrlEventSchema
>

export const GetDeploymentUploadSignedUrlResultSchema = t.type({
  codeUploadUrl: t.string,
  staticUploadUrl: t.string,
})

export type GetDeploymentUploadSignedUrlResult = t.TypeOf<
  typeof GetDeploymentUploadSignedUrlResultSchema
>

/* DescribeDeployment */

export const DescribeDeploymentEventSchema = t.type({
  name: t.literal(InstallerEventNames.describeDeployment),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type DescribeDeploymentEvent = t.TypeOf<typeof DescribeDeploymentEventSchema>

export const DescribeDeploymentResultSchema = DeploymentSchema

export type DescribeDeploymentResult = t.TypeOf<typeof DescribeDeploymentResultSchema>

/* ListDeployments */

export const ListDeploymentsEventSchema = t.type({
  name: t.literal(InstallerEventNames.listDeployments),
  payload: t.intersection([
    t.type({
      userId: t.string,
    }),
    t.partial({
      applicationName: t.string,
    }),
  ]),
})

export type ListDeploymentsEvent = t.TypeOf<typeof ListDeploymentsEventSchema>

export const ListDeploymentsResultSchema = t.array(DeploymentSchema)

export type ListDeploymentsResult = t.TypeOf<typeof ListDeploymentsResultSchema>

/* ShutdownDeployment */

export const ShutdownDeploymentEventSchema = t.type({
  name: t.literal(FactoryEventNames.shutdownDeployment),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type ShutdownDeploymentEvent = t.TypeOf<typeof ShutdownDeploymentEventSchema>

/* SetDeploymentDomain */

export const SetDeploymentDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.setDeploymentDomain),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
    domain: t.string,
  }),
})

export type SetDeploymentDomainEvent = t.TypeOf<typeof SetDeploymentDomainEventSchema>

export const SetDeploymentDomainResultSchema = t.void

export type SetDeploymentDomainResult = t.TypeOf<typeof SetDeploymentDomainResultSchema>

/* UnsetDeploymentDomain */

export const UnsetDeploymentDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.unsetDeploymentDomain),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type UnsetDeploymentDomainEvent = t.TypeOf<typeof UnsetDeploymentDomainEventSchema>

export const UnsetDeploymentDomainResultSchema = t.void

export type UnsetDeploymentDomainResult = t.TypeOf<typeof UnsetDeploymentDomainResultSchema>

/* SetDeploymentTag */

export const SetDeploymentTagEventSchema = t.type({
  name: t.literal(InstallerEventNames.setDeploymentTag),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
    deploymentTag: t.string,
  }),
})

export type SetDeploymentTagEvent = t.TypeOf<typeof SetDeploymentTagEventSchema>

export const SetDeploymentTagResultSchema = t.void

export type SetDeploymentTagResult = t.TypeOf<typeof SetDeploymentTagResultSchema>

/* UnsetDeploymentTag */

export const UnsetDeploymentTagEventSchema = t.type({
  name: t.literal(InstallerEventNames.unsetDeploymentTag),
  payload: t.type({
    userId: t.string,
    deploymentId: t.string,
  }),
})

export type UnsetDeploymentTagEvent = t.TypeOf<typeof UnsetDeploymentTagEventSchema>

export const UnsetDeploymentTagResultSchema = t.void

export type UnsetDeploymentTagResult = t.TypeOf<typeof UnsetDeploymentTagResultSchema>
