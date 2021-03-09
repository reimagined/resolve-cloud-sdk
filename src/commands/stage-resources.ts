import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'

/* InstallStageResources */

export const InstallStageResourcesEventSchema = t.type({
  name: t.literal(InstallerEventNames.installStageResources),
  payload: t.UnknownRecord,
})

export type InstallStageResourcesEvent = t.TypeOf<typeof InstallStageResourcesEventSchema>

export const InstallStageResourcesResultSchema = t.void

export type InstallStageResourcesResult = t.TypeOf<typeof InstallStageResourcesResultSchema>

/* UninstallStageResources */

export const UninstallStageResourcesEventSchema = t.type({
  name: t.literal(InstallerEventNames.uninstallStageResources),
  payload: t.type({
    skipS3: t.boolean,
  }),
})

export type UninstallStageResourcesEvent = t.TypeOf<typeof UninstallStageResourcesEventSchema>

export const UninstallStageResourcesResultSchema = t.void

export type UninstallStageResourcesResult = t.TypeOf<typeof UninstallStageResourcesResultSchema>
