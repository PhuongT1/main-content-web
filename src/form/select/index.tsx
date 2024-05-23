// form
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
// @mui
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, FormControl, InputLabel, MenuItem, TextField, useTheme } from '@mui/material'
import { Key } from 'react'
import { MenuValue, RADIUS_TEXTFIELD, SelectElementProps } from './select.type'

//css
import styles from './select-item.module.scss'
import { sendEvent } from '@/utils/events'

export default function SelectItem<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  native,
  open,
  menus,
  maxHeight = 500,
  label,
  paperPropsSx,
  children,
  showErrorMessage,
  textFieldProps,
  sxBox,
  isNoneBorder,
  sxLabel,
  value,
  onFocusCustom,
  onChangeCustom,
  ...controllerProp
}: SelectElementProps<T, TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()

  const renderMenus = () => {
    if (children) return children
    if (menus?.options.length! > 0) {
      return menus?.options?.map((menu) => (
        <MenuItem
          key={((menus?.label && menu[menus.label]) ?? menu) as Key}
          value={((menus?.value && menu[menus.value]) ?? menu) as MenuValue}
        >
          {((menus?.label && menu[menus.label]) ?? menu) as React.ReactNode}
        </MenuItem>
      ))
    }

    return (
      <MenuItem value=''>
        <em>선택</em>
      </MenuItem>
    )
  }

  const onClickInput = () => {
    sendEvent(`CLICKED_INPUT_SELECT_${name}`, { status: true })
  }
  const onClose = () => {
    sendEvent(`CLICKED_INPUT_SELECT_${name}`, { status: false })
  }

  return (
    <Box component={'div'} className={isNoneBorder ? styles.standard : ''} sx={{ ...sxBox }}>
      {label && (
        <InputLabel htmlFor={name} sx={{ mb: '10px', color: home.gray50, fontWeight: 600, ...sxLabel }}>
          {textFieldProps?.required && <span style={{ color: home.mint500 }}>* </span>}
          {label}
        </InputLabel>
      )}
      <Controller
        {...controllerProp}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const fieldValue = value || value === '' ? value : field.value ?? ''
          return (
            <FormControl fullWidth>
              {!fieldValue && <InputLabel sx={{ color: home.gray100 }}>{textFieldProps?.placeholder}</InputLabel>}
              <TextField
                {...field}
                {...textFieldProps}
                value={fieldValue}
                onChange={onChangeCustom || field.onChange}
                onFocus={onFocusCustom}
                select
                fullWidth
                required={false}
                autoComplete='off'
                inputProps={{
                  style: {
                    fontSize: convertToRem(16),
                    fontWeight: 'normal',
                    lineHeight: 'normal'
                  }
                }}
                sx={{
                  '& .Mui-focused': {
                    ' .MuiOutlinedInput-notchedOutline': {
                      borderColor: `${home.blue500} !important`,
                      borderWidth: `${convertToRem(1)} !important`
                    }
                  },

                  '& .MuiInputBase-root': {
                    padding: convertToRem(6),
                    maxHeight: convertToRem(56),
                    backgroundColor: home.gray300,
                    borderRadius: convertToRem(RADIUS_TEXTFIELD),
                    '& > fieldset': {
                      borderColor: home.gray200,
                      borderRadius: convertToRem(RADIUS_TEXTFIELD)
                    }
                  },
                  '.MuiSelect-icon': {
                    right: 16
                    // '&.MuiSelect-iconOpen': {
                    //   top: `calc(50% - ${convertToRem(15)})`
                    // }
                  },
                  '.Mui-readOnly': {
                    backgroundColor: home.gray300
                  }
                }}
                SelectProps={{
                  native,
                  open,
                  onClose,
                  onOpen: onClickInput,
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        ...(!native && {
                          maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset'
                        }),
                        borderRadius: convertToRem(RADIUS_TEXTFIELD),
                        border: `1px solid ${home.gray200}`,
                        '.MuiMenu-list': {
                          backgroundColor: home.gray400,
                          '.MuiMenuItem-root': {
                            color: home.gray50,
                            minHeight: '50px'
                          }
                        },
                        '.Mui-selected': {
                          backgroundColor: `${home.blue500} !important`,
                          '&:hover': {
                            backgroundColor: `${home.blue500} !important`
                          }
                        },
                        ...paperPropsSx
                      }
                    }
                  },
                  IconComponent: ({ ...propsData }) => (
                    <Box
                      {...propsData}
                      component={'div'}
                      className={propsData.className}
                      sx={{
                        '&.MuiSelect-icon': {
                          top: '50%',
                          display: 'flex',
                          transform: 'translateY(-50%)',
                          transition: 'all 0.3s'
                        },
                        '&.MuiSelect-iconOpen': {
                          transform: 'rotate(180deg) translateY(50%)'
                        }
                      }}
                    >
                      <ChevronDownIcon fontWeight={'600'} stroke={home.gray100} width={24} height={24} />
                    </Box>
                  ),
                  ...textFieldProps?.SelectProps
                }}
                error={!!error}
                helperText={error?.message?.trim() && showErrorMessage ? error?.message : textFieldProps?.helperText}
              >
                {renderMenus()}
              </TextField>
            </FormControl>
          )
        }}
      />
    </Box>
  )
}
