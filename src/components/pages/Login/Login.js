import React from 'react';
// material ui
import Button from '@material-ui/core/Button';
// css
import './Login.css';
// keys
const keys = require('../../../keys');

const login_redirect = (event) => {
    window.location.href = keys.backend_url + "auth/spotify";
};

const Login = () => {
    return (
        <div className="wrapper_login">
            <div className="left_login"></div>
            <div className="right_login">
                <div className="initial-logo"></div>
                <div className="app_description">
                    An independent project to facilitate analysis and discovery for popular music platforms.
                    <div>
                        For the best experience please use Chrome browser,
                        while we continue to build a better experience for other browsers.
                    </div>
                </div>
                <Button onClick={login_redirect} >
                    Login with
                    <span className="logo_spotify"></span>
                </Button>
            </div>
        </div>
    )
}

export default Login;