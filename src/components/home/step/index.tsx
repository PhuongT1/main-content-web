'use client'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { ButtonBase, Stack, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useEffect, useMemo, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PracticeResultButton, PreviewButton } from '../button'
import styles from './step.module.scss'
import CheckboxPurbleIcon from '@/assets/icons/checkbox-purble'
import { useParams, usePathname } from 'next/navigation'
import ListSteper from './list-steper'
import Breadcrumb, { IBreadcrumb } from '@/components/breadcrumb'
import PageHeader, { IPageHeaderProps } from '@/components/page-header'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { KEY_PROJECT_DETAIL } from '@/app/(main-routes)/project-home/_modules/presenters/components/project-detail/layout-project-detail'
import { getProjectDetail } from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import { userAtom } from '@/atoms/user'
import { USER_ROLE } from '@/constants/user.constants'
import { IDetailProject, PROJECT_TYPE_ENUM } from '@/app/(main-routes)/project-home/_modules/domain'
// For Dev local
export type Status = 'edit' | 'view'
export interface StepList {
  title?: React.ReactNode
  subtTitle?: React.ReactNode
  description?: React.ReactNode
  isHide?: boolean
}
export interface StepProps {
  stepList: StepList[]
  statusDev?: Status
  active?: number
  breadcrumb?: IBreadcrumb
  pageHeader?: IPageHeaderProps
  onClickResultButton?: () => void
  onClickPreviewButton?: () => void
  onClickNextDeckButton?: () => void
}

const StepItem = ({
  stepList,
  active,
  breadcrumb,
  pageHeader,
  onClickResultButton,
  onClickPreviewButton,
  onClickNextDeckButton
}: StepProps) => {
  console.log('Step server')

  const smDown = useMediaQuery('(max-width: 1500px)')
  const {
    palette: { home }
  } = useTheme()
  const user = useRecoilValue(userAtom)
  const stepRef = useRef<HTMLButtonElement>(null)
  const queryClient = useQueryClient()
  const currentPage = usePathname()
  console.log({ currentPage })
  const { projectId } = useParams<{ projectId: string }>()
  const [activeStep, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)

  const initialDataProjectDetail: IDetailProject | undefined = useMemo(
    () => queryClient.getQueryData([KEY_PROJECT_DETAIL, `${projectId}`]),
    [projectId]
  )
  const dataProjectDetail: any = {}
  // const { data: dataProjectDetail } = useQuery({
  //   queryKey: [KEY_PROJECT_DETAIL, projectId],
  //   queryFn: () => getProjectDetail(projectId),
  //   enabled: !!projectId && !initialDataProjectDetail,
  //   initialData: initialDataProjectDetail
  // })

  const isAdmin = useMemo(() => Boolean(user?.role === USER_ROLE.ADMIN), [user?.role])
  const isView = false
  // const isView = useMemo(() => {
  //   const isCreater =
  //     dataProjectDetail &&
  //     user &&
  //     [PROJECT_TYPE_ENUM.INDIVIDUAL, PROJECT_TYPE_ENUM.GROUP, PROJECT_TYPE_ENUM.CLONE].includes(
  //       dataProjectDetail.type
  //     ) &&
  //     dataProjectDetail.creator.userId === user.id
  //   return !projectId && !(isCreater || isAdmin)
  // }, [isAdmin, user, dataProjectDetail?.type, dataProjectDetail?.creator.userId])
  // Set default active step
  useEffect(() => {
    if (!active) return
    const completedStepTmp: number[] = []
    Array.from({ length: active }, (_item, index) => {
      if (!completeStep.includes(index)) {
        completedStepTmp.push(index)
      }
    })
    setCompleteStep(completedStepTmp)
    setActiveStep(active)
    if (active === stepList.length) {
      setExpandStep((pre) => [...pre, stepList.length - 1])
    }
  }, [active])

  return (
    <>
      {breadcrumb && <Breadcrumb {...breadcrumb} />}
      {pageHeader && <PageHeader {...pageHeader} />}
      <Box component={'div'} display={'flex'}>
        <Stepper className={styles.stepper_layer} nonLinear activeStep={activeStep} orientation='vertical'>
          {stepList.map((_step, index) => (
            <Step
              key={index}
              sx={{
                pointerEvents: completeStep.includes(index) ? 'all' : 'none'
                // backgroundColor: home.gray400
              }}
            >
              <StepLabel
                icon={
                  <ButtonBase ref={stepRef} disableRipple type='button' sx={{ borderRadius: '50%' }}>
                    <Box
                      sx={{
                        color: home.gray200,
                        backgroundColor: home.gray400,
                        '&.active': {
                          color: home.gray500,
                          backgroundColor: home.blue500
                        },
                        '&.complete': {
                          backgroundColor: home.opacity_blue_100,
                          border: `${smDown ? remConvert('2px') : remConvert('4px')} solid ${home.blue500}`
                        }
                      }}
                      className={[
                        styles.step_item,
                        activeStep === index && !isView && 'active',
                        completeStep?.includes(index) && 'complete'
                      ].join(' ')}
                    >
                      {completeStep?.includes(index) ? (
                        <CheckboxPurbleIcon
                          pathProps={{ stroke: home.blue500 }}
                          svgProps={{ width: smDown ? remConvert('20px') : remConvert('26px') }}
                        />
                      ) : (
                        <Box className={styles.number}>0{index + 1}</Box>
                      )}
                    </Box>
                  </ButtonBase>
                }
                className={styles.stepper_layer}
              ></StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box component={'div'} style={{ flex: '1 0', paddingLeft: 40, width: 0 }}>
          <ListSteper stepList={stepList} isView={isView} />
          {completeStep?.includes(stepList.length - 1) && (
            <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ marginTop: remConvert('15px') }}>
              <Stack flexDirection={'row'} gap={'15px'}>
                <PreviewButton onClick={onClickPreviewButton && onClickPreviewButton} />
                <PracticeResultButton onClick={() => onClickResultButton && onClickResultButton()} />
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  )
}

export default StepItem
