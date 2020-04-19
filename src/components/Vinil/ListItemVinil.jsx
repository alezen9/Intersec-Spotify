import React, { useState } from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded'
import CustomDialog from 'components/Dialog'
import { EquilizerIcon } from 'assets/CustomIcons'

const useStyles = makeStyles(theme => {
  return {
    texts: {
      '&>h4': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '1.1em',
        fontWeight: 'bold',
        margin: 'auto 0',
        '@media (max-width:450px)': {
          fontSize: '.9em'
        }
      },
      '&>span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'darkgrey',
        margin: 'auto 0'

      }
    },
    image: {
      backgroundImage: ({ background }) => `url(${background})`,
      backgroundSize: 'cover',
      paddingBottom: '100%',
      borderRadius: 5
    },
    actionClass: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    equilizer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    mainGrid: {
      zIndex: 10,
      display: 'grid',
      cursor: 'pointer',
      gridTemplateColumns: '3fr 13fr 3fr',
      gridColumnGap: 10,
      '&:hover': {
        boxShadow: 'inset 0px 0px 30px rgba(255,255,255,.1)'
      },
      '&>*:first-child': {
        gridRow: '1 / 1',
        gridColumn: '1 / 1',
        position: 'relative',
        overflow: 'hidden'
      },
      '&>*:nth-child(2)': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(2, 1fr)'
      },
      '&>*:last-child': {
        gridRow: '1 / 1',
        gridColumn: '3 / 3',
        position: 'relative',
        overflow: 'hidden'
      }
    }
  }
})

const ListItemVinil = props => {
  const { id, name = '-', artist = '-', background, details, playTrack } = props
  const { mainGrid, image, texts, actionClass, equilizer } = useStyles({ background })
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
      <div id={id} className={mainGrid} >
        <div className={image} onClick={playTrack}>
          {false && <div className={equilizer}>
            <EquilizerIcon color='primary' />
          </div>}
        </div>
        <div className={texts} onClick={playTrack}>
          <Typography variant='h4'>{name}</Typography>
          <Typography variant='caption'>{artist}</Typography>
        </div>
        <div className={actionClass}>
          <IconButton
            color='primary'
            onClick={() => setOpenDialog(true)}
            aria-label='Details'>
            <DetailsRoundedIcon />
          </IconButton>
        </div>
      </div>
      <CustomDialog
        title={name}
        open={openDialog}
        fullHeight={false}
        onClose={() => setOpenDialog(false)}
        content={details}
      />
    </>
  )
}

export default React.memo(ListItemVinil)
