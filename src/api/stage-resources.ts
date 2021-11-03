import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

/* InstallStageResources */

export const InstallStageResourcesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.installStageResources),
    payload: t.UnknownRecord,
  }),
  Result: t.void,
})

export type InstallStageResources = ExtractSchemaTypes<typeof InstallStageResourcesSchema>

/* UninstallStageResources */

export const UninstallStageResourcesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.uninstallStageResources),
    payload: t.type({
      skipS3: t.boolean,
    }),
  }),
  Result: t.void,
})

export type UninstallStageResources = ExtractSchemaTypes<typeof UninstallStageResourcesSchema>
