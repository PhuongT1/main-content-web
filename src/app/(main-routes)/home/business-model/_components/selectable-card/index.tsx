import { Box, Card, CardActionArea, CardActionAreaProps, CardContent, CardContentProps, CardProps } from '@mui/material'
import { ReactNode } from 'react'

type SelectableCardProps = {
  slots?: {
    cardProps?: CardProps
    cardActionAreaProps?: CardActionAreaProps
    cardContentProps?: CardContentProps
  }
  children: ReactNode
}

const SelectableCard = ({ slots, children }: SelectableCardProps) => {
  const { sx: cardSx, ...restCardProps } = slots?.cardProps || {}
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 2.5,
        p: 0,
        bgcolor: 'home.gray400',
        backgroundImage: 'unset',
        ...cardSx
      }}
      {...restCardProps}
    >
      <CardActionArea {...slots?.cardActionAreaProps}>
        <CardContent {...slots?.cardContentProps}>
          <Box>{children}</Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SelectableCard
