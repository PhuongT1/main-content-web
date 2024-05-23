import { Box, FormControlLabel, useTheme } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, PrimaryPillRadio, Typography } from '@/elements'
import RadioGroupItem from '@/app/(main-routes)/home/competitor-analysis/_components/table_item/radio'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import { IDataStep02, ITypeThreeForm } from '@/types/articies-of-incorporation.type'
import { useRecoilState } from 'recoil'
import { dataDeckActive } from '@/atoms/home/idea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postStep } from '@/services/step.service'
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

interface ITypeThreeOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    socialValueCompany: yup.string().required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeThreeOption = ({ dataAddtionalContractTerms }: ITypeThreeOptionProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { handleSubmit, control, trigger, reset } = useForm(formOptions)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const query = useQueryClient()

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeThreeForm) => {
    let historyData:any = { ...dataAddtionalContractTerms } || {}
    historyData.typeThree = data

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
      typeThree: articlesOfIncorporation.DONE
    }))
    setToggleShowDialog(false)
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeThree: articlesOfIncorporation.PROCESS
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
        typeThree: null
      }
    }

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)

    setSuccessValueData(data => ({
      ...data,
      typeThree: articlesOfIncorporation.PROCESS
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))

    reset({})

  }


  const getDetailTypeThreeOptionFormData = () => {
    const value = {
      socialValueCompany: dataAddtionalContractTerms?.typeThree?.socialValueCompany || '',
    }
    reset(value)
  }

  useEffect(() => {
    getDetailTypeThreeOptionFormData()

  }, [dataAddtionalContractTerms?.typeThree])

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_3, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeThree: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeThree === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography cate='body_20' color={home.gray50}>
              회사의 주식을 나중에 일정한 특정 가격으로 구입할 수 있는 권리를 부여하는 계약으로 발행 규정이 완비되어 있어야
              합니다.
            </Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                우리 기업의 사회적 가치 정하기
              </Typography>
              <RadioGroupItem control={control} name='socialValueCompany'>
                <FormControlLabel
                  value='일반 주식회사 주식매수선택권 규정'
                  control={<PrimaryPillRadio />}
                  label='일반 주식회사 주식매수선택권 규정'
                  sx={{
                    borderColor: '#EA3939'
                  }}
                />
                <FormControlLabel
                  value='벤처기업 특례 적용한 주식매수선택권 규정
            (2023.7월 개정내용 포함)'
                  control={<PrimaryPillRadio />}
                  label='벤처기업 특례 적용한 주식매수선택권 규정 (2023.7월 개정내용 포함)'
                />
              </RadioGroupItem>
            </Box>
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={
                  <Box>
                    <Typography cate='body_30' color={home.gray50} >
                      우선주 : 배당금 우선권을 가진 주식
                      전환우선주 : 보통주로 전환이 가능한 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50} >
                      상환우선주 : 상환의 의무가 있는 우선주
                      상환전환우선주 : 보통주 전환과 상환의 의무가 있는 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50} marginBottom={convertToRem(20)}>
                      잔여재산분배 우선주 : 기업 청산 시 잔여재산 분배에 우선 혜택이 있는 우선주
                    </Typography>
                    <Typography cate='body_30' color={home.gray50} >
                      당장 투자유치 계획이 없더라도 종류주식 발행규정은 법인 설립 초기에 추가해두는 것이 좋습니다.
                    </Typography>
                  </Box>
                } />
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
              회사의 대표이사를 1인으로 두어 이사회에서 자신이 원하지 않는 공동대표 선임을 방지하여 법인의 지배력을 강화하는데 목적이 있다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              임원의 연간보수 한도 정하기
            </Typography>
            <Typography cate='body_20' color={home.gray50}>
              {dataAddtionalContractTerms?.typeThree?.socialValueCompany}
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

export default TypeThreeOption
