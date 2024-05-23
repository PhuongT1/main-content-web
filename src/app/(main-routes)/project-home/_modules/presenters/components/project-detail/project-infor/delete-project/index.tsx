'use client'
import { useTheme } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { remConvert } from '@/utils/convert-to-rem'
import { deleteProject } from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import { ButtonItem } from '@/components/home/button'
import TrashIcon from '@/assets/icons/trash'
import { ModalNotification } from '@/components/dialog/modal-deck'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import useToggle from '@/hooks/use-toggle'
import { IDetailProject } from '@/app/(main-routes)/project-home/_modules/domain'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  dataProject: IDetailProject
  onDeleteSusses: (data: IDetailProject) => void
  adminDeleteOpenInnovation?: boolean
}

const BtnDeleteProject: FC<Props> = ({ dataProject, onDeleteSusses, adminDeleteOpenInnovation }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [showPopupDelete, toggleShowPopupDelete, setToggleShowPopupDelete] = useToggle()
  const { mutate: onDeleteProject } = useMutation({
    mutationFn: () => deleteProject(dataProject.id),
    onSuccess: () => onDeleteSusses(dataProject)
  })

  const textModal = useMemo(() => {
    if (adminDeleteOpenInnovation) {
      return {
        title: dict.project_home_modal_delete_project_open_title,
        description: dict.project_home_modal_delete_project_open_description
      }
    }
    return {
      title: dict.project_home_modal_confirm_delete_title,
      description: dict.project_home_modal_confirm_delete_description
    }
  }, [adminDeleteOpenInnovation, dict])

  return (
    <>
      <ButtonItem
        startIcon={<TrashIcon />}
        sx={{ padding: remConvert('10px 24px'), minWidth: 'max-content' }}
        onClick={toggleShowPopupDelete}
      >
        {dict.common_delete}
      </ButtonItem>
      <ModalNotification
        icon={<TrashRedIcon pathProps={{ fill: home.red500 }} />}
        title={textModal.title}
        description={textModal.description}
        sxButtonSubmit={{
          bgcolor: home.red500,
          '&:hover': {
            bgcolor: home.red500
          }
        }}
        onCancel={() => setToggleShowPopupDelete(false)}
        onSubmit={() => onDeleteProject()}
        open={showPopupDelete}
      />
    </>
  )
}

export default BtnDeleteProject
