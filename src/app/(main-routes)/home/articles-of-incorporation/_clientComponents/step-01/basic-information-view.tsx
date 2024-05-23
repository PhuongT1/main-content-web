import DefaultIcon from '@/assets/icons/articles-of-incorporation/default-icon'
import { dataStep1Atom } from '@/atoms/home/articles-of-incorporation'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { BaseChip, Divider, Typography } from '@/elements'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import DatePicker from '@/libs/datepicker/DatePicker'
import { IAriticiesOfIncorporationStep1 } from '@/types/articies-of-incorporation.type'
import { TValueSelect } from '@/types/partnership-agreement'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, Stack, useTheme } from '@mui/material'
import moment from 'moment'
import { memo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import SelectedListView from '../../../teambuilding/step-list/step_03/view/selected-list'
import { schema } from './basic-infomation-edit'
import {
  AMOUNT_PER_SHARE_TYPES,
  BUSINESS_ENGLISH_NAME_TYPES,
  BUSINESS_KOREAN_NAME_TYPES,
  FINANCIAL_STATEMENT_TYPES,
  LOCATION_TYPES,
  SHARE_CAPITAL_TYPES,
  TOTAL_NUMBER_SHARES_TYPES
} from './constant'
import InputNumberWithText from '@/components/input/input-number-with-text'

interface IBasicInformationArticiesOfIncorporationView {
  dataStep1: IAriticiesOfIncorporationStep1
}

const BasicInformationArticiesOfIncorporationView = ({ dataStep1 }: IBasicInformationArticiesOfIncorporationView) => {
  const {
    palette: { home }
  } = useTheme()

  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [dataBasicInformationArticiesOfIncorporationEdit, setDataBasicInformationArticiesOfIncorporationEdit] =
    useRecoilState(dataStep1Atom)

  const formOptions = {
    resolver: yupResolver(schema)
  }

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    register,
    trigger,
    reset,
    setError,
    setValue
  } = useForm(formOptions)

  const formProps = useForm(formOptions as any)

  const getBasicInformationArticiesOfIncorporationDetail = () => {
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
      numberIssuedShares: dataStep1?.numberIssuedShares,
      publicationArea: dataStep1?.publicationArea,
      media: dataStep1?.media,
      companyWebsite: dataStep1?.companyWebsite,
      financialStatement: dataStep1?.financialStatement,
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

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== STEP.STEP_ONE)
      return removeStep
    })
    setActiveStep(STEP.STEP_ONE)
  }

  useEffect(() => {
    if (dataStep1) {
      getBasicInformationArticiesOfIncorporationDetail()
    }
  }, [dataStep1])

  return (
    <FormProvider {...formProps}>
      <Box display={'flex'} flexDirection={'column'} gap={convertToRem(60)} marginTop={convertToRem(32)}>
        <Box component={'div'}>
          <Box component={'div'} display={'flex'} alignItems={'center'} marginBottom={convertToRem(20)}>
            <Box component={'h2'} sx={{ color: home.gray50 }}>
              회사 정보
            </Box>
          </Box>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
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
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
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
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
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
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <InputItem
                control={control}
                label='회사 연락처'
                name='companyContactInformation'
                textFieldProps={{
                  placeholder: '연락처 입력',
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <DatePicker
                value={
                  !!dataStep1?.companyEstablishmentDate
                    ? moment(dataStep1?.companyEstablishmentDate).format('YYYY-MM-DD')
                    : ''
                }
                placeholder='선택'
                disabled
                labelProps={{
                  label: '회사 설립(예정)일'
                }}
                style={{
                  backgroundColor: home.gray300,
                  border: `1px solid ${home.gray200}`,
                  color: home.gray100
                }}
                onDateChange={(date: Date) => {
                  console.log(date)
                }}
              />
            </Grid>
          </Grid>
          <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
            <Grid item flex={'1 0 0'}>
              <InputItem
                control={control}
                name='totalNumberShares'
                label='회사가 앞으로 발행할 주식의 총수'
                textFieldProps={{
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
                control={control}
                label='자본금'
                name='capital'
              >
                {SHARE_CAPITAL_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
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
                name='numberIssuedShares'
                label='발행주식 수'
                textFieldProps={{
                  placeholder: '자동 계산',
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
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
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
          <Box component={'div'}>
            <Box component={'div'} display={'flex'} alignItems={'center'}>
              <Typography cate='title_4_semibold' sx={{ color: home.gray50 }}>
                대표자 및 법인설립 구성원
              </Typography>
            </Box>
          </Box>
          <Box component={'div'}>
            {dataStep1?.data?.map((e, index) => {
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
                    <Typography
                      sx={{ color: home.gray50 }}
                      fontSize={convertToRem(16)}
                      fontWeight={600}
                      lineHeight={1.5}
                    >
                      구성원 {index + 1}
                    </Typography>
                    <BaseChip
                      sx={{
                        backgroundColor: home.gray400
                      }}
                      label={
                        <Typography cate='mandatory_10' color={home.gray100}>
                          필수
                        </Typography>
                      }
                    />
                  </Box>
                  <Grid container gap={'20px'}>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='이름'
                        name={`data.${index}.name`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          required: true,
                          InputProps: {
                            readOnly: true
                          }
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
                          label: '생년월일'
                        }}
                        disabled
                        style={{
                          backgroundColor: home.gray300,
                          border: `1px solid ${home.gray200}`,
                          color: home.gray100
                        }}
                        onDateChange={(date: Date) => {
                          setValue(`data.${index}.birthdate`, date as any)
                        }}
                      />
                    </Grid>
                    <Grid item flex={'1 0 0'}>
                      <InputItem
                        control={control}
                        label='연락처'
                        name={`data.${index}.contact`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          InputProps: {
                            readOnly: true
                          }
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='직위'
                        name={`data.${index}.position`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          InputProps: {
                            readOnly: true
                          }
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='발기인 여부'
                        name={`data.${index}.status`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          InputProps: {
                            readOnly: true
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container gap={'20px'}>
                    <Grid item flex={'1 0 0'}>
                      <InputItem
                        control={control}
                        label='주소'
                        name={`data.${index}.address`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          InputProps: {
                            readOnly: true
                          }
                        }}
                      />
                    </Grid>
                    <Grid item flex={'200px 0 0'}>
                      <InputItem
                        control={control}
                        label='출자 주식 수'
                        name={`data.${index}.numberContributedShares`}
                        textFieldProps={{
                          placeholder: '나머지 주소 입력',
                          InputProps: {
                            readOnly: true
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
                          placeholder: '나머지 주소 입력',
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
          <Divider />
        </Box>
        <Box component={'div'} display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
          <Box component={'div'}>
            <Box
              component={'div'}
              display={'flex'}
              alignItems={'start'}
              flexDirection={'column'}
              gap={convertToRem(20)}
            >
              <Box component={'h2'} sx={{ color: home.gray50 }}>
                사업목적
              </Box>
              <SelectedListView
                list={{
                  selectedList: dataStep1?.organization,
                  key: 'id',
                  label: 'name',
                  render: (item: any) => {
                    return (
                      <Box component={'div'} display={'flex'} alignItems={'center'} gap={'8px'}>
                        <DefaultIcon />
                        <Typography cate='title_4_chip' color={home.gray50}>
                          {item.name}
                        </Typography>
                      </Box>
                    )
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box component={'div'}>
          <Box component={'h2'} sx={{ color: home.gray50 }} marginBottom={convertToRem(20)}>
            공고방법
          </Box>
          <Grid container gap={'20px'}>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
                control={control}
                label='공고 발행지역'
                name='publicationArea'
              >
                {BUSINESS_KOREAN_NAME_TYPES.map((e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                ))}
              </SelectItem>
            </Grid>
            <Grid item flex={'200px 0 0'}>
              <SelectItem
                textFieldProps={{
                  required: true,
                  placeholder: '선택',
                  InputProps: {
                    readOnly: true
                  }
                }}
                control={control}
                label='매체'
                name='media'
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
                label='회사 홈페이지'
                name='companyWebsite'
                textFieldProps={{
                  placeholder: '나머지 주소 입력',
                  required: true,
                  InputProps: {
                    readOnly: true
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack flexDirection={'row'} justifyContent={'center'}>
          <EditButton onClick={handleRemoveCompleteStep} />
        </Stack>
      </Box>
    </FormProvider>
  )
}

export default memo(BasicInformationArticiesOfIncorporationView)
