import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

/* CreateDnsRecord */

export const CreateDnsRecordSchema = defineSchema({
  Event: t.type({
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
  }),
  Result: t.void,
})

export type CreateDnsRecord = ExtractSchemaTypes<typeof CreateDnsRecordSchema>

/* DeleteDnsRecord */

export const DeleteDnsRecordSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.deleteDnsRecord),
    payload: t.type({
      userId: t.string,
      records: t.array(
        t.type({
          alias: t.string,
        })
      ),
    }),
  }),
  Result: t.void,
})

export type DeleteDnsRecord = ExtractSchemaTypes<typeof DeleteDnsRecordSchema>

/* ListDnsRecords */

export const ListDnsRecordsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.listDnsRecords),
    payload: t.UnknownRecord,
  }),
  Result: t.any,
})

export type ListDnsRecords = ExtractSchemaTypes<typeof ListDnsRecordsSchema>
