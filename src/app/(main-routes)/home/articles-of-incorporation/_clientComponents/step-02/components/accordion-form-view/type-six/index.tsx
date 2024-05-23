import { Box, FormControlLabel, useTheme } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, PrimaryPillRadio, Typography } from '@/elements'
import RadioGroupItem from '@/app/(main-routes)/home/competitor-analysis/_components/table_item/radio'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import { useRecoilState } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeSixForm } from '@/types/articies-of-incorporation.type'
import { dataDeckActive } from '@/atoms/home/idea'
import { DECK_ID } from '../../../../constant'
import { STEP } from '@/constants/common.constant'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { useEffect } from 'react'
import useToggle from '@/hooks/use-toggle'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { listenEvent } from '@/utils/events'
import { tabId } from '@/atoms/home/partnership-agreement'

interface ITypeSixOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    regulation: yup.string().required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeSixOption = ({ dataAddtionalContractTerms }: ITypeSixOptionProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [deckActive] = useRecoilState(dataDeckActive)
  const query = useQueryClient()
  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const [idTab, setIdTab] = useRecoilState(tabId)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeSixForm) => {
    let historyData = dataAddtionalContractTerms || {} as any
    historyData.typeSix = data

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
      typeSix: articlesOfIncorporation.DONE
    }))
    setToggleShowDialog(false)
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)

  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeSix: articlesOfIncorporation.PROCESS

    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    setSuccessValueData(data => ({
      ...data,
      typeSix: articlesOfIncorporation.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const getDetailTypeSixOptionFormData = () => {
    const value = {
      regulation: dataAddtionalContractTerms?.typeSix?.regulation || '',
    }

    reset(value)
  }

  useEffect(() => {

    getDetailTypeSixOptionFormData()

  }, [dataAddtionalContractTerms?.typeSix])

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_6, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeSix: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeSix === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} onSubmit={handleSubmit(onSubmit)} component={'form'}>
            <Typography cate='body_20' color={home.gray50}>
              자본금이 10억원 미만인 경우 주주총회의 소집절차 및 이사회 구성 등 간소화하거나 생략할 수 있는 특례규정을 추가할
              수 있습니다.
            </Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                배당규정 추가하기
              </Typography>
              <RadioGroupItem control={control} name='regulation'>
                <FormControlLabel
                  value='중간배당'
                  control={<PrimaryPillRadio />}
                  label='중간배당'
                  sx={{
                    borderColor: '#EA3939'
                  }}
                />
                <FormControlLabel value='차등배당' control={<PrimaryPillRadio />} label='차등배당' />
              </RadioGroupItem>
            </Box>
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
              배당규정 추가하기
            </Typography>
            <Typography cate='body_20' color={home.gray50}>
              {dataAddtionalContractTerms?.typeSix?.regulation}
            </Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={convertToRem(20)}>
              <EditButton title={'수정하기'} sx={{ minWidth: '0', width: '134px', background: home.gray200 }} onClick={onEdit} />
              <DeleteButton title='삭제하기' sx={{ minWidth: '0', width: '134px' }} onClick={toggleShowDialog} />
            </Box>
            <DeleteDeck title='작성한 데이터가 삭제됩니다.' description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?' open={showDialog} onCancel={toggleShowDialog} onSubmit={onDelete} />
          </Box>
        )}
    </>
  )
}

export default TypeSixOption
