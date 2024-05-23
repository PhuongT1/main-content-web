'use client'
import { TYPE_MODAL_CONFIRM } from '@/app/(main-routes)/project-home/_modules/domain'
import { ConfirmModal } from '../../molecules'
import { useLanguage } from '@/hooks/use-language'

interface IConfirmModal {
  open: boolean
  onClose: () => void
}

export const ModalPremiumOnly = ({ open, onClose }: IConfirmModal) => {
  const { dict } = useLanguage()
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title={dict.project_home_modal_premium_only_title}
      description={dict.project_home_modal_premium_only_description}
      submitText={dict.common_confirm}
      onSubmit={onClose}
      type={TYPE_MODAL_CONFIRM.CAN_NOT_ACTION}
    />
  )
}

export default ModalPremiumOnly
