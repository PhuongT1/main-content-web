'use client'
import Home from '@/assets/icons/home'
import MenuIcon from '@/assets/icons/team-building/menu'
import DownloadTrade from '@/assets/icons/trade/download-trade'
import { completeStepSelector } from '@/atoms/home/stepper'
import { NextDeckButton, PracticeResultButton } from '@/components/home/button'
import { StepList } from '@/components/home/step'
import { DELETE_ON_DOWNLOAD_PDF, STEP } from '@/constants/common.constant'
import { DEFAULT_STEP_TRADE } from '@/constants/trade.constant'
import { Divider, GraySolidIconButton, Typography } from '@/elements'
import { gray_dark_home } from '@/themes/system-palette'
import { DeckProject } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { ButtonBase, Step, StepContent, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRecoilState } from 'recoil'
import TradeStep1 from './step_01'
import TradeStep2 from './step_02'
import styles from './trade.module.scss'
import CheckboxPurbleIcon from '@/assets/icons/checkbox-purble'
import { dataTrade } from '@/atoms/home/trade'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import PageHeader from '@/components/page-header'
import { FC } from 'react'
interface Props {
  projectId: number
}
const TradePage: FC<Props> = ({ projectId }) => {
  const deckID: DeckProject = { deckId: DEFAULT_STEP_TRADE.deckId }
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [{ tradeBrand }] = useRecoilState(dataTrade)
  const smDown = useMediaQuery('(max-width: 1500px)')
  const {
    palette: { home }
  } = useTheme()
  // const setDataTrade = useSetRecoilState(dataTrade)
  // const { data } = useQuery({
  //   queryKey: [`step-list-trade`, deckID],
  //   queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
  //   meta: {
  //     offLoading: true
  //   }
  // })

  // useEffect(() => {
  //   if (data) {
  //     setCompleteStep((pre) => {
  //       if (!pre.includes(STEP.STEP_TWO)) {
  //         return [...pre, STEP.STEP_TWO]
  //       }
  //       return pre
  //     })
  //     setDataTrade({
  //       tradeBrand: { deckId: data[0].deckId, stepId: data[0].id } as StepActivity<any>,
  //       tradeCopyBrand: { deckId: data[1].deckId, stepId: data[1].id } as StepActivity<any>
  //     })
  //   }
  // }, [data])

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '상표출원' }
  ]

  return (
    <Box component={'div'} bgcolor={home.gray500}>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title='상표출원' />
      <Box component={'div'} display={'flex'} className={DELETE_ON_DOWNLOAD_PDF} bgcolor={home.gray500}>
        <Stepper className={styles.stepper_layer} nonLinear orientation='vertical'>
          <Step
            sx={{
              pointerEvents: 'all'
            }}
            // onClick={() => {
            //   setActiveStep(index)
            // }}
          >
            <StepLabel
              icon={
                <ButtonBase disableRipple type='button' sx={{ borderRadius: '50%' }}>
                  <Box
                    sx={{
                      color: home.gray200,
                      backgroundColor: home.gray400,
                      '&.active': {
                        color: home.gray500,
                        backgroundColor: home.blue500
                      },
                      '&.complete': {
                        backgroundColor: home.alpha_blue_10,
                        border: `${smDown ? remConvert('2px') : remConvert('4px')} solid ${home.blue500}`
                      }
                    }}
                    className={[styles.step_item, 'active', !!tradeBrand?.data && 'complete'].join(' ')}
                  >
                    {!!tradeBrand?.data ? (
                      <CheckboxPurbleIcon
                        pathProps={{ stroke: home.blue500 }}
                        svgProps={{ width: smDown ? remConvert('20px') : remConvert('26px') }}
                      />
                    ) : (
                      <Box className={styles.number}>1</Box>
                    )}
                  </Box>
                </ButtonBase>
              }
              className={styles.stepper_layer}
            ></StepLabel>
          </Step>
          <Step
            sx={{
              pointerEvents: 'all'
            }}
            // onClick={() => {
            //   setActiveStep(index)
            // }}
          >
            <StepLabel
              icon={
                <ButtonBase disableRipple type='button' sx={{ borderRadius: '50%' }}>
                  <Box
                    sx={{
                      color: home.gray200,
                      backgroundColor: home.gray400,
                      '&.active': {
                        color: home.gray500,
                        backgroundColor: home.blue500
                      },
                      '&.complete': {
                        backgroundColor: home.alpha_blue_10,
                        border: `${smDown ? remConvert('2px') : remConvert('4px')} solid ${home.blue500}`
                      }
                    }}
                    className={[styles.step_item, 'active', completeStep.includes(STEP.STEP_TWO) && 'complete'].join(
                      ' '
                    )}
                  >
                    {completeStep.includes(STEP.STEP_TWO) ? (
                      <CheckboxPurbleIcon
                        pathProps={{ stroke: home.blue500 }}
                        svgProps={{ width: smDown ? remConvert('20px') : remConvert('26px') }}
                      />
                    ) : (
                      <Box className={styles.number}>2</Box>
                    )}
                  </Box>
                </ButtonBase>
              }
              className={styles.stepper_layer}
            ></StepLabel>
          </Step>
        </Stepper>
        <Box component={'div'} style={{ flex: '1 0', paddingLeft: 40 }}>
          <Stepper
            sx={{
              '>.Mui-completed': {
                backgroundColor: home.gray400,
                '.label-complete': {
                  backgroundColor: 'transparent'
                }
              }
            }}
            className={[styles.stepper_layer_right, styles.stepper_layer].join(' ')}
            orientation='vertical'
          >
            <Step
              className={[styles.active_step].join(' ')}
              completed={true}
              // completed={completeStep?.includes(index) || statusDev === 'view' ? true : false}
              expanded={true}
            >
              <StepLabel icon={<></>}>
                <Box component={'div'} sx={{ color: home.mint500 }} className={styles.step_label}>
                  <Box
                    component={'p'}
                    sx={{
                      backgroundColor: home.gray300
                    }}
                    className={`label-complete ${styles.step_desk}`}
                  >
                    {`Step 1`}
                  </Box>
                  <Box component={'div'} className={styles.layer_title}>
                    <Box component={'h3'} sx={{ fontSize: remConvert('24px'), color: home.gray50 }} width={1}>
                      {`상표 검색`}
                    </Box>
                    {/* {!expandStep.includes(index) ? (
                      <Box component={'div'} sx={{ color: home.gray50 }} className={styles.expand}>
                        펼치기
                        <IconButton>
                          <ChevronDownIcon stroke={home.gray50} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box component={'div'} sx={{ color: home.gray50 }} className={styles.expand}>
                        접기
                        <IconButton>
                          <ChevronUpAccordion stroke={home.gray50} />
                        </IconButton>
                      </Box>
                    )} */}
                  </Box>
                </Box>
              </StepLabel>
              <StepContent
                className={styles.stepper_content}
                sx={{
                  padding: 0,
                  '.Mui-completed': {
                    padding: 0
                  }
                }}
              >
                <Box component={'div'}>
                  <TradeStep1 projectId={projectId} />
                </Box>
              </StepContent>
            </Step>
          </Stepper>
          {/* {completeStep?.includes(stepList.length - 1) && (
            <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ marginTop: remConvert('15px') }}>
              <Stack flexDirection={'row'} gap={'15px'}>
                <PreviewButton onClick={onClickPreviewButton && onClickPreviewButton} />
                <PracticeResultButton onClick={() => onClickResultButton && onClickResultButton()} />
              </Stack>
              <NextDeckButton onClick={() => onClickNextDeckButton && onClickNextDeckButton()} />
            </Stack>
          )} */}
        </Box>
      </Box>
      <Box component={'div'} display={'flex'}>
        <Stepper
          className={[styles.stepper_layer, DELETE_ON_DOWNLOAD_PDF].join(' ')}
          nonLinear
          orientation='vertical'
          sx={{ opacity: 0, paddingRight: remConvert('40px') }}
        >
          <Step
            sx={{
              pointerEvents: 'all'
            }}
            // onClick={() => {
            //   setActiveStep(index)
            // }}
          >
            <StepLabel
              icon={
                <ButtonBase disableRipple type='button' sx={{ borderRadius: '50%' }}>
                  <Box
                    sx={{
                      color: home.gray200,
                      backgroundColor: home.gray400,
                      '&.active': {
                        color: home.gray500,
                        backgroundColor: home.blue500
                      },
                      '&.complete': {
                        backgroundColor: home.alpha_blue_10,
                        border: `${smDown ? remConvert('2px') : remConvert('4px')} solid ${home.blue500}`
                      }
                    }}
                    className={[styles.step_item, 'active', completeStep.includes(STEP.STEP_TWO) && 'complete'].join(
                      ' '
                    )}
                  >
                    {completeStep.includes(STEP.STEP_TWO) ? (
                      <CheckboxPurbleIcon
                        pathProps={{ stroke: home.blue500 }}
                        svgProps={{ width: smDown ? remConvert('20px') : remConvert('26px') }}
                      />
                    ) : (
                      <Box className={styles.number}>2</Box>
                    )}
                  </Box>
                </ButtonBase>
              }
              className={styles.stepper_layer}
            ></StepLabel>
          </Step>
        </Stepper>
        <Box
          component={'div'}
          style={{ flex: '1 0', minWidth: completeStep.includes(STEP.STEP_TWO) ? 'unset' : '90%' }}
        >
          <Stepper
            sx={{
              '>.Mui-completed': {
                backgroundColor: home.gray400,
                '.label-complete': {
                  backgroundColor: 'transparent'
                }
              }
              // backgroundColor: home.gray400,
              // borderRadius: 2.5,
              // p: 3,
              // pb: 5,
              // mt: 2.5
            }}
            className={[styles.stepper_layer_right, styles.stepper_layer].join(' ')}
            orientation='vertical'
          >
            <Step
              className={[styles.active_step].join(' ')}
              completed={true}
              // completed={completeStep?.includes(index) || statusDev === 'view' ? true : false}
              expanded={true}
            >
              <StepLabel icon={<></>}>
                <Box component={'div'} sx={{ color: home.mint500 }} className={styles.step_label}>
                  <Box
                    component={'p'}
                    sx={{
                      backgroundColor: home.gray300
                    }}
                    className={`label-complete ${styles.step_desk}`}
                  >
                    {`Step 2`}
                  </Box>
                  <Box component={'div'} className={styles.layer_title}>
                    <Box component={'h3'} sx={{ fontSize: remConvert('24px'), color: home.gray50 }} width={1}>
                      {`상표출원 시뮬레이션`}
                    </Box>
                  </Box>
                </Box>
              </StepLabel>
              <StepContent className={styles.stepper_content}>
                <Box component={'div'}>
                  <TradeStep2 projectId={projectId} />
                </Box>
              </StepContent>
            </Step>
          </Stepper>
          <Box
            className={DELETE_ON_DOWNLOAD_PDF}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2.5
            }}
          >
            {completeStep.includes(STEP.STEP_TWO) ? (
              <Box display='flex' gap={2.5}>
                <PracticeResultButton />
                <GraySolidIconButton btnSize='p4' sx={{ py: 2.25, px: 2, borderRadius: '10px' }}>
                  <DownloadTrade />
                  <Typography cate='button_2_semibold' ml={0.75}>
                    ‘직접 출원’ 방법 PDF 다운로드
                  </Typography>
                </GraySolidIconButton>
              </Box>
            ) : (
              <Box />
            )}
            <NextDeckButton />
          </Box>
        </Box>
      </Box>
      {/* <StepItem stepList={steps} /> */}
    </Box>
  )
}
export default TradePage
