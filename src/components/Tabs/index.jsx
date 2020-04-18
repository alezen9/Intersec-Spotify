import React, { useState } from 'react'
import PropTypes from 'prop-types'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Tabs, Tab, useMediaQuery } from '@material-ui/core'
// components
import SingleTab from './SingleTab'
// utils
import { compact } from 'lodash'
// theme
import { backgroundColor } from 'theme'

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  appBar: {
    boxShadow: 'unset',
    backgroundColor
  },
  tabs: {
    background: 'transparent'
  },
  tab: {
    fontWeight: 18,
    textTransform: 'none',
    color: 'white'
  },
  tabSelected: {
    fontWeight: 'bold'
  }
}))

const tabProps = (index, classes) => {
  const { tab, tabSelected } = classes
  return {
    id: `tabPanel-${index}`,
    'aria-controls': `tabPanel-${index}`,
    classes: {
      root: tab,
      selected: tabSelected
    }
  }
}

const IntersecTabs = React.forwardRef((props, ref) => {
  const { children } = props
  const { wrapper, appBar, tabs, tabSelected, tab } = useStyles()
  const [value, setValue] = useState(0)
  const isSmallScreen = useMediaQuery('(max-width: 850px)')

  const handleChange = (e, newValue) => setValue(newValue)

  return (
    <div ref={ref} className={wrapper}>
      <AppBar className={appBar} position='static'>
        <Tabs
          variant={isSmallScreen ? 'scrollable' : 'standard'}
          value={value}
          onChange={handleChange}
          aria-label='Tab Panel'
          indicatorColor='primary'
          textColor='primary'
          classes={{ root: tabs }}
        >
          {compact(children).map((child, i) => {
            return <Tab
              key={`tab-${i}`}
              label={child.props.title}
              {...tabProps(i, { tab, tabSelected })}
            />
          })
          }
        </Tabs>
      </AppBar>
      {compact(children).map((child, i) =>
        <SingleTab
          key={`tabPanel-${i}`}
          value={value}
          index={i}
          title={child.props.title}
          cardTitle={child.props.cardTitle}
          component={child.props.component}
          outercomponent={child.props.outercomponent}
        />)}
    </div>
  )
})

export default IntersecTabs

IntersecTabs.propTypes = {
  children: PropTypes.node.isRequired
}

export const IntersecTab = props => <div {...props} />

IntersecTab.propTypes = {
  title: PropTypes.string.isRequired,
  cardTitle: PropTypes.any,
  component: PropTypes.node,
  outercomponent: PropTypes.node
}
