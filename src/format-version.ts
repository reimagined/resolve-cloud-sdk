import semver from 'semver'

export const getXRangeVersion = (version: string) => {
  const parsedVersion = semver.parse(version)

  if (parsedVersion == null) {
    throw new Error(`Parse version "${version}" failed`)
  }

  const { major, minor } = parsedVersion

  return `${major}.${minor}.x`
}

export const coerceVersion = (version: string) => semver.valid(semver.coerce(version)) as string

export const intersectsVersions = (range: string, version: string) => {
  const parsedRange = `${semver.major(range)}.${semver.minor(range)}.x`
  const parsedVersion = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}`

  return semver.intersects(parsedRange, parsedVersion)
}
