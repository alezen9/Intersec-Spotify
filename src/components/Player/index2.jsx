import React from 'react'
import { makeStyles } from '@material-ui/core'
import { backgroundColor } from 'theme'

const useStyles = makeStyles(theme => {
  return {
    main: {
      position: 'fixed',
      top: 'calc(100vh - .5em - 100px)',
      left: '.5em',
      width: 'calc(100% - 1em)',
      height: 100,
      backgroundColor,
      borderRadius: 5,
      display: 'grid',
      gridTemplateColumns: '50px 3fr 10fr',
      gridTemplateRows: 100,
      gridRowGap: 0,
      gridColumnGap: 5
    }
  }
})

const Player = props => {
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <div>cover</div>
      <div>controls</div>
      <div>player</div>
    </div>
  )
}

export default Player
