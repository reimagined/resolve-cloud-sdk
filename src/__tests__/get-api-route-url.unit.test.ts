import getApiRouteUrl from '../get-api-route-url'

test('getApiRouteUrl should work correctly', () => {
  expect(getApiRouteUrl('https://api.example.com', 'api')).toEqual('https://api.example.com/api')
  expect(getApiRouteUrl('https://api.example.com', '/api')).toEqual('https://api.example.com/api')
  expect(getApiRouteUrl('https://api.example.com/', 'api')).toEqual('https://api.example.com/api')
  expect(getApiRouteUrl('https://api.example.com/', '/api')).toEqual('https://api.example.com/api')
})
