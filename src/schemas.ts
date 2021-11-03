import * as t from 'io-ts'

import { RequestMethod, RequestMode } from './constants'
import { BuildCode, DeployStatic } from './api/builder'

export type LambdaContext = {
  functionName: string
  invokedFunctionArn: string
  callbackWaitsForEmptyEventLoop: boolean
  getRemainingTimeInMillis: () => number
}

export const VirtualHostsSchema = t.array(
  t.type({
    virtualHost: t.string,
    functionArn: t.string,
  })
)
export type VirtualHosts = t.TypeOf<typeof VirtualHostsSchema>

export const DomainUsersSchema = t.union([t.literal('*'), t.array(t.string)])
export type DomainUsers = t.TypeOf<typeof DomainUsersSchema>

export const DomainTypeSchema = t.union([
  t.literal('proxy'),
  t.literal('static'),
  t.literal('uploader'),
])
export type DomainType = t.TypeOf<typeof DomainTypeSchema>

export const DomainSchema = t.type({
  domainId: t.string,
  domainType: DomainTypeSchema,
  domainName: t.string,
  resourceARN: t.string,
  aliases: t.array(t.string),
  verified: t.boolean,
  owner: t.string,
  users: DomainUsersSchema,
  verificationCode: t.string,
  certificateId: t.string,
})
export type Domain = t.TypeOf<typeof DomainSchema>

export const DomainsSchema = t.array(DomainSchema)
export type Domains = t.TypeOf<typeof DomainsSchema>

export const DeploymentSchema = t.intersection([
  t.type({
    deploymentId: t.string,
    applicationName: t.string,
    version: t.string,
    domains: t.array(t.string),
  }),
  t.partial({
    eventStoreId: t.string,
  }),
])

export type Deployment = t.TypeOf<typeof DeploymentSchema>

export const CognitoUserSchema = t.type({
  userId: t.string,
  email: t.string,
  enabled: t.boolean,
  userStatus: t.string,
  isAdmin: t.boolean,
})

export type CognitoUser = t.TypeOf<typeof CognitoUserSchema>

export const CognitoJWTPayloadSchema = t.intersection([
  t.type({
    sub: t.string,
    aud: t.string,
    event_id: t.string,
    token_use: t.literal('id'),
    auth_time: t.number,
    iss: t.string,
    'cognito:username': t.string,
    exp: t.number,
    iat: t.number,
    email: t.string,
  }),
  t.partial({
    'cognito:groups': t.array(t.string),
    email_verified: t.boolean,
  }),
])

export type CognitoJWTPayload = t.TypeOf<typeof CognitoJWTPayloadSchema>

export const CognitoJWTHeaderSchema = t.type({
  kid: t.string,
  alg: t.literal('RS256'),
})

export type CognitoJWTHeader = t.TypeOf<typeof CognitoJWTHeaderSchema>

export const ClientApiEventSchema = t.type({
  httpMethod: t.string,
  headers: t.array(t.type({ key: t.string, value: t.string })),
  uri: t.string,
  querystring: t.string,
  body: t.string, // Base64
})

export type ClientApiEvent = t.TypeOf<typeof ClientApiEventSchema>

export const ClientApiResultSchema = t.type({
  httpStatus: t.number,
  httpStatusText: t.string,
  headers: t.array(t.type({ key: t.string, value: t.string })),
  body: t.string, // Base64
})
export type ClientApiResult = t.TypeOf<typeof ClientApiResultSchema>

export const CertificateSchema = t.intersection([
  t.type({
    certificateId: t.string,
    additionalNames: t.array(t.string),
    resourceARN: t.string,
  }),
  t.partial({
    domainName: t.string,
    importedAt: t.string,
    issuer: t.string,
    notBefore: t.string,
    notAfter: t.string,
  }),
])

export type Certificate = t.TypeOf<typeof CertificateSchema>

export type BuilderLambdaEvent = BuildCode['Event'] | DeployStatic['Event']

export const RDSUserSchema = t.type({
  userId: t.string,
  password: t.string,
  secretName: t.string,
  secretArn: t.string,
})

export const IS_RESOLVE_CLOUD_SDK_SCHEMA = Symbol('IS_RESOLVE_CLOUD_SDK_SCHEMA')

export declare type RDSUser = t.TypeOf<typeof RDSUserSchema>

export const defineSchema = <
  EventSchema extends t.Any,
  ResultSchema extends t.Any,
  Namespace extends string | unknown = unknown,
  Description extends string | unknown = unknown,
  Path extends string | unknown = unknown,
  Method extends RequestMethod = never,
  Mode extends RequestMode = never,
  ParamsSchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> | unknown = unknown,
  BodySchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> | unknown = unknown,
  QuerySchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> | unknown = unknown,
  ArgumentsTransformerSchema = ParamsSchema extends t.Any
    ? BodySchema extends t.Any
      ? QuerySchema extends t.Any
        ? (args: t.TypeOf<ParamsSchema> & t.TypeOf<BodySchema> & t.TypeOf<QuerySchema>) => {
            params: t.TypeOf<ParamsSchema>
            body: t.TypeOf<BodySchema>
            query: t.TypeOf<QuerySchema>
          }
        : unknown
      : unknown
    : unknown
>(
  route:
    | {
        Event: EventSchema
        Result: ResultSchema
      }
    | {
        Event: EventSchema
        Result: ResultSchema
        Namespace: Namespace
        Description: Description
        Path: Path
        Method: Method
        Mode: Mode
        Params: ParamsSchema
        Body: BodySchema
        Query: QuerySchema
        ArgumentsTransformer: ArgumentsTransformerSchema
      }
): {
  Namespace: Namespace
  Description: Description
  Path: Path
  Method: Method
  Mode: Mode
  Params: ParamsSchema
  Body: BodySchema
  Query: QuerySchema
  Event: EventSchema
  Result: ResultSchema
  ArgumentsTransformer: ArgumentsTransformerSchema
} => {
  Object.assign(route, { [IS_RESOLVE_CLOUD_SDK_SCHEMA]: true })
  return route as any
}

export type ExtractSchemaTypes<
  T extends {
    Event: t.Any
    Result: t.Any
    Namespace: string | unknown
    Description: string | unknown
    Path: string | unknown
    Method: RequestMethod | never
    Mode: RequestMode | never
    Params: t.Any | unknown
    Body: t.Any | unknown
    Query: t.Any | unknown
    ArgumentsTransformer: ((args: any) => any) | unknown
  }
> = {
  Namespace: T['Namespace']
  Description: T['Description']
  Path: T['Path']
  Method: T['Method'] extends RequestMethod ? T['Method'] : unknown
  Mode: T['Mode'] extends RequestMode ? T['Mode'] : unknown
  Params: T['Params'] extends t.Any ? t.TypeOf<T['Params']> : unknown
  Body: T['Body'] extends t.Any ? t.TypeOf<T['Body']> : unknown
  Query: T['Query'] extends t.Any ? t.TypeOf<T['Query']> : unknown
  Event: t.TypeOf<T['Event']>
  Result: t.TypeOf<T['Result']>
}
