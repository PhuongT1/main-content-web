import BulletDotIcon from '@/assets/icons/commons/bullet-dot.ico'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { List, ListItem, Stack, SxProps } from '@mui/material'

const RefundGuidance = ({ sx }: { sx?: SxProps }) => {
  return (
    <Stack
      gap={1}
      sx={{
        padding: convertToRem(16),
        border: '1px solid',
        borderColor: 'main.gray60',
        borderRadius: convertToRem(8),
        ...sx
      }}
      width={'100%'}
    >
      <Typography cate='body_20' plainColor='main_grey.gray300'>
        교육행사는 오프라인 행사로, 규모에 맞춰 준비되기 때문에, 아래와 같이 기간에 따른 차감액이 존재합니다.
      </Typography>
      <List
        sx={{
          padding: 0
        }}
      >
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            2일전 취소시 100% 환불
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            행사 전일 취소시 70% 환불
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            행사 당일 취소시 50% 환불
          </Typography>
        </ListItem>
      </List>
    </Stack>
  )
}

export default RefundGuidance
