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
* @param {string} input.type tracks|artirts
* @param {number} input.offset
* @param {number} input.limit
* @param {string} input.timeRange short_term|medium_term|long_term
* short_term => 4 weeks
* medium_term => 6 months
* long_term => several years
 */
export const _getTopTracksArtists = (input) => {
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
          images {
            url,
            isSquare
          }
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
          images {
            url,
            isSquare
          }
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
