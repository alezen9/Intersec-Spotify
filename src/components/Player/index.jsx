import React, { useState, useCallback, useMemo } from 'react'
import { useTheme, useMediaQuery, makeStyles } from '@material-ui/core'
// import MobilePlayer from './Mobile'
import DesktopPlayer from './Desktop'
import { asyncTimeout } from 'utils/utils'
import { useSelector } from 'react-redux'
import { get, minBy, maxBy } from 'lodash'
import { useLazyLoad } from 'utils/customHooks'
import { Controls } from './helpers'

const useStyles = makeStyles(theme => ({
  player: {
    position: 'fixed',
    top: 'calc(100vh - 90px)',
    left: 0,
    width: '100vw',
    height: 120,
    padding: 10,
    borderRadius: 5,
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: '70px 10fr 4fr',
    gridTemplateRows: 70,
    gridRowGap: 0,
    gridColumnGap: 5,
    zIndex: 1,
    backdropFilter: 'blur(50px)',
    overflow: 'hidden',
    background: 'rgba(26, 27, 31,.8)',
    transition: 'all ease .2s',
    cursor: 'pointer'
  },
  cover: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    borderRadius: 5,
    '&:before': {
      backgroundImage: ({ small }) => `url("${small}")`,
      backgroundSize: 'cover',
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      transition: 'all ease-in .4s'
    }
  },
  info: {
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 10,
    color: 'white',
    fontSize: '1.2em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}))

const randomIndex = Math.round(Math.random() * 20)

const Player = props => {
  const [fullPlayer, setFullPlayer] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [displayFull, setDisplayFull] = useState('none')
  const track = useSelector(state => {
    const topTracks = get(state, 'music.top.tracks.items', [])
    const t = topTracks[randomIndex]
    console.log(t)
    return t
  })
  const { large, small } = useMemo(() => {
    if (!track) return {}
    else {
      return {
        large: maxBy(get(track, 'album.images', []), 'width').url,
        small: minBy(get(track, 'album.images', []), 'width').url
      }
    }
  }, [track])
  const { player, cover, info } = useStyles({ small })

  const fullCover = useLazyLoad(large)

  const handleOpenPlayer = useCallback(
    e => {
      setFullPlayer(true)
      setDisplayFull('block')
    },
    [setFullPlayer]
  )

  const handleClosePlayer = useCallback(
    async e => {
      if (document.fullscreen) {
        await document.exitFullscreen()
        await asyncTimeout(200)
      }
      setFullPlayer(false)
      await asyncTimeout(100)
      if (!fullPlayer) setDisplayFull('none')
    },
    [setFullPlayer, fullPlayer]
  )

  const fullPlayerProps = {
    open: fullPlayer,
    handleClosePlayer,
    smallCover: small,
    fullCover
  }

  return <>
    {!fullPlayer && <div onClick={handleOpenPlayer} className={player}>
      <div className={cover} />
      <div className={info}>
          Not playing
      </div>
      <Controls />
    </div>}
    <div style={{ display: displayFull }}>
      {isSmallScreen
        ? <DesktopPlayer {...props} {...fullPlayerProps} />
        : <DesktopPlayer {...props} {...fullPlayerProps} />}
    </div>
      </>
}

export default React.memo(Player)
