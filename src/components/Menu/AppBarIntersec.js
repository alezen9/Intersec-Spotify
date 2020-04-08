import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { backgroundColor, typographyColor, boxShadow } from 'theme'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 10,
    flexGrow: 1,
    margin: '.5rem'
  },
  appBar: {
    backgroundColor,
    boxShadow,
    color: typographyColor,
    borderRadius: 10
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: typographyColor
  }
}))

const AppBarIntersec = React.forwardRef((props, ref) => {
  const { root, appBar, title, menuButton } = useStyles()

  return (
    <div className={root}>
      <AppBar ref={ref} position='static' className={appBar}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton
            onClick={props.onMenuClick}
            edge='start'
            className={menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={title}>
            Intersec
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
})

export default React.memo(AppBarIntersec)
