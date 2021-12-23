import * as t from 'io-ts'

import { InstallerEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

const Namespace = 'Auth'

/* AuthLogin */

export const AuthLoginSchema = defineSchema({
  Namespace,
  Description: 'Log in to reSolve Cloud.',
  Path: '/v0/auth/login',
  Method: 'POST',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({
    userName: t.string,
    password: t.string,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.authLogin),
    payload: t.UnknownRecord,
  }),
  Result: t.void,
  ArgumentsTransformer: (args: { userName: string; password: string }) => ({
    params: {},
    body: { userName: args.userName, password: args.password },
    query: {},
  }),
})

export type AuthLogin = ExtractSchemaTypes<typeof AuthLoginSchema>

/* AuthLogout */

export const AuthLogoutSchema = defineSchema({
  Namespace,
  Description: 'Log out of reSolve Cloud.',
  Path: '/v0/auth/logout',
  Method: 'POST',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.authLogout),
    payload: t.UnknownRecord,
  }),
  Result: t.void,
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type AuthLogout = ExtractSchemaTypes<typeof AuthLogoutSchema>

/* AuthRefreshToken */

export const AuthRefreshTokenSchema = defineSchema({
  Namespace,
  Description: 'Refresh your authentication token on reSolve Cloud.',
  Path: '/v0/auth/refreshToken',
  Method: 'POST',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.authRefreshToken),
    payload: t.UnknownRecord,
  }),
  Result: t.void,
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type AuthRefreshToken = ExtractSchemaTypes<typeof AuthRefreshTokenSchema>

/* AuthWhoAmI */

export const AuthAuthWhoAmISchema = defineSchema({
  Namespace,
  Description: "Get the current user's profile information.",
  Path: '/v0/auth/whoami',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({}),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.authWhoAmI),
    payload: t.type({
      userId: t.string,
      userName: t.string,
      isAdmin: t.boolean,
    }),
  }),
  Result: t.type({
    userId: t.string,
    userName: t.string,
    isAdmin: t.boolean,
  }),
  ArgumentsTransformer: (args = {}) => ({
    params: {},
    body: {},
    query: {},
  }),
})

export type AuthAuthWhoAmI = ExtractSchemaTypes<typeof AuthAuthWhoAmISchema>
