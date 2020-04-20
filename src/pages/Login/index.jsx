import React, { useEffect } from 'react'
// material
import Button from '@material-ui/core/Button'
// css
import './Login.css'
import { apiInstance } from 'SDK'
import manSmall from 'assets/manSmall.jpg'
import fullBg from 'assets/man.jpeg'
import { makeStyles } from '@material-ui/core'
import { useLazyLoad } from 'utils/customHooks'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      backgroundImage: ({ bg }) => `url(${bg || manSmall})`,
      backgroundRepeat: 'no-repeat',
      filter: ({ bg }) => bg ? 'none' : 'blur(20px)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all ease-out 1.5s',
      '@media (max-width:975px)': {
        backgroundPosition: 'left'
      }
    },
    '@media (max-width:975px)': {
      flexDirection: 'column'
    }
  }
}))

const Login = props => {
  const bg = useLazyLoad(fullBg)
  const { wrapper } = useStyles({ bg })

  const loginRedirect = () => apiInstance.login()

  useEffect(() => {
    window.localStorage.removeItem('intersecState')
  }, [])

  return (
    <div className={wrapper}>
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
