'use-client'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Stack, useTheme } from '@mui/material'

interface IGroup {
  imageUrl: string
  name: string
}

export const Group = ({ imageUrl, name }: IGroup) => {
  const { palette } = useTheme()

  return (
    <Stack flexDirection='row' gap={convertToRem(6)} alignItems='center'>
      <Avatar alt='Avatar' src={imageUrl || '/images/blank-user.png'} sx={{ width: 28, height: 28 }} />
      <Typography cate='body_3_semibold' color={palette.home.gray100} lines={1}>
        {name}
      </Typography>
    </Stack>
  )
}
