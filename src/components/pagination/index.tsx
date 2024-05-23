'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { Typography } from '@/elements'
import {
  Box,
  Pagination as MPagination,
  PaginationProps as MPaginationProps,
  PaginationItem,
  useTheme
} from '@mui/material'

type PaginationProps = {
  nextPage?: number
  action?: (page: number) => void
} & MPaginationProps

const Pagination = ({ page, action, ...rest }: PaginationProps) => {
  const theme = useTheme()

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
      <MPagination
        page={page}
        onChange={(_e, page = 1) => {
          console.log('page')
          action?.(page)
        }}
        showFirstButton
        showLastButton
        {...rest}
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'main_primary.blue500'
                }
              }}
              page={
                <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                  {item.page}
                </Typography>
              }
              slots={{
                first: () => {
                  return (
                    <Box position={'relative'}>
                      <ChevronLeftIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -8 }, width: 24, height: 24 }}
                        pathProps={{ stroke: theme.palette.main_grey.gray100 }}
                      />
                      <ChevronLeftIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -15 }, width: 24, height: 24 }}
                        pathProps={{ stroke: theme.palette.main_grey.gray100 }}
                      />
                    </Box>
                  )
                },
                previous: () => {
                  return (
                    <Box position={'relative'}>
                      <ChevronLeftIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -11 }, width: 24, height: 24 }}
                        pathProps={{
                          stroke: theme.palette.main_grey.gray100
                        }}
                      />
                    </Box>
                  )
                },
                last: () => {
                  return (
                    <Box position={'relative'}>
                      <ChevronRightIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -9 }, width: 24, height: 24 }}
                        pathProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 1 }}
                      />
                      <ChevronRightIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -16 }, width: 24, height: 24 }}
                        pathProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 1 }}
                      />
                    </Box>
                  )
                },
                next: () => {
                  return (
                    <Box position={'relative'}>
                      <ChevronRightIcon
                        svgProps={{ style: { position: 'absolute', top: -12, right: -12 }, width: 24, height: 24 }}
                        pathProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 1 }}
                      />
                    </Box>
                  )
                }
              }}
            />
          )
        }}
      />
    </Box>
  )
}

export default Pagination
