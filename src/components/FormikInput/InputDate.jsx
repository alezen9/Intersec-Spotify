import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/it'
import { get } from 'lodash'

moment.locale('it')

const InputDate = ({ label, id, name, handleChange, values, disabled, errors, helperText, _mindate = null, _maxdate = null, onChange }) => {
  let dateDisabled = _mindate ? { minDate: _mindate } : {}
  dateDisabled = _maxdate ? { ...dateDisabled, maxDate: _maxdate } : { ...dateDisabled }
  return (
    <>
      <MuiPickersUtilsProvider utils={DateUtils} locale='it' moment={moment}>
        <KeyboardDatePicker
          {...dateDisabled}
          disabled={disabled}
          margin='normal'
          id={id}
          label={label}
          value={get(values, name, null) ? moment(values[name], 'DD.MM.YYYY') : null}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          format='DD.MM.YYYY'
          fullWidth
          inputVariant='filled'
          helperText={get(errors, name, null)}
          error={get(errors, name, null)}
        />
      </MuiPickersUtilsProvider>
      </>
  )
}

export default InputDate
