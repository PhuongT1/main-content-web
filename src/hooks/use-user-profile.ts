import { getUserProfile, updatePartialUserProfile } from '@/actions/apis/user.action'
import { userAtom } from '@/atoms/user'
import { IUser } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const useUserProfile = () => {
  const user = useRecoilValue(userAtom)
  const setUser = useSetRecoilState(userAtom)

  const getUserProfileAct = useMutation({
    mutationFn: getUserProfile
  })

  const updatePartialUserAct = useMutation({
    mutationFn: updatePartialUserProfile
  })

  const prefetchUserProfile = async () => {
    try {
      const result = await getUserProfileAct.mutateAsync()
      if (result?.id) {
        setUser(result)
        return result
      }
    } catch {
      throw new Error('get user profile fail')
    }
  }

  const updatePartialUser = async (payload: Partial<IUser>) => {
    try {
      const result = await updatePartialUserAct.mutateAsync(payload)
      if (result?.data?.data?.id) {
        setUser(result?.data?.data)
      }
    } catch {
      throw new Error('update user profile fail')
    }
  }
  return { prefetchUserProfile, updatePartialUser, user, setUser }
}
