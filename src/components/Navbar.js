import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
// material ui
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import SortIcon from '@material-ui/icons/Sort'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'
// css
import './Navbar.css'
// keys
const keys = require('../keys')

const Navbar = props => {
  const history = useHistory()
  const { displayName, player } = useSelector(state => ({
    displayName: state.displayName,
    player: state.player
  }))

  const logout = (e) => {
    // if (player) player.disconnect()
    window.localStorage.clear()
    window.location.replace(keys.backend_url + 'auth/logout')
  }

  const takeMeHome = (e) => { history.push('/') }

  return (
    <header>
      <div onClick={takeMeHome} className='logo' />
      <div onClick={takeMeHome} className='title' />
      <input type='checkbox' id='nav-toggle' className='nav-toggle' />
      <nav>
        <ul>
          <li>
            <Button component={Link} to='/' fullWidth>
              <HomeIcon />
                Home
            </Button>
          </li>
          <li>
            <Button component={Link} to='/Analytics' fullWidth>
              <SortIcon />
                Analytics
            </Button>
          </li>
          <li>
            <Button component={Link} to='/wolf_discover' fullWidth>
              <span className='icon wolf' />
                Wolf
            </Button>
          </li>
          <li>
            <Button component={Link} to='/profile' fullWidth>
              <AccountCircle />
              {displayName}
            </Button>
          </li>
          <li>
            <Button onClick={logout} className='exit'>
              <ExitToApp />
            </Button>
          </li>
        </ul>
      </nav>
      <label htmlFor='nav-toggle' className='nav-toggle-label'>
        <span />
      </label>
    </header>
  )
}

export default React.memo(Navbar)
