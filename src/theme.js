import { createMuiTheme } from '@material-ui/core/styles'
import { red, teal, grey } from '@material-ui/core/colors'

export const typographyColor = grey[50]
export const backgroundColor = '#1A1B1F'
export const lightShade = '#202427'
export const darkShade = '#0F1012'
export const lighterGreen = '#43de85'
export const lightestGreen = '#88f8bc'
export const green = '#168244'
export const darkerGreen = '#13703b'
export const boxShadow = `18px 18px 30px ${darkShade}, -18px -18px 30px ${lightShade}`

const getPaletteShades = (color, contrastTextColor) => ({
  light: color[300],
  main: color[500],
  dark: color[800],
  contrastText: contrastTextColor || grey[900]
})

const theme = createMuiTheme({
  palette: {
    primary: getPaletteShades(teal),
    secondary: getPaletteShades(grey),
    error: getPaletteShades(red, grey[50])
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    useNextVariants: true,
    h1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: typographyColor
    },
    h2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '2.7rem',
      color: typographyColor
    },
    h3: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 20,
      color: typographyColor,
      fontWeight: 'bold'
    },
    h4: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 20,
      color: typographyColor
    },
    h5: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 18,
      color: typographyColor
    },
    h6: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 15,
      fontWeight: 'bold',
      color: typographyColor
    },
    caption: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '.8rem',
      textTransform: 'none',
      color: typographyColor
    },
    body1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 16,
      color: typographyColor
    },
    body2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 14,
      color: typographyColor
    },
    subtitle1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 12,
      color: typographyColor
    },
    subtitle2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 11,
      color: typographyColor
    }
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        minHeight: 45
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor
      }
    },
    MuiExpansionPanel: {
      root: {
        margin: '1px auto',
        boxShadow: 'unset !important',
        '&::before': {
          display: 'none'
        }
      }
    },
    MuiGrid: {
      root: {
        wordBreak: 'break-word'
      }
    },
    MuiCard: {
      root: {
        boxShadow: 'unset !important'
      }
    },
    MuiDialog: {
      paper: {
        backgroundColor,
        minHeight: 100
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#24252b'
      }
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: 'transparent',
          borderLeft: `2px solid ${teal[800]}`
        }
      }
    },
    MuiFormLabel: {
      root: {
        zIndex: 1,
        color: teal[500]
      }
    },
    MuiInputBase: {
      root: {
        color: typographyColor
      }
    },
    MuiSelect: {
      selectMenu: {
        color: typographyColor,
        backgroundColor
      },
      icon: {
        color: teal[500]
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: teal[500],
        '&:hover': {
          borderColor: teal[800]
        }
      }
    },
    MuiInputLabel: {
      root: {
        backgroundColor,
        padding: '0 .5em'
      }
    },
    MuiButton: {
      contained: {
        color: `${typographyColor} !important`,
        textTransform: 'none',
        fontSize: '1em'
      },
      label: {
        margin: 'auto 1em'
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: typographyColor,
        width: '100%',
        margin: '1em 0'
      },
      light: {
        backgroundColor: typographyColor,
        opacity: 0.3
      }
    }
  }
})

export default theme
