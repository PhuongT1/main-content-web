'use client'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { Typography } from '@/elements'
import { SelectProps } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { isPrimitive } from '@/utils/types'
import { Box, MenuItem as MMenuItem, Select as MSelect, MenuItemProps, styled, useTheme } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'

const SelectStyled = styled(MSelect)<SelectProps>(({ theme, error }) => ({
  backgroundColor: theme.palette.input.background.default,
  height: convertToRem(56) + ' !important',
  color: theme.palette.input.placeholder.icon.filled,
  borderRadius: 8,
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.input.background.default
  },
  border: '1px solid ' + (error ? theme.palette.main.danger : theme.palette.input.border.default),
  '.MuiInputBase-input': {
    zIndex: 100
  },
  '.MuiSelect-icon': {
    top: 8
  }
}))

const Select = (props: SelectProps) => {
  const theme = useTheme()
  return (
    // <SelectStyled
    //   MenuProps={{
    //     sx: {
    //       [theme.breakpoints.down('md')]: {
    //         background: 'rgba(0, 0, 0, 0.50)'
    //       }
    //     },
    //     PaperProps: {
    //       sx: {
    //         backgroundColor: theme.palette.input.background.default,
    //         backgroundImage: 'unset',
    //         '.Mui-selected': {
    //           backgroundColor: theme.palette.main.gray60
    //         },
    //         [theme.breakpoints.down('md')]: {
    //           left: '8px !important',
    //           right: '8px',
    //           maxWidth: 'unset',
    //           bottom: 8,
    //           top: 'unset !important',
    //           borderRadius: 4
    //         }
    //       }
    //     }
    //   }}
    //   IconComponent={({ ...propsData }) => (
    //     <Box
    //       {...propsData}
    //       sx={{ zIndex: 101, padding: convertToRem(8), paddingTop: 1.35 }}
    //       alignItems={'center'}
    //       display={'flex'}
    //       justifyContent={'center'}
    //     >
    //       <ChevronDownIcon stroke={theme.palette.main.gray30} />
    //     </Box>
    //   )}
    //   {...props}
    // >
    //   {props.children}
    // </SelectStyled>
    <></>
  )
}

const MenuItem = ({ sx, ...props }: MenuItemProps) => {
  const theme = useTheme()
  return (
    <MMenuItem
      sx={{
        backgroundColor: theme.palette.input.background.default,
        padding: {
          md: '8px 16px',
          xs: '12px 24px'
        },
        fieldset: {
          border: 0,
          backgroundColor: theme.palette.input.background.default
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.main_primary.blue500
        },
        ...sx
      }}
      {...props}
    >
      {props.children}
    </MMenuItem>
  )
}

type SelectStackProps<T> = {
  menuItemsProps?: MenuItemProps
  list: T[]
  emptyTxt?: string
} & SelectProps

const SelectStack = <T extends { label: ReactNode; value: any }>({
  menuItemsProps,
  list: initialList,
  placeholder,
  value,
  ...rest
}: SelectStackProps<T>) => {
  const [list, setList] = useState<T[]>([])

  useEffect(() => {
    setList(initialList)
  }, [initialList])

  return (
    <Select
      displayEmpty
      fullWidth
      renderValue={(value) => {
        if (!value) {
          return (
            <Typography component={'div'} cate='body_3' plainColor='input.placeholder.icon.default'>
              {placeholder || ''}
            </Typography>
          )
        }
        return (
          <Typography component={'div'} cate='body_3' plainColor='input.label.filled'>
            {list.find((i) => i.value === value)?.label || ''}
          </Typography>
        )
      }}
      value={value || ''}
      {...rest}
    >
      <MenuItem
        sx={{
          p: 2,
          justifyContent: 'center',
          opacity: '1 !important',
          borderBottom: '1px solid',
          borderBottomColor: 'main_grey.gray800',
          display: {
            md: 'none',
            xs: 'flex'
          }
        }}
        disabled
        key={-1}
      >
        <Typography component={'div'} cate='sub_title_30' plainColor='input.placeholder.icon.default'>
          {placeholder || ''}
        </Typography>
      </MenuItem>
      {list.map((i, index) => {
        return (
          <MenuItem value={i.value} key={index} {...menuItemsProps}>
            {isPrimitive(i.label) ? (
              <Typography plainColor='input.label.filled' cate='body_3' ml={2}>
                {i.label}
              </Typography>
            ) : (
              i.label
            )}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export { MenuItem, Select, SelectStack }
