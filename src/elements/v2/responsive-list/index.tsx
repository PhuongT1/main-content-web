'use client'
import useWindowSize from '@/hooks/use-window-size'
import { BreakpointKeys } from '@/themes/get-design-tokens'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode, useEffect, useRef, useState } from 'react'
import ResponsiveBox, { ResponsiveBlockProps } from '../responsive-box'

const MAX_ITEMS_IN_ROW = 4

type Breakpoints = {
	[K in BreakpointKeys]?: [number, number]
}

export type ResponsiveListProps = {
	minBreakpoints?: Breakpoints
	children?: ReactNode
	minGap: [number, number]
	verticalGap?: number
	needToRemoveSpace?: number
	containerSx?: SxProps
} & ResponsiveBlockProps

const ResponsiveList = ({
  children,
  breakpoints,
  minBreakpoints,
  minGap,
  verticalGap = minGap[1],
  needToRemoveSpace = 0,
  containerSx,
  ...rest
}: ResponsiveListProps) => {
  const dimension = useWindowSize()
  const [hydrate, setHydrate] = useState(false)
  const [key, setKey] = useState(Math.random().toString())
  const pathname = getCurrentUrl()
  const refBox = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const smMatches = useMediaQuery(theme.breakpoints.down('sm'))
  const smSx = breakpoints?.sm || {}
  const mdSx = breakpoints?.md || {}

  const handleResize = () => {
    let gapValue, minValue, maxValue
    if (mdMatches && minBreakpoints?.md) {
      [minValue, gapValue] = minBreakpoints.md
	    verticalGap = gapValue
    } else if (smMatches && minBreakpoints?.sm) {
      [minValue, gapValue] = minBreakpoints.sm
	    verticalGap = gapValue
    } else {
      [minValue, gapValue] = minGap
	    verticalGap = gapValue
    }
    const templateGrid = calculateTemplateGrid(minValue, gapValue)

    const finalGap = `${verticalGap}px ${gapValue}px`

    return {
      gap: finalGap,
      gridTemplateColumns: templateGrid
    }
  }

  const calculateTemplateGrid = (minOfItemWidth: number, gap: number) => {
    if (refBox.current && minOfItemWidth) {
      //Get the current width box
      const boxWidth = refBox.current.clientWidth
      //Calculate space for a item (item + gap)
      const spaceForABox = minOfItemWidth + gap
      //Calculate number of items
      const y = Math.floor(boxWidth / spaceForABox)
      //if remaining space > 0 and remaining space is smaller than minOfItemWidth width of item
      const numberOfItems = y > MAX_ITEMS_IN_ROW ? MAX_ITEMS_IN_ROW : y
      return `repeat(${numberOfItems}, minmax(${minOfItemWidth}px, ${numberOfItems}fr));`
    }
  }

  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  return (
    <Box ref={refBox} sx={{ ...containerSx }}>
      <ResponsiveBox
        key={key}
        breakpoints={{
          md: { ...handleResize(), ...mdSx },
          sm: { ...smSx }
        }}
        display={'grid'}
        {...rest}
        {...handleResize()}
      >
        {children}
      </ResponsiveBox>
    </Box>
  )
}

export default ResponsiveList
