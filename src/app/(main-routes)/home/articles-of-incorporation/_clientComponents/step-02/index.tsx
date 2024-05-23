import { ChevronRightIcon } from '@/assets/icons'
import CommentIcon from '@/assets/icons/card-news/comment'
import DownloadIcon from '@/assets/icons/download'
import { projectIdArticleOfIncorporation, successValue } from '@/atoms/home/articles-of-incorporation'
import { dataDeckActive } from '@/atoms/home/idea'
import { ButtonItem, PracticeResultButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { GraySolidIconButton, PrimaryCheckbox, Typography } from '@/elements'
import { getStep } from '@/services/step.service'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { getPageStyle } from '@/utils/spacing-file-pdf'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useDialog } from '@/hooks/use-dialog'
import ReactToPrint from 'react-to-print'
import { useRecoilState } from 'recoil'
import { DECK_ID } from '../constant'
import AccordionFormViewArticlesOfIncorporation from './components/accordion-form-view/index'
import ViewPdf from './components/view-pdf'
import { articlesOfIncorporation } from '@/constants/articles-of-incorporation'
import { ModalExportFilePdf } from '@/components/dialog/modal-deck'

const ViewArticlesOfIncorporationPage = () => {
  const {
    palette: { home, main }
  } = useTheme()

  const refFilePdf = useRef<HTMLElement>(null)
  const [deckActive] = useRecoilState(dataDeckActive)
  const [projectId, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)
  const { open, onClose, onOpen } = useDialog()
  const [successValueData, setSuccessValueData] = useRecoilState(successValue)

  const handleSubmit = () => {
    return refFilePdf.current
  }
  const disabledButton = Object.entries(successValueData).some(([key, value]) => value === articlesOfIncorporation.DONE)

  const { data: dataAddtionalContractTerms, isLoading: isLoadingDataStep } = useQuery({
    queryKey: [`articles-of-incorporation-step-02`],
    queryFn: () =>
      getStep({ projectId: projectId, deckId: DECK_ID, stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2) }),
    staleTime: 0,
    meta: {
      offLoading: true
    }
  })

  return (
    <Box marginTop={convertToRem(60)}>
      <Typography cate='title_60_bold' color={home.gray50} marginBottom={convertToRem(20)}>
        법인정관
      </Typography>
      <Box display={'flex'} flexDirection={'row'} gap={convertToRem(40)}>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(20)} width={'100%'} height={'100%'}>
          <Box>
            <Box display={'flex'} width={'100%'} justifyContent={'flex-end'}>
              <GraySolidIconButton
                btnSize='fit'
                disabled={!disabledButton}
                onClick={onOpen}
                sx={{
                  padding: convertToRem(20),
                  borderRadius: convertToRem(10),
                  border: '1px solid #3C82F9',
                  backgroundColor: home.alpha_blue_10,
                  display: 'flex',
                  height: convertToRem(44),
                  opacity: !disabledButton ? 0.5 : 1,
                  flexDirection: 'row',
                  gap: convertToRem(12)
                }}
              >
                <DownloadIcon svgProps={{ width: 24, height: 24 }} pathProps={{ stroke: home.blue500 }} />
                <Typography cate='button_2_semibold' color={home.blue500}>
                  PDF 다운로드
                </Typography>
              </GraySolidIconButton>
            </Box>
          </Box>
          <Box component={'div'} ref={refFilePdf}>
            <ViewPdf dataAddtionalContractTerms={dataAddtionalContractTerms as unknown as TStepPayload<TStepApi>} />
          </Box>
        </Box>
        <Box component={'div'} minWidth={convertToRem(360)}>
          <AccordionFormViewArticlesOfIncorporation
            dataAddtionalContractTerms={dataAddtionalContractTerms as unknown as TStepPayload<TStepApi>}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        width='100%'
        sx={{ marginTop: convertToRem(44) }}
      >
        <ButtonItem
          endIcon={<ChevronRightIcon pathProps={{ stroke: home.gray500 }} />}
          sx={{
            color: home.gray500,
            backgroundColor: main.blue,
            lineHeight: convertToRem('20px'),
            '&:hover': {
              bgcolor: 'main_primary.blue300'
            }
          }}
          variant='contained'
        >
          다음 Deck으로 이동
        </ButtonItem>
      </Box>
      <ModalExportFilePdf
        title='동업계약서 PDF 다운로드'
        description={
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
            <Typography cate='body_3' color={home.gray100}>
              이 계약서의 사용으로 발생하는 분쟁 및 기타 손해에 대해서, 메인콘텐츠와 슘페터는 법적인 책임을 지지
              않습니다. 이 계약서는 참고자료로만 활용해야 하며, 최종 계약서를 작성하기 위해서는 법률 전문가의 도움을
              받는 것이 권장됩니다.
            </Typography>
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={convertToRem(10)}
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
        refFilePdf={refFilePdf}
      />
    </Box>
  )
}

export default ViewArticlesOfIncorporationPage
