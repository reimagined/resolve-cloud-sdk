import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes } from '../schemas'
import { InstallerEventNames } from '../constants'

/* EnsureRuntime */

export const EnsureRuntimeSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.ensureRuntime),
    payload: t.type({
      version: t.string,
    }),
  }),
  Result: t.type({
    layerVersionArn: t.string,
  }),
})

export type EnsureRuntime = ExtractSchemaTypes<typeof EnsureRuntimeSchema>

/* SwitchApplicationsRuntime */

export const SwitchApplicationsRuntimeSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.switchApplicationsRuntime),
    payload: t.intersection([
      t.type({
        version: t.string,
      }),
      t.partial({
        layerVersionArn: t.string,
      }),
    ]),
  }),
  Result: t.type({
    updatedFunctions: t.array(t.string),
  }),
})

export type SwitchApplicationsRuntime = ExtractSchemaTypes<typeof SwitchApplicationsRuntimeSchema>

/* FindRuntime */

export const FindRuntimeSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.findRuntime),
    payload: t.intersection([
      t.type({
        version: t.string,
      }),
      t.partial({
        layerVersionArn: t.string,
      }),
    ]),
  }),
  Result: t.type({
    layerVersionArn: t.union([t.string, t.null]),
  }),
})

export type FindRuntime = ExtractSchemaTypes<typeof FindRuntimeSchema>
