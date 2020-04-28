import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { backgroundColor, typographyColor } from 'theme'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { logout } from '_redux/actions/userActions'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: 80,
    backgroundColor,
    alignItems: 'flex-start',
    zIndex: 1
  },
  iconOnly: {
    paddingTop: '6px !important',
    color: typographyColor,
    '& svg': {
      fontSize: '2rem'
    }
  },
  selected: {
    '& svg': {
      fontSize: '2rem'
    }
  }
})

const navs = [
  {
    name: 'Home',
    icon: <HomeRoundedIcon />,
    path: '/'
  },
  {
    name: 'Search',
    icon: <SearchRoundedIcon />,
    path: '/deep-search'
  },
  {
    name: 'Player',
    icon: <PlayArrowRoundedIcon />,
    path: '/'
  },
  {
    name: 'Lyrics',
    icon: <TextFieldsRoundedIcon />,
    path: '/lyrics'
  },
  {
    name: 'Logout',
    icon: <ExitToAppRoundedIcon />,
    style: { color: 'crimson' },
    path: '/logout'
  }
]

const LOGOUT_KEY = 'LOGOUT_KEY'

const BottomNavbar = props => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const history = useHistory()
  const dispatch = useDispatch()

  const _logout = useCallback(
    () => {
      dispatch(logout({ key: LOGOUT_KEY }))
    },
    [dispatch]
  )

  const onItemClick = useCallback(
    path => () => {
      if (path === '/logout') {
        _logout()
      } else {
        history.push(path)
      }
    }, [history, dispatch])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={classes.root}
    >
      {navs.map((item, i) => <BottomNavigationAction
        {...{
          key: `bottom-item-${i}`,
          classes: { iconOnly: classes.iconOnly, selected: classes.selected },
          icon: item.icon,
          disableRipple: true,
          onClick: onItemClick(item.path),
          ...item
        }}
      />)}
    </BottomNavigation>
  )
}

export default BottomNavbar
