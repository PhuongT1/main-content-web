import { IComment } from '@/types/comments.type'
import { Avatar, Box, styled, useTheme } from '@mui/material'
import { useState } from 'react'
import CommentItem from './CommentItem'

type CommentChildItemProps = {
  comment: IComment
  handleDelete: any
  // handleReport: any
}

const CustomReplyGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<any>(({ theme, open }) => ({
  overflow: 'hidden',
  ...(open && {
    height: '100%',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(!open && {
    height: 0,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
}))

const CommentChildItem = ({ comment, handleDelete }: CommentChildItemProps) => {
  const theme = useTheme()
  const [openReply, setOpenReply] = useState<boolean>(false)
  return (
    <Box display={'flex'} alignItems={'flex-start'} flexWrap='nowrap'>
      <Avatar
        sx={{ width: '2.5rem', height: '2.5rem' }}
        src={!!comment?.user.avatar?.url ? comment?.user.avatar?.url : '/images/blank-user.png'}
      />
      <Box display={'flex'} flexDirection='column' alignItems={'flex-start'} width='100%' ml={2}>
        <CommentItem comment={comment} handleDelete={handleDelete} />
      </Box>
    </Box>
  )
}
export default CommentChildItem
