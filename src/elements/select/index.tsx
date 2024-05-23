import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { SelectProps } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Select as MSelect, styled, useTheme } from '@mui/material'
import { forwardRef } from 'react'

const SelectStyled = styled(MSelect)<any>(({ theme, error }) => ({
  backgroundColor: theme.palette.main.gray90,
  height: convertToRem(56) + ' !important',
  color: theme.palette.main.gray30,
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  },
  border: '1px solid ' + (error ? theme.palette.main.danger : theme.palette.main.gray90),
  '.MuiInputBase-input': {
    zIndex: 100
  },
  '.MuiSelect-icon': {
    top: 8
  }
}))

const Select = forwardRef<HTMLInputElement, SelectProps>((props: SelectProps, ref) => {
  const theme = useTheme()
  return (
    <SelectStyled
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: theme.palette.main.gray70,
            backgroundImage: 'unset',
            '.Mui-selected': {
              backgroundColor: theme.palette.main.gray60
            }
          }
        }
      }}
      IconComponent={({ ...propsData }) => (
        <Box
          {...propsData}
          sx={{ zIndex: 101, padding: convertToRem(8) }}
          alignItems={'center'}
          display={'flex'}
          justifyContent={'center'}
        >
          <ChevronDownIcon stroke={theme.palette.main.gray30} />
        </Box>
      )}
      {...props}
    >
      {props.children}
    </SelectStyled>
  )
})

export default Select
