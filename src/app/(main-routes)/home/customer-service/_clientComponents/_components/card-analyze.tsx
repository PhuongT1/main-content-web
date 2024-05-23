import CardItem, { CardElementProps } from '@/components/home/card-item'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { Goal } from '@/types/customer-service.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'

export interface CardAnalyzeProps {
  item: Goal
  isActive?: boolean
  isView?: boolean
  onClick?: () => void
}

const CardAnalyze = ({ item, isActive, isView, onClick }: CardAnalyzeProps) => {
  const {
    palette: { home }
  } = useTheme()

  const convertTitle = () => {
    const title = (
      <Box component={'div'} flex={'1 0 0'} display={'flex'} gap={remConvert('12px')}>
        <Box
          component={'div'}
          sx={{
            backgroundColor: home.blue500,
            padding: remConvert('4px 10px'),
            borderRadius: remConvert('6px'),
            display: 'inline-block'
          }}
        >
          {item?.selectCategory}
        </Box>
        <TooltipTitle sxBoxWrapper={{ display: 'flex', alignItems: 'center' }} title={item?.inputGoal} />
      </Box>
    )
    return { title } as CardElementProps
  }

  return (
    <CardItem
      cardItem={convertTitle()}
      icon='radio'
      isActive={isActive}
      sxCard={{
        '.MuiCardActionArea-focusHighlight': {
          backgroundColor: 'transparent'
        },
        button: {
          padding: !isView ? remConvert('14px 20px') : 0
        }
      }}
      onClick={onClick ? () => onClick() : undefined}
    />
  )
}

export default CardAnalyze
