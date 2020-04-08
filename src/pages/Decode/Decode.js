import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// css
import './Decode.css'
// actions
import { setUser } from '_redux/actions/userActions'
import { useHistory, useLocation } from 'react-router'
// utils
import { get } from 'lodash'

const Decode = () => {
  const history = useHistory()
  const location = useLocation()
  const logged = useSelector(state => get(state, 'user.logged', false))
  const dispatch = useDispatch()

  useEffect(() => {
    var uri = decodeURIComponent(location.pathname)
    var user = JSON.parse(uri.substr(10))
    dispatch(setUser(user))
  }, [location.pathname, dispatch])

  useEffect(() => {
    if (logged) history.push('/')
  }, [logged, history])

  return (
    <div className='decode'>
      <div className='lds-ellipsis'>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default React.memo(Decode)
