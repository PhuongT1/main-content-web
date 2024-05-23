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
import { IDataStep02, IFormTypeFour, TValueSelect } from '@/types/partnership-agreement'
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

interface ITypeFourProps {
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

const TypeFour = ({ dataAddtionalContractTerms }: ITypeFourProps) => {
  const {
    palette: { home }
  } = useTheme()

  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [deckActive] = useRecoilState(dataDeckActive)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
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

  const onSubmit = (data: IFormTypeFour) => {
    let historyData = {...dataAddtionalContractTerms} || {}

    // historyData.typeFour = data

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
      typeFour: StatusPartnershipAgreemen.DONE
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
      typeFour: StatusPartnershipAgreemen.PROCESS
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
    // historyData.typeFour = value

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
      typeFour: StatusPartnershipAgreemen.PROCESS
    }))
    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const getDetailTypeFourFormData = () => {
    const value = {
      date: dataAddtionalContractTerms?.typeFour?.date,
      valuePenalty: dataAddtionalContractTerms?.typeFour?.valuePenalty
    }

    reset(value)
  }

  useEffect(() => {
      getDetailTypeFourFormData()
  }, [dataAddtionalContractTerms?.typeFour])

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_4, () => {
        reset()
        setSuccessValueData(value => ({
          ...value,
          typeFour: StatusPartnershipAgreemen.INIT
        }))
      } 
    )
  }, [])

  return (
    <>
      {successValueData.typeFour !== StatusPartnershipAgreemen.DONE ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={convertToRem(24)}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography cate='body_20' color={home.gray50}>
            동업자가 주식을 경쟁사 등 제3자에게 양도하지 못하게 함으로써 설립 초기 회사의 안정성과 지속 가능성을
            높여주는 주식의 처분 제한 조항을 추가합니다.
          </Typography>
          <Divider sx={{
            background: home.gray50
          }} />
          <TipItemHorizontal
            customSX={{
              padding: '16px 20px 16px 20px'
            }}
            content={
              '주식의 처분 제한 조항이 있다고 해서 주식 처분을 완전히 막을 수는 없습니다. 본 조항을 위반하여 주식을 양도해도 주식을 양수한 제3자는 정당한 주주가 될 수 있습니다. 다만, 이 조항을 넣음으로써 본 조항 위반 시 우선매수권, 공동매도권 권한 행사 및 위약금 부여로 손해를 줄일 수 있습니다.'
            }
          />
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='주식의 처분 제한 기간'
              name='date'
            >
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
              label='주식의 처분 제한 조항 위반에 따른 위약금'
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
            동업자가 주식을 경쟁사 등 제3자에게 양도하지 못하게 함으로써 설립 초기 회사의 안정성과 지속 가능성을
            높여주는 주식의 처분 제한 조항을 추가합니다.
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              주식의 처분 제한 기간
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeFour?.date}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              주식의 처분 제한 조항 위반에 따른 위약금
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeFour?.valuePenalty}
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

export default memo(TypeFour)
