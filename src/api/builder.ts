import * as t from 'io-ts'

import { BuilderEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

/* BuildCode */

export const BuildCodeSchema = defineSchema({
  Event: t.type({
    name: t.literal(BuilderEventNames.buildCode),
    payload: t.intersection([
      t.type({
        region: t.string,
        bucketName: t.string,
        userId: t.string,
        inputFileKey: t.string,
        outputFileKey: t.string,
      }),
      t.partial({
        npmRegistry: t.string,
      }),
    ]),
  }),
  Result: t.intersection([
    t.type({
      installLog: t.string,
      version: t.string,
    }),
    t.partial({
      routesManifest: t.string,
    }),
  ]),
})

export type BuildCode = ExtractSchemaTypes<typeof BuildCodeSchema>

/* DeployStatic */

export const DeployStaticSchema = defineSchema({
  Event: t.type({
    name: t.literal(BuilderEventNames.deployStatic),
    payload: t.type({
      region: t.string,
      inputBucketName: t.string,
      outputBucketName: t.string,
      userId: t.string,
      fileKey: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.type({
    files: t.array(t.string),
  }),
})

export type DeployStatic = ExtractSchemaTypes<typeof DeployStaticSchema>
