'use client'
import { Avatar, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import Button from '@/elements/button'
import { ProjectParticipant } from '../../../domain'
import { ShareProjectPayload } from '../../../use-cases'
import { useExplorerProjectContext } from '../../../utils'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  projectId: number
  participantItem: ProjectParticipant
  onChange: (data: ProjectParticipant) => void
  hotUpdate?: boolean
}

const Participant: FC<Props> = ({ projectId, participantItem, onChange, hotUpdate }) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const refTime = useRef<NodeJS.Timeout>()
  const { userId, avatarUrl, email, nickname } = participantItem
  const [isBlocked, setIsBlocked] = useState<boolean>(participantItem.isBlocked)
  const { shareProjectMutation } = useExplorerProjectContext()

  const onShareProject = async (value: boolean) => {
    const body = {
      projectId,
      isBlocked: value,
      userIds: [userId]
    } as ShareProjectPayload
    const { error, variables } = await shareProjectMutation.mutateAsync(body)
    if (error) {
      setIsBlocked(!variables?.isBlocked)
      onChange({ ...participantItem, isBlocked: !variables?.isBlocked })
    } else {
      setIsBlocked(!!variables?.isBlocked)
      onChange({ ...participantItem, isBlocked: !!variables?.isBlocked })
    }
  }

  const onChangeBlock = (value: boolean) => {
    setIsBlocked(value)
    if (hotUpdate) {
      clearTimeout(refTime.current)
      refTime.current = setTimeout(() => {
        onShareProject(value)
      }, 500)
    } else onChange({ ...participantItem, isBlocked: value })
  }

  return (
    <Stack
      direction='row'
      width='100%'
      gap={remConvert('8px')}
      alignItems='center'
      sx={{ paddingBlock: remConvert('12px') }}
    >
      <RoundGradientAvatar>
        <Avatar
          sx={{
            width: '2rem',
            height: '2rem'
          }}
          src={avatarUrl || '/images/blank-user.png'}
        />
      </RoundGradientAvatar>
      <Stack flexGrow={1} gap={'6px'}>
        <Typography cate='sub_title_20' flexGrow={1} color={home.gray50}>
          {nickname}
        </Typography>
        <Stack flexGrow={1} direction={'row'}>
          <Typography
            cate='sub_title_20'
            flexGrow={1}
            width={'100%'}
            color={home.gray50}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              width: 0
            }}
          >
            {email}
          </Typography>
        </Stack>
      </Stack>
      <Button
        cate={'outlined'}
        type='button'
        sx={{
          padding: remConvert('2px 10px'),
          maxHeight: remConvert('32px'),
          minWidth: 'unset',
          border: 0
        }}
        onClick={() => onChangeBlock(!isBlocked)}
        customTitle={
          isBlocked ? (
            <Typography cate='sub_title_20' flexGrow={1} color={home.gray100}>
              {dict.common_block}
            </Typography>
          ) : (
            <Typography cate='sub_title_20' flexGrow={1} color={home.gray50}>
              {dict.common_unblock}
            </Typography>
          )
        }
      />
    </Stack>
  )
}
export default Participant

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

const RoundGradientAvatar = styled('div')(({ theme }) => ({
  padding: '0.25rem',
  border: 'none',
  outline: 'none',
  position: 'relative',
  width: remConvert('40px'),
  height: remConvert('40px'),
  zIndex: 1,
  borderRadius: '50%',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '1px',
    right: '1px',
    top: '1px',
    bottom: '1px',
    borderRadius: '50%',
    backgroundColor: theme.palette.home.gray200,
    zIndex: -1,
    transition: '200ms'
  }
}))
