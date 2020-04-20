import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import ListItemVinil from 'components/Vinil/ListItemVinil'
import { TopSearch } from '_redux/Entities'
import { get, maxBy, minBy } from 'lodash'
import { AnimatedListWrapper } from '../helpers'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { checkIsFetching } from 'utils/utils'
import LoadingMask from 'components/LoadingMask'

const GET_TOP_ARTISTS_KEY = 'GET_TOP_ARTISTS_KEY'

const Artists = props => {
  const dispatch = useDispatch()
  const { artists, isFetching } = useSelector(state => ({
    artists: get(state, 'music.top.artists', []),
    isFetching: checkIsFetching({ state, key: GET_TOP_ARTISTS_KEY })
  }))
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
    <LoadingMask isLoading={isFetching}>
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
              fullCover={maxBy(get(artist, 'images', []), 'width').url}
              smallCover={maxBy(get(artist, 'images', []), 'width').url}
              infoHeader={artist.name}
            />
        })}
      </AnimatedListWrapper>
    </LoadingMask>
  )
}

export default React.memo(Artists)
