import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import SectionTitle from '../../section-title'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { step1, step2, step3, step4 } from '@/atoms/logo'
import CardOption from '../../card-option'
import { Typography } from '@/elements'
import styles from './step_02_result.module.scss'
import { EditButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Image from 'next/image'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'

const Step02Result = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const data: any = useRecoilValue(step2)
  const data1 = useRecoilValue(step1)

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)

  const {
    palette: { home }
  } = useTheme()

  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setDataStep3]: any = useRecoilState(step3)
  const [, setDataStep4]: any = useRecoilState(step4)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setDataStep3([])
    setDataStep4({})
    setActiveStep(STEP.STEP_TWO)
  }

  return (
    <Box
      pt={convertToRem(60)}
      mt={convertToRem(60)}
      pb={convertToRem(40)}
      sx={{ borderTop: `1px solid ${home.gray200}` }}
    >
      <Box sx={{ marginBottom: '20px' }}>
        <SectionTitle maintitle='레퍼런스 로고' subTitle='' />
      </Box>
      <Box
        component={'div'}
        sx={{
          padding: '20px 24px',
          borderRadius: '10px',
          backgroundColor: home.gray300
        }}
      >
        <Box>
          <Grid container spacing={2}>
            {data.map((symbol: any, index: number) => {
              return (
                <Grid key={index} item xs={3}>
                  <CardOption
                    backgroundColorDefault={'white'}
                    backgroundColorActive={'white'}
                    active={false}
                    boxShadowWidth='4px'
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'end' }}></Box>
                      <Box
                        sx={{
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                      >
                        <Image src={symbol.url} width={50} height={50} alt='' />
                        <Typography component={'span'} cate='sub_title_30' color={'#090A0B'}>
                          {data1.ideaSection.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardOption>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>
      <Stack sx={{ marginTop: '60px' }} flexDirection={'row'} justifyContent={'center'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step02Result
