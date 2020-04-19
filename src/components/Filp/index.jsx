import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  flipper: {
    WebkitAnimationDuration: '4s',
    WebkitAnimationIterationCount: 'infinite',
    WebkitAnimationTimingFunction: 'linear',
    WebkitBackfaceVisibility: 'hidden',
    position: 'absolute'
  },

  '@-webkit-keyframes flip1': {
    from: { WebkitTransform: 'rotateX(0deg)' },
    to: { WebkitTransform: 'rotateX(360deg)' }
  },

  flip1: {
    WebkitAnimationName: '$flip1'
  },

  '@-webkit-keyframes flip2': {
    from: { WebkitTransform: 'rotateX(-180deg)' },
    to: { WebkitTransform: 'rotateX(180deg)' }
  },

  flip2: {
    WebkitAnimationName: '$flip2'
  }
})

const Flip = () => {
  const { flipper, flip1, flip2 } = useStyles()
  return (
    <div className={flipper}>
      <div className={flip1}>A</div>
      <div className={flip2}>B</div>
    </div>
  )
}

export default Flip
