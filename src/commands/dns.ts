import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'

/* CreateDnsRecord */

export const CreateDnsRecordEventSchema = t.type({
  name: t.literal(InstallerEventNames.createDnsRecord),
  payload: t.type({
    userId: t.string,
    records: t.array(
      t.type({
        alias: t.string,
        domainId: t.string,
      })
    ),
  }),
})

export type CreateDnsRecordEvent = t.TypeOf<typeof CreateDnsRecordEventSchema>

export const CreateDnsRecordResultSchema = t.void

export type CreateDnsRecordResult = t.TypeOf<typeof CreateDnsRecordResultSchema>

/* DeleteDnsRecord */

export const DeleteDnsRecordEventSchema = t.type({
  name: t.literal(InstallerEventNames.deleteDnsRecord),
  payload: t.type({
    userId: t.string,
    records: t.array(
      t.type({
        alias: t.string,
      })
    ),
  }),
})

export type DeleteDnsRecordEvent = t.TypeOf<typeof DeleteDnsRecordEventSchema>

export const DeleteDnsRecordResultSchema = t.void

export type DeleteDnsRecordResult = t.TypeOf<typeof CreateDnsRecordResultSchema>

/* ListDnsRecords */

export const ListDnsRecordsEventSchema = t.type({
  name: t.literal(InstallerEventNames.listDnsRecords),
  payload: t.UnknownRecord,
})

export type ListDnsRecordsEvent = t.TypeOf<typeof ListDnsRecordsEventSchema>
