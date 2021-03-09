import {
  GetClientAppConfigParamsSchema,
  GetClientAppConfigQuerySchema,
  GetClientAppConfigBodySchema,
  GetClientAppConfigResultSchema,
} from './commands/cloud'
import { RestApiRoutes, SetupOptions } from './sdk'
import request from './request'

/* System */
const getClientAppConfig = {
  urlPattern: '/client-app-config',
  method: 'GET',
  mode: 'SYNC',
  isUserIdRequired: false,
  paramsSchema: GetClientAppConfigQuerySchema,
  querySchema: GetClientAppConfigParamsSchema,
  bodySchema: GetClientAppConfigBodySchema,
  resultSchema: GetClientAppConfigResultSchema,
}

const restApiRoutes = {
  getClientAppConfig,
}

void (<RestApiRoutes>restApiRoutes)

type CloudSdk = {
  setup: (params: SetupOptions) => void
} & Record<string, any>

export const createCloudSdk = (): CloudSdk => {
  let options: SetupOptions = {}

  return {
    /* Setup */
    setup(params: SetupOptions) {
      options = params
    },

    /* System */
    getClientAppConfig: () =>
      request({
        method: 'GET',
        url: '/client-app-config',
        mode: 'SYNC',
        ...options,
      }),
  }
}
