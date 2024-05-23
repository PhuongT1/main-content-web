'use client'
import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useState } from 'react'
import { ExplorerProjectProvider, calculateTimeRemaining } from './_modules/utils'
import { useUserProfile } from '@/hooks/use-user-profile'
import { Typography } from '@/elements'
import { useTheme } from '@mui/material'
import { useExplorerModal } from './_modules/presenters/hooks'
import { TIME_REMAIN_ERROR, TYPE_MODAL_CONFIRM } from './_modules/domain'
import { useLanguage } from '@/hooks/use-language'

const ConfirmModal = dynamic(() => import('./_modules/presenters/components/molecules/alerts/confirm-modal'), {
  ssr: false
})

const ProjectHomeLayout = ({ children }: { children: ReactNode }) => {
  const { dict, t } = useLanguage()
  const { user } = useUserProfile()
  const { palette } = useTheme()
  const { open, openModal, closeModal } = useExplorerModal()
  const [days, setDays] = useState<number>(0)

  useEffect(() => {
    if (user?.upgradePackageValidDate) {
      const timeRemaining = calculateTimeRemaining(user?.upgradePackageValidDate)
      setDays(timeRemaining.daysLeft)
      if (timeRemaining.error !== TIME_REMAIN_ERROR.INVALID_DATE && timeRemaining.timeLeft <= timeRemaining.timeAlert) {
        openModal()
      }
    }
  }, [user])

  return (
    <ExplorerProjectProvider>
      {children}
      {open && (
        <ConfirmModal
          open={true}
          onClose={closeModal}
          title={t('project_home_modal_expire_title', { number: days })}
          description={
            <Typography cate='body_3' color={palette.home.gray100} sx={{ whiteSpace: 'pre-line' }}>
              {dict.project_home_modal_expire_description}
            </Typography>
          }
          cancelText={dict.project_home_purchase}
          submitText={dict.common_close}
          onSubmit={closeModal}
          onCancel={closeModal}
          type={TYPE_MODAL_CONFIRM.ERROR}
        />
      )}
    </ExplorerProjectProvider>
  )
}

export default ProjectHomeLayout
