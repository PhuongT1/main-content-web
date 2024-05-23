import { DesignedLinkButton, EllipsisText, Typography } from '@/elements'
import { TypographyProps } from '@/elements/typography/typography.type'
import { ButtonProps } from '@/elements/v2/button'
import { EllipsisTextProps } from '@/elements/v2/label'
import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

type TipProps = {
  children: ReactNode
  containerSx?: SxProps
  ellipsisTextProps?: Omit<EllipsisTextProps, 'children'>
  endBtn: {
    content?: string
    props?: ButtonProps
  }
  tipProps?: TypographyProps
}

const Tip = ({ children, ellipsisTextProps, containerSx, endBtn, tipProps }: TipProps) => {
  return (
    <Box
      bgcolor={'rgba(68, 189, 189, 0.10)'}
      borderRadius={2}
      px={2.5}
      py={2}
      display={'flex'}
      gap={1.5}
      alignItems={'center'}
      sx={{
        ...containerSx
      }}
    >
      <Typography cate='button_2_semibold' plainColor='home.mint500' {...tipProps}>
        TIP
      </Typography>
      <EllipsisText component={'div'} cate='body_3' plainColor='home.gray50' {...ellipsisTextProps}>
        {children}
      </EllipsisText>

      <DesignedLinkButton sx={{ width: 120, flexShrink: 0, alignSelf: 'flex-end' }} {...endBtn?.props}>
        <Typography
          cate='body_30'
          plainColor='home.mint500'
          sx={{
            textDecoration: 'underline'
          }}
        >
          {endBtn?.content || '자세히 보기'}
        </Typography>
      </DesignedLinkButton>
    </Box>
  )
}

export default Tip
