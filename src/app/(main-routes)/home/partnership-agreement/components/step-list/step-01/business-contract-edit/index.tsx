import DeleteIcon from '@/assets/icons/partnership-agreement/delete-icon'
import { dataStep1Atom, projectIdPartnershipAgreement } from '@/atoms/home/partnership-agreement'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { Alert as AlertDialog } from '@/components/dialog'
import { AddButton, RefreshButton, SubmitButton } from '@/components/home/button'
import TipItem from '@/components/home/tip-item'
import { STEP } from '@/constants/common.constant'
import { BaseChip, Divider, Typography } from '@/elements'
import Alert from '@/elements/alert'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import useToggle from '@/hooks/use-toggle'
import DatePicker from '@/libs/datepicker/DatePicker'
import { postStep } from '@/services/step.service'
import { IBusinessContract, IDataStep01, TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'
import { DECK_ID } from '../../constant'
import styles from './business-contract-edit.module.scss'
import { COMPANY_TYPE, HEADQUARTERS_LOCATION, INDUSTRIAL_FIELD, MAXLENGTH_INPUT } from './constant'


interface IBussinessContractPageEdit {
  dataStep1: IDataStep01
}

interface ITotalForm {
  init: string
  id: string
}

const defaultValues = {
  data: [
    {
      contact: null,
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
    data: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().max(15),
          birthdate: yup.string(),
          contact: yup.mixed().nullable(),
          address: yup.string().max(50)
        })
      ).min(2)
      .required(),
    companyType: yup.string().required(''),
    companyName: yup.string().required('').max(20),
    companyHeadquartersAddress: yup.string().required(''),
    companyAdditionalAddress: yup.string().max(50),
    companyIndustrySector: yup.string().required(''),
    companyIdea: yup.string().required('').max(60),
    contrastDate: yup.string().required(''),
  })
  .required();

const BussinessContractPageEdit = ({ dataStep1 }: IBussinessContractPageEdit) => {
  const [totalPartnerForm, setTotalPartnerForm] = useState<ITotalForm[]>([
    {
      init: 'init',
      id: '1'
    },
    {
      init: 'init',
      id: '2'
    }
  ])
  const query = useQueryClient()
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [showErrorMessageRequire, setShowErrorMessageRequire] = useState(false)
  const [dataBusinessContract, setDataBusinessContract] = useRecoilState(dataStep1Atom)
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)


  const {
    palette: { home, main }
  } = useTheme()


  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all'
  }

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
    getValues,
    register,
    trigger,
    reset,
    watch,
    setError,
    setValue
  } = useForm(formOptions as any)

  const handleAddBusinessContract = () => {
    let total = [...totalPartnerForm]
    const id = uuidv4()
    const dataCurrent = { ...getValues() || {} }

    if (totalPartnerForm.length === 5) {
      setShowErrorMessage(true)
      setTimeout(() => { setShowErrorMessage(false) }, 3000)
      return
    }

    if (!Boolean(watch(`data.0.name`)) && !Boolean(watch(`data.1.name`))) {
      setError('data.0.name', { type: 'manual', message: 'name is required' })
      setError('data.1.name', { type: 'manual', message: 'name is required' })
      return
    }

    if (!Boolean(watch(`data.0.name`))) {
      return setError('data.0.name', { type: 'manual', message: 'name is required' })
    }

    if (!Boolean(watch(`data.1.name`))) {
      return setError('data.1.name', { type: 'manual', message: 'name is required' })
    }

    trigger()

    if (total && isValid && total?.length < 5 && dataCurrent?.data) {
      total = [...total, { init: 'init', id: id }];
      dataCurrent?.data.push({
        name: '',
        birthdate: '',
        contact: '',
        address: '',
        id: id
      })
      setValue(`data`, dataCurrent?.data)
      setTotalPartnerForm(total)
    }

  }

  const handleDeleteColumn = (id: string, index: number) => {
    let total = [...totalPartnerForm]
    const dataCurrent = { ...getValues() || {} }
    if (total.length > 2) {
      const totalRemoved = total.filter((e, index1) => e?.id !== id)
      const dataRemoved = dataCurrent?.data?.filter((e: IBusinessContract, index1: number) => index1 !== index)
      setValue(`data`, dataRemoved)
      setTotalPartnerForm(totalRemoved)
    }
  }

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      handleCompleteStep()
      query.invalidateQueries({ queryKey: ['partnership-contract-step-01'] })
    }
  })

  const handleResetValue = () => {
    const value = {
      companyAdditionalAddress: '',
      companyHeadquartersAddress: '',
      companyIdea: '',
      companyIndustrySector: '',
      companyName: '',
      companyType: '',
      contrastDate: '',
      data:
        dataStep1?.data?.map((item) => ({
          name: '',
          birthdate: '',
          contact: '',
          address: ''
        })) || []
    }

    reset(value)
  }

  const handleCompleteStep = async () => {
    setCompleteStep((prev) => {
      if (!prev.includes(STEP.STEP_ONE)) {
        return [STEP.STEP_ONE]
      }
      return prev
    })
    setActiveStep((pre) => pre + 1)
  }

  const onSubmit = async (data: IDataStep01) => {
    const newData = totalPartnerForm.map((e, index) => ({
      ...data.data[index],
      id: e?.id
    }));
    
    if (Boolean(errors?.data)) {
      setShowErrorMessageRequire(true)
    }

    if (!Boolean(getValues('data.0.name'))) {
      setError('data.0.name', {
        type: 'required',
        message: 'is not valid'
      })
      return
    }

    if (!Boolean(getValues('data.1.name'))) {
      setError('data.1.name', {
        type: 'required',
        message: 'is not valid'
      })
      return
    }

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

    setDataBusinessContract(data)

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
  };

  const getBussinessContractPageEditDetail = () => {
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
          birthdate: !!item?.birthdate ? item?.birthdate : '',
          contact: item?.contact || '',
          address: item?.address || '',
          id: item?.id
        })) || []
    }

    reset(value)
  }

  const handleClickForm = () => {
    if (!Boolean(watch(`data.0.name`)) && !Boolean(watch(`data.1.name`))) {
      setValue('data.0.name', null)
      setValue('data.1.name', null)
      return trigger() 
    }

    if (!Boolean(watch(`data.0.name`))) {
       setValue('data.0.name', null)
       return trigger()
    }

    if (!Boolean(watch(`data.1.name`))) {
      setValue('data.1.name', null)
       return trigger()
    }
  }

  useEffect(() => {
    if (dataStep1) {
      getBussinessContractPageEditDetail()
      const newTotalPartnerForm = dataStep1?.data?.map((e, index) => ({
        init: 'init',
        id: e?.id
      }))
      setTotalPartnerForm(newTotalPartnerForm as unknown as ITotalForm[])
    }
  }, [dataStep1, completeStep])

  useEffect(() => {
    if (Boolean(errors?.data)) {
      setShowErrorMessageRequire(true)
    }
  }, [isSubmitted])


  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={convertToRem(60)}
      marginTop={convertToRem(32)}
      component={'form'}
      onSubmit={handleSubmit(onSubmit as any)}
    >
      <Box component={'div'}>
        <Box component={'div'} className={styles.layer_title}>
          <Box component={'h2'} sx={{ color: home.gray50 }}>
            동업하는 회사 정보
          </Box>
        </Box>
        <Typography sx={{ mb: convertToRem('30px'), color: home.gray100 }}>
          동업의 대상이 되는 회사의 정보를 입력합니다.
        </Typography>
        <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
          <Grid item flex={'200px 0 0'}>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
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
                inputProps: {
                  maxLength: MAXLENGTH_INPUT.COMPANY_NAME
                },
                required: true,
                placeholder: '회사명 입력'
              }}
            />
          </Grid>
          <Grid item flex={'200px 0 0'}>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='본점 소재지'
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
                inputProps: {
                  maxLength: MAXLENGTH_INPUT.COMPANY_ADDITIONAL_ADDRESS
                },
                placeholder: '나머지 주소 입력'
              }}
            />
          </Grid>
        </Grid>
        <Box component={'div'}>
          <TipItem
            line={2}
            content={
              <>
                회사 설립 예정이어서 회사형태나 회사명, 주소가 정해지지 않았을 경우 가칭이나 예정으로 넣어주세요. 법인
                설립 후 동업계약서를 업데이트 해주시면 됩니다.
              </>
            }
            notExpand={true}
          />
        </Box>
      </Box>
      <Box component={'div'}>
        <Box component={'div'} className={styles.layer_title}>
          <Box component={'h2'} sx={{ color: home.gray50 }}>
            사업 아이디어
          </Box>
        </Box>
        <Typography sx={{ mb: convertToRem('20px'), color: home.gray100 }}>
          사업 아이디어를 간략하게 정리해보세요.
        </Typography>
        <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(20) }}>
          <Grid item flex={'200px 0 0'}>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
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
                inputProps: {
                  maxLength: MAXLENGTH_INPUT.COMPANY_ADDITIONAL_ADDRESS
                },
                required: true,
                placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼'
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
          <Typography sx={{ mb: 0, color: home.gray100 }}>
            동업의 주체가 되는 동업자의 정보를 입력해주세요.
          </Typography>
        </Box>
        {totalPartnerForm.map((e, index: number) => {
          return (
            <Box
              component={'div'}
              key={`PartnerForm + ${index}`}
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
                  {(index === 0 || index === 1) && (
                    <BaseChip
                      sx={{
                        padding: '2px 10px',
                        color:home.gray100,
                        backgroundColor:home.gray400
                      }}
                      label={
                        <Typography cate='mandatory_10' color={home.gray100}>
                          필수
                        </Typography>
                      }
                    />
                  )}
                </Box>
                <Grid container gap={'20px'}>
                  <Grid item flex={'200px 0 0'}>
                    <InputItem
                      control={control}
                      label='이름'
                      name={`data.${index}.name`}
                      textFieldProps={{
                        inputProps: {
                          maxLength: MAXLENGTH_INPUT.NAME
                        },
                        required: index < 2 ? true : false,
                        placeholder: '이름 입력'
                      }}
                    />
                  </Grid>
                  <Grid item flex={'200px 0 0'} sx={{
                    marginTop: convertToRem(3)
                  }}>
                    <DatePicker
                      format='YYYY.MM.DD'
                      value={
                        dataStep1?.data[index]?.birthdate
                          ? moment(dataStep1?.data[index]?.birthdate).format('YYYY.MM.DD')
                          : ''
                      }
                      placeholder='선택'
                      labelProps={{
                        label: '생년월일'
                      }}
                      style={{
                        color: Boolean(watch(`data.${index}.birthdate`)) ? home.gray50 : main.gray30,
                        border: '1px solid #37393E',
                        borderColor:home.gray200
                      }}
                      onDateChange={(date: Date) => {
                        setValue(`data.${index}.birthdate`, moment(date).format('YYYY.MM.DD'))
                      }}
                    />
                  </Grid>
                  <Grid item flex={'200px 0 0'}>
                    <InputItem
                      regex={/^([0-9]*[-]*){1,15}$/}
                      control={control}
                      label='연락처'
                      name={`data.${index}.contact`}
                      textFieldProps={{
                        inputProps: {
                          maxLength: MAXLENGTH_INPUT.NAME
                        },
                        placeholder: '연락처 입력'
                      }}
                    />
                  </Grid>
                  <Grid item flex={'1 0 0'}>
                    <InputItem
                      control={control}
                      label='주소'
                      name={`data.${index}.address`}
                      textFieldProps={{
                        inputProps: {
                          maxLength: MAXLENGTH_INPUT.COMPANY_ADDITIONAL_ADDRESS
                        },
                        placeholder: '주소 입력'
                      }}
                    />
                  </Grid>
                  <Grid item flex={'10px 0 0'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={convertToRem(35)}>
                    <Box sx={{
                      cursor: 'pointer',
                      opacity: totalPartnerForm?.length > 2 ? 1 : 0.5
                    }}>
                      <DeleteIcon onClick={() => handleDeleteColumn(e.id, index)}  fill={home.gray300} stroke={home.gray50}/>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {
                !(index === totalPartnerForm.length - 1) && <Divider sx={{
                  background: home.gray200,
                  borderColor: home.gray200
                }} />}
            </Box>
          )
        })}
        {
          showErrorMessage && <Alert sx={{ marginTop: '10px', background: home.alpha_red_10, color: home.gray50 }} severity='error'>
            동업자 추가는 최대 5명입니다.
          </Alert>
        }
        {
          <Alert setIsError={setShowErrorMessageRequire} key={`${showErrorMessageRequire}`}
            isOpen={showErrorMessageRequire} sx={{ marginTop: '10px', background: home.alpha_red_10, color: home.gray50 }} severity='error'>
            동업자 정보는 2명 이상 작성해야 합니다.
          </Alert>
        }
        <Box display={'flex'} justifyContent={'center'}>
          <AddButton
            hidden={false}
            title='동업자 추가'
            onClick={handleAddBusinessContract}
            sx={{
              width: '160px',
              '&.Mui-disabled': {
                opacity: '0.5 !important',
              }
            }}
          />
        </Box>
        {/* contrast date */}
        <Box mt={'60px'} width={'420px'}>
          <Box component={'div'}>
            <Box component={'div'} className={styles.layer_title}>
              <Box component={'h2'} sx={{ color: home.gray50 }}>
                계약 일자
              </Box>
            </Box>
            <Typography sx={{ mb: convertToRem('20px'), color: home.gray100 }}>
            법인 설립에 참여하는 구성원의 정보를 입력해주세요.
            </Typography>
          </Box>
          <DatePicker
            error={!Boolean(watch(`contrastDate`)) && isSubmitted}
            format='YYYY.MM.DD'
            value={
              dataStep1?.contrastDate
                ? moment(dataStep1?.contrastDate).format('YYYY.MM.DD')
                : ''
            }
            placeholder='선택'
            labelProps={{
              label: '계약 일자',
              required:true
            }}
            style={{
              color: Boolean(watch(`contrastDate`)) ? home.gray50 : main.gray30,
              border: '1px solid #37393E'
            }}
            onDateChange={(date: Date) => {
              setValue(`contrastDate`, moment(date).format('YYYY.MM.DD'))
            }}
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
        <RefreshButton onClick={() => setToggleShowDialog(true)}  sx={{
          background: home.gray400,
          color: home.gray50
        }}/>
        <SubmitButton
          onClick={handleClickForm}
          type={"submit"}
          sx={{
            backgroundColor: home.blue500,
            color:home.gray500
          }}
        />
      </Box>
    </Box>
  )
}
export default memo(BussinessContractPageEdit)
