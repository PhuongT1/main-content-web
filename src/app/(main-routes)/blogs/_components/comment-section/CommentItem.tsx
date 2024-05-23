import { userAtom } from '@/atoms/user'
import Typography from '@/elements/typography'
import { IComment } from '@/types/comments.type'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { Box, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import CommentActionMenu from './CommentActionMenu'

type CommentItemProps = {
  comment: IComment
  handleDelete: any
}

const CommentItem = ({ comment, handleDelete }: CommentItemProps) => {
  const theme = useTheme()
  const user = useRecoilValue(userAtom)

  return (
    <Box display={'flex'} flexDirection='row' alignItems={'flex-start'} justifyContent={'space-between'} width='100%'>
      <Box display={'flex'} flexDirection='column' alignItems={'flex-start'} width='100%'>
        <Box display={'flex'} alignItems={'center'}>
          <Typography cate='caption_2_semibold' color={theme.palette.main.white}>
            {comment?.user?.nickname}
          </Typography>
          <Typography cate='caption_2' ml={0.5} color={theme.palette.main_grey.gray300}>
            {displayTimeDiff(comment.createdAt)}
          </Typography>
        </Box>
        <Typography
          cate='caption_1'
          mt={0.5}
          color={theme.palette.main_grey.gray200}
          sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', textWrap: 'pretty' }}
        >
          {comment?.comment}
        </Typography>
      </Box>
      <CommentActionMenu
        isOwn={Number(user?.id) == Number(comment.userId) || false}
        handleDelete={handleDelete}
        commentId={comment.id}
        isReport={comment.isReport}
      />
    </Box>
  )
}
export default CommentItem
