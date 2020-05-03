import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import CustomDialog from 'components/Dialog'

const GET_TOP_ARTISTS_KEY = 'GET_TOP_ARTISTS_KEY'

const Artists = props => {
  const dispatch = useDispatch()
  const { artists, isFetching } = useSelector(state => ({
    artists: get(state, `music.top.artists.medium_term`, {}),
    isFetching: checkIsFetching({ state, key: GET_TOP_ARTISTS_KEY })
  }))
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [details, setDetails] = useState(null)

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

  const listProps = useMemo(() => artists && artists.items
    ? artists.items.map((artist, i) => ({
      id: artist.id,
      key: `top-artist-${i}`,
      name: artist.name,
      artist: undefined,
      fullCover: maxBy(get(artist, 'images', []), 'width').url,
      smallCover: minBy(get(artist, 'images', []), 'width').url,
      infoHeader: artist.name,
      type: 'artist',
      openDetails: () => setDetails({
        name: artist.name,
        id: artist.id,
        fullHeight: !isSmallScreen
      })
    }))
    : [], [artists, isSmallScreen])

  return (
    <>
      <LoadingMask isLoading={isFetching}>
        <AnimatedListWrapper>
          {listProps.map(p => <Item {...p} isSmallScreen={isSmallScreen} />)}
        </AnimatedListWrapper>
      </LoadingMask>
      <CustomDialog
        title={get(details, 'name', '')}
        open={!!details}
        fullHeight={get(details, 'fullHeight', '')}
        onClose={() => setDetails(null)}
        // content={<TrackDetails id={get(details, 'id', null)} />}
      />
        </>
  )
}

const Item = React.memo(props => {
  const { isSmallScreen, ...rest } = props
  return isSmallScreen
    ? <ListItemVinil {...rest} />
    : <Vinil {...rest} />
})

export default React.memo(Artists)
