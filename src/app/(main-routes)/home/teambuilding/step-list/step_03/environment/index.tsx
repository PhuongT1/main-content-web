'use client'

import { Box, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { MultiCheckbox } from '@/form/checkbox'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import styles from './environment.module.scss'
import CardSelectedBox from '../../../_components/card-selected'
import { BoxLayout } from '@/components/home/box/box-custom'
import { listenEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import SvgIcon from '@/components/home/svg'
import SectionTitle from '@/components/home/section-title'
import { TFormValues } from '../edit'
import { ENVIRONMENT_LIST, TItem } from '@/mock/teambuilding/data'
import { handleFieldArray } from '../../../utils/handler'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

interface EnvironmentSectionProps<TFieldValues extends FieldValues> {
  formProps: UseFormReturn<TFieldValues>
}

function EnvironmentSection({ formProps }: EnvironmentSectionProps<TFormValues>) {
  const { dict, lang } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { control, resetField } = formProps
  const { list, onRemoveItem } = handleFieldArray(formProps, 'workingEnv')

  useEffect(() => {
    listenEvent(EventNameTBuidlding.RESET_TBUIDLING_ST3, () => {
      resetField('workingEnv')
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
        title={dict.teambuilding_working_environment}
        subtitle={dict.teambuilding_working_environment_description}
      />
      <BoxLayout
        sx={{
          backgroundColor: (theme) => theme.palette.home.gray400
        }}
      >
        <Box component={'div'} className={styles.environment}>
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
                >
                  <SvgIcon svg={item.icon} />
                  <Box
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      flex: 1
                    }}
                  >
                    {lang === LANG.EN ? item.titleEn : item.titleKr}
                  </Box>
                  
                </Box>
              )}
              name='workingEnv'
              list={{
                options: ENVIRONMENT_LIST,
                value: 'id',
                label: 'title'
              }}
              control={control}
            />
          </Box>
        </Box>
      </BoxLayout>

      <CardSelectedBox
        onRemove={onRemoveItem}
        countItemRow={5}
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
                  {lang === LANG.EN ? item.titleEn : item.title}
                </Box>
              </Box>
            )
          }
        }}
      />
    </Box>
  )
}

export default EnvironmentSection
