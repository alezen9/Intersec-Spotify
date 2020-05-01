import React, { useCallback } from 'react'
import { Slider, makeStyles, IconButton, Grid, useTheme, useMediaQuery } from '@material-ui/core'
import { typographyColor } from 'theme'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseRoundedIcon from '@material-ui/icons/PauseRounded'

const useStyles = makeStyles(theme => ({
  progressWrapper: {
    position: 'relative',
    width: '100%',
    color: typographyColor
  },
  progress: {
    width: '90%',
    height: '.1em',
    opacity: 0.5,
    display: 'flex'
  },
  thumb: {
    borderRadius: 1,
    width: 5,
    marginLeft: -2.5
  },
  buttons: {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    paddingRight: '1em',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  iconButton: {
    color: 'white',
    fontSize: '2em'
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

export const ProgressTrack = props => {
  const { withTime = true, timeScaled = 0, onChange, play, pause } = props
  const classes = useStyles()

  const handleChangeProgress = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      if (pause) pause()
      onChange(newValue * duration)
    }, [onChange, pause])

  const handleChangeCommitted = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      if (play) play()
    }, [play])

  return (
    <Grid spacing={0} container justify='space-between' alignItems='center' className={classes.progressWrapper}>
      {withTime && <Grid item xs={2}>
        <span>{getTime(timeScaled * duration)}</span>
      </Grid>}
      <Grid item xs={withTime ? 8 : 12}>
        <Slider
          classes={{
            root: classes.progress,
            thumb: classes.thumb
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
      {withTime && <Grid item xs={2}>
        <span>-{getTime(duration - (timeScaled * duration))}</span>
      </Grid>}
    </Grid>
  )
}

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
