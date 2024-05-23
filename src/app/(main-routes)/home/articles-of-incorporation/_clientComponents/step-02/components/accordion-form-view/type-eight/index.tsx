import { dataDeckActive } from '@/atoms/home/idea'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import SelectItem from '@/form/select'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeEightForm } from '@/types/articies-of-incorporation.type'
import { TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { DIRECTOR_COMPENSATION_VALUE, DUTY_VALUE, REPRESENTATIVE_COMPENSATION_VALUE } from './constant'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import useToggle from '@/hooks/use-toggle'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { tabId } from '@/atoms/home/partnership-agreement'
import { listenEvent } from '@/utils/events'

interface ITypeEightOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    representativeCompensation: yup.string().required(''),
    directorCompensation: yup.string().required(''),
    representativePaySeverant: yup.string().required(''),
    directorPaySeverant: yup.string().required(''),
    duty: yup.string().required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeEightOption = ({ dataAddtionalContractTerms }: ITypeEightOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const query = useQueryClient()
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  
  const { handleSubmit, control, trigger, reset, formState: {
    errors
  } } = useForm(formOptions)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if(data){
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeEightForm) => {
    let historyData = { ...dataAddtionalContractTerms } || {}

    // historyData.typeEight = data

    const payload = {
      projectId,
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
      typeEight: articlesOfIncorporation.DONE
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
      typeEight: articlesOfIncorporation.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))
  }

  const onDelete = () => {
    let historyData = { ...dataAddtionalContractTerms } || {}

    const payload = {
      projectId,
      deckId: DECK_ID,
      stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: [],
      data: {
        ...historyData,
        typeEight: null
      }
    }

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)

    setSuccessValueData(data => ({
      ...data,
      typeEight: articlesOfIncorporation.INIT

    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))

    reset({})

  }

  const getDetailTypeEightOptionFormData = () => {
    const value = {
      representativeCompensation: dataAddtionalContractTerms?.typeEight?.representativeCompensation || '',
      directorCompensation: dataAddtionalContractTerms?.typeEight?.directorCompensation,
      representativePaySeverant: dataAddtionalContractTerms?.typeEight?.representativePaySeverant,
      directorPaySeverant: dataAddtionalContractTerms?.typeEight?.directorPaySeverant,
      duty: dataAddtionalContractTerms?.typeEight?.duty,

    }

    reset(value)
  }

  useEffect(() => {
      getDetailTypeEightOptionFormData()
    
  }, [dataAddtionalContractTerms?.typeEight])

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_8, () => {
        reset()
        setSuccessValueData(value => ({
          ...value,
          typeEight: articlesOfIncorporation.INIT
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
        !Boolean(successValueData.typeEight === articlesOfIncorporation.DONE) ? (
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={convertToRem(24)} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography cate='body_20' color={home.gray50}>
              회사의 대표이사를 1인으로 두어 이사회에서 자신이 원하지 않는 공동대표 선임을 방지하여 법인의 지배력을 강화하는데
              목적이 있다.
            </Typography>
            <Divider />
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                임원의 연간보수 한도 정하기
              </Typography>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='대표자'
                name={`representativeCompensation`}
              >
                {REPRESENTATIVE_COMPENSATION_VALUE.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='이사 및 감사'
                name={`directorCompensation`}
              >
                {DIRECTOR_COMPENSATION_VALUE.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                임원의 퇴직금 한도 정하기
              </Typography>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='대표자'
                name={`representativePaySeverant`}
              >
                {REPRESENTATIVE_COMPENSATION_VALUE.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='이사 및 감사'
                name={`directorPaySeverant`}
              >
                {DIRECTOR_COMPENSATION_VALUE.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                임원의 유족보상금 지급 한도 정하기
              </Typography>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='업무상 순직'
                name={`duty`}
              >
                {DUTY_VALUE.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Box>
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={`해당 규정의 적용 대상은 등기임원으로 회사의 경영에 실질적으로 참여하는 인원을 대상으로 한다. 명칭이 전무이사, 이사, 감사, 부사장이더라도 실질적 업무 집행권이 없고 인사노무관리 등 회사경영책임이 없으며, 사용자의 종속적 관계에서 임금을 목적으로 근로를 제공하는 자는 해당 규정을 적용하지 않고 근로기준법에 따른다.`}
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
              임원의 연간보수 한도 정하기
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='body_3_semibold' color={home.gray0}>
                대표자
              </Typography>
              <Typography cate='body_20' color={home.gray50}>
                {dataAddtionalContractTerms?.typeEight?.representativeCompensation}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='body_3_semibold' color={home.gray0}>
                이사 및 감사
              </Typography>
              <Typography cate='body_20' color={home.gray50}>
                {dataAddtionalContractTerms?.typeEight?.directorCompensation}
              </Typography>
            </Box>
            <Typography cate='sub_title_30' color={home.mint500}>
              임원의 퇴직금 한도 정하기
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='body_3_semibold' color={home.gray0}>
                대표자
              </Typography>
              <Typography cate='body_20' color={home.gray50}>
                {dataAddtionalContractTerms?.typeEight?.representativePaySeverant}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='body_3_semibold' color={home.gray0}>
                이사 및 감사
              </Typography>
              <Typography cate='body_20' color={home.gray50}>
                {dataAddtionalContractTerms?.typeEight?.directorPaySeverant}
              </Typography>
            </Box>
            <Typography cate='sub_title_30' color={home.mint500}>
              임원의 유족보상금 지급 한도 정하기
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='body_3_semibold' color={home.gray0}>
                업무상 순직
              </Typography>
              <Typography cate='body_20' color={home.gray50}>
                {dataAddtionalContractTerms?.typeEight?.duty}
              </Typography>
            </Box>
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
export default memo(TypeEightOption)
