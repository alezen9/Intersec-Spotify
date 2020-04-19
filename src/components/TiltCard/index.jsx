import React from 'react'
import Tilt from 'react-parallax-tilt'

const TiltCard = props => {
  const { children, className } = props
  return (
    <Tilt
      {...className && { className }}
      perspective={1000}
      glareEnable
      glareMaxOpacity={0.35}
      scale={1.08}
    >
      {children || <></>}
    </Tilt>
  )
}

export default TiltCard
