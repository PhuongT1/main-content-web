'use client'
import yup from '@/services/yup.service'
import ControlInput from '@/elements/control-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import { useForm } from 'react-hook-form'
import { UpdateProjectPayload } from '../../../../use-cases'
import { IMyProject, IProject, MAX_LENGTH_INPUT } from '../../../../domain'
import { useExplorerProjectContext } from '../../../../utils'
import { enqueueSnackbar } from 'notistack'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IModalChangeNameProject {
  open: boolean
  project?: IMyProject | null
  onClose: () => void
}

interface IFormUpdateProject {
  projectName: string
}

export const ModalChangeNameProject = ({ open, project, onClose }: IModalChangeNameProject) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { updateProjectMutation, fetchExplorers } = useExplorerProjectContext()
  const itemData = (project?.itemData || {}) as IProject

  const schema = yup.object({
    projectName: yup
      .string()
      .trim()
      .max(MAX_LENGTH_INPUT.PROJECT_NAME_GROUP)
      .required(dict.project_home_toast_please_enter_project_name)
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      projectName: itemData?.name || ''
    }
  })
  const { control, watch, handleSubmit } = form
  const projectName = watch('projectName')

  const onSubmit = async (value: IFormUpdateProject) => {
    const { projectName: name } = value || {}
    const body = {
      id: itemData?.id || '',
      name
    } as UpdateProjectPayload
    await updateProjectMutation.mutateAsync(body)
    fetchExplorers()
    onClose()
    enqueueSnackbar(dict.project_home_toast_project_title_applied, {
      variant: 'info'
    })
  }

  return (
    <Dialog
      mdFullScreen
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { maxWidth: 560, width: '100%', borderRadius: convertToRem(24) } }}
      dialogContentProps={{
        sx: {
          padding: '0 !important'
        }
      }}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' flexDirection='column' maxHeight={`calc(100vh - ${convertToRem(64)})`}>
          <S.HeadModal>
            <Typography cate='title_2_bold' color={palette.home.gray50}>
              {dict.project_home_modal_change_name_title}
            </Typography>
          </S.HeadModal>

          <S.Content>
            <ControlInput
              fullWidth
              type='text'
              name='projectName'
              placeholder={dict.project_home_modal_change_name_placeholder}
              control={control}
              maxLength={MAX_LENGTH_INPUT.PROJECT_NAME_GROUP}
            />
            <Typography cate='caption_1' color={palette.home.gray100} textAlign='right'>
              {projectName.length || 0}/{MAX_LENGTH_INPUT.PROJECT_NAME_GROUP}
            </Typography>
          </S.Content>

          <S.Actions>
            <S.Button
              title={dict.common_cancel}
              type='button'
              cate='outlined'
              customSize={'sm'}
              onClick={onClose}
              sx={{
                color: palette.home.gray50
              }}
            />
            <S.Button
              title={dict.common_delete}
              type='submit'
              cate='primary'
              customSize={'sm'}
              sx={{
                color: palette.home.gray500
              }}
            />
          </S.Actions>
        </Box>
      </S.Form>
    </Dialog>
  )
}
export default ModalChangeNameProject
