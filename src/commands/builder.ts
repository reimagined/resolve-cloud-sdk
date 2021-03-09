import * as t from 'io-ts'
import { BuilderEventNames } from '../constants'

export const BuildCodeEventSchema = t.type({
  name: t.literal(BuilderEventNames.buildCode),
  payload: t.intersection([
    t.type({
      region: t.string,
      bucketName: t.string,
      userId: t.string,
      version: t.string,
      inputFileKey: t.string,
      outputFileKey: t.string,
    }),
    t.partial({
      npmRegistry: t.string,
    }),
  ]),
})

export type BuildCodeEvent = t.TypeOf<typeof BuildCodeEventSchema>

export const BuildCodeResultSchema = t.type({
  installLog: t.string,
})

export type BuildCodeResult = t.TypeOf<typeof BuildCodeResultSchema>

export const DeployStaticEventSchema = t.type({
  name: t.literal(BuilderEventNames.deployStatic),
  payload: t.type({
    region: t.string,
    inputBucketName: t.string,
    outputBucketName: t.string,
    userId: t.string,
    version: t.string,
    fileKey: t.string,
    deploymentId: t.string,
  }),
})

export type DeployStaticEvent = t.TypeOf<typeof DeployStaticEventSchema>

export const DeployStaticResultSchema = t.type({
  files: t.array(t.string),
})

export type DeployStaticResult = t.TypeOf<typeof DeployStaticResultSchema>
