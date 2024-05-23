'use client'
import AdvertisementMarketingPage from '@/app/(main-routes)/home/advertisement-marketing'
import BusinessModel from '@/app/(main-routes)/home/business-model/[projectId]'
import CompetitorAnalysisPage from '@/app/(main-routes)/home/competitor-analysis'
import CustomerServicePage from '@/app/(main-routes)/home/customer-service/_clientComponents'
import IdeaPage from '@/app/(main-routes)/home/idea/_clientComponents'
import LogoPage from '@/app/(main-routes)/home/logo/logo-page'
import NammingPage from '@/app/(main-routes)/home/naming/_clientComponents'
import ProfitStructurePage from '@/app/(main-routes)/home/profit-structure'
import SloganPage from '@/app/(main-routes)/home/slogan/_clientComponents/slogan'
import SwotPage from '@/app/(main-routes)/home/swot/_clientComponents/swot/swot'
import TeamBuildingPage from '@/app/(main-routes)/home/teambuilding/step-list'
import TradePage from '@/app/(main-routes)/home/trade/_clientComponents'
import { completeStepSelector } from '@/atoms/home/stepper'
import { DELETE_ON_DOWNLOAD_PDF } from '@/constants/common.constant'
import { getDesignTokens } from '@/themes/get-design-tokens'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, ThemeProvider, createTheme, useTheme } from '@mui/material'
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useRecoilState } from 'recoil'
import { ProjectDeckItem, IDetailProject, PROJECT_ID_DECK_ENUM } from '@/app/(main-routes)/project-home/_modules/domain'
import { loadingProjectAtom } from '../loading-project-detail'
import CardNewsPage from '@/app/(main-routes)/home/card-news/_clientComponents'
import PressRelease from '@/app/(main-routes)/home/press-release/_clientComponent'
import StepListPartnershipContract from '@/app/(main-routes)/home/partnership-agreement/components/step-list'
import ArticlesOfNcorporationPage from '@/app/(main-routes)/home/articles-of-incorporation/_clientComponents'
import EmploymentContractPage from '@/app/(main-routes)/home/employment-contract/[projectId]/page'
import StepsWrapper from '@/app/(main-routes)/home/employment-contract/stepsWrapper'
import ShareholderListPage from '@/app/(main-routes)/home/shareholder-list/_clientComponents'
import SurveyPage from '@/app/(main-routes)/home/survey/_clientComponents/survey'
// import { DEFAULT_STEP_SURVEY } from '@/constants/survey.constant'

interface Props {
  dataProject: IDetailProject
  listDeck: ProjectDeckItem[]
  onAfterPrint?: () => void
}
const DowloadPDFDeck: FC<Props> = ({ dataProject, listDeck, onAfterPrint }) => {
  const {
    palette: { home }
  } = useTheme()
  const iframeDowloadPDFRef = useRef<HTMLIFrameElement>(null)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [isloading, setLoading] = useRecoilState(loadingProjectAtom)
  const [index, setIndex] = useState(listDeck.length >= 1 ? 1 : listDeck.length)

  const nameOfPDF = useMemo(() => {
    if (listDeck.length === 1) {
      return `${dataProject.name}_${listDeck[0].name}`
    } else return dataProject.name
  }, [dataProject.name, listDeck])

  const dowloadPDF = useReactToPrint({
    content: () => iframeDowloadPDFRef.current,
    documentTitle: nameOfPDF,
    onAfterPrint() {
      console.log('onAfterPrint')
      setLoading(false)
      onAfterPrint && onAfterPrint()
    },
    onBeforeGetContent() {
      setCompleteStep(Array.from(Array(100), (_, index) => index - 1 + 1))
    },
    trigger() {
      return <a href='#'>Print this out!</a>
    },
    pageStyle: () => `
    @media print {
      html, body {
        zoom: 80%;
        -webkit-print-color-adjust: initial;
        .${DELETE_ON_DOWNLOAD_PDF} {
          display: none !important;
        }
      }
      .page-break {
        margin-top: 0.5rem;
        display: block;
        page-break-before: auto;
      }
    }
    @page {
      size: auto;
      margin-block: 7mm;
      }`
  })

  const refTime = useRef<NodeJS.Timeout>()
  const onPageLoad = useCallback(() => {
    clearTimeout(refTime.current)
    refTime.current = setTimeout(() => {
      setTimeout(() => {
        if (index >= listDeck.length) {
          listDeck.length > 0 && dowloadPDF()
        } else setIndex((prew) => prew + 1)
      }, 2000)
    }, 4000)
  }, [listDeck.length])

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((getEntries) => {
        if (!getEntries.name.includes('metrics-in-new.cometchat.io')) {
          onPageLoad()
        }
      })
    })
    observer.observe({ type: 'resource', buffered: true })
  }, [document?.readyState, listDeck.length])

  useEffect(() => {
    !!listDeck.length && !isloading && setLoading(true)
    return () => setLoading(false)
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens('light')
      }),
    []
  )

  const itemsToRender = useMemo(() => listDeck.slice(0, index), [index])
  console.log('step', index, listDeck, itemsToRender)
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '100%',
        left: 0,
        width: '1208px',
        opacity: 0
      }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: remConvert('20px'),
            width: '100%',
            color: home.gray500
          }}
          ref={iframeDowloadPDFRef}
        >
          {!!listDeck.length &&
            itemsToRender.map((data) => {
              switch (data.id) {
                case PROJECT_ID_DECK_ENUM.TeamBuilding:
                  return <TeamBuildingPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.Idea4:
                  return <IdeaPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.Naming:
                  return <NammingPage key={data.id} projectId={dataProject.id} />
                case PROJECT_ID_DECK_ENUM.TradeApply:
                  return <TradePage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.Slogan:
                  return <SloganPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.Logo:
                  return <LogoPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.CompetitorAnalysis:
                  return <CompetitorAnalysisPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.SWOT:
                  return <SwotPage key={data.id} projectId={dataProject.id} />
                case PROJECT_ID_DECK_ENUM.CustomerPersona:
                  return <CustomerServicePage key={data.id} projectId={dataProject.id} />
                case PROJECT_ID_DECK_ENUM.EstabilshmentOfStructure:
                  return <ProfitStructurePage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.PRMarketing:
                  return <AdvertisementMarketingPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.BusinessModel:
                  return <BusinessModel projectId={0} key={data.id} /> //TODO: Need replace with real projectId
                case PROJECT_ID_DECK_ENUM.CardNews: //TODO
                  return <CardNewsPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.ReportDocument: //TODO
                  return <PressRelease id={`${dataProject.id}`} key={data.id} />
                case PROJECT_ID_DECK_ENUM.PartnershipAgreement: //TODO
                  return <StepListPartnershipContract projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.ArticlesOfIncorporation: //TODO
                  return <ArticlesOfNcorporationPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.LaborContract: //TODO
                  return <StepsWrapper projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.ShareholderList: //TODO
                  return <ShareholderListPage projectId={dataProject.id} key={data.id} />
                case PROJECT_ID_DECK_ENUM.Survey: //TODO
                  return <SurveyPage projectId={dataProject.id} key={data.id} />
                // case PROJECT_ID_DECK_ENUM.ColtureDeck: //TODO
                //   return <SurveyPage id={DEFAULT_STEP_SURVEY.projectId} key={`${data.no}_${index}`} />
                default:
                  return <></>
              }
            })}
        </Box>
      </ThemeProvider>
    </Box>
  )
}
export default memo(DowloadPDFDeck)
