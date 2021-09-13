import * as t from 'io-ts'

import { RequestMethod, RequestMode } from './constants'

type Fetch = typeof fetch

export type SetupOptions = {
  fetch?: Fetch
  logger?: {
    debug: (...ars: Array<any>) => any
    trace: (...ars: Array<any>) => any
    log: (...ars: Array<any>) => any
  }
  baseHeaders?: Record<string, string>
  baseUrl?: string
  token?: string
  retryTimeout?: number
}

export type RestApiRoute = {
  urlPattern: string
  method: RequestMethod
  mode: RequestMode
  isUserIdRequired: boolean
  paramsSchema: t.Type<any>
  querySchema: t.Type<any>
  bodySchema: t.Type<any>
  resultSchema: t.Type<any>
}

export type RestApiRoutes = Record<string, RestApiRoute>
