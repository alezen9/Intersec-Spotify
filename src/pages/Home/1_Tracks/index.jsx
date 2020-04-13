import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import { TopSearch } from '_redux/Entities'
import { get } from 'lodash'

const GET_TOP_TRACKS_KEY = 'GET_TOP_TRACKS_KEY'

const Tracks = props => {
  const dispatch = useDispatch()
  const { tracks } = useSelector(state => state.music.top)

  const getData = useCallback(
    () => {
      dispatch(getTopTracksArtists({
        key: GET_TOP_TRACKS_KEY,
        type: TopSearch.Tracks
      }))
    },
    [dispatch]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Grid container spacing={3} alignItems='stretch'>
      {tracks.items && tracks.items.map((track, i) =>
        <Vinil
          id={track.id}
          key={`top-track-${i}`}
          name={track.name}
          background={get(track, 'album.images', []).find(({ isSquare }) => isSquare) || get(track, 'album.images[0]', {})}
          infoHeader={get(track, 'artists[0].name', '')}
          infoSubheader={track.name}
        />)}
    </Grid>
  )
}

export default React.memo(Tracks)
