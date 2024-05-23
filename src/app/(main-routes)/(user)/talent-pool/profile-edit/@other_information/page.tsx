'use client'
import { InputTags } from '@/components'
import { PrimaryTextarea, Typography } from '@/elements'
import { ProjectForm } from '@/types/pool.type'
import { Box, Grid, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import AddressMenu from '../../_components/AddressMenu'
import { profileAtom, submitProfileAtom } from '../../profile-atom'
import { getTextStyles } from '@/themes/get-design-tokens'

const OtherInformation = () => {
  const theme = useTheme()
  const datePickerRef = useRef<any>(null)
  const [profiles, setProfiles] = useRecoilState(profileAtom)
  const [submitProfile, setSubmitProfiles] = useRecoilState(submitProfileAtom)

  const removeProject = (id: string) => {
    const newProjectList = [...submitProfile.projects].filter((item: ProjectForm) => item.formId !== id)
    setSubmitProfiles({ ...submitProfile, projects: newProjectList })
  }

  const onDistrictClick = (city: string, district: string) => {
    setSubmitProfiles({ ...submitProfile, city: city, district: district })
  }
  useEffect(() => {
    setSubmitProfiles({
      ...submitProfile,
      skills: profiles?.skills,
      city: profiles.city,
      district: profiles.district,
      introduction: profiles.introduction
    })
  }, [])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography cate='title_50'>기타 정보 등록</Typography>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Grid container>
          <Grid item xs={12} lg={6} rowSpacing={1}>
            <Box display={'flex'} flexDirection='column' gap={1}>
              <Box
                sx={{ display: 'flex', gap: 1 }}
                alignItems={{ xs: 'flex-start', lg: 'flex-end' }}
                flexDirection={{ xs: 'column', lg: 'row' }}
              >
                <Typography cate='body_40' sx={{}}>
                  보유기술 / 자격증
                </Typography>
                <Typography cate='body_20' plainColor='main_grey.gray400'>
                  목록에는 처음 등록한 3개만 노출됩니다.
                </Typography>
              </Box>
              <InputTags
                hideBtn
                fullWidth
                name='skills'
                btnLabel={'추가하기'}
                placeholder='보유 기술 또는 자격증을 입력해주세요 (ex. Figma, 컴퓨터활용능력 1급)'
                onChange={(tags) => {
                  setSubmitProfiles({ ...submitProfile, skills: tags })
                }}
                chipSx={{ paddingX: 2, ...getTextStyles(14, 150, 400, 0) }}
                labelTextStyle={{ cate: 'body_20' }}
                value={submitProfile.skills}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} lg={6} gap={1}>
            <Box display={'flex'} flexDirection='column' gap={1}>
              <Typography cate='body_30' sx={{}}>
                활동 지역
              </Typography>
              <AddressMenu
                error={false}
                city={submitProfile.city}
                district={submitProfile.district}
                setAddressData={onDistrictClick}
                placeholder={'주 활동 지역을 선택해 주세요.'}
                setAddressError={() => {
                  //   setAddressError(false)
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box display={'flex'} flexDirection='column' gap={1}>
          <Typography cate='body_30' sx={{}}>
            자기소개
          </Typography>
          <PrimaryTextarea
            sx={{
              minHeight: '160px !important',
              height: 'auto !important',
              width: '100%',
              boxShadow: 'none'
            }}
            placeholder='소개글을 500자 이내로 입력해 주세요.'
            maxLength={500}
            onChange={(e) => {
              setSubmitProfiles({ ...submitProfile, introduction: e.target.value })
            }}
            value={submitProfile.introduction}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default OtherInformation
