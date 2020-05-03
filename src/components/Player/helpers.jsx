import React, { useCallback, useEffect } from 'react'
import { Slider, makeStyles, IconButton, Grid, useTheme, useMediaQuery, Typography } from '@material-ui/core'
import { typographyColor } from 'theme'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseRoundedIcon from '@material-ui/icons/PauseRounded'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { requestResetByKey } from '_redux/actions/requestActions'
import { getTrackLyrics } from '_redux/actions/musicActions'
import Spinner from 'components/Loaders/Spinner'

const useStyles = makeStyles(theme => ({
  progressWrapper: {
    position: 'relative',
    width: '100%',
    color: typographyColor
  },
  progress: {
    width: '100%',
    height: '.1em',
    opacity: 0.5,
    display: 'flex',
    position: 'relative',
    padding: '.5em 0'
  },
  rail: {
    height: 3,
    backgroundColor: typographyColor
  },
  track: {
    height: 3
  },
  buttons: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  iconButton: {
    color: 'white',
    fontSize: '2em'
  },
  lyrics: {
    width: ({ open }) => open ? '60vh' : 0,
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: 'rgba(255,255,255,.5)',
    height: '80vh',
    overflowY: 'auto',
    whiteSpace: 'pre-line',
    paddingBottom: '3em',
    maskImage: '-webkit-gradient(linear,left 85%,left bottom,from(black),to(rgba(0,0,0,0)))',
    transform: ({ open }) => open
      ? 'scale(1)'
      : 'scale(0)',
    willChange: 'transform, width',
    transition: 'transform .3s ease',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3em'
  }
}))

const getTime = s => {
  const minutes = parseInt(s / 60)
  const seconds = parseInt(s % 60)
  const _m = String(minutes).length > 1
    ? minutes
    : `0${minutes}`
  const _s = String(seconds).length > 1
    ? seconds
    : `0${seconds}`
  return `${_m}:${_s}`
}

const duration = 30

const scale = dur => x => (x * dur).toFixed(2)

export const ProgressTrack = React.memo(props => {
  const { timeScaled = 0, onChange, play, pause } = props
  const track = useSelector(state => get(state, 'player.current', null))
  const classes = useStyles()

  const handleChangeProgress = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      if (pause && track) pause()
      onChange(newValue * duration)
    }, [onChange, pause, track])

  const handleChangeCommitted = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      if (play && track) play()
    }, [play, track])

  return (
    <Grid spacing={0} container justify='space-between' alignItems='center' className={classes.progressWrapper}>
      <Grid item xs={12}>
        <Slider
          classes={{
            root: classes.progress,
            rail: classes.rail,
            track: classes.track
          }}
          min={0}
          step={1 / duration}
          max={1}
          scale={scale(duration)}
          value={timeScaled}
          defaultValue={0}
          onChange={handleChangeProgress}
          onChangeCommitted={handleChangeCommitted}
          aria-labelledby='progress-track' />
      </Grid>
      <Grid container item xs={12} spacing={0} justify='space-between'>
        <Grid item xs={6}>
          <span>
            {track ? getTime(timeScaled * duration) : '00:00'}
          </span>
        </Grid>
        <Grid item xs={6} align='right'>
          <span>
            {track ? `-${getTime(duration - (timeScaled * duration))}` : '00:00'}
          </span>
        </Grid>
      </Grid>
    </Grid>
  )
})

export const Controls = React.memo(props => {
  const { isPlaying, handlePlay, isOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return <div className={classes.buttons}>
    {(!isSmallScreen || isOpen) && <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      disabled
      aria-label='prev'>
      <SkipPreviousRoundedIcon />
    </IconButton>}
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      aria-label='play'>
      {!isPlaying
        ? <PlayArrowIcon />
        : <PauseRoundedIcon />}
    </IconButton>
    {(!isSmallScreen || isOpen) && <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      disabled
      aria-label='next'>
      <SkipNextRoundedIcon />
    </IconButton>}
  </div>
})

const GET_LYRICS_KEY = 'GET_LYRICS_KEY'

export const Lyrics = React.memo(props => {
  const { open, id, isPlayerOpen } = props
  const classes = useStyles({ open })
  const dispatch = useDispatch()
  const { lyrics, requestLyrics } = useSelector(state => {
    return {
      lyrics: get(state, `music.details.${id}.lyrics`, null),
      requestLyrics: get(state, `request.${GET_LYRICS_KEY}`)
    }
  })

  useEffect(() => {
    return () => {
      dispatch(requestResetByKey(GET_LYRICS_KEY))
    }
  }, [dispatch])

  useEffect(() => {
    if (open && isPlayerOpen && !lyrics && id) {
      dispatch(getTrackLyrics({
        key: GET_LYRICS_KEY,
        id: id
      }))
    }
  }, [dispatch, lyrics, open, isPlayerOpen, id])

  return isPlayerOpen
    ? <div className={classes.lyrics}>
      {get(requestLyrics, 'status', null) === 'REQUEST_FAILURE'
        ? <Typography style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }} variant='body1'>
              OOps, couldn't find any lyrics! :/
        </Typography>
        : lyrics
          ? lyrics.text.trim()
          : <div className={classes.spinner}>
            <Spinner />
          </div>}
    </div>
    : <></>
})
