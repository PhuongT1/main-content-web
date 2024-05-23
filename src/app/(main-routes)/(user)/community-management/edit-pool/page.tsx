'use client'
import { loadingAtom } from '@/atoms/loading'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import Input from '@/elements/custom-input'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Button as MButton, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { userPoolAtom } from '@/atoms/user-pool'
import { ADDRESS_LIST } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { FieldError } from 'react-hook-form'
import AddressMenu from '../../talent-pool/_components/AddressMenu'
import SkillTag from '../../talent-pool/_components/SkillTag'
import CareerSection from './_career'
import EducationSection from './_education'
import ProjectSection from './_project'
import UrlFileSection from './_url-file'
import { createUserPool, getUserPool, updateUserPool } from '@/actions/apis/pool.action'

const category = ['개발', '디자인', '기획', '마케팅', '영업', '운영관리', '인사', '서버', '기획PM', '개발PM']
const EditPool = () => {
  const theme = useTheme()
  const breadcrumbData = [{ name: '커뮤니티 관리' }]
  const router = useRouter()
  const setLoading = useSetRecoilState(loadingAtom)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const categorySelected = useRef<string[]>([])
  const educationSectionRef = useRef<any>([])
  const careerSectionRef = useRef<any>([])
  const projectSectionRef = useRef<any>([])
  const urlFileSectionRef = useRef<any>([])
  const [categorySelectedTemp, setCategorySelectedTemp] = useState<string[]>([])

  const [citySelectOpen, setCitySelectOpen] = useState<boolean>(false)
  const [city, setCity] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')
  const [skills, setSkills] = useState<string[]>([])
  const [skillValue, setSkillValue] = useState<string>('')
  const mdUp = useMediaQuery('(min-width: 768px)')
  const [userPool, setUserPool] = useRecoilState(userPoolAtom)
  const [categoryError, setCategoryError] = useState<boolean>(false)
  const [skillError, setSkillError] = useState<boolean>(false)
  const [addressError, setAddressError] = useState<boolean>(false)
  const [introError, setIntroError] = useState<boolean>(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)

  const checkCategory = (item: string) => {
    if (categorySelectedTemp.includes(item)) {
      let newCategorySelected = [...categorySelectedTemp].filter((i) => i !== item)
      setCategorySelectedTemp(newCategorySelected)
    } else {
      let newCategorySelected = [...categorySelectedTemp]
      newCategorySelected.push(item)
      setCategorySelectedTemp(newCategorySelected)
    }
  }

  const addSkill = () => {
    let newSkills = [...skills]
    if (!!skillValue) {
      newSkills.push(skillValue)
      setSkills(newSkills)
      setSkillValue('')
    }
  }

  const deleteSkill = (index: number) => {
    let newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
  }

  const onDistrictClick = (city: string, district: string) => {
    setCity(city)
    setDistrict(district)
  }

  const onSubmit = async () => {
    if (validate()) return
    setLoading(true)
    const { urls, files } = urlFileSectionRef.current.getData()
    if (urls === 'error' || files === 'error') {
      setLoading(false)
      return
    }
    const submitData: any = {
      jobTitles: categorySelected.current,
      schools: educationSectionRef.current.getData(),
      experiences: careerSectionRef.current.getData(),
      projects: projectSectionRef.current.getData(),
      skills: skills,
      urls,
      files,
      city: city,
      district: district,
      location: `${city} ${district}`,
      introduction: introduction
    }

    const { data, error } = userPool ? await updateUserPool(submitData) : await createUserPool(submitData)
    if (data && !error) {
      enqueueSnackbar('정보가 변경되었습니다', {
        variant: 'success'
      })
      setUserPool(data.data)
      setLoading(false)
      router.push('/community-management?tab=pool')
    } else {
      setShowError(true)
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  const validate = () => {
    let error = false
    if (categorySelected.current.length === 0) {
      setCategoryError(true)
      error = true
    }

    if (skills.length === 0) {
      setSkillError(true)
      error = true
    }

    if (!city) {
      setAddressError(true)
      error = true
    }

    if (!introduction) {
      setIntroError(true)
      error = true
    }
    if (error) {
      setShowError(true)
      setErrorMessage('인재 등록을 위한 필수 항목을 \n입력해주세요.')
    }
    return error
  }

  useEffect(() => {
    if (userPool) {
      categorySelected.current = userPool.jobTitles
      setSkills(userPool.skills)
      setCity(userPool.city)
      setDistrict(userPool.district)
      setIntroduction(userPool.introduction)
    }
  }, [userPool])

  useEffect(() => {
    async function getUserPoolData() {
      const userPoolRes = await getUserPool()
      if (!!userPoolRes) {
        setUserPool(userPoolRes)
      } else {
        setUserPool(null)
      }
    }

    getUserPoolData()
  }, [])
  const ADDRESS_KEYS = Object.keys(ADDRESS_LIST)
  return (
    <>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={4.5} mb={10}>
        {userPool ? '프로필 정보 수정' : '프로필 정보 등록'}
      </Typography>
      <Grid container>
        <Grid item lg={6} xs={12} display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} gap={1} alignItems={'center'} width={mdUp ? 'auto' : '100%'}>
            <Box display={'flex'} mb={2}>
              <Typography cate='subtitle_1_semibold'>직군선택</Typography>
              <Typography color={theme.palette.main.danger} cate='title_2_bold'>
                *
              </Typography>
            </Box>
          </Box>
          <Select
            variant='filled'
            placeholder='직군을 1개 이상 선택해주세요.'
            displayEmpty
            fullWidth
            error={categoryError}
            id='selectWrapper'
            defaultOpen={false}
            sx={{ minHeight: convertToRem(56), height: 'auto !important' }}
            open={selectOpen}
            onOpen={() => {
              setCategorySelectedTemp(categorySelected.current)
              setSelectOpen(true)
            }}
            onClose={(e: any) => {
              setCategoryError(false)
              if (!e.target.className.includes('dropbox-category')) {
                setSelectOpen(false)
              }
            }}
            renderValue={(value) => {
              return categorySelected?.current?.length === 0 ? (
                <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
                  직군을 1개 이상 선택해주세요.
                </Typography>
              ) : (
                <Grid container spacing={1} className='dropbox-category'>
                  {categorySelected?.current?.map((item, index) => (
                    <Grid item key={index} className='dropbox-category'>
                      <Button
                        isNonSubmit
                        className='dropbox-category'
                        title={item}
                        cate={'outlined'}
                        customType={'active'}
                        rounded
                        customSize={'sm'}
                        sx={{ padding: '0.5rem 1rem', height: '2rem' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )
            }}
          >
            <Box display={'flex'} flexDirection='column' p={2} className='dropbox-category'>
              <Typography cate='body_3' color={theme.palette.main_grey.gray300} mb={1} className='dropbox-category'>
                직군을 1개 이상 선택해주세요.
              </Typography>
              <Grid container spacing={2} className='dropbox-category'>
                {category.map((item, index) => (
                  <Grid item key={index} className='dropbox-category'>
                    <Button
                      onClick={() => {
                        checkCategory(item)
                      }}
                      isNonSubmit
                      className='dropbox-category'
                      title={item}
                      cate={'outlined'}
                      customType={categorySelectedTemp.includes(item) ? 'active' : undefined}
                      rounded
                      customSize={'sm'}
                      sx={{ padding: '0.8rem 1rem' }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box width={'100%'} display={'flex'} justifyContent='flex-end'>
                <MButton
                  className='dropbox-category'
                  sx={{
                    marginY: 1,
                    padding: 0.5
                  }}
                  disabled={categorySelectedTemp.length === 0}
                  onClick={() => {
                    categorySelected.current = categorySelectedTemp
                    setCategoryError(false)
                    setSelectOpen(false)
                  }}
                >
                  <Typography
                    cate='body_3_semibold'
                    color={
                      categorySelectedTemp.length === 0 ? theme.palette.main_grey.gray300 : theme.palette.main.point
                    }
                    className='dropbox-category'
                  >
                    적용
                  </Typography>
                </MButton>
              </Box>
            </Box>
          </Select>
        </Grid>
      </Grid>
      <EducationSection ref={educationSectionRef} defaultValue={userPool?.schools || []} />
      <CareerSection ref={careerSectionRef} defaultValue={userPool?.experiences || []} />
      <Grid container mt={6}>
        <Grid item lg={12} xs={12} display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} gap={1} alignItems={'center'} width={mdUp ? 'auto' : '100%'}>
            <Box display={'flex'} mb={2}>
              <Typography cate='subtitle_1_semibold'>보유기술 / 활동분야</Typography>
              <Typography color={theme.palette.main.danger} cate='title_2_bold'>
                *
              </Typography>
            </Box>
          </Box>
          <Grid item lg={6} xs={12}>
            <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
              기술/분야
            </Typography>
            <Box
              component={'form'}
              onSubmit={(e: any) => {
                e.preventDefault()
              }}
            >
              <Input
                type='text'
                name='skill'
                placeholder='보유 기술 또는 활동 분야를 입력해주세요 (ex. 스타일링 자격증 보유)'
                label='skill'
                error={skillError ? ({ message: '' } as FieldError) : undefined}
                fullWidth
                value={skillValue}
                onChange={(event) => {
                  setSkillValue(event.target.value)
                  if (skillError) {
                    setSkillError(false)
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 176) {
                    addSkill()
                  }
                }}
              />
            </Box>
            <Grid container spacing={1} mt={1}>
              {skills.map((item: string, index: number) => {
                return (
                  <Grid item key={index}>
                    <SkillTag
                      title={item}
                      onDelete={() => {
                        deleteSkill(index)
                      }}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ProjectSection ref={projectSectionRef} defaultValue={userPool?.projects || []} />
      <UrlFileSection
        ref={urlFileSectionRef}
        defaultValueFiles={userPool?.files || []}
        defaultValueUrls={userPool?.urls || []}
      />
      <Grid container>
        <Grid item lg={6} xs={12} display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} gap={1} alignItems={'center'} width={mdUp ? 'auto' : '100%'}>
            <Box display={'flex'} mb={2}>
              <Typography cate='subtitle_1_semibold'>주 활동 지역</Typography>
              <Typography color={theme.palette.main.danger} cate='title_2_bold'>
                *
              </Typography>
            </Box>
          </Box>
          <Typography cate='body_3' mb={1}>
            지역 선택
          </Typography>
          {/* <Select
					 placeholder="주 활동 지역을 선택해주세요"
					 displayEmpty
					 fullWidth
					 id="selectWrapper"
					 // defaultOpen={false}
					 open={citySelectOpen}
					 error={addressError}
					 onOpen={() => {
					 setCitySelectOpen(true);
					 }}
					 onClose={(event: any) => {
					 setCitySelectOpen(false);
					 setAddressError(false);
					 }}
					 renderValue={(value) => {
					 return !!city ? (
					 <Typography cate="body_3" color={theme.palette.main.gray30}>
					 {city} {!!district ? ' - ' + district : ''}
					 </Typography>
					 ) : (
					 <Typography cate="body_3" color={theme.palette.main.gray30}>
					 주 활동 지역을 선택해주세요
					 </Typography>
					 );
					 }}
					 >
					 {ADDRESS_KEYS.map((item: any, index: number) => (
					 <DropdownNestedAddressMenuItem
					 rightAnchore={true}
					 label={
					 <Typography cate="caption_1" color="main.white">
					 {item}
					 </Typography>
					 }
					 onClick={() => {
					 setCitySelectOpen(true);
					 if (
					 ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].length === 0
					 ) {
					 onDistrictClick(item, '');
					 setCitySelectOpen(false);
					 setAddressError(false);
					 }
					 }}
					 parentMenuOpen={citySelectOpen}
					 >
					 {' '}
					 {ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].length > 0 && (
					 <>
					 {ADDRESS_LIST[item as keyof typeof ADDRESS_LIST].map(
					 (district: string, districtIndex: number) => (
					 <DropdownMenuItem
					 key={districtIndex}
					 onClick={() => {
					 onDistrictClick(item, district);
					 setCitySelectOpen(false);
					 setAddressError(false);
					 }}
					 >
					 {district}
					 </DropdownMenuItem>
					 )
					 )}
					 </>
					 )}
					 </DropdownNestedAddressMenuItem>
					 ))}
					 </Select> */}
          <AddressMenu
            error={addressError}
            city={city}
            district={district}
            setAddressData={onDistrictClick}
            setAddressError={() => {
              setAddressError(false)
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} display={'flex'} flexDirection={'column'} mt={6}>
          <Box display={'flex'} gap={1} alignItems={'center'} width={mdUp ? 'auto' : '100%'}>
            <Box display={'flex'} mb={2}>
              <Typography cate='subtitle_1_semibold'>자기소개</Typography>
              <Typography color={theme.palette.main.danger} cate='title_2_bold'>
                *
              </Typography>
            </Box>
          </Box>
          <Input
            name='content'
            fullWidth
            placeholder='소개글을 500자 이내로 입력해주세요.'
            multiline
            onChange={(e) => {
              setIntroduction(e.target.value)
              if (introError) {
                setIntroError(false)
              }
            }}
            value={introduction}
            error={introError ? ({ message: '' } as FieldError) : undefined}
            inputProps={{
              maxLength: 500
            }}
            sx={{
              height: convertToRem(304) + ' !important',
              padding: '1rem !important',
              fieldset: {
                padding: '0 !important'
              },
              '.MuiInputAdornment-root': {
                display: 'none'
              },
              '.MuiInputBase-input': {
                overflow: 'auto',
                width: '100%',
                height: '100% !important'
              }
            }}
            endAdornment={
              <Typography
                cate='caption_2'
                color={theme.palette.main_grey.gray300}
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
              >
                {introduction.length}/500
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <Box display='flex' width='100%' justifyContent={'flex-end'} mt={3} gap={1}>
        <Button
          title='임시저장'
          cate={'outlined'}
          customSize={'sm'}
          sx={{
            padding: '1.12rem 1rem',
            width: mdUp ? convertToRem(160) : '100%',
            height: 'auto'
          }}
        />
        <Button
          title={userPool ? '인재풀 저장하기' : '인재풀 등록하기'}
          cate={'primary'}
          customSize={'sm'}
          onClick={onSubmit}
          sx={{
            padding: '1.12rem 1rem',
            width: mdUp ? convertToRem(160) : '100%',
            height: 'auto'
          }}
        />
      </Box>
      <AlertPopup
        onSubmit={async () => {
          setShowError(false)
          setErrorMessage('')
          setErrorTitle(undefined)
        }}
        submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
        cancelTitle={errorTitle ? '취소' : undefined}
        onCancel={
          errorTitle
            ? () => {
                setShowError(false)
                setErrorMessage('')
                setErrorTitle(undefined)
              }
            : undefined
        }
        title={errorTitle}
        description={errorMessage}
        open={showError}
      />
    </>
  )
}

export default EditPool
