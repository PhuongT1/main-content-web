'use client'
import FormDivider from '@/components/form-divider'
import { PrimaryCheckbox, Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ContractDetailsForm1 from '../contractDetailsForm1'
import ContractDetailsForm2 from '../contractDetailsForm2'
import ContractDetailsForm3 from '../contractDetailsForm3'
import ContractDetailsForm5 from '../contractDetailsForm5'
import ContractDetailsForm4 from '../contractDetailsForm4'
import ContractDetailsForm6 from '../contractDetailsForm6'
import Contract from '../contract'
import ButtonCustom from '@/elements/button'
import DownloadIcon from '@/assets/icons/download'
import { ModalExportFilePdf } from '@/components/dialog/modal-deck'
import { useDialog } from '@/hooks/use-dialog'
import { StepList } from '@/types/deck.type'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY, SUBMIT_FORM_DATA, getStepDataQueryKey } from '../utils/constants'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  FromGroupData,
  employmentContractDeckActive,
  formGroup1,
  formGroup2,
  formGroup3,
  formGroup4,
  formGroup5,
  formGroup6
} from '@/atoms/home/employment-contract'
import { listenEvent } from '@/utils/events'
import { usePostData } from '../hooks/useEmploymentContract'

interface Step01Props {
  projectId: number
}

interface IResponse {
  data: {
    form1: FromGroupData
    form2: FromGroupData
    form3: FromGroupData
    form4: FromGroupData
    form5: FromGroupData
    form6: FromGroupData
  }
}
const Step01: React.FC<Step01Props> = ({ projectId }) => {
  const { open, onOpen, onClose } = useDialog()
  const {
    palette: { home }
  } = useTheme()
  const setForm1Data = useSetRecoilState(formGroup1)
  const setForm2Data = useSetRecoilState(formGroup2)
  const setForm3Data = useSetRecoilState(formGroup3)
  const setForm4Data = useSetRecoilState(formGroup4)
  const setForm5Data = useSetRecoilState(formGroup5)
  const setForm6Data = useSetRecoilState(formGroup6)
  const { mutation: onSubmitData } = usePostData<object>(projectId)

  const pdfFileRef = useRef<HTMLDivElement>(null)

  const stepQueryInfo: {
    data: StepList<Step01Props>[] | undefined
  } = useQuery({
    queryKey: QUERY_KEY
  })

  const stepDeck = stepQueryInfo.data ? stepQueryInfo.data[0] : undefined

  const stepData = useQuery({
    queryKey: getStepDataQueryKey({
      deckId: stepDeck?.deckId || 0,
      stepId: stepDeck?.id || 1,
      projectId
    }),
    enabled: !!stepDeck
  })

  useEffect(() => {
    const stepDeck = stepQueryInfo.data ? stepQueryInfo.data[0] : undefined

    if (stepDeck) {
      if (stepData && stepData.data && (stepData.data as IResponse).data) {
        const formsData = (stepData.data as IResponse).data
        setForm1Data(formsData.form1)
        setForm2Data(formsData.form2)
        setForm3Data(formsData.form3)
        setForm4Data(formsData.form4)
        setForm5Data(formsData.form5)
        setForm6Data(formsData.form6)
      }
    }
  }, [JSON.stringify(stepData)])

  useEffect(() => {
    listenEvent(SUBMIT_FORM_DATA, (event: any) => {
      if (event.detail) {
        onSubmitData(event.detail)
      }
    })
  }, [])

  return (
    <>
      <Typography cate='title_60_bold' color={home.gray50} margin={remConvert('60px 0 20px')}>
        근로계약서
      </Typography>
      <Box display={'flex'} flexDirection={'row'} gap={remConvert('40px')}>
        <Box display={'flex'} flexDirection={'column'} gap={remConvert('20px')} width={'100%'} height={'100%'}>
          <Box>
            <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
              <ButtonCustom
                variant='outlined'
                customSize='sm'
                title='PDF 다운로드'
                startIcon={<DownloadIcon pathProps={{ stroke: 'currentColor' }} />}
                sx={{
                  borderColor: home.blue500,
                  color: home.blue500,
                  backgroundColor: home.alpha_blue_10,
                  padding: remConvert('18px 16px'),
                  '&:hover': {
                    borderColor: home.blue500
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                    borderColor: home.blue500,
                    color: home.blue500,
                    backgroundColor: home.alpha_blue_10
                  }
                }}
                onClick={onOpen}
                // disabled={true}
              />
            </Box>
          </Box>
          <Box
            component={'div'}
            sx={{
              borderRadius: remConvert('10px'),
              background: '#fff'
            }}
            ref={pdfFileRef}
          >
            <Contract />
          </Box>
        </Box>
        <Box
          component={'div'}
          minWidth={remConvert('360px')}
          maxWidth={remConvert('360px')}
          display={'flex'}
          gap={remConvert('20px')}
          padding={remConvert('20px')}
          flexDirection={'column'}
          sx={{
            borderRadius: remConvert('10px'),
            background: home.gray400
          }}
        >
          <Box display={'flex'} flexDirection={'column'} gap={'5px'} alignItems={'center'}>
            <Typography cate='sub_title_30' color={home.gray50}>
              계약 내용 추가
            </Typography>
            <Typography cate='sub_title_30' color={home.gray100}>
              계약서에 넣고 싶은 조항을 추가해보세요.
            </Typography>
          </Box>
          <FormDivider />
          <ContractDetailsForm1 />
          <ContractDetailsForm2 />
          <ContractDetailsForm3 />
          <ContractDetailsForm4 />
          <ContractDetailsForm5 />
          <ContractDetailsForm6 />
        </Box>
      </Box>
      <ModalExportFilePdf
        title='동업계약서 PDF 다운로드'
        description={
          <Box display={'flex'} flexDirection={'column'} gap={remConvert('10px')}>
            <Typography cate='body_3' color={home.gray100}>
              이 계약서의 사용으로 발생하는 분쟁 및 기타 손해에 대해서, 메인콘텐츠와 슘페터는 법적인 책임을 지지
              않습니다. 이 계약서는 참고자료로만 활용해야 하며, 최종 계약서를 작성하기 위해서는 법률 전문가의 도움을
              받는 것이 권장됩니다.
            </Typography>
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={remConvert('10px')}
              justifyContent={'flex-end'}
              alignItems={'center'}
            >
              <PrimaryCheckbox />
              <Typography cate='body_3' color={home.base_gray50}>
                확인하였습니다.
              </Typography>
            </Box>
          </Box>
        }
        onExportFilePdf={onClose}
        open={open}
        onCancel={onClose}
        refFilePdf={pdfFileRef}
      />
    </>
  )
}

export default Step01
