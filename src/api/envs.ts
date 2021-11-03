import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes } from '../schemas'
import { InstallerEventNames } from '../constants'

/* UpdateEnvironmentVariables */

export const UpdateEnvironmentVariablesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.updateEnvironmentVariables),
    payload: t.type({
      deploymentId: t.string,
      userId: t.string,
      variables: t.record(t.string, t.union([t.string, t.null])),
    }),
  }),
  Result: t.void,
})
export type UpdateEnvironmentVariables = ExtractSchemaTypes<typeof UpdateEnvironmentVariablesSchema>
