import { GetClientAppConfigSchema } from './commands/cloud'
import { RestApiRoutes, SetupOptions } from './sdk'
import request from './request'

/* System */
const getClientAppConfig = {
  urlPattern: '/client-app-config',
  method: 'GET',
  mode: 'SYNC',
  isUserIdRequired: false,
  paramsSchema: GetClientAppConfigSchema.Params,
  querySchema: GetClientAppConfigSchema.Query,
  bodySchema: GetClientAppConfigSchema.Body,
  resultSchema: GetClientAppConfigSchema.Result,
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
        path: '/client-app-config',
        mode: 'SYNC',
        ...options,
      }),
  }
}
