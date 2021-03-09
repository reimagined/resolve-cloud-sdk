import { stringify as stringifyQueryString } from 'query-string'

import { SetupOptions, RequestMode, RequestMethod } from './sdk'

const request = async (
  params: {
    method: RequestMethod
    mode: RequestMode
    url: string
    body?: Record<string, any> | null
    query?: Record<string, any>
    headers?: Record<string, string>
  } & SetupOptions
): Promise<Record<string, any> | null> => {
  const {
    baseUrl,
    fetch,
    log,
    url: pathname,
    query,
    body,
    method,
    headers,
    retryTimeout = 60000,
    mode = 'SYNC',
  } = params

  void mode
  void pathname

  if (fetch == null) {
    throw new Error('Fetch is not defined')
  }

  if (baseUrl == null) {
    throw new Error('BaseUrl is not defined')
  }

  let url = baseUrl

  if (/\/$/.test(url)) {
    url = url.substr(0, url.length - 1)
  }

  const startTime = Date.now()
  for (;;) {
    try {
      const response = await fetch(url, {
        method,
        credentials: 'same-origin',
        ...{ body: body === undefined ? undefined : JSON.stringify(body) },
        ...{
          query:
            query === undefined
              ? undefined
              : stringifyQueryString(query, { arrayFormat: 'bracket' }),
        },
        headers,
      })

      const contentType = response.headers.get('Content-Type')

      const responseMethod =
        contentType != null &&
        contentType
          .split(';')
          .map((item) => item.trim())
          .find((item) => item === 'application/json')
          ? 'json'
          : 'text'

      const result = await response[responseMethod]()

      if (response.ok || response.status === 200) {
        return result
      }

      if (responseMethod === 'json') {
        throw new Error(JSON.stringify(result, null, 2))
      } else {
        throw new Error(result)
      }
    } catch (error) {
      const errorText = `${error}`
      const isRetryable =
        /timeout of (\d+)ms exceeded/.test(errorText) ||
        /ENOTFOUND/.test(errorText) ||
        /ETIMEDOUT/.test(errorText) ||
        /ECONNRESET/.test(errorText)
      if (isRetryable && Date.now() - startTime < retryTimeout) {
        if (typeof log === 'function') {
          log(`Task timed out. Retrying...`)
        }
      } else {
        throw error
      }
    }
  }
}

export default request
