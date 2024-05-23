'use client'
import { Box, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { IconButton, PrimaryTextarea, Typography } from '@/elements'
import ScrollBar from 'react-perfect-scrollbar'
import { IDetailProject, IS_HAVE_FEEDBACK } from '@/app/(main-routes)/project-home/_modules/domain'
import {
  getProjectFeedbacks,
  sendProjectFeedbacks
} from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import IconSend from '@/assets/icons/ic-send'
import { TFeedBacks } from '@/app/(main-routes)/project-home/_modules/domain/entities/feedback-project'
import UserFeedBack from './user-feedback'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { USER_ROLE } from '@/constants/user.constants'
import { useRouter } from 'next/navigation'
import { KEY_PROJECT_DETAIL } from '../../layout-project-detail'
import { useLanguage } from '@/hooks/use-language'

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

interface Props {
  dataProject: IDetailProject
}

const InfoFeedBack: FC<Props> = ({ dataProject }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const queryClient = useQueryClient()
  const router = useRouter()
  const user = useRecoilValue(userAtom)
  const [contentFeedback, setContentFeedback] = useState<string>('')

  const isAdmin = user?.role === USER_ROLE.ADMIN
  const isShowFeedBack = IS_HAVE_FEEDBACK.includes(dataProject.type) || isAdmin
  const heightFeedBack = isAdmin ? remConvert('486px') : remConvert('240px')

  const { data, fetchNextPage, hasNextPage, isFetching, isRefetching, refetch } = useInfiniteQuery({
    queryKey: ['getCourseSubject', dataProject.id],
    queryFn: async (param) => {
      return getProjectFeedbacks(dataProject.id, param.pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: ({ metaData }) => {
      dataProject.totalFeedbacks !== metaData.totalRecords &&
        queryClient.setQueryData([KEY_PROJECT_DETAIL, `${dataProject.id}`], {
          ...dataProject,
          totalFeedbacks: metaData.totalRecords
        })
      return metaData.currentPage < metaData.totalPages ? metaData.currentPage + 1 : undefined
    },
    meta: {
      offLoading: true
    }
  })

  const listFeedBack = useMemo(() => {
    return (
      data?.pages?.reduce((accumulator: TFeedBacks[], current) => {
        return [...accumulator, ...current.result]
      }, []) || []
    )
  }, [data?.pages])

  const { mutate: sendFeedback, isPending: isPendingSendFeedback } = useMutation({
    mutationFn: () => sendProjectFeedbacks(dataProject.id, contentFeedback),
    onSuccess: () => {
      setContentFeedback('')
      refetch()
    },
    onError(error, variables) {},
    meta: {
      offLoading: true
    }
  })

  return (
    <Stack
      gap={remConvert('20px')}
      sx={{
        display: isShowFeedBack ? 'flex' : 'none',
        borderRadius: remConvert('12px'),
        backgroundColor: home.gray400,
        padding: remConvert('20px 16px')
      }}
    >
      <Typography cate='link_30'>{dict.project_home_infor_feedback_title}</Typography>
      <Box
        sx={{
          backgroundColor: home.gray300,
          borderRadius: remConvert('10px')
        }}
      >
        <ScrollBar
          onYReachEnd={() => hasNextPage && !isFetching && fetchNextPage()}
          style={{
            height: heightFeedBack,
            marginLeft: remConvert('-3px'),
            marginRight: remConvert('-3px'),
            marginInline: remConvert('4px')
          }}
        >
          <Box
            sx={{
              paddingInline: remConvert('12px'),
              '>:not(:last-child)': {
                borderBottom: `1px solid ${home.gray200}`
              }
            }}
          >
            {listFeedBack.map((data, index) => {
              return <UserFeedBack key={data.id} feedbackItem={data} onAfterAction={() => refetch()} />
            })}
          </Box>
        </ScrollBar>
        <Box padding={remConvert('12px')} sx={{ display: isAdmin ? 'none' : 'block', position: 'relative' }}>
          <PrimaryTextarea
            onChange={(e) => {
              if (e.target.value.length > 50) return
              setContentFeedback(e.target.value)
            }}
            value={contentFeedback}
            minRows={3}
            maxLength={50}
            placeholder={dict.project_home_infor_feedback_placeholder}
            sx={{
              background: home.gray200,
              width: '100%',
              borderColor: `${home.gray200} !important`,
              boxShadow: 'unset !important',
              paddingRight: remConvert('60px')
            }}
          />
          <IconButton
            color='primary'
            isLoading={isRefetching || isPendingSendFeedback}
            disabled={isRefetching || isPendingSendFeedback}
            onClick={() => contentFeedback && sendFeedback()}
            sx={{
              position: 'absolute',
              right: remConvert('28px'),
              top: remConvert('24px'),
              padding: remConvert('5.16px'),
              height: 'unset',
              backgroundColor: home.blue500,
              border: '0',
              borderRadius: remConvert('4px'),
              '.MuiCircularProgress-root': {
                width: remConvert('18px'),
                height: remConvert('18px')
              }
            }}
          >
            <IconSend />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  )
}
export default InfoFeedBack
