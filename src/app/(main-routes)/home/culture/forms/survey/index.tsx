'use strict'

import { Typography } from '@/elements'
import { Alert, Box, useTheme } from '@mui/material'
import { ValidationMode, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import CardItem from '@/components/home/card-item'
import { SURVEY } from '@/constants/culture/culture.constant'
import TextField from '@mui/material/TextField'
import PlusIcon from '@/assets/icons/culture/plus-icon'
import Image from 'next/image'
import { IconDefault } from '@/assets/images/culture'
import WarningAppend from '../../warning-append'

const Survey = () => {
  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)

  const [checkboxSelected, setCheckboxSelected] = useState<any>(cultureForms?.survey || [])
  const [directInput, setDirectInput] = useState<string>('')
  const [surveyOptions, setsurveyOptions] = useState<any>(SURVEY)

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.survey) ? 'wip' : 'completed')

  useEffect(() => {
    const res = checkboxSelected.filter((item: any) => !surveyOptions.includes(item))
    if (res.length) {
      setsurveyOptions(res.concat(surveyOptions))
    }
  }, [])

  const {
    palette: { home }
  } = useTheme()

  const defaultValues = {
    survey: cultureForms?.survey || []
  }

  const schema = yup
    .object({
      survey: yup.array().min(1).required()
    })
    .required()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }

  const { handleSubmit, control, reset, setValue, getValues, watch } = useForm<any>(formOptions)

  useEffect(() => {
    setCheckboxSelected(getValues('survey'))
  }, [watch('survey')])

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, survey: data.survey })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      survey: []
    })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.survey
    setCultureForms(data)
    setCheckboxSelected([])
    setsurveyOptions(SURVEY)
    setDirectInput('')
  }

  const onSelectItem = (value: string) => {
    let survey: any = getValues('survey')
    const find: any = survey.find((item: string) => value === item)
    if (!!find) {
      survey = survey.filter((item: any) => item !== value)
    } else {
      if (survey.length < 10) {
        survey.unshift(value)
      }
    }
    setValue('survey', survey)
  }

  const onAddItem = () => {
    if (!!directInput && !surveyOptions.includes(directInput)) {
      setsurveyOptions([directInput].concat(surveyOptions))
    }
  }

  return (
    <Box>
      <Typography
        cate='body_20'
        color={home.gray50}
        sx={{
          paddingTop: '10px',
          paddingBottom: '24px',
          borderBottom: `1px solid ${home.gray200}`,
          marginBottom: '24px'
        }}
      >
        우리의 문화에 어울리는 구성원을 찾기 위한 설문을 작성해보세요.
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'24px'} component={'form'}>
        <Box>
          <Box marginBottom={'8px'}>
            <Typography component={'span'} cate='sub_title_30' sx={{ color: 'white', fontWeight: 600 }}>
              질문 선택
            </Typography>
          </Box>
          <Box
            sx={{
              height: 'auto',
              maxHeight: '360px',
              overflow: 'scroll',
              backgroundColor: home.gray400,
              borderRadius: '10px',
              padding: '8px 8px 1px 8px'
            }}
          >
            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
              {currentFormState !== 'completed' && (
                <CardItem
                  sxCard={{ backgroundColor: home.gray300 }}
                  isActive={false}
                  cardItem={{
                    title: (
                      <Box
                        sx={{
                          display: 'flex',
                          width: '100%',
                          alignItems: 'center',
                          gap: '14px'
                        }}
                      >
                        <Box onClick={() => (currentFormState === 'completed' ? null : onAddItem())}>
                          <PlusIcon />
                        </Box>
                        <TextField
                          disabled={currentFormState === 'completed'}
                          value={directInput}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDirectInput(event.target.value)
                          }}
                          fullWidth
                          placeholder='직접 입력'
                          variant='standard'
                          inputProps={{ maxLength: 15 }}
                        />
                      </Box>
                    )
                  }}
                />
              )}
              {currentFormState === 'completed'
                ? getValues('survey').map((value: string, index: number) => {
                    return (
                      <CardItem
                        key={index}
                        sxCard={{ backgroundColor: home.gray300, height: 'auto' }}
                        onClick={() => (currentFormState === 'completed' ? null : onSelectItem(value))}
                        icon='checked'
                        isActive={checkboxSelected.includes(value)}
                        cardItem={{
                          title: (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Image src={IconDefault} width={24} height={24} alt='' />
                              <Typography cate='sub_title_30' fontWeight={600} color={home.gray50}>
                                {value}
                              </Typography>
                            </Box>
                          )
                        }}
                      />
                    )
                  })
                : surveyOptions.map((value: string, index: number) => {
                    return (
                      <CardItem
                        key={index}
                        sxCard={{ backgroundColor: home.gray300, height: 'auto' }}
                        onClick={() => (currentFormState === 'completed' ? null : onSelectItem(value))}
                        icon='checked'
                        isActive={checkboxSelected.includes(value)}
                        cardItem={{
                          title: (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <Image src={IconDefault} width={24} height={24} alt='' />
                              <Typography cate='sub_title_30' fontWeight={600} color={home.gray50}>
                                {value}
                              </Typography>
                            </Box>
                          )
                        }}
                      />
                    )
                  })}
            </Box>
          </Box>
        </Box>

        {currentFormState !== 'completed' && <WarningAppend text='설문은 최대 10개까지 선택 가능합니다.' />}

        {currentFormState === 'completed' ? (
          <Box
            component={'div'}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}
          >
            <EditButton onClick={() => setCurrentFormState('wip')} title={'수정하기'} style={{ width: '100%' }} />
            <DeleteButton onClick={toggleShowDialog} title='삭제하기' style={{ width: '100%' }} />
          </Box>
        ) : (
          <ButtonItem
            sx={{
              color: home.gray500,
              backgroundColor: home.blue500,
              height: '48px',
              '&:hover': {
                bgcolor: 'main_primary.blue300'
              }
            }}
            variant='contained'
            type='submit'
          >
            컬쳐덱에 추가
          </ButtonItem>
        )}
      </Box>
      <DeleteDeck
        title='작성한 데이터가 삭제됩니다.'
        description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'
        submitTxt='삭제하기'
        cancelTxt='닫기'
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => onDeleteForm()}
      />{' '}
    </Box>
  )
}

export default Survey
