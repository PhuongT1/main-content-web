import { culture_forms } from '@/atoms/culture'
import { Box, useTheme } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import TemplateCompanyInfo from './template-company-info'
import TemplateBrandDefinition from './template-brand-definition'
import { Typography } from '@/elements'
import SwiperLeftIcon from '@/assets/icons/culture/swiper-left-icon'
import SwiperRightIcon from '@/assets/icons/culture/swiper-right-icon'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styles from '../culture.module.scss'
import TemplateBrandValues from './template-brand-values'
import TemplateProductsServices from './template-products-services'
import TemplateOurAchievements from './template-our-achievements'
import TemplateSlogan from './template-slogan'
import TemplateKeyCustomerSettings from './template-key-customer-settings'
import TemplateProblemsSolutions from './template-problems-solutions'
import TemplateMarketSize from './template-market-size'
import TemplatebusinessModel from './template-business-model'
import TemplateContainer from './template-container'
import {
  TemplateAchievementsBg,
  TemplateBusinessModelBg,
  TemplateCompanyInfoBg,
  TemplateInterviewBg,
  TemplateMindsetBg,
  TemplateOrganizationChartBg,
  TemplatePartnersBg,
  TemplateProblemsSolutionsBg,
  TemplateSalesBg,
  TemplateSkillsetsBgBg
} from '@/assets/images/culture'
import TemplateOrganizationChart from './template-organization-chart'
import TemplateRankAndSystem from './template-rank-and-system'
import TemplateTypeOfTalent from './template-type-of-talent'
import TemplatePremiseOfWork from './template-premise-of-work'
import TemplateFooter from './template-footer'
import TemplateSkillsets from './template-skillsets'
import TemplateTendencies from './template-tendencies'
import TemplateDont from './template-dont'
import TemplateRecruitmentProcess from './template-recruitment-process'
import TemplateInterview from './template-interview'
import TemplateSurvey from './template-survey'
import TemplateSupportPolicy from './template-support-policy'
import TemplatePartners from './template-partners'
import TemplateSales from './template-sales'
import TemplateStatus from './template-status'
import TemplateHistory from './template-history'
import { useEffect, useRef } from 'react'
import TemplateMindset from './template-mindset'

const Templates = () => {
  const carouselRef: any = useRef()

  const cultureForms = useRecoilValue(culture_forms)
  const {
    palette: { home }
  } = useTheme()

  const getTemplate = (key: string) => {
    switch (key) {
      case 'company_info':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateCompanyInfoBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateCompanyInfo data={cultureForms.company_info} />
            <TemplateFooter type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'brand_definition':
        return (
          <TemplateContainer>
            <TemplateBrandDefinition data={cultureForms.brand_definition} />
            <TemplateFooter type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'brand_values':
        return (
          <TemplateContainer>
            <TemplateBrandValues data={cultureForms.brand_values} />
            <TemplateFooter type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'products_services':
        return (
          <TemplateContainer>
            <TemplateProductsServices data={cultureForms.products_services} />
            <TemplateFooter type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'our_achievements':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateAchievementsBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateOurAchievements data={cultureForms.our_achievements} />
            <TemplateFooter hightlight type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'slogan':
        return (
          <TemplateContainer
            sx={{
              background: `linear-gradient(180deg, rgba(245, 250, 255, 0.00) 0%, #2D68FE 123.62%), #FFF`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom'
            }}
          >
            <TemplateSlogan data={cultureForms.slogan} />
            <TemplateFooter hightlight type='ABOUT_US' />
          </TemplateContainer>
        )
      case 'key_customer_settings':
        return (
          <TemplateContainer>
            <TemplateKeyCustomerSettings data={cultureForms.key_customer_settings} />
            <TemplateFooter type='DIRECTION' />
          </TemplateContainer>
        )
      case 'problems_solutions':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateProblemsSolutionsBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateProblemsSolutions data={cultureForms.problems_solutions} />
            <TemplateFooter hightlight type='DIRECTION' />
          </TemplateContainer>
        )
      case 'market_size':
        return (
          <TemplateContainer>
            <TemplateMarketSize data={cultureForms.market_size} />
            <TemplateFooter type='DIRECTION' />
          </TemplateContainer>
        )
      case 'business_model':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateBusinessModelBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplatebusinessModel data={cultureForms.business_model} />
            <TemplateFooter hightlight type='DIRECTION' />
          </TemplateContainer>
        )
      case 'organization_chart':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateOrganizationChartBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateOrganizationChart data={cultureForms.organization_chart} />
            <TemplateFooter type='DIRECTION' />
          </TemplateContainer>
        )

      case 'rank_and_system':
        return (
          <TemplateContainer>
            <TemplateRankAndSystem data={cultureForms.rank_and_system} />
            <TemplateFooter type='DIRECTION' />
          </TemplateContainer>
        )

      case 'type_of_talent':
        return (
          <TemplateContainer>
            <TemplateTypeOfTalent data={cultureForms.type_of_talent} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'premise_of_work':
        return (
          <TemplateContainer>
            <TemplatePremiseOfWork data={cultureForms.premise_of_work} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'mindset':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateMindsetBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateMindset data={cultureForms.mindset} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'skillsets':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateSkillsetsBgBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateSkillsets data={cultureForms.skillsets} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'tendencies':
        return (
          <TemplateContainer>
            <TemplateTendencies data={cultureForms.tendencies} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'dont':
        return (
          <TemplateContainer>
            <TemplateDont data={cultureForms.dont} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'recruitment_process':
        return (
          <TemplateContainer>
            <TemplateRecruitmentProcess data={cultureForms.recruitment_process} />
            <TemplateFooter type='CULTURE' />
          </TemplateContainer>
        )

      case 'interview':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateInterviewBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateInterview data={cultureForms.interview} />
            <TemplateFooter type='PEOPLE' />
          </TemplateContainer>
        )

      case 'survey':
        return (
          <TemplateContainer>
            <TemplateSurvey data={cultureForms.survey} />
            <TemplateFooter type='PEOPLE' />
          </TemplateContainer>
        )

      case 'support_policy':
        return (
          <TemplateContainer>
            <TemplateSupportPolicy data={cultureForms.support_policy} />
            <TemplateFooter type='PEOPLE' />
          </TemplateContainer>
        )

      case 'partners':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplatePartnersBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplatePartners data={cultureForms.partners} />
            <TemplateFooter type='PEOPLE' />
          </TemplateContainer>
        )

      case 'sales':
        return (
          <TemplateContainer
            sx={{
              backgroundImage: `url(${TemplateSalesBg.src})`,
              backgroundSize: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <TemplateSales data={cultureForms.sales} />
            <TemplateFooter hightlight type='OTHERS' />
          </TemplateContainer>
        )

      case 'status':
        return (
          <TemplateContainer>
            <TemplateStatus data={cultureForms.status} />
            <TemplateFooter type='OTHERS' />
          </TemplateContainer>
        )

      case 'history':
        return (
          <TemplateContainer>
            <TemplateHistory data={cultureForms.history} />
            <TemplateFooter type='OTHERS' />
          </TemplateContainer>
        )
    }
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  }

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide }
    } = rest

    if (Object.keys(cultureForms).length > 1) {
      return (
        <Box sx={{ marginTop: '32px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: home.gray200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: currentSlide ? 1 : '50%'
            }}
            onClick={() => previous()}
          >
            <SwiperLeftIcon />
          </Box>
          <Box
            sx={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: home.gray200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: currentSlide + 1 === rest.carouselState.totalItems ? '50%' : 1
            }}
            className='next-arrow'
            onClick={() => next()}
          >
            <SwiperRightIcon />
          </Box>
        </Box>
      )
    }
  }

  useEffect(() => {
    if (Object.keys(cultureForms).length === 1) {
      carouselRef.current.goToSlide(0)
    }
    if (Object.keys(cultureForms).length > 1) {
      if (carouselRef.current.state.currentSlide === Object.keys(cultureForms).length) {
        carouselRef.current.previous()
      }
    }
  }, [cultureForms])
  return (
    <>
      {!!Object.keys(cultureForms).length && (
        <Box sx={{ marginTop: '40px', backgroundColor: home.gray400, borderRadius: '10px', padding: '50px 60px' }}>
          <Carousel
            ref={carouselRef}
            itemClass={styles.carouselItem}
            arrows={false}
            customButtonGroup={<ButtonGroup />}
            renderButtonGroupOutside={true}
            responsive={responsive}
          >
            {Object.keys(cultureForms).map((key: string, index: number) => {
              return <Box key={index}>{getTemplate(key)}</Box>
            })}
          </Carousel>
        </Box>
      )}
      {!Object.keys(cultureForms).length && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '40px',
            height: '280px',
            width: '100%',
            backgroundColor: home.gray400,
            borderRadius: '10px'
          }}
        >
          <Typography color={home.gray50} fontWeight={600} cate='sub_title_30'>
            컬처덱이 없습니다.
          </Typography>
          <Typography color={home.gray100} fontWeight={400} cate='sub_title_30'>
            컬쳐덱을 추가해보세요.
          </Typography>
        </Box>
      )}
    </>
  )
}

export default Templates
