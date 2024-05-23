import CardItem, { CardListProps } from '@/components/home/card-item'
import ImageItem from '@/components/home/image'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { Typography } from '@/elements'
import { TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import { default as PurpleDot } from '@/assets/icons/strength-analysis/dot'

import React from 'react'
import DotList from '../dot'

type Props = {
  item: TTypesSA
} & Omit<CardListProps, 'cardItem'>

const CardType = ({ item, ...rest }: Props) => {
  const {
    palette: { home }
  } = useTheme()

  const convertTitle = (item: TTypesSA) => {
    if (item) {
      const title = (
        <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('4px')}>
          <DotList number={Number(item.star)} />
          <Typography cate='sub_title_30' color={home.gray50}>
            {item.strengthType}
          </Typography>
        </Box>
      )

      const content = (
        <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('10px')}>
          <TooltipTitle
            sxBox={{
              WebkitLineClamp: 3
            }}
            title={item.description}
          >
            <Typography color={home.gray100} cate='body_20'>
              {item.description}
            </Typography>
          </TooltipTitle>
          <ImageItem isLoading={false} width={185} height={273} alt={item.strengthType} src={item.url} />
        </Box>
      )
      return {
        ...item,
        title,
        content
      }
    }

    return item
  }
  return (
    <CardItem
      checkedProps={{
        rectProps: {
          fill: home.purple
        }
      }}
      sxCard={{
        backgroundColor: home.gray400,
        flexShrink: 0,
        minWidth: remConvert('225px'),
        '&.active': {
          backgroundColor: home.alpha_purple_10,
          outline: `1px solid ${home.purple}`
        },
        '.MuiCardActionArea-focusHighlight': {
          backgroundColor: home.alpha_purple_10,
          outline: `1px solid ${home.purple}`
        }
      }}
      sxContent={{
        backgroundColor: 'transparent'
      }}
      cardItem={convertTitle(item) as any}
      {...rest}
    />
  )
}

export default CardType
