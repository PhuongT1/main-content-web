import { inputBaseClasses, outlinedInputClasses } from '@mui/material'
import { Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function TextField(theme: Theme) {
  const color = {
    focused: theme.palette.main.primary,
    active: theme.palette.text.secondary,
    placeholder: theme.palette.text.disabled
  }
  return {
    // BASE
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '6px',
          maxHeight: '56px',
          backgroundColor: theme.palette.main.gray70,
          borderRadius: '10px',
          color: 'main.white',
          '& > fieldset': {
            borderRadius: '10px'
          },
          [`&.${inputBaseClasses.disabled}`]: {
            '& svg': {
              color: theme.palette.text.disabled
            }
          }
        },

        input: {
          borderRadius: '10px',
          '&::placeholder': {
            opacity: 1,
            color: color.placeholder
          }
        }
      }
    },
    // OUTLINED
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'main.gray30',
          [`&.${outlinedInputClasses.focused}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: color.focused
            }
          },
          [`&.${outlinedInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.error.main
            }
          },
          [`&.${outlinedInputClasses.disabled}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.action.disabledBackground
            }
          }
        },
        notchedOutline: {
          transition: theme.transitions.create(['border-color'], {
            duration: theme.transitions.duration.shortest
          })
        }
      }
    }
  }
}
