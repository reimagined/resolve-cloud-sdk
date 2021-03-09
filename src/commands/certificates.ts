import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { CertificateSchema } from '../schemas'

/* DropCertificate */

export const DropCertificateEventSchema = t.type({
  name: t.literal(InstallerEventNames.dropCertificate),
  payload: t.type({
    userId: t.string,
    certificateId: t.string,
  }),
})

export type DropCertificateEvent = t.TypeOf<typeof DropCertificateEventSchema>

export const DropCertificateResultSchema = t.void

export type DropCertificateResult = t.TypeOf<typeof DropCertificateResultSchema>

/* EnsureCertificate */

export const EnsureCertificateEventSchema = t.type({
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
})

export type EnsureCertificateEvent = t.TypeOf<typeof EnsureCertificateEventSchema>

export const EnsureCertificateResultSchema = t.string

export type EnsureCertificateResult = t.TypeOf<typeof EnsureCertificateResultSchema>

/* GetCertificateByDomainName */

export const GetCertificateByDomainNameEventSchema = t.type({
  name: t.literal(InstallerEventNames.getCertificateByDomainName),
  payload: t.type({
    userId: t.string,
    domainName: t.string,
  }),
})

export type GetCertificateByDomainNameEvent = t.TypeOf<typeof GetCertificateByDomainNameEventSchema>

export const GetCertificateByDomainNameResultSchema = CertificateSchema

export type GetCertificateByDomainNameResult = t.TypeOf<
  typeof GetCertificateByDomainNameResultSchema
>

/* GetCertificateById */

export const GetCertificateByIdEventSchema = t.type({
  name: t.literal(InstallerEventNames.getCertificateById),
  payload: t.type({
    userId: t.string,
    certificateId: t.string,
  }),
})

export type GetCertificateByIdEvent = t.TypeOf<typeof GetCertificateByIdEventSchema>

export const GetCertificateByIdResultSchema = CertificateSchema

export type GetCertificateByIdResult = t.TypeOf<typeof GetCertificateByIdResultSchema>

/* ListCertificates */

export const ListCertificatesEventSchema = t.type({
  name: t.literal(InstallerEventNames.listCertificates),
  payload: t.type({
    userId: t.string,
  }),
})

export type ListCertificatesEvent = t.TypeOf<typeof ListCertificatesEventSchema>

export const ListCertificatesResultSchema = t.array(CertificateSchema)

export type ListCertificatesResult = t.TypeOf<typeof ListCertificatesResultSchema>
