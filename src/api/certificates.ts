import * as t from 'io-ts'

import { CertificateSchema, defineSchema, ExtractSchemaTypes } from '../schemas'
import { InstallerEventNames } from '../constants'

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
