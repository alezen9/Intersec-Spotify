import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { Tooltip, IconButton, Typography, Grid, makeStyles } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const Transition = React.forwardRef((props, ref) => {
  return <Slide ref={ref} direction='up' {...props} />
})

const useStyles = makeStyles(theme => ({
  content: {
    height: '85vh',
    overflowY: 'auto'
  }
}))

const CustomDialog = props => {
  const {
    open,
    onClose,
    withTransition,
    title,
    content,
    actions,
    maxWidth = 'sm',
    overflowY = 'auto'
  } = props

  const classes = useStyles()

  return (
    <Dialog
      open={open}
      {...{ ...withTransition && { TransitionComponent: Transition } }}
      keepMounted={false}
      onClose={onClose}
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
      <DialogContent className={classes.content} style={{ overflowY }}>
        {content}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

CustomDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  withTransition: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.node,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

export default CustomDialog
