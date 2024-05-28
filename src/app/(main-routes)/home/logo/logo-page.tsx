'use client'

import { Box, useTheme } from '@mui/material'
import Step01 from './step_01'
import StepItem, { StepList } from '@/components/home/step'
import localFont from 'next/font/local'
import Step02 from './step_02'
import Step03 from './step_03'
import Step04 from './step_04'
import Button from '@mui/material/Button'
import Home from '@/assets/icons/home'
import MenuIcon from '@/assets/icons/team-building/menu'
import styles from './logo.module.scss'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import Layout_IR_Teambuilding from '../teambuilding/IR-deck'
import LogoIRLayouts from './IR-deck'
import { useQuery } from '@tanstack/react-query'
import { getAllActiveStep } from '@/services/deck.service'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { step1, step2, step3, step4 } from '@/atoms/logo'
import { DataStep1 } from '@/types/logo.type'
import { DeckProjectId, StepProject } from '@/types/deck.type'

const nanum = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/nanum/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanum/ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanum/Light.otf',
      weight: '350'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanum/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-nanum'
})

const nanummyeongjo = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-nanummyeongjo'
})

const nunumsquare = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/nunumsquare/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/nunumsquare/ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../../../../../public/fonts/deck-06/nunumsquare/Regular.otf',
      weight: '400'
    },
    {
      path: '../../../../../public/fonts/deck-06/nunumsquare/Heavy.otf',
      weight: '900'
    },
    {
      path: '../../../../../public/fonts/deck-06/nunumsquare/Light.otf',
      weight: '350'
    }
  ],
  variable: '--font-nunumsquare'
})

const maplestory = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/maplestory/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/maplestory/Light.otf',
      weight: '350'
    }
  ],
  variable: '--font-maplestory'
})

const classic = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/classic/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/classic/Light.otf',
      weight: '350'
    },
    {
      path: '../../../../../public/fonts/deck-06/classic/Medium.otf',
      weight: '500'
    }
  ],
  variable: '--font-classic'
})

const swagger = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/swagger/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-swagger'
})

const chosun = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/chosun/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-chosun'
})

const score = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/score/Black.otf',
      weight: '900'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/ExtraLight.otf',
      weight: '200'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Heavy.otf',
      weight: '900'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Light.otf',
      weight: '300'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Medium.otf',
      weight: '500'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Regular.otf',
      weight: '400'
    },
    {
      path: '../../../../../public/fonts/deck-06/score/Thin.otf',
      weight: '100'
    }
  ],
  variable: '--font-score'
})

const gmarket = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/gmarket/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/gmarket/Light.otf',
      weight: '300'
    },
    {
      path: '../../../../../public/fonts/deck-06/gmarket/Medium.otf',
      weight: '500'
    }
  ],
  variable: '--font-gmarket'
})

const bookk = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/bookk/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/bookk/Light.otf',
      weight: '300'
    }
  ],
  variable: '--font-bookk'
})

const ya = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/ya/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/ya/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-ya'
})
const jalnan = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/jalnan/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-jalnan'
})

const LogoPage = ({ projectId }: any) => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [, setDataStep1] = useRecoilState(step1)
  const [, setDataStep2] = useRecoilState(step2)
  const [, setDataStep3] = useRecoilState(step3)
  const [, setDataStep4] = useRecoilState(step4)

  const { data } = useQuery({
    queryKey: ['data-all-step-deck', { deckId: 6, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    staleTime: 0
  })

  useEffect(() => {
    // if (data?.length) {
    //   setDataStep1((data[0]?.data as DataStep1) || {})
    //   setDataStep2((data[1]?.data as any) || [])
    //   setDataStep3((data[2]?.data as any) || [])
    //   setDataStep4((data[3]?.data as any) || {})
    // }
  }, [data])

  const steps: StepList[] = [
    {
      title: 'step 1',
      subtTitle: '로고 방향성',
      description: <Step01 />
    },
    {
      title: 'Step 2',
      subtTitle: '레퍼런스 로고',
      description: <Step02 />
    },
    {
      title: 'Step 3',
      subtTitle: '로고 디자인',
      description: <Step03 />
    },
    {
      title: 'Step 4',
      subtTitle: '최종 로고',
      description: <Step04 />
    }
  ]
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      component={'div'}
      sx={{ backgroundColor: home.gray500 }}
      // className={`${jalnan.variable} ${ya.variable} ${bookk.variable} ${gmarket.variable} ${score.variable} ${chosun.variable} ${nanum.variable} ${nanummyeongjo.variable} ${nunumsquare.variable} ${maplestory.variable} ${classic.variable} ${swagger.variable}`}
    >
      <Box component={'div'} className={styles.header_title} sx={{ borderBottom: `1px solid ${home.gray200}` }}>
        <Box component={'div'} className={styles.title}>
          <Box component={'h2'} style={{ marginLeft: '15px' }}>
            로고
          </Box>
        </Box>
        <Box component={'div'} className={styles.right_title}>
          <Button startIcon={<Home stroke='#ffffff' />}>프로젝트 Home</Button>
          <Button startIcon={<MenuIcon />}>리스트</Button>
        </Box>
      </Box>
      <StepItem
        active={data?.length}
        stepList={steps}
        onClickPreviewButton={() => {
          setToggleShowDialog(true)
        }}
      />

      <ModalIR
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => {
          setToggleShowDialog(false)
        }}
      >
        <LogoIRLayouts />
      </ModalIR>
    </Box>
  )
}

export default LogoPage
