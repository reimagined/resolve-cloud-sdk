import { stringify as stringifyQueryString } from 'query-string'
// TODO migrate to "andy128k/aes-es" or "aes-js"
import { createDecipheriv } from 'crypto'

import { HEADER_EXECUTION_MODE, RequestMode, RequestMethod } from './constants'
import { SetupOptions } from './sdk'
import getApiRouteUrl from './get-api-route-url'
import getResponseMethod from './get-response-method'
import { isRetryable } from './is-retryable'

const request = async (
  params: {
    method: RequestMethod
    mode: RequestMode
    path: string
    body?: Record<string, any> | null
    query?: Record<string, any>
    headers?: Record<string, string>
  } & SetupOptions
): Promise<any> => {
  const {
    baseHeaders,
    baseUrl,
    fetch,
    logger = {
      debug: () => {},
      trace: () => {},
      log: () => {},
    },
    path,
    query,
    body,
    method,
    token,
    headers: customHeaders = {},
    retryTimeout = 60000,
    mode = 'SYNC',
  } = params

  const headers = {
    ...baseHeaders,
    ...customHeaders,
  }

  if (token != null) {
    headers.Authorization = `Bearer ${token}`
  }

  headers[HEADER_EXECUTION_MODE] = mode === 'ASYNC' ? 'async' : 'sync'

  if (fetch == null) {
    throw new Error('Fetch is not defined')
  }

  if (baseUrl == null) {
    throw new Error('BaseUrl is not defined')
  }

  const startTime = Date.now()
  for (;;) {
    try {
      const response = await fetch(getApiRouteUrl(baseUrl, path), {
        method,
        credentials: 'same-origin',
        ...(body == null || Object.keys(body).length === 0 ? {} : { body: JSON.stringify(body) }),
        ...(query == null || Object.keys(query).length === 0
          ? {}
          : {
              query: stringifyQueryString(query, { arrayFormat: 'bracket' }),
            }),
        ...(headers == null || Object.keys(headers).length === 0 ? {} : { headers }),
      })

      const responseMethod = getResponseMethod(response.headers.get('Content-Type'))

      const data = await response[responseMethod]()

      if (response.ok || response.status === 200) {
        if (responseMethod === 'json') {
          const { executionId, executionToken, executionSalt, result } = data
          const describeUrl = `/describe-execution/${executionId}`

          if (mode === 'SYNC') {
            return result
          } else {
            for (;;) {
              const { [HEADER_EXECUTION_MODE]: headerExec, ...describeHeaders } = headers
              void headerExec

              const describeExecutionResponse = await fetch(getApiRouteUrl(baseUrl, describeUrl), {
                method: 'GET',
                credentials: 'same-origin',
                ...(describeHeaders == null || Object.keys(describeHeaders).length === 0
                  ? {}
                  : { headers: describeHeaders }),
              })

              const describeExecutionResponseMethod = getResponseMethod(
                describeExecutionResponse.headers.get('Content-Type')
              )

              const describeExecutionData = await describeExecutionResponse[
                describeExecutionResponseMethod
              ]()

              const executionStatus = describeExecutionData?.result?.Status
              const Output = describeExecutionData?.result?.Output

              logger.trace(
                `<< [${executionStatus}] ${describeExecutionResponseMethod}: ${baseUrl}${describeUrl}`
              )

              if (
                Output?.errorType != null &&
                Output?.errorMessage != null &&
                Output?.trace != null
              ) {
                const error = new Error()
                error.name = Output.errorType
                error.message = Output.errorMessage
                error.stack = Output.trace.join('\n')
                throw error
              }

              switch (executionStatus) {
                case 'SUCCEEDED': {
                  const decipher = createDecipheriv('aes-256-ctr', executionToken, executionSalt)

                  const decrypted = Buffer.concat([
                    decipher.update(Buffer.from(Output, 'base64')),
                    decipher.final(),
                  ])

                  return JSON.parse(decrypted.toString())
                }
                case 'RUNNING': {
                  logger.trace('Execution status "RUNNING". Retrying...')
                  await new Promise((resolve) => setTimeout(resolve, 3000))
                  break
                }
                default: {
                  throw Error(`Command has been completed with status "${executionStatus}"`)
                }
              }
            }
          }
        } else {
          if (`${data}`.includes(`<?xml version="1.0" encoding="UTF-8"?>`)) {
            throw new Error(data)
          }
          return data
        }
      }

      if (responseMethod === 'json') {
        throw new Error(JSON.stringify(data, null, 2))
      } else {
        throw new Error(data)
      }
    } catch (error) {
      const errorText = `${error}`

      const timeLeft = retryTimeout - (Date.now() - startTime)
      if (timeLeft <= 0) {
        logger.debug(`Task timed out`)
        throw error
      } else if (
        isRetryable({
          baseUrl,
          method,
          errorText,
        })
      ) {
        logger.debug(`Retrying... ${Math.round(timeLeft / 1000)} seconds left`)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } else {
        throw error
      }
    }
  }
}

export default request
