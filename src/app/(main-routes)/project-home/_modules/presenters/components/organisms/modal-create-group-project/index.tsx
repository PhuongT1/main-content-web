'use client'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import ControlInput from '@/elements/control-input'
import { useUserProfile } from '@/hooks/use-user-profile'
import yup from '@/services/yup.service'
import { USER_UPGRADE_PACKAGE } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  IProjectTemplate,
  MAX_LENGTH_INPUT,
  PROJECT_ERRORS_CODE,
  PROJECT_PATHS_ENUM,
  PROJECT_TYPE_ENUM,
  TYPE_MODAL_CONFIRM
} from '../../../../domain'
import {
  CreateGroupProjectPayload,
  CreateGroupProjectResponse,
  createGroupProject,
  getTemplatesProjectPart
} from '../../../../use-cases'
import { useExplorerProjectContext } from '../../../../utils'
import { ErrorMessageInline, GroupTemplateCard } from '../../molecules'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

const ConfirmModal = dynamic(() => import('../../molecules/alerts/confirm-modal'))

interface IModalCreateGroupProject {
  open: boolean
  onClose: () => void
}

interface IFormGroupProject {
  name: string
}

export const ModalCreateGroupProject = ({ open, onClose }: IModalCreateGroupProject) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const router = useRouter()
  const { user } = useUserProfile()
  const [templates, setTemplates] = useState<IProjectTemplate[]>([])
  const [templateSelected, setTemplateSelected] = useState<IProjectTemplate | null>(null)
  const [showErrorNotPermission, setShowErrorNotPermission] = useState<boolean>(false)
  const isFreeUser = useMemo(() => user?.upgradePackage === USER_UPGRADE_PACKAGE.FREE, [user])
  const { fetchExplorers } = useExplorerProjectContext()

  const schema = yup.object({
    name: yup
      .string()
      .max(MAX_LENGTH_INPUT.PROJECT_NAME_GROUP)
      .required(dict.project_home_toast_please_enter_project_name)
  })
  const form = useForm<IFormGroupProject>({
    // resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  })
  const { control, handleSubmit, formState } = form
  const { errors } = formState

  const { data: projectTemplates } = useQuery({
    queryKey: [`templates`],
    queryFn: () => {
      return getTemplatesProjectPart({
        type: PROJECT_TYPE_ENUM.GROUP,
        page: 1,
        limit: 20
      })
    }
  })

  const createGroupProjectMutation = useMutation({
    mutationFn: createGroupProject,
    onSuccess: (data: CreateGroupProjectResponse) => {
      const { data: response, error } = data

      if (error) {
        switch (error.code) {
          case PROJECT_ERRORS_CODE.NOT_FREE_TEMPLATE:
            setShowErrorNotPermission(true)
            break
          default:
            enqueueSnackbar('An error occurred when create group project', {
              variant: 'error'
            })
            break
        }
        return
      }
      fetchExplorers()
      onClose()
      enqueueSnackbar(dict.project_home_toast_group_project_created, {
        variant: 'info'
      })
      router.push(PROJECT_PATHS_ENUM.MY_PROJECT)
    }
  })

  const createProject = (template: IProjectTemplate, dataForm: IFormGroupProject) => {
    const { name } = dataForm || {}
    const dataBody = {
      folderId: null,
      name,
      templateId: template.id
    } as CreateGroupProjectPayload
    createGroupProjectMutation.mutate(dataBody)
  }

  const onSubmit = (value: IFormGroupProject) => {
    if (!templateSelected) {
      enqueueSnackbar(dict.project_home_toast_please_select_project, {
        variant: 'error'
      })
      return
    }
    createProject(templateSelected, value)
  }

  useEffect(() => {
    setTemplates((projectTemplates?.data?.result || []) as IProjectTemplate[])
  }, [projectTemplates])

  return (
    <Dialog
      mdFullScreen
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { maxWidth: 816, width: '100%', borderRadius: convertToRem(24) } }}
      dialogContentProps={{
        sx: {
          padding: '0 !important'
        }
      }}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column' maxHeight={`calc(100vh - ${convertToRem(64)})`}>
          <Box display='flex' flexDirection='column' gap={convertToRem(10)} padding={convertToRem(32)}>
            <Typography cate='title_2_bold' color={palette.home.gray50}>
              {dict.project_home_modal_create_group_project_title}
            </Typography>
            <Typography cate='caption_1' color={palette.home.gray100}>
              {dict.project_home_modal_create_group_project_description}
            </Typography>
          </Box>

          <S.Content>
            {templates.length ? (
              <Box display='flex' flexDirection='row' gap={convertToRem(24)} flexWrap='wrap'>
                {templates.map((template: IProjectTemplate) => {
                  return (
                    <GroupTemplateCard
                      template={template}
                      key={template.id}
                      templateSelected={templateSelected}
                      setTemplateSelected={setTemplateSelected}
                      isFreeUser={isFreeUser}
                    />
                  )
                })}
              </Box>
            ) : (
              <S.SkeletonTemplate />
            )}
            <S.ProjectName>
              <Typography cate='body_3_semibold' color={palette.home.gray50}>
                {dict.project_home_project_name}
              </Typography>
              <ControlInput
                fullWidth
                type='text'
                name='name'
                placeholder={dict.project_home_modal_create_group_project_placeholder}
                control={control}
              />
              {!!errors?.name?.message && <ErrorMessageInline message={errors?.name?.message || ''} />}
            </S.ProjectName>
          </S.Content>

          <S.Actions>
            <Button
              title={dict.common_cancel}
              type='button'
              onClick={onClose}
              cate='outlined'
              customSize={'sm'}
              sx={{
                fontWeight: 600,
                fontSize: convertToRem(16),
                color: palette.home.gray50,
                padding: `${convertToRem(12)} ${convertToRem(24)}`,
                minWidth: convertToRem(120),
                minHeight: convertToRem(44)
              }}
            />
            <Button
              title={dict.common_next}
              type='submit'
              disabled={!templateSelected}
              cate='primary'
              customSize={'sm'}
              sx={{
                fontWeight: 600,
                fontSize: convertToRem(16),
                color: palette.home.gray500,
                padding: `${convertToRem(12)} ${convertToRem(24)}`,
                minWidth: convertToRem(120),
                minHeight: convertToRem(44)
              }}
            />
          </S.Actions>
        </Box>
      </S.Form>
      {showErrorNotPermission && (
        <ConfirmModal
          open={true}
          onClose={() => setShowErrorNotPermission(false)}
          title={dict.project_home_modal_not_have_permission_title}
          description={dict.project_home_modal_not_have_permission_description}
          submitText={dict.common_confirm}
          onSubmit={() => setShowErrorNotPermission(false)}
          type={TYPE_MODAL_CONFIRM.SUCCESS}
        />
      )}
    </Dialog>
  )
}
export default ModalCreateGroupProject
