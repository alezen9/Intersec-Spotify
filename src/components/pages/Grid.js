import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
// css
import './Grid.css';
// actions
import { playPreviewSong, playableSongs } from '../../actions/index';
// keys
const keys = require('../../keys');


class Grid extends Component {
    constructor() {
        super();
        this.state = {};
    }


    setPLayableTracks = (input, user, wolf = false) => {
        const { country } = this.props;
        let array = wolf ? input.tracks : input.items;
        let output = array.map((item, i) => {
            let playableTrack = {};
            if (user === 'premium') {
                if (item.available_markets.includes(country)) {
                    let artw = item.album.images[2].url ? item.album.images[2].url : item.album.images[1].url ? item.album.images[1].url : item.album.images[0].url ? item.album.images[0].url : '';
                    playableTrack.uri = item.uri;
                    playableTrack.artwork = artw;
                    playableTrack.trackTitle = item.name;
                    playableTrack.trackArtist = item.artists[0].name;
                    playableTrack.duration = item.duration_ms;
                    playableTrack.index = i;
                }
            } else {
                if (item.preview_url) {
                    let artw = item.album.images[2].url ? item.album.images[2].url : item.album.images[1].url ? item.album.images[1].url : item.album.images[0].url ? item.album.images[0].url : '';
                    playableTrack.uri = item.preview_url;
                    playableTrack.artwork = artw;
                    playableTrack.trackTitle = item.name;
                    playableTrack.trackArtist = item.artists[0].name
                    playableTrack.index = i;
                }
            }
            return playableTrack;
        })
        return output;
    }

    wolfFetch = () => {
        const { sliders, checkedGenres, spotifyId, userType, playableSongs } = this.props;
        let _options = {
            sliders: sliders,
            genres: checkedGenres.slice(0, 5)
        }
        fetch(keys.backend_url + 'api/reccomendations/seed/' + spotifyId, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                options: _options
            })
        })
            .then(res => res.json())
            .then(data => {
                let playableTracks = this.setPLayableTracks(data, userType, true);
                playableTracks = playableTracks.filter(el => el.hasOwnProperty('index'));
                playableSongs(playableTracks);
                this.setState({ tracks: data.tracks });
            })
            .catch(err => { console.log(err); });
    }

    componentDidMount() {
        const { toSearch, wolf, spotifyId, userType, playableSongs } = this.props;
        if (toSearch && !wolf) {
            fetch(keys.backend_url + 'api/top/' + toSearch + '/' + spotifyId)
                .then(res => res.json())
                .then(data => {
                    //save playable tracks so we can skipNext and skipPrevious
                    if (toSearch === 'tracks') {
                        let playableTracks = this.setPLayableTracks(data, userType);
                        playableTracks = playableTracks.filter(el => el.hasOwnProperty('index'));
                        playableSongs(playableTracks);
                    }
                    this.setState({ [toSearch]: data.items });
                })
        } else if (wolf) { this.wolfFetch(); }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { wolf, sliders, checkedGenres, unmountGrid } = this.props;
        if (wolf) {
            if (JSON.stringify(sliders) !== JSON.stringify(nextProps.sliders) || !checkedGenres.every(e => nextProps.checkedGenres.includes(e))) {
                if (!nextProps.checkedGenres || nextProps.checkedGenres.length === 0) {
                    unmountGrid();
                } else {
                    this.wolfFetch();
                    return true;
                }
            }
        }
        return true;
    }


    play = (e) => {
        const { userType, playPreviewSong } = this.props;
        const { tracks } = this.state;
        let index = e.target.closest('button').value;
        let trackInfo = {};
        userType === 'premium' ? trackInfo.uri = tracks[index].uri : trackInfo.uri = tracks[index].preview_url;
        trackInfo = {
            ...trackInfo,
            artwork: tracks[index].album.images[2].url,
            trackTitle: tracks[index].name,
            trackArtist: tracks[index].artists[0].name,
            duration: tracks[index].duration_ms
        }
        // set track info to be played
        playPreviewSong(trackInfo);
    }

    render() {
        const { toSearch, userType, country } = this.props;
        const { tracks, artists } = this.state;
        return (
            <div className="grid">
                {
                    this.state[toSearch] ?
                        toSearch === 'tracks' && tracks ?
                            tracks.map((item, i) => {
                                return (
                                    <div key={i} className="itemWrapper" style={{ background: `url(${item.album.images[1].url}) no-repeat`, backgroundSize: 'cover' }}>
                                        <div className="mask"></div>
                                        {
                                            userType === 'premium' ?
                                                item.available_markets.includes(country) ?
                                                    <Button onClick={this.play} className="playButton" value={i}>
                                                        <PlayArrow />
                                                    </Button>
                                                    :
                                                    <div></div>
                                                :
                                                item.preview_url ?
                                                    <Button onClick={this.play} className="playButton" value={i}>
                                                        <PlayArrow />
                                                    </Button>
                                                    :
                                                    <div></div>
                                        }
                                        <div className="itemInfo">
                                            <p className="itemTitle">{item.name}</p>
                                            <p className="itemArtist">{item.artists[0].name}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            artists ?
                                artists.map((item, i) => {
                                    return (
                                        <div key={i} className="itemWrapper" style={{ background: `url(${item.images[1].url}) no-repeat`, backgroundSize: 'cover' }}>
                                            <div className="mask"></div>
                                            <div className="itemInfo">
                                                <p className="itemTitle">{item.name}</p>
                                                <p className="itemArtist"></p>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="lds-ellipsis">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                        :
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                }
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
        playPreviewSong: (track) => { dispatch(playPreviewSong(track)) },
        playableSongs: (songs) => { dispatch(playableSongs(songs)) }
    }
}

export default connect(mapStateToProps, mapDidpatchToProps)(Grid);