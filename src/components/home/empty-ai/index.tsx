import { Typography } from '@/elements'
import LoadingAI from '@/elements/loadingAI'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, SxProps, useTheme } from '@mui/material'
import React from 'react'
import { CreateButton } from '../button'
import { useLanguage } from '@/hooks/use-language'

type Props = {
  title?: React.ReactNode
  description?: React.ReactNode
  isLoading?: boolean
  onCreateData?: VoidFunction
  sxBox?: SxProps
  disabledButton?: boolean
}

const EmptyAI = ({ title = '', description = '', isLoading = false, disabledButton, onCreateData, sxBox }: Props) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  return (
    <LoadingAI isLoading={isLoading}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flexDirection: 'column',
          height: remConvert('280px'),
          backgroundColor: home.gray400,
          borderRadius: remConvert('10px'),
          padding: remConvert('20px 20px 0px 20px'),
          gap: remConvert('40px'),
          ...sxBox
        }}
      >
        <Box
          alignItems={'center'}
          component={'div'}
          display={'flex'}
          mt={remConvert('38px')}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={remConvert('12px')}
        >
          <Typography cate='title_50' component={'div'} color={home.gray50}>
            {title || dict.idea_empty_ai_title}
          </Typography>
          <Typography cate='body_3' component={'div'} color={home.gray100}>
            {description || dict.idea_empty_ai_sub_title}
          </Typography>
        </Box>
        <CreateButton disabled={isLoading || disabledButton} onClick={onCreateData}>
          {dict.common_create}
        </CreateButton>
      </Box>
    </LoadingAI>
  )
}

export default EmptyAI
