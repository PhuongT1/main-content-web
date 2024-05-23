import CardItem, { CardListProps } from '@/components/home/card-item'
import { convertToRem } from '@/utils/convert-to-rem'
import { useTheme } from '@mui/material'

export const CardProjectCustom = ({ sxCard = {}, sxContent = {}, ...props }: CardListProps) => {
  const { palette } = useTheme()

  return (
    <CardItem
      {...props}
      sxCard={{
        backgroundColor: `${palette.home.gray400} !important`,
        '&:hover, &:focus': {
          outline: `1px solid ${palette.home.blue500}`,
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          '.MuiCardActionArea-root, .MuiCardActionArea-focusHighlight': {
            backgroundColor: 'transparent'
          }
        },
        ...sxCard
      }}
      sxContent={{
        display: 'flex',
        width: convertToRem(286),
        minHeight: convertToRem(201),
        backgroundColor: 'transparent',
        marginTop: '0 !important',
        ...sxContent
      }}
    />
  )
}
