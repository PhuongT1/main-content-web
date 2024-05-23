import { IUser } from '@/types/user.type'
import { atom } from 'recoil'

export const userAtom = atom<IUser | null>({
  key: 'userAtom',
  default: null
})

export enum ChatServiceEnum {
  GROUP = 'GROUP',
  USER = 'GROUP'
}

type TChatServiceAtom = {
  user: CometChat.User
  unreadMsg?: number
  onOpen: (uuid?: string, type?: ChatServiceEnum) => void
  onClose: () => void
}

export const chatServiceAtom = atom<TChatServiceAtom | null>({
  key: 'chatServiceAtom',
  default: null
})
