import * as t from 'io-ts'

import { InstallerEventNames } from '../constants'
import { defineSchema, ExtractSchemaTypes, CognitoUserSchema } from '../schemas'

/* AttachClientAppUrls */

export const AttachClientAppUrlsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.attachClientAppUrls),
    payload: t.type({
      callbackUrl: t.string,
      logoutUrl: t.string,
    }),
  }),
  Result: t.void,
})

export type AttachClientAppUrls = ExtractSchemaTypes<typeof AttachClientAppUrlsSchema>

/* CreateUser */

export const CreateUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.createUser),
    payload: t.intersection([
      t.type({
        email: t.string,
        temporaryPassword: t.string,
      }),
      t.partial({
        forceAliasCreation: t.boolean,
        messageAction: t.union([t.literal('RESEND'), t.literal('SUPPRESS')]),
        clientMetadata: t.record(t.string, t.string),
        userAttributes: t.array(t.type({ Name: t.string, Value: t.string })),
        validationData: t.array(t.type({ Name: t.string, Value: t.string })),
        isAdmin: t.boolean,
      }),
    ]),
  }),
  Result: CognitoUserSchema,
})

export type CreateUser = ExtractSchemaTypes<typeof CreateUserSchema>

/* DetachClientAppUrls */

export const DetachClientAppUrlsSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.detachClientAppUrls),
    payload: t.type({
      callbackUrl: t.string,
      logoutUrl: t.string,
    }),
  }),
  Result: t.void,
})

export type DetachClientAppUrls = ExtractSchemaTypes<typeof DetachClientAppUrlsSchema>

/* DropUser */

export const DropUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.dropUser),
    payload: t.type({
      userId: t.string,
    }),
  }),
  Result: t.void,
})

export type DropUser = ExtractSchemaTypes<typeof DropUserSchema>

/* GetUser */

export const GetUserSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getUser),
    payload: t.type({
      userId: t.string,
    }),
  }),
  Result: CognitoUserSchema,
})

export type GetUser = ExtractSchemaTypes<typeof GetUserSchema>

/* GetUserIdByEmail */

export const GetUserIdByEmailSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.getUserIdByEmail),
    payload: t.type({
      email: t.string,
    }),
  }),
  Result: t.string,
})

export type GetUserIdByEmail = ExtractSchemaTypes<typeof GetUserIdByEmailSchema>

/* ListUsers */

export const ListUsersSchema = defineSchema({
  Event: t.type({
    name: t.literal(InstallerEventNames.listUsers),
    payload: t.UnknownRecord,
  }),
  Result: t.array(CognitoUserSchema),
})

export type ListUsers = ExtractSchemaTypes<typeof ListUsersSchema>
