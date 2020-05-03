import React, { useMemo, useState } from 'react'
import IntersecTabs, { IntersecTab } from 'components/Tabs'
import Tracks from './1_Tracks'
import Artists from './2_Artists'
import Filters from 'components/Filters'
import { trackArtistFilters, TabTitle } from './helpers'

const Home = props => {
  const [openFilters, setOpenFilters] = useState(false)
  const [filterVals, setFilterVals] = useState({ timeRange: 'medium_term' })
  const tracksTitleProps = useMemo(() => ({
    title: 'Top tracks',
    openFiltersFn: () => setOpenFilters(true)
  }), [])

  return (
    <>
      <IntersecTabs>
        <IntersecTab
          title='Tracks'
          cardTitle={<TabTitle {...tracksTitleProps} />}
          component={<Tracks
            filters={filterVals}
          />} />
        <IntersecTab
          title='Artists'
          cardTitle={<TabTitle title='Top artists' />}
          component={<Artists filters={filterVals} />} />
      </IntersecTabs>
      <Filters
        open={openFilters}
        fullHeight={false}
        onClose={() => setOpenFilters(false)}
        filters={trackArtistFilters}
        onFiltersChange={vals => setFilterVals(vals)}
      />
    </>
  )
}

export default React.memo(Home)
