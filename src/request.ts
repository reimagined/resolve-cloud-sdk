import { stringify as stringifyQueryString } from 'query-string'

import { HEADER_EXECUTION_MODE, RequestMode, RequestMethod } from './constants'
import { SetupOptions } from './cloud-sdk-setup-options'
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
      const response = await fetch(
        `${getApiRouteUrl(baseUrl, path)}${
          query == null || Object.keys(query).length === 0
            ? ''
            : `?${stringifyQueryString(query, { arrayFormat: 'bracket' })}`
        }`,
        {
          method,
          credentials: 'same-origin',
          ...(body == null || Object.keys(body).length === 0 ? {} : { body: JSON.stringify(body) }),
          ...(headers == null || Object.keys(headers).length === 0 ? {} : { headers }),
        }
      )

      const responseMethod = getResponseMethod(response.headers.get('Content-Type'))

      const data = await response[responseMethod]()

      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(data)
      }

      if (responseMethod === 'json') {
        const { executionId, result } = data
        const describeUrl = `/v0/describe-execution/${executionId}`

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

            if (
              !(describeExecutionResponse.status >= 200 && describeExecutionResponse.status < 300)
            ) {
              return Promise.reject(new Error(describeExecutionData))
            }

            if (`${describeExecutionData}`.includes(`<?xml version="1.0" encoding="UTF-8"?>`)) {
              throw new Error(data)
            }

            const executionStatus = describeExecutionData?.result?.status
            const Output = describeExecutionData?.result?.output

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
                return Output
              }
              case 'RUNNING': {
                logger.trace('Execution status "RUNNING". Retrying...')
                await new Promise((resolve) => setTimeout(resolve, 3000))
                break
              }
              default: {
                return Promise.reject(
                  new Error(`Command has been completed with status "${executionStatus}"`)
                )
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
