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
