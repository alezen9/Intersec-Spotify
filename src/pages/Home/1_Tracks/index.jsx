import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Tooltip, IconButton } from '@material-ui/core'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import { TopSearch } from '_redux/Entities'
import { get } from 'lodash'
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded'
import TrackDetails from './Details'

const GET_TOP_TRACKS_KEY = 'GET_TOP_TRACKS_KEY'

const Actions = React.memo(props => {
  const { url } = props
  const audioRef = useRef(null)
  const [isPlaying, setIsPLaying] = useState(false)

  const playThis = () => {
    if (audioRef) {
      const audio = audioRef.current
      if (audio.paused) {
        audio.play()
        setIsPLaying(true)
      } else {
        audio.pause()
        setIsPLaying(false)
      }
    }
  }
  return url
    ? <>
      <Grid item>
        <Tooltip
          title='Play'
          onClick={playThis}
          arrow>
          <IconButton color='primary' aria-label='Play'>
            {!isPlaying
              ? <PlayCircleFilledRoundedIcon />
              : <PauseCircleFilledRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
      <audio
        ref={audioRef}
        src={url}
        onEnded={() => setIsPLaying(false)}
        hidden />
    </>
    : <></>
})

const Tracks = props => {
  const { filters } = props
  const dispatch = useDispatch()
  const { tracks } = useSelector(state => state.music.top)

  const getData = useCallback(
    () => {
      dispatch(getTopTracksArtists({
        key: GET_TOP_TRACKS_KEY,
        type: TopSearch.Tracks,
        ...filters
      }))
    },
    [dispatch, filters]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Grid container spacing={3} alignItems='stretch'>
      {tracks.items && tracks.items.map((track, i) => {
        return <Vinil
          id={track.id}
          key={`top-track-${i}`}
          name={track.name}
          background={get(track, 'album.images[0].url', '')}
          infoHeader={get(track, 'artists[0].name', '')}
          infoSubheader={track.name}
          actions={<Actions url={track.previewUri} />}
          details={<TrackDetails id={track.id} />}
        />
      })}
    </Grid>
  )
}

export default React.memo(Tracks)
