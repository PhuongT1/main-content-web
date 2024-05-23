import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import DropDownIcon from '@/assets/icons/partnership-agreement/drop-down-icon'
import EllipseIcon from '@/assets/icons/partnership-agreement/ellipse-icon'
import { convertToRem } from '@/utils/convert-to-rem'
import CompanyInfo from '../../forms/company-info'
import AccordionView from '@/components/accordion-view'
import BrandDefinition from '../../forms/brand-definition'
import { useRecoilState, useRecoilValue } from 'recoil'
import { culture_forms, tab } from '@/atoms/culture'
import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import BrandValues from '../../forms/brand-values'
import ProductsServices from '../../forms/products-services'
import OurAchievements from '../../forms/our-achievements'
import Slogan from '../../forms/slogan'
import KeyCustomerSettings from '../../forms/key-customer-settings'
import ProblemsSolutions from '../../forms/problems-solutions'
import MarketSize from '../../forms/market-size'
import BusinessModel from '../../forms/business-model'
import OrganizationChart from '../../forms/organization-chart'
import RankAndSystem from '../../forms/rank-and-system'
import TypeOfTalent from '../../forms/type-of-talent'
import PremiseOfWork from '../../forms/premise-of-work'
import Skillsets from '../../forms/skillsets'
import Mindset from '../../forms/mindset'
import Tendencies from '../../forms/tendencies'
import Dont from '../../forms/dont'
import RecruimentProcess from '../../forms/recruitment-process'
import Interview from '../../forms/interview'
import Survey from '../../forms/survey'
import SupportPolicy from '../../forms/support-policy'
import Partners from '../../forms/partners'
import Sales from '../../forms/sales'
import Status from '../../forms/status'
import History from '../../forms/history'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { useLanguage } from '@/hooks/use-language'

const CultureForms = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { dict } = useLanguage()

  const tabActive: string = useRecoilValue(tab)
  const [cultureForms, setCultureForms] = useRecoilState(culture_forms)
  const [accordActive, setAccordActive] = useState<any>('')

  useEffect(() => {
    setAccordActive('')
  }, [tabActive])

  const {
    palette: { home }
  } = useTheme()

  const CONTENT_FORMS = {
    ABOUT_US: {
      main_title: dict.culture_content_forms_about_main_title,
      sub_title: dict.culture_content_forms_about_sub_title,
      description: dict.culture_content_forms_about_description,
      accordions: [
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_companyInfo,
          id: 'company_info',
          component: <CompanyInfo />
        },
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_brandDefinition,
          id: 'brand_definition',
          component: <BrandDefinition />
        },
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_brandValues,
          id: 'brand_values',
          component: <BrandValues />
        },
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_productsServices,
          id: 'products_services',
          component: <ProductsServices />
        },
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_ourAchievements,
          id: 'our_achievements',
          component: <OurAchievements />
        },
        {
          titleAccordion: dict.culture_content_forms_about_titleAccordion_slogan,
          id: 'slogan',
          component: <Slogan />
        }
      ]
    },
    DIRECTION: {
      main_title: dict.culture_content_forms_direction_main_title,
      sub_title: dict.culture_content_forms_direction_sub_title,
      description: dict.culture_content_forms_direction_description,
      accordions: [
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_key_customer_settings,
          id: 'key_customer_settings',
          component: <KeyCustomerSettings />
        },
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_problems_solutions,
          id: 'problems_solutions',
          component: <ProblemsSolutions />
        },
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_market_size,
          id: 'market_size',
          component: <MarketSize />
        },
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_business_model,
          id: 'business_model',
          component: <BusinessModel />
        },
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_organization_chart,
          id: 'organization_chart',
          component: <OrganizationChart />
        },
        {
          titleAccordion: dict.culture_content_forms_direction_titleAccordion_rank_and_system,
          id: 'rank_and_system',
          component: <RankAndSystem />
        }
      ]
    },
    CULTURE: {
      main_title: dict.culture_content_forms_culture_main_title,
      sub_title: dict.culture_content_forms_culture_sub_title,
      description: dict.culture_content_forms_culture_description,
      accordions: [
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_type_of_talent,
          id: 'type_of_talent',
          component: <TypeOfTalent />
        },
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_premise_of_work,
          id: 'premise_of_work',
          component: <PremiseOfWork />
        },
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_skillsets,
          id: 'skillsets',
          component: <Skillsets />
        },
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_mindset,
          id: 'mindset',
          component: <Mindset />
        },
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_tendencies,
          id: 'tendencies',
          component: <Tendencies />
        },
        {
          titleAccordion: dict.culture_content_forms_culture_titleAccordion_dont,
          id: 'dont',
          component: <Dont />
        }
      ]
    },
    PEOPLE: {
      main_title: dict.culture_content_forms_people_main_title,
      sub_title: dict.culture_content_forms_people_sub_title,
      description: dict.culture_content_forms_people_description,
      accordions: [
        {
          titleAccordion: dict.culture_content_forms_people_titleAccordion_recruitment_process,
          id: 'recruitment_process',
          component: <RecruimentProcess />
        },
        {
          titleAccordion: dict.culture_content_forms_people_titleAccordion_interview,
          id: 'interview',
          component: <Interview />
        },
        {
          titleAccordion: dict.culture_content_forms_people_titleAccordion_survey,
          id: 'survey',
          component: <Survey />
        },
        {
          titleAccordion: dict.culture_content_forms_people_titleAccordion_support_policy,
          id: 'support_policy',
          component: <SupportPolicy />
        }
      ]
    },
    OTHERS: {
      main_title: dict.culture_content_forms_others_main_title,
      sub_title: dict.culture_content_forms_others_sub_title,
      description: dict.culture_content_forms_others_description,
      accordions: [
        {
          titleAccordion: dict.culture_content_forms_others_titleAccordion_partners,
          id: 'partners',
          component: <Partners />
        },
        {
          titleAccordion: dict.culture_content_forms_others_titleAccordion_sales,
          id: 'sales',
          component: <Sales />
        },
        {
          titleAccordion: dict.culture_content_forms_others_titleAccordion_status,
          id: 'status',
          component: <Status />
        },
        {
          titleAccordion: dict.culture_content_forms_others_titleAccordion_history,
          id: 'history',
          component: <History />
        }
      ]
    }
  }

  const onCloseForm = () => {
    const formsData = { ...cultureForms }
    delete formsData[accordActive]
    setCultureForms({ ...formsData })
    setAccordActive('')
    toggleShowDialog()
  }

  return (
    <Box sx={{ background: home.gray400, padding: '20px', borderRadius: '20px', minWidth: '360px', maxWidth: '360px' }}>
      <Typography sx={{ paddingBottom: '20px', borderBottom: `1px solid ${home.gray200}` }}>
        <Typography cate='sub_title_30' textAlign={'center'}>
          <Typography sx={{ color: home.gray50 }} fontWeight={'600'} component={'span'}>
            {(CONTENT_FORMS as any)[tabActive].main_title}
          </Typography>
          <Typography sx={{ color: home.gray85 }} fontWeight={'600'} component={'span'}>
            {' '}
            {(CONTENT_FORMS as any)[tabActive].sub_title}
          </Typography>
        </Typography>
        <Typography sx={{ color: home.gray100 }} cate='sub_title_30' textAlign={'center'}>
          {(CONTENT_FORMS as any)[tabActive].description}
        </Typography>
      </Typography>
      <Box
        component={'div'}
        sx={{
          height: convertToRem(1),
          width: '100%',
          backgroundColor: home.gray200
        }}
      />
      {(CONTENT_FORMS as any)[tabActive].accordions.map((item: any, index: number) => {
        return (
          <Box key={`accordion_${index}_${tabActive}`} sx={{ width: '100%', margin: '20px 0' }}>
            <AccordionView
              onChange={(e, expanded) => {
                // let temp: any = _.cloneDeep(accordActive)
                // if (expanded) {
                //   temp.push(item.id)
                // } else {
                //   temp = temp.filter((value: any) => value != item.id)
                // }
                if (expanded) {
                  setAccordActive(item.id)
                }
              }}
              onCancel={() => toggleShowDialog()}
              expanded={accordActive.includes(item.id)}
              expandIcon={<DropDownIcon />}
              ariaControls={item.id}
              id={item.id}
              tab={{ id: item.id, status: accordActive.includes(item.id) ? 'PROCESS' : 'INIT' }}
              titleAccordion={
                <Box display={'flex'} gap={convertToRem(10)}>
                  <EllipseIcon
                    stroke={
                      !_.isEmpty(cultureForms[item.id])
                        ? home.mint500
                        : accordActive.includes(item.id)
                        ? '#FF7A2F'
                        : home.gray85
                    }
                    fill={
                      !_.isEmpty(cultureForms[item.id])
                        ? home.mint500
                        : accordActive.includes(item.id)
                        ? '#FF7A2F'
                        : home.gray50
                    }
                  />
                  <Typography>{item.titleAccordion}</Typography>
                </Box>
              }
            >
              {item?.component}
            </AccordionView>
          </Box>
        )
      })}
      <DeleteDeck
        title='작성한 데이터가 삭제됩니다.'
        description='삭제된 데이터는 복구되지 않습니다. 진행하시겠습니까?'
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => onCloseForm()}
      />
    </Box>
  )
}

export default CultureForms
