import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { get, find } from 'lodash'
import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

const useStyles = makeStyles(({
  bar: {
    position: 'absolute',
    width: '100vw',
    top: 0,
    left: 0,
    background: teal[800],
    zIndex: 1000
  }
}))

const ProgressBar = props => {
  const { bar } = useStyles()
  const isFetching = useSelector(state => !!find(get(state, 'request', {}), ['status', 'REQUEST_FETCHING']))
  return isFetching ? <LinearProgress className={bar} color='primary' /> : <></>
}

export default ProgressBar
