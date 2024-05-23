'use client'
import { EmptyText, ResponsiveList } from '@/elements'
import { ResponsiveListProps } from '@/elements/v2/responsive-list'
import { useHydrate } from '@/hooks/use-hydrate'
import { RequireChildren } from '@/types/types.type'
import { isServer } from '@/utils/types'
import { Box, SxProps } from '@mui/material'
import { ReactNode, useLayoutEffect } from 'react'
import Pagination from '../pagination'

type PaginationListProps = {
  isEmpty?: boolean
  curPage?: number
  totalPage?: number
  itemWidth?: number
  gap?: number
  responsiveListProps?: Omit<ResponsiveListProps, 'minGap'>
  onPageChange: (page: number) => void
  scrollTop?: boolean
  numberOfItemsInLine?: number
  emptyTxt?: ReactNode
  containerSx?: SxProps
  sx?: SxProps
  showPagination?: boolean
  isLoading?: boolean
} & RequireChildren

const PaginationList = ({
  children,
  isEmpty,
  curPage,
  totalPage,
  itemWidth = 200,
  gap = 16,
  responsiveListProps,
  onPageChange,
  scrollTop = true,
  numberOfItemsInLine = 4,
  emptyTxt = '',
  containerSx,
  showPagination = true,
  isLoading = false,
  ...rest
}: PaginationListProps) => {
  const {} = useHydrate()

  useLayoutEffect(() => {
    if (scrollTop) {
      const wd = isServer() ? undefined : window
      wd?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [curPage])

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} sx={containerSx} {...rest}>
      <Box height={'100%'} width={'100%'}>
        {!isEmpty ? (
          <>
            {
              <ResponsiveList minGap={[itemWidth, gap]} minBreakpoints={{ md: [100, 8] }} {...responsiveListProps}>
                {children}
              </ResponsiveList>
            }
            {showPagination && <Pagination action={onPageChange} sx={{ mt: 6 }} page={curPage} count={totalPage} />}
          </>
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} my={14}>
            <EmptyText>{emptyTxt}</EmptyText>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PaginationList
