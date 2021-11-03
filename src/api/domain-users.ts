import * as t from 'io-ts'

import { defineSchema, DomainUsersSchema, ExtractSchemaTypes } from '../schemas'
import { InstallerEventNames } from '../constants'

/* AddDomainUser */

export const AddDomainUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.addDomainUser),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      user: t.string,
    }),
  }),
  Result: t.void,
})

export type AddDomainUser = ExtractSchemaTypes<typeof AddDomainUserSchema>

/* RemoveDomainUser */

export const RemoveDomainUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.removeDomainUser),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      user: t.string,
    }),
  }),
  Result: t.void,
})

export type RemoveDomainUser = ExtractSchemaTypes<typeof RemoveDomainUserSchema>

/* SetDomainUsers */

export const SetDomainUsersSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.setDomainUsers),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      users: DomainUsersSchema,
    }),
  }),
  Result: t.void,
})

export type SetDomainUsers = ExtractSchemaTypes<typeof SetDomainUsersSchema>
