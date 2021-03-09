import * as t from 'io-ts'
import { FactoryEventNames } from '../../constants'
import { RDSUserSchema } from '../../schemas'

export const CreateReadModelEventSchema = t.type({
  name: t.literal(FactoryEventNames.createReadModel),
  payload: t.type({
    deploymentId: t.string,
    user: RDSUserSchema,
    readModelsClusterArn: t.string,
    postgresAdminSecretArn: t.string,
  }),
})

export type CreateReadModelEvent = t.TypeOf<typeof CreateReadModelEventSchema>

export const DropReadModelEventSchema = t.type({
  name: t.literal(FactoryEventNames.dropReadModel),
  payload: t.type({
    deploymentId: t.string,
    user: RDSUserSchema,
    readModelsClusterArn: t.string,
    postgresAdminSecretArn: t.string,
  }),
})

export type DropReadModelEvent = t.TypeOf<typeof DropReadModelEventSchema>

export const ListReadModelsEventSchema = t.type({
  name: t.literal(FactoryEventNames.listReadModels),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type ListReadModelsEvent = t.TypeOf<typeof ListReadModelsEventSchema>

export const PauseReadModelEventSchema = t.type({
  name: t.literal(FactoryEventNames.pauseReadModel),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type PauseReadModelEvent = t.TypeOf<typeof PauseReadModelEventSchema>

export const ResetReadModelEventSchema = t.type({
  name: t.literal(FactoryEventNames.resetReadModel),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type ResetReadModelEvent = t.TypeOf<typeof ResetReadModelEventSchema>

export const ResumeReadModelEventSchema = t.type({
  name: t.literal(FactoryEventNames.resumeReadModel),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type ResumeReadModelEvent = t.TypeOf<typeof ResumeReadModelEventSchema>
