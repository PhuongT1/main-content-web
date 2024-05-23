import DownloadIcon from '@/assets/icons/download'
import Typography from '@/elements/typography'
import { downloadFile } from '@/services/file.service'
import { IFile } from '@/types/user.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'

type FileCategoryProps = {
  item: IFile
}

const FileCategory = ({ item }: FileCategoryProps) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const downloadFileMutate = useMutation({
    mutationFn: downloadFile
  })

  return (
    <Box
      sx={{
        cursor: 'pointer',
        padding: '13px 1.5rem',
        borderRadius: '250rem',
        border: '1px solid ' + theme.palette.main_grey.gray500,
        color: theme.palette.main_grey.gray100,
        width: '1',
        maxWidth: 'max-content',
        display: 'flex'
      }}
      onClick={async () => {
        await downloadFileMutate.mutateAsync({ url: item.url, name: item.name })
        // window.open(item.url)
      }}
    >
      <Typography
        cate='button_20'
        sx={{
          lineBreak: 'anywhere',
          width: 'max-content',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical'
        }}
      >
        {item.name}
      </Typography>
      <Box component='span' sx={{ verticalAlign: 'top', ml: 1 }}>
        <DownloadIcon />
      </Box>
    </Box>
  )
}

export default FileCategory
