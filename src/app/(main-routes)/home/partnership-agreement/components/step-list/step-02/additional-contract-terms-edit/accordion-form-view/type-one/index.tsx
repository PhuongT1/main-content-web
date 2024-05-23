import DeletePartner from '@/assets/icons/partnership-agreement/detete-partner'
import { dataDeckActive } from '@/atoms/home/naming'
import { dataStep1Atom, projectIdPartnershipAgreement, successValue, tabId } from '@/atoms/home/partnership-agreement'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { AddButton, DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { EventPartnershipAgreement, StatusPartnershipAgreemen } from '@/constants/partnership-agreement'
import { Divider, Typography } from '@/elements'
import Alert from '@/elements/alert'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IBusinessPartner, IBusinessPartnerDatum, IDataStep02, IFormTypeOne, TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, InputAdornment, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { CAPITAL_CONTRIBUTIONS_VALUE } from './constant'
import { v4 as uuidv4 } from 'uuid'

type TTotalFormTypeOne = Array<Array<{ init: string, id: string }>>

interface ITypeOneProps {
  dataAddtionalContractTerms: IDataStep02
}

const businessPartnerSchema = yup.object().shape({
  investment: yup.string().required(''),
  equityRatio: yup.string().required(''),
  detail: yup.string().required(''),
})

const schema = yup.object().shape({
  businessPartners: yup
    .array()
    .of(
      yup.object().shape({
        businessPartnerData: yup
          .array()
          .of(businessPartnerSchema)
          .max(3)
          .required('')
      })
    )
    .required('')
});

const TypeOne = ({ dataAddtionalContractTerms }: ITypeOneProps) => {
  const MAX_VALUE_RATIO_INVESTMENT = 100
  const {
    palette: { home }
  } = useTheme()

  const [totalFormTypeOne, setTotalFormTypeOne] = useState<TTotalFormTypeOne>([])
  const [showErrorMessageFormOne, setShowErrorMessageFormOne] = useState(false)
  const [isValidEquityRatio, setIsValidEquityRatio] = useState<number | null>()
  const [dataStep1] = useRecoilState(dataStep1Atom)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [deckActive] = useRecoilState(dataDeckActive)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
  const query = useQueryClient()

  const formOptions = {
    resolver: yupResolver(schema),
    mode: 'all'
  }

  const {
    handleSubmit,
    control,
    trigger,
    reset,
    getValues,
    setError,
    watch,
    setValue,
    formState: {
      errors,
      isValid,
      isSubmitted
    },
  } = useForm(formOptions as any)


  const calculateEquityRatioTotal = () => {
    const data = watch('businessPartners') || []
    const total = data.reduce((sum: number, item: IBusinessPartner) => {
      const businessPartnerData = item.businessPartnerData || [];
      const equityRatioTotal = businessPartnerData.reduce((subSum: number, partner) => {
        if (partner.equityRatio) {
          return subSum + Number(partner.equityRatio);
        }
        return subSum;
      }, 0);
      return sum + equityRatioTotal;
    }, 0);
    setIsValidEquityRatio(total)
    return total;
  };

  const handleAddOptionOne = async (index: number) => {
    const id = uuidv4()
    let total = totalFormTypeOne?.slice() || [];
    let dataCurrent = getValues(`businessPartners.${index}.businessPartnerData`)
    const error = await trigger(`businessPartners.${index}.businessPartnerData`);

    if (error && total[index]?.length < 3) {
      total[index] = [...total[index], { init: 'init', id: id }];
      dataCurrent.push({
        detail: undefined,
        equityRatio: undefined,
        investment: undefined,
        id: id
      })
      setValue(`businessPartners.${index}.businessPartnerData`, dataCurrent)
      setTotalFormTypeOne(total);
    }
   
    if (totalFormTypeOne[index]?.length === 3) {
      setShowErrorMessageFormOne(true);
    }

    setTimeout(() => {
      setShowErrorMessageFormOne(false);
    }, 1000);
  };

  const handleDeleteOptionOne = async (index: number, id: string, indexChildren: number) => {
    const value = getValues(`businessPartners.${index}.businessPartnerData`)
    let total = totalFormTypeOne?.slice() || [];
    if (value?.length !== 1) {
      const result = total[index].filter((e) => e?.id !== id)
      const currentValue = value.filter((e: IBusinessPartnerDatum, i: number) => e.id !== id)
      total[index] = result
      setValue(`businessPartners.${index}.businessPartnerData`, currentValue)
      setTotalFormTypeOne(total)
    }
  }

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      query.invalidateQueries({ queryKey: ['partnership-contract-step-02'] })
    }
  })


  const onSubmit = async (data: IFormTypeOne) => {
    const totalRatioInvestment = calculateEquityRatioTotal()

    let dataCurrent:any = data || {}

    const newData = totalFormTypeOne.map((e, index) => ({
      businessPartnerData: e.map((e1, i1) => ({
        investment:
          dataCurrent?.businessPartners[index]?.businessPartnerData[i1]?.investment,
        equityRatio:
          dataCurrent?.businessPartners[index]?.businessPartnerData[i1]?.equityRatio,
        detail:
          dataCurrent?.businessPartners[index]?.businessPartnerData[i1]?.detail,
        id: e1.id,
      }))
    }));


    if (totalRatioInvestment < MAX_VALUE_RATIO_INVESTMENT) {
      return
    }

    if (totalRatioInvestment > MAX_VALUE_RATIO_INVESTMENT) {
      return
    }

    let historyData:any = dataAddtionalContractTerms || {}

    const dataFinal = {
      businessPartners: newData
    }

    historyData.typeOne = dataFinal

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
      typeOne: StatusPartnershipAgreemen.DONE
    }))

    setToggleShowDialog(false)

    submitStep.mutateAsync(payload as unknown as TStepPayload<TStepApi>)
    setIdTab(data => ({
      ...data,
      status: StatusPartnershipAgreemen.DONE

    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeOne: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const onDelete = () => {
    const historyData = dataAddtionalContractTerms || {}

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
      typeOne: StatusPartnershipAgreemen.PROCESS
    }))

    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))

    reset({})

  }

  const getDetailTypeOneFormData = () => {
    const value = (dataAddtionalContractTerms?.typeOne?.businessPartners || []).map((e) => ({
      businessPartnerData: e?.businessPartnerData.map((e1) => ({
        investment:
          e1?.investment,
        equityRatio:
          e1.equityRatio,
        detail:
          e1.detail,
        id:
          e1.id
      }))
    }))
    const dataFinal = {
      businessPartners: value
    }
    reset(dataFinal)
  }

  useEffect(() => {
    getDetailTypeOneFormData()
  }, [dataAddtionalContractTerms?.typeOne])


  useEffect(() => {
    if (isValidEquityRatio) {
      if ((isValidEquityRatio > MAX_VALUE_RATIO_INVESTMENT || isValidEquityRatio < MAX_VALUE_RATIO_INVESTMENT)) {
        setTimeout(() => {
          setIsValidEquityRatio(null)
        }, 500)
      }
    }
  }, [isValidEquityRatio])

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_1, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeOne: StatusPartnershipAgreemen.INIT
      }))
      setIdTab(value => ({
        ...value,
        status: StatusPartnershipAgreemen.PROCESS
      }))
    }
    )
  }, [])

  useEffect(() => {
    if (dataStep1?.data) {
      const newTotalPartnerForm = dataStep1?.data?.map((e, index) =>
        (dataAddtionalContractTerms?.typeOne?.businessPartners[index]?.businessPartnerData || [{
          init: "init",
          id: e.id,
        }]).map((e1, i1) => ({
          init: 'init',
          id: uuidv4()
        }))
      );

      const newData = newTotalPartnerForm.map((e, index) => ({
        businessPartnerData: e.map((e1, i1) => ({
          investment:
            undefined,
          equityRatio:
            undefined,
          detail:
            undefined,
          id: e1.id,
        }))
      }));

      setValue("businessPartners", newData)
      setTotalFormTypeOne(newTotalPartnerForm as any);
    }
  }, [dataStep1]);

  return (
    <>
      {!Boolean(successValueData.typeOne === StatusPartnershipAgreemen.DONE) ? (
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
          <Box component={'div'}>
            <TipItemHorizontal
              customSX={{
                padding: '16px 20px 16px 20px'
              }}
              content={
                '동업자 간의 자본 투자에 대한 명확한 이해관계 확립을 통해 각각의 책임과 의무를 이해하고 향후 발생 가능한 잠재적인 분쟁을 방지하는데 도움이 됩니다.'
              }
            />
          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
            {dataStep1?.data?.map((e, index) => {
              return (
                <Box key={`Form_01_${index}`} display={'flex'} flexDirection={'column'}>
                  <Typography cate='link_30' color={home.mint500}>
                    {`동업자 ${index + 1} : ${dataStep1?.data[index]?.name || '-'}`}
                  </Typography>

                  {totalFormTypeOne &&
                    totalFormTypeOne[index]?.map((itemChildren, indexChildren) => {
                      return (
                        <Box
                          key={`Form_${indexChildren}`}
                          display={'flex'}
                          flexDirection={'column'}
                          gap={convertToRem(16)}
                          marginBottom={convertToRem(16)}
                        >
                          <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                            <Typography cate='link_30' color={home.gray0}>
                              {`동업자 ${indexChildren + 1}`}
                            </Typography>
                            <DeletePartner style={{
                              cursor: 'pointer'
                            }} onClick={() => handleDeleteOptionOne(index, itemChildren?.id, indexChildren)} />
                          </Box>
                          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                            <Box width={convertToRem(134)}>
                              <SelectItem
                                textFieldProps={{ required: true, placeholder: '선택' }}
                                control={control}
                                label='출자종류'
                                name={`businessPartners.${index}.businessPartnerData.${indexChildren}.investment`}
                              >
                                {CAPITAL_CONTRIBUTIONS_VALUE.map((e: TValueSelect, index: number) => (
                                  <MenuItem key={index} value={e?.value}>
                                    {e?.label}
                                  </MenuItem>
                                ))}
                              </SelectItem>
                            </Box>
                            <Box width={convertToRem(134)}>
                              <InputItem
                                control={control}
                                label='지분비율'
                                name={`businessPartners.${index}.businessPartnerData.${indexChildren}.equityRatio`}
                                sxInput={{
                                  '.MuiOutlinedInput-input': {
                                    '&.MuiInputBase-input': {
                                      padding: '16px 0 16px 16px'
                                    }
                                  }
                                }}
                                textFieldProps={{
                                  required: true,
                                  placeholder: '지분비율',
                                  InputProps: {
                                    endAdornment: (
                                      <InputAdornment
                                        position='end'
                                        sx={{
                                          marginRight: convertToRem(16)
                                        }}
                                      >
                                        %
                                      </InputAdornment>
                                    )
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <InputItem
                              control={control}
                              label='세부내용'
                              name={`businessPartners.${index}.businessPartnerData.${indexChildren}.detail`}
                              textFieldProps={{
                                inputProps: {
                                  maxLength: 20
                                },
                                required: true,
                                placeholder: '출자 내용을 적어주세요.'
                              }}
                            />
                          </Box>
                        </Box>
                      )
                    })}
                  {
                    totalFormTypeOne[index]?.length === 3 && showErrorMessageFormOne && <Alert sx={{ marginTop: '10px', marginBottom: '24px' }} severity='error'>
                      출자내용은 최대 3개까지 추가 가능합니다.
                    </Alert>
                  }
                  {
                    index === (dataStep1?.data?.length - 1) && isSubmitted && isValidEquityRatio && (isValidEquityRatio > MAX_VALUE_RATIO_INVESTMENT) && <Alert sx={{ marginTop: '10px', marginBottom: '24px' }} severity='error'>
                      지분비율은 100%가 되어야 합니다.
                    </Alert>
                  }
                  {
                    index === (dataStep1?.data?.length - 1) && isSubmitted && isValidEquityRatio && (isValidEquityRatio < MAX_VALUE_RATIO_INVESTMENT) && <Alert sx={{ marginTop: '10px', marginBottom: '24px' }} severity='error'>
                      {`지분비율이 ${Number(MAX_VALUE_RATIO_INVESTMENT - isValidEquityRatio)}% 남았습니다. 지분비율은 100%가 되어야 합니다.`}
                    </Alert>
                  }
                  <Box display={'flex'} justifyContent={'center'}>
                    <AddButton
                      hidden={false}
                      onClick={() => handleAddOptionOne(index)}
                      title='출자내용 추가'
                      sx={{
                        width: '160px'
                      }}
                    />
                  </Box>
                </Box>
              )
            })}

          </Box>

          <SubmitAccordionButton
            type='submit'
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

          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
            {dataStep1.data.map((e, index) => {
              return (
                <Box key={`Form_Result_${index}`} display={'flex'} flexDirection={'column'} gap={convertToRem(20)}>
                  <Typography cate='link_30' color={home.mint500}>
                    {`동업자 ${index + 1} : ${dataStep1?.data[index]?.name || '-'}`}
                  </Typography>
                  {dataAddtionalContractTerms?.typeOne?.businessPartners[index]?.businessPartnerData?.map((itemChildren, indexChildren) => {
                    return (
                      <Box
                        key={`Form_Result_Children_${index}`}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={convertToRem(8)}
                      >
                        <Typography cate='link_30' color={home.gray0}>
                          {`동업자 ${indexChildren + 1}`}
                        </Typography>
                        <Box
                          display={'flex'}
                          flexDirection={'row'}
                          justifyContent={'flex-start'}
                          gap={convertToRem(16)}
                          marginLeft={convertToRem(14)}
                        >
                          <Typography cate='body_20' color={home.gray50} fontSize={convertToRem(16)}>
                            {itemChildren.investment}
                          </Typography>
                          <Typography cate='body_20' color={home.gray50} fontSize={convertToRem(16)}>
                            {itemChildren.equityRatio}%
                          </Typography>
                        </Box>
                        <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
                          {itemChildren.detail}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              )
            })}
          </Box>
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

export default memo(TypeOne)
