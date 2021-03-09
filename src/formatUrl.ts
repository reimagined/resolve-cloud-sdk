const formatUrl = (urlPattern: string, params: Record<string, string>): string => {
  let result = urlPattern
  const urlKeys = urlPattern.match(/:[a-z0-9-]+/gi) ?? []
  if (urlKeys.length !== Object.keys(params).length) {
    throw new Error(
      `The params "${JSON.stringify(params)}" does not match a pattern "${urlPattern}"`
    )
  }
  for (const urlKey of urlKeys) {
    const paramKey = urlKey.replace(/^:/, '')
    const paramValue = params[paramKey]
    if (paramValue == null) {
      throw new Error(`The parameter "${paramKey} is required"`)
    }
    result = result.replace(urlKey, paramValue)
  }
  return result
}

export default formatUrl
