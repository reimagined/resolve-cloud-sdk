import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes, VirtualHostsSchema } from '../schemas'
import { InstallerEventNames } from '../constants'

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
