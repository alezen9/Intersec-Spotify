import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// css
import './Home.css'
// components
import Grid from '../Grid'
// actions
import { setSpotifyPlayer, setDeviceId, setPlayerState } from 'actions/index'
import { UserType, TopSearch } from '_redux/Entities'
import IntersecTabs, { IntersecTab } from 'components/Tabs'
import { get } from 'lodash'
import { getTopTracksArtists } from '_redux/actions/userActions'
import Tracks from './Tracks'

const GET_TOP_TRACKS_ARTISTS_KEY = 'GET_TOP_TRACKS_ARTISTS_KEY'

const Home = props => {
  const dispatch = useDispatch()
  const {
    player,
    userType,
    deviceId,
    spotifyId
  } = useSelector(state => ({
    player: get(state, 'player', null),
    userType: get(state, 'user.type', null),
    deviceId: get(state, 'user.deviceId', null),
    spotifyId: get(state, 'user.spotifyId', null)
  }))

  const getData = useCallback(
    () => {
      dispatch(getTopTracksArtists({
        key: GET_TOP_TRACKS_ARTISTS_KEY,
        spotifyId
      }))
    },
    [spotifyId, dispatch]
  )

  useEffect(() => {
    getData()
  }, [getData])

  // const createEventHandlers = () => {
  //   // errors
  //   player.on('initialization_error', e => { console.error(e) })
  //   player.on('authentication_error', e => { console.error(e) })
  //   player.on('account_error', e => { console.error(e) })
  //   player.on('playback_error', e => { console.error(e) })
  //   // Playback status updates
  //   player.on('player_state_changed', state => { setPlayerState(state) })
  //   // Ready
  //   player.on('ready', ({ deviceId }) => { setDeviceId(deviceId) })
  // }

  // componentDidMount() {
  //   const { userType, spotifyId, setSpotifyPlayer, player } = this.props;
  //   if (userType === 'premium' && !player) {
  //     fetch(`${keys.backend_url}auth/refresh/${spotifyId}`)
  //       .then(response => response.json())
  //       .then(A_TOKEN => {
  //         // initialize player
  //         if (window.Spotify !== null) {
  //           let spotifyPlayer = new window.Spotify.Player({
  //             name: "Intersec",
  //             getOAuthToken: cb => { cb(A_TOKEN.access_token); },
  //           });
  //           setSpotifyPlayer(spotifyPlayer);
  //         }
  //       })
  //   }
  // }

  // useEffect(() => {
  //   if (!player && userType === UserType.Premium) {
  //     dispatch(setupPlayer({ spotifyId }))
  //   }
  // }, [dispatch, player, userType, spotifyId])

  // useEffect(() => {
  //   if (spotifyId) {
  //     dispatch(getTopTracksArtists({ key: GET_TOP_TRACKS_ARTISTS_KEY, spotifyId }))
  //   }
  // }, [dispatch, spotifyId])

  // useEffect(() => {
  //   if (player && !deviceId) connectPlayer()
  // }, [player, deviceId])

  // const connectPlayer = () => {
  //   player.connect()
  //     .then(success => { if (success) { createEventHandlers() } })
  // }

  return (
    <div className='home'>
      <div className='wrapper'>
        <IntersecTabs>
          <IntersecTab title='Tracks' component={<Tracks {...{ userType, spotifyId, toSearch: 'tracks' }} />} />
          <IntersecTab title='Artists' component={<div />} />
        </IntersecTabs>
      </div>
    </div>
  )
}

const mapDidpatchToProps = (dispatch) => {
  return {
    setSpotifyPlayer: (player) => { dispatch(setSpotifyPlayer(player)) },
    setDeviceId: (id) => { dispatch(setDeviceId(id)) },
    setPlayerState: (state) => { dispatch(setPlayerState(state)) }
  }
}

export default Home
