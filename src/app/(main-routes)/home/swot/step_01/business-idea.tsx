'use client'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './step_01.module.scss'
import React, { FC } from 'react'
import { Slogan_Step1_Type } from '@/types/slogan.type'
import { useFormContext } from 'react-hook-form'
import InputWrapper from '@/components/input-wrapper'
import { MAXLENGTH_INPUT } from '../../competitor-analysis/_components/utils'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  isView?: boolean
}

const BusinessIdea: FC<Props> = ({ isView = false }) => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  const { control } = useFormContext<Slogan_Step1_Type>()
  return (
    <Box component={'div'} className={styles.part_area}>
      <InputWrapper
        title={dict.swot_business}
        subTitle={dict.swot_business_des}
        sxLabel={{ marginTop: 'unset' }}
        items={[
          {
            name: 'brandName',
            label: dict.swot_brand_name,
            column: 3,
            placeholder: dict.swot_placeholder_brand_name,
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAXLENGTH_INPUT.INDUSTRY, disabled: isView } }
          },
          {
            name: 'idea',
            label: dict.swot_idea,
            column: 9,
            placeholder: dict.swot_placeholder_idea,
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAXLENGTH_INPUT.IDEA, disabled: isView } }
          }
        ]}
      />
    </Box>
  )
}
export default BusinessIdea
