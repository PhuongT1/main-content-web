'use client'
import { chatServiceAtom } from '@/atoms/user'
import { Typography } from '@/elements'
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'

function CometChatNoSSR({ contacintUser, group }: { contacintUser?: CometChat.User; group?: CometChat.Group }) {
  const chatService = useRecoilValue(chatServiceAtom)
  const theme = useTheme()
  const { user } = chatService || {}

  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  console.log('contacintUser', contacintUser)
  return user ? (
    <Box
      sx={{
        height: '100%',
        '& .cc-tab-list': {
          width: '90% !important',
          left: 0,
          right: 0,
          mx: 'auto',
          top: '10px !important'
        },
        '& .input-container': {
          width: '100%'
        },
        //Remove AI button on message composer
        '& .cc-message-composer__ai-btn-wrapper': {
          display: 'none'
        }
      }}
    >
      <CometChatConversationsWithMessages isMobileView={mdMatches} group={group} user={contacintUser} />
    </Box>
  ) : (
    <Typography>Loading...</Typography>
  )
}

export default CometChatNoSSR
