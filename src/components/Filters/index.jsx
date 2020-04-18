import React from 'react'
import CustomDialog from 'components/Dialog'
import { FiltersBuilder } from './helper'
import { Button } from '@material-ui/core'
import { useFormik } from 'formik'
import { fromPairs } from 'lodash'

const Filters = props => {
  const { open, onClose, filters, onFiltersChange, fullHeight = false } = props
  const formik = useFormik({
    initialValues: fromPairs(filters
      .filter(({ initialValue }) => ![null, undefined].includes(initialValue))
      .map(({ initialValue, name }) => [name, initialValue])),
    onSubmit: onFiltersChange
  })

  const applyFilters = () => {
    formik.handleSubmit()
    onClose()
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title='Filters'
      maxWidth='xs'
      fullHeight={fullHeight}
      overflowY='hidden'
      content={<FiltersBuilder filters={filters} formik={formik} />}
      actions={<>
        <Button variant='contained' color='primary' onClick={applyFilters}>
        Apply
        </Button>
      </>}
    />
  )
}

export default React.memo(Filters)
