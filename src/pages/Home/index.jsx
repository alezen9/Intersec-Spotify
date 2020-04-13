import React, { useMemo, useState } from 'react'
import IntersecTabs, { IntersecTab } from 'components/Tabs'
import Tracks from './1_Tracks'
import Artists from './2_Artists'
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'
import Filters from 'components/Filters'

const Title = props => {
  const { title, openFiltersFn } = props
  return <Grid container spacing={3} justify='space-between'>
    <Grid item>
      <Typography variant='h3'>{title}</Typography>
    </Grid>
    <Grid item align='right' style={{ padding: 0 }}>
      <Tooltip
        title='Filters'
        onClick={openFiltersFn}
        arrow>
        <IconButton color='primary' aria-label='Filters'>
          <FilterListRoundedIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
}

const Home = props => {
  const [openFilters, setOpenFilters] = useState(false)
  const tracksTitleProps = useMemo(() => ({
    title: 'Tracks',
    openFiltersFn: () => setOpenFilters(true)
  }), [])

  return (
    <>
      <IntersecTabs>
        <IntersecTab title='Tracks' cardTitle={<Title {...tracksTitleProps} />} component={<Tracks />} />
        <IntersecTab title='Artists' component={<Artists />} />
      </IntersecTabs>
      <Filters
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      />
    </>
  )
}

export default Home
