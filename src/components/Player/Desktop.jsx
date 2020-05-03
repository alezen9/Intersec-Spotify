import React, { useLayoutEffect, useCallback, useRef, useState } from 'react'
import { makeStyles, IconButton, Tooltip, Grid, useTheme, useMediaQuery, Typography } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { asyncTimeout } from 'utils/utils'
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded'
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded'
import { ProgressTrack, Controls, Lyrics } from './helpers'
import { useExtractColor } from 'utils/customHooks'
import { typographyColor } from 'theme'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined'

const useStyles = makeStyles(theme => {
  const size = '45vh'
  return {
    '@keyframes backgroundAnimate': {
      '0%': {
        filter: 'saturate(50%)'
      },
      '50%': {
        filter: 'saturate(150%)'
      },
      '100%': {
        filter: 'saturate(50%)'
      }
    },
    main: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 5,
      display: 'flex',
      justifyContent: ({ showLyrics }) => showLyrics ? 'space-evenly' : 'center',
      alignItems: 'center',
      zIndex: 1,
      backdropFilter: 'blur(50px)',
      transform: ({ open }) => open ? 'translateY(0)' : 'translateY(100vh)',
      transformOrigin: 'bottom',
      transition: 'transform .2s ease',
      willChange: 'transform',
      '&:before': {
        position: 'absolute',
        content: '""',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        backgroundImage: ({ smallCover, dominantColor, isFullScreen }) => isFullScreen
          ? `url("${smallCover}")`
          : dominantColor
            ? 'none'
            : `url("${smallCover}")`,
        backgroundColor: ({ dominantColor }) => dominantColor || 'unset',
        backgroundSize: ({ isFullScreen, dominantColor }) => isFullScreen ? 100 : dominantColor ? 0 : 1,
        transform: ({ isFullScreen }) => isFullScreen ? 'scale(10)' : 'none',
        transformOrigin: 'top left',
        filter: ({ isFullScreen, open }) => isFullScreen ? 'blur(10px) brightness(.8)' : 'brightness(.8)',
        opacity: 0.8,
        willChange: 'background-size, transform, filter'

      }
    },
    playerWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: size,
      alignItems: 'center',
      opacity: ({ open }) => open ? 1 : 0,
      transform: ({ open }) => open
        ? 'scale(1)'
        : 'scale(.5)',
      transition: 'opacity .5s ease .4s, transform .4s ease .4s',
      willChange: 'transform, opacity'
    },
    cover: {
      position: 'relative',
      overflow: 'hidden',
      height: size,
      width: size,
      borderRadius: 5,
      zIndex: 100,
      '&:before': {
        backgroundColor: 'grey',
        backgroundImage: ({ smallCover, fullCover }) => `url("${fullCover || smallCover}")`,
        backgroundSize: 'cover',
        position: 'absolute',
        content: '""',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        filter: ({ fullCover }) => fullCover ? 'unset' : 'blur(25px)',
        transition: 'all ease-in .3s',
        willChange: 'background-image, filter'
      }
    },
    info: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: typographyColor,
      margin: '2em 0'
    },
    tooltips: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '.5em',
      filter: 'invert(1)'
    }
  }
})

const DesktopPlayer = props => {
  const { open, handleClosePlayer, smallCover, fullCover, isPlaying, handlePlay, timeScaled, handleChangeProgress, play, pause } = props
  const dominantColor = useExtractColor(smallCover)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const classes = useStyles({ open, smallCover, fullCover, isFullScreen, dominantColor, showLyrics })
  const ref = useRef(null)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const track = useSelector(state => get(state, 'player.current', {}))

  useLayoutEffect(() => {
    const setBodyPosition = async () => {
      if (open) await asyncTimeout(600)
      document.body.style.overflow = open ? 'hidden' : 'auto'
    }
    setBodyPosition()
  }, [open])

  const handleFullScreen = useCallback(
    async () => {
      try {
        if (ref) {
          if (isFullScreen && document.fullscreen) {
            await document.exitFullscreen()
          } else {
            await ref.current.requestFullscreen()
          }
          setIsFullScreen(state => !state)
        }
      } catch (error) {
        console.log(error)
      }
    }, [isFullScreen])

  const progressProps = {
    timeScaled,
    onChange: handleChangeProgress,
    play,
    pause
  }

  const toggleLyrics = () => setShowLyrics(state => !state)

  return (
    <div ref={ref} className={classes.main}>
      <Grid container spacing={3} className={classes.tooltips} justify='flex-end'>
        {!isSmallScreen && <Grid item>
          <Tooltip title='Fullscreen'>
            <IconButton aria-label='fullscreen' onClick={handleFullScreen}>
              {isFullScreen
                ? <FullscreenExitRoundedIcon />
                : <FullscreenRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Grid>}
        <Grid item>
          <Tooltip title='Close'>
            <IconButton aria-label='close' onClick={handleClosePlayer}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <div className={classes.playerWrapper}>
        <div className={classes.cover} />
        <div className={classes.info}>
          {track.id
            ? <>
              <Typography variant='h6'>{get(track, 'artists[0].name', '-')}</Typography>
              <Typography variant='h5'>{get(track, 'name', '-')}</Typography>
              </>
            : <Typography variant='h6'>Not playing</Typography>}
        </div>
        <ProgressTrack {...progressProps} />
        <Controls
          isOpen={open}
          isSmallScreen={isSmallScreen}
          isPlaying={isPlaying}
          handlePlay={handlePlay} />
        {!isSmallScreen && track.id && <Tooltip title='Lyrics'>
          <IconButton
            aria-label='lyrics'
            onClick={toggleLyrics}
            style={{ color: typographyColor }}>
            <TextsmsOutlinedIcon {...showLyrics && { color: 'primary' }} />
          </IconButton>
        </Tooltip>}
      </div>
      <Lyrics id={track.id} open={showLyrics} isPlayerOpen={open} />
    </div>
  )
}

export default React.memo(DesktopPlayer)
