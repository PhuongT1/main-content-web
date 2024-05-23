import React, { Key, useState } from 'react'

import PlusOutlineIcon from '@/assets/icons/plus-outline'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import { BoxLayoutOulined } from '@/components/home/box/box-custom'
import { Typography } from '@/elements'
import { useReponsiveCard } from '@/hooks/use-responsive-card'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Grid, Skeleton, SkeletonProps, Stack, StackProps, SxProps, useTheme } from '@mui/material'
import styles from './card-selected.module.scss'
import { ListValue, SelectedList } from './types'
import { useResponsive } from '@/hooks/use-responsive'
import { isEmpty } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'

type TCardSelectedProps<T> = {
  list: SelectedList<T>
  countItemRow?: number
  onRemove: (item: T) => void
  sxBoxList?: SxProps
  title?: string | React.ReactNode
  manualInput?: {
    placeholder: string | React.ReactNode
    renderInput: React.ReactNode
    onClickButtonApply: () => boolean
    disableButton: boolean
  }
}

function CardSelectedBox<T>({
  list,
  onRemove,
  sxBoxList,
  manualInput,
  countItemRow = 3,
  title = ''
}: TCardSelectedProps<T>) {
  const { dict } = useLanguage()
  const {
    palette: { home },
    breakpoints
  } = useTheme()

  const [isShowInput, setShowInput] = useState<boolean>(false)

  const renderManualInput = (
    <>
      {!isShowInput ? (
        <Box
          component={'button'}
          disabled={manualInput?.disableButton}
          className={styles.selected_item}
          onClick={(e) => e.preventDefault()}
          style={{
            backgroundColor: manualInput?.disableButton ? home.gray200 : home.gray400,
            maxHeight: 56,
            width: '100%',
            justifyContent: 'center',
            gap: '8px',
            border: '1px solid',
            borderColor: home.gray300,
            outline: 'none'
          }}
        >
          <Box onClick={() => setShowInput(true)} component={'span'} className={styles.remove_icon}>
            <PlusOutlineIcon
              pathProps={{ stroke: manualInput?.disableButton ? home.gray200 : home.gray50 }}
              rectProps={{ fill: home.gray300 }}
            />
          </Box>
          <p
            style={{ textAlign: 'left', pointerEvents: 'none', color: home.gray85 }}
            className={styles.box_selected_content}
          >
            {manualInput?.placeholder}
          </p>
        </Box>
      ) : (
        <Box
          className={styles.selected_item}
          style={{ backgroundColor: home.gray400, padding: '2px 10px', height: convertToRem(56) }}
        >
          <Box
            onClick={() => {
              const result = manualInput?.onClickButtonApply()
              setShowInput(!result)
            }}
            component={'span'}
            className={styles.remove_icon}
          >
            <PlusOutlineIcon pathProps={{ stroke: home.gray50 }} rectProps={{ fill: home.gray300 }} />
          </Box>
          {manualInput?.renderInput}
        </Box>
      )}
    </>
  )
  return (
    <BoxLayoutOulined
      header={
        <Box display='flex' justifyContent='start' alignItems='center' gap={2} width='100%'>
          <Typography cate='title_50' sx={{ color: home.gray50 }}>
            {title || dict.selected_item}
          </Typography>
          <span style={{ display: 'none' }} className={list?.selectedList?.length > 0 ? styles.total_list : ''}>
            {list?.selectedList?.length}
            {dict.common_count}
          </span>
        </Box>
      }
      className={styles.selected_box}
      style={{ backgroundColor: 'transparent' }}
    >
      <Box
        component={'div'}
        className={styles.selected_list}
        sx={{
          ...sxBoxList
        }}
      >
        <Grid container spacing={'12px'}>
          {manualInput && (
            <Grid
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
              {renderManualInput}
            </Grid>
          )}
          {list?.selectedList?.map((item: T, index) => (
            <Grid
              key={index}
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
              <Box className={styles.selected_item} style={{ backgroundColor: home.gray400 }}>
                {typeof list?.render === 'function' ? (
                  list.render(item)
                ) : (
                  <p className={styles.box_selected_content} style={{ color: home.gray50 }}>
                    {item?.[list.label] as ListValue}
                  </p>
                )}
                <Box onClick={() => onRemove(item)} component={'span'} className={styles.remove_icon}>
                  <ClearBoxIcon
                    svgProps={{ width: 24, height: 24 }}
                    pathProps={{ stroke: home.gray0 }}
                    rectProps={{ fill: home.gray300 }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </BoxLayoutOulined>
  )
}

export default CardSelectedBox

type TCardListSkeletonProps = {
  columns: number
  itemPerRow?: number
  boxProps?: Omit<BoxProps, 'width'>
  spacing?: number
  skeletonProps?: SkeletonProps
} & Omit<StackProps, 'spacing'>
function CardListSkeleton({
  columns = 12,
  itemPerRow = 3,
  boxProps,
  spacing = 10,
  skeletonProps,
  ...stackProps
}: TCardListSkeletonProps) {
  const maxWidth = useReponsiveCard(itemPerRow)

  return (
    <Stack useFlexGap spacing={`${spacing}px`} direction={'row'} flexWrap={'wrap'} {...stackProps}>
      {Array.from({ length: columns }, (_, i) => i + 1).map((item) => (
        <Box width={maxWidth} height={56} key={item} {...boxProps}>
          <Skeleton
            animation='wave'
            variant='rounded'
            sx={{ minWidth: '100%', height: '100%', borderRadius: '10px' }}
            {...skeletonProps}
          />
        </Box>
      ))}
    </Stack>
  )
}
export { CardListSkeleton }
