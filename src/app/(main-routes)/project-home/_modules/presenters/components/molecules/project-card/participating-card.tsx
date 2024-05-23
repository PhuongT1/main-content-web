'use client'
import { Box, Stack, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { FC, useState } from 'react'
import { ShareProjectIcon } from '@/assets/icons'
import { Button, Typography } from '@/elements'
import { ModalNotification } from '@/components/dialog/modal-deck'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { IProjectCard, ProjectCard } from '.'
import { EXPLORER_CATEGORY_ENUM, IMoreActionItem, IProject, MORE_ACTIONS_PARTICIPATING } from '../../../../domain'
import { DeleteExplorersPayload } from '../../../../use-cases'
import { useExplorerProjectContext } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'

export interface Props extends IProjectCard {}

export const ProjectParticipatingCard: FC<Props> = (rest) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const { deleteExplorersMutation, fetchExplorers } = useExplorerProjectContext()
  const [explorerIdDelete, setExplorerIdDelete] = useState<number>()
  const itemData = rest.project.itemData as IProject
  const FOLDER_MORE_OPTIONS_PARTICIPATING: IMoreActionItem[] = [
    MORE_ACTIONS_PARTICIPATING.DELETE,
    MORE_ACTIONS_PARTICIPATING.CLONE
  ].map((option) => ({
    label: option,
    value: option,
    disabled: option === MORE_ACTIONS_PARTICIPATING.CLONE && !itemData.allowReplication
  }))

  const onDeleteProject = (explorerId: number) => {
    const dataBody = {
      explorerIds: [explorerId],
      category: EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS
    } as DeleteExplorersPayload
    deleteExplorersMutation.mutateAsync(dataBody).then(() => {
      setExplorerIdDelete(undefined)
      fetchExplorers()
    })
  }

  return (
    <>
      <Box key={rest.project.explorerId} sx={{ position: 'relative' }}>
        <ProjectCard {...rest} options={FOLDER_MORE_OPTIONS_PARTICIPATING} />
        <Stack
          gap={remConvert('16px')}
          sx={{
            display: rest.project.isBlocked ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            background: home.alpha_gray_50,
            backdropFilter: 'blur(1px)',
            borderRadius: remConvert('10px')
          }}
        >
          <Stack gap={remConvert('6px')} alignItems={'center'} paddingBlock={remConvert('3px')}>
            <Stack sx={{ background: home.gray0, borderRadius: remConvert('300px'), padding: remConvert('7px') }}>
              <ShareProjectIcon
                svgProps={{ width: remConvert('18px'), height: remConvert('18px'), viewBox: '0 0 18 18' }}
                pathProps={{ stroke: home.gray500 }}
              />
            </Stack>
            <Typography cate='sub_title_40' color={home.gray0}>
              {dict.project_home_block_sharing}
            </Typography>
          </Stack>
          <Button
            variant='contained'
            color='inherit'
            sx={{
              width: 'auto',
              padding: remConvert('10px 18px'),
              background: home.gray0
            }}
            onClick={() => setExplorerIdDelete(rest.project.explorerId)}
          >
            <Typography cate='caption_1' color={home.gray500}>
              {dict.project_home_delete_from_list}
            </Typography>
          </Button>
        </Stack>
      </Box>
      <ModalNotification
        icon={<TrashRedIcon pathProps={{ fill: home.red500 }} />}
        title={dict.project_home_modal_notification_title}
        description={dict.project_home_modal_notification_description}
        sxButtonSubmit={{
          bgcolor: home.red500,
          '&:hover': {
            bgcolor: home.red500
          }
        }}
        open={!!explorerIdDelete}
        onSubmit={() => explorerIdDelete && onDeleteProject(explorerIdDelete)}
        onCancel={() => setExplorerIdDelete(undefined)}
      />
    </>
  )
}
export default ProjectParticipatingCard
