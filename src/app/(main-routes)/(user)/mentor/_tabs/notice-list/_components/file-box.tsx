import DownloadIcon from '@/assets/icons/download'
import { Typography } from '@/elements'
import { color_gray } from '@/themes/system-palette'
import { TImage } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Card, Stack, useMediaQuery } from '@mui/material'

type FileBoxProps = {
  onClick: Function
} & TImage

const FileBox = ({ name, fileSize, onClick }: FileBoxProps) => {
  const mdUp = useMediaQuery('(min-width:768px)')

  return (
    <Card
      sx={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: mdUp ? convertToRem(240) : '100%',
        bgcolor: color_gray[700],
        borderRadius: 1,
        p: `${convertToRem(10)} ${convertToRem(24)}`,
        ':hover': {
          boxShadow: 10 // theme.shadows[20]
        },
        cursor: 'pointer'
      }}
      onClick={() => {
        onClick()
      }}
    >
      <Stack direction={'column'} gap={1} width={'80%'}>
        <Typography
          cate='caption_1_semibold'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100px',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
        >
          {name}
        </Typography>
        <Typography cate='caption_2' color={color_gray[500]}>
          {fileSize}
        </Typography>
      </Stack>
      <DownloadIcon svgProps={{ width: 24, height: 24 }} pathProps={{ stroke: color_gray[100] }} />
    </Card>
  )
}

export default FileBox
