import React, { Key } from 'react'
import { Box, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { optionAutoFillItems } from '@/utils/styles'

type SelectedList<T> = {
  selectedList: T[]
  key: keyof T
  render: (item: T) => React.ReactNode | React.ReactElement
}
type TCardSelectedProps<T> = {
  list: SelectedList<T>
  classNames?: string
  gridItemNumber?: number
}

function CardSelected<T>({ list, classNames, gridItemNumber = 3 }: TCardSelectedProps<T>) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <BoxLayoutOulined
      className={classNames}
      header={
        <Box display='flex' justifyContent='start' alignItems='center' gap={1} width='100%'>
          <Typography cate='title_50'>선택한 항목</Typography>
          {list.selectedList?.length > 0 && (
            <Typography sx={{ color: home.mint500, fontWeight: 600 }}>{list.selectedList?.length}개</Typography>
          )}
        </Box>
      }
    >
      <Box sx={{ ...optionAutoFillItems({}) }}>
        {list.selectedList?.map((item: T) => (
          <Box key={item?.[list.key] as Key}>{list.render(item)}</Box>
        ))}
      </Box>
    </BoxLayoutOulined>
  )
}

export default CardSelected
