import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { backgroundColor, typographyColor, boxShadow } from 'theme'
import { Fab, Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '_redux/actions/userActions'
import { isEmpty } from 'lodash'

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
    display: 'flex',
    alignItems: 'center'
  }
}))

const LOGOUT_KEY = 'LOGOUT_KEY'

const AppBarIntersec = React.forwardRef((props, ref) => {
  const { root, appBar, title, menuButton } = useStyles()
  const dispatch = useDispatch()
  const { images, displayName } = useSelector(state => state.user || {})
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
          <div className={title}>
            <Fab
              style={{ color: 'white', backgroundColor: 'crimson', marginRight: '1em' }}
              size='small'
              onClick={_logout}>
              <ExitToAppIcon />
            </Fab>
            <Avatar alt={displayName} src={!isEmpty(images) ? images[0] : ''}>
              {displayName[0]}
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
})

export default React.memo(AppBarIntersec)
