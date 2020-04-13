import React, { useState } from 'react'
import { makeStyles, List, ListSubheader, ListItemIcon, ListItem, ListItemText, Collapse } from '@material-ui/core'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import { useHistory } from 'react-router-dom'
import { sections } from 'utils/routes'
import { compact, take } from 'lodash'
import logo from 'assets/intersecFullLogo.svg'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  subheader: {
    display: 'flex',
    height: '4rem',
    alignItems: 'center',
    '&> img': {
      height: '2rem'
    }
  }
})

const buildSubPath = (mainPath, subPath) => {
  const subPaths = compact(subPath.split('/'))
  return mainPath
    .split('/')
    .map(el => el.startsWith(':') ? take(subPaths) : el)
    .join('/')
}

const SingleItemList = props => {
  const { handleRoute, icon, title, path } = props
  return <ListItem button onClick={handleRoute(path)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
}

const ExpandableItemList = props => {
  const { handleRoute, icon, title, path: mainPath, subpaths } = props
  const [openMore, setOpenMore] = useState(false)
  const classes = useStyles()

  const handleClick = () => {
    setOpenMore(state => !state)
  }

  return <>
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
      {openMore ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
    </ListItem>
    <Collapse in={openMore} timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        {subpaths.map(({ path, title: titleSubEl }, i) => {
          const route = buildSubPath(mainPath, path)
          return <ListItem key={`subpath-${i}`} button className={classes.nested} onClick={handleRoute(route)}>
            <ListItemIcon>
              <KeyboardArrowRightRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={titleSubEl} />
          </ListItem>
        })}
      </List>
    </Collapse>
</>
}

const NavList = props => {
  const { closeDrawer } = props
  const history = useHistory()
  const classes = useStyles()

  const handleRoute = path => e => {
    closeDrawer()
    history.push(path)
  }

  const routeBuilder = () => {
    return sections.map((section, i) => {
      return !section.subpaths
        ? <SingleItemList key={`main-path-${i}`} {...{ ...section, handleRoute }} />
        : <ExpandableItemList key={`main-path-${i}`} {...{ ...section, handleRoute }} />
    })
  }

  return (
    <div className={classes.list} >
      <List
        subheader={<ListSubheader className={classes.subheader} component='div' id='nested-list-subheader'>{
          <img src={logo} />
        }</ListSubheader>}
        className={classes.root}
      >
        {routeBuilder()}
      </List>
    </div>
  )
}

export default NavList
