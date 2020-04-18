import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrackById } from '_redux/actions/musicActions'
import { Grid, makeStyles, Divider, FormControlLabel, Switch } from '@material-ui/core'
import { get } from 'lodash'
import { AvatarGridTypographyLabel } from 'components/GridTypographyLabel'
import Lyrics from './Lyrics'

const GET_TRACK_KEY = 'GET_TRACK_KEY'

const useStyles = makeStyles(theme => ({
  img: {
    width: '100%'
  }
}))

const TrackDetails = props => {
  const { id } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const details = useSelector(state => get(state, 'music.details', {}))
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  const getData = useCallback(
    () => {
      dispatch(getTrackById({
        key: GET_TRACK_KEY,
        id
      }))
    },
    [dispatch, id]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Grid container spacing={3} style={{ margin: 0 }}>
        <Grid item xs={4}>
          <img className={classes.img} alt={get(details, 'album.name', 'cover')} src={get(details, 'album.images[0].url', '')} />
        </Grid>
        <Grid item container spacing={0} xs={8}>
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
      <Divider light />
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label='Show lyrics'
      />
      <Lyrics showLyrics={checked} trackId={id} />
    </>
  )
}

export default TrackDetails
