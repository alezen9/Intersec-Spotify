import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
// actions
import IntersecTabs, { IntersecTab } from 'components/Tabs'
import { get } from 'lodash'
import Tracks from './Tracks'

const GET_TOP_TRACKS_ARTISTS_KEY = 'GET_TOP_TRACKS_ARTISTS_KEY'

const Home = props => {
  const dispatch = useDispatch()
  // const {
  //   player,
  //   userType,
  //   deviceId,
  //   spotifyId
  // } = useSelector(state => ({
  //   player: get(state, 'player', null),
  //   userType: get(state, 'user.type', null),
  //   deviceId: get(state, 'user.deviceId', null),
  //   spotifyId: get(state, 'user.spotifyId', null)
  // }))

  return (
    <IntersecTabs>
      <IntersecTab title='Tracks' component={<div>Tracks</div>} />
      <IntersecTab title='Artists' component={<div>Artists</div>} />
    </IntersecTabs>
  )
}

export default Home
