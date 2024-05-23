'use client'
import CardBox from '@/components/cards/card-box'
import DownloadIcon from '@/assets/icons/download'
import PreviewFileIcon from '@/assets/icons/startup/preview-file.ico'
import { Typography } from '@/elements'
import { SecondaryButton } from '@/elements/v2/button'
import { Thumbnail } from '@/types/startup/toolkit.type'
import { convertToRem } from '@/utils/convert-to-rem'
import humanFileSize from '@/utils/human-file-size'
import { Stack } from '@mui/material'

type DocumentCardProps = {
  doc: Thumbnail
  download: () => void
  preview: () => void
}

const DocumentCard = ({ doc, download, preview }: DocumentCardProps) => {
  return (
    <CardBox
      gap={2}
      sx={{
        padding: `${convertToRem(16)} ${convertToRem(24)}`,
        maxWidth: convertToRem(670)
      }}
    >
      <Stack direction={{ md: 'row', sm: 'column' }} justifyContent={'space-between'} gap={3}>
        <Stack
          justifyContent='flex-start'
          direction={'column'}
          gap={2}
          sx={{
            flex: 1,
            minWidth: 0
          }}
        >
          <Typography
            cate='sub_title_20'
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {doc.name}
          </Typography>

          <Typography cate='body_10' plainColor='main_grey.gray500'>
            {humanFileSize(Number(doc.fileSize), true)}
          </Typography>
        </Stack>
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <SecondaryButton
            startIcon={<DownloadIcon />}
            btnSize='sm-np'
            sx={{
              gap: 0,
              borderRadius: convertToRem(1000)
            }}
            onClick={() => download()}
          >
            <Typography cate='body_30'>다운로드</Typography>
          </SecondaryButton>
          <SecondaryButton
            startIcon={<PreviewFileIcon />}
            btnSize='sm-np'
            sx={{
              gap: 0,
              borderRadius: convertToRem(1000)
            }}
            onClick={() => preview()}
          >
            <Typography cate='body_30'>미리보기</Typography>
          </SecondaryButton>
        </Stack>
      </Stack>
    </CardBox>
  )
}

export default DocumentCard
