'use client'
import Image, { StaticImageData } from 'next/image'
import { useTheme } from '@mui/material'
import { Typography } from '@/elements'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import { PROJECT_TYPE_ENUM } from '../../../../domain'
import * as S from './style'

interface IProjectCreation {
  imageUrl: string | StaticImageData
  type: PROJECT_TYPE_ENUM
  typeSelected: PROJECT_TYPE_ENUM | null
  setTypeSelected: (type: PROJECT_TYPE_ENUM) => void
  isFreeUser?: boolean
}

const projectTypeMapping: Record<PROJECT_TYPE_ENUM, string> = {
  [PROJECT_TYPE_ENUM.INDIVIDUAL]: '개인 프로젝트',
  [PROJECT_TYPE_ENUM.GROUP]: '단체 프로젝트',
  [PROJECT_TYPE_ENUM.CLONE]: '',
  [PROJECT_TYPE_ENUM.STARTUP]: '',
  [PROJECT_TYPE_ENUM.OPEN_INNOVATION]: ''
}

export const ProjectCreation = ({ type, imageUrl, typeSelected, setTypeSelected, isFreeUser }: IProjectCreation) => {
  const { palette } = useTheme()
  const title = projectTypeMapping[type]

  return (
    <S.BoxCard
      border={`1px solid ${type === typeSelected ? palette.home.blue500 : palette.home.gray300}`}
      sx={{
        backgroundColor: type === typeSelected ? 'rgba(60, 130, 249, 0.10)' : palette.home.gray300
      }}
      onClick={() => {
        if (!isFreeUser) {
          setTypeSelected(type)
        }
      }}
    >
      <S.BoxIcon>
        {type === typeSelected ? (
          <RadioOutlineFilledIcon color={palette.home.blue500} />
        ) : (
          <RadioOutlineIcon color={palette.home.gray100} />
        )}
      </S.BoxIcon>
      <Image src={imageUrl} alt={title} width={58} />
      <Typography cate='body_3_semibold' color={palette.home.gray50}>
        {title}
      </Typography>

      {isFreeUser && <S.LockOverlay />}
    </S.BoxCard>
  )
}
export default ProjectCreation
