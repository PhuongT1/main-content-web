'use client'
import { isServer } from '@/utils/types'
import { Box, SxProps } from '@mui/material'
import DOMPurify from 'dompurify'

type SanitizationHtmlProps = {
  children: string
  sx?: SxProps
}

const SanitizationHtml = ({ children, sx }: SanitizationHtmlProps) => {
  const sanitizedHtmlContent = isServer() ? children : DOMPurify.sanitize(children)
  return (
    <Box
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
      sx={{
        img: {
          width: '100%'
        },
        ...sx
      }}
    />
  )
}

export default SanitizationHtml
