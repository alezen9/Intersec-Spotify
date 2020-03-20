import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// css
import './Home.css';
// components
import Grid from '../Grid';
// actions
import { setSpotifyPlayer, setDeviceId, setPlayerState } from '../../../actions/index';
// keys
const keys = require('../../../keys');



function TabContainer(props) {
  return (
    <div className="music">
      {props.children}
    </div>
  );
}

class Home extends Component {
  state = {
    value: 0
  }


  createEventHandlers = () => {
    var { player, setPlayerState, setDeviceId } = this.props;
    // errors
    player.on('initialization_error', e => { console.error(e); });
    player.on('authentication_error', e => { console.error(e); });
    player.on('account_error', e => { console.error(e); });
    player.on('playback_error', e => { console.error(e); });
    // Playback status updates
    player.on('player_state_changed', state => { setPlayerState(state) });
    // Ready
    player.on('ready', ({ device_id }) => { setDeviceId(device_id) });
  }

  componentDidMount() {
    const { userType, spotifyId, setSpotifyPlayer, player } = this.props;
    if (userType === 'premium' && !player) {
      fetch(keys.backend_url + 'auth/refresh/' + spotifyId)
        .then(response => response.json())
        .then(A_TOKEN => {
          // initialize player
          if (window.Spotify !== null) {
            let spotifyPlayer = new window.Spotify.Player({
              name: "Intersec",
              getOAuthToken: cb => { cb(A_TOKEN.access_token); },
            });
            setSpotifyPlayer(spotifyPlayer);
          }
        })
    }
  }

  handleChange = (e, value) => { this.setState({ value }) };

  connectPlayer = () => {
    const { player } = this.props;
    player.connect()
      .then(success => { if (success) { this.createEventHandlers() } })
  }

  render() {
    const { value } = this.state;
    const { player, deviceId } = this.props;
    if (player && !deviceId) { this.connectPlayer() }
    return (
      <div className="home">
        <div className="wrapper">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Tracks" />
              <Tab label="Artists" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>
            <Grid toSearch="tracks" />
          </TabContainer>}
          {value === 1 && <TabContainer>
            <Grid toSearch="artists" />
          </TabContainer>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps
  }
}

const mapDidpatchToProps = (dispatch) => {
  return {
    setSpotifyPlayer: (player) => { dispatch(setSpotifyPlayer(player)) },
    setDeviceId: (id) => { dispatch(setDeviceId(id)) },
    setPlayerState: (state) => { dispatch(setPlayerState(state)) }
  }
}

export default connect(mapStateToProps, mapDidpatchToProps)(Home);