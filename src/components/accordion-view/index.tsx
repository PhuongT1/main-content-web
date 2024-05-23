'use client'
import { ReactNode, memo } from 'react'
import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { convertToRem } from '@/utils/convert-to-rem'
import { useTheme } from '@mui/material'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import Close from '@/assets/icons/dialog-icons/x-circle'
import { IIdTab } from '@/app/(main-routes)/home/partnership-agreement/components/step-list/step-02/additional-contract-terms-edit/accordion-form-view'
import { StatusPartnershipAgreemen } from '@/constants/partnership-agreement'

interface IAccordionProps extends AccordionProps {
  expandIcon: ReactNode
  titleAccordion: string | ReactNode
  id: string
  tab?: IIdTab
  onCancel?: () => void
  ariaControls: string
  onExpand?: () => void
}

const AccordionView = ({
  expandIcon,
  titleAccordion,
  children,
  tab,
  id,
  ariaControls,
  onCancel,
  onExpand,
  ...props
}: IAccordionProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <>
      <Accordion
        {...props}
        sx={{
          padding: convertToRem(16),
          borderRadius: '10px !important',
          background: home.alpha_blue_10,
          boxShadow: 'none',
          '&.MuiPaper-root.MuiAccordion-root.Mui-expanded': {
            border: `1px solid ${home.blue500}}`
          }
        }}
      >
        <AccordionSummary
          aria-controls={ariaControls}
          expandIcon={
            tab?.status == StatusPartnershipAgreemen.PROCESS && tab.id === id ? (
              <span onClick={onCancel}>
                <Close svgProps={{ width: '20px', height: '20px' }} pathProps={{ stroke: 'currentColor' }} />
              </span>
            ) : (
              <span onClick={onExpand}>{expandIcon}</span>
            )
          }
          id={id}
          sx={{
            '.MuiAccordionSummary-content': {
              margin: 0,
              '&.Mui-expanded': {
                margin: 0
              }
            },

            minHeight: '0 !important',
            padding: 0,
            margin: '0 !important',
            flexDirection: 'row',
            gap: convertToRem(20)
          }}
        >
          {titleAccordion}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
            paddingTop: convertToRem(10)
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default memo(AccordionView)
