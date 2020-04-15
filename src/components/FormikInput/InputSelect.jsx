import React from 'react'
import { get } from 'lodash'
import { Select, MenuItem, InputLabel, FormHelperText, FilledInput, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuItem: {
    minWidth: 250,
    width: '100%'
  }
}))

const InputSelect = ({ options = null, label, id, name, required, handleChange, values, disabled, errors, helperText, onChange, variant }) => {
  const { menuItem } = useStyles()

  const Options = options => options && options.map((opt, i) =>
    <MenuItem className={menuItem} key={i} value={opt.value}>
      <Typography>{opt.label}</Typography>
    </MenuItem>)

  const input = variant === 'filled' ? { input: <FilledInput name={name} /> } : {}

  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        disabled={disabled}
        value={get(values, `${name}`, '')}
        onChange={onChange}
        variant={variant}
        {...input}
        inputProps={{ id }}
      >
      >
        {Options(options)}
      </Select>
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
    </>
  )
}

export default InputSelect
