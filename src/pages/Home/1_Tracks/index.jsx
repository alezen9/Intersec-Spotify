import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Tooltip, IconButton, useTheme, useMediaQuery } from '@material-ui/core'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import ListItemVinil from 'components/Vinil/ListItemVinil'
import { TopSearch } from '_redux/Entities'
import { get, maxBy, minBy } from 'lodash'
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded'
import TrackDetails from './Details'
import { setActiveSection } from '_redux/actions/configActions'
import { AnimatedListWrapper } from '../helpers'
import LoadingMask from 'components/LoadingMask'
import { checkIsFetching } from 'utils/utils'
import { playerTrackStatus } from '_redux/actions/playerActions'

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
  const { tracks, isFetching } = useSelector(state => ({
    tracks: get(state, 'music.top.tracks', []),
    isFetching: checkIsFetching({ state, key: GET_TOP_TRACKS_KEY })
  }))
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    const target = document.querySelector('#tracks-grid')
    dispatch(setActiveSection({
      target,
      title: 'Tracks'
    }))
  }, [dispatch])

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

  const setPlayingStatus = track => () => {
    dispatch(playerTrackStatus({
      id: track.id,
      uri: track.uri,
      previewUri: track.previewUri,
      duration: track.duration,
      title: track.name,
      artist: get(track, 'artists[0].name', ''),
      cover: minBy(get(track, 'album.images', []), 'width').url
    }))
  }

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <LoadingMask isLoading={isFetching}>
      <AnimatedListWrapper>
        {tracks.items && tracks.items.map((track, i) => {
          return isSmallScreen
            ? <ListItemVinil
              id={track.id}
              key={`top-track-${i}`}
              name={track.name}
              artist={get(track, 'artists[0].name', '')}
              background={minBy(get(track, 'album.images', []), 'width').url}
              playTrack={setPlayingStatus(track)}
              details={<TrackDetails id={track.id} />}
            />
            : <Vinil
              id={track.id}
              key={`top-track-${i}`}
              name={track.name}
              playTrack={setPlayingStatus(track)}
              background={maxBy(get(track, 'album.images', []), 'width').url}
              fullCover={maxBy(get(track, 'album.images', []), 'width').url}
              smallCover={minBy(get(track, 'album.images', []), 'width').url}
              infoHeader={get(track, 'artists[0].name', '')}
              infoSubheader={track.name}
              actions={<Actions url={track.previewUri} />}
              details={<TrackDetails id={track.id} />}
            />
        })}
      </AnimatedListWrapper>
    </LoadingMask>
  )
}

export default React.memo(Tracks)
