import * as t from 'io-ts'

import { RequestMethod, RequestMode } from './constants'
import { BuildCode, DeployStatic } from './commands/builder'

export type LambdaContext = {
  functionName: string
  invokedFunctionArn: string
  callbackWaitsForEmptyEventLoop: boolean
}

export const VirtualHostsSchema = t.array(
  t.type({
    VirtualHost: t.string,
    FunctionArn: t.string,
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
  DomainId: t.string,
  DomainType: DomainTypeSchema,
  DomainName: t.string,
  ResourceARN: t.string,
  Aliases: t.array(t.string),
  Verified: t.boolean,
  Owner: t.string,
  Users: DomainUsersSchema,
  VerificationCode: t.string,
  CertificateId: t.string,
})
export type Domain = t.TypeOf<typeof DomainSchema>

export const DomainsSchema = t.array(DomainSchema)
export type Domains = t.TypeOf<typeof DomainsSchema>

export const DeploymentSchema = t.intersection([
  t.type({
    deploymentId: t.string,
    applicationName: t.string,
    version: t.string,
    domainName: t.string,
  }),
  t.partial({
    eventStoreId: t.string,
    deploymentTag: t.string,
  }),
])

export type Deployment = t.TypeOf<typeof DeploymentSchema>

export const CognitoUserSchema = t.type({
  UserId: t.string,
  Email: t.string,
  Enabled: t.boolean,
  UserStatus: t.string,
  IsAdmin: t.boolean,
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
    CertificateId: t.string,
    AdditionalNames: t.array(t.string),
    ResourceARN: t.string,
  }),
  t.partial({
    DomainName: t.string,
    ImportedAt: t.string,
    Issuer: t.string,
    NotBefore: t.string,
    NotAfter: t.string,
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
  Path extends string = never,
  Method extends RequestMethod = never,
  Mode extends RequestMode = never,
  ParamsSchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> = never,
  BodySchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> = never,
  QuerySchema extends t.TypeC<any> | t.PartialC<any> | t.IntersectionC<any> = never
>(
  route:
    | {
        Event: EventSchema
        Result: ResultSchema
      }
    | {
        Event: EventSchema
        Result: ResultSchema
        Path: Path
        Method: Method
        Mode: Mode
        Params: ParamsSchema
        Body: BodySchema
        Query: QuerySchema
        ArgumentsTransformer: (
          args: t.TypeOf<ParamsSchema> & t.TypeOf<BodySchema> & t.TypeOf<QuerySchema>
        ) => {
          params: t.TypeOf<ParamsSchema>
          body: t.TypeOf<BodySchema>
          query: t.TypeOf<QuerySchema>
        }
      }
): {
  Path: Path
  Method: Method
  Mode: Mode
  Params: ParamsSchema
  Body: BodySchema
  Query: QuerySchema
  Event: EventSchema
  Result: ResultSchema
  ArgumentsTransformer: ParamsSchema extends never
    ? never
    : BodySchema extends never
    ? never
    : QuerySchema extends never
    ? never
    : (args: t.TypeOf<ParamsSchema> & t.TypeOf<BodySchema> & t.TypeOf<QuerySchema>) => {
        params: t.TypeOf<ParamsSchema>
        body: t.TypeOf<BodySchema>
        query: t.TypeOf<QuerySchema>
      }
} => {
  Object.assign(route, { [IS_RESOLVE_CLOUD_SDK_SCHEMA]: true })
  return route as any
}

export type ExtractSchemaTypes<
  T extends {
    Event: t.Any
    Result: t.Any
    Path: string | never
    Method: RequestMethod | never
    Mode: RequestMode | never
    Params: t.Any | never
    Body: t.Any | never
    Query: t.Any | never
    ArgumentsTransformer: any | never
  }
> = {
  Path: T['Path']
  Method: T['Method']
  Mode: T['Mode']
  Params: T['Params'] extends never ? never : t.TypeOf<T['Params']>
  Body: T['Body'] extends never ? never : t.TypeOf<T['Body']>
  Query: T['Query'] extends never ? never : t.TypeOf<T['Query']>
  Event: t.TypeOf<T['Event']>
  Result: t.TypeOf<T['Result']>
}
