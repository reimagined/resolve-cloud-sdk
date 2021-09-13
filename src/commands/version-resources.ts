import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

/* GetAssetsStageBucketUploadSignedUrls */

export const GetAssetsStageBucketUploadSignedUrlsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getAssetsStageBucketUploadSignedUrls),
    payload: t.type({
      assets: t.array(t.string),
    }),
  }),
  Result: t.record(t.string, t.string),
})

export type GetAssetsStageBucketUploadSignedUrls = ExtractSchemaTypes<
  typeof GetAssetsStageBucketUploadSignedUrlsSchema
>

/* GetAssetsVersionBucketUploadSignedUrls */

export const GetAssetsVersionBucketUploadSignedUrlsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getAssetsVersionBucketUploadSignedUrls),
    payload: t.type({
      version: t.string,
      assets: t.array(t.string),
    }),
  }),
  Result: t.record(t.string, t.string),
})

export type GetAssetsVersionBucketUploadSignedUrls = ExtractSchemaTypes<
  typeof GetAssetsVersionBucketUploadSignedUrlsSchema
>

/* InstallAssetsBucket */

export const InstallAssetsBucketSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.installAssetsBucket),
    payload: t.UnknownRecord,
  }),
  Result: t.void,
})

export type InstallAssetsBucket = ExtractSchemaTypes<typeof InstallAssetsBucketSchema>

/* InstallVersionResources */

export const InstallVersionResourcesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.installVersionResources),
    payload: t.type({
      version: t.string,
    }),
  }),
  Result: t.void,
})

export type InstallVersionResources = ExtractSchemaTypes<typeof InstallVersionResourcesSchema>

/* UninstallAssetsBucket */

export const UninstallAssetsBucketSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.uninstallAssetsBucket),
    payload: t.type({
      skipS3: t.boolean,
    }),
  }),
  Result: t.void,
})

export type UninstallAssetsBucket = ExtractSchemaTypes<typeof UninstallAssetsBucketSchema>

/* UninstallVersionAssetsFolder */

export const UninstallVersionAssetsFolderSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.uninstallVersionAssetsFolder),
    payload: t.type({
      version: t.string,
    }),
  }),
  Result: t.void,
})

export type UninstallVersionAssetsFolder = ExtractSchemaTypes<
  typeof UninstallVersionAssetsFolderSchema
>

/* UninstallVersionResources */

export const UninstallVersionResourcesSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.uninstallVersionResources),
    payload: t.type({
      version: t.string,
    }),
  }),
  Result: t.void,
})

export type UninstallVersionResources = ExtractSchemaTypes<typeof UninstallVersionResourcesSchema>
