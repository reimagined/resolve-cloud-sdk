import formatUrl from '../formatUrl'

test('formatUrl should work correctly', () => {
  expect(formatUrl('/', {})).toEqual('/')
  expect(formatUrl('/test', {})).toEqual('/test')
  expect(formatUrl('/test/:testId', { testId: 't1' })).toEqual('/test/t1')
  expect(formatUrl('/test/:testId/unit', { testId: 't1' })).toEqual('/test/t1/unit')
  expect(formatUrl('/test/:testId/unit/:unitId', { testId: 't1', unitId: 'u1' })).toEqual(
    '/test/t1/unit/u1'
  )
})

test('formatUrl should throw error', () => {
  expect(() => formatUrl('/', { a: 'a' })).toThrow()
  expect(() => formatUrl('/:a', {})).toThrow()
})
