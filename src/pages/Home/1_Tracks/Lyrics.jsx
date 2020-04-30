import React, { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import { Typography, CircularProgress, Grid, Fab } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTrackLyrics } from '_redux/actions/musicActions'
import { requestResetByKey } from '_redux/actions/requestActions'
import { get } from 'lodash'
import { Genius, GeniusWordMark } from 'assets/CustomIcons'
import GridTypographyLabel from 'components/GridTypographyLabel'
import { teal } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    height: 180
  },
  container: {
    display: 'flex',
    width: '100%',
    paddingBottom: '2em'
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
  },
  squareBrackets: {
    fontWeight: 'bold'
  },
  geniusButton: {
    padding: '0 1.5em !important',
    color: theme.palette.genius.contrastText,
    backgroundColor: theme.palette.genius.main,
    '&:hover': {
      backgroundColor: theme.palette.genius.dark,
      '@media (hover: none)': {
        backgroundColor: theme.palette.genius.main
      }
    }
  }
}))

const GET_LYRICS_KEY = 'GET_LYRICS_KEY'

const Lyrics = props => {
  const { showLyrics = false, trackId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { lyrics, requestLyrics } = useSelector(state => ({
    lyrics: get(state, 'music.details.lyrics', null),
    requestLyrics: get(state, `request.${GET_LYRICS_KEY}`)
  }))

  useEffect(() => {
    return () => {
      dispatch(requestResetByKey(GET_LYRICS_KEY))
    }
  }, [dispatch])

  useEffect(() => {
    if (showLyrics && !lyrics && trackId) {
      dispatch(getTrackLyrics({
        key: GET_LYRICS_KEY,
        id: trackId
      }))
    }
  }, [dispatch, lyrics, showLyrics, trackId])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Collapse in={showLyrics} style={{ width: '100%' }}>
          {lyrics
            ? <div className={classes.paper}>
              <LyricsHeader {...lyrics} />
              <Typography style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }} variant='body1'>
                {lyrics.text.trim()}
              </Typography>
            </div>
            : <div className={classes.loader}>
              {get(requestLyrics, 'status', null) === 'REQUEST_FAILURE'
                ? <Typography style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }} variant='body1'>
              OOps, couldn't find any lyrics! :/
                </Typography>
                : <CircularProgress />}
            </div>}
        </Collapse>
      </div>
    </div>
  )
}

export default Lyrics

const LyricsHeader = React.memo(props => {
  const { accuracy, genius } = props
  const classes = useStyles()

  const goToGenius = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      const win = window.open(genius, '_blank')
      win.focus()
    },
    [genius]
  )

  const value = {
    rating: parseFloat(accuracy.overall * 10).toFixed(1),
    color: parseFloat(accuracy.overall * 10).toFixed(2) >= 7.5
      ? teal[500]
      : parseFloat(accuracy.overall * 10).toFixed(2) >= 5
        ? 'orange'
        : 'red'
  }

  return <Grid style={{ marginBottom: '2em' }} container spacing={1} justify='space-between' alignItems='center'>
    <GridTypographyLabel
      xs={4}
      label='Accuracy (0-10)'
      value={value.rating}
      typographyValueStyle={{ color: value.color }}
    />
    <Grid item>
      <Fab onClick={goToGenius} variant='extended' size='small' className={classes.geniusButton}>
        <Genius style={{ marginRight: '.5em' }} />
        <GeniusWordMark style={{ fontSize: '7em', height: 'auto' }} />
      </Fab>
    </Grid>
  </Grid>
})
