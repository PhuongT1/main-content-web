'use client'
import { Box, Stack, useTheme } from '@mui/material'
import styles from './step_02.module.scss'
import CandidateList from '../../_components/candidates'
import { MoreButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { useEffect, useState } from 'react'
import CardMultiple from '../../_components/card-multiple'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getOpenaiKeyword } from '@/services/naming.service'
import { NamingCandidates, Namingkeyword } from '@/types/naming.type'
import { remConvert } from '@/utils/convert-to-rem'
import SchumpeterAI from './schumpeterAI'
import ErrorMessage from '@/form/ErrorMessage'
import { STEP } from '@/constants/common.constant'
import LoadingAI from '@/elements/loadingAI'
import { QUERY_KEY_CANDIDATES, QUERY_KEY_KEYWORD } from '@/constants/naming.constant'
import { useNamingData, useNamingPostData } from '../../../hooks/use-naming'
import useToggle from '@/hooks/use-toggle'
import { messageMax } from '..'
import { useLanguage } from '@/hooks/use-language'
import SectionTitle from '@/components/home/section-title'
import { ModalReset } from '@/components/dialog/modal-deck'

const Step2Edit = () => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()
  const defaultValues = { selectedItem: [] }
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [param, setParam] = useState<string[]>()
  const [isErrorMax, setErrorMax] = useState<Boolean>(false)

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isValid, errors }
  } = useFormContext<NamingCandidates>()
  const dataAI = watch('dataAI')

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['naming-candidates-AI', param],
    queryFn: ({ queryKey: [, param] }) => getOpenaiKeyword(param as string[]),
    meta: {
      offLoading: true
    },
    enabled: false
  })

  const { data: dataKeyword } = useNamingData<Namingkeyword>(STEP.STEP_ONE, QUERY_KEY_KEYWORD)

  useEffect(() => {
    if (Number(data?.length) > 0) {
      const appendData = [...(dataAI || []), ...(data || [])]
      const dataFilter = appendData.filter((obj, index) => {
        return index === appendData.findIndex((item) => obj.en === item.en && obj.kr === item.kr)
      })
      setValue('dataAI', dataFilter)
    }
  }, [data])

  useEffect(() => {
    if (!dataKeyword?.data) return
    const { selectedItem } = dataKeyword.data
    if (!selectedItem) return
    selectedItem.length > 0 && setParam(selectedItem.map((item) => `${item?.name},${item?.affectTitle}`))
  }, [dataKeyword])

  const { data: candidates } = useNamingData<NamingCandidates>(STEP.STEP_TWO, QUERY_KEY_CANDIDATES)

  const { mutation } = useNamingPostData<NamingCandidates>(STEP.STEP_TWO)

  const fieldArray = useFieldArray({
    control,
    name: 'selectedItem'
  })

  const { append, remove, fields } = fieldArray

  useEffect(() => {
    if (candidates) {
      if (Object.keys(candidates).length === 0) {
        reset(defaultValues, { keepDefaultValues: false })
      } else {
        reset(candidates.data, { keepDefaultValues: false })
      }
    }
  }, [candidates])

  const handleCompleteStep = (data: NamingCandidates) => mutation(data)

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(defaultValues, { keepDefaultValues: false })
  }

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 4000)
  }

  return (
    <Box sx={{ width: '100%' }} component={'form'} onSubmit={handleSubmit(handleCompleteStep)}>
      <Box component={'div'} className={styles.layer_step}>
        <SectionTitle
          title={dict?.naming_step_2_title}
          uptoTitle={`(${dict.naming_step_2_upto})`}
          subtitle={dict?.naming_step_2_subtitle}
        />
        <LoadingAI isLoading={isFetching}>
          {(!dataAI || Number(param?.length) === 0) && (
            <Box component={'div'} sx={{ backgroundColor: '#191A1C', width: '100%', borderRadius: remConvert('10px') }}>
              <SchumpeterAI
                onClick={() => {
                  refetch()
                }}
              />
            </Box>
          )}
          {dataAI && (
            <Box
              component={'div'}
              sx={{
                padding: remConvert('20px 24px'),
                backgroundColor: home.gray400,
                borderRadius: remConvert('10px')
              }}
            >
              <CardMultiple
                indexEn='en'
                indexKr='kr'
                dataList={dataAI}
                onRemoveCard={(index) => remove(index)}
                onAddCard={(card) => append(card)}
                cardActiveList={fields}
                height={374}
                maxSelected={10}
                overQuantity={overQuantity}
              />
              <Stack width={'100%'} textAlign={'center'} display={'inline-block'} paddingTop={remConvert('20px')}>
                <MoreButton
                  disabled={dataAI && dataAI.length > 120 ? true : false}
                  svgComponentProps={{
                    pathProps: {
                      stroke: dataAI && dataAI.length > 120 ? home.gray200 : home.gray50
                    }
                  }}
                  onClick={() => refetch()}
                />
              </Stack>
            </Box>
          )}
        </LoadingAI>
      </Box>
      <CandidateList fieldArray={fieldArray} />
      {(isErrorMax || errors.selectedItem?.message) && (
        <Box component={'div'} sx={{ mb: remConvert('60px'), mt: remConvert('-30px') }}>
          <ErrorMessage message={errors.selectedItem?.message || messageMax} />
        </Box>
      )}
      <Stack flexDirection={'row'} className={styles.btn_active} gap={remConvert('20px')} justifyContent={'center'}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton disabled={!isValid} type='submit' />
      </Stack>
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
    </Box>
  )
}

export default Step2Edit
