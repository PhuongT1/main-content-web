import React, { Key } from 'react'
import { Box, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { IItemMarketingGoal } from '@/types/advertisement-marketing.type'
import { MAX_LENGTH } from '@/constants/advertisement-marketing.constant'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { optionAutoFillItems } from '@/utils/styles'
import { CardItemDataAdd } from './../card_add_goal'

type SelectedList<T> = {
  selectedList: T[]
  key: keyof T
  render: (item: T) => React.ReactNode | React.ReactElement
}
type TCardSelectedProps<T> = {
  list: SelectedList<T>
  classNames?: string
  gridItemNumber?: number
  onClickCardItemDataAdd?: (item: IItemMarketingGoal) => void
}

function CardSelected<T>({ list, classNames, gridItemNumber = 3, onClickCardItemDataAdd }: TCardSelectedProps<T>) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <BoxLayoutOulined
      className={classNames}
      header={
        <Box display='flex' justifyContent='start' alignItems='center' gap={1} width='100%'>
          <Typography cate='title_50'>선택한 항목</Typography>
          <Typography sx={{ color: home.mint500, fontWeight: 600 }}>{list.selectedList?.length}개</Typography>
        </Box>
      }
    >
      <Box sx={{ ...optionAutoFillItems({ minWidth: 200, mediaQuery: 1560 }) }}>
        {list?.selectedList?.length > 0 && (
          <Box>
            <CardItemDataAdd
              onClickCardItemDataAdd={onClickCardItemDataAdd}
              isDisabled={list.selectedList.length >= MAX_LENGTH.GOALS}
            />
          </Box>
        )}

        {list?.selectedList?.map((item: T) => (
          <Box key={item?.[list.key] as Key}>{list.render(item)}</Box>
        ))}
      </Box>
    </BoxLayoutOulined>
  )
}

export default CardSelected
