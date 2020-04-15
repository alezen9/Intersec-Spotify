import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { uniqueId } from 'lodash'
import FormikInput from 'components/FormikInput'

export const FiltersBuilder = React.memo(props => {
  const { formik, filters } = props
  const [filterId] = useState(uniqueId())
  return (
    <Grid container spacing={0}>
      {filters.map((filter, i) =>
        <FormikInput
          key={`filter-${filterId}-${i}`}
          xs={12}
          {...filter}
          {...formik}
        />)}
    </Grid>
  )
})
