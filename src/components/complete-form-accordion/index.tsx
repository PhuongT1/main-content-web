import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, SxProps, styled, useTheme } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary'
import FormDivider from '../form-divider'
import styles from './completeFormAccordion.module.scss'
import React from 'react'
import Close from '@/assets/icons/dialog-icons/x-circle'

type ICompleteFormAccordionProps = {
  status?: FormStatus
  sxStatus?: SxProps
  title: any
  subTitle?: string
  children: React.ReactNode
  startIcon?: React.ReactNode
  allowCancel?: boolean
  onCancel?: () => void
} & AccordionProps

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.home.alpha_blue_10,
    backgroundImage: 'none',
    borderRadius: convertToRem(10),
    '&::before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.home.alpha_blue_10,
  borderRadius: convertToRem(10),
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    gap: 10,
    alignItems: 'center'
  },
  [`&.${accordionSummaryClasses.expanded}`]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  backgroundColor: theme.palette.home.alpha_blue_10,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  borderBottomLeftRadius: convertToRem(10),
  borderBottomRightRadius: convertToRem(10)
}))

const CompleteFormAccordion: React.FC<ICompleteFormAccordionProps> = ({
  status,
  sxStatus,
  title,
  subTitle,
  children,
  startIcon,
  allowCancel,
  onCancel,
  ...rest
}) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Accordion className={[styles.accordion, status && styles[status]].join(' ')} defaultExpanded {...rest}>
      <AccordionSummary
        expandIcon={
          allowCancel ? (
            <span onClick={onCancel}>
              <Close svgProps={{ width: '20px', height: '20px' }} pathProps={{ stroke: 'currentColor' }} />
            </span>
          ) : (
            <ChevronDownIcon />
          )
        }
        aria-controls='panel1-content'
        id='panel1-header'
        sx={{
          '& .MuiAccordionSummary-content': {
            marginLeft: 0
          }
        }}
      >
        {startIcon}
        {status && (
          <Box display={'flex'}>
            <Typography component='span' className={[styles.status, styles[status]].join(' ')} sx={sxStatus} />
          </Box>
        )}
        <Typography className={styles.title} sx={{ color: home.gray50 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={styles.sub_title} plainColor={'home.gray50'}>
          {subTitle}
        </Typography>
        <FormDivider />
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default CompleteFormAccordion
