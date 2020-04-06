import { createMuiTheme } from '@material-ui/core/styles'

export const twitterBlue = '#1DA1F2'
export const darkTwitterBlue = '#0077B5'
export const condexoGreen = '#2BD4B5'
export const condexoDarkGreen = '#005959'
export const violet = '#5d38db'
export const hoverViolet = '#8954ba'
export const hoverBlue = '#626eeb'
export const typographyGrey = '#717171'
export const subtitleGrey = '#686868'
export const lightGrey = '#c1c1c1'
export const darkGrey = '#585858'
export const green = '#02b51f'
export const red = '#dd0404'
export const vibrantGreen = '#07E88E'
export const vibrantOrange = '#FF7802'
export const vibrantRed = '#E83C07'
export const daskishPink = '#d7448a'
export const borderRadius = 4

const theme = createMuiTheme({
  activeColor: darkTwitterBlue,
  palette: {
    primary: {
      light: '#2EBFB5',
      main: twitterBlue,
      dark: '#02BFB1',
      contrastText: '#fff'
    },
    secondary: {
      light: '#005E57',
      main: darkTwitterBlue,
      dark: '#005E57',
      contrastText: '#fff'
    },
    error: {
      light: red,
      main: red,
      dark: red,
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    useNextVariants: true,
    // Titolo sezione
    h1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 24,
      fontWeight: 'bold',
      color: typographyGrey
    },
    // Titolo card
    h2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 24,
      color: typographyGrey
    },
    h3: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 20,
      color: typographyGrey,
      fontWeight: 'bold'
    },
    h4: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 20,
      color: typographyGrey
    },
    // Titolo
    h5: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 18,
      color: typographyGrey
    },
    h6: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 15,
      fontWeight: 'bold',
      color: typographyGrey
    },
    caption: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 13,
      color: typographyGrey
    },
    body1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 16,
      color: typographyGrey
    },
    body2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 14,
      color: typographyGrey
    },
    subtitle1: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 12,
      color: typographyGrey
    },
    subtitle2: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 11,
      color: typographyGrey
    }
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        minHeight: 45
      }
    },
    MuiSelect: {
      select: {
        backgroundColor: '#fff !important',
        '&:hover': {
          background: '#fff',
          backgroundColor: '#fff !important',
          '&@media (hover: none)': {
            backgroundColor: '#fff !important'
          }
        },
        '&:focused': {
          background: '#fff',
          backgroundColor: '#fff !important'
        },
        '&:active': {
          background: '#fff',
          backgroundColor: '#fff !important'
        }
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
        wordBreak: 'break-word',
        alignItems: 'baseline !important'
      }
    },
    MuiCard: {
      root: {
        boxShadow: 'unset !important',
        // boxShadow: '0 10px 30px rgba(0,0,0,0.1) !important',
        borderRadius
      }
    },
    MuiPaper: {
      root: {
        borderRadius
      }
    },
    MuiInputBase: {
      root: {
        width: '100%',
        '&$disabled': {
          color: lightGrey
        }
      },
      input: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&selected': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          color: lightGrey
        }
      }
    },
    MuiInput: {
      root: {
        '&$disabled': {
          color: lightGrey
        }
      },
      underline: {
        '&:before': {
          borderBottom: `1px solid ${darkTwitterBlue}`
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid ${darkTwitterBlue}`
        }
      }
    },
    MuiFilledInput: {
      root: {
        borderRadius: 0,
        height: '100%',
        margin: 0,
        padding: 0,
        background: '#fff',
        backgroundColor: '#fff',
        overflow: 'hidden',
        '&:hover': {
          background: '#fff',
          backgroundColor: '#fff !important',
          '&@media (hover: none)': {
            backgroundColor: '#fff !important'
          }
        },
        '&:focused': {
          background: '#fff',
          backgroundColor: '#fff !important'
        },
        '&:active': {
          background: '#fff',
          backgroundColor: '#fff !important'
        },
        '&.Mui-focused': {
          background: '#fff',
          backgroundColor: '#fff !important'
        }
      },
      input: {
        boxSizing: 'border-box',
        borderRadius: 0,
        background: '#fff',
        backgroundColor: '#fff',
        height: 60,
        '&:hover': {
          background: '#fff',
          backgroundColor: '#fff'
        }
      },
      inputMultiline: {
        boxSizing: 'border-box',
        borderRadius: 0,
        background: '#fff',
        backgroundColor: '#fff',
        height: 'auto',
        overflowY: 'scroll',
        '&:hover': {
          background: '#fff',
          backgroundColor: '#fff'
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: typographyGrey,
        opacity: '.6',
        zIndex: 10
      }
    },
    MuiInputAdornment: {
      root: {
        color: twitterBlue
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        boxShadow: 'none !important',
        fontSize: '17px !important',
        '@media (max-width: 600px)': {
          fontSize: 'inherit'
        }
      },
      contained: {
        color: '#fff',
        borderRadius,
        fontSize: 14,
        '&:hover': {
          backgroundColor: `${darkTwitterBlue} !important`,
          color: '#fff'
        }
      },
      outlined: {
        color: typographyGrey,
        borderRadius,
        fontSize: 14,
        borderColor: lightGrey
      },
      text: {
        '&:hover': {
          backgroundColor: 'transparent !important',
          color: hoverBlue
        },
        '&:active': {
          backgroundColor: 'transparent !important',
          color: hoverBlue
        }
      }
    },
    MuiIconButton: {
      root: {
        color: twitterBlue
      }
    },
    // MuiBackdrop: {
    //   root: {
    //     backgroundColor: 'rgba(216, 216, 216, .32)'
    //   }
    // },
    MuiDialog: {
      root: {
        boxShadow: '0 10px 50px rgba(0,0,0,0.05), 0 6px 15px rgba(0,0,0,0.1)'
      },
      paper: {
        borderRadius
      }
    },
    MuiDialogTitle: {
      root: {
        color: subtitleGrey,
        textAlign: 'center',
        fontSize: 20
      }
    },
    MuiTypography: {
      // warning, scritta piccola (ad esempio in fondo ad una card)
      caption: {
        fontSize: 13,
        color: typographyGrey,
        width: '80%'
      }
    },
    MuiButtonBase: {
      root: {
        color: darkTwitterBlue
      }
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: green
        }
      }
    }
  }
})

export default theme
