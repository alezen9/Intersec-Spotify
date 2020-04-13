import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  offline: {
    width: '100vw',
    height: '100vh',
    background: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const OfflinePage = () => {
  const { offline } = useStyles()
  return (
    <div className={offline}>
      <h1 className='offline-heading'>Oops, you are offline!</h1>
    </div>
  )
}

export default OfflinePage
