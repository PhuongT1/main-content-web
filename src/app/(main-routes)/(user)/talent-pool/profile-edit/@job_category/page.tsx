'use client'
import { getOccupationCate } from '@/actions/apis/talent-pool.action'
import { profileAtom, submitProfileAtom } from '@/app/(main-routes)/(user)/talent-pool/profile-atom'
import { SecondaryActiveChip, Typography } from '@/elements'
import { ActiveChip } from '@/elements/v2/chip'
import { convertToRem } from '@/utils/convert-to-rem'
import { Skeleton, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

const JobCategoryEdit = () => {
  const talentProfile = useRecoilValue(profileAtom)
  const [editProfile, setEditProfile] = useRecoilState(submitProfileAtom)

  const { data: occupationsList, isFetching } = useQuery({
    queryKey: ['occupation-category'],
    queryFn: async () => await getOccupationCate(),
    meta: {
      offLoading: true
    }
  })

  const handleCheckOccupation = (id: number) => {
    if (editProfile.occupations.length >= 3 && !editProfile.occupations.some((val) => val.id === id)) {
      // Maximum reached, prevent additions unless already selected
      return
    }
    if (editProfile.occupations.some((val) => val.id === id)) {
      const newCheckedIds = editProfile.occupations.filter((i) => i.id !== id)
      // if (newCheckedIds.length < 2) {
      //   // Prevent removal below minimum
      //   return
      // }
      setEditProfile({ ...editProfile, occupations: newCheckedIds })
    } else {
      // Add if not selected
      setEditProfile({
        ...editProfile,
        occupations: [...editProfile.occupations, { id }]
      })
    }
  }

  useEffect(() => {
    if (talentProfile && talentProfile.occupations?.length > 0) {
      setEditProfile({
        ...editProfile,
        occupations: talentProfile.occupations.map((val) => {
          return { id: val.id }
        })
      })
    }
  }, [talentProfile])

  return !isFetching && occupationsList ? (
    <Stack direction={'column'} gap={2}>
      <Stack direction={'row'} gap={2} alignItems={'flex-end'}>
        <Typography cate={'title_50'}>
          직군 선택
          <Typography component={'span'} plainColor={'sub.error_red'} cate={'title_50'}>
            *
          </Typography>
        </Typography>
        <Typography cate={'body_20'} plainColor={'main_grey.gray300'}>
          최소 1개 이상 최대 3개까지 선택해 주세요.
        </Typography>
      </Stack>
      <Stack direction={'row'} width={'inherit'} gap={1} flexWrap={'wrap'} useFlexGap>
        {occupationsList.data?.map((item, index) =>
          editProfile.occupations.some((val) => val.id === item.id) ? (
            <ActiveChip
              key={item.id}
              sx={{
                height: convertToRem(44),
                minWidth: convertToRem(85)
              }}
              onClick={() => handleCheckOccupation(item.id)}
              label={
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  {item.name}
                </Typography>
              }
              clickable
            />
          ) : (
            <SecondaryActiveChip
              key={item.id}
              chipHeight={44}
              sx={{
                minWidth: convertToRem(85)
              }}
              label={
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  {item.name}
                </Typography>
              }
              onClick={() => handleCheckOccupation(item.id)}
              clickable
            />
          )
        )}
      </Stack>
    </Stack>
  ) : (
    <Skeleton variant='rounded' width={'100%'} height={convertToRem(44)} />
  )
}

export default JobCategoryEdit
