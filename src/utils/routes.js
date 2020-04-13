import React from 'react'
// components
import Home from 'pages/Home'
// icons
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'

export const sections = [
  {
    title: 'Home',
    icon: <HomeRoundedIcon color='primary' />,
    path: '/',
    component: Home
  }
]
