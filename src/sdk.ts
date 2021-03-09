import * as t from 'io-ts'

type Fetch = typeof fetch

export type RequestMode = 'SYNC' | 'ASYNC'
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'

export type SetupOptions = {
  fetch?: Fetch
  log?: (...ars: Array<any>) => any
  baseUrl?: string
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
