import * as t from 'io-ts'
import { InstallerEventNames } from '../constants'
import { CognitoUserSchema } from '../schemas'

/* AttachClientAppUrls */

export const AttachClientAppUrlsEventSchema = t.type({
  name: t.literal(InstallerEventNames.attachClientAppUrls),
  payload: t.type({
    callbackUrl: t.string,
    logoutUrl: t.string,
  }),
})

export type AttachClientAppUrlsEvent = t.TypeOf<typeof AttachClientAppUrlsEventSchema>

export const AttachClientAppUrlsResultSchema = t.void

export type AttachClientAppUrlsResult = t.TypeOf<typeof AttachClientAppUrlsResultSchema>

/* CreateUser */

export const CreateUserEventSchema = t.type({
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
})

export type CreateUserEvent = t.TypeOf<typeof CreateUserEventSchema>

export const CreateUserResultSchema = CognitoUserSchema

export type CreateUserResult = t.TypeOf<typeof CreateUserResultSchema>

/* DetachClientAppUrls */

export const DetachClientAppUrlsEventSchema = t.type({
  name: t.literal(InstallerEventNames.detachClientAppUrls),
  payload: t.type({
    callbackUrl: t.string,
    logoutUrl: t.string,
  }),
})

export type DetachClientAppUrlsEvent = t.TypeOf<typeof DetachClientAppUrlsEventSchema>

export const DetachClientAppUrlsResultSchema = t.void

export type DetachClientAppUrlsResult = t.TypeOf<typeof DetachClientAppUrlsResultSchema>

/* DropUser */

export const DropUserEventSchema = t.type({
  name: t.literal(InstallerEventNames.dropUser),
  payload: t.type({
    userId: t.string,
  }),
})

export type DropUserEvent = t.TypeOf<typeof DropUserEventSchema>

export const DropUserResultSchema = t.void

export type DropUserResult = t.TypeOf<typeof DropUserResultSchema>

/* GetUser */

export const GetUserEventSchema = t.type({
  name: t.literal(InstallerEventNames.getUser),
  payload: t.type({
    userId: t.string,
  }),
})

export type GetUserEvent = t.TypeOf<typeof GetUserEventSchema>

export const GetUserResultSchema = CognitoUserSchema

export type GetUserResult = t.TypeOf<typeof GetUserResultSchema>

/* GetUserIdByEmail */

export const GetUserIdByEmailEventSchema = t.type({
  name: t.literal(InstallerEventNames.getUserIdByEmail),
  payload: t.type({
    email: t.string,
  }),
})

export type GetUserIdByEmailEvent = t.TypeOf<typeof GetUserIdByEmailEventSchema>

export const GetUserIdByEmailResultSchema = t.string

export type GetUserIdByEmailResult = t.TypeOf<typeof GetUserIdByEmailResultSchema>

/* ListUsers */

export const ListUsersEventSchema = t.type({
  name: t.literal(InstallerEventNames.listUsers),
  payload: t.UnknownRecord,
})

export type ListUsersEvent = t.TypeOf<typeof ListUsersEventSchema>

export const ListUsersResultSchema = t.array(CognitoUserSchema)

export type ListUsersResult = t.TypeOf<typeof ListUsersResultSchema>
