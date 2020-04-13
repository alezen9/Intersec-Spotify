import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { Tooltip, IconButton, Typography, Grid } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const Transition = React.forwardRef((props, ref) => {
  return <Slide ref={ref} direction='up' {...props} />
})

const CustomDialog = props => {
  const {
    open,
    onClose,
    withTransition,
    title,
    content,
    actions,
    maxWidth = 'sm'
  } = props

  return (
    <Dialog
      open={open}
      {...{ ...withTransition && { TransitionComponent: Transition } }}
      keepMounted={false}
      onClose={onClose}
      scroll='paper'
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby='details'
      aria-describedby='details'
    >
      {title && <DialogTitle id='alert-dialog-slide-title' >
        <Grid container spacing={3} justify='space-between'>
          <Grid item>
            <Typography variant='h3'>{title}</Typography>
          </Grid>
          <Grid item align='right' style={{ padding: 0 }}>
            <Tooltip
              title='Filters'
              onClick={onClose}
              arrow>
              <IconButton color='primary' aria-label='Filters'>
                <CloseRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogTitle>}
      <DialogContent>
        {content}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

export default CustomDialog
