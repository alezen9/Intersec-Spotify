import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTracks } from 'redux/actions/userActions'
import { get } from 'lodash'

const GET_TRACKS_KEY = 'GET_TRACKS_KEY'

const Tracks = props => {
  const { toSearch } = props
  const dispatch = useDispatch()
  const spotifyId = useSelector(state => get(state, 'user.spotifyId', null))

  const getData = useCallback(
    () => {
      dispatch(getTracks({
        key: GET_TRACKS_KEY,
        toSearch,
        spotifyId
      }))
    },
    [spotifyId, toSearch, dispatch]
  )

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <div>
        Tracks
    </div>
  )
}

export default React.memo(Tracks)
