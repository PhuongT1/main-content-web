import { dataDeckActive } from '@/atoms/home/naming'
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
import { IDataStep02, IFormTypeTwo, TValueSelect } from '@/types/partnership-agreement'
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
import { MANDATORY_EMPLOYMENT_PERIOD, PENALTY_FOR_VIOLATION_OF_THE_MANDATORY_EMPLOYMENT_CLAUSE } from './constant'

interface ITypeTwoProps {
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

const TypeTwo = ({ dataAddtionalContractTerms }: ITypeTwoProps) => {
  const {
    palette: { home }
  } = useTheme()


  const [deckActive] = useRecoilState(dataDeckActive)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const query = useQueryClient()
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
  const [idTab, setIdTab] = useRecoilState(tabId)
  
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

  const onSubmit = (data: IFormTypeTwo) => {
    let historyData = dataAddtionalContractTerms || {}

    // historyData.typeTwo = data

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
      typeTwo: StatusPartnershipAgreemen.DONE

    }))

    setIdTab(data => ({
      ...data,
      status: StatusPartnershipAgreemen.DONE
    }))
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeTwo: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const onDelete = () => {
    let historyData:any = dataAddtionalContractTerms || {}
    const value = {
      date: '',
      valuePenalty: ''
    }

    historyData.typeTwo = value

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
      typeTwo: StatusPartnershipAgreemen.INIT
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
    setToggleShowDialog(false)
  }

  const getDetailTypeTwoFormData = () => {
    const value = {
      date: dataAddtionalContractTerms?.typeTwo?.date,
      valuePenalty: dataAddtionalContractTerms?.typeTwo?.valuePenalty
    }

    reset(value)
  }

  useEffect(() => {
    if (dataAddtionalContractTerms?.typeTwo) {
      getDetailTypeTwoFormData()
    }
  }, [dataAddtionalContractTerms?.typeTwo])

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_2, () => {
        reset()
        setSuccessValueData(value => ({
          ...value,
          typeTwo: StatusPartnershipAgreemen.INIT
        }))
      } 
    )
  }, [])

  return (
    <>
      {successValueData.typeTwo !== StatusPartnershipAgreemen.DONE ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={convertToRem(24)}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography cate='body_20' color={home.gray50}>
            핵심 인력이 일정 기간 회사에 근속하여 사업의 지속성과 팀의 안정성을 확보하기 위해 근속 의무 조항을
            추가합니다.
          </Typography>
          <Divider sx={{
            background: home.gray200
          }} />
          <TipItemHorizontal
            customSX={{
              padding: '16px 20px 16px 20px'
            }}
            content={
              '너무 긴 근속 의무 기간은 직업 선택의 자유를 침해하게 되어 무효가 될 수 있습니다. 적정한 기간을 설정해보세요.'
            }
          />
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='근속 의무 기간'
              name='date'
            >
              {MANDATORY_EMPLOYMENT_PERIOD?.map((e: TValueSelect, index: number) => (
                <MenuItem key={index} value={e?.value}>
                  {e?.label}
                </MenuItem>
              ))}
            </SelectItem>
          </Box>
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='근속 의무 조항 위반에 따른 위약금'
              name='valuePenalty'
            >
              {PENALTY_FOR_VIOLATION_OF_THE_MANDATORY_EMPLOYMENT_CLAUSE?.map((e: TValueSelect, index: number) => (
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
            핵심 인력이 일정 기간 회사에 근속하여 사업의 지속성과 팀의 안정성을 확보하기 위해 근속 의무 조항을
            추가합니다.
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              근속 의무 기간
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
              {dataAddtionalContractTerms?.typeTwo?.date}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              근속 의무 조항 위반에 따른 위약금
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)} fontSize={convertToRem(16)}>
              {dataAddtionalContractTerms?.typeTwo?.valuePenalty}
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

export default memo(TypeTwo)
