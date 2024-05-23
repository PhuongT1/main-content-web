import { Box, FormControlLabel, useTheme } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, PrimaryPillRadio, Typography } from '@/elements'
import RadioGroupItem from '@/app/(main-routes)/home/competitor-analysis/_components/table_item/radio'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IDataStep02, ITypeSevenForm } from '@/types/articies-of-incorporation.type'
import { postStep } from '@/services/step.service'
import { DECK_ID } from '../../../../constant'
import { STEP } from '@/constants/common.constant'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { dataDeckActive } from '@/atoms/home/idea'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import useToggle from '@/hooks/use-toggle'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { articlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { tabId } from '@/atoms/home/partnership-agreement'

interface ITypeSevenOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    regulation: yup.string().required()
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeSevenOption = ({ dataAddtionalContractTerms }: ITypeSevenOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const query = useQueryClient()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const { handleSubmit, control, trigger, reset } = useForm(formOptions)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeSevenForm) => {
    let historyData = dataAddtionalContractTerms || {} as any
    historyData.typeSeven = data

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
    setToggleShowDialog(false)
    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
    setSuccessValueData(value => ({
      ...value,
      typeSeven: articlesOfIncorporation.DONE
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeSeven: articlesOfIncorporation.PROCESS
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    setSuccessValueData(data => ({
      ...data,
      typeSeven: articlesOfIncorporation.INIT
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const getDetailTypeSevenOptionFormData = () => {
    const value = {
      regulation: dataAddtionalContractTerms?.typeSeven?.regulation || '',
    }

    reset(value)
  }

  useEffect(() => {
    if (dataAddtionalContractTerms?.typeSeven) {
      getDetailTypeSevenOptionFormData()
    }
  }, [dataAddtionalContractTerms?.typeSeven])

  return (
    <>
      {
        !Boolean(successValueData.typeSeven === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} onSubmit={handleSubmit(onSubmit)} component={'form'}>
            <Typography cate='body_20' color={home.gray50}>
              회사의 대표이사를 1인으로 두어 이사회에서 자신이 원하지 않는 공동대표 선임을 방지하여 법인의 지배력을 강화하는데
              목적이 있다.
            </Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                단독 대표이사 규정 추가하기
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
                      법인의 대표를 단독으로 수행하고 다른 사람의 대표이사 참여를 원하지 않을 경우에 추가합니다.
                    </Typography>
                    <Typography cate='body_30' color={home.gray50}>
                      각자 대표이사의 경우 각자가 단독으로 의사결정이 가능하기 때문에 신속하고 집중화된 업무처리가 가능하다. 반면, 공동대표는 대표 간의 합의가 있어야 하기 때문에 상대적으로 의사결정이 느린 편이지만 안전한 경영이 가능하다.
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
              회사의 대표이사를 1인으로 두어 이사회에서 자신이 원하지 않는 공동대표 선임을 방지하여 법인의 지배력을 강화하는데 목적이 있다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              단독 대표이사 규정 추가하기
            </Typography>
            <Typography cate='body_20' color={home.gray50}>
              {dataAddtionalContractTerms?.typeSeven?.regulation}
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

export default TypeSevenOption
