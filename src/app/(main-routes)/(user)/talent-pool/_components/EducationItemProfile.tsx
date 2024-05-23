import Typography from '@/elements/typography'
import { IEducation } from '@/types/pool.type'
import { Box, BoxProps, Chip, styled, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.main.gray80,
    padding: '0'
  },
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

const EducationItemProfile = ({ item }: { item: IEducation }) => {
  const theme = useTheme()
  const lgDown = useMediaQuery('(max-width: 992px)')
  return (
    <Section>
      <Box
        display={'flex'}
        justifyContent='space-between'
        alignItems={lgDown ? 'flex-start' : 'center'}
        flexDirection={lgDown ? 'column' : 'row'}
        mb={2}
      >
        <Typography cate='subtitle_1_semibold' mb={lgDown ? 1 : 0}>
          {item.schoolName} · {item.majors}
        </Typography>
        <Box display={'flex'} alignItems={'center'}>
          <Chip
            label={item.degreeKr}
            sx={{
              fontSize: '0.875rem',
              color: theme.palette.main.point,
              fontFamily: 'Pretendard',
              padding: '0.31rem 0.75rem',
              border: '1px solid ' + theme.palette.main.point,
              background: 'rgba(45, 104, 254, 0.1)',
              borderRadius: '250rem'
            }}
          />
          <Chip
            label={'졸업'}
            sx={{
              fontSize: '0.875rem',
              color: theme.palette.main.orange,
              fontFamily: 'Pretendard',
              marginLeft: '0.5rem',
              padding: '0.31rem 0.75rem',
              background: 'rgba(236, 74, 10, 0.1)',
              border: '1px solid ' + theme.palette.main.orange,
              borderRadius: '250rem'
            }}
          />
        </Box>
      </Box>
      <Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }} mb={0.5}>
        {moment(item.startDateAt).format('YYYY.MM.DD')} - {moment(item.endDateAt).format('YYYY.MM.DD')}
      </Typography>
    </Section>
  )
}

export default EducationItemProfile
