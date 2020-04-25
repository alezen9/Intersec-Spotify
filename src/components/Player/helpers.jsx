import React, { useState, useCallback } from 'react'
import { Slider, makeStyles, IconButton } from '@material-ui/core'
import { typographyColor } from 'theme'
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded'
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

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

const duration = 239

const scale = dur => x => (x * dur).toFixed(2)

export const ProgressTrack = props => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChangeProgress = useCallback(
    (e, newValue) => {
      setValue(newValue)
    },
    [setValue])

  const handleChangeCommitted = useCallback(
    (e, newValue) => {
      console.log(newValue)
    },
    [])

  return (
    <div className={classes.progressWrapper}>
      <span>{getTime(value * duration)}</span>
      <Slider
        className={classes.progress}
        min={0}
        step={1 / duration}
        max={1}
        scale={scale(duration)}
        value={value}
        defaultValue={0}
        onChange={handleChangeProgress}
        onChangeCommitted={handleChangeCommitted}
        aria-labelledby='progress-track' />
      <span>-{getTime(duration - (value * duration))}</span>
    </div>
  )
}

export const Controls = props => {
  const { handlePlay = () => console.log('play') } = props
  const classes = useStyles()
  return <div className={classes.buttons}>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      aria-label='prev'>
      <FastRewindRoundedIcon />
    </IconButton>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      aria-label='play'>
      <PlayArrowIcon />
    </IconButton>
    <IconButton
      onClick={handlePlay}
      className={classes.iconButton}
      aria-label='next'>
      <FastForwardRoundedIcon />
    </IconButton>
  </div>
}
