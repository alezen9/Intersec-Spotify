import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
// utils
import { get } from 'lodash'
// components and pages
import Login from 'pages/Login/Login'
import Home from 'pages/Home'
import DeepSearch from 'pages/DeepSearch'
import Decode from 'pages/Decode/Decode'
import Player from 'components/Player'
import Menu from 'components/Menu'

const App = props => {
  const { logged, showPlayer } = useSelector(state => ({
    logged: get(state, 'user.logged', false),
    showPlayer: get(state, 'player.showPlayer', false)
  }))

  return (
    <>
      {logged
        ? <div className='App'>
          <Menu />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/deep-search' component={DeepSearch} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
          {showPlayer
            ? <Player />
            : <div />
          }
        </div>
        : <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/decoding/:user' component={Decode} />
            <Redirect from='*' to='/' />
          </Switch>
        </div>}
    </>
  )
}

export default App
