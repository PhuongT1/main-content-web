import { RadioGroupItem } from '@/app/(main-routes)/home/competitor-analysis/_components/table_item'
import { dataDeckActive } from '@/atoms/home/advertisement-marketing'
import { dataStep1Atom, projectIdPartnershipAgreement, successValue, tabId } from '@/atoms/home/partnership-agreement'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { EventPartnershipAgreement, StatusPartnershipAgreemen } from '@/constants/partnership-agreement'
import { Divider, PrimaryPillRadio, Typography } from '@/elements'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IDataStep02, IFormTypeSix, TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, FormControlLabel, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { MANDATORY_PROFIT_DISTRIBUTION } from '../../business-partnership-agreement/constant'
import { VALUE_PERCENT } from './constant'

interface ITypeSixProps {
  dataAddtionalContractTerms: IDataStep02
}

const partnerSchema = yup.object().shape({
  partnerRatio: yup.string()
})

const schema = yup
  .object({
    limit: yup.string().required(''),
    distribution: yup.string().required('')
  }).shape({
    partnerData: yup
      .array()
      .of(partnerSchema)
      .max(3)
      .required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeSix = ({ dataAddtionalContractTerms }: ITypeSixProps) => {
  const {
    palette: { home }
  } = useTheme()


  const query = useQueryClient()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [dataStep1] = useRecoilState(dataStep1Atom)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [idTab, setIdTab] = useRecoilState(tabId)

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    watch,
    reset,
  } = useForm(formOptions)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      query.invalidateQueries({ queryKey: ['partnership-contract-step-02'] })
    }
  })

  const onSubmit = (data: IFormTypeSix) => {
    let historyData = dataAddtionalContractTerms || {}
    // historyData.typeSix = data
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
      typeSix: StatusPartnershipAgreemen.DONE

    }))
    setToggleShowDialog(false)
    setIdTab(data => ({
      ...data,
      status: StatusPartnershipAgreemen.DONE
    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeSix: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const onDelete = () => {
    let historyData = dataAddtionalContractTerms || {}

    const value = {
      limit: '',
      distribution: ''
    }
    // historyData.typeSix = value

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

    setSuccessValueData(data => ({
      ...data,
      typeSix: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))

  }

  const getDetailTypeSixFormData = () => {
    const value = {
      limit: dataAddtionalContractTerms?.typeSix?.limit,
      distribution: dataAddtionalContractTerms?.typeSix?.distribution,
      partnerData: dataAddtionalContractTerms?.typeSix?.partnerData?.map((e) => ({
        partnerRatio: e.partnerRatio
      }))
    }

    reset(value)
  }

  useEffect(() => {
    if (dataAddtionalContractTerms?.typeSix) {
      getDetailTypeSixFormData()
    }
  }, [dataAddtionalContractTerms?.typeSix])

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_6, () => {
        reset()
        setSuccessValueData(value => ({
          ...value,
          typeSix: StatusPartnershipAgreemen.INIT
        }))
      } 
    )
  }, [])

  return (
    <>
      {successValueData.typeSix !== StatusPartnershipAgreemen.DONE ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={convertToRem(24)}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography cate='body_20' color={home.gray50}>
            각 동업자가 회사의 이익을 최우선하고 충돌을 미연에 방지하기 위해 겸직의 금지 조항을 추가합니다. 다만, 동업자 간의 합의를 통해 겸직을 허용하는 내용을 반영할 수 있습니다.
          </Typography>
          <Divider sx={{
            background: home.gray50
          }} />
          <TipItemHorizontal
            customSX={{
              padding: '16px 20px 16px 20px'
            }}
            content={
              '동업자가 회사를 떠나거나 계약이 종료된 후에도 회사의 정보를 외부에 유출하지 않도록 방지하는 것은 중요합니다. 조항을 추가하게 되면 본 계약의 내용도비밀이 되기 때문에 외부에 본 계약의 내용이 유출되지 않도록 유의해주세요.'
            }
          />
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='회사 전체 이익에서 동업자간 이익 분배 한도'
              name='limit'
            >
              {VALUE_PERCENT.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
          </Box>
          <Box>
            <Typography cate='sub_title_30' color={home.gray50}>
            <span style={{color:'#44BDBD'}}>*</span> 분배 방법
            </Typography>
            <RadioGroupItem control={control} name='distribution'>
              <FormControlLabel
                value='본 계약서 상의 출자비율'
                control={<PrimaryPillRadio />}
                label='본 계약서 상의 출자비율'
                sx={{
                  borderColor: '#EA3939'
                }}
              />
              <FormControlLabel value='동일한 비율' control={<PrimaryPillRadio />} label='동일한 비율' />
              <FormControlLabel value='직접 입력' control={<PrimaryPillRadio />} label='직접 입력' />
            </RadioGroupItem>
          </Box>
          {
            watch('distribution') === MANDATORY_PROFIT_DISTRIBUTION.TERM && (
              dataStep1.data.map((e, index) => {
                return (
                  <Box key={`partner_${e.id}`}>
                    <InputItem
                      control={control}
                      label={`동업자 ${index + 1} : ${e?.name}`}
                      name={`partnerData.${index}.partnerRatio`}
                      textFieldProps={{
                        placeholder: '출자 내용을 적어주세요.'
                      }}
                    />
                  </Box>
                )
              })
            )
          }
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
            각 동업자가 회사의 이익을 최우선하고 충돌을 미연에 방지하기 위해 겸직의 금지 조항을 추가합니다. 다만, 동업자 간의 합의를 통해 겸직을 허용하는 내용을 반영할 수 있습니다.
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              비밀 유지 기간
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeSix?.limit}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              비밀 유지 의무 조항 위반에 따른 위약금
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeSix?.distribution}
            </Typography>
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

export default memo(TypeSix)
