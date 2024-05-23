'use client'
import { useEffect, useMemo, useState } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { Stack, useTheme } from '@mui/material'
import { CSSObject, Theme, styled } from '@mui/material/styles'
import { IDeckSelected } from '@/app/(main-routes)/project-home/_modules/domain'
import { appbarHeight, drawerWidth } from '@/utils/constants'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useIREditContext } from '../../utils/provider'
import HeaderIRDrawer from './component/headerIRDrawer'
import GroupButtonsIRDrawer from './component/groupButtonsIRDrawer'
import ListDecks from './component/listDecks'

const openedMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: convertToRem(drawerWidth)
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

// Style of IR drawer (GNB).
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: 'auto',
  minWidth: remConvert('240px'),
  height: convertToRem(appbarHeight),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  padding: remConvert('0px'),
  backgroundColor: theme.palette.main.black,
  backgroundImage: 'none',
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.main.black,
    backgroundImage: 'none'
  },
  scrollbarWidth: 'none',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      border: 'none'
    }
  })
}))

type IRDrawerProps = {}

const IRDrawer = () => {
  const theme = useTheme()
  const { projectDetail } = useIREditContext()
  const decks = useMemo(() => projectDetail.decks || [], [projectDetail])
  const [deckItemsSelected, setDeckItemsSelected] = useState<IDeckSelected[]>(decks || [])

  useEffect(() => {
    setDeckItemsSelected(decks)
  }, [decks])

  return (
    <Drawer
      variant='permanent'
      sx={{
        display: 'block',
        '.MuiPaper-root': {
          backgroundColor: theme.palette.home.gray600
        }
      }}
    >
      <Stack
        direction={'column'}
        flexWrap={'nowrap'}
        sx={{
          padding: `${remConvert('104px 0px 0px 0px')}`
        }}
      >
        <HeaderIRDrawer deckItemsSelected={deckItemsSelected} />

        <Stack
          sx={{
            [theme.breakpoints.up('md')]: {
              width: convertToRem(drawerWidth)
            },
            height: '100%',
            padding: `${remConvert('32px 32px 56px 32px')}`,
            [theme.breakpoints.down(1200)]: {
              padding: `${remConvert('32px 20px 56px 20px')}`
            },
            boxSizing: 'content-box'
          }}
          direction={'column'}
          justifyContent={'space-between'}
        >
          <ListDecks deckItemsSelected={deckItemsSelected} setDeckItemsSelected={setDeckItemsSelected} />

          <GroupButtonsIRDrawer />
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default IRDrawer
