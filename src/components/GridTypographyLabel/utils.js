import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  ellipsis: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  noEllipsis: {
    display: '-webkit-box'
  },
  avatarClass: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: theme.palette.primary.main,
    height: 35,
    width: 35,
    maxWidth: 35,
    color: 'white',
    margin: 'auto'
  }
}))
