import { getXRangeVersion, coerceVersion, intersectsVersions } from '../format-version'

test('getXRangeVersion should work correctly', () => {
  expect(getXRangeVersion('1.2.3')).toEqual('1.2.x')
  expect(getXRangeVersion('1.2.3-alpha')).toEqual('1.2.x')
  expect(getXRangeVersion('1.2.3-alpha.4')).toEqual('1.2.x')
})

test('getXRangeVersion should throw error', () => {
  expect(() => getXRangeVersion('null')).toThrow()
  expect(() => getXRangeVersion('1.2.x')).toThrow()
})

test('coerceVersion should work correctly', () => {
  expect(coerceVersion('1.2.x')).toEqual('1.2.0')
  expect(coerceVersion('1.2.x-alpha')).toEqual('1.2.0')
  expect(coerceVersion('1.2.x-alpha.4')).toEqual('1.2.0')
})

test('intersectsVersions should work correctly', () => {
  expect(intersectsVersions('1.2.0', '1.2.3')).toEqual(true)
  expect(intersectsVersions('1.2.1', '1.2.0')).toEqual(true)
  expect(intersectsVersions('1.2.3', '1.3.4')).toEqual(false)
  expect(intersectsVersions('1.2.3', '2.3.4')).toEqual(false)
})
