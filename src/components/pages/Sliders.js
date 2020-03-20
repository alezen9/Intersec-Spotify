import React, { Component } from 'react';
import { connect } from 'react-redux';
// css
import './Sliders.css';
// material ui
import Button from '@material-ui/core/Button';
import Cached from '@material-ui/icons/Cached';
// actions
import { setSlidersValue, resetSlidersValue } from '../../actions/index';

class Sliders extends Component {
    state = {
        acousticness: 50,
        danceability: 50,
        energy: 50,
        instrumentalness: 50,
        liveness: 50,
        speechiness: 50,
        valence: 50
    }

    sliderValue = (e) => {
        const { id, value } = e.target;
        const { setSlidersValue, sliders } = this.props;
        this.setState({ [id]: value });
        setSlidersValue(sliders, id, value);
    }

    resetSliders = (e) => {
        Object.keys(this.state).map(i => this.setState({ [i]: 50 }))
        this.props.resetSlidersValue();
    }

    render() {
        const { acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence } = this.state;
        return (
            <div className="sliders">
                <div className="buttons">
                    <Button onClick={this.resetSliders} className="reset">
                        <Cached />
                        Reset
                    </Button>
                </div>
                <div>
                    <p>acousticness</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={acousticness} className="slider" id="acousticness" />
                    </div>
                </div>
                <div>
                    <p>danceability</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={danceability} className="slider" id="danceability" />
                    </div>
                </div>
                <div>
                    <p>energy</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={energy} className="slider" id="energy" />
                    </div>
                </div>
                <div>
                    <p>instrumentalness</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={instrumentalness} className="slider" id="instrumentalness" />
                    </div>
                </div>
                <div>
                    <p>liveness</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={liveness} className="slider" id="liveness" />
                    </div>
                </div>
                <div>
                    <p>speechiness</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={speechiness} className="slider" id="speechiness" />
                    </div>
                </div>
                <div>
                    <p>valence</p>
                    <div className="slidecontainer">
                        <input onChange={this.sliderValue} type="range" min="0" max="100" value={valence} className="slider" id="valence" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        sliders: state.sliders
    }
}

const mapDidpatchToProps = (dispatch) => {
    return {
        setSlidersValue: (prevSliders, slider, value) => { dispatch(setSlidersValue(prevSliders, slider, value)) },
        resetSlidersValue: () => { dispatch(resetSlidersValue()) }
    }
}


export default connect(mapStateToProps, mapDidpatchToProps)(Sliders);