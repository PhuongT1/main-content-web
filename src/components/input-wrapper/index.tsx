'use client'
import { ReactElement } from 'react'
import { Grid, SxProps } from '@mui/material'
import InputItem from '@/form/input'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'

interface IInputWrapperItem {
  name: string
  label: string
  column?: number
  required?: boolean
  placeholder?: string
  propsInput?: any
  textFieldProps?: any
}
type IInputWrapper = {
  items: IInputWrapperItem[]
  title?: string | ReactElement
  subTitle?: string
  sxWrapper?: SxProps
  sxLabel?: SxProps
}

function InputWrapper({ items, title, subTitle, sxWrapper, sxLabel }: IInputWrapper) {
  return (
    <>
      {(title || subTitle) && (
        <Title
          label={title as string | ReactElement}
          subLabel={subTitle}
          sxLabel={{ marginTop: convertToRem(52), ...sxLabel }}
        />
      )}

      <Grid container spacing={2}>
        {items?.map((item) => (
          <Grid item xs={12} lg={item.column || 12} key={item.name} sx={{ ...sxWrapper }}>
            <InputItem
              name={item.name}
              label={item.label}
              textFieldProps={{
                required: item.required || true,
                placeholder: item.placeholder,
                ...item.textFieldProps
              }}
              {...item.propsInput}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default InputWrapper
