'use client'
import { Box, Stack, styled, useTheme } from '@mui/material'
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { remConvert } from '@/utils/convert-to-rem'
import { getProjectDetail } from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import BookmarkIcon from '@/assets/icons/bookmark'
import { Typography } from '@/elements'
import { ButtonItem } from '@/components/home/button'
import { useRecoilState } from 'recoil'
import DeckList from './deck-list'
import LoadingComponent from '@/components/loading'
import { loadingProjectAtom } from './loading-project-detail'
import {
  EXPLORER_CATEGORY_ENUM,
  IDetailProject,
  PROJECT_TYPE_ENUM
} from '@/app/(main-routes)/project-home/_modules/domain'
import moment from 'moment'
import { TagStatus } from '../atoms'
import ChatGroup from './chat-group'
import { useExplorerProjectContext } from '../../../utils'
import ModalPremiumOnly from '../organisms/modal-premium-only'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { v4 as uuidv4 } from 'uuid'
import { useLanguage } from '@/hooks/use-language'
import { BookmarkProjectPayload } from '../../../use-cases'

interface Props {
  id: number | string
  isShare?: boolean
  premiumOnly?: boolean
  showCreaer?: boolean
  showEditIR?: boolean
  showChatting?: (dataProject: IDetailProject) => boolean
  showEditDeck?: (dataProject: IDetailProject) => boolean
  showEditProject?: (dataProject: IDetailProject) => boolean
  inforArea?: (dataProject: IDetailProject) => ReactNode
  deleteProject?: (dataProject: IDetailProject) => ReactNode
}

export const KEY_PROJECT_DETAIL = 'get-project-detail'

const LayoutProjectDetail: FC<Props> = ({
  id,
  isShare,
  showCreaer,
  premiumOnly,
  showEditIR = false,
  showChatting = () => false,
  showEditDeck = () => false,
  showEditProject = () => false,
  deleteProject,
  inforArea
}) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const queryClient = useQueryClient()
  const [isloading] = useRecoilState(loadingProjectAtom)
  const { isFreeUser, tabData, bookmarkProjectMutation } = useExplorerProjectContext()
  const [totalUserChat, setTotalUserChat] = useState<number>(0)
  const { data } = useQuery({
    queryKey: [KEY_PROJECT_DETAIL, id],
    queryFn: () => getProjectDetail(id, isShare, tabData?.category),
    enabled: !(premiumOnly && isFreeUser)
  })

  const getTotalUserChatting = useCallback(
    (chatGroupUid?: string) => {
      if (chatGroupUid && data) {
        CometChat.getGroup(chatGroupUid).then((group) => {
          setTotalUserChat(group.getMembersCount())
          return
        })
      }
    },
    [data?.chatGroupUid]
  )

  const updateBookmark = (bookmark: boolean) => {
    queryClient.setQueryData([KEY_PROJECT_DETAIL, id], {
      ...data,
      bookmark
    })
  }

  const onBookmark = () => {
    if (data) {
      const dataBody = {
        explorerIds: [data.explorerId],
        category: isShare ? EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS : tabData?.category
      } as BookmarkProjectPayload
      bookmarkProjectMutation
        .mutateAsync(dataBody)
        .then(() => updateBookmark(!data.bookmark))
        .catch(() => updateBookmark(data.bookmark))
    }
  }

  useEffect(() => {
    if (data && data.chatGroupUid && showChatting(data)) {
      getTotalUserChatting(data.chatGroupUid)
      let listenerID: string = uuidv4()
      CometChat.addMessageListener(
        listenerID,
        new CometChat.MessageListener({
          onTextMessageReceived: async () => {
            getTotalUserChatting(data.chatGroupUid)
          }
        })
      )
      return () => CometChat.removeMessageListener(listenerID)
    }
  }, [data?.chatGroupUid])

  if (premiumOnly && isFreeUser) return <ModalPremiumOnly open={true} onClose={() => {}} /> //TODO
  if (!data) return <></>
  return (
    <Stack gap={remConvert('20px')} color={home.gray50}>
      <Stack gap={remConvert('12px')}>
        {showCreaer && (
          <Stack direction='row' gap={remConvert('12px')}>
            <Typography cate='sub_title_30' color={home.mint500}>
              {data.creator.nickname}
            </Typography>
            <Typography cate='body_30' color={home.gray100}>
              {dict.project_home_detail_your_project}
            </Typography>
          </Stack>
        )}
        <Stack direction='row' gap={remConvert('12px')}>
          <TagStatus type={PROJECT_TYPE_ENUM.INDIVIDUAL} status={data.status} isDetail />
          <Typography cate='title_5_semibold' flexGrow={1}>
            {data.name}
          </Typography>
          <Box>
            <Stack direction='row' gap={remConvert('12px')}>
              <ButtonItem sx={{ padding: remConvert('10px 24px'), minWidth: 'unset' }} onClick={() => onBookmark()}>
                <BookmarkIcon
                  width={24}
                  height={24}
                  stroke={data.bookmark ? home.blue500 : home.alpha_white_12}
                  fill={data.bookmark ? home.blue500 : home.gray200}
                />
              </ButtonItem>
              {deleteProject && deleteProject(data)}
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack direction='row' gap={remConvert('40px')}>
        <DeckList
          dataProject={data}
          showEditDeck={showEditDeck(data)}
          showEditIR={showEditIR}
          showEditProject={showEditProject(data)}
        />
        <Stack gap={remConvert('20px')} width={remConvert('400px')}>
          <Stack
            direction={'row'}
            gap={remConvert('10px')}
            sx={{ borderRadius: remConvert('12px'), backgroundColor: home.gray400, padding: remConvert('16px') }}
          >
            <Container justifyContent={'center'}>
              <Typography textAlign={'center'} cate='title_60_nomal'>
                {data.decks.length}
              </Typography>
              <Typography textAlign={'center'} cate='caption_20' color={home.gray100}>
                Deck
              </Typography>
            </Container>
            <Container justifyContent={'center'}>
              <Typography textAlign={'center'} cate='title_60_nomal' color={home.mint500}>
                {moment.utc(data.progressTime * 1000).format('mm:ss')}
              </Typography>
              <Typography textAlign={'center'} cate='caption_20' color={home.gray100}>
                {dict.project_home_detail_progress_time}
              </Typography>
            </Container>
            <Container justifyContent={'center'}>
              {/* <Badge
                // variant='dot'
                sx={{
                  marginInline: 'auto',
                  '& .MuiBadge-badge': {
                    transform: 'scale(1) translate(100%, 0%)',
                    borderRadius: '250rem',
                    background: home.red500
                  }
                }}
              > */}
              <Typography textAlign={'center'} cate='title_60_nomal'>
                {showChatting(data) ? totalUserChat : data.totalFeedbacks}
              </Typography>
              {/* </Badge> */}
              <Typography textAlign={'center'} cate='caption_20' color={home.gray100}>
                {showChatting(data) ? dict.project_home_infor_chatting_title : dict.project_home_infor_feedback_title}
              </Typography>
            </Container>
          </Stack>
          {inforArea && inforArea(data)}
        </Stack>
      </Stack>
      {showChatting(data) && data.chatGroupUid && <ChatGroup chatGroupUid={data.chatGroupUid} />}
      <LoadingComponent open={isloading} />
    </Stack>
  )
}
export default LayoutProjectDetail

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
