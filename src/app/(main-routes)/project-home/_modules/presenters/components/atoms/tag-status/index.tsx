import { Typography } from '@/elements'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Stack, useTheme } from '@mui/material'
import { PROJECT_STATUS_ENUM, PROJECT_TYPE_ENUM } from '../../../../domain'
import { mapProjectStatus } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface ITagStatus {
  type: PROJECT_TYPE_ENUM
  status: PROJECT_STATUS_ENUM
  isDetail?: boolean
}

export const TagStatus = ({ type, status, isDetail }: ITagStatus) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()
  const statusMapping = mapProjectStatus(status, palette)
  if (isDetail) {
    return (
      <S.TagStatus
        sx={{
          height: 'min-content',
          cursor: 'pointer',
          borderColor: statusMapping.color,
          padding: remConvert('4px 16px')
        }}
        label={
          <Typography cate='body_2' color={statusMapping.color}>
            {statusMapping.text}
          </Typography>
        }
      />
    )
  }
  return type === PROJECT_TYPE_ENUM.OPEN_INNOVATION ? (
    <Stack flexDirection='row' gap={convertToRem(4)}>
      <Typography cate='body_3_semibold' color={palette.home.mint500}>
        {dict.project_home_status_fresh_library}
      </Typography>
      <Typography cate='body_3' color={palette.home.gray100}>
        {dict.project_home_people}
      </Typography>
    </Stack>
  ) : (
    <S.TagStatus
      sx={{ cursor: 'pointer', borderColor: statusMapping.color }}
      label={
        <Typography cate='caption_1_semibold' color={statusMapping.color}>
          {statusMapping.text}
        </Typography>
      }
    />
  )
}
