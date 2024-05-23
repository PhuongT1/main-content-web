'use client'
import { Stack, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import { Checkbox, Typography } from '@/elements'
import { ModalNotification } from '@/components/dialog/modal-deck'
import { AlertProps } from '@/components/dialog'
import RegisterUserRedIcon from '@/assets/icons/register-user-red'
import { useLanguage } from '@/hooks/use-language'

const ModalPublicProject: FC<AlertProps> = ({ ...rest }) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const [agreeInfomation, setAgreeInfomation] = useState<boolean>(false)

  return (
    <ModalNotification
      icon={<RegisterUserRedIcon />}
      title={dict.project_home_full_disclosure_open_innovation}
      description={
        <Stack>
          <Typography cate='body_30' color={home.gray100}>
            {dict.project_home_modal_public_project_description}
          </Typography>
          <Checkbox
            label={dict.project_home_agree}
            checked={agreeInfomation}
            sx={{ marginLeft: 'auto' }}
            onChange={() => setAgreeInfomation(!agreeInfomation)}
          />
        </Stack>
      }
      sxButtonCancel={{ display: 'none' }}
      sxButtonSubmit={{
        pointerEvents: agreeInfomation ? 'auto' : 'none',
        backgroundColor: agreeInfomation ? home.blue500 : home.gray300
      }}
      {...rest}
    />
  )
}
export default ModalPublicProject
