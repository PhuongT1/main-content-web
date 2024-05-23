import BulletDotIcon from '@/assets/icons/commons/bullet-dot.ico'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { List, ListItem, Stack } from '@mui/material'

const PrecautionsDescription = () => {
  return (
    <Stack
      gap={1}
      sx={{
        padding: convertToRem(16),
        border: '1px solid',
        borderColor: 'main.gray60',
        borderRadius: convertToRem(8)
      }}
      width={'100%'}
    >
      <Typography cate='sub_title_30'>리뷰 작성 유의 사항</Typography>
      <Typography cate='body_20'>리뷰 운영 정책을 위반한 경우, 통보 없이 리뷰를 숨김처리 할 수 있습니다.</Typography>
      <List
        sx={{
          padding: 0
        }}
      >
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20'>정상적으로 이용 완료되지 않은 멘토링 건의 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20'>멘토링과 무관한 내용과 부적절한 내용을 포함한 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20'>욕설, 비방, 명예훼손을 포함한 내용이 있는 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20'>
            저작권, 초상권 등 타인의 권리, 명예, 신용, 기타 정당한 이익을 침해하는 경우
          </Typography>
        </ListItem>
      </List>
    </Stack>
  )
}

export default PrecautionsDescription
