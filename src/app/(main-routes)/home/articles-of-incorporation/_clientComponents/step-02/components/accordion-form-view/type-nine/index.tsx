import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, Typography } from '@/elements'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeNineForm } from '@/types/articies-of-incorporation.type'
import { DECK_ID } from '../../../../constant'
import { STEP } from '@/constants/common.constant'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { useRecoilState } from 'recoil'
import { dataDeckActive } from '@/atoms/home/idea'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import useToggle from '@/hooks/use-toggle'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { tabId } from '@/atoms/home/partnership-agreement'
import { useEffect } from 'react'
import { listenEvent } from '@/utils/events'

interface ITypeNineOptionProps {
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

const TypeNineOption = ({ dataAddtionalContractTerms }: ITypeNineOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const query = useQueryClient()
  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [deckActive] = useRecoilState(dataDeckActive)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeNineForm) => {
    let historyData = { ...dataAddtionalContractTerms } || {} as any
    const ACTIVE_VALUE = true
    historyData.typeNine = {
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
      typeNine: articlesOfIncorporation.DONE
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
      typeNine: articlesOfIncorporation.PROCESS

    }))
  }

  const onDelete = () => {

    setSuccessValueData(data => ({
      ...data,
      typeNine: articlesOfIncorporation.PROCESS

    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))

  }

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_9, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeNine: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeNine === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography cate='body_20' color={home.gray50}>
              직원들의 창의성과 혁신을 촉진하여 회사의 경쟁 우위를 확보하고 명확한 보상 체계를 구축하기 위하니 규정을
              추가합니다.
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
                      직무발명보상 규정이 없을 경우, 회사에서 중요한 직무발명을 한 구성원이 회사를 나가서 그 직무발명을 사용해도 막을 수 있는 법적인 방법이 없습니다.
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                    직무발명에 대한 보상을 하면 전액 “연구개발비”로 인정되어 스타트업의 경우 25~40% 세액공제를 받을 수 있습니다. 또한, 구성원이 받는 직무발명보상금은 연 500만원까지 비과세 근로소득으로 인정되어 세금이 과세되지 않습니다.
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
              직원들의 창의성과 혁신을 촉진하여 회사의 경쟁 우위를 확보하고 명확한 보상 체계를 구축하기 위하니 규정을 추가합니다.
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

export default TypeNineOption
