'use client'
import { EditAlert } from '@/components/dialog'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { getMyMentorProfile } from '@/services/mentoring.service'
import getCurrentUrl from '@/utils/get-current-url'
import { useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { mentorTabVisibleAtom } from '../../mentor-activity-atom'
import ProfileEdit from './_components/profile-edit'
import ProfileView from './_components/profile-view'

const MentorProfile = () => {
  const theme = useTheme()
  const [key, setKey] = useState(Math.random().toString())
  // const [hydrate, setHydrate] = useState(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const setMentorTabVisible = useSetRecoilState(mentorTabVisibleAtom)

  const { open: openDialog, onClose: onCloseDialog, onOpen: onOpenDialog } = useDialog()
  const pathname = getCurrentUrl()
  const {
    data: mentorProfile,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['my-mentoring-profile'],
    queryFn: () => getMyMentorProfile()
  })
  useHydrate()
  // useEffect(() => {
  //   setHydrate(true)
  // }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  useEffect(() => {
    if (!mentorProfile?.data?.id && !isFetching) {
      onOpenDialog()
    }
  }, [mentorProfile])

  if (editMode) {
    return (
      <ProfileEdit
        onBack={() => {
          setMentorTabVisible(true)
          setEditMode(false)
          refetch()
        }}
        profile={mentorProfile?.data || null}
      />
    )
  }

  return (
    <>
      <ProfileView
        onEdit={() => {
          setMentorTabVisible(false)
          setEditMode(true)
        }}
        onRefetch={() => {
          refetch()
        }}
        showAlert={() => {
          onOpenDialog()
        }}
        profile={mentorProfile?.data || null}
      />
      <EditAlert
        onSubmit={async () => {
          onCloseDialog()
          setMentorTabVisible(false)
          setEditMode(true)
          // setExpanded(false)
          // setIsAnonymous(false)
          // setCategoryValue(categories[1]?.id)
          // form.reset()
        }}
        submitTxt={'프로필 등록하기'}
        cancelTxt={'취소'}
        onCancel={(event?: any) => {
          onCloseDialog()
        }}
        title={'멘토링 프로필을 등록해보세요.'}
        description={`아직 프로필 등록이 되지 않아, 커뮤니티 멘토링에 노출되지 않고 있습니다.\n프로필을 등록하고 멘토링 활동을 시작해보세요.`}
        open={openDialog}
      />
    </>
  )
}

export default MentorProfile
