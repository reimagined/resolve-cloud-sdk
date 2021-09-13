import { isRetryable } from '../is-retryable'

describe('utils "isRetryable"', () => {
  test('should work correctly with simple url', () => {
    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText: 'timeout of 30000ms exceeded',
      })
    ).toBeFalsy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText: 'The Lambda function associated with the CloudFront distribution was throttled',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText:
          "The Lambda function associated with the CloudFront distribution is invalid or doesn't have the required permissions",
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText: 'ETIMEDOUT',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText: 'ECONNRESET',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'GET',
        errorText: 'ENOTFOUND',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://localhost:8080',
        method: 'HEAD',
        errorText: 'Heartbeat error',
      })
    ).toBeFalsy()
  })

  test('should work correctly with IP url', () => {
    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText: 'timeout of 30000ms exceeded',
      })
    ).toBeFalsy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText: 'The Lambda function associated with the CloudFront distribution was throttled',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText:
          "The Lambda function associated with the CloudFront distribution is invalid or doesn't have the required permissions",
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText: 'ETIMEDOUT',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText: 'ECONNRESET',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'GET',
        errorText: 'ENOTFOUND',
      })
    ).toBeTruthy()

    expect(
      isRetryable({
        baseUrl: 'https://0.0.0.0:8080',
        method: 'HEAD',
        errorText: 'Heartbeat error',
      })
    ).toBeFalsy()
  })
})
