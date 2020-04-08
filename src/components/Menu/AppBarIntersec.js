import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { backgroundColor, typographyColor, boxShadow } from 'theme'
import { Fab } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useDispatch } from 'react-redux'
import { logout } from '_redux/actions/userActions'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 10,
    flexGrow: 1,
    margin: '.5rem'
  },
  appBar: {
    backgroundColor,
    boxShadow,
    color: typographyColor,
    borderRadius: 10
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: typographyColor
  }
}))

const LOGOUT_KEY = 'LOGOUT_KEY'

const AppBarIntersec = React.forwardRef((props, ref) => {
  const { root, appBar, title, menuButton } = useStyles()
  const dispatch = useDispatch()
  const _logout = () => {
    dispatch(logout({ key: LOGOUT_KEY }))
  }

  return (
    <div className={root}>
      <AppBar ref={ref} position='static' className={appBar}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton
            onClick={props.onMenuClick}
            edge='start'
            className={menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={title}>
            <Fab variant='extended' onClick={_logout}>
              <ExitToAppIcon />
              Logout
            </Fab>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
})

export default React.memo(AppBarIntersec)
