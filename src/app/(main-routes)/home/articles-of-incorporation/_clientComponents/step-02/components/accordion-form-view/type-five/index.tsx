import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { dataDeckActive } from '@/atoms/home/idea'
import { tabId } from '@/atoms/home/partnership-agreement'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { STEP } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeFiveForm } from '@/types/articies-of-incorporation.type'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'

interface ITypeFiveOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    isActive: yup.boolean()
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeFiveOption = ({ dataAddtionalContractTerms }: ITypeFiveOptionProps) => {
  const {
    palette: { home }
  } = useTheme()

  const query = useQueryClient()

  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeFiveForm) => {
    let historyData = dataAddtionalContractTerms || {}
    const ACTIVE_VALUE = true
    // historyData.typeFive = {
    //   isActive: ACTIVE_VALUE
    // }

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

    setSuccessValueData(value => ({
      ...value,
      typeFive: articlesOfIncorporation.DONE
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))
    setToggleShowDialog(false)
    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeFive: articlesOfIncorporation.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    setSuccessValueData(data => ({
      ...data,
      typeFive: articlesOfIncorporation.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_5, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeFive: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeFive === articlesOfIncorporation.DONE) ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            gap={convertToRem(24)}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography cate='body_20' color={home.gray50}>
              자본금이 10억원 미만인 경우 주주총회의 소집절차 및 이사회 구성 등 간소화하거나 생략할 수 있는 특례규정을 추가할
              수 있습니다.
            </Typography>
            <Divider />
            <Typography cate='body_30' color={home.mint500}>
              스타트업 특례규정 추가하기
            </Typography>
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography cate='body_30' color={home.gray50} marginBottom={convertToRem(20)}>
                      정관은 공증을 받아야 하지만 자본금 10억 미만의 스타트업은 발기인이 정관에 기명날인 또는 서명함으로써 정관의 효력이 발생해 설립비용 부담이 줄고 절차가 간소화됩니다.
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                      자본금 10억 미만의 회사는 정관에 명시된 1주의 액면가에 법인설립시 발행한 주식의 총수를 곱한 금액이 10억 미만인 회사를 말합니다.
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
              자본금이 10억원 미만인 경우 주주총회의 소집절차 및 이사회 구성 등 간소화하거나 생략할 수 있는 특례규정을 추가할 수 있습니다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              스타트업 특례규정 추가하기
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

export default TypeFiveOption
