import PlusSAIcon from '@/assets/icons/strength-analysis/plus'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Card, CardActionArea, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'

type Props = {
  active?: boolean
  error?: boolean
  onClick: VoidFunction
}

const PlusCard = ({ active, error, onClick }: Props) => {
  const {
    palette: { home }
  } = useTheme()

  const borderColor = active ? home.blue500 : error ? home.red500 : home.gray200
  return (
    <Card
      sx={{
        minWidth: remConvert('225px'),
        minHeight: remConvert('225px'),
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: remConvert('10px'),
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        backgroundColor: active ? home.alpha_blue_10 : home.gray300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          minWidth: remConvert('225px'),
          minHeight: remConvert('225px'),
          width: '100%',
          height: '100%',
          aspectRatio: 1,
          borderRadius: remConvert('10px'),
          overflow: 'hidden',
          outline: 'none',
          backgroundColor: active ? home.alpha_blue_10 : home.gray300,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PlusSAIcon />
      </CardActionArea>
    </Card>
  )
}

const EmptyCard = () => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Card
      sx={{
        opacity: 0.5,
        minWidth: remConvert('225px'),
        minHeight: remConvert('225px'),
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: remConvert('10px'),
        border: `1px solid ${home.gray200}`,
        backgroundColor: home.gray300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography textAlign={'center'} whiteSpace={'wrap'} cate='sub_title_30' color={home.gray100}>
        남은 강점유형이 <br></br>자동으로 분류됩니다.
      </Typography>
    </Card>
  )
}

const TitleCard = ({
  icon,
  title,
  sxBox
}: {
  icon: React.ReactNode
  title: React.ReactNode
  sxBox?: SxProps<Theme>
}) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: home.gray300,
        minWidth: remConvert('225px'),
        width: '100%',
        borderRadius: remConvert('10px'),
        height: remConvert('54px'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: remConvert('10px'),
        ...sxBox
      }}
    >
      {icon}
      {title}
    </Box>
  )
}

export { PlusCard, EmptyCard, TitleCard }
