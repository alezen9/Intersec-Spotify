import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopTracksArtists } from '_redux/actions/musicActions'
import Vinil from 'components/Vinil'
import { TopSearch } from '_redux/Entities'
import { get } from 'lodash'
import GridLayout from 'components/GridLayout'

const GET_TOP_ARTISTS_KEY = 'GET_TOP_ARTISTS_KEY'

const Artists = props => {
  const dispatch = useDispatch()
  const { artists } = useSelector(state => state.music.top)

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
    <GridLayout>
      {artists.items && artists.items.map((artist, i) =>
        <Vinil
          id={artist.id}
          key={`top-artist-${i}`}
          name={artist.name}
          background={get(artist, 'images[0].url', '')}
          infoHeader={artist.name}
        />)}
    </GridLayout>
  )
}

export default React.memo(Artists)
