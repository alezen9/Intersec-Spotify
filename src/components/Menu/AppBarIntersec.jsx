import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { backgroundColor, typographyColor, boxShadow } from 'theme'
import { Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '_redux/actions/userActions'
import { isEmpty } from 'lodash'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'

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
  },
  menuClass: {
    transform: 'translateY(3rem)'
  }
}))

const LOGOUT_KEY = 'LOGOUT_KEY'

const options = {
  root: null, // root
  rootMargin: '0px',
  threshold: 0
}

const AppBarIntersec = React.forwardRef((props, ref) => {
  const { root, appBar, title, menuButton, menuClass } = useStyles()
  const dispatch = useDispatch()
  const { images, displayName } = useSelector(state => state.user || {})
  const avatarRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [_title, setTitle] = useState('')

  const target = document.getElementById('main-aleks')

  const onChange = (changes, observer) => {
    changes.forEach(change => {
      if (change.intersectionRatio === 0) {
        setTitle('Tracks')
        console.log('Header is outside viewport')
      } else {
        setTitle('')
        console.log('Header is inside viewport')
      }
    })
  }

  const observer = new IntersectionObserver(onChange, options)

  useEffect(() => {
    if (target) {
      observer.observe(target)
    }
  }, [observer, target])

  const _logout = () => {
    dispatch(logout({ key: LOGOUT_KEY }))
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const toggleMenu = () => {
    if (avatarRef.current) {
      setAnchorEl(state => state ? null : avatarRef.current)
    }
  }

  return (
    <>
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
            <div>
              {_title}
            </div>
            <div className={title}>
              <Avatar
                ref={avatarRef}
                style={{ cursor: 'pointer' }}
                onClick={toggleMenu}
                alt={displayName}
                src={!isEmpty(images) ? images[0] : ''}>
                {displayName[0]}
              </Avatar>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        className={menuClass}
      >
        <MenuItem onClick={() => console.log('profile')}>
          <PersonRoundedIcon color='primary' style={{ marginRight: '1em' }} />
          <Typography variant='body2'>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={_logout}>
          <ExitToAppIcon style={{ color: 'crimson', marginRight: '1em' }} />
          <Typography variant='body2'>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  )
})

export default React.memo(AppBarIntersec)
