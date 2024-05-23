import React, { FC, memo } from 'react'
import { Checkbox, CheckboxProps, FormControlLabel, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

interface SurveyCheckBoxProps {
  checkboxProps: CheckboxProps
  label: string
}

const SurveyCheckBox: FC<SurveyCheckBoxProps> = ({ checkboxProps, label }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <FormControlLabel
      sx={{
        marginLeft: 0,
        borderRadius: remConvert('10px'),
        background: home.gray200,
        padding: remConvert('1px 10px 1px 20px'),
        marginRight: 0,
        '.MuiFormControlLabel-label': { fontSize: remConvert('16px'), fontWeight: 400 }
      }}
      control={<Checkbox {...checkboxProps} />}
      label={label}
      labelPlacement='start'
    />
  )
}

export default memo(SurveyCheckBox)
