import React, { Component } from 'react'
import { connect } from 'react-redux';
// components
import Sliders from '../Sliders';
import Grid from '../Grid';
import Checkbox from '../Checkbox';
import Snackbar from '../Snackbar';
// material ui
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
// css
import './Wolf.css';
// actions
import { playPreviewSong, playableSongs, resetCheckedGenres } from 'actions/index';


class DeepSearch extends Component {

  state = {
    showReccomandations: false,
    notify: false
  }

  showReccomandations = (e) => {
    if(this.props.checkedGenres && this.props.checkedGenres.length !== 0){
      this.setState({
        showReccomandations: true
      },()=>{
        this.props.resetCheckedGenres();
      }) 
    }else{
      this.setState({
        showReccomandations: false,
        notify: true
      })
    }
  }

  closed = () =>{
    this.setState({
      notify: false
    })
  }

  unmountGrid = () =>{
    this.setState({
      showReccomandations: false
    })
  }

  render() {
    return (
      <div className="wolf">
        <Sliders />
        <div className="results">
          <div className="row">
            <Checkbox />
            <Button onClick={this.showReccomandations} className="discoverButton">
              <Search />
              Amuse me
            </Button>
          </div>
          {this.state.showReccomandations ?
            <Grid toSearch="tracks" wolf unmountGrid={this.unmountGrid} />
            :
            <div></div>
          }
        </div>
        {
          this.state.notify ?
            <Snackbar closed={this.closed}/>
            :
            <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ...state
  }
}

const mapDidpatchToProps = (dispatch) => {
  return {
    playPreviewSong: (track) => { dispatch(playPreviewSong(track)) },
    playableSongs: (songs) => { dispatch(playableSongs(songs)) },
    resetCheckedGenres: () => { dispatch(resetCheckedGenres()) }
  }
}


export default connect(mapStateToProps, mapDidpatchToProps)(DeepSearch);