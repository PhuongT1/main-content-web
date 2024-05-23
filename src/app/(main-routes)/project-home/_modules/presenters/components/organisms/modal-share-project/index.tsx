'use client'
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, useTheme } from '@mui/material'
import { Dialog } from '@/components'
import React, { FC, useEffect, useMemo } from 'react'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import LinkMdIcon from '@/assets/icons/link-md'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import ScrollBar from 'react-perfect-scrollbar'
import {
  IMyProject,
  IProject,
  ISettingProject,
  PROJECT_PATHS_ENUM,
  PROJECT_REPLICATION_PERMISSIONS,
  PROJECT_SHARING_SCOPE_ENUM,
  ProjectParticipant
} from '@/app/(main-routes)/project-home/_modules/domain'
import {
  getProjectDetail,
  setProjectSetting
} from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import Participant from '@/app/(main-routes)/project-home/_modules/presenters/components/participants'
import { useFieldArray, useForm } from 'react-hook-form'
import SelectItem from '@/form/select'
import InputItem from '@/form/input'
import { useMutation, useQuery } from '@tanstack/react-query'
import { KEY_PROJECT_DETAIL } from '../../project-detail/layout-project-detail'
import EyeIcon from '@/assets/icons/eye'
import EarthIcon from '@/assets/icons/earth'
import { ShareProjectPayload } from '../../../../use-cases'
import { useExplorerProjectContext } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IModalShareProject {
  open: boolean
  project: IMyProject
  onClose: () => void
}

interface IForm {
  allowReplication?: boolean
  sharingScope?: PROJECT_SHARING_SCOPE_ENUM
  participants?: ProjectParticipant[]
}

const ModalShareProject: FC<IModalShareProject> = ({ open, project, onClose }) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { shareProjectMutation } = useExplorerProjectContext()
  const [, copy] = useCopyToClipboard()
  const { id: projectId } = (project?.itemData || {}) as IProject
  const { data: dataProject, refetch: fetchProjectDetail } = useQuery({
    queryKey: [KEY_PROJECT_DETAIL, open, projectId],
    queryFn: () => {
      return getProjectDetail(projectId || '')
    },
    enabled: !!projectId,
    staleTime: 0
  })

  const linkShare = useMemo(
    () => `${window.location.origin}/${PROJECT_PATHS_ENUM.SHARE_PROJECT}/${dataProject?.code}`,
    [dataProject?.code]
  )

  const { control, watch, setValue, handleSubmit } = useForm<IForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      allowReplication: false,
      sharingScope: PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC,
      participants: []
    }
  })
  const { fields } = useFieldArray({ control, name: 'participants' })
  const watchSharingScope = watch('sharingScope')

  const onShareProject = async (value: boolean) => {
    const body = {
      projectId,
      isBlocked: value,
      userIds: fields.map((item) => item.userId)
    } as ShareProjectPayload
    await shareProjectMutation.mutateAsync(body)
    fetchProjectDetail()
  }

  const projectSettingMutaion = useMutation({
    mutationFn: (setting: ISettingProject) => setProjectSetting(dataProject?.id || 0, setting),
    onSuccess: ({ sharingScope, allowReplication }) => {
      if (sharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE) {
        onShareProject(true)
      }
    },
    onError(error) {
      console.log({ error })
    }
  })

  const onSubmit = (data: IForm) => {
    console.log('data', data)
    const { participants, ...rest } = data
    projectSettingMutaion.mutate(rest as ISettingProject)
  }

  useEffect(() => {
    const { allowReplication, sharingScope, participants } = dataProject || {}
    setValue('allowReplication', allowReplication)
    setValue('sharingScope', sharingScope)
    setValue('participants', participants)
  }, [dataProject])

  return (
    <Dialog
      mdFullScreen
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { maxWidth: 560, width: '100%', borderRadius: convertToRem(24) }
      }}
      dialogContentProps={{
        sx: {
          padding: '0 !important',
          backgroundColor: palette.home.gray400
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column' gap={convertToRem(10)} padding={convertToRem(32)}>
          <Typography cate='title_2_bold' color={palette.home.gray50}>
            {dict.project_home_modal_share_project_title}
          </Typography>
          <Typography cate='caption_1' color={palette.home.gray100}>
            {dict.project_home_modal_share_project_description}
          </Typography>
        </Box>

        <S.Content>
          <Stack direction='row' width='100%' gap={convertToRem(8)}>
            <Box flex={1}>
              <SelectItem control={control} name={'sharingScope'}>
                <MenuItem value={PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC} className='project-sharing-option'>
                  <Stack flexDirection='row' gap={convertToRem(10)} alignItems='center'>
                    <EarthIcon />
                    <Typography cate='body_3' color={palette.main.white}>
                      {dict.project_home_share_project_public}
                    </Typography>
                  </Stack>
                </MenuItem>
                <MenuItem value={PROJECT_SHARING_SCOPE_ENUM.PRIVATE} className='project-sharing-option'>
                  <Stack flexDirection='row' gap={convertToRem(10)} alignItems='center'>
                    <EarthIcon />
                    <Typography cate='body_3' color={palette.main.white}>
                      {dict.project_home_share_project_private}
                    </Typography>
                  </Stack>
                </MenuItem>
              </SelectItem>
            </Box>

            <Button
              cate='primary'
              customTitle={
                <Typography cate='sub_title_30' color={palette.home.gray500} sx={{ textWrap: 'nowrap' }}>
                  {dict.common_copy}
                </Typography>
              }
              startIcon={<LinkMdIcon gProps={{ fill: palette.home.gray500 }} />}
              onClick={() => copy(linkShare)}
              sx={{
                width: convertToRem(90),
                height: convertToRem(56),
                padding: remConvert('8px 12px'),
                backgroundColor: palette.home.blue500,
                border: 0
              }}
              disabled={watchSharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE}
            />
          </Stack>
          <Box display='flex' flexDirection='column' gap={convertToRem(10)}>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Typography cate='body_3_semibold' color={palette.home.gray50}>
                {dict.project_home_share_project_public_status}
              </Typography>
              <Box display='flex' flexDirection='row' alignItems='center' gap={convertToRem(6)}>
                <EyeIcon />
                <Typography cate='caption_1' color={palette.home.gray50}>
                  {fields.length}
                  {dict.project_home_times}
                </Typography>
              </Box>
            </Stack>
            <Box
              position='relative'
              sx={{
                borderRadius: remConvert('10px'),
                backgroundColor: palette.home.gray300
              }}
            >
              <ScrollBar
                style={{
                  height: remConvert('240px'),
                  marginLeft: remConvert('-3px'),
                  marginRight: remConvert('-3px'),
                  marginInline: remConvert('4px')
                }}
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='flex-start'
                  sx={{
                    paddingInline: remConvert('12px'),
                    '>:not(:last-child)': {
                      borderBottom: `1px solid ${palette.home.gray100}`
                    },
                    ...(!fields.length ? S.EmptyStyle : {})
                  }}
                >
                  {fields.length ? (
                    fields.map((data, index) => {
                      return (
                        <Participant
                          key={data.id}
                          projectId={dataProject?.id || 0}
                          participantItem={data}
                          onChange={(data) => setValue(`participants.${index}`, data)}
                          hotUpdate
                        />
                      )
                    })
                  ) : (
                    <Typography>{dict.project_home_state_no_history}</Typography>
                  )}
                </Box>
              </ScrollBar>
              {watchSharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE && <S.LockOverlay />}
            </Box>
          </Box>
          <InputItem
            name='allowReplication'
            control={control}
            label={dict.project_home_set_clone_permission}
            renderInput={({ field }) => (
              <RadioGroup key={`${field.value}`} value={field.value} row>
                {PROJECT_REPLICATION_PERMISSIONS.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value.value}
                    onChange={() => field.onChange(value.value)}
                    control={
                      <Radio
                        sx={{
                          color: palette.home.gray100,
                          '&.Mui-checked': {
                            color:
                              watchSharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE
                                ? palette.home.gray100
                                : palette.home.blue500
                          }
                        }}
                        disabled={watchSharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE}
                      />
                    }
                    label={value.lable}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </S.Content>

        <S.Actions>
          <S.Button
            title={dict.common_cancel}
            type='button'
            onClick={onClose}
            cate='outlined'
            customSize={'sm'}
            sx={{
              color: palette.home.gray50
            }}
          />
          <S.Button
            title={dict.common_next}
            type='submit'
            cate='primary'
            customSize={'sm'}
            sx={{
              color: palette.home.gray500
            }}
          />
        </S.Actions>
      </form>
    </Dialog>
  )
}
export default ModalShareProject
