import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, Typography } from '@/elements'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import { IDataStep02, ITypeTenForm } from '@/types/articies-of-incorporation.type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postStep } from '@/services/step.service'
import { DECK_ID } from '../../../../constant'
import { STEP } from '@/constants/common.constant'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { useRecoilState } from 'recoil'
import { dataDeckActive } from '@/atoms/home/idea'
import { useForm } from 'react-hook-form'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import useToggle from '@/hooks/use-toggle'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { tabId } from '@/atoms/home/partnership-agreement'
import { useEffect } from 'react'
import { listenEvent } from '@/utils/events'

interface ITypeTenOptionProps {
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

const TypeTenOption = ({ dataAddtionalContractTerms }: ITypeTenOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const query = useQueryClient()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [idTab, setIdTab] = useRecoilState(tabId)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeTenForm) => {
    let historyData = dataAddtionalContractTerms || {} as any
    const ACTIVE_VALUE = true
    historyData.typeTen = {
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

    setSuccessValueData(value => ({
      ...value,
      typeTen: articlesOfIncorporation.DONE
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
      typeTen: articlesOfIncorporation.PROCESS

    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    setSuccessValueData(data => ({
      ...data,
      typeTen: articlesOfIncorporation.PROCESS

    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_10, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeTen: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeTen === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography cate='body_20' color={home.gray50}>
              투자유치로 인해 지분이 희석되어 30% 미만으로 떨어진 경영권을 보유한 창업주의 주식에 대하여 보통주보다 더 많은
              의결권을 부여하는 제도로 경영권을 방어하는 수단으로 활용됩니다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              직무발명보상 규정 추가하기
            </Typography>
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography cate='body_30' color={home.gray50} marginBottom={convertToRem(20)}>
                      2023년 11월부터 시행된 제도로 100억 이상의 투자, 마지막투자가 50억 이상을 받은 비상장 벤처기업의 창업주가 대상이 됩니다.
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                      법인 초기에는 제도를 시행할 조건이 되지 않을 뿐더러 투자자들이 해당 조항의 삭제를 요구할 수 있는 바, 설립 초기에는 포함하지 않는 것이 좋습니다.
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
              투자유치로 인해 지분이 희석되어 30% 미만으로 떨어진 경영권을 보유한 창업주의 주식에 대하여 보통주보다 더 많은 의결권을 부여하는 제도로 경영권을 방어하는 수단으로 활용됩니다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              직무발명보상 규정 추가하기
            </Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={convertToRem(20)}>
              <EditButton title={'수정하기'} sx={{ minWidth: '0', width: '134px', background: home.gray200 }} onClick={onEdit} />
              <DeleteButton title='삭제하기' sx={{ minWidth: '0', width: '134px' }} onClick={toggleShowDialog} />
            </Box>
            <DeleteDeck title='작성한 데이터가 삭제됩니다.' description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?' open={showDialog} onCancel={toggleShowDialog} onSubmit={onDelete} />
          </Box >
        )
      }
    </>
  )
}

export default TypeTenOption
