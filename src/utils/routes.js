import React from 'react'
// components
import Home from 'pages/Home'
// icons
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import _404 from 'pages/404'

export const sections = [
  {
    title: 'Home',
    icon: <HomeRoundedIcon color='primary' />,
    path: '/',
    component: Home
  },
  {
    title: 'Lyrics finder',
    icon: <HomeRoundedIcon color='primary' />,
    path: '/lyrics',
    component: _404,
    disabled: true
  },
  {
    title: 'Deep search',
    icon: <HomeRoundedIcon color='primary' />,
    path: '/deep-search',
    component: _404,
    disabled: true
  },
  {
    title: 'About',
    icon: <HomeRoundedIcon color='primary' />,
    path: '/about',
    component: _404,
    disabled: true
  }
]
