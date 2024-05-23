import { CreateButton } from '@/components/home/button'
import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import { FC } from 'react'

export interface Props {
  onClick: () => void
}

const GenerateAi: FC<Props> = ({ onClick }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        padding: '76px',
        width: '100%',
        height: '280px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: home.gray400
      }}
    >
      <Typography sx={{ color: home.gray50, marginBottom: '12px' }} cate='title_50'>
        슘페터AI 로고
      </Typography>
      <Typography sx={{ color: home.gray100, marginBottom: '40px' }} cate='body_30'>
        로고 컨셉에 맞춰 슘페터 AI가 알맞은 로고를 생성합니다.
      </Typography>
      <CreateButton onClick={() => onClick()} />
    </Box>
  )
}

export default GenerateAi
