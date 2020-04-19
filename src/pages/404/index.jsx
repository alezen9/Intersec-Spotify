import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { typographyColor } from 'theme'

const useStyles = makeStyles(({
  container: {
    height: '80vh'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verticalDivider: {
    width: 2,
    height: '3.7rem',
    backgroundColor: typographyColor,
    opacity: '.5',
    margin: '0 1em'
  }
}))

const _404 = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.container} container justify='center' alignContent='center'>
      <div className={classes.item}>
        <Typography variant='h1'>404</Typography>
        <div className={classes.verticalDivider} />
        <Grid item>
          <Typography variant='body1'>
          Page
          </Typography>
          <Typography variant='body1'>
          not found
          </Typography>
        </Grid>
      </div>
    </Grid>
  )
}

export default _404
