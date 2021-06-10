import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { DomainSchema, DomainUsersSchema, VirtualHostsSchema } from '../schemas'

/* AddDomainUser */

export const AddDomainUserEventSchema = t.type({
  name: t.literal(InstallerEventNames.addDomainUser),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
    user: t.string,
  }),
})

export type AddDomainUserEvent = t.TypeOf<typeof AddDomainUserEventSchema>

export const AddDomainUserResultSchema = t.void

export type AddDomainUserResult = t.TypeOf<typeof AddDomainUserResultSchema>

/* CreateDomain */

export const CreateDomainEventSchema = t.type({
  name: t.union([
    t.literal(InstallerEventNames.createStaticDomain),
    t.literal(InstallerEventNames.createProxyDomain),
    t.literal(InstallerEventNames.createUploaderDomain),
  ]),
  payload: t.intersection([
    t.type({
      userId: t.string,
      certificateId: t.string,
    }),
    t.partial({
      aliases: t.array(t.string),
      domainId: t.string,
      customName: t.string,
      users: t.union([t.literal('*'), t.array(t.string)]),
      verification: t.boolean,
    }),
  ]),
})
export type CreateDomainEvent = t.TypeOf<typeof CreateDomainEventSchema>

export const CreateDomainResultSchema = DomainSchema

export type CreateDomainResult = t.TypeOf<typeof CreateDomainResultSchema>

/* DropDomain */

export const DropDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.dropDomain),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
  }),
})

export type DropDomainEvent = t.TypeOf<typeof DropDomainEventSchema>

export const DropDomainResultSchema = t.void

export type DropDomainResult = t.TypeOf<typeof DropDomainResultSchema>

/* GetDomain */

export const GetDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.getDomain),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
  }),
})

export type GetDomainEvent = t.TypeOf<typeof GetDomainEventSchema>

export const GetDomainResultSchema = DomainSchema

export type GetDomainResult = t.TypeOf<typeof GetDomainResultSchema>

/* GetVerificationCode */

export const GetVerificationCodeEventSchema = t.type({
  name: t.literal(InstallerEventNames.getVerificationCode),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
  }),
})

export type GetVerificationCodeEvent = t.TypeOf<typeof GetVerificationCodeEventSchema>

export const GetVerificationCodeResultSchema = t.type({
  VerificationCode: t.string,
})

export type GetVerificationCodeResult = t.TypeOf<typeof GetVerificationCodeResultSchema>

/* ListDomains */

export const ListDomainsEventSchema = t.type({
  name: t.literal(InstallerEventNames.listDomains),
  payload: t.intersection([
    t.type({
      userId: t.string,
    }),
    t.partial({
      domain: t.string,
    }),
  ]),
})

export type ListDomainsEvent = t.TypeOf<typeof ListDomainsEventSchema>

export const ListDomainsResultSchema = t.array(DomainSchema)

export type ListDomainsResult = t.TypeOf<typeof ListDomainsResultSchema>

/* ListVirtualHosts */

export const ListVirtualHostsEventSchema = t.type({
  name: t.literal(InstallerEventNames.listVirtualHosts),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
  }),
})

export type ListVirtualHostsEvent = t.TypeOf<typeof ListVirtualHostsEventSchema>

export const ListVirtualHostsResultSchema = VirtualHostsSchema

export type ListVirtualHostsResult = t.TypeOf<typeof ListVirtualHostsResultSchema>

/* RemoveDomainUser */

export const RemoveDomainUserEventSchema = t.type({
  name: t.literal(InstallerEventNames.removeDomainUser),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
    user: t.string,
  }),
})

export type RemoveDomainUserEvent = t.TypeOf<typeof RemoveDomainUserEventSchema>

export const RemoveDomainUserResultSchema = t.void

export type RemoveDomainUserResult = t.TypeOf<typeof RemoveDomainUserResultSchema>

/* SetDomainUsers */

export const SetDomainUsersEventSchema = t.type({
  name: t.literal(InstallerEventNames.setDomainUsers),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
    users: DomainUsersSchema,
  }),
})

export type SetDomainUsersEvent = t.TypeOf<typeof SetDomainUsersEventSchema>

export const SetDomainUsersResultSchema = t.void

export type SetDomainUsersResult = t.TypeOf<typeof SetDomainUsersResultSchema>

/* SetVirtualHost */

export const SetVirtualHostEventSchema = t.type({
  name: t.literal(InstallerEventNames.setVirtualHost),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
    virtualHost: t.string,
    functionArn: t.string,
  }),
})

export type SetVirtualHostEvent = t.TypeOf<typeof SetVirtualHostEventSchema>

export const SetVirtualHostResultSchema = t.void

export type SetVirtualHostResult = t.TypeOf<typeof SetVirtualHostResultSchema>

/* UnsetVirtualHost */

export const UnsetVirtualHostEventSchema = t.type({
  name: t.literal(InstallerEventNames.unsetVirtualHost),
  payload: t.intersection([
    t.type({
      userId: t.string,
      domainId: t.string,
    }),
    t.partial({ virtualHost: t.string, functionArn: t.string }),
  ]),
})

export type UnsetVirtualHostEvent = t.TypeOf<typeof UnsetVirtualHostEventSchema>

export const UnsetVirtualHostResultSchema = t.void

export type UnsetVirtualHostResult = t.TypeOf<typeof UnsetVirtualHostResultSchema>

/* VerifyDomain */

export const VerifyDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.verifyDomain),
  payload: t.type({
    userId: t.string,
    domainId: t.string,
  }),
})

export type VerifyDomainEvent = t.TypeOf<typeof VerifyDomainEventSchema>

export const VerifyDomainResultSchema = t.void

export type VerifyDomainResult = t.TypeOf<typeof VerifyDomainResultSchema>

/* ReleaseDomain */

export const ReleaseDomainEventSchema = t.type({
  name: t.literal(InstallerEventNames.releaseDomain),
  payload: t.type({
    userId: t.string,
    domain: t.string,
  }),
})

export type ReleaseDomainEvent = t.TypeOf<typeof ReleaseDomainEventSchema>

export const ReleaseDomainResultSchema = t.void

export type ReleaseDomainResult = t.TypeOf<typeof ReleaseDomainResultSchema>
