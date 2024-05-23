'use client'

import { getOccupationCate } from '@/actions/apis/talent-pool.action'
import { SecondaryActiveChip, SolidInput, Typography } from '@/elements'
import { ActiveChip } from '@/elements/v2/chip'
import { File, IOccupation } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Divider, Skeleton, Stack, useMediaQuery } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { submitProfileAtom } from '../../../profile-atom'

const OccupationRegistration = () => {
  const mdDown = useMediaQuery('(max-width: 768px)')
  const [talentProfile, setTalentProfile] = useRecoilState(submitProfileAtom)
  const { data: occupations, isFetching } = useQuery({
    queryKey: ['occupation-category'],
    queryFn: async () => await getOccupationCate()
  })

  const handleCheckOccupation = (id: number) => {
    if (talentProfile.occupations.length >= 3 && !talentProfile.occupations.some((val) => val.id === id)) {
      return
    }
    if ((talentProfile.occupations as File[]).some((val) => val.id === id)) {
      const newCheckedIds = (talentProfile.occupations as File[]).filter((i) => i.id !== id)
      setTalentProfile({ ...talentProfile, occupations: newCheckedIds })
    } else {
      setTalentProfile({
        ...talentProfile,
        occupations: [...(talentProfile.occupations as File[]), { id }]
      })
    }
  }

  return (
    <Stack width={'100%'} direction={'column'} alignItems={'center'} gap={6}>
      <Stack direction={'column'} alignItems={'center'} gap={2}>
        <Typography cate='sub_title_20' plainColor='main_primary.blue500'>
          Step 1
        </Typography>
        <Typography
          cate={mdDown ? 'title_70' : 'title_80'}
          sx={{ width: { md: '100%', sm: '65dvw' } }}
          textAlign={'center'}
        >
          내가 속한 직군을 입력해 주세요.
        </Typography>
        <Typography cate='body_40' plainColor='main_grey.gray400'>
          최소 1개 이상 최대 3개를 선택해 주세요.
        </Typography>
      </Stack>
      <Stack direction={'column'} alignItems={'flex-start'} gap={2}>
        <Typography cate='body_40'>직군</Typography>
        {!isFetching && occupations?.data ? (
          <Stack
            direction={'row'}
            width={'inherit'}
            alignItems={'center'}
            gap={1}
            justifyContent={'center'}
            flexWrap={'wrap'}
            useFlexGap
          >
            {occupations?.data.map((item: IOccupation) =>
              (talentProfile.occupations as File[]).some((val) => val.id === item.id) ? (
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
        ) : (
          <Skeleton variant='rounded' width={'100%'} height={convertToRem(44)} />
        )}
      </Stack>
      <Stack width={'inherit'} gap={1}>
        <Typography cate='body_30'>직함</Typography>
        <SolidInput
          inputSize='md'
          placeholder='나를 알릴 수 있는 직함을 입력해주세요.'
          fullWidth
          value={talentProfile.title}
          onChange={(event) => {
            const title = event.target.value
            setTalentProfile({ ...talentProfile, title })
          }}
        />
      </Stack>
      <Divider
        sx={{
          width: 'inherit'
        }}
      />
    </Stack>
  )
}

export default OccupationRegistration
