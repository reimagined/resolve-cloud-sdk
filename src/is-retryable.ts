const ipV4RegExp = /[0-9]+.[0-9]+.[0-9]+.[0-9]+/
const rateExceededRegExp = /Rate exceeded/
const socketHangUpRegExp = /socket hang up/
const throttledRegExp =
  /The Lambda function associated with the CloudFront distribution was throttled/
const requiredPermissionsRegExp =
  /The Lambda function associated with the CloudFront distribution is invalid or doesn't have the required permissions/
const eTimedOutRegExp = /ETIMEDOUT/
const eConnectionResetRegExp = /ECONNRESET/
const eNotFoundRegExp = /ENOTFOUND/
const eProtoRegExp = /EPROTO/
const eHostUnreach = /EHOSTUNREACH/
const eConnRefused = /ECONNREFUSED/
const cloudFrontError = `<?xml version="1.0" encoding="UTF-8"?>`
const lambdaEdgeTimeout = 'lambda@edge timeout'
const failedToSetupAuthentication = 'Failed to setup authentication'

type Params = { baseUrl: string; method: string; errorText: string }

export const isNetworkError = ({ errorText }: Pick<Params, 'errorText'>) =>
  eTimedOutRegExp.test(errorText) ||
  eConnectionResetRegExp.test(errorText) ||
  eNotFoundRegExp.test(errorText) ||
  eProtoRegExp.test(errorText) ||
  eHostUnreach.test(errorText) ||
  eConnRefused.test(errorText) ||
  socketHangUpRegExp.test(errorText) ||
  errorText.includes(lambdaEdgeTimeout) ||
  errorText.includes(failedToSetupAuthentication) ||
  errorText.includes(cloudFrontError)

export const isLambdaError = ({ errorText }: Pick<Params, 'errorText'>) =>
  rateExceededRegExp.test(errorText) ||
  throttledRegExp.test(errorText) ||
  requiredPermissionsRegExp.test(errorText)

export const isHeartbeat = ({ method }: Pick<Params, 'method'>) => method === 'HEAD'

export const isUrlContainIp = ({ baseUrl }: Pick<Params, 'baseUrl'>) => ipV4RegExp.test(baseUrl)

export const isRetryable = (params: Params) =>
  !isHeartbeat(params) && (isLambdaError(params) || isNetworkError(params))
