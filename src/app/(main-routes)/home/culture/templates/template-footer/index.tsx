import { Typography } from '@/elements'
import { Box } from '@mui/material'
import { FC } from 'react'

export interface Props {
  hightlight?: boolean
  type: 'ABOUT_US' | 'DIRECTION' | 'CULTURE' | 'PEOPLE' | 'OTHERS'
}

const TemplateFooter: FC<Props> = ({ hightlight, type }) => {
  const getTypeName = () => {
    switch (type) {
      case 'ABOUT_US':
        return { en: 'ABOUT US', kr: '우리는 누구인가' }
      case 'DIRECTION':
        return { en: 'DIRECTION', kr: '우리의 방향' }
      case 'CULTURE':
        return { en: 'CULTURE', kr: '문화와 제도' }
      case 'PEOPLE':
        return { en: 'PEOPLE', kr: '채용원칙' }
      case 'OTHERS':
        return { en: 'OTHERS', kr: '기타' }
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography fontSize='10px' fontWeight='700' color={hightlight ? '#FAFAFA' : '#292A2C33'}>
        CULTURE DECK
      </Typography>
      <Box>
        <Typography fontSize='10px' fontWeight='700' color='#3C82F9' marginRight='4px' component={'span'}>
          {getTypeName().kr}
        </Typography>
        <Typography fontSize='10px' fontWeight='700' color={hightlight ? '#FAFAFA' : '#292A2C33'} component={'span'}>
          {getTypeName().en}
        </Typography>
      </Box>
    </Box>
  )
}

export default TemplateFooter
