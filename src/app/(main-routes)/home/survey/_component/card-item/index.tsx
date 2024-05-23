import { Card, CardActionArea, SxProps, Theme, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { remConvert } from '@/utils/convert-to-rem'

export interface CardListProps {
  title: string
  isActive?: boolean
  onClick?: () => void
  sxCard?: SxProps<Theme>
}

const CardItemSurvey = ({ isActive, onClick, title, sxCard }: CardListProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Card
      className={[isActive ? 'active' : ''].join(' ')}
      sx={{
        outline: `1px solid ${home.gray200}`,
        backgroundColor: home.gray400,
        height: '100%',
        borderRadius: remConvert('8px'),
        ...sxCard,
        '&.active': {
          backgroundColor: home.alpha_blue_10,
          outline: `1px solid ${home.blue500}`
        }
      }}
      onClick={() => onClick && onClick()}
    >
      <CardActionArea
        disableRipple={!onClick}
        sx={{
          padding: remConvert('12px'),
          height: '100%'
        }}
      >
        <Box component={'div'}>
          <Box
            component={'div'}
            sx={{
              color: isActive ? home.blue500 : home.gray100,
              fontSize: remConvert('16px'),
              fontWeight: 600,
              lineHeight: '150%',
              textAlign: 'center'
            }}
          >
            {title}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CardItemSurvey
