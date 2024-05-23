'use client'
import { AddIcon } from '@/assets/icons'
import TrashIcon from '@/assets/icons/trash'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  IconButton,
  PrimaryTextarea,
  SecondaryButton,
  SolidInput,
  Typography
} from '@/elements'
import { OutlineBlue300Button } from '@/elements/v2/button'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import DatePickerSelect from '../../_components/DatePickerSelect'
import moment from 'moment'
import { convertToRem } from '@/utils/convert-to-rem'
import { useRecoilState } from 'recoil'
import { profileAtom, submitProfileAtom } from '../../profile-atom'
import { IProject, ProjectForm } from '@/types/pool.type'
import ProjectItem from '../../_components/project-item'
import { isValid } from 'date-fns'
import { urlValidator } from '@/utils/validation'

type IProjectForm = {
  projectName: string
  projectOwner: string
  timeline: DateRange
  description: string
  relatedLinks: {
    [key: string]: {
      value: string
      isSubmit: boolean
    }
  }
}
const schema = yup.object({
  projectName: yup.string().required(),
  projectOwner: yup.string().required(),
  description: yup.string().required(),
  relatedLinks: yup
    .mixed<{
      [key: string]: {
        value: string
        isSubmit: boolean
      }
    }>()
    .required(),
  timeline: yup
    .mixed<DateRange>()
    .transform((date: DateRange) => {
      return date.endDate && date.startDate ? date : undefined
    })
    .required()
})

const ProjectEdit = () => {
  const theme = useTheme()
  const datePickerRef = useRef<any>(null)
  const [profiles, setProfiles] = useRecoilState(profileAtom)
  const [submitProfile, setSubmitProfiles] = useRecoilState(submitProfileAtom)
  const defaultValues: IProjectForm = {
    projectName: '',
    projectOwner: '',
    timeline: {
      startDate: undefined,
      endDate: undefined
    },
    description: '',
    relatedLinks: {}
  }
  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const relatedLinks = form.watch('relatedLinks')
  const timeline = form.watch('timeline')
  const listLinkKeys = Object.keys(relatedLinks)
  const addNewLink = () => {
    form.setValue('relatedLinks', {
      ...relatedLinks,
      [uuidv4()]: {
        value: '',
        isSubmit: false
      }
    })
  }
  const addProject = () => {
    const { relatedLinks, timeline, ...restValue } = form.getValues()
    const relatedLinkKeys = Object.keys(relatedLinks)
    const submitValue: any = {
      ...restValue,
      startDateAt: timeline.startDate,
      endDateAt: timeline.endDate,
      relatedLink: '',
      relatedLinks: relatedLinkKeys
        .filter((i) => relatedLinks[i].isSubmit)
        .map((key) => relatedLinks[key].isSubmit && relatedLinks[key].value),
      formId: uuidv4()
    }
    setSubmitProfiles({ ...submitProfile, projects: [...submitProfile.projects, submitValue] })
    form.reset(defaultValues)
    datePickerRef?.current?.resetDatePicker()
  }
  const removeLink = (index: string) => {
    if (index) {
      // setListAnswers((prev) => [...prev.filter((item: IAnswer) => item.localId !== index)])
      let newAnswers = { ...relatedLinks }
      delete newAnswers[index]
      form.setValue('relatedLinks', newAnswers)
    }
  }
  const onDateChange = (start: Date, end: Date) => {
    form.setValue('timeline.startDate', start, { shouldValidate: true })
    form.setValue('timeline.endDate', end, { shouldValidate: true })
  }

  const removeProject = (id: string) => {
    const newProjectList = [...submitProfile.projects].filter((item: ProjectForm) => item.formId !== id)
    setSubmitProfiles({ ...submitProfile, projects: newProjectList })
  }
  useEffect(() => {
    const projectList = profiles?.projects?.map((item: IProject) => ({ ...item, formId: uuidv4() })) || []
    setSubmitProfiles({ ...submitProfile, projects: projectList })
  }, [])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography cate='title_50'>프로젝트 정보</Typography>
      <Form {...form}>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid item lg={4} xs={12}>
              <FormField
                control={form.control}
                name='projectName'
                render={({ field }) => (
                  <FormItem
                    style={{
                      flex: 1
                    }}
                  >
                    <FormLabel>
                      <Typography cate='body_30' sx={{}}>
                        프로젝트명
                      </Typography>
                    </FormLabel>
                    <FormControl>
                      <SolidInput
                        inputProps={{
                          maxLength: 30
                        }}
                        fullWidth
                        inputSize='md'
                        placeholder='진행한 프로젝트의 이름을 입력해 주세요.'
                        sx={{}}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>

            <Grid item lg={4} xs={12}>
              <FormField
                control={form.control}
                name='projectOwner'
                render={({ field }) => (
                  <FormItem
                    style={{
                      flex: 1
                    }}
                  >
                    <FormLabel>
                      <Typography cate='body_30' sx={{}}>
                        소속 회사명
                      </Typography>
                    </FormLabel>
                    <FormControl>
                      <SolidInput
                        inputProps={{
                          maxLength: 30
                        }}
                        fullWidth
                        inputSize='md'
                        placeholder='프로젝트를 진행한 소속 회사명을 입력해 주세요.'
                        sx={{}}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <FormField
                control={form.control}
                name='timeline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography cate='body_30' sx={{}}>
                        프로젝트 참여 기간
                      </Typography>
                    </FormLabel>
                    <FormControl>
                      <DatePickerSelect
                        ref={datePickerRef}
                        type='year'
                        onSelectDate={onDateChange}
                        placeholder='프로젝트 참여 기간 선택'
                        value={timeline}
                        // style={{
                        // 	opacity: isNew ? .3 : 1,
                        // 	borderColor: isNew ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
                        // }}
                      />
                      {/* <RangeDatepicker placeholder='프로젝트 참여 기간 선택' {...field} /> */}
                    </FormControl>
                  </FormItem>
                )}
              />
            </Grid>
          </Grid>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Typography cate='body_30' sx={{}}>
                    설명
                  </Typography>
                </FormLabel>
                <FormControl>
                  <PrimaryTextarea
                    sx={{
                      minHeight: '160px !important',
                      height: 'auto !important',
                      width: '100%',
                      boxShadow: 'none'
                    }}
                    placeholder='프로젝트에 대한 설명과 담당한 부분에 대해 설명해 주세요.'
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
                {listLinkKeys.map((key: string, index: number) => {
                  return (
                    <FormField
                      key={key}
                      control={form.control}
                      name={`relatedLinks.${key}.value`}
                      render={({ field }) => (
                        <FormItem
                          style={{
                            flex: 1
                          }}
                        >
                          <FormControl>
                            <SolidInput
                              startAdornment={
                                <Typography cate='button_2_semibold' plainColor='main_grey.gray300'>
                                  URL
                                </Typography>
                              }
                              endAdornment={
                                relatedLinks[key].isSubmit ? (
                                  <IconButton
                                    onClick={() => {
                                      removeLink(key)
                                    }}
                                  >
                                    <TrashIcon />
                                  </IconButton>
                                ) : undefined
                              }
                              onKeyDown={(event) => {
                                if (event.keyCode === 13 || event.keyCode === 176) {
                                  event.preventDefault()
                                  if (urlValidator(relatedLinks[key].value)) {
                                    form.setValue(`relatedLinks.${key}.isSubmit`, true)
                                  }
                                }
                              }}
                              disabled={relatedLinks[key].isSubmit}
                              fullWidth
                              inputSize='md'
                              placeholder=''
                              sx={{
                                '.MuiInputBase-input': relatedLinks[key].isSubmit
                                  ? {
                                      textDecorationLine: 'underline',
                                      '-webkit-text-fill-color': theme.palette.main_primary.blue300 + ' !important'
                                    }
                                  : {},
                                fieldset: relatedLinks[key].isSubmit
                                  ? {
                                      border: 'transparent'
                                    }
                                  : {}
                              }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )
                })}
              </Grid>
            </Grid>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <OutlineBlue300Button
              btnSize='sm-np'
              sx={{ maxWidth: 'auto', borderRadius: 1000, width: convertToRem('124'), paddingX: 0 }}
              disabled={!form.formState.isValid}
              onClick={addProject}
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                프로젝트 추가
              </Typography>
            </OutlineBlue300Button>
          </Box>
        </Box>
      </Form>
      <Box display='flex' flexDirection='column' gap={2}>
        {submitProfile.projects.map((projectItem: ProjectForm) => {
          return (
            <ProjectItem
              item={projectItem}
              key={projectItem.formId}
              containerProps={{
                gap: 3
              }}
              onDelete={() => {
                removeProject(projectItem.formId || '')
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default ProjectEdit
