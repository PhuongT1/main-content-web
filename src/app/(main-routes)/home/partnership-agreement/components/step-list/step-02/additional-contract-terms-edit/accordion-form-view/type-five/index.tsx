import { dataDeckActive } from '@/atoms/home/advertisement-marketing'
import { projectIdPartnershipAgreement, successValue, tabId } from '@/atoms/home/partnership-agreement'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { EventPartnershipAgreement, StatusPartnershipAgreemen } from '@/constants/partnership-agreement'
import { Divider, Typography } from '@/elements'
import SelectItem from '@/form/select'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IDataStep02, IFormTypeFive, TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { POST_TERMINATION_NON_COMPETE_PERIOD_IN_THE_SAME_OR_RELATED_INDUSTRY } from '../type-three/constant'
import { PENALTY_FOR_VIOLATION_OF_THE_MANDATORY_EMPLOYMENT_CLAUSE } from '../type-two/constant'


interface IFormTypeFiveProps {
  dataAddtionalContractTerms: IDataStep02
}

const schema = yup
  .object({
    date: yup.string().required(''),
    valuePenalty: yup.string().required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeFive = ({ dataAddtionalContractTerms }: IFormTypeFiveProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [deckActive] = useRecoilState(dataDeckActive)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const query = useQueryClient()

  const {
    handleSubmit,
    control,
    reset,
  } = useForm(formOptions)


  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      query.invalidateQueries({ queryKey: ['partnership-contract-step-02'] })
    }
  })

  const onSubmit = (data: IFormTypeFive) => {
    let historyData = dataAddtionalContractTerms || {}
    // historyData.typeFive = data

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
      typeFive: StatusPartnershipAgreemen.DONE
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
      typeFive: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
    
  }

  const onDelete = () => {
    let historyData = dataAddtionalContractTerms || {}

    const value = {
      date: '',
      valuePenalty: ''
    }

    // historyData.typeFive = value

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
      typeFive: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const getDetailTypeFiveFormData = () => {
    const value = {
      date: dataAddtionalContractTerms?.typeFive?.date,
      valuePenalty: dataAddtionalContractTerms?.typeFive?.valuePenalty
    }

    reset(value)
  }

  useEffect(() => {
    if (dataAddtionalContractTerms?.typeFive) {
      getDetailTypeFiveFormData()
    }
  }, [dataAddtionalContractTerms?.typeFive])

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_5, () => {
      reset()
      setSuccessValueData(value => ({
        ...value,
        typeFive: StatusPartnershipAgreemen.INIT
      }))
    }
    )
  }, [])

  return (
    <>
      {successValueData.typeFive !== StatusPartnershipAgreemen.DONE ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={convertToRem(24)}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography cate='body_20' color={home.gray50}>
            회사의 기밀 정보 보호, 경쟁 방지, 분재 예방 및 해결 등 동업자 간의 이해충돌을 규제하고 보호하기 위해 비밀
            유지 의무 조항을 추가합니다.
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
            <SelectItem textFieldProps={{ required: true, placeholder: '선택' }} control={control} label='비밀 유지 기간' name='date'>
              {POST_TERMINATION_NON_COMPETE_PERIOD_IN_THE_SAME_OR_RELATED_INDUSTRY.map(
                (e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                )
              )}
            </SelectItem>
          </Box>
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='비밀 유지 의무 조항 위반에 따른 위약금'
              name='valuePenalty'
            >
              {PENALTY_FOR_VIOLATION_OF_THE_MANDATORY_EMPLOYMENT_CLAUSE.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
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
            회사의 기밀 정보 보호, 경쟁 방지, 분재 예방 및 해결 등 동업자 간의 이해충돌을 규제하고 보호하기 위해 비밀 유지 의무 조항을 추가합니다.
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              비밀 유지 기간
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms.typeFive.date}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              비밀 유지 의무 조항 위반에 따른 위약금
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms.typeFive.valuePenalty}
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

export default memo(TypeFive)
