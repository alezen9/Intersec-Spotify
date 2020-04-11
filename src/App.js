import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect, useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
// utils
import { get, isEmpty } from 'lodash'
// actions
import { setUserToken } from '_redux/actions/userActions'
// components and pages
import Login from 'pages/Login/Login'
import Home from 'pages/Home'
import Menu from 'components/Menu'

const App = props => {
  const { hash } = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const { logged } = useSelector(state => ({
    logged: get(state, 'user.logged', false)
  }))

  useEffect(() => {
    if (!isEmpty(hash)) {
      dispatch(setUserToken({ hash }))
    }
  }, [hash])

  useEffect(() => {
    history.push('/')
  }, [logged])

  return (
    <>
      {logged
        ? <div className='App'>
          <Menu />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
        : <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Redirect from='*' to='/' />
          </Switch>
        </div>}
    </>
  )
}

export default App
