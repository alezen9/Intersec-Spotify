import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
// import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded'
import CustomDialog from 'components/Dialog'

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
        '@media (max-width:370px)': {
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
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '3fr 13fr 3fr',
      gridColumnGap: 10,
      '@media (max-width:370px)': {
        gridTemplateColumns: '3fr 8fr 3fr'
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
        gridTemplateRows: 'repeat(2, 1fr)',
        gridRowGap: 5
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
  const { id, name = '-', artist = '-', background, details, actions } = props
  const { mainGrid, image, texts, actionClass } = useStyles({ background })
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
      <div id={id} className={mainGrid}>
        <div className={image} />
        <div className={texts}>
          <Typography variant='h4'>{name}</Typography>
          <Typography variant='caption'>{artist}</Typography>
        </div>
        <div className={actionClass}>
          {actions}
        </div>
      </div>
      <CustomDialog
        title={name}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        content={details}
      />
    </>
  )
}

export default React.memo(ListItemVinil)
