import React from 'react'
import { makeStyles, Grid, Typography, Tooltip, IconButton } from '@material-ui/core'
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded'
import { useLazyLoad } from 'utils/customHooks'
// import { EquilizerIcon } from 'assets/CustomIcons'

const useStyles = makeStyles(theme => {
  const padding = theme.spacing(2)
  return {
    container: {
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      height: '100%',
      padding: padding,
      borderRadius: 5,
      '&:before': {
        backgroundImage: ({ large, small }) => `url(${large || small})`,
        filter: ({ large }) => large ? 'none' : 'blur(15px)',
        backgroundSize: 'cover',
        position: 'absolute',
        content: '""',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        transition: 'filter ease-in .1s'
      },
      '&:hover': {
        '&:before': {
          filter: 'blur(10px) brightness(.5)'
        },
        '&>*': {
          visibility: 'visible',
          pointerEvents: 'auto'
        }
      }
    },
    header: {
      position: 'relative',
      width: '100%',
      height: '100%',
      '&>*': {
        position: 'relative'
      },
      '&:before': {
        position: 'absolute',
        content: '""',
        width: `calc(100% + ${padding * 2}px)`,
        height: '70%',
        top: -padding,
        left: 0,
        margin: `0 ${-padding}px`,
        background: 'linear-gradient(to bottom,rgba(0, 0, 0, .85), transparent)',
        transition: 'all .1s ease-in'
      }
    },
    equilizerContainer: {
      display: 'flex',
      justifyContent: 'space-between'
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
    actions: {
      position: 'absolute',
      bottom: theme.spacing(),
      left: theme.spacing(),
      width: `calc(100% - ${theme.spacing(2)}px)`,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      visibility: 'hidden',
      pointerEvents: 'none'
    }
  }
})

const Vinil = React.memo(props => {
  const { id, fullCover, smallCover, infoHeader, infoSubheader, actions, openDetails, type = 'track' } = props
  const largeImage = useLazyLoad(fullCover)
  const classes = useStyles({ large: largeImage, small: smallCover })
  return (
    <div id={id} className={classes.container} >
      {/* INFO */}
      <div className={classes.header}>
        <div className={classes.equilizerContainer}>
          <Typography variant='h6'>{infoHeader}</Typography>
          {/* <EquilizerIcon color='primary' /> */}
        </div>
        {infoSubheader && <Typography variant='caption'>{infoSubheader}</Typography>}
      </div>
      {/* ACTIONS */}
      {type === 'track' && <Grid item container justify='flex-end' className={classes.actions}>
        {actions || <></>}
        <Grid item style={{ marginLeft: 'auto' }}>
          <Tooltip
            title='Lyrics'
            onClick={openDetails}
            arrow>
            <IconButton color='primary' aria-label='Lyrics'>
              <TextFieldsRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>}
    </div>
  )
})

export default React.memo(Vinil)
