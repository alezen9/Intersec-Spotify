import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import Button from '@material-ui/core/Button';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SkipNext from '@material-ui/icons/SkipNext';
import Pause from '@material-ui/icons/Pause';
import Close from '@material-ui/icons/Close';
import CallMade from '@material-ui/icons/CallMade';
// css
import './Player.css';
// actions
import { closePlayer, playPreviewSong } from '../actions/index';
// keys
const keys = require('../keys');


class Player extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            trackerWidth: '0%',
            past: '0:00',
            end: '-:--',
            bigPlayerDisplayStyle: 'inline-block',
            smallPlayerDisplayStyle: 'none'
        }
        this.music = React.createRef()
    }


    componentDidMount() {
        const { userType, duration } = this.props;
        if (userType === 'premium') {
            let s = parseInt(duration / 1000 % 60);
            let m = parseInt(duration / 1000 / 60);
            let end = s < 10 ? m + ':0' + s : m + ':' + s;
            this.setState({ end: end }, () => { this.fetchSong() })
        } else {
            const { current } = this.music;
            this.setState({ playing: true }, () => { current.play() })
        }
    }

    componentDidUpdate(prevProps) {
        const { userType, duration, showPlayer, player, uri } = this.props;
        if (userType === 'premium' && showPlayer) {
            player.getCurrentState().then(state => {
                if (state) {
                    const { position, duration, paused } = state;
                    let w = position * 100 / duration;
                    var s = parseInt(position / 1000 % 60);
                    var m = parseInt((position / 1000 / 60) % 60);
                    let past = s < 10 ? m + ':0' + s : m + ':' + s;
                    this.setState({ trackerWidth: `${w}%`, past: past, playing: !paused })
                }
            })
            if (prevProps.uri !== uri) {
                if (userType === 'premium') this.fetchSong();
                let s = parseInt(duration / 1000 % 60);
                let m = parseInt(duration / 1000 / 60);
                let end = s < 10 ? m + ':0' + s : m + ':' + s;
                this.setState({ trackerWidth: '0%', end: end })
            }
        }
    }


    fetchSong = () => {
        const { spotifyId, deviceId, uri } = this.props;
        fetch(keys.backend_url + 'auth/refresh/' + spotifyId)
            .then(response => response.json())
            .then(A_TOKEN => {
                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [uri] }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${A_TOKEN.access_token}`
                    },
                })
                this.setState({ playing: true });
            })
    }


    play = (e) => {
        const { userType, player } = this.props;
        const { playing } = this.state;
        if (userType === 'premium') { player.togglePlay().then(() => { }) }
        else {
            const { current } = this.music;
            this.setState({ playing: playing ? false : true }, () => { current.paused ? current.play() : current.pause() })
        }
    }

    close = (e) => {
        const { player, closePlayer, userType } = this.props;
        if (userType === 'premium') { player.pause().then(() => { closePlayer() }) }
        else { this.setState({ playing: false }, () => closePlayer()) }
    }


    playNext = (e) => {
        const { playableTracks, uri, playPreviewSong } = this.props;
        let i = playableTracks.map(el => el.uri).indexOf(uri);
        let nextSong = i < playableTracks.length - 1 ? playableTracks[i + 1] : playableTracks[0];
        playPreviewSong(nextSong);
    }

    playPrev = (e) => {
        const { playableTracks, uri, playPreviewSong } = this.props;
        let i = playableTracks.map(el => el.uri).indexOf(uri);
        let prevSong = i > 0 ? playableTracks[i - 1] : playableTracks[playableTracks.length - 1];
        playPreviewSong(prevSong);
    }

    canPlayThrough = (e) => {
        let music = e.target;
        let s = parseInt(music.duration % 60);
        let m = parseInt(music.duration / 60);
        let end = s < 10 ? m + ':0' + s : m + ':' + s;
        this.setState({ playing: true, end: end });
        music.play();
    }

    timeUpdate = (e) => {
        let music = e.target;
        var s = parseInt(music.currentTime % 60);
        var m = parseInt((music.currentTime / 60) % 60);
        let trackerWidth = (100 * music.currentTime / music.duration) + '%';
        let past = s < 10 ? m + ':0' + s : m + ':' + s;
        this.setState({ trackerWidth: trackerWidth, past: past });
    }

    ended = (e) => {
        this.setState({ playing: false, trackerWidth: '0%' });
    }


    minimize = (e) => {
        this.setState({ bigPlayerDisplayStyle: 'none', smallPlayerDisplayStyle: 'flex' });
    }

    maximize = (e) => {
        this.setState({ bigPlayerDisplayStyle: 'inline-block', smallPlayerDisplayStyle: 'none' });
    }

    render() {
        const { userType, uri, artwork, trackTitle, trackArtist } = this.props;
        const { playing, trackerWidth, past, end, bigPlayerDisplayStyle, smallPlayerDisplayStyle } = this.state;
        return (
            <div>
                <div>
                    <div className="player" style={{ display: bigPlayerDisplayStyle }}>
                        {userType !== 'premium' ?
                            <audio
                                ref={this.music}
                                src={uri}
                                onCanPlayThrough={this.canPlayThrough}
                                onTimeUpdate={this.timeUpdate}
                                onEnded={this.ended}
                            />
                            :
                            <div></div>
                        }
                        <div className="pContent">
                            <div className="artwork" style={{ background: `url('${artwork}') no-repeat`, backgroundSize: 'contain' }}></div>
                            <div className="info">
                                <div className="title">
                                    {trackTitle}
                                </div>
                                <div className="artist">
                                    {trackArtist}
                                </div>
                            </div>
                            <div className="controls">
                                <Button className="controlButton" onClick={this.playPrev}>
                                    <SkipPrevious />
                                </Button>
                                <Button onClick={this.play} className="controlButton play">
                                    {
                                        playing ?
                                            <Pause />
                                            :
                                            <PlayArrow />
                                    }
                                </Button>
                                <Button className="controlButton" onClick={this.playNext}>
                                    <SkipNext />
                                </Button>
                            </div>
                            <div className="progressBar">
                                <p className="past">{past}</p>
                                <div className="bar">
                                    <div className="tracker" style={{ width: trackerWidth }}></div>
                                </div>
                                <p className="end">{end}</p>
                            </div>
                            <Button className="close" onClick={this.close} >
                                <Close />
                            </Button>
                            <Button className="minimize" onClick={this.minimize} >
                                <CallMade />
                            </Button>
                        </div>
                    </div>
                    <div className="miniPlayer" style={{ display: smallPlayerDisplayStyle }}>
                        <div className="minimizedArtwork" style={{ background: `url('${artwork}') no-repeat`, backgroundSize: 'cover' }}>
                            <Button className="maximize" onClick={this.maximize}> </Button>
                        </div>
                    </div>
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
        closePlayer: () => { dispatch(closePlayer()) },
        playPreviewSong: (track) => { dispatch(playPreviewSong(track)) }
    }
}

export default connect(mapStateToProps, mapDidpatchToProps)(Player);