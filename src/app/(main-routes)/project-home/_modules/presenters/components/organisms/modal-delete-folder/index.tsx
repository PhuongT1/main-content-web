'use client'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import { useForm } from 'react-hook-form'
import { DeleteExplorersPayload } from '../../../../use-cases'
import { IMyProject, MAX_LENGTH_INPUT, TEXT_DELETE_FOLDER } from '../../../../domain'
import ControlInput from '@/elements/control-input'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { useExplorerProjectContext } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'
import { useMemo } from 'react'
import * as S from './style'

interface IModalDeleteFolder {
  open: boolean
  folder?: IMyProject | null
  onClose: () => void
}

interface IFormDeleteFolder {
  deleteText: string
}

export const ModalDeleteFolder = ({ open, folder, onClose }: IModalDeleteFolder) => {
  const { dict, t } = useLanguage()
  const { palette } = useTheme()
  const { tabData, deleteExplorersMutation } = useExplorerProjectContext()
  const textDeleteFolder = useMemo(() => dict[TEXT_DELETE_FOLDER], [dict])

  const schema = yup.object({
    deleteText: yup
      .string()
      .test(
        'must-be-폴더-삭제',
        t('project_home_modal_delete_folder_placeholder', { delete_text: textDeleteFolder }),
        (value) => value === textDeleteFolder
      )
  })
  const form = useForm<IFormDeleteFolder>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    defaultValues: {
      deleteText: ''
    }
  })
  const { control, handleSubmit } = form

  const onSubmit = async (value: IFormDeleteFolder) => {
    const { deleteText } = value || {}
    if (deleteText === textDeleteFolder) {
      const explorerId = folder?.explorerId || ''

      const dataBody = {
        explorerIds: [explorerId],
        category: tabData?.category
      } as DeleteExplorersPayload

      await deleteExplorersMutation.mutateAsync(dataBody)
      onClose()
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
          <S.Content>
            <TrashRedIcon />
            <S.HeadModal>
              <Typography cate='title_2_bold' color={palette.home.gray50}>
                {dict.project_home_modal_delete_folder_title}
              </Typography>
              <Typography cate='caption_1' color={palette.home.gray100}>
                {t('project_home_modal_delete_folder_description', { delete_text: textDeleteFolder })}
              </Typography>
            </S.HeadModal>
            <ControlInput
              fullWidth
              type='text'
              name='deleteText'
              placeholder={textDeleteFolder}
              control={control}
              maxLength={MAX_LENGTH_INPUT.FOLDER_NAME}
            />
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
                color: palette.home.gray500,
                backgroundColor: palette.home.red500,
                borderColor: palette.home.red500,
                '&:hover': {
                  backgroundColor: palette.home.red500
                }
              }}
            />
          </S.Actions>
        </Box>
      </S.Form>
    </Dialog>
  )
}
export default ModalDeleteFolder
