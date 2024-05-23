import BulletDotIcon from '@/assets/icons/commons/bullet-dot.ico'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { List, ListItem, Stack, SxProps } from '@mui/material'

const CouponInform = ({ sx }: { sx?: SxProps }) => {
  return (
    <Stack
      gap={1}
      sx={{
        padding: `${convertToRem(30)} ${convertToRem(24)}`,
        border: '1px solid',
        borderColor: 'main.gray60',
        borderRadius: convertToRem(8),
        ...sx
      }}
      width={'100%'}
    >
      <Typography cate='sub_title_30' plainColor='main_grey.gray50'>
        안내사항
      </Typography>
      <List
        sx={{
          padding: 0
        }}
      >
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            사용 기준 선착순 쿠폰으로 쿠폰을 소지하고 있더라도 조기 소진될 경우 사용이 불가할 수 있습니다.
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            발급 받은 쿠폰은 사용 기간 동안에만 사용 가능합니다.
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            이벤트 기간 이후 결제 변경으로 인한 재발급/ 재사용이 불가합니다.
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            쿠폰 및 결제에 대한 문의가 있을 경우 고객센터(0000-0000)으로 문의 바랍니다.
          </Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray300'>
            본 이벤트는 사정에 의해 사전 고지 없이 조기종료 또는 변경될 수 있습니다.
          </Typography>
        </ListItem>
      </List>
    </Stack>
  )
}

export default CouponInform
