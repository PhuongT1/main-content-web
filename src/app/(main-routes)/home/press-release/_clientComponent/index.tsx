'use client'
import { GenogramIcon } from '@/assets/icons'
import CardNewsIcon from '@/assets/icons/card-news/card-news'
import LockRedIcon from '@/assets/icons/dialog-icons/lock-red'
import DownloadIcon from '@/assets/icons/download'
import CardBox from '@/components/cards/card-box'
import { FormStatus } from '@/constants/press-release.constant'
import { PrimaryButton, Typography } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import { getStep, postStep } from '@/services/step.service'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { deepEqual } from '@/utils/deep-compare-object'
import { NavigateNext } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CreatePressRelease from '../_component/create-press-release'
import PressReleaseResult, { PressResultRefProps } from '../_component/press-release'
import { defaultPayload } from '../_component/utils/common'
import {
  IOpenAiPressRelease,
  editPressRelease,
  openAIPressRelease,
  pressExpand,
  pressReleaseAtom
} from '../press-release.atom'
import { useLanguage } from '@/hooks/use-language'

const PressRelease = ({ id }: { id: string }) => {
  const { dict } = useLanguage()
  const expanded = useRecoilValue(pressExpand)
  const setGPTPress = useSetRecoilState(openAIPressRelease)
  const setPressList = useSetRecoilState(pressReleaseAtom)
  const [editPress, setEditPress] = useRecoilState(editPressRelease)
  const [showConfirm, setShowConfirm] = useState(false)

  const pressRef = useRef<PressResultRefProps>(null)
  let tempRef = useRef<HTMLElement>(null)

  const [press, setPress] = useState<IOpenAiPressRelease>()

  const { data, isFetching, refetch } = useQuery({
    queryKey: [`press-release`, { id }],
    queryFn: () => getStep({ projectId: +id, deckId: 14, stepId: 1 }),
    select: ({ data }) => {
      return data as TStepApi
    },
    meta: {
      offLoading: true
    },
    placeholderData: keepPreviousData
  })

  const reSubmitStep = useMutation({
    mutationFn: (payload: any) => postStep(payload),
    onSuccess: ({ data }) => {
      setEditPress(false)
    },
    onError: () => {
      enqueueSnackbar('Failure', { variant: 'error' })
    },
    onSettled: () => {
      refetch()
      enqueueSnackbar('저장되었습니다.', { variant: 'success' })
    }
  })

  const handleSave = () => {
    if (deepEqual(pressRef.current?.editContent, press?.result)) {
      setEditPress(false)
    } else {
      if (data && data.data) {
        const orgGPTPress = [...data.data]
        const pressId = data.data.findIndex((val: any) => val?.referenceId === expanded)
        const payload: TStepPayload<any> = {
          ...defaultPayload,
          data: []
        }
        if (pressId !== -1) {
          orgGPTPress[pressId] = { ...orgGPTPress[pressId], result: pressRef.current?.editContent }
          payload.data = orgGPTPress
        }
        reSubmitStep.mutate(payload)
      }
    }
  }

  const removeChild = () => {
    if (pressRef.current) {
      pressRef.current.removeImageNode()
      tempRef = pressRef.current.boxRef
    }
  }

  const handleDownloadPDF = useReactToPrint({
    content: () => tempRef.current,
    onBeforeGetContent() {
      if (press?.result.Press_Thumbnail === undefined) {
        removeChild()
      } else {
        if (pressRef.current) {
          tempRef = pressRef.current.boxRef
        }
      }
    },
    onAfterPrint() {
      if (pressRef.current) {
        pressRef.current.addImageNode()
      }
    }
  })

  const confirmDialogAction = () => {
    setEditPress(false)
    setShowConfirm(false)
  }

  useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      setGPTPress(data.data)
      setPressList(
        data.data.map((val: any) => {
          return { ...val.payload, status: FormStatus.completed, id: val.referenceId, title: val.result.Title }
        })
      )
    }
  }, [data])

  useEffect(() => {
    if (data && data.data) {
      const pressId = data.data.findIndex((val: any) => val?.referenceId === expanded)
      if (pressId !== -1) {
        setPress(data.data[pressId])
      } else {
        setPress(undefined)
      }
    }
  }, [expanded, data])

  useEffect(() => {
    if (pressRef.current) {
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      })
    }
  }, [expanded, pressRef])

  return (
    <>
      <Stack
        sx={{
          marginY: convertToRem(60)
        }}
        gap={2.5}
      >
        <Typography cate='title_3_bold'>보도자료 작성</Typography>
        <Stack direction={'row'} gap={5} alignItems={'flex-start'}>
          <Stack gap={2.5} width={'100%'}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <PrimaryButton
                btnSize='designed-sm'
                sx={{
                  borderRadius: convertToRem(10),
                  gap: 0,
                  opacity: expanded === false ? 0.5 : 1,
                  '&.Mui-disabled': {
                    bgcolor: 'main_primary.blue500',
                    borderColor: 'main_primary.blue500'
                  }
                }}
                startIcon={<CardNewsIcon pathProps={{ fill: 'black', stroke: 'black' }} />}
                disabled={expanded === false}
                onClick={() => {
                  if (editPress) {
                    handleSave()
                  } else {
                    setEditPress(!editPress)
                  }
                }}
              >
                <Typography cate='button_30' plainColor='home.gray500'>
                  {editPress ? '보도자료 저장' : '보도자료 편집하기'}
                </Typography>
              </PrimaryButton>
              <PrimaryButton
                btnSize='designed-sm'
                sx={{
                  borderRadius: convertToRem(10),
                  gap: 0,
                  opacity: expanded === false ? 0.5 : 1,
                  '&.Mui-disabled': {
                    bgcolor: 'main_primary.blue900',
                    borderColor: 'main_primary.blue300'
                  }
                }}
                outlined
                onClick={() => {
                  if (editPress) {
                    setShowConfirm(true)
                  } else {
                    handleDownloadPDF()
                  }
                }}
                disabled={expanded === false}
                startIcon={<DownloadIcon pathProps={{ stroke: '#3C82F9' }} />}
              >
                <Typography cate='button_30' plainColor='main.blue'>
                  PDF 다운로드
                </Typography>
              </PrimaryButton>
            </Stack>
            {press ? (
              <PressReleaseResult ref={pressRef} pressContent={press} isEdit={editPress} />
            ) : (
              <CardBox
                flex={5}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2.5}
                sx={{ backgroundColor: 'home.gray400', borderRadius: convertToRem(10), minHeight: convertToRem(300) }}
              >
                <GenogramIcon />
                {data && data.data && data.data.length > 0 ? (
                  <Typography textAlign={'center'} cate='body_30' plainColor='home.gray100'>
                    생성한 보도자료를 확인해보세요.
                  </Typography>
                ) : (
                  <Typography textAlign={'center'} cate='body_30' plainColor='home.gray100'>
                    생성된 보도자료가 없습니다.
                    <br />
                    보도자료를 생성해보세요.
                  </Typography>
                )}
              </CardBox>
            )}
          </Stack>
          <CreatePressRelease />
        </Stack>
      </Stack>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <PrimaryButton
          btnSize='designed-md'
          sx={{
            height: convertToRem(60),
            borderRadius: convertToRem(10)
          }}
          endIcon={
            <NavigateNext
              fontSize='large'
              sx={{
                color: 'home.gray500'
              }}
            />
          }
        >
          <Typography cate='button_30' plainColor='home.gray500'>
            다음 Deck으로 이동
          </Typography>
        </PrimaryButton>
      </Stack>
      <AlertPopup
        onSubmit={confirmDialogAction}
        onCancel={() => {
          setShowConfirm(false)
        }}
        submitTitle='확인'
        cancelTitle='취소'
        icon={<LockRedIcon />}
        description={dict.deck_delete_description}
        title={dict.deck_delete_title}
        open={showConfirm}
      />
    </>
  )
}

export default PressRelease
