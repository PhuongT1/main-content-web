import { Divider, Stack, Tab, Tabs, TabsProps, styled, useTheme } from '@mui/material'
import { useState } from 'react'
import { SORT_PROJECT_ENUM, SORT_PROJECT_OPTIONS } from '../../../../domain'
import { convertToRem } from '@/utils/convert-to-rem'
import React from 'react'

interface ITabSortExplorer {
  active: SORT_PROJECT_ENUM
  onChange?: (data: SORT_PROJECT_ENUM) => void
}

export const Wrap = styled(Tabs)<TabsProps>(({ theme }) => ({
  '.MuiTabs-indicator': {
    display: 'none'
  }
}))

export const TabSortExplorer = ({ active, onChange }: ITabSortExplorer) => {
  const { palette } = useTheme()
  const [value, setValue] = useState<SORT_PROJECT_ENUM>(active || SORT_PROJECT_ENUM.CREATED_AT)

  const handleChange = (data: SORT_PROJECT_ENUM) => {
    setValue(data)
    onChange?.(data)
  }

  return (
    <Wrap value={value} sx={{ minHeight: 'unset', marginInline: convertToRem(-12) }}>
      {SORT_PROJECT_OPTIONS.map((item, index) => (
        <Stack
          key={item.value}
          flexDirection='row'
          maxHeight={convertToRem(26)}
          alignItems='center'
          onClick={() => handleChange(item.value)}
        >
          <Tab
            value={item.value}
            label={item.label}
            sx={{
              height: '100%',
              minHeight: convertToRem(24),
              minWidth: 'unset',
              paddingX: convertToRem(12),
              paddingY: 0,
              color: `${value === item.value ? palette.main.white : palette.home.gray200}`,
              fontWeight: 600,
              opacity: 1
            }}
          />
          {index !== SORT_PROJECT_OPTIONS.length - 1 && (
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{ backgroundColor: palette.home.gray300, height: '70%', margin: 0, marginBlock: 'auto' }}
            />
          )}
        </Stack>
      ))}
    </Wrap>
  )
}

export default TabSortExplorer
