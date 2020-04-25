import React from 'react'
import PropTypes from 'prop-types'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  box: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: 4,
    boxShadow: `0 9px 19px -7px rgba(255,255,255,.1)`,
    background: 'unset'
  },
  outercomponentBox: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  titleStyle: {
    color: 'white',
    margin: `${theme.spacing(3)}px auto`,
    padding: theme.spacing(1.5)
  },
  divider: {
    margin: '0',
    background: 'rgba(255,255,255,.3)'
  }
}))

const TabPanel = React.memo(({ children, value, index, title, cardTitle, outercomponent, ...other }) => {
  const { box, outercomponentBox, titleStyle, divider } = useStyles()
  return (
    <Typography
      component='div'
      role='tabPanel'
      hidden={value !== index}
      id={`tabPanel-${index}`}
      aria-labelledby={`tabPanel-${index}`}
      {...other}
    >
      {children && <Box p={3} className={box}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {cardTitle
              ? <div className={titleStyle}>{cardTitle}</div>
              : <Typography className={titleStyle} variant='h3'>{title}</Typography>}
            <Divider className={divider} light />
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>}
      {outercomponent && <Box p={3} className={outercomponentBox}>
        {outercomponent}
      </Box>}
    </Typography>
  )
})

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

export const SingleTab = React.memo(props => {
  const { value, index, title, cardTitle, component, outercomponent } = props
  return (
    <TabPanel value={value} index={index} title={title} outercomponent={outercomponent} cardTitle={cardTitle} >
      {component}
    </TabPanel>
  )
})

SingleTab.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cardTitle: PropTypes.any,
  component: PropTypes.node,
  outercomponent: PropTypes.node
}

export default SingleTab
