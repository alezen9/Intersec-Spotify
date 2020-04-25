import React from 'react'
import { Grid, Typography, Tooltip, IconButton, makeStyles, Divider, useMediaQuery, useTheme } from '@material-ui/core'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'
import { motion } from 'framer-motion'
import GridLayout from 'components/GridLayout'

const useStyles = makeStyles(({
  ul: {
    padding: 0,
    listStyle: 'none',
    width: '100%',
    margin: 0
  },
  dividerClass: {
    width: '83%',
    margin: '.3em 0 .3em 17%'
  }
}))

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export const AnimatedListWrapper = React.memo(props => {
  const { children } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  return (
  <>
    {isSmallScreen
      ? <Grid container>
        <motion.ul
          className={classes.ul}
          variants={container}
          initial='hidden'
          animate='visible'
        >
          {children && children.length
            ? children.map((child, i) => {
              return <motion.li key={`animated-${i}`} variants={item} >
                {i !== 0 && <Divider className={classes.dividerClass} light />}
                <Grid item xs={12}>
                  {child}
                </Grid>
              </motion.li>
            })
            : <></>}
        </motion.ul>
      </Grid>
      : <GridLayout>
        {children || <></>}
      </GridLayout>}
  </>
  )
})

export const TabTitle = React.memo(props => {
  const { title, openFiltersFn } = props
  return <Grid container spacing={3} justify='space-between'>
    <Grid item>
      <Typography variant='h3'>{title}</Typography>
    </Grid>
    {openFiltersFn && <Grid item align='right' style={{ padding: 0 }}>
      <Tooltip
        title='Filters'
        onClick={openFiltersFn}
        arrow>
        <IconButton color='primary' aria-label='Filters'>
          <FilterListRoundedIcon />
        </IconButton>
      </Tooltip>
    </Grid>}
  </Grid>
})

export const trackArtistFilters = [
  {
    name: 'timeRange',
    label: 'Time range',
    type: 'select',
    initialValue: 'medium_term',
    options: [
      { label: 'Short term (~ 1 month)', value: 'short_term' },
      { label: 'Medium term (~ 6 month)', value: 'medium_term' },
      { label: 'Long term (Several years)', value: 'long_term' }
    ]
  }
]
