import {
  ToggleButton as MToggleButton,
  ToggleButtonGroup as MToggleButtonGroup,
  SxProps,
  ToggleButtonGroupProps,
  ToggleButtonProps
} from '@mui/material'
import { Dispatch, MouseEvent, SetStateAction } from 'react'

//---------------------ToggleButtonGroup---------------------

const fullWidthSx: SxProps = {
  width: '100%',
  div: {
    ':first-child': {
      width: '100%'
    }
  },
  button: {
    width: '100%'
  }
}

const baseSxToggleButtonGroup: SxProps = {
  p: '3px',
  borderRadius: '9999px',
  bgcolor: 'base_gray.700'
}

type TToggleButtonGroupProps<T> = {
  value: T
  setValue?: Dispatch<SetStateAction<T>>
  atLeastOne?: boolean
  fullWidth?: boolean
} & ToggleButtonGroupProps

const ToggleButtonGroup = <T extends string>({
  value,
  setValue,
  children,
  sx,
  atLeastOne = true,
  fullWidth,
  ...rest
}: TToggleButtonGroupProps<T>) => {
  const handleAlignment = (_e: MouseEvent<HTMLElement>, newValue: T) => {
    if (!newValue) {
      if (!atLeastOne) {
        setValue?.(newValue)
      }
    } else {
      setValue?.(newValue)
    }
  }

  return (
    <MToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      sx={{ ...baseSxToggleButtonGroup, ...(fullWidth && fullWidthSx), ...sx }}
      {...rest}
    >
      {children}
    </MToggleButtonGroup>
  )
}

//---------------------ToggleButton---------------------

const baseSxToggleButton: SxProps = {
  border: 0,
  borderTopRightRadius: 'inherit !important',
  borderBottomRightRadius: 'inherit !important',
  borderTopLeftRadius: 'inherit !important',
  borderBottomLeftRadius: 'inherit !important',
  px: 3,
  py: 1.5,
  height: 44,
  borderRadius: '9999px',
  '&:hover': {
    bgcolor: 'unset'
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    bgcolor: 'blue.500',
    borderRadius: '9999px'
  }
}

type TToggleButtonProps = {} & ToggleButtonProps

ToggleButtonGroup.ToggleButton = ({ children, sx, ...rest }: TToggleButtonProps) => {
  return (
    <MToggleButton sx={{ ...baseSxToggleButton, ...sx }} {...rest}>
      {children}
    </MToggleButton>
  )
}

export default ToggleButtonGroup
