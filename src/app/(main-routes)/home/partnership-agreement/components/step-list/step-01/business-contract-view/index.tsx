import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import DatePicker from '@/libs/datepicker/DatePicker'
import { IDataStep01, TValueSelect } from '@/types/partnership-agreement'
import { convertToRem } from '@/utils/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, Stack, useTheme } from '@mui/material'
import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { COMPANY_TYPE, HEADQUARTERS_LOCATION, INDUSTRIAL_FIELD } from '../business-contract-edit/constant'
import styles from './business-contract-view.module.scss'
import moment from 'moment'
import { RADIUS_TEXTFIELD } from '@/form/input/input.type'

const defaultValues = {
  data: [
    {
      contact: '',
      name: '',
      birthdate: '',
      address: ''
    }
  ],
  companyType: '',
  companyName: '',
  companyHeadquartersAddress: '',
  companyAdditionalAddress: '',
  companyIndustrySector: '',
  companyIdea: '',
  contrastDate: ''
}

const schema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        birthdate: yup.string(),
        contact: yup.mixed(),
        address: yup.string().max(50)
      })
    ),
    contrastDate: yup.string().required(''),
    companyType: yup.string().required(''),
    companyName: yup.string().required('').max(20),
    companyHeadquartersAddress: yup.string().required(''),
    companyAdditionalAddress: yup.string().max(40),
    companyIndustrySector: yup.string().required(''),
    companyIdea: yup.string().required('').max(60)
  })
  .required()

interface IBussinessContractPageView {
  dataStep1: IDataStep01
}

const BusinessContractViewPage = ({ dataStep1 }: IBussinessContractPageView) => {
  const {
    palette: { home }
  } = useTheme()

  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== STEP.STEP_ONE)
      return removeStep
    })
    setActiveStep(STEP.STEP_ONE)
  }

  const formOptions = {
    defaultValues,
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

  const getBussinessContractPageViewDetail = () => {
    const value = {
      contrastDate: moment(dataStep1?.contrastDate).format('YYYY.MM.DD') || '',
      companyAdditionalAddress: dataStep1?.companyAdditionalAddress || '',
      companyHeadquartersAddress: dataStep1?.companyHeadquartersAddress || '',
      companyIdea: dataStep1?.companyIdea || '',
      companyIndustrySector: dataStep1?.companyIndustrySector || '',
      companyName: dataStep1?.companyName || '',
      companyType: dataStep1?.companyType || '',
      data:
        dataStep1?.data?.map((item) => ({
          name: item?.name || '',
          birthdate: item?.birthdate ? new Date(item?.birthdate) : '',
          contact: item?.contact || '',
          address: item?.address || '',
          id: item?.id
        })) || []
    }

    reset(value as IDataStep01)
  }

  useEffect(() => {
    if (dataStep1) {
      getBussinessContractPageViewDetail()
    }
  }, [dataStep1, completeStep])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={convertToRem(60)}
      marginTop={convertToRem(60)}
      component={'form'}
      onSubmit={handleSubmit(handleRemoveCompleteStep)}
    >
      <Divider
        sx={{
          background: home.gray200,
          borderColor: home.gray200
        }}
      />
      <Box component={'div'}>
        <Box component={'div'} className={styles.layer_title}>
          <Box component={'h2'} sx={{ color: home.gray50, marginBottom: convertToRem(20) }}>
            동업하는 회사 정보
          </Box>
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
              label='회사형태'
              name='companyType'
            >
              {COMPANY_TYPE.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
          </Grid>
          <Grid item flex={'200px 0 0'}>
            <InputItem
              control={control}
              label='회사명'
              name='companyName'
              textFieldProps={{
                required: true,
                placeholder: '회사명 입력',
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
              paperPropsSx={{
                backgroundColor: home.gray200
              }}
              control={control}
              label='회사형태'
              name='companyHeadquartersAddress'
            >
              {HEADQUARTERS_LOCATION?.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
          </Grid>
          <Grid item flex={'1 0 0'}>
            <InputItem
              control={control}
              label='나머지 주소'
              name='companyAdditionalAddress'
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
      <Box component={'div'}>
        <Box component={'div'} className={styles.layer_title}>
          <Box component={'h2'} sx={{ color: home.gray50, marginBottom: convertToRem(20) }}>
            사업 아이디어
          </Box>
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
              label='산업분야'
              name='companyIndustrySector'
            >
              {INDUSTRIAL_FIELD.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
          </Grid>
          <Grid item flex={'1 0 0'}>
            <InputItem
              control={control}
              label='아이디어'
              name='companyIdea'
              textFieldProps={{
                required: true,
                placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
                InputProps: {
                  readOnly: true
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
        <Box component={'div'}>
          <Box component={'div'} className={styles.layer_title}>
            <Box component={'h2'} sx={{ color: home.gray50 }}>
              동업자 정보
            </Box>
          </Box>
        </Box>
        {dataStep1?.data?.map((e, index: number) => {
          return (
            <Box
              component={'div'}
              key={`PartnerForm + ${e.id}`}
              display={'flex'}
              flexDirection={'column'}
              gap={convertToRem(20)}
            >
              <Box component={'div'} display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
                <Box
                  component={'div'}
                  display={'flex'}
                  gap={convertToRem(8)}
                  flexDirection={'row'}
                  alignItems={'center'}
                >
                  <Typography sx={{ color: home.gray50 }} fontSize={convertToRem(16)} fontWeight={600} lineHeight={1.5}>
                    동업자 {index + 1}
                  </Typography>
                </Box>
                <Grid container gap={'20px'}>
                  <Grid item flex={'200px 0 0'}>
                    <InputItem
                      control={control}
                      label='이름'
                      name={`data.${index}.name`}
                      textFieldProps={{
                        required: index < 2 ? true : false,
                        placeholder: '이름 입력',
                        InputProps: {
                          readOnly: true
                        }
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    flex={'200px 0 0'}
                    sx={{
                      marginTop: convertToRem(3)
                    }}
                  >
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
                      style={{
                        backgroundColor: home.gray300,
                        color: home.gray50,
                        border: '1px solid #37393E',
                        borderColor: home.gray200
                      }}
                      disabled
                      onDateChange={(date: Date) => {
                        setValue(`data.${index}.birthdate`, moment(date).format('YYYY.MM.DD'))
                      }}
                    />
                  </Grid>
                  <Grid item flex={'200px 0 0'}>
                    <InputItem
                      control={control}
                      label='연락처'
                      name={`data.${index}.contact`}
                      textFieldProps={{
                        type: 'number',
                        placeholder: '연락처 입력',
                        InputProps: {
                          readOnly: true
                        }
                      }}
                    />
                  </Grid>
                  <Grid item flex={'1 0 0'}>
                    <InputItem
                      control={control}
                      label='주소'
                      name={`data.${index}.address`}
                      textFieldProps={{
                        placeholder: '주소 입력',
                        InputProps: {
                          readOnly: true
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {!(index === dataStep1?.data?.length - 1) && (
                <Divider
                  sx={{
                    background: home.gray200,
                    borderColor: home.gray200
                  }}
                />
              )}
            </Box>
          )
        })}
      </Box>

      {/* contrast date */}
      <Box width={'420px'}>
        <Box component={'div'}>
          <Box component={'div'} className={styles.layer_title}>
            <Box component={'h2'} sx={{ color: home.gray50 }}>
              계약 일자
            </Box>
          </Box>
          <Typography sx={{ mb: convertToRem('20px'), color: home.gray100 }}>계약 일자를 입력해주세요.</Typography>
        </Box>
        <DatePicker
          format='YYYY.MM.DD'
          value={getValues('contrastDate')}
          labelProps={{
            label: '계약 일자',
            required: true
          }}
          style={{
            color: home.gray50
          }}
          disabled
          onDateChange={(date: Date) => {
            setValue(`contrastDate`, date as any)
          }}
        />
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'></Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton
          onClick={handleRemoveCompleteStep}
          sx={{
            background: home.gray300,
            color: home.gray0
          }}
        />
      </Stack>
    </Box>
  )
}

export default memo(BusinessContractViewPage)
