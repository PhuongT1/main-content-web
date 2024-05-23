import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { lightPalette } from '@/themes/get-design-tokens'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { IDeckSelected } from '@/app/(main-routes)/project-home/_modules/domain'
import Typography from '@/elements/typography'
import NewLogo from '@/assets/icons/app-icons/logo-2'
import IRHamburgerIcon from '@/assets/icons/edit-ir/ir-hamburger'

export interface IHeaderIRDrawerProps {
  deckItemsSelected: IDeckSelected[]
}

const HeaderIRDrawer = ({ deckItemsSelected }: IHeaderIRDrawerProps) => {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          height: convertToRem(104),
          width: '100%'
        }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexShrink={0}
      >
        <NewLogo />
      </Box>

      <Box
        component={'div'}
        sx={{
          width: '100%',
          padding: `${remConvert('32px 32px 32px 32px')}`,
          [theme.breakpoints.down(1200)]: {
            padding: `${remConvert('32px 20px 32px 20px')}`
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '8px',
          alignSelf: 'stretch',
          borderBottom: `1px solid ${home.gray300}`
        }}
      >
        <Box
          component={'div'}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px'
          }}
        >
          <IRHamburgerIcon pathProps={{ fill: home.blue600 }} />
          <Typography
            cate='large_title'
            sx={{
              color: home.blue600,
              fontSize: remConvert('20px'),
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '120%'
            }}
          >
            IR deck 선택하기
          </Typography>
        </Box>

        <Box
          component={'div'}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px'
          }}
        >
          <Typography
            component={'span'}
            cate='caption_1_semibold'
            sx={{
              color: lightPalette.main.gray50
            }}
          >
            총{' '}
            <Typography component={'span'} cate='caption_1_semibold' sx={{ color: '#0691AE' }}>
              {deckItemsSelected.length}
            </Typography>
            개
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default HeaderIRDrawer
