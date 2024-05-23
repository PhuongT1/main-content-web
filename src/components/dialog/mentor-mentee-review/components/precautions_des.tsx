import BulletDotIcon from '@/assets/icons/commons/bullet-dot.ico'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { List, ListItem, Stack, SxProps } from '@mui/material'

const PrecautionsDescription = ({ sx }: { sx?: SxProps }) => {
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
      <Typography cate='sub_title_30' plainColor='main_grey.gray200'>리뷰 작성 유의 사항</Typography>
      <Typography cate='body_20' plainColor='main_grey.gray200'>리뷰 운영 정책을 위반한 경우, 통보 없이 리뷰를 숨김처리 할 수 있습니다.</Typography>
      <List
        sx={{
          padding: 0
        }}
      >
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray200'>정상적으로 이용 완료되지 않은 멘토링 건의 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray200'>멘토링과 무관한 내용과 부적절한 내용을 포함한 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray200'>욕설, 비방, 명예훼손을 포함한 내용이 있는 경우</Typography>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <BulletDotIcon svgProps={{ width: 24, height: 24 }} />
          <Typography cate='body_20' plainColor='main_grey.gray200'>
            저작권, 초상권 등 타인의 권리, 명예, 신용, 기타 정당한 이익을 침해하는 경우
          </Typography>
        </ListItem>
      </List>
    </Stack>
  )
}

export default PrecautionsDescription
