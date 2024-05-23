'use client'
import { Box, Stack, useTheme } from '@mui/material'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import CardMultiple from '../../_components/card-multiple'
import { useFieldArray, useFormContext } from 'react-hook-form'
import TipItem from '@/components/home/tip-item'
import { remConvert } from '@/utils/convert-to-rem'
import { NamingAnalyzing, NamingCandidates, NamingTab } from '@/types/naming.type'
import Analyzing, { DataTableAnalyzing } from '@/components/home/analyzing'
import styles from './step_03.module.scss'
import { STEP } from '@/constants/common.constant'
import { QUERY_KEY_ANALYZING, QUERY_KEY_CANDIDATES } from '@/constants/naming.constant'
import { useNamingData, useNamingPostData } from '../../../hooks/use-naming'
import useToggle from '@/hooks/use-toggle'
import { useCallback, useEffect, useState } from 'react'
import { defaultValuesAnalyzing } from '..'
import ErrorMessage from '@/form/ErrorMessage'
import { useLanguage } from '@/hooks/use-language'
import SectionTitle from '@/components/home/section-title'
import { useRowTable } from '../card_data'
import { ModalReset } from '@/components/dialog/modal-deck'
import RefreshIcon from '@/assets/icons/refresh'

const Step3Edit = () => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [isErrorMax, setErrorMax] = useState<Boolean>(false)
  const messageMax = dict.naming_step_3_error
  const defaultNamingTextEN = 'Select naming'
  const defaultNamingTextKr = '네이밍'

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useFormContext<NamingAnalyzing>()

  const { data } = useNamingData<NamingCandidates>(STEP.STEP_TWO, QUERY_KEY_CANDIDATES)
  const { data: analyzing } = useNamingData<NamingAnalyzing>(STEP.STEP_THREE, QUERY_KEY_ANALYZING)

  const fieldArrayCard = useFieldArray({
    control,
    name: 'cardActiveList'
  })
  const { append, remove, update, fields } = fieldArrayCard
  const { rowItem } = useRowTable(fields)

  useEffect(() => {
    if (analyzing) {
      if (Object.keys(analyzing?.data ?? {}).length === 0) {
        reset(defaultValuesAnalyzing(dict), { keepDefaultValues: false })
      } else {
        reset(analyzing.data, { keepDefaultValues: false })
      }
    }
  }, [analyzing, dict])

  const { mutation } = useNamingPostData<NamingAnalyzing>(STEP.STEP_THREE)

  const getValuesForm = useCallback((data: DataTableAnalyzing) => {
    data.tableAnalyzing.map((item, index) => {
      setValue(`cardActiveList.${index}.point`, item)
    })
  }, [])

  const handleCompleteStep = (data: NamingAnalyzing) => mutation(data)

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(defaultValuesAnalyzing(dict), { keepDefaultValues: false })
  }

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 3000)
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(handleCompleteStep)}>
      <SectionTitle
        title={dict?.naming_step_3_title}
        uptoTitle={`(${dict.naming_step_3_upto})`}
        subtitle={dict?.naming_step_3_subtitle}
      />
      <Box component={'div'} bgcolor={home.gray400} padding={remConvert('20px 24px')} borderRadius={remConvert('10px')}>
        <CardMultiple
          dataList={data?.data?.selectedItem}
          cardActiveList={fields}
          indexKr='name'
          indexEn='affectTitle'
          isAutoHeight
          maxSelected={3}
          handleCarditem={(card) => {
            const indexCard = fields?.findIndex(
              (item) => item.name === card.name && item.affectTitle === card.affectTitle
            )
            if (indexCard > -1) {
              if (fields.length > 2) return remove(indexCard)
              return update(indexCard, {
                name: dict.naming_step_3_default_table.replaceAll('{number}', `${indexCard + 1}`),
                point: [],
                isActive: false
              } as unknown as NamingTab)
            }

            let isAdd = false
            fields.some((item, index) => {
              if (item.name.indexOf(defaultNamingTextKr) > -1 || item.name.indexOf(defaultNamingTextEN) > -1) {
                update(index, { ...card, point: [], isActive: false })
                isAdd = true
                return true
              }
            })
            if (!isAdd && fields.length < 3) return append({ ...card, point: [] })
            if (fields.length === 3) {
              overQuantity()
            }
          }}
        />
      </Box>
      {(isErrorMax || errors.selectedItem?.message) && (
        <Box component={'div'} sx={{ mb: remConvert('60px'), mt: remConvert('20px') }}>
          <ErrorMessage message={errors.selectedItem?.message || messageMax} />
        </Box>
      )}
      <SectionTitle title={dict?.naming_step_3_analysis_title} subtitle={dict?.naming_step_3__analysis_subtitle} />
      <Analyzing
        textFinalSelected={'최종 선택'}
        getValuesForm={getValuesForm}
        tableAnalyzing={fields?.map((item) => item.point || [])}
        rows={rowItem}
        sliderProps={{
          min: 1,
          max: 5,
          step: 1
        }}
        onSetActive={(index) => {
          setValue(
            'cardActiveList',
            getValues('cardActiveList').map((item, indexActive) => ({
              ...item,
              isActive: indexActive === index
            }))
          )
        }}
        indexActive={fields?.findIndex((item) => item.isActive)}
      />
      <Box component={'div'} className={styles.tipItem}>
        <TipItem
          content={
            <>
              {dict.naming_step_3_tip_title}
              <ol>
                <li>{dict.naming_step_3_tip_1_title}</li>
                <ul>
                  <li>{dict.naming_step_3_tip_1_1}</li>
                  <li>{dict.naming_step_3_tip_1_2}</li>
                </ul>
                <li>{dict.naming_step_3_tip_2_title}</li>
                <ul>
                  <li>{dict.naming_step_3_tip_2_1}</li>
                  <li>{dict.naming_step_3_tip_2_2}</li>
                </ul>
                <li>{dict.naming_step_3_tip_3_title}</li>
                <ul>
                  <li>{dict.naming_step_3_tip_3_1}</li>
                  <li>{dict.naming_step_3_tip_3_2}</li>
                </ul>
                <li>{dict.naming_step_3_tip_4_title}</li>
                <ul>
                  <li>{dict.naming_step_3_tip_4_1}</li>
                  <li>{dict.naming_step_3_tip_4_2}</li>
                </ul>
                <li>{dict.naming_step_3_tip_5_title}</li>
                <ul>
                  <li>{dict.naming_step_3_tip_5_1}</li>
                  <li>{dict.naming_step_3_tip_5_2}</li>
                  <li>{dict.naming_step_3_tip_5_3}</li>
                </ul>
              </ol>
            </>
          }
        />
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_active}>
        <RefreshButton
          onClick={() => setToggleShowDialog(true)}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50
          }}
          startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
        />
        <SubmitButton disabled={!isValid} type='submit' />
      </Stack>
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
    </Box>
  )
}

export default Step3Edit
