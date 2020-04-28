import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { Offline, Online } from 'react-detect-offline'
// components
import CloseIcon from '@material-ui/icons/Close'
import OfflinePage from 'pages/Offline'
// pages
import Login from 'pages/Login'
// actions
import { requestResetByKey } from '_redux/actions/requestActions'
import { setUserToken, checkToken } from '_redux/actions/userActions'
// utils
import { snackbarSuccessMessages } from 'utils/snackbarMessages'
import { isEmpty, get } from 'lodash'
import { sections } from 'utils/routes'
import _404 from 'pages/404'
import { IconButton, makeStyles } from '@material-ui/core'
import Navbar from 'components/Navbar'
import Player from 'components/Player'

const useStyles = makeStyles(theme => ({
  closeFab: {
    color: 'white',
    fontSize: 25
  },
  content: {
    position: 'relative',
    marginTop: 'calc(64px + 1.5em)',
    padding: '1.5em',
    boxSizing: 'border-box',
    width: '100%',
    overflow: 'hidden',
    minHeight: 'calc(100vh - 64px - 1.5em)',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 50px 0'
    }
  }
}))

const SwitchRoutes = React.memo(() => {
  return <Switch>
    {sections.map(({ path, component }, i) => <Route
      {...{
        key: `route-${i}`,
        path,
        exact: path === '/',
        component
      }}
    />)}
    <Route key='route-404' path='*' component={_404} />
  </Switch>
})

const App = props => {
  const { enqueueSnackbar, closeSnackbar } = props
  const { hash } = useLocation()
  const history = useHistory()
  const request = useSelector(state => get(state, 'request', {}))
  const location = useLocation()
  const [openPlayer, setOpenPlayer] = useState(false)
  const dispatch = useDispatch()
  const { logged } = useSelector(state => ({
    logged: get(state, 'user.logged', false)
  }))
  const { closeFab, content } = useStyles()
  const action = useCallback(
    key => {
      return <IconButton className={closeFab} aria-label='Chiudi' onClick={() => { closeSnackbar(key) }}>
        <CloseIcon fontSize='inherit' />
      </IconButton>
    },
    [closeFab, closeSnackbar]
  )

  useEffect(() => {
    if (!isEmpty(hash)) {
      dispatch(setUserToken({ hash }))
    }
  }, [hash, dispatch])

  useEffect(() => {
    history.push('/')
  }, [logged, history])

  useEffect(() => {
    dispatch(checkToken())
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    if (!isEmpty(request)) {
      Object.entries(request).forEach(([key, { status, error }]) => {
        if (status === 'REQUEST_FAILURE') {
          const message = error
          enqueueSnackbar(message, {
            variant: 'error',
            action,
            preventDuplicate: true,
            persist: false
          })
          dispatch(requestResetByKey(key))
        }
        if (status === 'REQUEST_SUCCESS' && snackbarSuccessMessages[key]) {
          const message = snackbarSuccessMessages[key]
          enqueueSnackbar(message, {
            variant: 'success',
            action
          })
          dispatch(requestResetByKey(key))
        }
      })
    }
  }, [request, dispatch, enqueueSnackbar, closeSnackbar, action])

  const minimizePlayer = useCallback(
    () => {
      setOpenPlayer(false)
    },
    [setOpenPlayer]
  )

  return (
    <>
      <Online>
        {logged
          ? <>
            <Navbar />
            <Player
              open={openPlayer}
              onClose={minimizePlayer}
              title='Player'
            />
            <div className={content}>
              <SwitchRoutes />
            </div>
        </>
          : <Route key='route-404' path='*' component={Login} />}
      </Online>
      <Offline>
        <OfflinePage />
      </Offline>
    </>
  )
}

export default withSnackbar(React.memo(App))
