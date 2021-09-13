import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes, CertificateSchema } from '../schemas'

/* DropCertificate */

export const DropCertificateSchema = defineSchema({
  Path: '/certificates/:certificateId',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ certificateId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.dropCertificate),
    payload: t.type({
      userId: t.string,
      certificateId: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ certificateId } = {}) => ({
    params: { certificateId },
    body: {},
    query: {},
  }),
})

export type DropCertificate = ExtractSchemaTypes<typeof DropCertificateSchema>

/* EnsureCertificate */

export const EnsureCertificateSchema = defineSchema({
  Path: '/certificates',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.intersection([
    t.type({
      certificate: t.string,
      key: t.string,
    }),
    t.partial({
      id: t.string,
      chain: t.string,
    }),
  ]),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.ensureCertificate),
    payload: t.intersection([
      t.type({
        userId: t.string,
        certificate: t.string,
        key: t.string,
      }),
      t.partial({
        certificateId: t.string,
        chain: t.string,
      }),
    ]),
  }),
  Result: t.string,
  /* Todo id -> certificateId */
  ArgumentsTransformer: ({ id, certificate, key, chain } = {}) => ({
    params: {},
    body: { id, certificate, key, chain },
    query: {},
  }),
})

export type EnsureCertificate = ExtractSchemaTypes<typeof EnsureCertificateSchema>

/* ListCertificates */

export const ListCertificatesSchema = defineSchema({
  Path: '/certificates',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.listCertificates),
    payload: t.type({
      userId: t.string,
    }),
  }),
  Result: t.array(CertificateSchema),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type ListCertificates = ExtractSchemaTypes<typeof ListCertificatesSchema>

/* GetCertificateById */

export const GetCertificateByIdSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getCertificateById),
    payload: t.type({
      userId: t.string,
      certificateId: t.string,
    }),
  }),
  Result: CertificateSchema,
})

export type GetCertificateById = ExtractSchemaTypes<typeof GetCertificateByIdSchema>

/* GetCertificateByDomainName */

export const GetCertificateByDomainNameSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getCertificateByDomainName),
    payload: t.type({
      userId: t.string,
      domainName: t.string,
    }),
  }),
  Result: CertificateSchema,
})

export type GetCertificateByDomainName = ExtractSchemaTypes<typeof GetCertificateByDomainNameSchema>
