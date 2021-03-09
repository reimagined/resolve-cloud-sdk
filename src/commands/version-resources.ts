import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'

/* GetAssetsStageBucketUploadSignedUrls */

export const GetAssetsStageBucketUploadSignedUrlsEventSchema = t.type({
  name: t.literal(InstallerEventNames.getAssetsStageBucketUploadSignedUrls),
  payload: t.type({
    assets: t.array(t.string),
  }),
})

export type GetAssetsStageBucketUploadSignedUrlsEvent = t.TypeOf<
  typeof GetAssetsStageBucketUploadSignedUrlsEventSchema
>

export const GetAssetsStageBucketUploadSignedUrlsResultSchema = t.record(t.string, t.string)

export type GetAssetsStageBucketUploadSignedUrlsResult = t.TypeOf<
  typeof GetAssetsStageBucketUploadSignedUrlsResultSchema
>

/* GetAssetsVersionBucketUploadSignedUrls */

export const GetAssetsVersionBucketUploadSignedUrlsEventSchema = t.type({
  name: t.literal(InstallerEventNames.getAssetsVersionBucketUploadSignedUrls),
  payload: t.type({
    version: t.string,
    assets: t.array(t.string),
  }),
})

export type GetAssetsVersionBucketUploadSignedUrlsEvent = t.TypeOf<
  typeof GetAssetsVersionBucketUploadSignedUrlsEventSchema
>

export const GetAssetsVersionBucketUploadSignedUrlsResultSchema = t.record(t.string, t.string)

export type GetAssetsVersionBucketUploadSignedUrlsResult = t.TypeOf<
  typeof GetAssetsVersionBucketUploadSignedUrlsResultSchema
>

/* InstallAssetsBucket */

export const InstallAssetsBucketEventSchema = t.type({
  name: t.literal(InstallerEventNames.installAssetsBucket),
  payload: t.UnknownRecord,
})

export type InstallAssetsBucketEvent = t.TypeOf<typeof InstallAssetsBucketEventSchema>

export const InstallAssetsBucketResultSchema = t.void

export type InstallAssetsBucketResult = t.TypeOf<typeof InstallAssetsBucketResultSchema>

/* InstallVersionResources */

export const InstallVersionResourcesEventSchema = t.type({
  name: t.literal(InstallerEventNames.installVersionResources),
  payload: t.type({
    version: t.string,
  }),
})

export type InstallVersionResourcesEvent = t.TypeOf<typeof InstallVersionResourcesEventSchema>

export const InstallVersionResourcesResultSchema = t.void

export type InstallVersionResourcesResult = t.TypeOf<typeof InstallVersionResourcesResultSchema>

/* UninstallAssetsBucket */

export const UninstallAssetsBucketEventSchema = t.type({
  name: t.literal(InstallerEventNames.uninstallAssetsBucket),
  payload: t.type({
    skipS3: t.boolean,
  }),
})

export type UninstallAssetsBucketEvent = t.TypeOf<typeof UninstallAssetsBucketEventSchema>

export const UninstallAssetsBucketResultSchema = t.void

export type UninstallAssetsBucketResult = t.TypeOf<typeof UninstallAssetsBucketResultSchema>

/* UninstallVersionAssetsFolder */

export const UninstallVersionAssetsFolderEventSchema = t.type({
  name: t.literal(InstallerEventNames.uninstallVersionAssetsFolder),
  payload: t.type({
    version: t.string,
  }),
})

export type UninstallVersionAssetsFolderEvent = t.TypeOf<
  typeof UninstallVersionAssetsFolderEventSchema
>

export const UninstallVersionAssetsFolderResultSchema = t.void

export type UninstallVersionAssetsFolderResult = t.TypeOf<
  typeof UninstallVersionAssetsFolderResultSchema
>

/* UninstallVersionResources */

export const UninstallVersionResourcesEventSchema = t.type({
  name: t.literal(InstallerEventNames.uninstallVersionResources),
  payload: t.type({
    version: t.string,
  }),
})

export type UninstallVersionResourcesEvent = t.TypeOf<typeof UninstallVersionResourcesEventSchema>

export const UninstallVersionResourcesResultSchema = t.void

export type UninstallVersionResourcesResult = t.TypeOf<typeof UninstallVersionResourcesResultSchema>
