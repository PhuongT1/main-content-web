'use client'
import { AddIcon } from '@/assets/icons'
import { Form, FormControl, FormField, FormItem, IconButton, SolidInput, Typography, Upload } from '@/elements'
import { OutlineBlue300Button } from '@/elements/v2/button'
import { Box, Grid, useTheme } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { profileAtom, submitProfileAtom } from '../../profile-atom'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import TrashIcon from '@/assets/icons/trash'
import { urlValidator } from '@/utils/validation'
import { useNestedFile } from '@/hooks/use-nested-file'
import { NestedFile } from '@/types/classes/nested-file.class'
import { File } from '@/types/pool.type'
import { IFile } from '@/types/user.type'
import { TImage } from '@/types/types.type'
import { convertFileListToArray } from '@/utils/file'

type Attached = {
  fileList?: FileList
  nestedFile?: NestedFile
}

const PortfolioEdit = () => {
  const theme = useTheme()
  const [profiles, setProfiles] = useRecoilState(profileAtom)
  const [submitProfile, setSubmitProfiles] = useRecoilState(submitProfileAtom)
  const listLinkKeys = submitProfile.urls
  const updateUrlValue = (value: string, id: string) => {
    const urlItem = submitProfile.urls.find((item) => item.formId === id) || {
      value: '',
      formId: '',
      isSubmit: true
    }

    const newItem = { ...urlItem, value: value }

    const newSubmitProfileUrls = [...submitProfile.urls]
    newSubmitProfileUrls.splice(submitProfile.urls.indexOf(urlItem), 1, newItem)
    setSubmitProfiles({
      ...submitProfile,
      urls: newSubmitProfileUrls
    })
  }
  const addNewLink = () => {
    setSubmitProfiles({
      ...submitProfile,
      urls: [...submitProfile.urls, { value: '', isSubmit: false, formId: uuidv4() }]
    })
  }
  const removeLink = (index: string) => {
    if (index) {
      const newUrlList = [...submitProfile.urls].filter((item) => item.formId !== index)
      setSubmitProfiles({ ...submitProfile, urls: newUrlList })
    }
  }
  const removeFile = (index: string) => {
    if (index) {
      const newFileList = [...submitProfile.files].filter((item) => item.formId !== index)
      setSubmitProfiles({ ...submitProfile, files: newFileList })
    }
  }
  useEffect(() => {
    const urlList =
      profiles?.urls?.map((item: string) => ({
        value: item,
        isSubmit: true,
        formId: uuidv4()
      })) || []
    const fileList =
      profiles?.files?.map((item: TImage) => ({
        value: item,
        formId: uuidv4()
      })) || []

    setSubmitProfiles({ ...submitProfile, urls: urlList, files: fileList })
  }, [])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography cate='title_50'>프로젝트 정보</Typography>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Box display={'flex'} flexDirection='column' gap={1}>
          <Typography cate='body_30' sx={{}}>
            관련링크 (선택사항)
          </Typography>
          <OutlineBlue300Button btnSize='md-np' sx={{ width: { xs: 155, md: 351 } }} onClick={addNewLink}>
            <Typography cate='button_30' plainColor='main_grey.gray200'>
              URL 추가
            </Typography>

            <AddIcon
              svgProps={{
                stroke: theme.palette.main_primary.blue300
              }}
              pathProps={{
                stroke: theme.palette.main_primary.blue300
              }}
              circleProps={{
                stroke: theme.palette.main_primary.blue300
              }}
            />
          </OutlineBlue300Button>
          <Grid container>
            <Grid item xs={12} xl={6} lg={8} display={'flex'} flexDirection='column' gap={1}>
              {listLinkKeys.map((urlData: { value: string; isSubmit: boolean; formId: string }, index: number) => {
                return (
                  <SolidInput
                    key={urlData.formId}
                    startAdornment={
                      <Typography cate='button_2_semibold' plainColor='main_grey.gray300'>
                        URL
                      </Typography>
                    }
                    endAdornment={
                      urlData.isSubmit ? (
                        <IconButton
                          onClick={() => {
                            removeLink(urlData.formId)
                          }}
                        >
                          <TrashIcon />
                        </IconButton>
                      ) : undefined
                    }
                    onKeyDown={(event) => {
                      if (event.keyCode === 13 || event.keyCode === 176) {
                        event.preventDefault()
                        if (urlValidator(urlData.value)) {
                          const urlItem = submitProfile.urls.find((item) => item.formId === urlData.formId) || {
                            value: '',
                            formId: '',
                            isSubmit: true
                          }
                          const newItem = { ...urlItem, isSubmit: true }
                          const newSubmitProfileUrls = [...submitProfile.urls]
                          newSubmitProfileUrls.splice(submitProfile.urls.indexOf(urlItem), 1, newItem)
                          setSubmitProfiles({
                            ...submitProfile,
                            urls: newSubmitProfileUrls
                          })
                        }
                      }
                    }}
                    disabled={urlData.isSubmit}
                    fullWidth
                    inputSize='md'
                    placeholder='프로젝트를 진행한 소속 회사명을 입력해 주세요.'
                    sx={{
                      '.MuiInputBase-input': urlData.isSubmit
                        ? {
                            textDecorationLine: 'underline',
                            '-webkit-text-fill-color': theme.palette.main_primary.blue300 + ' !important'
                          }
                        : {},
                      fieldset: urlData.isSubmit
                        ? {
                            border: 'transparent'
                          }
                        : {}
                    }}
                    value={urlData.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      updateUrlValue(e.target.value, urlData.formId)
                    }}
                  />
                )
              })}
            </Grid>
          </Grid>

          <OutlineBlue300Button btnSize='md-np' sx={{ width: { xs: 155, md: 351 }, mt: { xs: 1, md: 3 } }}>
            <Typography cate='button_30' plainColor='main_grey.gray200'>
              파일첨부
            </Typography>

            <AddIcon
              svgProps={{
                stroke: theme.palette.main_primary.blue300
              }}
              pathProps={{
                stroke: theme.palette.main_primary.blue300
              }}
              circleProps={{
                stroke: theme.palette.main_primary.blue300
              }}
            />

            <Upload
              maxFile={10}
              merge
              multiple
              limitSize={30}
              onChange={(fileList: FileList) => {
                const fileArr: { value: TImage; formId: string }[] =
                  convertFileListToArray(fileList).map((value: any) => {
                    return {
                      formId: uuidv4(),
                      value: value
                    }
                  }) || []

                setSubmitProfiles({ ...submitProfile, files: [...submitProfile?.files, ...fileArr] })
              }}
            />
          </OutlineBlue300Button>
          <Typography cate='caption_20' plainColor='main_grey.gray400' mt={0.25} mb={1}>
            30mb 미만 jpg,jpeg, png, pdf 파일을 업로드해주세요.
          </Typography>
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={{ lg: 2, xs: 1.25 }}>
            {submitProfile?.files && submitProfile?.files?.length > 0 ? (
              submitProfile?.files?.map(({ formId, value }, index: number) => (
                <Box
                  key={formId}
                  display={'flex'}
                  gap={1.5}
                  sx={{
                    padding: '1rem 1.5rem',
                    alignItems: 'flex-start',
                    borderRadius: 1000,
                    backgroundColor: theme.palette.main_grey.gray800,
                    width: {
                      xs: '100%',
                      lg: 'auto'
                    }
                  }}
                >
                  <Typography
                    cate='body_30'
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {value.name}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      removeFile(formId)
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PortfolioEdit
