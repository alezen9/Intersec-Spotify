import axios from 'axios'
const keys = require('keys')

export const apiInstance = axios.create({
  baseURL: keys.backend_url,
  timeout: 100000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
