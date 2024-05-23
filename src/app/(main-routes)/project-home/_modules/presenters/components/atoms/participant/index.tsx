import { Avatar } from '@mui/material'
import { MAX_SHOW_AVATAR, ProjectParticipant } from '../../../../domain'
import * as S from './style'

interface IParticipant {
  participants: ProjectParticipant[]
}

export const Participant = ({ participants }: IParticipant) => {
  return (
    <S.Participants
      total={participants.length}
      imageUrl={participants.length > MAX_SHOW_AVATAR ? participants[MAX_SHOW_AVATAR]?.avatarUrl : ''}
    >
      {participants.slice(0, MAX_SHOW_AVATAR).map((participant: ProjectParticipant, idx: number) => (
        <Avatar
          key={idx}
          alt={participant.username}
          src={participant.avatarUrl || '/images/blank-user.png'}
          sx={{ width: 28, height: 28 }}
        />
      ))}
    </S.Participants>
  )
}
