import { Typography } from '@/elements'
import { ActiveChip } from '@/elements/v2/chip'
import { EventList } from '@/types/community/educational-event.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/string'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { memo } from 'react'

interface IEducationApplicationCardProps {
  item: EventList

  key: number
}

const EducationApplicationCard = ({ item, key }: IEducationApplicationCardProps) => {
  const router = useRouter()

  const handleNavigate = (id: number) => {
    router.push(`community/educational-event-and-support-project/educational-event-list/${id}`)
  }

  return (
    <Box
      display={'flex'}
      width={'100%'}
      sx={{
        cursor: 'pointer'
      }}
      flexDirection={'column'}
      borderRadius={2}
      bgcolor={'main_grey.gray800'}
      key={key}
      onClick={() => handleNavigate(item.id)}
    >
      <Box
        sx={{
          width: '100%',
          height: 310,
          position: 'relative'
        }}
      >
        <Image
          src={item?.event?.thumbnail?.url || ''}
          alt={item?.event?.thumbnail?.name || ''}
          fill={true}
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: convertToRem(8),
            borderTopRightRadius: convertToRem(8)
          }}
        />
      </Box>
      <Box p={2} display={'flex'} flexDirection={'column'} gap={1}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography cate='body_30' plainColor='sub.teal600'>
            {item?.event?.category?.name ?? '-'}
          </Typography>
          <Box
            display={'flex'}
            py={0.625}
            px={1.5}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'99px'}
            border={'1px solid'}
            borderColor={'sub.orange600'}
            bgcolor={'sub.pink100'}
          >
            <Typography cate='caption_20' plainColor='sub.orange600'>
              {item?.event?.deadlineDate ?? '-'}
            </Typography>
          </Box>
        </Box>
        <Typography cate='title_50' plainColor='main_grey.gray100'>
          {item?.event?.title ?? '-'}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} gap={convertToRem(4)} flexDirection={'row'}>
            <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
              {formatCurrency(item?.event?.price)}
            </Typography>
            <Typography cate='body_30' plainColor='main_grey.gray100'>
              {item?.event?.statusRecruitmentFormat}
            </Typography>
          </Box>
          <Typography cate='sub_title_30' plainColor='main_grey.gray200'>
            {item?.event?.numberOfParticipants ?? '-'}
          </Typography>
        </Box>
        <Box mt={convertToRem(8)}>
          <ActiveChip
            sx={{
              height: convertToRem(44),
              width: 'fit-content',
              px: 2,
              '&.Mui-disabled': {
                backgroundColor: 'main_grey.gray600',
                border: 'none'
              }
            }}
            disabled={item?.typeFormat !== '신청완료'}
            label={
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                {item?.typeFormat ?? '-'}
              </Typography>
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(EducationApplicationCard)
