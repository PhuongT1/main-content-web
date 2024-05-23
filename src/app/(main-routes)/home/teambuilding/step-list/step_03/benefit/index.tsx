'use client'

import { Box, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { MultiCheckbox } from '@/form/checkbox'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import styles from './benefit.module.scss'
import CardSelectedBox from '../../../_components/card-selected'
import { listenEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import SvgIcon from '@/components/home/svg'
import SectionTitle from '@/components/home/section-title'
import { BoxLayout } from '@/components/home/box/box-custom'
import { TFormValues } from '../edit'
import { BENEFIT_LIST, TItem } from '@/mock/teambuilding/data'
import { handleFieldArray } from '../../../utils/handler'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

interface BenefitSectionProps<TFieldValues extends FieldValues> {
  formProps: UseFormReturn<TFieldValues>
}

function BenefitSection({ formProps }: BenefitSectionProps<TFormValues>) {
  const { dict, lang } = useLanguage()
  const { control, resetField } = formProps
  const {
    palette: { home }
  } = useTheme()
  const { list, onRemoveItem } = handleFieldArray(formProps, 'welBenefits')

  useEffect(() => {
    listenEvent(EventNameTBuidlding.RESET_TBUIDLING_ST3, () => {
      resetField('welBenefits')
    })
  }, [])

  return (
    <Box
      flexDirection={'column'}
      display='flex'
      justifyContent='space-between'
      alignItems='space-between'
      gap={'20px'}
      width='100%'
    >
      <SectionTitle
        mb={0}
        title={dict.teambuilding_benefits}
        subtitle={dict.teambuilding_benefits_description}
      />
      <BoxLayout
        sx={{
          backgroundColor: (theme) => theme.palette.home.gray400
        }}
      >
        <Box component={'div'} className={styles.benefit}>
          <Box component={'div'} className={styles.checkbox_list}>
            <MultiCheckbox
              row
              countItemRow={5}
              sxFormGroup={{}}
              render={(item: TItem) => (
                <Box
                  display='flex'
                  justifyContent='start'
                  alignItems='center'
                  gap={1}
                  className={styles.box_selected_content}
                >
                  <SvgIcon svg={item.icon} />
                  <Box
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      flex: 1,
                      color: home.gray50
                    }}
                  >
                    {lang === LANG.EN ? item.titleEn : item.titleKr}
                  </Box>
                </Box>
              )}
              name='welBenefits'
              list={{
                options: BENEFIT_LIST,
                value: 'id',
                label: lang === LANG.EN ? 'titleEn' : 'titleKr'
              }}
              control={control}
            />
          </Box>
        </Box>
      </BoxLayout>

      <CardSelectedBox
        countItemRow={5}
        onRemove={onRemoveItem}
        list={{
          selectedList: list,
          key: 'id',
          label: lang === LANG.EN ? 'titleEn' : 'titleKr',
          render: (item: TItem) => {
            return (
              <Box
                className={styles.box_selected_content}
                component={'div'}
                display={'flex'}
                alignItems={'center'}
                gap={'8px'}
              >
                <SvgIcon svg={item.icon} />
                <Box
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    flex: 1,
                    color: home.gray50
                  }}
                >
                  {lang === LANG.EN ? item.titleEn : item.titleKr}
                </Box>
              </Box>
            )
          }
        }}
      />
    </Box>
  )
}

export default BenefitSection
