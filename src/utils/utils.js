export const capitaliseFirstLetter = str => str.replace(/\b[a-zA-Z]/g, (match) => match.toUpperCase())

export const decamelize = (str, separator) => {
  separator = typeof separator === 'undefined' ? ' ' : separator

  return str
    ? capitaliseFirstLetter(str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .toLowerCase())
    : ''
}

export const undash = str => str.replace('-', ' ')

export const getTokenFromHash = hash => {
  if (typeof hash !== 'string') return undefined
  const isHashToken = hash.startsWith('#token')
  if (!isHashToken) return undefined
  const data = hash.split('=')
  if (data.length !== 2 || data[0] !== '#token') return undefined
  return data[1]
}

export const stringifyJSON = obj => {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj)
  }
  let props = Object
    .keys(obj)
    .map(key => `${key}:${stringifyJSON(obj[key])}`)
    .join(',')
  return `{${props}}`
}
