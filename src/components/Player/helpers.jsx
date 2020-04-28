import React, { useCallback } from 'react'
import { Slider, makeStyles, IconButton } from '@material-ui/core'
import { typographyColor } from 'theme'
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded'
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseRoundedIcon from '@material-ui/icons/PauseRounded'

const useStyles = makeStyles({
  progressWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    color: typographyColor
  },
  progress: {
    width: '70%',
    height: '.1em',
    opacity: 0.5
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
})

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
  const { withTime = true, timeScaled = 0, onChange } = props
  const classes = useStyles()

  const handleChangeProgress = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      onChange(newValue * duration)
    }, [onChange])

  const handleChangeCommitted = useCallback(
    (e, newValue) => {
      e.preventDefault()
      e.stopPropagation()
      onChange(newValue * duration)
    }, [onChange])

  return (
    <div className={classes.progressWrapper}>
      {withTime && <span>{getTime(timeScaled * duration)}</span>}
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
      {withTime && <span>-{getTime(duration - (timeScaled * duration))}</span>}
    </div>
  )
}

export const Controls = React.memo(props => {
  const { isPlaying, handlePlay } = props
  const classes = useStyles()

  return <div className={classes.buttons}>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      disabled
      aria-label='prev'>
      <FastRewindRoundedIcon />
    </IconButton>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      aria-label='play'>
      {!isPlaying
        ? <PlayArrowIcon />
        : <PauseRoundedIcon />}
    </IconButton>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      disabled
      aria-label='next'>
      <FastForwardRoundedIcon />
    </IconButton>
  </div>
})
