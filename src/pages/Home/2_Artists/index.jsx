import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import ListItemVinil from 'components/Vinil/ListItemVinil'
import { TopSearch } from '_redux/Entities'
import { get, maxBy, minBy } from 'lodash'
import { AnimatedListWrapper } from '../helpers'
import { useTheme, useMediaQuery } from '@material-ui/core'

const GET_TOP_ARTISTS_KEY = 'GET_TOP_ARTISTS_KEY'

const Artists = props => {
  const dispatch = useDispatch()
  const { artists } = useSelector(state => state.music.top)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const getData = useCallback(
    () => {
      dispatch(getTopTracksArtists({
        key: GET_TOP_ARTISTS_KEY,
        type: TopSearch.Artists
      }))
    },
    [dispatch]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <AnimatedListWrapper>
      {artists.items && artists.items.map((artist, i) => {
        return isSmallScreen
          ? <ListItemVinil
            id={artist.id}
            key={`top-artist-${i}`}
            name={artist.name}
            artist={' '}
            background={minBy(get(artist, 'images', []), 'width').url}
            // actions={<div>A</div>}
            // details={<ArtistDetail id={artist.id} />}
          />
          : <Vinil
            id={artist.id}
            key={`top-artist-${i}`}
            name={artist.name}
            background={maxBy(get(artist, 'images', []), 'width').url}
            infoHeader={artist.name}
          />
      })}
    </AnimatedListWrapper>
  )
}

export default React.memo(Artists)
