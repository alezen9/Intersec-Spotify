import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  noAnimationEqBar: {
    transform: 'scale(1, -1)'
  },
  eqBar: {
    transform: 'scale(1, -1)',
    '&>rect:nth-child(1)': {
      animation: '$short .5s infinite linear'
    },
    '&>rect:nth-child(2)': {
      animation: '$short .5s infinite linear .17s'
    },
    '&>rect:nth-child(3)': {
      animation: '$short .5s infinite linear .34s'
    }
  },
  '@keyframes short': {
    '0%': {
      height: 16
    },
    '50%': {
      height: 8
    },
    '100%': {
      height: 16
    }
  },
  '@keyframes tall': {
    '0%': {
      height: 32
    },
    '50%': {
      height: 12
    },
    '100%': {
      height: 32
    }
  }
})

export const EquilizerIcon = props => {
  const { animate = true } = props
  const { eqBar, noAnimationEqBar } = useStyles()
  return (
    <SvgIcon {...props} classes={{ root: animate ? eqBar : noAnimationEqBar }} viewBox='0 0 24 24'>
      <rect x='4' y='4' width='3.7' height='8' />
      <rect x='10.2' y='4' width='3.7' height='16' />
      <rect x='16.3' y='4' width='3.7' height='11' />
    </SvgIcon>
  )
}
