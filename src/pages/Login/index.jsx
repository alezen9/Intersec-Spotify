import React, { useEffect } from 'react'
// material ui
import Button from '@material-ui/core/Button'
// css
import './Login.css'
import { apiInstance } from 'SDK'

const Login = () => {
  const loginRedirect = () => apiInstance.login()

  useEffect(() => {
    window.localStorage.removeItem('intersecState')
  }, [])

  return (
    <div className='wrapper_login'>
      <div className='left_login' />
      <div className='right_login'>
        <div className='initial-logo' />
        <div className='app_description'>
                    An independent project to facilitate analysis and discovery for popular music platforms.
          <div>
                        For the best experience please use Chrome browser,
                        while we continue to build a better experience for other browsers.
          </div>
        </div>
        <Button onClick={loginRedirect} >
                    Login with
          <span className='logo_spotify' />
        </Button>
      </div>
    </div>
  )
}

export default Login
