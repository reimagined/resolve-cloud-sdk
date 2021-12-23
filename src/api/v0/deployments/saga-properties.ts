import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes } from '../../../schemas'
import { FactoryEventNames } from '../../../constants'

const Namespace = 'Deployments / Sagas / Properties'

/* SetSagaProperty */

export const SetSagaPropertySchema = defineSchema({
  Namespace,
  Description: 'Assign a value to a saga property.',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/properties',
  Method: 'PUT',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string }),
  Body: t.type({
    key: t.string,
    value: t.string,
  }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.setSagaProperty),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
      key: t.string,
      value: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, sagaName, key, value }) => ({
    params: { deploymentId, sagaName },
    body: { key, value },
    query: {},
  }),
})

export type SetSagaProperty = ExtractSchemaTypes<typeof SetSagaPropertySchema>

/* DeleteSagaProperty */

export const DeleteSagaPropertySchema = defineSchema({
  Namespace,
  Description: 'Delete a saga property.',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/properties/:key',
  Method: 'DELETE',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string, key: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.deleteSagaProperty),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
      key: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, sagaName, key }) => ({
    params: { deploymentId, sagaName, key },
    body: {},
    query: {},
  }),
})

export type DeleteSagaProperty = ExtractSchemaTypes<typeof DeleteSagaPropertySchema>

/* GetSagaProperty */

export const GetSagaPropertySchema = defineSchema({
  Namespace,
  Description: "Get a saga property's value.",
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/properties/:key',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string, key: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.getSagaProperty),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
      key: t.string,
    }),
  }),
  Result: t.record(t.string, t.any),
  ArgumentsTransformer: ({ deploymentId, sagaName, key }) => ({
    params: { deploymentId, sagaName, key },
    body: {},
    query: {},
  }),
})

export type GetSagaProperty = ExtractSchemaTypes<typeof GetSagaPropertySchema>

/* ListSagaProperties */

export const ListSagaPropertiesSchema = defineSchema({
  Namespace,
  Description: 'Get the list of assigned saga properties.',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/properties',
  Method: 'GET',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.listSagaProperties),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.any,
  ArgumentsTransformer: ({ deploymentId, sagaName }) => ({
    params: { deploymentId, sagaName },
    body: {},
    query: {},
  }),
})

export type ListSagaProperties = ExtractSchemaTypes<typeof ListSagaPropertiesSchema>
