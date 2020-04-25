import React, { useLayoutEffect, useCallback, useRef, useState } from 'react'
import { makeStyles, IconButton, Tooltip, Grid } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import MinimizeRoundedIcon from '@material-ui/icons/MinimizeRounded'
import { asyncTimeout } from 'utils/utils'
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded'
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded'
import { ProgressTrack } from './helpers'
import { Controls } from './helpers'

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
      justifyContent: 'center',
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
        backgroundImage: ({ smallCover }) => `url("${smallCover}")`,
        backgroundSize: ({ isFullScreen }) => isFullScreen ? 100 : 1,
        transform: ({ isFullScreen }) => isFullScreen ? 'scale(10)' : 'none',
        transformOrigin: 'top left',
        filter: ({ isFullScreen }) => isFullScreen ? 'blur(10px) brightness(.8)' : 'brightness(.8)',
        opacity: 0.8,
        willChange: 'contents, transform, filter'

      }
    },
    playerWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: size,
      alignItems: 'center',
      opacity: ({ open }) => open ? 1 : 0,
      transform: ({ open }) => open ? 'scale(1)' : 'scale(.5)',
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
        backgroundImage: ({ smallCover, fullCover }) => fullCover
          ? `url("${fullCover}")`
          : `url("${smallCover}")`,
        backgroundSize: 'cover',
        position: 'absolute',
        content: '""',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        filter: ({ fullCover }) => fullCover ? 'unset' : 'blur(25px)',
        transition: 'all ease-in .3s',
        willChange: 'contents, filter'
      }
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
  const { open, handleClosePlayer, smallCover, fullCover } = props
  const [isFullScreen, setIsFullScreen] = useState(false)
  const classes = useStyles({ open, smallCover, fullCover, isFullScreen })
  const ref = useRef(null)

  useLayoutEffect(() => {
    const setBodyPosition = async () => {
      if (open) await asyncTimeout(600)
      document.body.style.position = open ? 'fixed' : 'unset'
    }
    setBodyPosition()
  }, [open])

  const handleFullScreen = useCallback(
    async () => {
      if (ref) {
        if (isFullScreen && document.fullscreen) {
          await document.exitFullscreen()
        } else {
          await ref.current.requestFullscreen()
        }
        setIsFullScreen(state => !state)
      }
    }, [isFullScreen])

  return (
    <div ref={ref} className={classes.main}>
      <Grid container spacing={3} className={classes.tooltips} justify='flex-end'>
        <Grid item>
          <Tooltip title='Minimize'>
            <IconButton aria-label='minimize' onClick={handleClosePlayer}>
              <MinimizeRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='Fullscreen'>
            <IconButton aria-label='fullscreen' onClick={handleFullScreen}>
              {isFullScreen
                ? <FullscreenExitRoundedIcon />
                : <FullscreenRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
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
        <ProgressTrack />
        <Controls />
      </div>
    </div>
  )
}

export default React.memo(DesktopPlayer)
