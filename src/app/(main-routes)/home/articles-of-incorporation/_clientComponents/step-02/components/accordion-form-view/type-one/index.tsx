import { dataDeckActive } from '@/atoms/home/idea'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import { postStep } from '@/services/step.service'
import { IDataStep02, ITypeOneForm } from '@/types/articies-of-incorporation.type'
import { TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { CREATING_INCLUSIVE_SAFE_RESILIENT_AND_SUSTAINABLE_CITIES_AND_HUMAN_SETTLEMENTS, DETAIL_VALUE, SOCIAL_VALUE_SECTOR } from './constant'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { articlesOfIncorporation, EventArticlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { listenEvent } from '@/utils/events'
import { tabId } from '@/atoms/home/partnership-agreement'
import SelectInput from '@/form/select/select-input'
import { CAPITAL_CONTRIBUTIONS_VALUE, DOMAINS, ENHANCING_FOOD_SECURITY_AND_PROMOTING_SUSTAINABLE_AGRICULTURE, ENSURING_HEALTHY_AND_HAPPY_LIVES, QUALITY_EDUCATION_FOR_ALL, REDUCING_POVERTY_AND_STRENGTHENING_THE_SOCIAL_SAFETY_NET, ENSURING_GENDER_EQUALITY, HEALTHY_AND_SAFE_WATER_MANAGEMENT, ENVIRONMENTALLY_FRIENDLY_PRODUCTION_AND_CONSUMPTION_OF_ENERGY, EXPANDING_GOOD_JOBS_AND_PROMOTING_ECONOMIC_GROWTH, FOSTERING_INDUSTRIAL_GROWTH_AND_INNOVATION_AND_BUILDING_INFRASTRUCTURE, ELIMINATING_ALL_FORMS_OF_INEQUALITY, SUSTAINABLE_PRODUCTION_AND_CONSUMPTION, COMBATING_CLIMATE_CHANGE, CONSERVATION_OF_MARINE_ECOSYSTEMS, CONSERVATION_OF_TERRESTRIAL_ECOSYSTEMS, PEACE_JUSTICE_AND_INCLUSION, STRENGTHENING_GLOBAL_PARTNERSHIPS } from './constant'
interface ITypeOneOptionProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    idea: yup.string().required(''),
    socialValueSector: yup.string().required(''),
    detail: yup.string().required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema),
}


const handleGetListSelectItemValue = (value: string) => {
  switch (value) {
    case DOMAINS.REDUCING_POVERTY_AND_STRENGTHENING_THE_SOCIAL_SAFETY_NET:
      return REDUCING_POVERTY_AND_STRENGTHENING_THE_SOCIAL_SAFETY_NET
    case DOMAINS.ENHANCING_FOOD_SECURITY_AND_PROMOTING_SUSTAINABLE_AGRICULTURE:
      return ENHANCING_FOOD_SECURITY_AND_PROMOTING_SUSTAINABLE_AGRICULTURE
    case DOMAINS.ENSURING_HEALTHY_AND_HAPPY_LIVES:
      return ENSURING_HEALTHY_AND_HAPPY_LIVES
    case DOMAINS.QUALITY_EDUCATION_FOR_ALL:
      return QUALITY_EDUCATION_FOR_ALL
    case DOMAINS.ENSURING_GENDER_EQUALITY:
      return ENSURING_GENDER_EQUALITY
    case DOMAINS.HEALTHY_AND_SAFE_WATER_MANAGEMENT:
      return HEALTHY_AND_SAFE_WATER_MANAGEMENT
    case DOMAINS.ENVIRONMENTALLY_FRIENDLY_PRODUCTION_AND_CONSUMPTION_OF_ENERGY:
      return ENVIRONMENTALLY_FRIENDLY_PRODUCTION_AND_CONSUMPTION_OF_ENERGY
    case DOMAINS.EXPANDING_GOOD_JOBS_AND_PROMOTING_ECONOMIC_GROWTH:
      return EXPANDING_GOOD_JOBS_AND_PROMOTING_ECONOMIC_GROWTH
    case DOMAINS.FOSTERING_INDUSTRIAL_GROWTH_AND_INNOVATION_AND_BUILDING_INFRASTRUCTURE:
      return FOSTERING_INDUSTRIAL_GROWTH_AND_INNOVATION_AND_BUILDING_INFRASTRUCTURE
    case DOMAINS.ELIMINATING_ALL_FORMS_OF_INEQUALITY:
      return ELIMINATING_ALL_FORMS_OF_INEQUALITY
    case DOMAINS.CREATING_INCLUSIVE_SAFE_RESILIENT_AND_SUSTAINABLE_CITIES_AND_HUMAN_SETTLEMENTS:
      return CREATING_INCLUSIVE_SAFE_RESILIENT_AND_SUSTAINABLE_CITIES_AND_HUMAN_SETTLEMENTS
    case DOMAINS.SUSTAINABLE_PRODUCTION_AND_CONSUMPTION:
      return SUSTAINABLE_PRODUCTION_AND_CONSUMPTION
    case DOMAINS.COMBATING_CLIMATE_CHANGE:
      return COMBATING_CLIMATE_CHANGE
    case DOMAINS.CONSERVATION_OF_MARINE_ECOSYSTEMS:
      return CONSERVATION_OF_MARINE_ECOSYSTEMS
    case DOMAINS.CONSERVATION_OF_TERRESTRIAL_ECOSYSTEMS:
      return CONSERVATION_OF_TERRESTRIAL_ECOSYSTEMS
    case DOMAINS.PEACE_JUSTICE_AND_INCLUSION:
      return PEACE_JUSTICE_AND_INCLUSION
    case DOMAINS.STRENGTHENING_GLOBAL_PARTNERSHIPS:
      return STRENGTHENING_GLOBAL_PARTNERSHIPS
    default:
      return []
  }

}

const TypeOneOption = ({ dataAddtionalContractTerms }: ITypeOneOptionProps) => {
  const {
    palette: { home }
  } = useTheme()
  const formProps = useForm(formOptions as any)
  const { handleSubmit, control, trigger, reset, getValues, watch } = formProps
  const [deckActive] = useRecoilState(dataDeckActive)
  const query = useQueryClient()
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      if (data) {
        query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-02'] })
      }
    }
  })

  const onSubmit = (data: ITypeOneForm) => {
    let historyData = { ...dataAddtionalContractTerms } || {} as any
    historyData.typeOne = data

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

    setToggleShowDialog(false)

    setSuccessValueData(value => ({
      ...value,
      typeOne: articlesOfIncorporation.DONE
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.DONE
    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeOne: articlesOfIncorporation.PROCESS
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
        typeOne: null
      }
    }

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)

    setSuccessValueData(data => ({
      ...data,
      typeOne: articlesOfIncorporation.PROCESS
    }))

    setIdTab(value => ({
      ...value,
      status: articlesOfIncorporation.PROCESS
    }))

    reset({})

  }
  const getDetailTypeOneOptionFormData = () => {
    const value = {
      idea: dataAddtionalContractTerms?.typeOne?.idea || '',
      socialValueSector: dataAddtionalContractTerms?.typeOne?.socialValueSector || '',
      detail: dataAddtionalContractTerms?.typeOne?.detail || ''
    }

    reset(value)
  }

  useEffect(() => {

    getDetailTypeOneOptionFormData()

  }, [dataAddtionalContractTerms?.typeOne])

  useEffect(() => {
    listenEvent(EventArticlesOfIncorporation.TAB_1, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeOne: articlesOfIncorporation.INIT
      }))
      setIdTab(value => ({
        ...value,
        status: articlesOfIncorporation.PROCESS
      }))
    }
    )
  }, [])

  return (
    <FormProvider  {...formProps}>
      {
        !Boolean(successValueData.typeOne === articlesOfIncorporation.DONE) ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            gap={convertToRem(24)}
            component={'form'}
            onSubmit={handleSubmit(onSubmit as any)}
          >
            <Typography cate='body_20' color={home.gray50}>
              출자 내용과 지분 비율은 동업자 간의 합의를 통해 정해지며 회사 내에서 지위와 권리를 정하게 됩니다.
            </Typography>
            <Divider sx={{
              background: home.gray200
            }} />
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
              <Typography cate='sub_title_30' color={home.mint500}>
                우리 기업의 사회적 가치 정하기
              </Typography>
              <InputItem
                control={control}
                label='아이디어'
                name={`idea`}
                textFieldProps={{
                  required: true,
                  placeholder: '간략하게 단어 조합 형태로 적어주세요.',
                  inputProps: {
                    maxLength: 50,
                  },
                }}
              />

              <SelectInput
                control={control}
                inputProps={{ placeholder: '직접입력', inputProps: { maxLength: 50 } }}
                textFieldProps={{
                  required: true,
                  placeholder: '선택'
                }}
                paperPropsSx={{
                  '.MuiMenu-list': {
                    backgroundColor: home.gray400,
                    height: 425,
                    '.MuiMenuItem-root': {
                      color: home.gray50,
                      minHeight: '50px'
                    }
                  },
                }}
                menus={{
                  options: DETAIL_VALUE,
                  value: 'value',
                  label: 'value'
                }}
                label='세부 목표'
                name={`detail`}
              />
              <SelectInput
                textFieldProps={{ required: true, placeholder: '선택' }}
                inputProps={{ placeholder: '직접입력', inputProps: { maxLength: 100 } }}
                control={control}
                disabled={!Boolean(watch('detail'))}
                label='사회적 가치 분야'
                menus={{
                  options: handleGetListSelectItemValue(watch('detail') as string),
                  value: 'value',
                  label: 'value'
                }}
                name={`socialValueSector`}
              />
            </Box>
            <Box component={'div'}>
              <TipItemHorizontal
                customSX={{
                  padding: '16px 20px 16px 20px'
                }}
                content={
                  '소셜벤처기업이나 사회적기업의 인증이 필요하지 않은 경우에는 저오간에 추가하지 마세요. 근로자의 경영 참여 및 이익금의 사회환원 등의 의무가 있습니다. '
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
              출자 내용과 지분 비율은 동업자 간의 합의를 통해 정해지며 회사 내에서 지위와 권리를 정하게 됩니다.
            </Typography>
            <Divider />
            <Typography cate='sub_title_30' color={home.mint500}>
              우리 기업의 사회적 가치 정하기
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)} width={convertToRem(250)} sx={{
              overflow: 'hidden !important',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <Typography cate='sub_title_30' color={home.gray50}>
                아이디어
              </Typography>
              <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
                {dataAddtionalContractTerms?.typeOne?.idea}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)} width={convertToRem(250)} sx={{
              overflow: 'hidden !important',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <Typography cate='sub_title_30' color={home.gray50}>
                사회적 가치 분야
              </Typography>
              <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
                {dataAddtionalContractTerms?.typeOne?.socialValueSector}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='sub_title_30' color={home.gray50}>
                세부 목표
              </Typography>
              <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
                {dataAddtionalContractTerms?.typeOne?.detail}
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

    </FormProvider>
  )
}

export default memo(TypeOneOption)
