import * as t from 'io-ts'

import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes, CertificateSchema } from '../../schemas'

const Namespace = 'Certificates'

/* EnsureCertificate */

export const EnsureCertificateSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/certificates',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({}),
  Body: t.intersection([
    t.type({
      certificate: t.string,
      key: t.string,
    }),
    t.partial({
      certificateId: t.string,
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
  ArgumentsTransformer: ({ certificateId, certificate, key, chain }) => ({
    params: {},
    body: { certificateId, certificate, key, chain },
    query: {},
  }),
})

export type EnsureCertificate = ExtractSchemaTypes<typeof EnsureCertificateSchema>

/* DropCertificate */

export const DropCertificateSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/certificates/:certificateId',
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
  ArgumentsTransformer: ({ certificateId }) => ({
    params: { certificateId },
    body: {},
    query: {},
  }),
})

export type DropCertificate = ExtractSchemaTypes<typeof DropCertificateSchema>

/* ListCertificates */

export const ListCertificatesSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/certificates',
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
