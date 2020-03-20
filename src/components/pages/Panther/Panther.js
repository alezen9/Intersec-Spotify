import React, { Component } from 'react';
// css
import './Panther.css';

class Panther extends Component {
  constructor() {
    super();
    this.state = { loaderDisplay: 'flex', frameDisplay: 'none' }
  }

  onframeLoaded = (e) => { this.setState({ loaderDisplay: 'none', frameDisplay: 'block' }) }

  render() {
    const { loaderDisplay, frameDisplay } = this.state;
    return (
      <div className="panther">
        <iframe title="pantherDiscover" src="https://panther-discover.herokuapp.com/"
          scrolling="no" frameBorder="0" onLoad={this.onframeLoaded}
          style={{ position: 'relative', height: '100%', width: '100%', display: frameDisplay }}
        ></iframe>
        <div className="iframeLoader" style={{ display: loaderDisplay }}>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Panther;