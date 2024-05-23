'use client'
import { ChatServiceEnum, chatServiceAtom } from '@/atoms/user'
import { Dialog, ExceedingAlert } from '@/components'
import { ERRORS, KR_LOCALIZATION } from '@/constants/chat.constant'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getChatAuthToken } from '@/services/chatting.service'
import { TUnreadMessage } from '@/types/chat.type'
import { isEmpty } from '@/utils/object'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import {
  CometChatLocalize,
  CometChatPalette,
  CometChatTheme,
  CometChatThemeContext,
  CometChatUIKit,
  UIKitSettingsBuilder,
  fontHelper
} from '@cometchat/chat-uikit-react'
import { useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

const CometChatNoSSR = dynamic(() => import('@/components/chatting/chat-section'), {
  ssr: false
})

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(process.env.NEXT_PUBLIC_COMECHAT_APP_ID || '')
  .setRegion(process.env.NEXT_PUBLIC_COMECHAT_REGION || '')
  .setAuthKey(process.env.NEXT_PUBLIC_COMECHAT_AUTH_KEY || '')
  .build()

CometChatLocalize.init('en', {
  en: KR_LOCALIZATION
})

const ComeChatProvider = () => {
  const setChatService = useSetRecoilState(chatServiceAtom)
  const chatServices = useRecoilValue(chatServiceAtom)
  const [contactingUser, setContactingUser] = useState<CometChat.User>()
  const [contactingGroup, setContactingGroup] = useState<CometChat.Group>()
  const { open, onClose, onOpen } = useDialog()
  const { open: openNoUser, onClose: onCloseNoUser, onOpen: onOpenNoUser } = useDialog()
  const [libraryImported, setLibraryImported] = useState(false)
  const { theme } = useContext(CometChatThemeContext)
  const MTheme = useTheme()
  const { user } = useUserProfile()
  const mdMatches = useMediaQuery(MTheme.breakpoints.down('md'))

  const getChatAuthTokenAct = useMutation({
    mutationFn: getChatAuthToken,
    meta: {
      offLoading: true
    }
  })

  const themeContext = useMemo(() => {
    let res = theme
    res = new CometChatTheme({
      palette: new CometChatPalette({
        mode: MTheme.palette.mode,
        background: {
          light: MTheme.palette.color.chat.background,
          dark: MTheme.palette.color.chat.background
        }
      })
    })

    return { theme: res }
  }, [theme, MTheme.palette.mode])

  useEffect(() => {
    if (!libraryImported) {
      ;(window as any).CometChat = require('@cometchat/chat-sdk-javascript').CometChat
      setLibraryImported(true)
    }
  })

  useEffect(() => {
    getAuthTokenFn()
  }, [user])

  useEffect(() => {
    let listenerID: string = uuidv4()

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: async (textMessage: CometChat.TextMessage) => {
          console.log('Text message received successfully', textMessage)
          getCount()
        }
      })
    )

    return () => CometChat.removeMessageListener(listenerID)
  }, [chatServices?.user])

  useEffect(() => {
    getCount()
  }, [chatServices?.user])

  let badgeStyle = {
    textFont: fontHelper(theme.typography.subtitle2),
    textcolor: theme.palette.getAccent('dark'),
    background: '#3399ff',
    borderRadius: '16px',
    width: 'fit-content',
    height: '16px',
    border: 'none'
  }

  const getParticularUserDetails = async (uid: string) => {
    return await CometChat.getUser(uid)
      .then((user) => {
        console.log('get user successfully detail', user)
        return user
      })
      .catch((e: CometChat.ErrorModel) => {
        if (ERRORS.has(e.code as string)) {
          onOpenNoUser()
        }
        return undefined
      })
  }

  const getParticularGroupDetails = async (uid?: string) => {
    if (!uid) return undefined
    return await CometChat.getGroup(uid).then((user) => {
      console.log('get user successfully detail', user)
      return user
    })
    // .catch((e: CometChat.ErrorModel) => {
    //   console.log('catch((e: CometChat.ErrorModel)')
    //   if (ERRORS.has(e.code as string)) {
    //     onOpenNoUser()
    //   }
    //   return undefined
    // })
  }

  const onOpenDialog = async (uuid?: string, type?: ChatServiceEnum) => {
    if (uuid) {
      switch (type) {
        case ChatServiceEnum.GROUP:
          const group = await getParticularGroupDetails(uuid)
          setContactingGroup(group)
          break
        default:
          const user = await getParticularUserDetails(uuid)
          if (!user) return
          setContactingUser(user)
      }
    }
    onOpen()
  }

  const onCloseDialog = () => {
    getCount()
    setContactingUser(undefined)
    onClose()
  }

  const getAuthTokenFn = async () => {
    const result = await getChatAuthTokenAct.mutateAsync()
    if (result?.authToken) {
      login(result?.authToken)
    }
  }

  const login = (authToken: string) => {
    CometChatUIKit.init(UIKitSettings)!
      .then(() => {
        console.log('Comechat initialization completed successfully')
        CometChatUIKit.getLoggedinUser().then((loggedUser: CometChat.User | null) => {
          if (!loggedUser) {
            CometChatUIKit.loginWithAuthToken(authToken)
              .then((user) => {
                console.log('Comechat user login successful', { user })
                setChatService({
                  user,
                  onClose: onCloseDialog,
                  onOpen: onOpenDialog
                })
              })
              .catch((error) => console.log(error))
          } else {
            console.log('Comechat user Already logged-in', { loggedUser })
            // Revalidate
            if (loggedUser?.getUid() !== user?.uuid) {
              CometChat.logout()
              getAuthTokenFn()
              return
            }
            setChatService({
              user: loggedUser,
              onClose: onCloseDialog,
              onOpen: onOpenDialog
            })
          }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getCount = async () => {
    const getCountByGroup = (data: { [k: string]: number } | undefined) => {
      let totalCount = 0
      if (data && !isEmpty(data)) {
        totalCount = Object.entries(data).reduce((accumulator, [uuid, value]) => {
          return uuid === 'app_system' ? accumulator : accumulator + value
        }, 0)
      }
      return totalCount
    }
    const curUid = chatServices?.user.getUid()
    if (curUid) {
      const count = (await CometChat.getUnreadMessageCount()) as TUnreadMessage
      let unreadMsg = 0
      unreadMsg += getCountByGroup(count.users)
      unreadMsg += getCountByGroup(count.groups)
      // setUnreadMsg(unreadMsg)
      chatServices && setChatService({ ...chatServices, unreadMsg })
    }
  }

  return (
    <CometChatThemeContext.Provider value={themeContext}>
      {/* <IconButton
        disableRipple
        onClick={() => (open ? onCloseDialog() : onOpen())}
        sx={{
          position: 'fixed',
          zIndex: 2000,
          right: '12px',
          bottom: '12px',
          p: 2,
          border: '1px solid',
          borderColor: 'popup.general.stroke_divider',
          bgcolor: 'popup.general.background.color'
        }}
      >
        <ChatIcon />
        <Box position={'absolute'} top={'-5px'} right={'-5px'}>
          <cometchat-badge count={unreadMsg} badgeStyle={JSON.stringify(badgeStyle)} />
        </Box>
      </IconButton> */}
      <Dialog
        fullScreen={mdMatches}
        onClose={onCloseDialog}
        open={open}
        PaperProps={{ sx: { maxWidth: 1200, width: mdMatches ? '100%' : '80%', height: '100%' } }}
      >
        <CometChatNoSSR group={contactingGroup} contacintUser={contactingUser} />
      </Dialog>
      <ExceedingAlert
        onSubmit={onCloseNoUser}
        submitTxt={'확인'}
        title={'사용자를 찾을 수 없습니다'}
        open={openNoUser}
      />
    </CometChatThemeContext.Provider>
  )
}

export default ComeChatProvider
