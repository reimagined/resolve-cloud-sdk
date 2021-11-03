import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes } from '../schemas'

/* AddNotificationsWebhook */

export const AddNotificationsWebhookSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.addNotificationsWebhook),
    payload: t.type({
      alarmName: t.string,
      url: t.string,
      messageTemplate: t.string,
    }),
  }),
  Result: t.type({
    id: t.string,
  }),
})

export type AddNotificationsWebhook = ExtractSchemaTypes<typeof AddNotificationsWebhookSchema>

/* DeleteNotificationsWebhook */

export const DeleteNotificationsWebhookSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.deleteNotificationsWebhook),
    payload: t.type({
      id: t.string,
    }),
  }),
  Result: t.void,
})

export type DeleteNotificationsWebhook = ExtractSchemaTypes<typeof DeleteNotificationsWebhookSchema>
