import React, { useState, useLayoutEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { get } from 'lodash'
// css
import './Navbar.css'
import { Avatar, Typography, Menu, MenuItem, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { sections } from 'utils/routes'
import Spinner from 'components/Loaders/Spinner'
import { checkIsFetching, asyncTimeout } from 'utils/utils'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logout } from '_redux/actions/userActions'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'

const LOGOUT_KEY = 'LOGOUT_KEY'

const useStyles = makeStyles(theme => ({
  avatarClass: {
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none'
    // }
  }
}))

const Links = React.memo(props => {
  const { handleRoute } = props
  return sections.map(({ title, path, disabled }, i) => {
    return <li key={`main-path-${i}`} className='menu-item'>
      <Link to={path} onClick={handleRoute(path)}>
        {title}
      </Link>
    </li>
  })
})

const Navbar = props => {
  const { avatarClass } = useStyles()
  const dispatch = useDispatch()
  const { image, displayName, isFetching } = useSelector(state => ({
    image: get(state, 'user.images[0]', ''),
    displayName: get(state, 'user.displayName', ''),
    isFetching: checkIsFetching({ state })
  }))
  const history = useHistory()
  const avatarRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useLayoutEffect(() => {
    const setBodyPosition = async () => {
      if (open) await asyncTimeout(600)
      document.body.style.position = open ? 'fixed' : 'unset'
    }
    setBodyPosition()
  }, [open])

  const handleCloseMenu = useCallback(
    () => {
      setAnchorEl(null)
    },
    [setAnchorEl]
  )

  const toggleMenuProfile = useCallback(
    () => {
      if (avatarRef.current) {
        setAnchorEl(state => state ? null : avatarRef.current)
      }
    },
    [setAnchorEl]
  )

  const handleRoute = path => e => {
    e.preventDefault()
    toggleMenu()
    history.push(path)
  }

  const toggleMenu = useCallback(() => {
    setOpen(state => !state)
  }, [setOpen])

  const _logout = useCallback(
    () => {
      dispatch(logout({ key: LOGOUT_KEY }))
    },
    [dispatch]
  )

  return (
    <>
      <div className={open ? 'header menu-opened' : 'header'}>
        <div className='burger-container' onClick={toggleMenu}>
          <div id='burger'>
            <div className='bar topBar' />
            <div className='bar btmBar' />
          </div>
        </div>
        <div className='center'>
          {isFetching && <Spinner />}
        </div>
        <ul className='menu'>
          <Links handleRoute={handleRoute} />
          <Copyrights />
        </ul>
        <div className='right'>
          <Avatar
            className={avatarClass}
            ref={avatarRef}
            style={{ cursor: 'pointer' }}
            onClick={toggleMenuProfile}
            alt={displayName}
            src={image}>
            {displayName[0]}
          </Avatar>
        </div>
      </div>
      <Menu
        id='menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        className='menuClass'
      >
        <MenuItem disabled onClick={() => console.log('profile')}>
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
}

const Copyrights = () => {
  return <div style={{ position: 'absolute', bottom: '1em', left: 0, width: '100%', textAlign: 'center' }}>
    <Typography variant='caption' align='center' style={{ color: 'rgba(255,255,255,.6)' }}>
      {`© Aleksandar Gjoreski - ${new Date().getFullYear()}`}
    </Typography>
  </div>
}

export default React.memo(Navbar)
