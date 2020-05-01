import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { boxShadow, typographyColor } from 'theme'
import { Controls, ProgressTrack } from './helpers'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { motion, useMotionValue } from 'framer-motion'

const Transition = React.forwardRef((props, ref) => {
  return <Slide ref={ref} direction='up' {...props} />
})

const useStyles = makeStyles(theme => ({
  root: {
    transform: ({ y }) => `translateY(${y}px)`,
    willChange: 'transform',
    transition: ({ isDragging }) => !isDragging && 'transform .3s ease',
    '&>div.MuiBackdrop-root': {
      backgroundColor: 'transparent'
    }
  },
  paper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  title: {
    transform: ({ y }) => `translateY(${-y + 25}px)`,
    willChange: 'transform'
  },
  dragLine: {
    height: 5,
    backgroundColor: typographyColor,
    borderRadius: 10
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    overflowY: 'visible',
    transform: ({ y }) => `translateY(${-y + 25}px)`,
    willChange: 'transform'
  },
  cover: {
    position: 'relative',
    overflow: 'hidden',
    height: '70vw',
    width: '70vw',
    borderRadius: 5,
    zIndex: 100,
    boxShadow,
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
  controlsWrapper: {
    width: '100%',
    '&>div:nth-of-type(2)': {
      height: 'auto',
      paddingRight: 0,
      '& svg': {
        fontSize: '1.5em'
      }
    }
  }
}))

const MobilePlayer = props => {
  const { open, handleClosePlayer, smallCover, fullCover, isPlaying, handlePlay, timeScaled, handleChangeProgress, play, pause } = props
  const [y, setY] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const classes = useStyles({ smallCover, fullCover, y, isDragging })
  const track = useSelector(state => get(state, 'player.current', {}))
  const _y = useMotionValue(0)

  const progressProps = {
    timeScaled,
    onChange: handleChangeProgress,
    play,
    pause
  }

  useEffect(() => {
    if (open) {
      setY(25)
      _y.set(0)
    }
  }, [open, _y])

  const onDrag = (e, info) => {
    const y = parseInt(info.point.y)
    if (y < 25) setY(25)
    else setY(y)
  }

  const onDragStart = (e, info) => {
    setIsDragging(true)
  }

  const onDragEnd = (e, info) => {
    const y = parseInt(info.point.y)
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    if (y <= vh / 3) {
      setY(25)
      _y.set(0)
    } else handleClosePlayer()
    setIsDragging(false)
  }

  return (
    <Dialog
      classes={{
        root: classes.root,
        paper: classes.paper
      }}
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={handleClosePlayer}
      fullWidth
      fullScreen
      aria-labelledby='player'
      aria-describedby='player'
      id='intersec-mobile-player'
    >
      <motion.div
        drag='y'
        dragConstraints={{ top: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ y: _y }}
      >
        <DialogTitle className={classes.title}>
          <Grid container spacing={0} justify='center'>
            <Grid item xs={2} className={classes.dragLine} />
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <div className={classes.cover} />
          <div className={classes.info}>
            <Typography variant='h6'>{get(track, 'artists[0].name', '-')}</Typography>
            <Typography variant='h5' color='primary'>{get(track, 'name', '-')}</Typography>
          </div>
          <div className={classes.controlsWrapper}>
            <ProgressTrack {...progressProps} />
            <Controls
              isOpen={open}
              isSmallScreen
              isPlaying={isPlaying}
              handlePlay={handlePlay} />
          </div>
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}

export default React.memo(MobilePlayer)
