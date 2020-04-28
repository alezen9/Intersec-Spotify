import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react'
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
import CustomDialog from 'components/Dialog'

const GET_TOP_TRACKS_KEY = 'GET_TOP_TRACKS_KEY'

const Actions = React.memo(props => {
  const { url, playTrack } = props
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
          onClick={playTrack}
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
  const [details, setDetails] = useState(null)

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

  const setPlayingStatus = useCallback(
    track => () => {
      dispatch(playerTrackStatus(track))
    },
    [dispatch]
  )

  useEffect(() => {
    getData()
  }, [getData])

  const listProps = useMemo(() => tracks && tracks.items
    ? tracks.items.map((track, i) => ({
      id: track.id,
      name: track.name,
      key: `top-track-${i}`,
      artist: get(track, 'artists[0].name', ''),
      fullCover: maxBy(get(track, 'album.images', []), 'width').url,
      smallCover: minBy(get(track, 'album.images', []), 'width').url,
      playTrack: setPlayingStatus(track),
      details: <TrackDetails id={track.id} />,
      isPlayable: !!track.previewUri,
      actions: <Actions url={track.previewUri} playTrack={setPlayingStatus(track)} />,
      infoHeader: get(track, 'artists[0].name', ''),
      infoSubheader: track.name,
      openDetails: () => setDetails({
        name: track.name,
        id: track.id,
        fullHeight: !isSmallScreen
      })
    }))
    : [], [tracks, isSmallScreen, setPlayingStatus])

  return (
    <>
      <LoadingMask isLoading={isFetching}>
        <AnimatedListWrapper>
          {listProps.map(p => <Item {...p} isSmallScreen={isSmallScreen} />)}
        </AnimatedListWrapper>
      </LoadingMask>
      <CustomDialog
        title={get(details, 'name', '')}
        open={!!details}
        fullHeight={get(details, 'fullHeight', '')}
        onClose={() => setDetails(null)}
        content={<TrackDetails id={get(details, 'id', null)} />}
      />
    </>
  )
}

const Item = React.memo(props => {
  const { isSmallScreen, ...rest } = props
  return isSmallScreen
    ? <ListItemVinil {...rest} />
    : <Vinil {...rest} />
})

export default React.memo(Tracks)
