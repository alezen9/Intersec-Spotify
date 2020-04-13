import React, { useState, useRef, useEffect } from 'react'
import { makeStyles, Grid, Typography, Tooltip, IconButton } from '@material-ui/core'
import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded'
import CustomDialog from 'components/Dialog'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      '&>div': {
        overflow: 'hidden',
        marginBottom: -19
      },
      '&>div>img': {
        filter: 'blur(10px) brightness(.5)'
      },
      '&>div>div': {
        opacity: 1,
        pointerEvents: 'all'
      }
    }
  },
  wrapper: {
    position: 'relative'
  },
  info: {
    position: 'absolute',
    padding: theme.spacing(),
    boxSizing: 'border-box',
    height: `calc(100% - ${theme.spacing()}px)`,
    width: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none'
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    overflow: 'hidden',
    transition: 'all .2s ease-out'
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    boxSizing: 'border-box'
  }
}))

const Vinil = props => {
  const { id, name = 'Vinil', background, infoHeader, infoSubheader } = props
  const classes = useStyles()
  const imgRef = useRef(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (imgRef.current && !background.isSquare) console.log(imgRef)
  }, [imgRef.current, background.isSquare])

  return (
    <>
      <Grid item xs={6} sm={3} md={2} className={classes.container}>
        <div className={classes.wrapper} >
          <img id={`image-${id}`} ref={imgRef} alt={name} src={background.url} className={classes.image} />
          <Grid container direction='column' className={classes.info} justify='space-between'>
            {/* INFO */}
            <Grid item container spacing={0}>
              <Grid item xs={12}>
                <Typography variant='h6'>{infoHeader}</Typography>
              </Grid>
              {infoSubheader && <Grid item xs={12}>
                <Typography variant='caption'>{infoSubheader}</Typography>
              </Grid>}
            </Grid>
            {/* ACTIONS */}
            <Grid item container spacing={3} justify='flex-end' className={classes.actions}>
              <Grid item>
                <Tooltip
                  title='Details'
                  onClick={() => setOpenDialog(true)}
                  arrow>
                  <IconButton color='primary' aria-label='Details'>
                    <DetailsRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <CustomDialog
        title={name}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  )
}

export default React.memo(Vinil)
