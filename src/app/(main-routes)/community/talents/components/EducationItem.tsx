import Typography from '@/elements/typography'
import { IEducation } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Chip, styled, useTheme } from '@mui/material'
import moment from 'moment'
const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

type EducationItemProps = {
  item?: IEducation
}

const EducationItem = ({ item }: EducationItemProps) => {
  const theme = useTheme()

  return (
    <Section>
      <Box width={'100%'} display='flex' alignItems={'center'} justifyContent='space-between' mb={2}>
        <Typography cate='title_40'>
          {item?.schoolName} {item?.majors}
        </Typography>
        <Box display={'flex'} gap={0.5}>
          {item?.degreeKr && (
            <Chip
              label={item?.degreeKr}
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.main.point,
                padding: '5px 0.75rem',
                border: '1px solid ' + theme.palette.main.point,
                background: '#1B2137',
                borderRadius: '250rem',
                height: convertToRem(24),
                '.MuiChip-label': {
                  padding: 0
                }
              }}
            />
          )}
          {item?.endDateAt && (
            <Chip
              label={'졸업'}
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.sub.orange600,
                padding: '5px 0.75rem',
                border: '1px solid ' + theme.palette.sub.orange600,
                background: '#241915',
                borderRadius: '250rem',
                height: convertToRem(24),
                '.MuiChip-label': {
                  padding: 0
                }
              }}
            />
          )}
        </Box>
      </Box>
      <Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }} mb={0}>
        {moment(item?.startDateAt).format('YYYY.MM')} - {moment(item?.endDateAt).format('YYYY.MM')}
      </Typography>
    </Section>
  )
}

export default EducationItem
