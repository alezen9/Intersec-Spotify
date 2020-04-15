import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, Chip } from '@material-ui/core'
import { get } from 'lodash'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import InputSelect from './InputSelect'
import InputSelectMultiple from './InputSelectMultiple'

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  chipClass: {
    margin: '.5em',
    borderRadius: 5
  }
}))

const FormikInput = props => {
  const { formControl, textField, chipClass } = useStyles()
  const [show, toggleShow] = useState(false)
  const {
    id = `${props.name}_${Math.round(Math.random() * 100)}`,
    name,
    label,
    type = 'text',
    values = {},
    handleChange,
    helperText = '',
    errors = {},
    variant = 'outlined',
    disabled = false,
    xs = 12,
    sm,
    lg,
    xl,
    multiline = false,
    rows = 10
  } = props

  const defaultProps = { ...props, id, name, label, type, values, handleChange, helperText, errors, variant, disabled, xs, sm, lg, xl, multiline, rows }

  const Adornment = () => <InputAdornment position='end' >
    <IconButton aria-label='Vedi/Nascondi password' onClick={() => toggleShow(!show)}>
      {show ? <LockOpen /> : <Lock />}
    </IconButton>
  </InputAdornment>

  let inputProps = {}

  switch (type) {
    case 'password':
      inputProps = {
        type: show ? 'text' : 'password',
        endAdornment: <Adornment />
      }
      break
    case 'select':
      const onChangeSelect = (e, d) => props.setFieldValue(name, e.target.value, true)
      return (
        <Grid item xs={xs} sm={sm || xs} lg={lg || sm || xs} xl={xl || lg || sm || xs}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16 }}>
            <InputSelect {...defaultProps} formControl={formControl} onChange={onChangeSelect} />
          </FormControl>
        </Grid>
      )
    case 'select-multiple':
      const onChangeSelectMultiple = (e, d) => {
        const _v = { value: d.props.value, label: d.props.name }
        if (_v.value) props.setFieldValue(name, [...new Set([...get(values, name, []), _v])])
      }

      const handleChipDelete = (v) => () => props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])

      const renderChips = () => get(values, name, []).map((chip, i) =>
        <Chip
          className={chipClass}
          label={chip.label}
          key={i}
          onDelete={handleChipDelete(chip.value)}
          color='primary'
        />)
      return (
        <Grid item xs={xs} sm={sm || xs} lg={lg || sm || xs} xl={xl || lg || sm || xs}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16 }}>
            <InputSelectMultiple {...defaultProps} formControl={formControl} onChange={onChangeSelectMultiple} />
          </FormControl>
          {renderChips()}
        </Grid>
      )
    default:
      inputProps = {}
      break
  }

  return (
    <Grid item xs={xs} sm={sm || xs} lg={lg || sm || xs} xl={xl || lg || sm || xs}>
      <FormControl variant={variant} className={formControl}>
        <TextField
          id={id}
          name={name}
          label={label}
          type={type}
          className={textField}
          value={get(values, name, '')}
          onChange={handleChange}
          margin='normal'
          disabled={disabled}
          helperText={helperText}
          error={!!get(errors, name, false)}
          variant={variant}
          InputProps={inputProps}
          multiline={multiline}
          rows={rows}
        />
        {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{errors[name]}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default FormikInput
