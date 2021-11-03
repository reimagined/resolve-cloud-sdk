import * as t from 'io-ts'

import { defineSchema, DomainSchema, ExtractSchemaTypes } from '../schemas'
import { InstallerEventNames } from '../constants'

/* GetDomain */

export const GetDomainSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getDomain),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
    }),
  }),
  Result: DomainSchema,
})

export type GetDomain = ExtractSchemaTypes<typeof GetDomainSchema>
