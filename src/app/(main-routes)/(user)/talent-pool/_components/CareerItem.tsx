import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import Typography from '@/elements/typography'
import { Box, BoxProps, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main_grey.gray700,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start'
  },
  alignItems: 'center',
  fieldset: {
    border: 0
  }
}))

type CareerItemProps = {
  title: string
  period: string
  onClose: any
}

const CareerItem = ({ title, period, onClose }: CareerItemProps) => {
  const theme = useTheme()
  const xlUp = useMediaQuery('(min-width: 992px)')
  return (
    <Section>
      <Box
        display={'flex'}
        alignItems={xlUp ? 'center' : 'flex-start'}
        flexDirection={xlUp ? 'row' : 'column'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Typography cate='body_2'>{title}</Typography>
        <Box display={'flex'} alignItems={'center'}>
          <Typography cate='caption_1' ml={xlUp ? 2 : 0} mr={8}>
            {period}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onClose} sx={{ padding: 0 }}>
        <CloseCircleSmIcon />
      </IconButton>
    </Section>
  )
}

export default CareerItem
