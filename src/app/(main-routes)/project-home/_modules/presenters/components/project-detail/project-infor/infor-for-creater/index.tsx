'use client'
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import LinkMdIcon from '@/assets/icons/link-md'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import ScrollBar from 'react-perfect-scrollbar'
import {
  IDetailProject,
  ISettingProject,
  PROJECT_PATHS_ENUM,
  PROJECT_REPLICATION_PERMISSIONS,
  PROJECT_SHARING_SCOPE_ENUM,
  PROJECT_STATUS_ENUM,
  ProjectParticipant
} from '@/app/(main-routes)/project-home/_modules/domain'
import {
  getProjecParticipants,
  openInnovation,
  setProjectSetting
} from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import Participant from '@/app/(main-routes)/project-home/_modules/presenters/components/participants'
import { useForm } from 'react-hook-form'
import SelectItem from '@/form/select'
import InputItem from '@/form/input'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import ShareNetworkIcon from '@/assets/icons/home/business-model/arrow/share-network.ico'
import useToggle from '@/hooks/use-toggle'
import ModalPublicProject from './modal-public-project'
import { useRouter } from 'next/navigation'
import { getUrlWithParams } from '@/app/(main-routes)/project-home/_modules/utils'
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

const InfoForCreater: FC<Props> = ({ dataProject }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const router = useRouter()
  const [, copy] = useCopyToClipboard()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [listParticipants, setListParticipants] = useState<ProjectParticipant[]>([])
  const linkShare = useMemo(
    () => `${window.location.origin}/project-home/share-project/${dataProject.code}`,
    [dataProject.code]
  )

  const {
    control,
    reset,
    formState: { isDirty },
    getValues
  } = useForm<ISettingProject>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...dataProject
    }
  })

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['getCourseSubject', dataProject.id],
    queryFn: async (param) => {
      return getProjecParticipants(dataProject.id, param.pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: ({ metaData }) => {
      return metaData.currentPage < metaData.totalPages ? metaData.currentPage + 1 : undefined
    },
    meta: {
      offLoading: true
    }
  })

  const { mutate } = useMutation({
    mutationFn: (setting: ISettingProject) => setProjectSetting(dataProject.id, setting),
    onSuccess: ({ sharingScope, allowReplication }) => {
      reset({ sharingScope, allowReplication })
      if (sharingScope === PROJECT_SHARING_SCOPE_ENUM.PRIVATE) {
        setListParticipants((prew) =>
          prew.map((item) => ({
            ...item,
            isBlocked: true
          }))
        )
      }
    },
    onError(error) {
      console.log({ error })
    },
    meta: {
      offLoading: true
    }
  })

  const { mutate: setOpenInnovation } = useMutation({
    mutationFn: () => openInnovation(dataProject.id),
    onSuccess: (data) => {
      dataProject.isOpenedInnovation = true
      dataProject.openedInnovationProjectId = data.id
    }
  })

  const refTime = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(refTime.current)
    refTime.current = setTimeout(() => {
      if (isDirty) {
        console.log('change')
        mutate(getValues())
      }
    }, 500)
    return () => {
      clearTimeout(refTime.current)
    }
  }, [isDirty])

  useEffect(() => {
    setListParticipants(
      data?.pages?.reduce((accumulator: ProjectParticipant[], current) => {
        return [...accumulator, ...current.result]
      }, []) || []
    )
  }, [data?.pages])

  return (
    <Stack
      gap={remConvert('20px')}
      sx={{ borderRadius: remConvert('12px'), backgroundColor: home.gray400, padding: remConvert('20px 16px') }}
    >
      <Stack gap={remConvert('8px')}>
        <Typography cate='link_30'>{dict.project_home_share_project_public_status}</Typography>
        <Stack
          direction={'row'}
          width={'100%'}
          alignItems={'center'}
          sx={{
            border: `1px solid ${home.gray200}`,
            backgroundColor: home.gray300,
            borderRadius: remConvert('10px'),
            padding: remConvert('8px 16px')
          }}
        >
          <Typography
            cate='body_30'
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {linkShare}
          </Typography>
          <Button
            cate={'contained'}
            sx={{
              padding: remConvert('8px 12px'),
              height: 'unset',
              backgroundColor: home.blue500,
              border: 0
            }}
            onClick={() => copy(linkShare)}
            startIcon={<LinkMdIcon gProps={{ fill: home.gray500 }} />}
            customTitle={
              <Typography cate='sub_title_20' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
                {dict.common_copy}
              </Typography>
            }
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundColor: home.gray300,
          borderRadius: remConvert('10px')
        }}
      >
        <ScrollBar
          onYReachEnd={() => hasNextPage && !isFetching && fetchNextPage()}
          style={{
            height: remConvert('240px'),
            marginLeft: remConvert('-3px'),
            marginRight: remConvert('-3px'),
            marginInline: remConvert('4px')
          }}
        >
          <Box
            sx={{
              paddingInline: remConvert('12px'),
              '>:not(:last-child)': {
                borderBottom: `1px solid ${home.gray200}`
              }
            }}
          >
            {listParticipants.map((data, index) => {
              return (
                <Participant
                  key={`${data.sharedDate}_${data.isBlocked}`}
                  projectId={dataProject.id}
                  participantItem={data}
                  onChange={(dataChange) => (listParticipants[index] = dataChange)}
                  hotUpdate
                />
              )
            })}
          </Box>
        </ScrollBar>
      </Box>
      <SelectItem control={control} label={dict.project_home_setting_project_disclosure_scope} name='sharingScope'>
        <MenuItem value={PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC}>
          <Stack>{dict.project_home_share_project_public}</Stack>
        </MenuItem>
        <MenuItem value={PROJECT_SHARING_SCOPE_ENUM.PRIVATE}>{dict.project_home_share_project_private}</MenuItem>
      </SelectItem>
      <InputItem
        name='allowReplication'
        control={control}
        label={dict.project_home_set_clone_permission}
        renderInput={({ field }) => (
          <RadioGroup key={`${field.value}`} value={field.value} row>
            {PROJECT_REPLICATION_PERMISSIONS.map((value, index) => (
              <FormControlLabel
                key={index}
                value={value.value}
                onChange={() => field.onChange(value.value)}
                control={<Radio />}
                label={value.lable}
              />
            ))}
          </RadioGroup>
        )}
      />
      {dataProject.isOpenedInnovation ? (
        <Button
          cate={'contained'}
          sx={{
            padding: remConvert('12px'),
            height: 'unset',
            backgroundColor: home.blue500,
            border: '0'
          }}
          onClick={() =>
            router.push(
              getUrlWithParams(PROJECT_PATHS_ENUM.OPEN_INNOVATION_DETAIL, {
                id: `${dataProject.openedInnovationProjectId}`
              })
            )
          }
          customTitle={
            <Stack direction={'row'} alignItems={'center'} gap={remConvert('10px')}>
              <ShareNetworkIcon
                svgProps={{ width: remConvert('20px'), height: remConvert('20px') }}
                rectProps={{ fill: 'none' }}
                pathProps={{ fill: home.gray500 }}
              />
              <Stack direction={'row'}>
                <Typography cate='sub_title_30' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
                  {dict.project_home_project_released}
                </Typography>
                <Typography cate='body_30' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
                  {dict.common_go_to}
                </Typography>
              </Stack>
            </Stack>
          }
        />
      ) : (
        <Button
          cate={'contained'}
          sx={{
            padding: remConvert('12px'),
            height: 'unset',
            backgroundColor: home.mint500,
            border: '0'
          }}
          onClick={() => setToggleShowDialog(true)}
          disabled={dataProject.status !== PROJECT_STATUS_ENUM.DONE}
          customTitle={
            <Stack direction={'row'} alignItems={'center'} gap={remConvert('10px')}>
              <ShareNetworkIcon
                svgProps={{ width: remConvert('20px'), height: remConvert('20px') }}
                rectProps={{ fill: 'none' }}
                pathProps={{ fill: home.gray500 }}
              />
              <Stack direction={'row'}>
                <Typography cate='sub_title_30' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
                  {dict.project_home_open_innovation}
                </Typography>
                <Typography cate='body_30' flexGrow={1} color={home.gray500} sx={{ textWrap: 'nowrap' }}>
                  {dict.project_home_full_disclosure_on}
                </Typography>
              </Stack>
            </Stack>
          }
        />
      )}
      <ModalPublicProject
        key={`${showDialog}`}
        open={showDialog}
        onClose={() => setToggleShowDialog(false)}
        onCancel={toggleShowDialog}
        onSubmit={() => {
          setToggleShowDialog(false)
          setOpenInnovation()
        }}
      />
    </Stack>
  )
}
export default InfoForCreater
