import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import {
  defineSchema,
  ExtractSchemaTypes,
  DomainSchema,
  DomainUsersSchema,
  VirtualHostsSchema,
} from '../schemas'

/* AddDomainUser */

export const AddDomainUserSchema = defineSchema({
  Path: '/domains/:domainId/users',
  Method: 'POST',
  Mode: 'ASYNC',
  Params: t.type({ domainId: t.string }),
  Body: t.type({ userId: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.addDomainUser),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      user: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domainId, userId }) => ({
    params: { domainId },
    body: { userId },
    query: {},
  }),
})

export type AddDomainUser = ExtractSchemaTypes<typeof AddDomainUserSchema>

/* CreateDomain */

export const CreateDomainSchema = defineSchema({
  Path: '/domains',
  Method: 'POST',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.intersection([
    t.type({
      certificateId: t.string,
      aliases: t.array(t.string),
    }),
    t.partial({
      domainId: t.string,
    }),
  ]),
  Query: t.type({}),
  Event: t.type({
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
  }),
  Result: DomainSchema,
  ArgumentsTransformer: ({ certificateId, aliases, domainId }) => ({
    params: {},
    body: { certificateId, aliases, domainId },
    query: {},
  }),
})

export type CreateDomain = ExtractSchemaTypes<typeof CreateDomainSchema>

/* DropDomain */

export const DropDomainSchema = defineSchema({
  Path: '/domains/:domainId',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ domainId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.dropDomain),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domainId }) => ({
    params: { domainId },
    body: {},
    query: {},
  }),
})

export type DropDomain = ExtractSchemaTypes<typeof DropDomainSchema>

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

/* GetVerificationCode */

export const GetVerificationCodeSchema = defineSchema({
  Path: '/domains/:domainId/verification-code',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ domainId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.getVerificationCode),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
    }),
  }),
  Result: t.type({
    VerificationCode: t.string,
  }),
  ArgumentsTransformer: ({ domainId }) => ({
    params: { domainId },
    body: {},
    query: {},
  }),
})

export type GetVerificationCode = ExtractSchemaTypes<typeof GetVerificationCodeSchema>

/* ListDomains */

export const ListDomainsSchema = defineSchema({
  Path: '/domains',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.listDomains),
    payload: t.intersection([
      t.type({
        userId: t.string,
      }),
      t.partial({
        domain: t.string,
      }),
    ]),
  }),
  Result: t.array(DomainSchema),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type ListDomains = ExtractSchemaTypes<typeof ListDomainsSchema>

/* RemoveDomainUser */

export const RemoveDomainUserSchema = defineSchema({
  Path: '/domains/:domainId/users/:userId',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({
    userId: t.string,
    domainId: t.string,
  }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.removeDomainUser),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      user: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domainId, userId }) => ({
    params: { domainId, userId },
    body: {},
    query: {},
  }),
})

export type RemoveDomainUser = ExtractSchemaTypes<typeof RemoveDomainUserSchema>

/* SetDomainUsers */

export const SetDomainUsersSchema = defineSchema({
  Path: '/domains/:domainId/users',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({
    domainId: t.string,
  }),
  Body: t.type({
    users: DomainUsersSchema,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.setDomainUsers),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
      users: DomainUsersSchema,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domainId, users }) => ({
    params: { domainId },
    body: { users },
    query: {},
  }),
})

export type SetDomainUsers = ExtractSchemaTypes<typeof SetDomainUsersSchema>

/* VerifyDomain */

export const VerifyDomainSchema = defineSchema({
  Path: '/domains/:domainId/verify',
  Method: 'PATCH',
  Mode: 'ASYNC',
  Params: t.type({
    domainId: t.string,
  }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.verifyDomain),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domainId }) => ({
    params: { domainId },
    body: {},
    query: {},
  }),
})

export type VerifyDomain = ExtractSchemaTypes<typeof VerifyDomainSchema>

/* ReleaseDomain */

export const ReleaseDomainSchema = defineSchema({
  Path: '/domains',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.type({ domain: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.releaseDomain),
    payload: t.type({
      userId: t.string,
      domain: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ domain }) => ({
    params: {},
    body: { domain },
    query: {},
  }),
})

export type ReleaseDomain = ExtractSchemaTypes<typeof ReleaseDomainSchema>

/* SetVirtualHost */

export const SetVirtualHostSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.setVirtualHost),
    payload: t.intersection([
      t.type({
        userId: t.string,
        domainId: t.string,
        virtualHost: t.string,
        functionArn: t.string,
      }),
      t.partial({
        routesManifest: t.string,
      }),
    ]),
  }),
  Result: t.void,
})

export type SetVirtualHost = ExtractSchemaTypes<typeof SetVirtualHostSchema>

/* UnsetVirtualHost */

export const UnsetVirtualHostSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.unsetVirtualHost),
    payload: t.intersection([
      t.type({
        userId: t.string,
        domainId: t.string,
      }),
      t.partial({ virtualHost: t.string, functionArn: t.string }),
    ]),
  }),
  Result: t.void,
})

export type UnsetVirtualHost = ExtractSchemaTypes<typeof UnsetVirtualHostSchema>

/* ListVirtualHosts */

export const ListVirtualHostsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.listVirtualHosts),
    payload: t.type({
      userId: t.string,
      domainId: t.string,
    }),
  }),
  Result: VirtualHostsSchema,
})

export type ListVirtualHosts = ExtractSchemaTypes<typeof ListVirtualHostsSchema>
