import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import { Typography, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTrackLyrics } from '_redux/actions/musicActions'
import { get } from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180
  },
  container: {
    display: 'flex',
    width: '100%'
  },
  paper: {
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  },
  loader: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -70%)'
  }
}))

const GET_LYRICS_KEY = 'GET_LYRICS_KEY'

const Lyrics = props => {
  const { showLyrics = false, trackId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const lyrics = useSelector(state => get(state, 'music.details.lyrics', null))

  useEffect(() => {
    if (showLyrics && !lyrics) {
      dispatch(getTrackLyrics({
        key: GET_LYRICS_KEY,
        id: trackId
      }))
    }
  }, [dispatch, lyrics, showLyrics, trackId])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Collapse in={showLyrics}>
          {lyrics
            ? <div className={classes.paper}>
              <Typography style={{ whiteSpace: 'pre-wrap' }} variant='body1'>
                {lyrics.trim()}
              </Typography>
            </div>
            : <div className={classes.loader}>
              <CircularProgress />
            </div>}
        </Collapse>
      </div>
    </div>
  )
}

export default Lyrics
