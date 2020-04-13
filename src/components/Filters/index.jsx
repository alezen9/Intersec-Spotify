import React from 'react'
import CustomDialog from 'components/Dialog'

const Filters = props => {
  const { open, onClose, filters } = props
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title='Filters'
    />
  )
}

export default Filters
