import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { IconButton, Grid, makeStyles } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const Transition = React.forwardRef((props, ref) => {
  return <Slide ref={ref} direction='up' {...props} />
})

const useStyles = makeStyles(theme => ({
  root: {
    top: '1em !important',
    left: '.1em !important',
    right: '.1em !important'
  },
  paper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#2b2b2b'
  }
}))

const CustomDialog = props => {
  const {
    open,
    onClose,
    content,
    actions
  } = props
  const { root, paper } = useStyles()

  return (
    <Dialog
      classes={{ root, paper }}
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={onClose}
      fullWidth
      fullScreen
      aria-labelledby='player'
      aria-describedby='player'
    >
      <DialogTitle id='alert-dialog-slide-title' >
        <Grid container spacing={3} justify='flex-end'>
          <Grid item align='right' style={{ padding: 0 }} xs={2}>
            <IconButton
              color='primary'
              onClick={onClose}
              aria-label='Close'>
              <CloseRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

export default CustomDialog
