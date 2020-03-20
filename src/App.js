import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
// components and pages
import Login from './components/pages/Login/Login'
import Navbar from './components/Navbar'
import Home from './components/pages/Home/Home'
import Analytics from './components/pages/Analytics/Analytics'
import Wolf from './components/pages/Wolf/Wolf'
// import Panther from './components/pages/Panther/Panther'
import Decode from './components/pages/Decode/Decode'
import Player from './components/Player'

class App extends Component {
  render () {
    const { logged, showPlayer } = this.props
    return (
      <BrowserRouter>
        {
          logged
            ? <div className='App'>
              <Navbar />
              <div className='content'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/analytics' component={Analytics} />
                  <Route exact path='/wolf_discover' component={Wolf} />
                  {/* <Route exact path='/panther_discover' component={Panther} /> */}
                  <Redirect from='*' to='/' />
                </Switch>
              </div>
              {
                showPlayer
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
            </div>
        }
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
    showPlayer: state.showPlayer
  }
}

export default connect(mapStateToProps)(App)
