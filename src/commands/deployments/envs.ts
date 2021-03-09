import * as t from 'io-ts'
import { InstallerEventNames } from '../../constants'

/* ListEnvironmentVariables */

export const ListEnvironmentVariablesEventSchema = t.type({
  name: t.literal(InstallerEventNames.listEnvironmentVariables),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type ListEnvironmentVariablesEvent = t.TypeOf<typeof ListEnvironmentVariablesEventSchema>

export const ListEnvironmentVariablesResultSchema = t.record(t.string, t.string)

export type ListEnvironmentVariablesResult = t.TypeOf<typeof ListEnvironmentVariablesResultSchema>

/* UpdateEnvironmentVariables */

export const UpdateEnvironmentVariablesEventSchema = t.type({
  name: t.literal(InstallerEventNames.updateEnvironmentVariables),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    variables: t.record(t.string, t.union([t.string, t.null])),
  }),
})

export type UpdateEnvironmentVariablesEvent = t.TypeOf<typeof UpdateEnvironmentVariablesEventSchema>

export const UpdateEnvironmentVariablesResultSchema = t.void

export type UpdateEnvironmentVariablesResult = t.TypeOf<
  typeof UpdateEnvironmentVariablesResultSchema
>
