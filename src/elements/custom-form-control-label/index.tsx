import { FormControl, InputLabelProps, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'
import styles from './custom-form-control-label.module.scss'

export type CustomFormControlLabelProps = {
  name: string
  inputLabelProps?: InputLabelProps
  children?: ReactNode
  containerSx?: SxProps<Theme>
  containerStyle?: string
  label?: string
  required?: boolean
  fullWidth?: boolean
  suffixLabel?: string
  startAdornmentFocused?: ReactNode
  endAdornmentFocused?: ReactNode
}

export const getFormControlLabelProps = <T extends Omit<CustomFormControlLabelProps, 'name'>>(props: T) => {
  const { inputLabelProps, containerSx, containerStyle, label, required, fullWidth, suffixLabel, ...rest } = props
  return {
    formProps: {
      inputLabelProps,
      containerSx,
      containerStyle,
      label,
      required,
      fullWidth,
      suffixLabel
    },
    rest
  }
}

const CustomFormControlLabel = ({
  label = '',
  containerStyle,
  name,
  inputLabelProps,
  containerSx,
  required = false,
  children,
  fullWidth = false,
  suffixLabel
}: CustomFormControlLabelProps) => {
  return (
    <FormControl
      variant='outlined'
      sx={{ width: fullWidth ? '100%' : 'auto', ...containerSx }}
      className={`${styles.form_control} ${containerStyle}`}
    >
      {/* <Box display={'flex'} justifyContent={'space-between'}>
        {!!label && (
          <InputLabel
            sx={{ textAlign: 'left' }}
            shrink={true}
            htmlFor={name}
            className={styles.input_label}
            {...inputLabelProps}
          >
            <Typography color="solid_neutral.400" cate="text_sm_regular">
              {label}
              {required && (
                <Typography
                  component={'span'}
                  color="solid_error.700"
                >{` *`}</Typography>
              )}
            </Typography>
          </InputLabel>
        )}
        {suffixLabel && (
          <Typography color="solid_neutral.200" cate="text_sm_regular">
            {suffixLabel}
          </Typography>
        )}
      </Box> */}
      {children}
    </FormControl>
  )
}

export default CustomFormControlLabel
