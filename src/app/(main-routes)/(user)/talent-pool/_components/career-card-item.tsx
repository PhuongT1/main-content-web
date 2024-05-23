import { SecondaryActiveChip } from '@/elements'
import Typography from '@/elements/typography'
import { IExperience } from '@/types/pool.type'
import { Stack, useTheme } from '@mui/material'
import moment from 'moment'
import CardBox from '../../../../../components/cards/card-box'

const CareerCardItem = ({ item }: { item: IExperience }) => {
  const theme = useTheme()

  return (
    <CardBox gap={2}>
      <Stack justifyContent='space-between' direction={'row'}>
        <Typography cate='button_40'>{item.companyName}</Typography>
        {item.isCurrentlyWorking && (
          <SecondaryActiveChip
            label={
              <Typography cate='caption_20' plainColor='sub.orange600'>
                재직중
              </Typography>
            }
            padding={false}
            sx={{
              width: '61px',
              bgcolor: '#241915',
              borderColor: theme.palette.sub.orange600,
              borderRadius: '1000px'
            }}
          />
        )}
      </Stack>
      <Stack direction={'column'} gap={0.5}>
        <Typography cate='body_30'>
          근무 기간: {moment(item.startDateAt).format('YYYY.MM.DD')} - {moment(item.endDateAt).format('YYYY.MM.DD')} (
          {item.yearsOfExperience}
          년)
        </Typography>
        <Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }}>
          담당 업무: {item.undertaking}
        </Typography>
      </Stack>
    </CardBox>
  )
}

export default CareerCardItem
