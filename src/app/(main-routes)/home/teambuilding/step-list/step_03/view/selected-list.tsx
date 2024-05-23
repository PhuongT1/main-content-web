import { SxProps, Box, useTheme, Grid } from '@mui/material'
import React, { Key } from 'react'
import { SelectedList } from '../../../_components/card-selected/types'
import { BoxLayout } from '@/components/home/box/box-custom'

import styles from '../../../_components/card-selected/card-selected.module.scss'
import { remConvert } from '@/utils/convert-to-rem'

type TCardSelectedProps<T> = {
  list: SelectedList<T>
  sxBoxList?: SxProps
  countItemRow?: number
}

type ListValue = number | string

function SelectedListView<T>({ sxBoxList, list, countItemRow = 3 }: TCardSelectedProps<T>) {
  const {
    palette: { home },
    breakpoints
  } = useTheme()

  return (
    <BoxLayout>
      <Box component={'div'} sx={{ border: 'none', p: 0, marginTop: 0 }} className={styles.selected_box}>
        <Box
          component={'div'}
          width={1}
          className={styles.selected_list}
          style={{
            marginTop: 0
          }}
          sx={{
            ...sxBoxList
          }}
        >
          <Grid container spacing={remConvert('12px')}>
            {list.selectedList?.map((item: T) => (
              <Grid
                key={item?.[list.key] as Key}
                item
                xs={12}
                sx={{
                  [breakpoints.up(1600)]: {
                    flexBasis: `calc(100% / ${countItemRow})`,
                    maxWidth: `calc(100% / ${countItemRow})`
                  },
                  [breakpoints.down(1600)]: {
                    flexBasis: `calc(100% / ${countItemRow - 1})`,
                    maxWidth: `calc(100% / ${countItemRow - 1})`
                  },
                  [breakpoints.down(1300)]: {
                    flexBasis: `calc(100% / ${countItemRow - 2})`,
                    maxWidth: `calc(100% / ${countItemRow - 2})`
                  },
                  [breakpoints.down(600)]: {
                    flexBasis: `calc(100%)`,
                    maxWidth: `calc(100%)`
                  }
                }}
              >
                <Box
                  className={styles.selected_item}
                  style={{
                    backgroundColor: home.gray_bg_200,
                    width: '100%'
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
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </BoxLayout>
  )
}

export default SelectedListView
