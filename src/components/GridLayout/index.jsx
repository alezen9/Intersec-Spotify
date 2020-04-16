import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: ({ minColumnWidthPx }) => `repeat(auto-fill, minmax(${minColumnWidthPx}px, 1fr))`,
    gridAutoRows: '1fr',
    overflow: 'hidden',
    gridGap: ({ spacing }) => spacing,
    '&:before': {
      content: '""',
      width: 0,
      paddingBottom: '100%',
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
      overflow: 'hidden'
    },
    '&>*:first-child': {
      gridRow: '1 / 1',
      gridColumn: '1 / 1',
      position: 'relative',
      overflow: 'hidden'
    }
  }
}))

const GridLayout = props => {
  const { children, spacing = '1em', minColumnWidthPx = 200 } = props
  const { main } = useStyles({ spacing, minColumnWidthPx })
  return (
    <div className={main}>
      {children}
    </div>
  )
}

export default GridLayout
