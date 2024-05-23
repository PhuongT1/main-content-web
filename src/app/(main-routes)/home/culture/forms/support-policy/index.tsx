'use strict'

import { Typography } from '@/elements'
import { Alert, Box, useTheme } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonItem, DeleteButton, EditButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { culture_forms } from '@/atoms/culture'
import { useState } from 'react'
import * as _ from 'lodash'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import Policy from './policy/inidex'
import PlusIcon from '@/assets/icons/plus'
import WarningAppend from '../../warning-append'

const SupportPolicy = () => {
  const allTheRefs: any = {}
  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [currentFormState, setCurrentFormState] = useState(_.isEmpty(cultureForms.support_policy) ? 'wip' : 'completed')

  const {
    palette: { home }
  } = useTheme()

  const yups = yup.object().shape({
    support_policy: yup
      .array(
        yup.object().shape({
          title: yup.string().required(),
          policy: yup.array().min(1).required()
        })
      )
      .required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(yups),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      support_policy: cultureForms.support_policy || [{ title: '', policy: [] }]
    }
  })

  const { handleSubmit, control, reset, setValue, getValues } = form

  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: 'support_policy'
  })

  const onSubmit = async (dataSubmit: any) => {
    const data = _.cloneDeep(dataSubmit)
    setCultureForms({ ...cultureForms, support_policy: data.support_policy })
    setCurrentFormState('completed')
  }

  const onDeleteForm = () => {
    toggleShowDialog()
    reset({
      support_policy: [{ title: '', policy: [] }]
    })
    replace({ title: '', policy: [] })
    setCurrentFormState('wip')

    const data = _.cloneDeep(cultureForms)
    delete data.support_policy
    setCultureForms(data)

    for (const property in allTheRefs) {
      allTheRefs[property].onDeleteForm()
    }
  }

  const onValueChange = (policy: any, index: number) => {
    const policies = { ...getValues() }
    policies.support_policy[index] = policy

    setValue('support_policy', policies.support_policy)
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
        우리의 구성원을 지원하는 정책과 복리후생 혜택을 알려주세요.
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={'24px'} component={'form'}>
        {fields.map((item: any, index: number) => {
          return (
            <Box key={index}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
              >
                <Typography cate='sub_title_30' sx={{ color: home.mint500, fontWeight: 600 }}>
                  지원정책 0{index + 1}
                </Typography>

                {index > 0 && currentFormState !== 'completed' && (
                  <Typography
                    onClick={() => remove(index)}
                    cate='sub_title_20'
                    sx={{ color: home.gray100, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    삭제하기
                  </Typography>
                )}
              </Box>
              <Policy
                ref={(ref: any) => {
                  allTheRefs[index] = ref
                }}
                formState={currentFormState}
                onValueChange={(policy) => onValueChange(policy, index)}
                policy={item}
              />
            </Box>
          )
        })}

        {fields.length < 3 && currentFormState !== 'completed' && (
          <Box>
            <Box textAlign={'center'}>
              <ButtonItem
                onClick={() => append({ title: '', policy: [] })}
                disableRipple
                sx={{
                  color: home.blue500,
                  background: home.alpha_blue_10,
                  border: `1px solid ${home.blue500}`,
                  height: '46px'
                }}
                startIcon={<PlusIcon pathProps={{ stroke: 'currentColor', strokeWidth: '2px' }} />}
              >
                지원정책 추가
              </ButtonItem>
            </Box>

            <WarningAppend text='지원정책은 최대 3개까지 추가 가능합니다.' />
          </Box>
        )}
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

export default SupportPolicy
