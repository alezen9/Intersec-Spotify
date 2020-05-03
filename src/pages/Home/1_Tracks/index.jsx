import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Tooltip, IconButton, useTheme, useMediaQuery } from '@material-ui/core'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import ListItemVinil from 'components/Vinil/ListItemVinil'
import { TopSearch } from '_redux/Entities'
import { get, maxBy, minBy } from 'lodash'
import PauseRoundedIcon from '@material-ui/icons/PauseRounded'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import TrackDetails from './Details'
import { setActiveSection } from '_redux/actions/configActions'
import { AnimatedListWrapper } from '../helpers'
import LoadingMask from 'components/LoadingMask'
import { checkIsFetching } from 'utils/utils'
import { playerTrackStatus } from '_redux/actions/playerActions'
import CustomDialog from 'components/Dialog'
import { GET_LYRICS_KEY } from './Lyrics'

const GET_TOP_TRACKS_KEY = 'GET_TOP_TRACKS_KEY'

const Actions = React.memo(props => {
  const { id, playTrack, isPlayable } = props
  const { currentTrack, ref, isPlaying } = useSelector(state => ({
    currentTrack: get(state, 'player.current.id', null),
    ref: get(state, 'player.simplePlayerId', null),
    isPlaying: get(state, 'player.isPlaying', false)
  }))

  const audioRef = useMemo(() => {
    if (ref) return document.getElementById(ref)
    else return null
  }, [ref])

  const togglePlay = () => {
    if (currentTrack !== id) {
      playTrack()
    } else if (currentTrack === id) {
      if (audioRef.paused) audioRef.play()
      else if (!audioRef.paused) audioRef.pause()
    }
  }

  return isPlayable
    ? <>
      <Grid item>
        {<Tooltip
          title='Play'
          onClick={togglePlay}
          arrow>
          <IconButton color='primary' aria-label='Play'>
            {currentTrack !== id
              ? <PlayArrowRoundedIcon />
              : !isPlaying
                ? <PlayArrowRoundedIcon />
                : <PauseRoundedIcon />}
          </IconButton>
        </Tooltip>}
      </Grid>
    </>
    : <></>
})

const Tracks = props => {
  const { filters } = props
  const _filters = useRef(filters)
  const dispatch = useDispatch()
  const { items, offset, total, isFetching, requestLyrics } = useSelector(state => ({
    ...get(state, `music.top.tracks.${filters.timeRange}`, {}),
    isFetching: checkIsFetching({ state, key: GET_TOP_TRACKS_KEY }),
    requestLyrics: get(state, `request.${GET_LYRICS_KEY}`)
  }))

  const hasMore = offset + 20 <= total

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [details, setDetails] = useState(null)
  const [element, setElement] = useState(null)
  const observer = useRef(
    new window.IntersectionObserver(
      entries => {
        const first = entries[0]
        if (first.isIntersecting) {
          dispatch(getTopTracksArtists({
            key: GET_TOP_TRACKS_KEY,
            type: TopSearch.Tracks,
            more: true,
            ..._filters.current
          }))
        }
      },
      { threshold: 1 }
    )
  )

  useEffect(() => {
    _filters.current = filters
  }, [filters])

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
    [dispatch])

  const onCloseDialog = useCallback(
    () => {
      if (get(requestLyrics, 'status', null) === 'REQUEST_FETCHING' && get(requestLyrics, 'cancelToken', null)) {
        requestLyrics.cancelToken.cancel()
      }
      setDetails(null)
    },
    [requestLyrics])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current

    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  const listProps = useMemo(() => items && items.length
    ? items.map(track => ({
      id: track.id,
      name: track.name,
      key: `top-track-${track.id}`,
      artist: get(track, 'artists[0].name', ''),
      fullCover: maxBy(get(track, 'album.images', []), 'width').url,
      smallCover: minBy(get(track, 'album.images', []), 'width').url,
      playTrack: setPlayingStatus(track),
      details: <TrackDetails id={track.id} />,
      isPlayable: !!(track.previewUri || track.previewUriDezeer),
      actions: <Actions isPlayable={!!(track.previewUri || track.previewUriDezeer)} id={track.id} playTrack={setPlayingStatus(track)} />,
      infoHeader: get(track, 'artists[0].name', ''),
      infoSubheader: track.name,
      openDetails: () => setDetails({
        name: track.name,
        id: track.id,
        fullHeight: !isSmallScreen
      })
    }))
    : [], [items, isSmallScreen, setPlayingStatus])

  return (
    <>
      <LoadingMask isLoading={isFetching}>
        <AnimatedListWrapper>
          {listProps.map(p => <Item {...p} isSmallScreen={isSmallScreen} />)}
        </AnimatedListWrapper>
        {!isFetching && hasMore && <div ref={setElement} style={{ background: 'transparent' }} />}
      </LoadingMask>
      <CustomDialog
        title={get(details, 'name', '')}
        open={!!details}
        fullHeight={get(details, 'fullHeight', '')}
        onClose={onCloseDialog}
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
