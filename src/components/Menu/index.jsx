import React, { useState, useRef } from 'react'
import DDreamkolAppBar from './AppBarIntersec'
import { Drawer, makeStyles } from '@material-ui/core'
import NavList from './NavList'

const useStyles = makeStyles(({
  stickyAppBar: {
    zIndex: 10,
    position: 'sticky',
    top: '.5rem',
    left: 0
  }
}))

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { stickyAppBar } = useStyles()
  const appbarRef = useRef(null)

  const toggleDrawer = open => e => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return
    setIsOpen(open)
  }

  return (
    <div className={stickyAppBar}>
      <DDreamkolAppBar ref={appbarRef} onMenuClick={toggleDrawer(true)} />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <NavList closeDrawer={toggleDrawer(false)} />
      </Drawer>
    </div>
  )
}

export default React.memo(Menu)
