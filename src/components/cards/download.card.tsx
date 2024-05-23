'use client'
import DownloadIcon from '@/assets/icons/download'
import { IconButtonSizes, Typography } from '@/elements'
import { downloadFile } from '@/services/file.service'
import { formatBytes } from '@/utils/file'
import { Box, SxProps } from '@mui/material'
import { useMutation } from '@tanstack/react-query'

type DownloadCardProps = {
  name: string
  size: number
  url: string
  sx?: SxProps
}

const DownloadCard = ({ name, url, size, sx }: DownloadCardProps) => {
  const downloadStampAct = useMutation({
    mutationFn: downloadFile,
    meta: {
      offLoading: true
    }
  })

  const onDownload = async () => {
    await downloadStampAct.mutateAsync({ url, name })
  }

  return (
    <Box
      borderRadius={2}
      bgcolor={'main_grey.gray700'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={56}
      py={2}
      px={3}
      sx={sx}
    >
      <Box>
        <Typography cate='caption_1_semibold' plainColor='main_grey.gray50'>
          {name}
        </Typography>
        <Typography mt={1} cate='caption_20' plainColor='main_grey.gray500'>
          {formatBytes(size)}
        </Typography>
      </Box>
      <IconButtonSizes isLoading={downloadStampAct.isPending} onClick={onDownload} btnSize='md'>
        <DownloadIcon svgProps={{ width: 24, height: 24 }} />
      </IconButtonSizes>
    </Box>
  )
}

export default DownloadCard
