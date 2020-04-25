import { find, get } from 'lodash'

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

export const lazyLoadImage = url => new Promise((resolve, reject) => {
  const downloadedImg = new Image()
  downloadedImg.onload = () => {
    return resolve(url)
  }
  downloadedImg.src = url
})

export const checkIsFetching = ({ state = {}, key }) => {
  return key
    ? get(state, `request.${key}.status`, null) === 'REQUEST_FETCHING'
    : !!find(get(state, 'request', {}), ['status', 'REQUEST_FETCHING'])
}

export const asyncTimeout = async (milliseconds = 1000, withLog = false) => {
  return new Promise((resolve, reject) => {
    if (withLog) console.log(`Attendo ${milliseconds / 1000} secondi...`)
    setTimeout(() => resolve(), milliseconds)
  })
}

const support = (function () {
  if (!window.DOMParser) return false
  const parser = new DOMParser()
  try {
    parser.parseFromString('x', 'text/html')
  } catch (err) {
    return false
  }
  return true
})()

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
export const stringToHTML = str => {
  // If DOMParser is supported, use it
  if (support) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    return doc.body
  }
  const dom = document.createElement('div')
  dom.innerHTML = str
  return dom
}
