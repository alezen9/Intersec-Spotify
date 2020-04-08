import React from 'react'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import Home from 'pages/Home'
import DeepSearch from 'pages/DeepSearch'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'

export const sections = [
  {
    title: 'Home',
    icon: <HomeRoundedIcon />,
    path: '/',
    component: Home
  },
  {
    title: 'Villages',
    icon: <TuneRoundedIcon />,
    path: '/discover',
    component: DeepSearch
  }
]
