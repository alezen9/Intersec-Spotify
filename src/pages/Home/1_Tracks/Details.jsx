import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrackById } from '_redux/actions/musicActions'
import { Grid, makeStyles, Divider, FormControlLabel, Switch, useTheme, useMediaQuery } from '@material-ui/core'
import { get } from 'lodash'
import { AvatarGridTypographyLabel } from 'components/GridTypographyLabel'
import Lyrics from './Lyrics'
import TiltCard from 'components/TiltCard'

const GET_TRACK_KEY = 'GET_TRACK_KEY'

const useStyles = makeStyles(theme => ({
  cover: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    width: '100%',
    borderRadius: 5,
    paddingBottom: '100%',
    '&:before': {
      backgroundImage: ({ background }) => `url(${background})`,
      backgroundSize: 'cover',
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      transition: 'all .1s ease-in'
    }
  }
}))

const TrackDetails = props => {
  const { id } = props
  const dispatch = useDispatch()
  const details = useSelector(state => get(state, 'music.details', {}))
  const classes = useStyles({ background: get(details, 'album.images[0].url', '') })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  const getData = useCallback(
    () => {
      if (id) {
        dispatch(getTrackById({
          key: GET_TRACK_KEY,
          id
        }))
      }
    },
    [dispatch, id]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Grid container>

      <Grid item container spacing={3} style={{ margin: 0 }}>
        {!isSmallScreen && <Grid item xs={4}>
          <TiltCard className={classes.cover} />
        </Grid>}
        <Grid item container spacing={1} xs={isSmallScreen ? 12 : 8}>
          {get(details, 'artists', []).map(artist =>
            <AvatarGridTypographyLabel
              key={artist.id}
              xs={12}
              avatar={{
                alt: artist.name,
                src: get(artist, 'images[0].url', '')
              }}
              value={artist.name}
              label='Artist'
              maxwidth='unset'
            />)}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider light />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch color='primary' checked={checked} onChange={handleChange} />}
          label='Show lyrics'
        />
        <Lyrics showLyrics={checked} trackId={id} />
      </Grid>
    </Grid>
  )
}

export default React.memo(TrackDetails)
