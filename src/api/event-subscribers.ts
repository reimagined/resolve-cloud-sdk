import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes } from '../schemas'
import { FactoryEventNames } from '../constants'

/* DropEventSubscribers */

export const DropEventSubscribersSchema = defineSchema({
  Event: t.type({
    name: t.literal(FactoryEventNames.dropEventSubscribers),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
    }),
  }),
  Result: t.void,
})

export type DropEventSubscribers = ExtractSchemaTypes<typeof DropEventSubscribersSchema>
