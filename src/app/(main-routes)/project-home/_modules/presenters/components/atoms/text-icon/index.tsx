import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, useTheme } from '@mui/material'

interface ITextWIcon {
  name?: string
  description: string
  colorIcon?: string
  colorDescription?: string
  icon: React.ComponentType<any>
}

export const TextWIcon = ({ name, description, icon: Icon, colorIcon, colorDescription }: ITextWIcon) => {
  const { palette } = useTheme()

  return (
    <Stack flexDirection='row' alignItems='center' gap={convertToRem(5)}>
      <Icon color={colorIcon || palette.home.gray50} />
      {!!name && (
        <Typography cate='caption_1' color={palette.main.white}>
          {name}
        </Typography>
      )}
      <Typography cate='caption_1' color={colorDescription || palette.home.gray100}>
        {description}
      </Typography>
    </Stack>
  )
}
