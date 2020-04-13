import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { Offline, Online } from 'react-detect-offline'
// components
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import OfflinePage from 'pages/Offline'
import Menu from 'components/Menu'
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
import ProgressBar from 'components/ProgressBar'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { IconButton, useScrollTrigger } from '@material-ui/core'

const useStyles = makeStyles({
  closeFab: {
    color: 'white',
    fontSize: 25
  }
})

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
  const dispatch = useDispatch()
  const { logged } = useSelector(state => ({
    logged: get(state, 'user.logged', false)
  }))
  const { closeFab } = useStyles()
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
  }, [logged])

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

  return (
    <>
      <Online>
        <ProgressBar />
        {logged
          ? <>
            <Menu />
            <div style={{ padding: '1.5em', boxSizing: 'border-box' }}>
              <SwitchRoutes />
            </div>
            <ScrollTop >
              <Fab color='secondary' size='small' aria-label='scroll back to top'>
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
        </>
          : <Route key='route-404' path='*' component={Login} />}
      </Online>
      <Offline>
        <OfflinePage />
      </Offline>
    </>
  )
}

const useStyles2 = makeStyles({
  zoom: {
    width: 40,
    position: 'fixed',
    bottom: '.5rem',
    right: '.5rem'
  }
})

const ScrollTop = props => {
  const { children } = props
  const { zoom } = useStyles2()
  const trigger = useScrollTrigger()
  const handleClick = e => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={zoom}>
        {children}
      </div>
    </Zoom>
  )
}

export default withSnackbar(App)
