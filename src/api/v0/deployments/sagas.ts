import * as t from 'io-ts'

import { FactoryEventNames } from '../../../constants'
import { defineSchema, ExtractSchemaTypes } from '../../../schemas'

const Namespace = 'Deployments / Sagas'

/* PauseSaga */

export const PauseSagaSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/pause',
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
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/reset',
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
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/sagas/:sagaName/resume',
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

/* ListSagas */

export const ListSagasSchema = defineSchema({
  Namespace,
  Description: '',
  Path: '/v0/deployments/:deploymentId/sagas',
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
