'use client'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import ChevronUpAccordion from '@/assets/icons/chevrons/chevron-up-accordion'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { IconButton, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useRecoilState } from 'recoil'
import styles from './step.module.scss'
import { StepList } from '.'
import { DELETE_ON_DOWNLOAD_PDF } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'

export interface ListStepProps {
  stepList: StepList[]
  isView?: boolean
  isDownloadPDF?: boolean
}

const ListSteper = ({ stepList, isView, isDownloadPDF }: ListStepProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

  const [activeStep] = useRecoilState(activeStepSelector)
  const [expandStep, setExpandStep] = useRecoilState(expandStepSelector)
  const [completeStep] = useRecoilState(completeStepSelector)

  console.log({ completeStep, expandStep })

  const handleAddExpandStep = (step: number) => () => {
    // Cannot click if step not complete
    if (!expandStep.includes(step)) {
      setExpandStep((pre) => [...pre, step])
    } else {
      const removeExpand = expandStep.filter((item) => item !== step)
      setExpandStep(removeExpand)
    }
  }

  return (
    <Stepper
      sx={{
        '>.Mui-completed': {
          backgroundColor: home.gray400,
          '.label-complete': {
            backgroundColor: 'transparent'
          }
        },
        '&.isView .deleteOnDownloadPdf': {
          display: 'none !important'
        }
      }}
      className={[styles.stepper_layer_right, styles.stepper_layer, isView && 'isView'].join(' ')}
      activeStep={activeStep}
      orientation='vertical'
    >
      {stepList.map((step, index) => (
        <Step
          key={index}
          className={[(activeStep === index || expandStep.includes(index) || isDownloadPDF) && styles.active_step].join(
            ' '
          )}
          completed={completeStep?.includes(index) || isView ? true : false}
          expanded={isView || expandStep.includes(index)}
          sx={{
            display: step.isHide ? 'none' : '',
            breakInside: 'avoid-page',
            backgroundColor: completeStep?.includes(index) || isView ? home.gray400 : 'transparent'
          }}
        >
          <StepLabel onClick={handleAddExpandStep(index)} icon={<></>}>
            <Box component={'div'} sx={{ color: home.mint500 }} className={styles.step_label}>
              <Box
                component={'p'}
                sx={{
                  backgroundColor: home.gray300
                }}
                className={`label-complete ${styles.step_desk}`}
              >
                {step.title}
              </Box>
              <Box component={'div'} className={styles.layer_title}>
                <Box component={'h3'} sx={{ fontSize: remConvert('24px'), color: home.gray50 }} width={1}>
                  {step.subtTitle}
                </Box>
                <Box
                  component={'div'}
                  sx={{ color: home.gray50 }}
                  className={[styles.expand, DELETE_ON_DOWNLOAD_PDF].join(' ')}
                >
                  {!expandStep.includes(index) ? (
                    <>
                      {dict.common_expand}
                      <IconButton>
                        <ChevronDownIcon stroke={home.gray50} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      {dict.common_fold}
                      <IconButton>
                        <ChevronUpAccordion stroke={home.gray50} />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </StepLabel>
          <StepContent className={styles.stepper_content}>
            <Box component={'div'} sx={{ color: home.gray50 }}>
              {!(completeStep[index] || completeStep[index] === 0) && isView ? <>view</> : step.description}
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

export default ListSteper
