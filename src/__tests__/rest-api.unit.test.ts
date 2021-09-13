import { createCloudSdk } from '../rest-api'

describe('sdk', () => {
  const sdk = createCloudSdk()

  const json = jest.fn()
  const text = jest.fn()
  const headers = new Map()
  headers.set('Content-Type', 'application/json')

  const fetch = jest.fn().mockResolvedValue({
    json,
    text,
    headers,
    ok: true,
    status: 200,
  })

  sdk.setup({
    fetch: fetch as any,
    baseUrl: 'http://localhost:3000',
    retryTimeout: 1000,
  })

  test('getClientAppConfig should work correctly', async () => {
    json.mockResolvedValue({
      result: {
        ClientId: 'client-id',
        UserPoolId: 'user-pool-id',
      },
    })

    const result = await sdk.getClientAppConfig({})

    expect(result).toEqual({
      ClientId: 'client-id',
      UserPoolId: 'user-pool-id',
    })

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/client-app-config', {
      credentials: 'same-origin',
      headers: {
        'x-resolve-execution-mode': 'sync',
      },
      method: 'GET',
    })
  })
})
