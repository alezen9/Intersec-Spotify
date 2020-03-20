import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// material ui
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home'
import SortIcon from '@material-ui/icons/Sort'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'
// css
import './Navbar.css';
// keys
const keys = require('../keys');


class Navbar extends Component {

  logout = (e) => {
    const { player } = this.props;
    if (player) player.disconnect();
    localStorage.clear();
    window.location.href = keys.backend_url + "auth/logout";
  };

  takeMeHome = (e) => { this.props.history.push('/'); }

  render() {
    const { displayName } = this.props;
    return (
      <header>
        <div onClick={this.takeMeHome} className="logo"></div>
        <div onClick={this.takeMeHome} className="title"></div>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav>
          <ul>
            <li>
              <Button component={Link} to="/" fullWidth>
                <HomeIcon />
                Home
                </Button>
            </li>
            <li>
              <Button component={Link} to="/Analytics" fullWidth>
                <SortIcon />
                Analytics
                </Button>
            </li>
            <li>
              <Button component={Link} to="/wolf_discover" fullWidth>
                <span className="icon wolf"></span>
                Wolf
                </Button>
            </li>
            {/* <li>
              <Button component={Link} to="/panther_discover" fullWidth>
                <span className="icon panther"></span>
                Panther
                </Button>
            </li> */}
            <li>
              <Button component={Link} to="/profile" fullWidth>
                <AccountCircle />
                {displayName}
              </Button>
            </li>
            <li>
              <Button onClick={this.logout} className="exit">
                <ExitToApp />
              </Button>
            </li>
          </ul>
        </nav>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </header>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.displayName,
    player: state.player,
    ...ownProps
  }
}

export default connect(mapStateToProps)(withRouter(Navbar));