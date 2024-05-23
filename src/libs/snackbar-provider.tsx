import { CheckRoundIcon } from '@/assets/icons'
import CloseSmIcon from '@/assets/icons/close-sm'
import ExplanationMarkFilled from '@/assets/icons/explanation-mark-filled'
import { OutlinedIconButton } from '@/elements/v2/icon-button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, styled, useTheme } from '@mui/material'
import { MaterialDesignContent, SnackbarProvider, closeSnackbar } from 'notistack'
import React from 'react'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-error': {
    fontFamily: 'var(--font-pretendard)',
    backgroundColor: '#000',
    border: '1px solid',
    borderColor: theme.palette.sub.red500,
    borderRadius: '8px'
  },
  '&.notistack-MuiContent-info': {
    fontFamily: 'var(--font-pretendard)',
    backgroundColor: '#000',
    border: '1px solid',
    borderColor: theme.palette.main_primary.blue500,
    borderRadius: '8px'
  },
  '&.notistack-MuiContent-success': {
    fontFamily: 'var(--font-pretendard)',
    backgroundColor: '#000',
    border: '1px solid',
    borderColor: theme.palette.main_primary.blue500,
    borderRadius: '8px'
  },
  '&.notistack-MuiContent-warning': {
    fontFamily: 'var(--font-pretendard)',
    backgroundColor: '#000',
    borderRadius: '8px'
  },
  '&.notistack-MuiContent-primary': {
    fontFamily: 'var(--font-pretendard)',
    backgroundColor: '#000',
    borderRadius: '8px'
  }
}))

function AppSnackbarProvider({ children }: React.PropsWithChildren) {
  const { palette } = useTheme()

  return (
    <SnackbarProvider
      maxSnack={4}
      Components={{
        info: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent
      }}
      iconVariant={{
        info: (
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <CheckRoundIcon />
          </Box>
        ),
        error: (
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <ExplanationMarkFilled />
          </Box>
        ),
        success: (
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <CheckRoundIcon
              rectProps={{
                fill: '#2D68FE'
              }}
            />
          </Box>
        )
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={(snackbarId) => (
        <OutlinedIconButton
          sx={{
            width: convertToRem(20),
            height: convertToRem(20),
            marginRight: '8px'
          }}
          onClick={() => closeSnackbar(snackbarId)}
        >
          <CloseSmIcon width={14} height={14} color={palette.main.white} />
        </OutlinedIconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  )
}

export default AppSnackbarProvider
