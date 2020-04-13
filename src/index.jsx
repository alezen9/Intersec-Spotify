import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './_redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import { SnackbarProvider } from 'notistack'

const iconVariant = {
  success: <CheckCircleIcon style={{ marginRight: '.5em', fontSize: 23 }} />,
  error: <ErrorIcon style={{ marginRight: '.5em', fontSize: 23 }} />
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider iconVariant={iconVariant} maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.querySelector('#root'))

serviceWorker.register()
