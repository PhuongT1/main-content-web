'use client'
import DeleteIcon from '@/assets/icons/partnership-agreement/delete-icon'
import { dataStep1Atom, projectIdArticleOfIncorporation } from '@/atoms/home/articles-of-incorporation'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { Alert as AlertDialog } from '@/components/dialog'
import { AddButton, RefreshButton, SubmitButton } from '@/components/home/button'
import TipItem from '@/components/home/tip-item'
import InputNumberWithText from '@/components/input/input-number-with-text'
import { STEP } from '@/constants/common.constant'
import { BaseChip, Divider, Typography } from '@/elements'
import Alert from '@/elements/alert'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import SelectInput from '@/form/select/select-input'
import useToggle from '@/hooks/use-toggle'
import DatePicker from '@/libs/datepicker/DatePicker'
import { postStep } from '@/services/step.service'
import { IAriticiesOfIncorporationStep1 } from '@/types/articies-of-incorporation.type'
import { TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { memo, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'
import BusinessPurpose from '../components/business-purpose'
import { DECK_ID } from '../constant'
import {
  AMOUNT_PER_SHARE_TYPES,
  BUSAN_METROPOLITAN_CITY,
  BUSINESS_ENGLISH_NAME_TYPES,
  BUSINESS_KOREAN_NAME_TYPES,
  DAEGU_METROPOLITAN_CITY,
  DATA_CEO_ONE,
  DATA_CEO_TWO,
  FINANCIAL_STATEMENT_TYPES,
  GWANGJU_METROPOLITAN_CITY,
  LOCATION_TYPES,
  PROMOTER_OR_NOT,
  SEOUL_SPECIAL_CITY,
  SHARE_CAPITAL_TYPES,
  SPOT_TYPES,
  ULSAN_METROPOLITAN_CITY,
  INCHEON_METROPOLITAN_CITY,
  MEDIA,
  JEJU_SPECIAL_SELF_GOVERNING_PROVINCE,
  GIMHAE_CITY,
  ANDONG_CITY,
  ANSAN_CITY,
  SUWON_CITY,
  JEONJU_CITY,
  JINJU_CITY,
  CHANGWON_SPECIAL_SELF_GOVERNING_CITY,
  CHUNCHEON_CITY,
  CHEONGJU_CITY,
  ANNOUNCENMENT_AREA,
  DAEJEON_METROPOLITAN_CITY
} from './constant'
import { formatNumberWithText, parseNumber } from '@/utils/string'


const defaultValues = {
  data: [
    {
      name: '',
      birthdate: '',
      contact: '',
      position: '',
      status: '',
      address: '',
      numberContributedShares: '',
      investmentAmount: ''
    }
  ],
  businessNameType: '',
  businessName: '',
  translationBusinessNameType: '',
  translationBusinessName: '',
  headquartersLocation: '',
  detailedAddress: '',
  companyContactInformation: '',
  companyEstablishmentDate: '',
  totalNumberShares: '',
  capital: '',
  pricePerShare: '',
  numberIssuedShares: '',
  publicationArea: '',
  media: '',
  companyWebsite: '',
  organization: []
}

interface IBasicInformationArticiesOfIncorporationEditProps {
  dataStep1: IAriticiesOfIncorporationStep1
}

export const schema = yup
  .object()
  .shape({
    data: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(''),
          birthdate: yup.string(),
          contact: yup.mixed(),
          position: yup.string().required(''),
          status: yup.string().required(''),
          address: yup.string(),
          numberContributedShares: yup.string().required(),
          investmentAmount: yup.string()
        })
      )
      .required(),
    businessNameType: yup.string().required(''),
    businessName: yup.string(),
    translationBusinessNameType: yup.string(),
    translationBusinessName: yup.string(),
    headquartersLocation: yup.string().required(''),
    detailedAddress: yup.string(),
    companyContactInformation: yup.string(),
    companyEstablishmentDate: yup.string().required(''),
    totalNumberShares: yup.string().required(''),
    capital: yup.string().required(''),
    pricePerShare: yup.string().required(''),
    numberIssuedShares: yup.string().required(''),
    publicationArea: yup.string().required(''),
    media: yup.string().required(''),
    companyWebsite: yup.string(),
    financialStatement: yup.string().required(''),
    organization: yup.array()
  })
  .required()

const handleGetListSelectItemValue = (value: string) => {
  switch (value) {
    case MEDIA.SEOUL_SPECIAL_CITY:
      return SEOUL_SPECIAL_CITY
    case MEDIA.GWANGJU_METROPOLITAN_CITY:
      return GWANGJU_METROPOLITAN_CITY
    case MEDIA.DAEGU_METROPOLITAN_CITY:
      return DAEGU_METROPOLITAN_CITY
    case MEDIA.BUSAN_METROPOLITAN_CITY:
      return BUSAN_METROPOLITAN_CITY
    case MEDIA.ULSAN_METROPOLITAN_CITY:
      return ULSAN_METROPOLITAN_CITY
    case MEDIA.INCHEON_METROPOLITAN_CITY:
      return INCHEON_METROPOLITAN_CITY
    case MEDIA.JEJU_SPECIAL_SELF_GOVERNING_PROVINCE:
      return JEJU_SPECIAL_SELF_GOVERNING_PROVINCE
    case MEDIA.GIMHAE_CITY:
      return GIMHAE_CITY
    case MEDIA.SUWON_CITY:
      return SUWON_CITY
    case MEDIA.ANDONG_CITY:
      return ANDONG_CITY
    case MEDIA.ANSAN_CITY:
      return ANSAN_CITY
    case MEDIA.JEONJU_CITY:
      return JEONJU_CITY
    case MEDIA.JINJU_CITY:
      return JINJU_CITY
    case MEDIA.CHANGWON_SPECIAL_SELF_GOVERNING_CITY:
      return CHANGWON_SPECIAL_SELF_GOVERNING_CITY
    case MEDIA.CHEONGJU_CITY:
      return CHEONGJU_CITY
    case MEDIA.CHUNCHEON_CITY:
      return CHUNCHEON_CITY
    case MEDIA.DAEJEON_METROPOLITAN_CITY:
      return DAEJEON_METROPOLITAN_CITY
    default:
      return []
  }

}

const BasicInformationArticiesOfIncorporationEdit = ({ dataStep1 }: IBasicInformationArticiesOfIncorporationEditProps) => {
  const [total, setTotal] = useState([
    {
      init: 'init',
      id: '1'
    },
    {
      init: 'init',
      id: '2'
    }
  ])
  const [message, setMessageError] = useState<string>('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const query = useQueryClient()
  const [dataBasicInformationArticiesOfIncorporationEdit, setDataBasicInformationArticiesOfIncorporationEdit] = useRecoilState(dataStep1Atom)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
 

  const {
    palette: { home, main }
  } = useTheme()

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all'
  }

  const formProps = useForm(formOptions as any)

  const {
    getValues,
    setValue,
    handleSubmit,
    watch,
    setError,
    control,
    trigger,
    reset,
    formState: { errors, isSubmitted }
  } = formProps

  const capitalValue = watch('capital')
  const pricePerShare = watch('pricePerShare')

  const handleCompleteStep = async () => {
    setCompleteStep((prev) => {
      if (!prev.includes(STEP.STEP_ONE)) {
        return [STEP.STEP_ONE]
      }
      return prev
    })
    setActiveStep((pre) => pre + 1)
  }

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      handleCompleteStep()
      query.invalidateQueries({ queryKey: ['articles-of-incorporation-step-1'] })
      setDataBasicInformationArticiesOfIncorporationEdit(data)
    }
  })

  const onSubmit = (data: IAriticiesOfIncorporationStep1) => {
    const newData = total.map((e, index) => ({
      ...data.data[index],
      id: e?.id
    }));

    const payload = {
      projectId: projectId,
      deckId: DECK_ID,
      stepId: 1,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_ONE,
      deletedStepActivitiesIds: [],
      data: {
        ...data,
        data: newData
      }
    }
    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
  }

  const handleAddForm = async () => {
    let totalForm = Array.from(total) || []
    const id = uuidv4()
    const isValid = await trigger(`data`)

    if (isValid && total?.length < 10) {
      totalForm.push({
        init: 'init',
        id: id
      })

      setTotal(totalForm)
    }

    if (totalForm?.length === 10) {
      setShowErrorMessage(true)
    }
  }

  const handleResetValue = () => {
    const value = {
      businessNameType: '',
      businessName: '',
      translationBusinessNameType: '',
      translationBusinessName: '',
      headquartersLocation: '',
      detailedAddress: '',
      companyContactInformation: '',
      companyEstablishmentDate: '',
      totalNumberShares: '',
      capital: '',
      pricePerShare: '',
      numberIssuedShares: '',
      publicationArea: '',
      media: '',
      companyWebsite: '',
      financialStatement: '',
      organization: [],
      data:
        dataStep1?.data?.map((item) => ({
          name: '',
          birthdate: '',
          contact: '',
          position: '',
          status: '',
          address: '',
          numberContributedShares: '',
          investmentAmount: ''
        })) || []
    }

    reset(value)
  }

  const getBasicInformationArticiesOfIncorporationEditDetail = () => {
    const value = {
      businessNameType: dataStep1?.businessNameType || '',
      businessName: dataStep1?.businessName || '',
      translationBusinessNameType: dataStep1?.translationBusinessNameType || '',
      translationBusinessName: dataStep1?.translationBusinessName || '',
      headquartersLocation: dataStep1?.headquartersLocation || '',
      detailedAddress: dataStep1?.detailedAddress || '',
      companyContactInformation: dataStep1?.companyContactInformation,
      companyEstablishmentDate: dataStep1?.companyEstablishmentDate,
      totalNumberShares: dataStep1?.totalNumberShares,
      capital: dataStep1?.capital,
      pricePerShare: dataStep1?.pricePerShare,
      financialStatement: dataStep1?.financialStatement,
      numberIssuedShares: dataStep1?.numberIssuedShares,
      publicationArea: dataStep1?.publicationArea,
      media: dataStep1?.media,
      companyWebsite: dataStep1?.companyWebsite,
      organization: dataStep1?.organization,
      data:
        dataStep1?.data?.map((item) => ({
          name: item.name || '',
          birthdate: item?.birthdate || '',
          contact: item.contact || '',
          address: item.address || '',
          status: item.status,
          position: item.position,
          numberContributedShares: item.numberContributedShares,
          investmentAmount: item.investmentAmount
        })) || []
    }
    reset(value, { keepDefaultValues: true })
  }

  const handleDeleteColumn = (id: string, index: number) => {
    let totalValue = [...total]
    const dataCurrent = { ...getValues() || {} }
    if (totalValue.length > 2) {
      const totalRemoved = totalValue.filter((e, index1) => e?.id !== id)
      const dataRemoved = dataCurrent?.data?.filter((e: any, index1: number) => index1 !== index)
      setValue(`data`, dataRemoved)
      setTotal(totalRemoved)
    }
  }

  useEffect(() => {
    if (dataStep1?.data) {
      getBasicInformationArticiesOfIncorporationEditDetail()
      const newTotalForm = dataStep1?.data?.map((e, index) => ({
        init: 'init',
        id: e.id
      }))

      setTotal(newTotalForm)
    }
  }, [dataStep1, completeStep])

  useEffect(() => {
    setValue(`data.0.position`, DATA_CEO_ONE.SPOT)
    setValue(`data.0.status`, DATA_CEO_ONE.PROMOTER_OR_NOT)
    setValue(`data.0.investmentAmount`, DATA_CEO_ONE.INVESTMENT_AMOUNT)
    setValue(`data.1.position`, DATA_CEO_TWO.SPOT)
    setValue(`data.1.status`, DATA_CEO_TWO.PROMOTER_OR_NOT)
    setValue(`data.1.investmentAmount`, DATA_CEO_TWO.INVESTMENT_AMOUNT)
    setValue(`data.1.numberContributedShares`, DATA_CEO_TWO.NUMBER_OF_SHARES_INVESTED)
  }, [dataStep1, getValues('data')])
  
  useEffect(() => {
    if (capitalValue && pricePerShare) {
      const value = Number(((capitalValue?.replace(/,+/g, '').match(/[\d.]+/)
    ))[0]) / Number(pricePerShare?.replace(/,+/g, '').match(/[\d.]+/)[0])
      setValue(`numberIssuedShares`, formatNumberWithText(value, '주'))
    }
  }, [capitalValue, pricePerShare])

  return (
    <FormProvider  {...formProps}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={convertToRem(60)}
        marginTop={convertToRem(32)}
        component={'form'}
        onSubmit={handleSubmit(onSubmit as any)}
      >
        <Box component={'div'}>
          <Box component={'div'} display={'flex'} flexDirection={'column'} gap={convertToRem(10)} marginBottom={convertToRem(20)}>
            <Typography cate='title_4_semibold' color={home.gray50}>
              우리 기업의 사회적 가치 정하기
            </Typography>
            <Typography cate='body_3' color={home.gray100}>
              법인 설립을 진행할 회사의 기본 정보를 입력해주세요.
            </Typography>
          </Box>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='한글 상호명 유형'
                name='businessNameType'
              >
                {BUSINESS_KOREAN_NAME_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'1 0 0'}>
              <InputItem
                control={control}
                label='한글 상호명'
                name='businessName'
                textFieldProps={{
                  placeholder: '한글 상호명 입력',
                  inputProps: {
                    maxLength: 30
                  },
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ placeholder: '선택' }}
                control={control}
                label='영문 상호명 유형'
                name='translationBusinessNameType'
              >
                {BUSINESS_ENGLISH_NAME_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'1 0 0'}>
              <InputItem
                control={control}
                label='영문 상호명'
                name='translationBusinessName'
                textFieldProps={{
                  placeholder: '영문 상호명 입력',
                  inputProps: {
                    maxLength: 50
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='본점 소재지'
                name='headquartersLocation'
              >
                {LOCATION_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'1 0 0'}>
              <InputItem
                control={control}
                label='상세 주소'
                name='detailedAddress'
                textFieldProps={{
                  placeholder: '상세 주소 입력',
                  inputProps: {
                    maxLength: 100
                  },
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <InputItem
                regex={/^([0-9]*[-]*){1,15}$/}
                control={control}
                label='회사 연락처'
                name='companyContactInformation'
                textFieldProps={{
                  placeholder: '연락처 입력',
                  inputProps: {
                    maxLength: 20,
                  },
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <DatePicker
                error={!Boolean(watch(`companyEstablishmentDate`)) && isSubmitted}
                value={
                  !!dataStep1?.companyEstablishmentDate
                    ? moment(dataStep1?.companyEstablishmentDate).format('YYYY-MM-DD')
                    : ''
                }
                placeholder='선택'
                labelProps={{
                  label: '회사 설립(예정)일',
                  required: true
                }}
                style={{
                  color: Boolean(watch(`companyEstablishmentDate`)) ? home.gray50 : main.gray30,
                  border: `1px solid ${home.gray200}`,
                }}
                onDateChange={(date: Date) => {
                  setValue(`companyEstablishmentDate`, date as Date)
                }}
              />
            </Grid>
          </Grid>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'1 0 0'}>
              <InputNumberWithText
                form={formProps}
                placeholder='선택'
                unitText={'주'}
                label='회사가 앞으로 발행할 주식의 총수'
                name='totalNumberShares'
                textFieldProps={{

                  required: true,

                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectInput
                unitText={'원'}
                inputProps={{
                  placeholder: '직접 입력',

                }}
                control={control}
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
                  options: SHARE_CAPITAL_TYPES,
                  value: 'value',
                  label: 'label'
                }}
                label='자본금'
                name='capital'
              >
                {SHARE_CAPITAL_TYPES.map((val: any) => (
                  <MenuItem key={val.id} value={val.value} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                    <Typography cate='title_4_chip_small' color={home.gray50}>
                      {val.value}
                    </Typography>
                    <Typography cate='caption_2' color={home.gray100}>
                      {val.note}
                    </Typography>
                  </MenuItem>
                ))}
              </SelectInput>

            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='1주의 금액'
                name='pricePerShare'
              >
                {AMOUNT_PER_SHARE_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <InputItem
                control={control}
                label='발행주식 수'
                name='numberIssuedShares'
                textFieldProps={{
                  placeholder: '자동 계산',
                  required: true,
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='결산기준일'
                name='financialStatement'
              >
                {FINANCIAL_STATEMENT_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
          </Grid>
          <Box component={'div'} marginBottom={convertToRem(20)}>
            <TipItem
              content={
                <>
                  영문 상호명은 필수 입력 사항이 아닙니다. 한글 상호와 함께 영문을 표기하고 싶을 경우에 작성합니다. 참고로
                  상호에는 주식회사가 뒤로 가는 편이 좋습니다. 법인통장 개설 시 주식회사가 먼저 나오게 되면서 회사명이
                  잘리게 될 수 있습니다.
                </>
              }
            />
          </Box>
          <Box component={'div'} marginBottom={convertToRem(20)}>
            <TipItem
              content={
                <>
                  발행 주식의 총수에는 제한이 없으나 너무 적게 설정하면 추가 발행시 정관 변경을 해야하기 때문에 넉넉하게
                  설정하는 것이 좋습니다. 보통 1천만주에서 1억주로 설정합니다.
                </>
              }
            />
          </Box>
          <Box component={'div'}>
            <TipItem
              content={
                <>결산기준은 1년간의 사업을 마무리하는 마지막 달 입니다. 일반적으로 12월 말일을 결산기로 설정합니다.</>
              }
            />
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
          <Box component={'div'}>
            <Box component={'div'} display={'flex'} alignItems={'center'} marginBottom={convertToRem(20)}>
              <Box component={'h2'} sx={{ color: home.gray50 }}>
                대표자 및 법인설립 구성원
              </Box>
            </Box>
            <Typography sx={{ mb: convertToRem('30px'), color: home.gray100 }}>
              법인 설립에 참여하는 구성원의 정보를 입력해주세요.
            </Typography>
          </Box>
          <Box component={'div'}>
            {total.map((e, index) => {
              return (
                <Box
                  component={'div'}
                  key={`total + ${index}`}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={convertToRem(10)}
                  marginBottom={convertToRem(20)}
                >
                  <Box
                    component={'div'}
                    display={'flex'}
                    gap={convertToRem(8)}
                    flexDirection={'row'}
                    alignItems={'center'}
                  >
                    <Typography sx={{ color: home.gray50 }} fontSize={convertToRem(16)} fontWeight={600} lineHeight={1.5}>
                      구성원 {index + 1}
                    </Typography>
                    {(index === 0 || index === 1) &&
                      <BaseChip
                        sx={{
                          backgroundColor:home.gray400
                        }}
                        label={
                          <Typography cate='mandatory_10' color={home.gray100}>
                            필수
                          </Typography>
                        }
                      />
                    }
                  </Box>
                  <Grid container gap={'20px'}>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='이름'
                        name={`data.${index}.name`}
                        textFieldProps={{
                          placeholder: '선택',
                          required: true
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <DatePicker
                        value={
                          !!dataStep1?.data[index]?.birthdate
                            ? moment(dataStep1?.data[index]?.birthdate).format('YYYY.MM.DD')
                            : ''
                        }
                        placeholder='선택'
                        labelProps={{
                          label: '생년월일',
                        }}
                        style={{
                          color: Boolean(watch(`data.${index}.birthdate`)) ? home.gray50 : main.gray30,
                          border: `1px solid ${home.gray200}`,
                        }}
                        onDateChange={(date: Date) => {
                          setValue(`data.${index}.birthdate`, date as any)
                        }}
                      />
                    </Grid>
                    <Grid item flex={'1 0 0'}>
                      <InputItem
                        control={control}
                        regex={/^([0-9]*[-]*){1,15}$/}
                        label='연락처'
                        name={`data.${index}.contact`}
                        textFieldProps={{
                          placeholder: '연락처 입력'
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <SelectItem
                        textFieldProps={{
                          required: true, placeholder: '선택', InputProps: {
                            readOnly: (index === 0 || index === 1) ? true : false
                          }
                        }}
                        control={control}
                        label='직위'
                        name={`data.${index}.position`}
                      >
                        {SPOT_TYPES.map((e: TValueSelect, index: number) => (
                          <MenuItem key={index} value={e?.value}>
                            {e?.label}
                          </MenuItem>
                        ))}
                      </SelectItem>
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <Box display={'flex'} flexDirection={'row'} gap={'20px'}>
                        <SelectItem
                          textFieldProps={{
                            required: true, placeholder: '선택', InputProps: {
                              readOnly: (index === 0 || index === 1) ? true : false
                            }
                          }}
                          control={control}
                          label='발기인 여부'
                          name={`data.${index}.status`}
                        >
                          {PROMOTER_OR_NOT.map((e: TValueSelect, index: number) => (
                            <MenuItem key={index} value={e?.value}>
                              {e?.label}
                            </MenuItem>
                          ))}
                        </SelectItem>
                        <Box sx={{
                          cursor: 'pointer',
                          opacity: total?.length > 2 ? 1 : 0.5,
                          display: 'flex',
                          alignItems: 'end',
                          marginBottom: '12px'

                        }}>
                          <DeleteIcon onClick={() => handleDeleteColumn(e.id, index)} fill={home.gray300} stroke={home.gray50} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container gap={'20px'}>
                    <Grid item flex={'1 0 0'}>
                      <InputItem
                        control={control}
                        label='주소'
                        name={`data.${index}.address`}
                        textFieldProps={{
                          placeholder: '주소 입력'
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <InputNumberWithText
                        unitText={'주'}
                        form={formProps}
                        placeholder='주식 수 입력'
                        label='출자 주식 수'
                        name={`data.${index}.numberContributedShares`}
                        handleChangeInput={() => {
                          if (watch(`pricePerShare`) && watch(`data.${index}.numberContributedShares`) && (index !== 1 && index !== 0)) {
                            const value = Number(watch(`pricePerShare`)?.split('원')[0]) * watch(`data.${index}.numberContributedShares`)
                            setValue(`data.${index}.investmentAmount`, formatNumberWithText(value, '원'))
                          }
                        }}
                        textFieldProps={{

                          required: true,
                          InputProps: {
                            readOnly: index === 1 ? true : false
                          }
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='출자 금액'
                        name={`data.${index}.investmentAmount`}
                        textFieldProps={{
                          placeholder: '자동 계산',
                          InputProps: {
                            readOnly: true
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )
            })}
          </Box>
          <Box component={'div'}>
            <TipItem
              content={
                <>
                  대표이사와 지분이 없는 사내이사는 법인 설립을 위한 필수 구성원입니다. 법인설립을 위해서는 설립의 경과를
                  담은 조사보고서를 작성한 뒤 ‘조사보고절차’를 거쳐야 합니다. 대표이사가 조사보고자로 등록될 수 없습니다.
                  따라서 해당 업무를 위해 대표이사가 아닌 다른 법인 구성원이 필요하게 됩니다. 해당 구성원은 법인 설립이
                  완료된 이후에는 사임등기를 통해 회사의 구성원에서 바로 나올 수 있습니다.
                </>
              }
            />
          </Box>
          <Divider />
          <Box display={'flex'} justifyContent={'center'}>
            <AddButton
              hidden={false}
              disabled={false}
              title='구성원 추가'
              onClick={handleAddForm}
              sx={{
                width: '160px'
              }}
            />
          </Box>
        </Box>
        {
          <Alert setIsError={setShowErrorMessage} key={`${showErrorMessage}`}
            isOpen={showErrorMessage} sx={{ background: home.alpha_red_10, color: home.gray50 }} severity='error'>
            구성원은 최대 10명까지 작성 가능합니다.
          </Alert>
        }

        <Box component={'div'} display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
          <BusinessPurpose formProps={formProps} />
          <Box component={'div'}>
            <TipItem
              content={
                <>
                  회사의 사업 목적은 다양하게 추가해놓는 것이 좋습니다. 사업자등록증에 들어가는 사업과는 다르게 법인정관에
                  들어가는 사업목적을 바꾸거나 추가하기 위해서는 정관 변경을 해야하는데 시간과 돈이 들어가게 됩니다.
                  미래에 진행할 사업을 고려해서 사업목적을 추가해두세요.
                </>
              }
            />
          </Box>
          <Box component={'div'}>
            <TipItem
              content={<>법인 설립 시 사업목적을 20개를 초과해서 추가하게 되면 등기 시 추가 비용이 발생하게 됩니다.</>}
            />
          </Box>
        </Box>
        <Box component={'div'}>
          <Box component={'div'} display={'flex'} alignItems={'center'} marginBottom={convertToRem(20)}>
            <Box component={'h2'} sx={{ color: home.gray50 }}>
              공고방법
            </Box>
          </Box>
          <Typography sx={{ mb: convertToRem('20px'), color: home.gray100 }}>
            회사의 공고 사항을 전달하는 방법을 정해보세요.
          </Typography>
          <Grid container gap={'20px'}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                label='공고 발행지역'
                name='publicationArea'
              >
                {ANNOUNCENMENT_AREA.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{ required: true, placeholder: '선택' }}
                control={control}
                disabled={!Boolean(watch('publicationArea'))}
                label='사회적 가치 분야'
                name={`media`}
              >
                {handleGetListSelectItemValue(watch('publicationArea') as string).map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>

            </Grid>
            <Grid item flex={'1 0 0'}>
              <InputItem
                control={control}
                label='회사 홈페이지'
                name='companyWebsite'
                textFieldProps={{
                  placeholder: '홈페이지 주소 입력',
                  inputProps: {
                    maxLength: 20,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box component={'div'} marginTop={convertToRem(20)}>
            <TipItem
              notExpand={true}
              content={
                <>
                  회사 홈페이지 주소를 입력하면 공고를 회사 홈페이지에 간단히 게시하며 신문 등 다른 매체를 사용하지 않고
                  공고를 완료할 수 있습니다.
                </>
              }
            />
          </Box>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
          <AlertDialog
            description='삭제된 데이터는 복구되지 않습니다, 초기화 하시겠습니까?'
            title='입력된 데이터가 삭제됩니다'
            open={showDialog}
            onCancel={() => setToggleShowDialog(false)}
            onSubmit={() => {
              setToggleShowDialog(false)
              handleResetValue()
            }}
          />
          <RefreshButton onClick={() => setToggleShowDialog(true)} />
          <SubmitButton
            type='submit'
            sx={{
              backgroundColor: home.blue500
            }}
          />
        </Box>
      </Box>
    </FormProvider>
  )
}

export default memo(BasicInformationArticiesOfIncorporationEdit)
