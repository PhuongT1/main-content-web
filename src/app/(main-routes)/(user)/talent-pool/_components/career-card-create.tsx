import TrashIcon from '@/assets/icons/trash'
import { RoundedSolidIconButton, SecondaryActiveChip, Typography } from '@/elements'
import { ExperienceForm } from '@/types/pool.type'
import { Stack, SxProps, useTheme } from '@mui/material'
import moment from 'moment'
import CardBox from '../../../../../components/cards/card-box'

interface ICareerCardCreate {
  data: ExperienceForm
  onDelete: Function
  showUndertaking?: boolean
  sx?: SxProps
}

const CareerCardCreate = ({ data, onDelete, showUndertaking = false, sx }: ICareerCardCreate) => {
  const theme = useTheme()
  return (
    <CardBox gap={2} sx={{ ...sx }}>
      <Stack justifyContent='space-between' direction={{ md: 'row', sm: 'column' }} gap={{ md: 0, sm: 1 }}>
        <Typography cate='button_40'>
          {data.companyName} {showUndertaking ? null : `/ ${data.undertaking}`}
        </Typography>
        {data.isCurrentlyWorking ? (
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
        ) : null}
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
        <Stack justifyContent={'flex-start'} alignItems={'flex-start'} gap={0.5}>
          <Typography cate='body_30'>
            {moment(data.startDateAt).format('YYYY.MM')} -{' '}
            {data.isCurrentlyWorking ? '재직중' : moment(data.endDateAt).format('YYYY.MM')} (
            {moment(data.endDateAt).diff(data.startDateAt, 'year')}년)
          </Typography>
          {showUndertaking ? <Typography cate='body_30'>담당 부서: {data.undertaking}</Typography> : null}
        </Stack>
        <RoundedSolidIconButton
          sx={{
            padding: 0.5
          }}
          onClick={() => onDelete()}
        >
          <TrashIcon pathProps={{ stroke: '#9F9EA4' }} />
        </RoundedSolidIconButton>
      </Stack>
    </CardBox>
  )
}

export default CareerCardCreate
