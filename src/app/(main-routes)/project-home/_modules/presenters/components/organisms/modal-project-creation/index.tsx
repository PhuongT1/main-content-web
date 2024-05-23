'use client'
import { CreationGroup, CreationPersonal } from '@/assets/images'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import { PROJECT_PATHS_ENUM, PROJECT_TYPE_ENUM } from '../../../../domain'
import { useUserProfile } from '@/hooks/use-user-profile'
import { USER_UPGRADE_PACKAGE } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ProjectCreation } from '../../molecules'
import { useLanguage } from '@/hooks/use-language'

interface IModalProjectCreation {
  open: boolean
  onClose: () => void
  openCreateGroupProject: () => void
}

export const ModalProjectCreation = ({ open, onClose, openCreateGroupProject }: IModalProjectCreation) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const router = useRouter()
  const { user } = useUserProfile()
  const [typeSelected, setTypeSelected] = useState<PROJECT_TYPE_ENUM | null>(null)

  const isFreeUser = useMemo(() => user?.upgradePackage === USER_UPGRADE_PACKAGE.FREE, [user])

  const onSelectType = () => {
    if (typeSelected === PROJECT_TYPE_ENUM.INDIVIDUAL) {
      router.push(PROJECT_PATHS_ENUM.CREATE_PROJECT)
    }
    if (typeSelected === PROJECT_TYPE_ENUM.GROUP && !isFreeUser) {
      openCreateGroupProject()
    }
  }

  return (
    <Dialog
      mdFullScreen
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { maxWidth: 776, width: '100%', borderRadius: convertToRem(24) } }}
      dialogContentProps={{
        sx: {
          padding: '0 !important'
        }
      }}
    >
      <Box display='flex' flexDirection='column'>
        <Box display='flex' flexDirection='column' gap={convertToRem(6)} padding={convertToRem(32)}>
          <Typography cate='title_2_bold' color={palette.home.gray50}>
            {dict.project_home_create_new_project}
          </Typography>
          <Typography cate='caption_1' color={palette.home.gray100}>
            {dict.project_home_modal_create_project_description}
          </Typography>
        </Box>

        <Box
          display='flex'
          gap={convertToRem(24)}
          paddingY={convertToRem(20)}
          paddingX={convertToRem(32)}
          borderTop={`1px solid ${palette.home.gray200}`}
          borderBottom={`1px solid ${palette.home.gray200}`}
        >
          <ProjectCreation
            type={PROJECT_TYPE_ENUM.INDIVIDUAL}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            imageUrl={CreationPersonal}
          />
          <ProjectCreation
            type={PROJECT_TYPE_ENUM.GROUP}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            imageUrl={CreationGroup}
            isFreeUser={isFreeUser}
          />
        </Box>

        <Box display='flex' justifyContent='flex-end' gap={convertToRem(12)} padding={convertToRem(32)}>
          <Button
            title={dict.common_cancel}
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
            disabled={!typeSelected}
            onClick={onSelectType}
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
        </Box>
      </Box>
    </Dialog>
  )
}
export default ModalProjectCreation
