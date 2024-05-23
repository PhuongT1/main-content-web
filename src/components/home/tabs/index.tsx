import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { SnapItemProps, SnapListProps } from '@/types/tab.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, IconButton, SxProps, Theme, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { SnapList, SnapItem, useVisibleElements, useScroll } from 'react-snaplist-carousel'

interface TabListItemProps<T> {
  value: any
  snapListProps?: SnapListProps
  snapItemProps?: SnapItemProps
  sx?: SxProps<Theme>
  className?: string
  itemToSlice?: number
  debounce?: number
  onChange?: (e: any, item: T) => void
  children: React.ReactNode
  variant?: 'scrollable' | 'standard'
}

export default function TabListItem<T>({
  value,
  snapListProps,
  snapItemProps,
  itemToSlice = 2,
  debounce = 10,
  onChange,
  sx,
  className,
  variant = 'scrollable',
  children: childrenProp
}: TabListItemProps<T>) {
  const {
    palette: { home, main }
  } = useTheme()
  const snapListRef = useRef<HTMLDivElement>(null)
  const { ref, inView: lastItemInview } = useInView({
    /* Optional options */
    threshold: 0
  })

  const selectedIndex = useVisibleElements({ ref: snapListRef, debounce }, (elements) => elements[0])

  const goToSnapItem = useScroll({ ref: snapListRef })

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null
    }

    let childIndex = 0
    const childValue = child.props.value === undefined ? childIndex : child.props.value
    const selected = childValue === value

    const {sx,...restChilProps} = child.props

    
    // Custom css active with class selector class .Mui-selected

    childIndex += 1
    const newProps = {
      selected,
      className: [selected  && '.Mui-selected',child.props.className].join(' '),
      sx: {
        color: home.gray50,
        lineHeight: '150%',
        ...sx,
        backgroundColor: selected ? home.blue500 : home.gray300,
    
      },
      value: childValue,
      onClick: (event: any) => onChange && onChange(event, childValue),
      ...restChilProps
    }
    return (
      <SnapItem key={childIndex} snapAlign='start' {...snapItemProps}>
        {React.cloneElement(child, { ...newProps })}
      </SnapItem>
    )
  })

  return (
    <Box
      component={'div'}
      display={'flex'}
      className={className}
      sx={{
        borderRadius: remConvert('10px'),
        background: home.gray400,
        padding: remConvert('12px 24px'),
        ...sx
      }}
    >
      <IconButton
        sx={{
          visibility: selectedIndex === 0 ? 'hidden' : 'visible'
        }}
        onClick={() => {
          if (selectedIndex === 0) return
          goToSnapItem(selectedIndex - itemToSlice)
        }}
      >
        <ChevronLeftIcon
          pathProps={{
            stroke: home.gray50
          }}
        />
      </IconButton>
      <SnapList
        role='region' // context for screen readers
        aria-label='my awesome snaplist' // for screen readers to read out loud on focus
        width='100%'
        height='100%'
        ref={snapListRef}
        direction='horizontal'
        disableScroll={variant !== 'scrollable'}
        {...snapListProps}
      >
        {children}
        <SnapItem snapAlign='start'>
          <Box ref={ref} />
        </SnapItem>
      </SnapList>
      <IconButton
        sx={{
          visibility: lastItemInview ? 'hidden' : 'visible'
        }}
        onClick={() => {
          if (lastItemInview) return

          // count - (selected * itemToSlice) < itemToSlice

          goToSnapItem(selectedIndex + itemToSlice)
        }}
      >
        <ChevronRightIcon pathProps={{ stroke: home.gray50 }} />
      </IconButton>
    </Box>
  )
}
