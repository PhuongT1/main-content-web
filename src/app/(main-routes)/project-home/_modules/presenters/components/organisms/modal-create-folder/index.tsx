'use client'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import ControlInput from '@/elements/control-input'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  CreateFolderPayload,
  CreateFolderResponse,
  UpdateFolderPayload,
  UpdateFolderResponse,
  createFolder,
  updateFolder
} from '../../../../use-cases'
import { IFolder, IMyProject, MAX_LENGTH_INPUT, NEW_FOLDER_NAME } from '../../../../domain'
import { useExplorerProjectContext } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IModalCreateFolder {
  open: boolean
  folder?: IMyProject | null
  onClose: () => void
  afterCreate?: (folder: IFolder) => void
}

interface IFormCreateFolder {
  folderName: string
}

export const ModalCreateFolder = ({ open, folder, onClose, afterCreate }: IModalCreateFolder) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const { tabData, folderDetail, fetchExplorers } = useExplorerProjectContext()
  const itemData = (folder?.itemData || {}) as IFolder
  const form = useForm<IFormCreateFolder>({
    mode: 'onChange',
    defaultValues: {
      folderName: itemData?.name || ''
    }
  })
  const { control, watch, handleSubmit } = form
  const folderName = watch('folderName')

  const onSuccessMutation = (message: string) => {
    fetchExplorers()
    enqueueSnackbar(message, {
      variant: 'info'
    })
    onClose()
  }

  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: (data: CreateFolderResponse) => {
      const { data: folder, error } = data

      if (error) {
        enqueueSnackbar('An error occurred when create folder', {
          variant: 'error'
        })
        return
      }

      if (afterCreate) {
        onClose()
        afterCreate(folder as IFolder)
        return
      }
      onSuccessMutation(dict.project_home_toast_folder_created)
    }
  })

  const updateFolderMutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: (data: UpdateFolderResponse) => {
      const { data: response, error } = data

      if (error) {
        enqueueSnackbar('An error occurred when create folder', {
          variant: 'error'
        })
        return
      }
      onSuccessMutation(dict.project_home_toast_folder_name_changed)
    }
  })

  const onSubmit = (value: IFormCreateFolder) => {
    const { folderName: name } = value || {}
    const dataBody = {
      name: !!name.trim() ? name : NEW_FOLDER_NAME,
      description: undefined,
      category: tabData?.category
    }

    if (!folder) {
      const parentId = folderDetail?.id || undefined
      createFolderMutation.mutate({ ...dataBody, parentId } as CreateFolderPayload)
    } else {
      const folderId = itemData?.id || undefined
      updateFolderMutation.mutate({ ...dataBody, folderId } as unknown as UpdateFolderPayload)
    }
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
              {dict.project_home_modal_create_folder_title}
            </Typography>
          </S.HeadModal>

          <S.Content>
            <ControlInput
              fullWidth
              type='text'
              name='folderName'
              placeholder={dict.project_home_modal_change_name_placeholder}
              control={control}
              maxLength={MAX_LENGTH_INPUT.FOLDER_NAME}
            />
            <Typography cate='caption_1' color={palette.home.gray100} textAlign='right'>
              {folderName.length || 0}/{MAX_LENGTH_INPUT.FOLDER_NAME}
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
              title={dict.common_next}
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
export default ModalCreateFolder
