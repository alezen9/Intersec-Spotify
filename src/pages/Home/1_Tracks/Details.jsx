import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrackById } from '_redux/actions/musicActions'
import { Grid, makeStyles, Divider } from '@material-ui/core'
import { get } from 'lodash'
import { AvatarGridTypographyLabel } from 'components/GridTypographyLabel'

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
        <Grid item xs={4} >
          <img className={classes.img} alt={get(details, 'album.name', 'cover')} src={get(details, 'album.images[0]', '')} />
        </Grid>
        <Grid item container spacing={0} xs={8}>
          {get(details, 'artists', []).map(artist =>
            <AvatarGridTypographyLabel
              key={artist.id}
              xs={12}
              avatar={{
                alt: artist.name,
                src: get(artist, 'images[0]', '')
              }}
              value={artist.name}
              label='Artist'
              maxwidth='unset'
            />)}
        </Grid>
      </Grid>
      <Divider light />
    </>
  )
}

export default TrackDetails
