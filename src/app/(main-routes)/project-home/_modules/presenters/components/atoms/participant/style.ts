import { convertToRem } from '@/utils/convert-to-rem'
import { AvatarGroup, AvatarGroupProps, styled } from '@mui/material'

type IParticipants = AvatarGroupProps & {
  imageUrl?: string
}

export const Participants = styled(AvatarGroup)<IParticipants>(({ theme, imageUrl }) => ({
  '.MuiAvatar-colorDefault': {
    width: convertToRem(28),
    height: convertToRem(28),
    fontSize: convertToRem(12),
    fontWeight: 600,
    lineHeight: '120%',
    color: theme.palette.home.gray50,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.90) 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`
  },
  '.MuiAvatarGroup-avatar': {
    borderColor: theme.palette.home.gray400
  }
}))
