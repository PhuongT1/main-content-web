'use client'
import { Box, BoxProps, SxProps, styled, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import ImageIcon from '@/assets/icons/image'
import { useLanguage } from '@/hooks/use-language'

interface IContentUploadCard {
  width?: number
  sx?: SxProps
  onClick: () => void
}

const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  height: convertToRem(207),
  gap: convertToRem(16),
  borderRadius: convertToRem(10),
  padding: `${convertToRem(50)} 0`,
  cursor: 'pointer',
  border: `1px solid ${theme.palette.home.blue500}`,
  backgroundColor: 'rgba(60, 130, 249, 0.10)'
}))

export const ContentUploadCard = ({ width = 280, sx = {}, onClick }: IContentUploadCard) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()

  return (
    <BoxCard width={convertToRem(width)} onClick={onClick} sx={sx}>
      <ImageIcon />
      <Typography cate='subtitle_1_semibold' color={palette.home.gray50}>
        {dict.project_home_select_image}
      </Typography>
    </BoxCard>
  )
}
export default ContentUploadCard
