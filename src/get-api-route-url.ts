const getApiRouteUrl = (baseUrl: string, pathname: string) => {
  let url = baseUrl

  if (/\/$/.test(url)) {
    url = url.substr(0, url.length - 1)
  }
  if (/^\//.test(pathname)) {
    url += pathname
  } else {
    url += `/${pathname}`
  }

  return url
}

export default getApiRouteUrl
