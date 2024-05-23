import ChevronDownComment from '@/assets/icons/chevrons/chevron-down-comment'
import ChevronUpComment from '@/assets/icons/chevrons/chevron-up-comment'
import Typography from '@/elements/typography'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { IComment } from '@/types/comments.type'
import {
  Avatar,
  Box,
  Button as MButton,
  CircularProgress,
  Grid,
  GridProps,
  Stack,
  styled,
  useTheme
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import CommentChildItem from './CommentChildItem'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem'
import { createComment, deleteComment, getCommentsList } from '@/actions/apis/comment.action'

type CommentBlockProps = {
  item: IComment
  refetchParent?: any
}
type CustomReplyGroupProps = GridProps & {
  open: boolean
}
const CustomReplyGroup = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'open'
})<CustomReplyGroupProps>(({ theme, open }) => ({
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

const CommentBlock = ({ item }: CommentBlockProps) => {
  const theme = useTheme()
  const [openReplyInput, setOpenReplyInput] = useState<boolean>(false)
  const [openReplies, setOpenReplies] = useState<boolean>(false)
  const [commentData, setCommentData] = useState<IComment[]>([])
  const queryClient = useQueryClient()

  const { hasNextPage, isFetchingNextPage, fetchNextPage, refetch, isLoading } = useInfiniteScroll({
    key: `child-comment-of-content`,
    depend: [item.id, item.contentBlogId],
    meta: { offLoading: true },
    fn: (pageParam: any) =>
      getCommentsList({
        page: pageParam.page,
        limit: 10,
        contentBlogId: item.contentBlogId,
        parentId: item.id
      }),
    initialPageParam: {
      page: 1
    },
    onSuccess: (data) => {
      const page = data.pages
      let commentsDataRes: IComment[] = []

      page?.forEach((page: any) =>
        page?.data?.result?.forEach((x: IComment) => {
          commentsDataRes.push(x)
        })
      )
      setCommentData(commentsDataRes as IComment[])
    },
    enabled: false
  })

  const createChildCommentMutation = useMutation({
    mutationKey: ['create-child-comment-in-comment'],
    mutationFn: (comment: string) =>
      createComment({
        comment,
        contentBlogId: Number(item.contentBlogId),
        parentId: Number(item.id)
      }),
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['blog-detail', item.contentBlogId] })
      if (!openReplies) {
        setOpenReplies(true)
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  const deleteChildCommentMutation = useMutation({
    mutationKey: ['delete-comment'],
    mutationFn: async (id: string | number) => {
      const { data, error } = await deleteComment(id)
      if (error) throw error
      return data
    },
    onSuccess: async () => {
      await refetch()
      await queryClient.invalidateQueries({ queryKey: ['blog-detail', item.contentBlogId] })
      enqueueSnackbar('삭제가 완료되었습니다.', {
        variant: 'success'
      })
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  useEffect(() => {
    if (openReplies) {
      refetch()
    }
  }, [openReplies])

  return (
    <Box display={'flex'} flexDirection='column' mt={3}>
      <Box display={'flex'} alignItems={'flex-start'} flexWrap='nowrap'>
        <Avatar
          sx={{ width: '2.5rem', height: '2.5rem' }}
          src={!!item?.user?.avatar?.url ? item?.user?.avatar?.url : '/images/blank-user.png'}
        />
        <Box display={'flex'} flexDirection='column' alignItems={'flex-start'} width='100%' ml={2}>
          <CommentItem
            comment={(item || {}) as any}
            handleDelete={() => {
              deleteChildCommentMutation.mutate(item.id)
            }}
          />
          <MButton
            sx={{
              margin: '0.7rem  0',
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              width: 'auto',
              minWidth: 0
            }}
            onClick={() => {
              setOpenReplyInput(true)
            }}
          >
            <Typography
              cate='button_3_semibold'
              color={openReplyInput ? theme.palette.main.primary_light : theme.palette.main_grey.gray200}
            >
              댓글달기
            </Typography>
          </MButton>
          <CustomReplyGroup width={'100%'} open={openReplyInput} gap={2} display='flex'>
            <CommentInput
              isChildren
              fullWidth
              placeholder='답글추가...'
              submitTitle='답글추가'
              onCloseReply={() => {
                setOpenReplyInput(false)
              }}
              handleComment={createChildCommentMutation.mutate}
            />
          </CustomReplyGroup>
          {item.totalComment && item.totalComment > 0 ? (
            <MButton
              sx={{
                margin: '0.7rem  0',
                padding: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                width: 'auto',
                minWidth: 0
              }}
              onClick={() => {
                setOpenReplies((prev) => !prev)
              }}
            >
              {openReplies ? <ChevronUpComment /> : <ChevronDownComment />}
              <Typography cate='button_3_semibold' color={theme.palette.main.primary_light} ml={0.6}>
                댓글 {item.totalComment}개
              </Typography>
            </MButton>
          ) : null}
          <CustomReplyGroup width={'100%'} open={openReplies} container gap={3}>
            {commentData.length > 0 ? (
              commentData.map((x: IComment) => (
                <Grid item xs={12} key={x.id}>
                  <CommentChildItem
                    comment={x}
                    handleDelete={() => {
                      deleteChildCommentMutation.mutate(x.id)
                    }}
                  />
                </Grid>
              ))
            ) : (
              <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress color='primary' />
              </Stack>
            )}
            {hasNextPage ? (
              <Grid item xs={12}>
                {isFetchingNextPage ? <CircularProgress color='primary' /> : null}
                <MButton
                  sx={{
                    margin: '0.7rem  0',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: 'auto',
                    minWidth: 0
                  }}
                  onClick={() => {
                    fetchNextPage()
                  }}
                >
                  <Typography cate='button_3_semibold' color={theme.palette.main.primary_light}>
                    더 많은 답글 표시
                  </Typography>
                </MButton>
              </Grid>
            ) : null}
          </CustomReplyGroup>
        </Box>
      </Box>
    </Box>
  )
}
export default CommentBlock
