import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  withMask: ({ isLoading }) => ({
    position: 'relative',
    filter: isLoading ? 'opacity(0.3)' : 'none',
    pointerEvents: isLoading ? 'none' : 'all',
    cursor: isLoading ? 'initial' : 'poiunter'
  })
})

const LoadingMask = props => {
  const { isLoading = false, children = [] } = props
  const { withMask } = useStyles({ isLoading })
  return (
    <div {...{ ...(isLoading) && { className: withMask } }}>
      {children}
    </div>
  )
}

LoadingMask.propTypes = {
  isLoading: PropTypes.bool
}

export default LoadingMask
