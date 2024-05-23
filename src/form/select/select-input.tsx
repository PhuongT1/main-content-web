import useToggle from '@/hooks/use-toggle'
import { listenEvent, requestIdleCallbackCustom } from '@/utils/events'
import { Box, Button, Divider, MenuItem, TextFieldProps, useTheme } from '@mui/material'
import React, { ChangeEvent, Key, KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { FieldPath, FieldValues, PathValue, useForm, useFormContext } from 'react-hook-form'
import SelectItem from '.'
import InputItem from '../input'
import { MenuValue, SelectElementProps } from './select.type'
import { isValidJSON, parseJson, parseString } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'
import { formatNumberWithText } from '@/utils/string'

interface SelectInputProps<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends SelectElementProps<T, TFieldValues, TName> {
  inputProps?: TextFieldProps
  onChangeManual?: (name: string, value: string) => void
  unitText?: string | null
}

function SelectInput<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  inputProps,
  name,
  menus,
  children,
  unitText = null,
  onChangeManual,
  ...selectProps
}: SelectInputProps<T, TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()

  const { getValueLanguage } = useLanguage()

  const { setValue, watch } = useFormContext<TFieldValues>()

  const valueInput = watch(name)
  const [toggleShowInput, toggle, setToggleInput] = useToggle(false)
  const [toggleShowList, setToggleShowList] = useState(false)
  const {
    control,
    setValue: setValueInput,
    getValues
  } = useForm({
    defaultValues: { content: '' }
  })

  const onChangeSelect = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value) {
      setValue(name, event.target.value as PathValue<TFieldValues, TName>)
      setValueInput('content', '')
      if (!!onChangeManual) {
        onChangeManual(name, event.target.value)
      }
    }
  }

  const onClickInput = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    // prevent default trigger on close modal when click input
    requestIdleCallbackCustom(
      () => {
        setToggleShowList(true)
      },
      { timeout: 100 }
    )
  }

  const onChangeManualInput = (val: MenuValue) => setValue(name, val as PathValue<TFieldValues, TName>)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (event.key === 'Enter') {
      !!unitText
        ? setValue(name, formatNumberWithText(getValues('content') as PathValue<TFieldValues, TName>, unitText) as any)
        : setValue(name, getValues('content') as PathValue<TFieldValues, TName>)
      setToggleShowList(false)
      if (!!onChangeManual) {
        onChangeManual(name, getValues('content'))
      }
    }
  }

  useEffect(() => {
    listenEvent(`CLICKED_INPUT_SELECT_${name}`, (e: CustomEventInit) => {
      const { detail } = e
      setToggleShowList(detail.status)
    })
  }, [name])

  useEffect(() => {
    if (!valueInput) return
    const isCheckValueExistInMenu = menus?.options.some((option) => {
      if (['string', 'number'].includes(typeof option) || ['string', 'number'].includes(valueInput)) {
        return option == valueInput
      }
      return option?.[menus.value as keyof T] === Number(valueInput) || option?.[menus.label as keyof T] === valueInput
    })

    setToggleInput(!isCheckValueExistInMenu)
    setValueInput('content', !isCheckValueExistInMenu ? valueInput : '')
  }, [valueInput])

  const renderMenus = useCallback(() => {
    if (children) return children

    if (menus?.options?.length! > 0 && getValueLanguage) {
      return menus?.options?.map((menu) => {
        return (
          <MenuItem
            key={((menus?.label && menu[menus.label]) ?? menu) as Key}
            value={((menus?.value && menu[menus.value]) ?? menu) as MenuValue}
          >
            {((menus?.label && getValueLanguage(menu, menus.label as string)) ?? menu) as React.ReactNode}
          </MenuItem>
        )
      })
    }
    return (
      <MenuItem value=''>
        <em></em>
      </MenuItem>
    )
  }, [menus, getValueLanguage])

  return (
    <SelectItem
      {...selectProps}
      name={name}
      open={toggleShowList}
      native={false}
      onChangeCustom={onChangeSelect}
      textFieldProps={{
        SelectProps: {
          renderValue(value: any) {
            const item = menus?.options.find((option) => {
              return option?.[menus.value as keyof T] === Number(value) || option?.[menus.label as keyof T] === value
            })

            if (item) {
              return getValueLanguage(item, menus?.label as string)
            }
            return value
          }
        },
        ...selectProps.textFieldProps
      }}
      sxBox={{
        maxWidth: '100%',
        ...selectProps.sxBox
      }}
    >
      {toggleShowInput ? (
        <Box sx={{ margin: '-2px 4px 4px 4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <InputItem
            maxLength={inputProps?.inputProps?.maxLength}
            control={control}
            onChangeInput={onChangeManualInput}
            textFieldProps={{
              ...inputProps,
              onClick: onClickInput,
              onKeyDown: onKeyDown,
              onClickCapture: (e) => {
                e.preventDefault()
                e.stopPropagation()
              },
              autoFocus: true,
              focused: true
            }}
            name={'content'}
          />
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: home.gray200
            }}
          />
        </Box>
      ) : (
        <MenuItem
          sx={{
            p: 0,
            paddingTop: '-10px',
            display: 'flex',
            flexDirection: 'column',
            padding: '0 4px 4px 4px',
            gap: '8px',
            ':hover': {
              backgroundColor: 'initial'
            }
          }}
        >
          <Button
            fullWidth
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setToggleInput(true)
            }}
            sx={{
              height: 56,
              justifyContent: 'start',
              width: '100%',
              maxWidth: '100%',
              borderRadius: '8px',
              color: home.blue500,
              backgroundColor: home.gray300,
              marginInline: '4px',
              marginTop: '-4px',
              '&:hover': {
                backgroundColor: home.gray200
              }
            }}
            size='large'
            variant='contained'
          >
            {inputProps?.placeholder}
          </Button>
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: home.gray200
            }}
          />
        </MenuItem>
      )}
      {renderMenus()}
    </SelectItem>
  )
}

export default SelectInput
