import React, { Component } from 'react';
import { connect } from 'react-redux';
// css
import './Decode.css';
// actions
import { setUser } from '../../../actions/index';

class Decode extends Component {

    componentDidMount() {
        const { setUser, logged, history, location } = this.props;
        var uri = decodeURIComponent(location.pathname);
        var user = JSON.parse(uri.substr(10));
        setUser(user);
        if (logged) { history.push('/') }
    }

    render() {
        return (
            <div className="decode">
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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
        setUser: (user) => { dispatch(setUser(user)) }
    }
}

export default connect(mapStateToProps, mapDidpatchToProps)(Decode);