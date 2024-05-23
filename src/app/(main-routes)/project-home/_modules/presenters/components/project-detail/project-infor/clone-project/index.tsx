'use client'
import { Stack, styled, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import { IDetailProject, PROJECT_PATHS_ENUM } from '@/app/(main-routes)/project-home/_modules/domain'
import ShareNetworkIcon from '@/assets/icons/home/business-model/arrow/share-network.ico'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { USER_ROLE } from '@/constants/user.constants'
import { useRouter } from 'next/navigation'
import { useExplorerProjectContext } from '@/app/(main-routes)/project-home/_modules/utils'
import { CloneProjectPayload, CloneProjectResponse } from '@/app/(main-routes)/project-home/_modules/use-cases'
import { useLanguage } from '@/hooks/use-language'

export const Container = styled(Stack)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    backgroundColor: home.gray300,
    borderRadius: remConvert('10px'),
    padding: remConvert('12px'),
    flexGrow: 1,
    justifyContent: 'center',
    width: 0
  })
)

interface Props {
  dataProject: IDetailProject
}

const CloneProject: FC<Props> = ({ dataProject }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const router = useRouter()
  const { cloneProjectMutation } = useExplorerProjectContext()
  const user = useRecoilValue(userAtom)
  const isAdmin = user?.role === USER_ROLE.ADMIN

  const onCloneProject = async () => {
    if (dataProject.allowReplication) {
      const body = {
        projectId: dataProject.id
      } as CloneProjectPayload
      const response = (await cloneProjectMutation.mutateAsync(body)) as CloneProjectResponse
      if (!response.error) {
        router.push(PROJECT_PATHS_ENUM.MY_PROJECT)
      }
    }
  }

  if (isAdmin) return

  return (
    <Button
      cate={'contained'}
      sx={{
        padding: remConvert('12px'),
        height: 'unset',
        minWidth: 'unset',
        width: 'unset',
        border: '0',
        background: home.mint500
      }}
      onClick={onCloneProject}
      disabled={!dataProject.allowReplication}
      customTitle={
        <Stack direction={'row'} alignItems={'center'} gap={remConvert('10px')}>
          <ShareNetworkIcon
            svgProps={{ width: remConvert('20px'), height: remConvert('20px') }}
            rectProps={{ fill: 'none' }}
            pathProps={{ fill: home.gray500 }}
          />
          <Typography cate='sub_title_30' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
            {dict.project_home_clone_to_my_project}
          </Typography>
        </Stack>
      }
    />
  )
}
export default CloneProject
