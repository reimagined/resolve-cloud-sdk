import * as t from 'io-ts'

import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes, DomainSchema } from '../../schemas'

const Namespace = 'Domains'

/* CreateDomain */

export const CreateDomainSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/domains',
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
  Namespace,
  Description: '',
  Path: '/v0/domains/:domainId',
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

/* ReleaseDomain */

export const ReleaseDomainSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/domains',
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

/* ListDomains */

export const ListDomainsSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/domains',
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

/* VerifyDomain */

export const VerifyDomainSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/domains/:domainId/verify',
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

/* GetVerificationCode */

export const GetVerificationCodeSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/domains/:domainId/verification-code',
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
    verificationCode: t.string,
  }),
  ArgumentsTransformer: ({ domainId }) => ({
    params: { domainId },
    body: {},
    query: {},
  }),
})

export type GetVerificationCode = ExtractSchemaTypes<typeof GetVerificationCodeSchema>
