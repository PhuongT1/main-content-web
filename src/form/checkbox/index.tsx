import {
  Checkbox as MCheckBox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
  FormLabel,
  formControlLabelClasses,
  Box,
  Grid,
  useTheme
} from '@mui/material'
import { Controller, FieldPath, FieldValues, Path } from 'react-hook-form'
import { ICheckboxItemProps, IMultiCheckboxProps, ListValue } from './checkbox.type'
import { ChangeEvent, Key, MouseEvent, MouseEventHandler } from 'react'

import styles from './checkbox.module.scss'
import CheckedboxIcon from '@/assets/icons/checkbox/check'
import { useResponsive } from '@/hooks/use-responsive'

export function Checkbox<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  label,
  helperText,
  showMessageError,
  formControllerProps,
  sxLabelProps = {},
  ...controllerProps
}: ICheckboxItemProps<TFieldValues, TName>) {
  return (
    <Controller
      {...controllerProps}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            htmlFor={name}
            control={
              <MCheckBox
                {...field}
                checkedIcon={
                  <Box component={'span'} className={styles.checked_icon}>
                    <CheckedboxIcon stroke='white' />
                  </Box>
                }
                icon={<Box component={'span'} className={styles.checkbox_icon} />}
                className={styles.checkbox}
              />
            }
            label={label}
            sx={sxLabelProps}
            {...formControllerProps}
          />

          {(!!error || helperText) && showMessageError && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  )
}

//======================================================================================================

export function MultiCheckbox<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  row,
  label,
  list,
  spacing,
  helperText,
  maxLength = 0,
  sxFormGroup,
  showMessageError,
  onChangeChecked,
  countItemRow = 3,
  controlLabelProps,
  render,
  ...controllerProps
}: IMultiCheckboxProps<T, TFieldValues, TName> & {
  countItemRow?: number
}) {
  const {
    palette: { home }
  } = useTheme()
  const { breakpoints } = useTheme()
  const { name } = controllerProps
  const getSelected = (selectedItems: T[], item: T, checked: boolean) => {
    const isUnvalidChecked = selectedItems?.length >= maxLength && maxLength > 0 && !checked
    if (isUnvalidChecked) {
      onChangeChecked?.(undefined, checked)
      return selectedItems
    }
    const selectedItem = list?.options?.find((o: T) => o?.[list.value] === item?.[list.value])
    onChangeChecked?.(selectedItem, checked)

    return checked
      ? selectedItems.filter((value) => value?.[list.value] !== item?.[list.value])
      : [...selectedItems, item]
  }

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState: { error } }) => (
        <FormControl component='fieldset' className={styles.fieldset}>
          {label && (
            <FormLabel component='legend' sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}
          <FormGroup
            className={styles.form_group_list}
            sx={{
              ...(row && {
                flexDirection: 'row'
              }),
              [`& .${formControlLabelClasses.root}`]: {
                '&:not(:last-of-type)': {
                  mb: spacing || 0
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2
                  }
                })
              },
              ...sxFormGroup
            }}
          >
            <Grid wrap='wrap' container spacing={'12px'}>
              {list?.options?.map((option: T) => {
                const isChecked = field?.value?.some((opt: T) => opt?.[list.value] === option?.[list.value])
                const handleTriggerEvent = (event : MouseEvent<HTMLLabelElement>) => {
                  event.stopPropagation()
                  field.onChange(getSelected(field.value, option, isChecked))
                }
                return (
                  <Grid
                    key={`${option?.[list.value]}${Math.random()}` as Key}
                    item
                    xs={12}
                    sx={{
                      [breakpoints.up(1600)]: {
                        flexBasis: `calc(100% / ${countItemRow})`,
                        maxWidth: `calc(100% / ${countItemRow})`
                      },
                      [breakpoints.down(1600)]: {
                        flexBasis: `calc(100% / ${countItemRow - 1})`,
                        maxWidth: `calc(100% / ${countItemRow - 1})`
                      },
                      [breakpoints.down(1300)]: {
                        flexBasis: `calc(100% / ${countItemRow - 2})`,
                        maxWidth: `calc(100% / ${countItemRow - 2})`
                      },
                      [breakpoints.down(600)]: {
                        flexBasis: `calc(100%)`,
                        maxWidth: `calc(100%)`
                      }
                    }}
                  >
                    <FormControlLabel
                      classes={{
                        label: styles.form_label
                      }}
                      className={`label_item ${styles.formControlLabel} ${isChecked ? styles.active : ''}`}
                      onClick={handleTriggerEvent}
                      htmlFor={name}
                      control={
                        <MCheckBox
                          checkedIcon={
                            <Box component={'span'} className={styles.checked_icon}>
                              <CheckedboxIcon stroke='white' />
                            </Box>
                          }
                          icon={<Box component={'span'} className={styles.checkbox_icon} sx={{ border: `1px solid ${home.gray100}`}} />}
                          className={styles.checkbox}
                          checked={isChecked}
                        />
                      }
                      sx={{
                        backgroundColor: home.gray300
                      }}
                      componentsProps={{ typography: { color: home.gray50 } }}
                      label={typeof render === 'function' ? render(option) : (option?.[list.label] as React.ReactNode)}
                      {...controlLabelProps}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </FormGroup>

          {(!!error || helperText) && showMessageError && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
