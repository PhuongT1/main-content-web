import RadioGroupItem from '@/app/(main-routes)/home/competitor-analysis/_components/table_item/radio'
import { dataDeckActive } from '@/atoms/home/advertisement-marketing'
import { dataStep1Atom, projectIdPartnershipAgreement, successValue, tabId } from '@/atoms/home/partnership-agreement'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { AddButton, DeleteButton, EditButton, SubmitAccordionButton } from '@/components/home/button'
import TipItemHorizontal from '@/components/home/tip-item-horizontal'
import { STEP } from '@/constants/common.constant'
import { EventPartnershipAgreement, StatusPartnershipAgreemen } from '@/constants/partnership-agreement'
import { Divider, PrimaryPillRadio, Typography } from '@/elements'
import Alert from '@/elements/alert'
import InputItem from '@/form/input'
import SelectItem from '@/form/select'
import useToggle from '@/hooks/use-toggle'
import { postStep } from '@/services/step.service'
import { IDataStep02, IFormTypeThree, TValueSelect } from '@/types/partnership-agreement'
import { StatusStep, TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, FormControlLabel, MenuItem, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { DECK_ID } from '../../../../constant'
import { PENALTY_FOR_VIOLATION_OF_THE_MANDATORY_EMPLOYMENT_CLAUSE } from '../type-two/constant'
import { POST_TERMINATION_TYPE_THREE } from './constant'


type TTotalFormTypeThree = Array<Array<{ init: string }>>
interface ITypeThreeProps {
  dataAddtionalContractTerms: IDataStep02
}

const detailSchema = yup.object().shape({
  detail: yup.string()
})

const schema = yup
  .object({
    date: yup.string().required(''),
    valuePenalty: yup.string().required(''),
    permission: yup.string().required('')
  }).shape({
    detail: yup
      .array()
      .of(
        yup.object().shape({
          detailData: yup
            .array()
            .of(detailSchema)
            .max(3)
            .required('')
        })
      )
      .required('')
  })
  .required()

const formOptions = {
  resolver: yupResolver(schema)
}

const TypeThree = ({ dataAddtionalContractTerms }: ITypeThreeProps) => {
  const {
    palette: { home }
  } = useTheme()
  const [dataStep1] = useRecoilState(dataStep1Atom)
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)
  const [showErrorMessageFormThree, setShowErrorMessageFormThree] = useState(false)
  const [totalFormTypeThree, setTotalFormTypeThree] = useState<TTotalFormTypeThree>([])
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [deckActive] = useRecoilState(dataDeckActive)
  const [idTab, setIdTab] = useRecoilState(tabId)
  const [projectId, setProjectId] = useRecoilState(projectIdPartnershipAgreement)
  const PERMISSION = '겸직을 허용한다.'

  const query = useQueryClient()

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setError,
  } = useForm(formOptions)

  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      query.invalidateQueries({ queryKey: ['partnership-contract-step-02'] })
    }
  })

  const onSubmit = (data: IFormTypeThree) => {
    let historyData = dataAddtionalContractTerms || {}
    // historyData.typeThree = data
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
      typeThree: StatusPartnershipAgreemen.DONE
    }))
    setIdTab(data => ({
      ...data,
      status: StatusPartnershipAgreemen.DONE
    }))
    setToggleShowDialog(false)
  }

  const onEdit = () => {
    setSuccessValueData(data => ({
      ...data,
      typeThree: StatusPartnershipAgreemen.PROCESS
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
      valuePenalty: '',
      permission: '',
      detail: []
    }
    // historyData.typeThree = value

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

    setIdTab(value => ({
      ...value,
      status: StatusPartnershipAgreemen.PROCESS
    }))


    setSuccessValueData(data => ({
      ...data,
      typeThree: StatusPartnershipAgreemen.PROCESS
    }))
  }

  const getDetailTypeThreeFormData = () => {
    const value = {
      date: dataAddtionalContractTerms?.typeThree?.date,
      valuePenalty: dataAddtionalContractTerms?.typeThree?.valuePenalty,
      permission: dataAddtionalContractTerms?.typeThree?.permission,
      detail: (dataAddtionalContractTerms?.typeThree.detail).map((e) => ({
        detailData: e?.detailData?.map((e1) => ({
          detail:
            e1?.detail,
        }))
      }))
    }

    reset(value)
  }

  const handleAddOption = (index: number) => {
    let total = totalFormTypeThree?.slice() || []

    if (total[index]?.length < 3) {
      total[index].push({ init: "init" })
      setTotalFormTypeThree(total)
    }

    if (totalFormTypeThree[index].length === 3) {
      setShowErrorMessageFormThree(true)
    }

    setTimeout(() => { setShowErrorMessageFormThree(false) }, 1000)
  }

  useEffect(() => {
    if (dataAddtionalContractTerms?.typeThree) {
      getDetailTypeThreeFormData()
    }
  }, [dataAddtionalContractTerms?.typeThree])

  useEffect(() => {
    if (dataStep1?.data) {
      const newTotalPartnerForm = dataStep1?.data.map((e, index) => (dataAddtionalContractTerms?.typeThree?.detail[index]?.detailData || [{
        init: "init"
      }]).map((e1) => ({
        init: 'init',
      })));

      setTotalFormTypeThree(newTotalPartnerForm)
    }
  }, [dataStep1, dataAddtionalContractTerms?.typeThree]);

  useEffect(() => {
    listenEvent(EventPartnershipAgreement.TAB_3, () => {
        reset()
        setSuccessValueData(value => ({
          ...value,
          typeThree: StatusPartnershipAgreemen.INIT
        }))
      } 
    )
  }, [])

  return (
    <>
      {successValueData.typeThree !== StatusPartnershipAgreemen.DONE ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={convertToRem(24)}
          component={'form'}
          onSubmit={handleSubmit(onSubmit as any)}
        >
          <Typography cate='body_20' color={home.gray50}>
            각 동업자가 회사의 이익을 최우선하고 충돌을 미연에 방지하기 위해 겸직의 금지 조항을 추가합니다. 다만, 동업자
            간의 합의를 통해 겸직을 허용하는 내용을 반영할 수 있습니다.
          </Typography>
          <Divider sx={{
            background: home.gray50
          }} />
          <TipItemHorizontal
            customSX={{
              padding: '16px 20px 16px 20px'
            }}
            content={
              '동업자간 이해충돌이 일어나지 않도록 회사 업무 외 다른 업무가 있다면 겸직 허용 내용을 작성해두는 것이 좋습니다.'
            }
          />
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='계약 종료 이후 동종 및 경쟁업체 종사 금지 기간'
              name='date'
            >
              {POST_TERMINATION_TYPE_THREE.map(
                (e: TValueSelect, index: number) => (
                  <MenuItem key={index} value={e?.value}>
                    {e?.label}
                  </MenuItem>
                )
              )}
            </SelectItem>
          </Box>
          <Box>
            <RadioGroupItem rules={{ required: true }} control={control} name='permission'>
              <Typography display={'flex'} alignItems="center" gap={convertToRem(8)} cate='sub_title_30' color={home.gray50}>
                <Typography color={home.mint500}>*</Typography>겸직 허용 여부
              </Typography>
              <FormControlLabel
                value='겸직을 허용하지 않는다.'
                control={<PrimaryPillRadio />}
                label='겸직을 허용하지 않는다.'
                sx={{
                  borderColor: '#EA3939'
                }}
              />
              <FormControlLabel value='겸직을 허용한다.' control={<PrimaryPillRadio />} label='겸직을 허용한다.' />
            </RadioGroupItem>
          </Box>
          {
            watch('permission') === PERMISSION && totalFormTypeThree?.map((e, index) => {
              return (
                <Box key={`Form_01_${index}`} display={'flex'} flexDirection={'column'} gap={convertToRem(16)}>
                  <Typography cate='link_30' color={home.mint500}>
                    {`동업자 ${index + 1} : ${dataStep1?.data[index]?.name || '-'}`}
                  </Typography>

                  {e.map((e1, index1) => {
                    return (
                      <Box key={`form_${index1}`} display="flex" flexDirection="column">
                        <InputItem
                          control={control}
                          label="겸직 내용"
                          name={`detail.${index}.detailData.${index1}.detail`}
                          textFieldProps={{
                            placeholder: "겸직 내용을 적어주세요."
                          }}
                        />
                        {
                        }
                      </Box>
                    );
                  })}
                  {
                    totalFormTypeThree[index].length === 3 && showErrorMessageFormThree && <Alert sx={{ marginTop: '10px' }} severity='error' >
                      출자내용은 최대 3개까지 추가 가능합니다.
                    </Alert>}
                  <Box display="flex" justifyContent="center" alignItems="flex-end">
                    <AddButton
                      hidden={false}
                      disabled={false}
                      onClick={() => handleAddOption(index)}
                      title="겸직내용 추가"
                      sx={{
                        width: "160px"
                      }}
                    />
                  </Box>
                </Box>
              )
            })
          }
          <Box>
            <SelectItem
              textFieldProps={{ required: true, placeholder: '선택' }}
              control={control}
              label='경업의 금지 조항 위반에 따른 위약금'
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
        </Box >
      ) : (
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(24)}>
          <Typography cate='body_20' color={home.gray50}>
            각 동업자가 회사의 이익을 최우선하고 충돌을 미연에 방지하기 위해 겸직의 금지 조항을 추가합니다. 다만, 동업자
            간의 합의를 통해 겸직을 허용하는 내용을 반영할 수 있습니다.
          </Typography>
          <Divider />
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              계약 종료 이후 동종 및 경쟁업체 종사 금지 기간
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeThree?.date ?? '-'}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='sub_title_30' color={home.gray50}>
              겸직 허용 여부
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeThree?.permission ?? '-'}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
            <Typography cate='body_20' color={home.gray50}>
              경업의 금지 조항 위반에 따른 위약금
            </Typography>
            <Typography cate='body_20' color={home.gray50} marginLeft={convertToRem(14)}>
              {dataAddtionalContractTerms?.typeThree?.valuePenalty ?? '-'}
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

export default memo(TypeThree)
