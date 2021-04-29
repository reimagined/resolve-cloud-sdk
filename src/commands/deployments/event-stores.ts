import * as t from 'io-ts'
import { FactoryEventNames } from '../../constants'

/* LinkDeployment */

export const LinkDeploymentEventSchema = t.type({
  name: t.literal(FactoryEventNames.linkDeployment),
  payload: t.type({
    userId: t.string,
    eventStoreId: t.string,
    deploymentId: t.string,
  }),
})

export type LinkDeploymentEvent = t.TypeOf<typeof LinkDeploymentEventSchema>

export const LinkDeploymentResultSchema = t.void

export type LinkDeploymentResult = t.TypeOf<typeof LinkDeploymentResultSchema>

/* UnlinkDeployment */

export const UnlinkDeploymentEventSchema = t.type({
  name: t.literal(FactoryEventNames.unlinkDeployment),
  payload: t.type({
    userId: t.string,
    eventStoreId: t.string,
    deploymentId: t.string,
  }),
})

export type UnlinkDeploymentEvent = t.TypeOf<typeof UnlinkDeploymentEventSchema>

export const UnlinkDeploymentResultSchema = t.void

export type UnlinkDeploymentResult = t.TypeOf<typeof UnlinkDeploymentResultSchema>
