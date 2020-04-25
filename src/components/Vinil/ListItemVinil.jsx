import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded'
import { EquilizerIcon } from 'assets/CustomIcons'
import { useLazyLoad } from 'utils/customHooks'

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
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      height: '100%',
      paddingBottom: '100%',
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
      }
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
      overflow: 'hidden',
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
  const { id, name = '-', artist = '-', fullCover, smallCover, openDetails, playTrack } = props
  const largeImage = useLazyLoad(fullCover)

  const { mainGrid, image, texts, actionClass, equilizer } = useStyles({ large: largeImage, small: smallCover })
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
            onClick={() => openDetails(true)}
            aria-label='Details'>
            <DetailsRoundedIcon />
          </IconButton>
        </div>
      </div>
    </>
  )
}

export default React.memo(ListItemVinil)
