import React, { Key } from 'react'

import styles from './card-selected.module.scss'
import { Box, SxProps, useTheme } from '@mui/material'
import { SelectedList } from './types'
import { useResponsive } from '@/hooks/use-responsive'

type TCardSelectedProps<T> = {
  list: SelectedList<T>
  sxBoxList?: SxProps
  countItemRow?: number
}

type ListValue = number | string

function CardSelectedBox<T>({ list, sxBoxList, countItemRow = 3 }: TCardSelectedProps<T>) {
  const {
    palette: { home }
  } = useTheme()

  const lgDown = useResponsive('down', 'xl')

  const countItemInRow = lgDown ? 2 : countItemRow
  const maxWidthItem = `calc((100% - ${12 * (countItemInRow - 1)}px) / ${countItemInRow})`
  return (
    <Box component={'div'} className={styles.selected_box} sx={{ backgroundColor: home.gray300 }}>
      <Box
        component={'div'}
        className={styles.selected_list}
        sx={{
          ...sxBoxList
        }}
      >
        {list.selectedList?.map((item: T) => (
          <Box
            key={item?.[list.key] as Key}
            className={styles.selected_item}
            sx={{
              backgroundColor: home.gray200,
              width: maxWidthItem
            }}
          >
            {typeof list?.render === 'function' ? (
              list.render(item)
            ) : (
              <p
                style={{
                  color: home.gray50
                }}
                className={styles.box_selected_content}
              >
                {item?.[list.label] as ListValue}
              </p>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default CardSelectedBox
