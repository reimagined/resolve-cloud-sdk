import * as t from 'io-ts'
import { FactoryEventNames } from '../../constants'

export const DeleteSagaPropertyEventSchema = t.type({
  name: t.literal(FactoryEventNames.deleteSagaProperty),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
    key: t.string,
  }),
})

export type DeleteSagaPropertyEvent = t.TypeOf<typeof DeleteSagaPropertyEventSchema>

export const GetSagaPropertyEventSchema = t.type({
  name: t.literal(FactoryEventNames.getSagaProperty),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
    key: t.string,
  }),
})

export type GetSagaPropertyEvent = t.TypeOf<typeof GetSagaPropertyEventSchema>

export const ListSagaPropertiesEventSchema = t.type({
  name: t.literal(FactoryEventNames.listSagaProperties),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type ListSagaPropertiesEvent = t.TypeOf<typeof ListSagaPropertiesEventSchema>

export const ListSagasEventSchema = t.type({
  name: t.literal(FactoryEventNames.listSagas),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
  }),
})

export type ListSagasEvent = t.TypeOf<typeof ListSagasEventSchema>

export const PauseSagaEventSchema = t.type({
  name: t.literal(FactoryEventNames.pauseSaga),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type PauseSagaEvent = t.TypeOf<typeof PauseSagaEventSchema>

export const ResetSagaEventSchema = t.type({
  name: t.literal(FactoryEventNames.resetSaga),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type ResetSagaEvent = t.TypeOf<typeof ResetSagaEventSchema>

export const ResumeSagaEventSchema = t.type({
  name: t.literal(FactoryEventNames.resumeSaga),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
  }),
})

export type ResumeSagaEvent = t.TypeOf<typeof ResumeSagaEventSchema>

export const SetSagaPropertyEventSchema = t.type({
  name: t.literal(FactoryEventNames.setSagaProperty),
  payload: t.type({
    deploymentId: t.string,
    userId: t.string,
    eventListener: t.string,
    key: t.string,
    value: t.string,
  }),
})

export type SetSagaPropertyEvent = t.TypeOf<typeof SetSagaPropertyEventSchema>
