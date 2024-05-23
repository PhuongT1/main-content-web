'use client'
import { FormControlLabel, Radio, RadioGroup, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import {
  IDetailProject,
  ISettingProject,
  PROJECT_ADMIN_REPLICATION_PERMISSIONS,
  PROJECT_SHARING_SCOPE_ENUM,
  PROJECT_STATUS_ENUM
} from '@/app/(main-routes)/project-home/_modules/domain'
import { setProjectSetting } from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import { useForm } from 'react-hook-form'
import InputItem from '@/form/input'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { USER_ROLE } from '@/constants/user.constants'
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

const AdminSettingProject: FC<Props> = ({ dataProject }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const user = useRecoilValue(userAtom)
  const isAdmin = user?.role === USER_ROLE.ADMIN
  const {
    control,
    reset,
    formState: { isDirty },
    getValues
  } = useForm<IDetailProject>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...dataProject
    }
  })

  const { mutate } = useMutation({
    mutationFn: (setting: ISettingProject) => setProjectSetting(dataProject.id, setting),
    onSuccess: ({ sharingScope, allowReplication }) => {
      const prewData = getValues()
      reset({ ...prewData, sharingScope, allowReplication })
    },
    onError(error) {
      console.log({ error })
    },
    meta: {
      offLoading: true
    }
  })

  const refTime = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(refTime.current)
    refTime.current = setTimeout(() => {
      if (isDirty) {
        mutate(getValues())
      }
    }, 500)
    return () => {
      clearTimeout(refTime.current)
    }
  }, [isDirty])

  if (!isAdmin) return

  return (
    <Stack
      gap={remConvert('20px')}
      sx={{ borderRadius: remConvert('12px'), backgroundColor: home.gray400, padding: remConvert('20px 16px') }}
    >
      <InputItem
        name='sharingScope'
        control={control}
        label={dict.project_home_sharing_scope}
        renderInput={({ field }) => (
          <RadioGroup key={`${field.value}`} value={field.value} row>
            {PROJECT_ADMIN_REPLICATION_PERMISSIONS.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                disabled={
                  item.value === PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC &&
                  dataProject.status !== PROJECT_STATUS_ENUM.DONE
                }
                onChange={() => field.onChange(item.value)}
                control={<Radio />}
                label={item.lable}
              />
            ))}
          </RadioGroup>
        )}
      />
    </Stack>
  )
}
export default AdminSettingProject
