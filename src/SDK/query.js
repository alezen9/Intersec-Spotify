import { stringifyJSON } from 'utils/utils'
import cleanDeep from 'clean-deep'
import { TopSearch } from '_redux/Entities'

export const paramsToString = params => {
  let str = ''
  for (const key in params) str += key + ':"' + params[key] + '", '
  return `{${str.slice(0, -2)}}`
}

export const _getUserData = () => ({
  name: 'getUserData',
  query: `
    query {
        getUserData { 
            displayName,
            spotifyId,
            subscription,
            country,
            email,
            images
        }
    }`
})

/**
 *
 * @param {any} input
* @param {string} input.id tracks
* @param {any} input.fields fields to query
 */
export const _getTrackById = input => {
  const { id, fields } = input
  const _fields = JSON.stringify(fields) ||
    `{
      id,
      name,
      artists{
        id,
        name,
        images
      },
      duration,
      popularity,
      album {
        id,
        name,
        images
      }
    }`
  return {
    name: 'getTrackById',
    query: `
    query {
      getTrackById(id: "${id}") ${_fields}
    }`
  }
}

export const _getTopTracksArtists = input => {
  const params = stringifyJSON(cleanDeep(input))
  const fields = input.type === TopSearch.Tracks
    ? `{
      ... on Track {
        id,
        name,
        uri,
        duration,
        explicit,
        previewUri,
        popularity,
        isAvailableCountry,
        album {
          id,
          name,
          images
        },
        artists {
          id,
          name
        }
      }
  }`
    : `{
        ... on Artist {
          id,
          name,
          images
        }
    }`

  return {
    name: 'getTopTracksArtists',
    query: `
      query {
        getTopTracksArtists(topTracksArtistsInput: ${params}) {
            total,
            offset,
            limit,
            items ${fields}
        }
      }`
  }
}
