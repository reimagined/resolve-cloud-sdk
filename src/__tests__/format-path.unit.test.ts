import formatPath from '../format-path'

test('formatUrl should work correctly', () => {
  expect(formatPath('/', {})).toEqual('/')
  expect(formatPath('/test', {})).toEqual('/test')
  expect(formatPath('/test/:testId', { testId: 't1' })).toEqual('/test/t1')
  expect(formatPath('/test/:testId/unit', { testId: 't1' })).toEqual('/test/t1/unit')
  expect(formatPath('/test/:testId/unit/:unitId', { testId: 't1', unitId: 'u1' })).toEqual(
    '/test/t1/unit/u1'
  )
})

test('formatUrl should throw error', () => {
  expect(() => formatPath('/', { a: 'a' })).toThrow()
  expect(() => formatPath('/:a', {})).toThrow()
})
