'use client'
import { createPressRelease } from '@/actions/deck/deck14.action'
import LockRedIcon from '@/assets/icons/dialog-icons/lock-red'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import CardBox from '@/components/cards/card-box'
import { FormStatus } from '@/constants/press-release.constant'
import { GhostButton, MenuItem, PrimaryButton, Typography } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import SelectItem from '@/form/select'
import { postStep } from '@/services/step.service'
import { IPressRelease, IPressReleaseGroups } from '@/types/press-release/press-release.type'
import { TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Add } from '@mui/icons-material'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import useRandomImage from '../../../card-news/hooks/useRandomImage'
import { editPressRelease, openAIPressRelease, pressExpand, pressReleaseAtom } from '../../press-release.atom'
import CompletedForm from '../completeForm'
import PressReleaseForm from '../form'
import PressTypeDialog from '../press-type-dialog'
import { defaultPayload, pressReleaseFormTypes, pressReleaseTypes } from '../utils/common'
import { useLanguage } from '@/hooks/use-language'

const CreatePressRelease = () => {
  const { dict } = useLanguage()
  const {
    palette: { home, main, main_grey, mode }
  } = useTheme()
  const queryClient = useQueryClient()
  const [openExplore, setOpenExplore] = useState<boolean>(false)
  const [pressList, setPressList] = useRecoilState(pressReleaseAtom)
  const [pressGPT, setPressGPT] = useRecoilState(openAIPressRelease)
  const [expanded, setExpanded] = useRecoilState(pressExpand)
  const [formGroups, setFormGroups] = useState<IPressReleaseGroups>()
  const [editPress, setEditPress] = useRecoilState(editPressRelease)
  const { getRandomImages, getImages } = useRandomImage({ page: 1, limit: 20 })

  const [showConfirm, setShowConfirm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [selectId, setSelectId] = useState<number>(0)
  const [actionType, setActionType] = useState<'edit' | 'delete' | 'removeForm' | 'changeCate' | 'changePress' | null>(
    null
  )

  const submitStep = useMutation({
    mutationFn: (payload: any) => postStep(payload),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['press-release'] })
      setFormGroups(undefined)
    },
    meta: {
      offLoading: true
    }
  })

  const pressReleaseMutation = useMutation({
    mutationKey: ['gpt-press-release-mutate'],
    meta: {
      offLoading: true
    },
    mutationFn: async (submitData: any) => {
      const id = submitData.id

      delete submitData.id
      delete submitData.status
      const { data, error } = await createPressRelease(submitData)

      if (error) throw error

      return { id, data, submitData }
    },
    onSuccess: (data) => {
      const pressIdx = pressGPT.findIndex((val) => val?.referenceId === data.id)

      const payload: TStepPayload<any> = {
        ...defaultPayload,
        data: []
      }

      const temp = [...pressGPT]

      const image = getRandomImages()

      if (pressIdx !== -1) {
        temp[pressIdx] = {
          referenceId: data.id,
          result: { ...data.data.data, Press_Thumbnail: image },
          payload: data.submitData
        }

        payload.data = temp
      } else {
        temp.push({
          referenceId: data.id,
          result: { ...data.data.data, Press_Thumbnail: image },
          payload: data.submitData
        })
        payload.data = temp
      }

      submitStep.mutate(payload as TStepPayload<any>)
      setExpanded(data.id)
    },
    onError: () => {
      enqueueSnackbar('Failure', { variant: 'error' })
    }
  })

  const form = useForm<IPressRelease>({
    mode: 'all',
    defaultValues: {
      pressReleaseType: ''
    }
  })
  const {
    control,
    formState: { isValid },
    getValues
  } = form

  const onAddPressReleaseForm = () => {
    if (!isValid) return

    const pressReleaseFormType = getValues('pressReleaseType')
    form.setValue('pressReleaseType', pressReleaseFormType)
    // console.log('form values', form.getValues())
    //show warning popup to confirm want to change card news type
    const newForms = pressReleaseFormTypes.find(({ type }) => type === pressReleaseFormType)
    setFormGroups(newForms)
  }

  const onAddPressRelease = (submitData: any) => {
    pressReleaseMutation.mutate(submitData)
  }

  const onEditPressReleaseForm = (id: number) => {
    const editData = pressList.find((item) => item.id === id)
    const newForm = { ...editData, status: FormStatus.inprogress }

    setPressList(pressList.map((item: any) => (item.id === id ? newForm : item)))
  }

  const handleCancelEdit = (id: number) => {
    const editData = pressList.find((item) => item.id === id)
    const newForm = { ...editData, status: FormStatus.completed }

    setPressList(pressList.map((item: any) => (item.id === id ? newForm : item)))
  }

  const onDeletePressReleaseForm = (id: number) => {
    const pressFilter = pressGPT.filter((val) => val.referenceId !== id)

    const payload: TStepPayload<any> = {
      ...defaultPayload,
      data: [...pressFilter]
    }

    submitStep.mutate(payload as TStepPayload<any>)
    setExpanded(false)
    setShowConfirm(false)
  }

  const confirmDialogAction = () => {
    switch (actionType) {
      case 'edit':
        handleCancelEdit(selectId)
        break
      case 'delete':
        onDeletePressReleaseForm(selectId)
        break
      case 'removeForm':
        setFormGroups(undefined)
        break
    }
    setShowConfirm(false)
  }

  const cancelDialogAction = () => {
    switch (actionType) {
      case 'changePress':
        setEditPress(false)
        setExpanded(selectId)
        break
      case 'changeCate':
        onAddPressReleaseForm()
        break
    }
    setShowAlert(false)
  }

  const handleChange = (id: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    if (editPress) {
      setActionType('changePress')
      setShowAlert(true)
      setSelectId(id)
    } else {
      setExpanded(newExpanded ? id : false)
    }
  }

  const expandable = (id: number) => {
    const inprogress = pressList.some((val) => val.status === FormStatus.inprogress)

    if (inprogress || formGroups) {
      return false
    } else {
      return expanded === id
    }
  }

  return (
    <>
      <CardBox
        gap={2.5}
        sx={{
          maxWidth: convertToRem(360),
          backgroundColor: 'home.gray400',
          borderRadius: convertToRem(10),
          padding: convertToRem(20)
        }}
      >
        <Stack>
          <Typography textAlign={'center'} cate='body_2_bold' plainColor='home.gray50'>
            보도자료 만들기
          </Typography>
          <Typography textAlign={'center'} cate='body_30' plainColor='home.gray100'>
            슘페터AI로 보도자료를 생성해보세요.
          </Typography>
        </Stack>
        <Stack direction={'row'} gap={2.5}>
          <Box flex={7}>
            <SelectItem textFieldProps={{ placeholder: '보도자료 유형' }} control={control} name={'pressReleaseType'}>
              {pressReleaseTypes.map((i, index) => {
                return (
                  <MenuItem value={i.value} key={index}>
                    <Typography cate='body_3' color={main_grey.gray100} ml={2}>
                      {i.label}
                    </Typography>
                  </MenuItem>
                )
              })}
            </SelectItem>
          </Box>
          <PrimaryButton
            btnSize='md'
            sx={{
              flex: 2,
              gap: 0
            }}
            startIcon={
              <Add
                sx={{
                  color: 'home.gray500'
                }}
              />
            }
            onClick={() => {
              if (formGroups && formGroups.type !== form.getValues('pressReleaseType')) {
                setActionType('changeCate')
                setShowAlert(true)
              } else {
                onAddPressReleaseForm()
              }
            }}
          >
            <Typography
              cate='body_30'
              plainColor='home.gray500'
              sx={{
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              만들기
            </Typography>
          </PrimaryButton>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
          <GhostButton
            btnSize='xs-np'
            onClick={() => {
              setOpenExplore(true)
            }}
            disableRipple
            disableElevation
            sx={{
              height: convertToRem(24),
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <Typography
              textAlign={'right'}
              cate='body_30'
              plainColor='main_primary.blue500'
              sx={{
                textDecoration: 'underline'
              }}
            >
              보도자료 유형 살펴보기
            </Typography>
          </GhostButton>
        </Stack>
        <Divider orientation='horizontal' flexItem />
        <Stack gap={2.5} justifyContent={'center'} alignItems={'center'}>
          {formGroups && (
            <PressReleaseForm
              onSubmit={onAddPressRelease}
              formGroup={formGroups}
              type={getValues('pressReleaseType')}
              formStatus={FormStatus.inprogress}
              isLoading={pressReleaseMutation.isPending || submitStep.isPending}
              onCancel={() => {
                setActionType('removeForm')
                setShowConfirm(true)
              }}
            />
          )}
          {pressList &&
            pressList
              .map((item, index: number) =>
                item.status === FormStatus.completed ? (
                  <CompletedForm
                    key={item.type + item.id}
                    formData={{
                      formType: item.type,
                      data: item
                    }}
                    onEdit={() => onEditPressReleaseForm(item.id)}
                    onDelete={() => {
                      setActionType('delete')
                      setSelectId(item.id)
                      setShowConfirm(true)
                    }}
                    onChange={handleChange(item.id)}
                    expand={expandable(item.id)}
                  />
                ) : (
                  <PressReleaseForm
                    key={item.type}
                    onSubmit={onAddPressRelease}
                    formGroup={pressReleaseFormTypes.find(({ type }) => type === item.type)}
                    type={item.type}
                    initValues={item}
                    isLoading={pressReleaseMutation.isPending || submitStep.isPending}
                    onCancel={() => {
                      setActionType('edit')
                      setSelectId(item.id)
                      setShowConfirm(true)
                    }}
                  />
                )
              )
              .reverse()}
        </Stack>
      </CardBox>
      <PressTypeDialog
        open={openExplore}
        pressType={form.getValues('pressReleaseType')}
        title={'개발'}
        description='조직이 기술적 혁신을 추구하고, 새로운 제품 또는 서비스를 소개함으로써 시장에서의 경쟁력을 강화하고 관련 이해관계자들에게 해당 개발 활동의 중요성을 전달하는 것입니다.'
        onCancel={() => setOpenExplore(false)}
      />
      <AlertPopup
        onSubmit={confirmDialogAction}
        onCancel={() => {
          setShowConfirm(false)
        }}
        submitTitle='삭제하기'
        cancelTitle='닫기'
        icon={<TrashRedIcon />}
        title={'작성한 데이터가 삭제됩니다.'}
        description={'삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'}
        open={showConfirm}
      />
      <AlertPopup
        onSubmit={cancelDialogAction}
        onCancel={() => {
          setShowConfirm(false)
        }}
        submitTitle='확인'
        cancelTitle='취소'
        icon={<LockRedIcon />}
        description={dict.deck_delete_description}
        title={dict.deck_delete_title}
        open={showAlert}
      />
    </>
  )
}

export default CreatePressRelease
