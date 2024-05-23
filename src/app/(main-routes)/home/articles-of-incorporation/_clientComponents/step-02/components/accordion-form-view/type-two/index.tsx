import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { dataDeckActive } from '@/atoms/home/idea'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { STEP } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeTwoForm } from '@/types/articies-of-incorporation.type'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { useEffect } from 'react'
import { tabId } from '@/atoms/home/partnership-agreement'
import { listenEvent } from '@/utils/events'

const schema = yup
  .object({
    isActive: yup.boolean()
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

interface ITypeTwoOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const TypeTwoOption = ({ dataAddtionalContractTerms }: ITypeTwoOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const query = useQueryClient()

  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const [deckActive] = useRecoilState(dataDeckActive)
  const [idTab, setIdTab] = useRecoilState(tabId)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeTwoForm) => {
    let historyData:any = { ...dataAddtionalContractTerms } || {}
    const ACTIVE_VALUE = true
    historyData.typeTwo = {
      isActive: ACTIVE_VALUE
    }

    const payload = {
      projectId: projectId,
      deckId: DECK_ID,
      stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: [],
      data: historyData
    }

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
    setSuccessValueData(value => ({
      ...value,
      typeTwo: articlesOfIncorporation.DONE
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))
    setToggleShowDialog(false)
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeTwo: articlesOfIncorporation.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    let historyData = { ...dataAddtionalContractTerms } || {}

    const payload = {
      projectId: projectId,
      deckId: DECK_ID,
      stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: [],
      data: {
        ...historyData,
        typeTwo: null
      }
    }

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)

    setSuccessValueData(data => ({
      ...data,
      typeTwo: articlesOfIncorporation.PROCESS
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))

    reset({})

  }

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_2, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeTwo: articlesOfIncorporation.INIT
      }))

      setIdTab(value => ({
        ...value,
        status: articlesOfIncorporation.PROCESS
      }))
    }
    )
  }, [])

  return (
    <>
      {
        !Boolean(successValueData.typeTwo === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography cate='body_20' color={home.gray50}>
              사회문제를 해결하는 소셜벤처기업 또는 사회적기업으로 인증을 받기 위해서 필수적으로 갖추어야 하는 정관 규정을
              추가합니다.
            </Typography>
            <Divider />
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography cate='body_30' color={home.gray50}>
                      우선주 : 배당금 우선권을 가진 주식
                      전환우선주 : 보통주로 전환이 가능한 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                      상환우선주 : 상환의 의무가 있는 우선주
                      상환전환우선주 : 보통주 전환과 상환의 의무가 있는 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50} marginTop={convertToRem(20)}>
                      잔여재산분배 우선주 : 기업 청산 시 잔여재산 분배에 우선 혜택이 있는 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                      당장 투자유치 계획이 없더라도 종류주식 발행규정은 법인 설립 초기에 추가해두는 것이 좋습니다.
                    </Typography>
                  </Box>
                }
              />
            </Box>
            <SubmitAccordionButton
              type='submit'
              title='정관에 추가하기'
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '20px'
              }}
            />
          </Box>
        ) : (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(24)}>
            <Typography cate='body_20' color={home.gray50}>
              사회문제를 해결하는 소셜벤처기업 또는 사회적기업으로 인증을 받기 위해서 필수적으로 갖추어야 하는 정관 규정을 추가합니다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              우리 기업의 사회적 가치 정하기
            </Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={convertToRem(20)}>
              <EditButton title={'수정하기'} sx={{ minWidth: '0', width: '134px', background: home.gray200 }} onClick={onEdit} />
              <DeleteButton title='삭제하기' sx={{ minWidth: '0', width: '134px' }} onClick={toggleShowDialog} />
            </Box>
            <DeleteDeck title='작성한 데이터가 삭제됩니다.' description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?' open={showDialog} onCancel={toggleShowDialog} onSubmit={onDelete} />
          </Box>
        )
      }
    </>
  )
}

export default TypeTwoOption
