import * as t from 'io-ts'
import { FactoryEventNames } from '../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../schemas'

/* SetSagaProperty */

export const SetSagaPropertySchema = defineSchema({
  Path: '/deployments/:deploymentId/sagas/:sagaName/properties',
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
  Path: '/deployments/:deploymentId/sagas/:sagaName/properties/:key',
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
  Path: '/deployments/:deploymentId/sagas/:sagaName/properties/:key',
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
  Path: '/deployments/:deploymentId/sagas/:sagaName/properties',
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

/* ListSagas */

export const ListSagasSchema = defineSchema({
  Path: '/deployments/:deploymentId/sagas',
  Method: 'GET',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.listSagas),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
    }),
  }),
  Result: t.array(
    t.type({
      name: t.string,
      status: t.union([t.string, t.null]),
      successEvent: t.union([t.record(t.string, t.any), t.null]),
      failedEvent: t.union([t.record(t.string, t.any), t.null]),
      errors: t.array(
        t.type({
          name: t.string,
          message: t.string,
          stack: t.string,
        })
      ),
    })
  ),
  ArgumentsTransformer: ({ deploymentId }) => ({
    params: { deploymentId },
    body: {},
    query: {},
  }),
})

export type ListSagas = ExtractSchemaTypes<typeof ListSagasSchema>

/* PauseSaga */

export const PauseSagaSchema = defineSchema({
  Path: '/deployments/:deploymentId/sagas/:sagaName/pause',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.pauseSaga),
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

export type PauseSaga = ExtractSchemaTypes<typeof PauseSagaSchema>

/* ResetSaga */

export const ResetSagaSchema = defineSchema({
  Path: '/deployments/:deploymentId/sagas/:sagaName/reset',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.resetSaga),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, sagaName }) => ({
    params: { deploymentId, sagaName },
    body: {},
    query: {},
  }),
})

export type ResetSaga = ExtractSchemaTypes<typeof ResetSagaSchema>

/* ResumeSaga */

export const ResumeSagaSchema = defineSchema({
  Path: '/deployments/:deploymentId/sagas/:sagaName/resume',
  Method: 'PATCH',
  Mode: 'SYNC',
  Params: t.type({ deploymentId: t.string, sagaName: t.string }),
  Body: t.type({}),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(FactoryEventNames.resumeSaga),
    payload: t.type({
      version: t.string,
      deploymentId: t.string,
      userId: t.string,
      eventListener: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, sagaName }) => ({
    params: { deploymentId, sagaName },
    body: {},
    query: {},
  }),
})

export type ResumeSaga = ExtractSchemaTypes<typeof ResumeSagaSchema>
