import React, { useRef, useEffect, useState } from 'react'
// MUI
import { Typography, Grid, Avatar } from '@material-ui/core'
// theme
import PersonIcon from '@material-ui/icons/Person'
import TypographyPopover from './TypographyPopover'
import { useStyles } from './utils'
import { typographyColor } from 'theme'

export const TypographyLabel = props => {
  const {
    label,
    width,
    value,
    labelVariant = 'body2',
    valueVariant = 'body2',
    valueColor,
    valueStyle = {},
    withEllipsis = true,
    withPopover = false,
    maxwidth
  } = props
  const { ellipsis, noEllipsis } = useStyles()

  return <div style={{ display: 'inline-table', width: '100%', height: '100%' }}>
    {label && <Typography variant={labelVariant}>{label}</Typography>}
    {withPopover
      ? <TypographyPopover
        text={value}
        popoverText={value}
      />
      : <Typography
        className={withEllipsis ? ellipsis : noEllipsis}
        variant={valueVariant}
        style={{ ...valueColor && { color: valueColor }, maxWidth: `${maxwidth || width}px`, ...valueStyle }}
      >
        {value}
      </Typography>}
  </div>
}

export const AvatarGridTypographyLabel = props => {
  const {
    label,
    value,
    labelVariant,
    valueVariant,
    valueColor,
    bold,
    style,
    avatar,
    typographyLabelStyle,
    className, gridProps,
    ...containerProps
  } = props
  const { xs, sm, md, lg, xl, ...gtlProps } = props
  const { avatarClass } = useStyles()

  return <Grid item {...containerProps}>
    <Grid container spacing={3}>
      <Grid {...!avatar && { className: avatarClass }} style={{ margin: 'auto' }} item xs={2}>
        {avatar
          ? <Avatar alt={avatar.alt} src={avatar.src} />
          : <PersonIcon />}
      </Grid>
      <Grid item xs={10}>
        <GridTypographyLabel {...gtlProps} />
      </Grid>
    </Grid>
  </Grid>
}

const GridTypographyLabel = props => {
  const {
    label,
    value,
    xs = 12,
    sm = 6,
    md = null,
    lg = null,
    xl = null,
    valueColor = typographyColor,
    labelVariant = 'caption',
    valueVariant = null,
    bold = false,
    style = null,
    typographyLabelStyle = null,
    typographyValueStyle = null,
    className = null,
    gridProps = {},
    withEllipsis = true,
    withPopover = false,
    maxwidth
  } = props
  const gridRef = useRef(null)
  const [width, setWidth] = useState(null)
  useEffect(() => {
    if (gridRef.current && gridRef.current.offsetWidth && !width) {
      setWidth(gridRef.current.offsetWidth - 10)
    }
  }, [gridRef, width])
  if (!value) return <></>
  return value && ((typeof value === 'string' && value.trim()) || typeof value !== 'string')
    ? <Grid
      {...{ ...className && { className } }}
      {...{ ...style && { style } }}
      ref={gridRef}
      item
      xs={xs}
      sm={sm}
      {...{ ...md && { md }, ...lg && { lg }, ...xl && { xl } }}
      {...gridProps}
    >
      <TypographyLabel
        maxwidth={maxwidth}
        width={width}
        bold={bold}
        labelVariant={labelVariant}
        valueVariant={valueVariant}
        label={label}
        value={value}
        valueColor={valueColor}
        style={typographyLabelStyle}
        valueStyle={typographyValueStyle}
        withEllipsis={withEllipsis}
        withPopover={withPopover}
      />
    </Grid>
    : ''
}

export default GridTypographyLabel
