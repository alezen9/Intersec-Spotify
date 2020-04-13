import React from 'react'
import { get, find } from 'lodash'
import { Select, MenuItem, InputLabel, FormHelperText, FilledInput, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuItem: {
    minWidth: 250
  }
}))

const InputSelect = ({ options = null, label, id, name, required, handleChange, values, disabled, errors, helperText, onChange, variant }) => {
  const { menuItem } = useStyles()

  const Options = options => options && options.map((opt, i) =>
    <MenuItem className={menuItem} key={i} value={opt.value}>
      <Typography>{opt.label}</Typography>
    </MenuItem>)

  const renderValue = (v) => {
    const res = find(options, ['value', v])
    return res ? res.label : null
  }

  const input = variant === 'filled' ? { input: <FilledInput name={name} /> } : {}

  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        disabled={disabled}
        label={label}
        value={get(values, `${name}.value`, '')}
        renderValue={renderValue}
        onChange={onChange}
        autoWidth
        variant='filled'
        {...input}
        inputProps={{ id }}
      >
      >
        <MenuItem className={menuItem} key={-1} value=''>
          <Typography>-</Typography>
        </MenuItem>
        {Options(options)}
      </Select>
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default InputSelect
