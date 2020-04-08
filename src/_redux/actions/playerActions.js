import axios from 'axios'
import { requestIsFetching, requestSuccess, requestFailure } from './requestActions'
import { apiInstance } from './utils'

// export const setupPlayer = ({ spotifyId = null }) => {
//   const key = 'SETUP_PLAYER'
//   return async dispatch => {
//     try {
//       requestIsFetching(dispatch)(key)
//       const A_TOKEN = await apiInstance.get(`auth/refresh/${spotifyId}`)
//       console.log(A_TOKEN)
//       // initialize player
//       if (window.Spotify !== null) {
//         let spotifyPlayer = new window.Spotify.Player({
//           name: 'Intersec',
//           getOAuthToken: cb => { cb(A_TOKEN.access_token) }
//         })
//         console.log(spotifyPlayer)
//       }

//       // setSpotifyPlayer(spotifyPlayer)
//       requestSuccess(dispatch)(key)
//     } catch (error) {
//       requestFailure(dispatch)(key, error)
//     }
//   }
// }

// export const getTopTracksArtists = ({ userType = 'tracks', spotifyId }) => {
//   const key = 'GET_TOP_TRACKS_ARTISTS'
//   return async dispatch => {
//     try {
//       requestIsFetching(dispatch)(key)
//       const promises = [
//         apiInstance.get(`api/top/tracks/${spotifyId}`).then(({ data }) => data.items),
//         apiInstance.get(`api/top/artists/${spotifyId}`).then(({ data }) => data.items)
//       ]
//       const [topTracks, topArtists] = await axios.all(promises)
//       console.log(topTracks, topArtists)
//       requestSuccess(dispatch)(key)
//     } catch (error) {
//       requestFailure(dispatch)(key, error)
//     }
//   }
// }

// fetch()
//                 .then(res => res.json())
//                 .then(data => {
//                     //save playable tracks so we can skipNext and skipPrevious
//                     if (toSearch === 'tracks') {
//                         let playableTracks = this.setPLayableTracks(data, userType);
//                         playableTracks = playableTracks.filter(el => el.hasOwnProperty('index'));
//                         playableSongs(playableTracks);
//                     }
//                     this.setState({ [toSearch]: data.items });
//                 })
