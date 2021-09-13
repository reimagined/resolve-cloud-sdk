const getResponseMethod = (contentType: string | undefined | null) => {
  const responseMethod =
    contentType != null &&
    contentType
      .split(';')
      .map((item) => item.trim())
      .find((item) => item === 'application/json')
      ? 'json'
      : 'text'

  return responseMethod
}

export default getResponseMethod
