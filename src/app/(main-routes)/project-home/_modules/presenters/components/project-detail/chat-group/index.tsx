'use client'
import { Badge, IconButton, Stack, styled } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { ChatServiceEnum, chatServiceAtom } from '@/atoms/user'
import { useRecoilValue } from 'recoil'
import ChatProjectIcon from '@/assets/icons/chat-project'

interface Props {
  chatGroupUid: string
}

const ChatGroup: FC<Props> = ({ chatGroupUid }) => {
  const chatServices = useRecoilValue(chatServiceAtom)
  return (
    <IconButton
      disableRipple
      onClick={() => chatServices?.onOpen(chatGroupUid, ChatServiceEnum.GROUP)}
      sx={{
        borderRadius: remConvert('16px'),
        border: '1px solid #0F87D8',
        position: 'fixed',
        zIndex: 2000,
        right: '32px',
        bottom: '48px',
        p: 2,
        background: '#112946'
      }}
    >
      <Badge badgeContent={chatServices?.unreadMsg || 0} color='error'>
        <ChatProjectIcon />
      </Badge>
    </IconButton>
  )
}
export default ChatGroup

export const Container = styled(Stack)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    backgroundColor: home.gray300,
    borderRadius: remConvert('10px'),
    padding: remConvert('12px'),
    flexGrow: 1,
    justifyContent: 'center',
    width: 0
  })
)
