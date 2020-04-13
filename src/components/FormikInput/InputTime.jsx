import React from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers'
import DateUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/it'
import { get } from 'lodash'
import AccessTime from '@material-ui/icons/AccessTime'

moment.locale('it')

const InputTime = ({ label, id, name, handleChange, values, disabled, errors, helperText, onChange }) =>
  <>
    <MuiPickersUtilsProvider utils={DateUtils} locale='it' moment={moment}>
      <KeyboardTimePicker
        disabled={disabled}
        ampm={false}
        margin='normal'
        id={id}
        label={label}
        value={get(values, name, null)}
        onChange={onChange}
        inputVariant='filled'
        keyboardIcon={<AccessTime />}
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change time'
        }}
        helperText={get(errors, name, null)}
        error={get(errors, name, null)}
      />
    </MuiPickersUtilsProvider>
    </>

export default InputTime
