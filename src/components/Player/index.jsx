import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useTheme, useMediaQuery, makeStyles, Typography } from '@material-ui/core'
// import MobilePlayer from './Mobile'
import DesktopPlayer from './Desktop'
import { asyncTimeout } from 'utils/utils'
import { useSelector } from 'react-redux'
import { get, minBy, maxBy, isEmpty } from 'lodash'
import { useLazyLoad } from 'utils/customHooks'
import { Controls } from './helpers'
import { teal } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  player: {
    position: 'fixed',
    bottom: -30,
    left: 0,
    width: '100vw',
    height: 120,
    padding: 10,
    borderRadius: 5,
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: '70px 10fr 4fr',
    gridTemplateRows: 70,
    gridRowGap: 0,
    gridColumnGap: 5,
    zIndex: 1,
    backdropFilter: 'blur(50px)',
    overflow: 'hidden',
    background: 'rgba(26, 27, 31,.8)',
    cursor: 'pointer'
  },
  cover: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    borderRadius: 5,
    '&:before': {
      backgroundColor: 'grey',
      backgroundImage: ({ small }) => `url("${small}")`,
      backgroundSize: 'cover',
      position: 'absolute',
      content: '""',
      width: '80%',
      height: '80%',
      top: '50%',
      left: '50%',
      borderRadius: 5,
      transform: 'translate(-50%, -50%)',
      transition: 'background-image ease-in .4s'
    }
  },
  info: {
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 10,
    color: 'white',
    fontSize: '1.2em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    zIndex: 1,
    transformOrigin: 'left',
    borderRadius: 3,
    width: '100%',
    transform: 'scaleX(0)',
    background: teal[500],
    transition: 'transform .1s linear',
    willChange: 'transform'
  }
}))

const Player = props => {
  const [fullPlayer, setFullPlayer] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [displayFull, setDisplayFull] = useState('none')
  const [isPlaying, setIsPLaying] = useState(false)
  const [time, setTime] = useState(0)
  const audioRef = useRef()
  const track = useSelector(state => get(state, 'player.current', {}))
  const { large, small } = useMemo(() => {
    if (isEmpty(track)) return {}
    else {
      return {
        large: maxBy(get(track, 'album.images', []), 'width').url,
        small: minBy(get(track, 'album.images', []), 'width').url
      }
    }
  }, [track])
  const { player, cover, info, progress } = useStyles({ small })
  const fullCover = useLazyLoad(large)

  const handleOpenPlayer = useCallback(
    e => {
      setFullPlayer(true)
      setDisplayFull('block')
    },
    [setFullPlayer]
  )

  const handleClosePlayer = useCallback(
    async e => {
      if (document.fullscreen) {
        await document.exitFullscreen()
        await asyncTimeout(200)
      }
      setFullPlayer(false)
      await asyncTimeout(100)
      if (!fullPlayer) setDisplayFull('none')
    },
    [setFullPlayer, fullPlayer])

  const handlePlay = e => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
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

  useEffect(() => {
    if (!isEmpty(track)) setIsPLaying(true)
    else setIsPLaying(false)
  }, [track])

  const handleChangeProgress = val => {
    if (get(audioRef, 'current', null) && !isEmpty(track)) {
      audioRef.current.currentTime = val
    }
  }

  const onTimeUpdate = e => {
    const current = e.target.currentTime
    setTime(current / 30)
  }

  const onEnd = e => {
    setIsPLaying(false)
    setTime(0)
  }

  const fullPlayerProps = {
    open: fullPlayer,
    handleClosePlayer,
    smallCover: small,
    fullCover,
    handlePlay,
    isPlaying,
    timeScaled: time,
    handleChangeProgress
  }

  return <>
    <audio
      ref={audioRef}
      src={track.previewUri}
      onEnded={onEnd}
      onTimeUpdate={onTimeUpdate}
      autoPlay
      hidden />
    {!fullPlayer && <div onClick={handleOpenPlayer} className={player}>
      <div className={progress} style={{ transform: `scaleX(${time})` }} />
      <div className={cover} />
      <div className={info}>
        <Typography variant='h5'>{get(track, 'artists[0].name', 'Not playing')}</Typography>
        {get(track, 'name', null) && <Typography variant='caption'>{get(track, 'name', '-')}</Typography>}
      </div>
      <Controls isPlaying={isPlaying} handlePlay={handlePlay} />
    </div>}
    <div style={{ display: displayFull }}>
      {isSmallScreen
        ? <DesktopPlayer {...props} {...fullPlayerProps} />
        : <DesktopPlayer {...props} {...fullPlayerProps} />}
    </div>
      </>
}

export default React.memo(Player)
