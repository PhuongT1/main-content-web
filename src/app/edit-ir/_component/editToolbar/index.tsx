'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { remConvert } from '@/utils/convert-to-rem'
import { getConfigsColors, getConfigsFonts, getConfigsIRDeckProject } from '@/services/edit-ir.service'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import ColorPaletteIcon from '@/assets/icons/color-palette'
import FontIcon from '@/assets/icons/font'
import LayoutIcon from '@/assets/icons/layout'
import MenuColor from './component/menuColor'
import MenuFont from './component/menuFont'
import MenuLayout from './component/menuLayout'

export interface IEditToolbarProps {
  projectID: number
}

enum EDIT_TOOL_TAB {
  COLOR = 'color',
  FONT = 'font',
  LAYOUT = 'layout'
}

const EDIT_TOOL_TAB_DATA = [
  {
    label: '색상', // Color.
    value: EDIT_TOOL_TAB.COLOR,
    icon: EDIT_TOOL_TAB.COLOR
  },
  {
    label: '폰트', // Font.
    value: EDIT_TOOL_TAB.FONT,
    icon: EDIT_TOOL_TAB.FONT
  },
  {
    label: '컨셉', // Layout
    value: EDIT_TOOL_TAB.LAYOUT,
    icon: EDIT_TOOL_TAB.LAYOUT
  }
]

const TABPANEL_DATA = [
  {
    index: EDIT_TOOL_TAB.COLOR
  },
  {
    index: EDIT_TOOL_TAB.FONT
  },
  {
    index: EDIT_TOOL_TAB.LAYOUT
  }
]

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: EDIT_TOOL_TAB
  value: EDIT_TOOL_TAB
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

const EditToolbar = ({ projectID }: IEditToolbarProps) => {
  const [currentTab, setCurrentTab] = useState(EDIT_TOOL_TAB.COLOR)
  const [, setIRPalette] = useRecoilState(iRPalette)

  // Get color of theme.
  const {
    palette: { home }
  } = useTheme()

  // Get configs colors.
  const { data: dataColor } = useQuery({
    queryKey: ['get-configs-colors'],
    queryFn: async () => await getConfigsColors()
  })

  // Get configs fonts.
  const { data: dataFont } = useQuery({
    queryKey: ['get-configs-fonts'],
    queryFn: async () => await getConfigsFonts()
  })

  // Get IR deck configs by project ID.
  const { data: dataIRDeckProject } = useQuery({
    queryKey: ['get-configs-IR-deck-project'],
    queryFn: async () => await getConfigsIRDeckProject(projectID)
  })

  // Get selected color, font, layout.
  useEffect(() => {
    dataIRDeckProject &&
      setIRPalette({
        primaryColorID: dataIRDeckProject.colorId,
        fontFamilyID: dataIRDeckProject.fontId,
        layoutSelected: dataIRDeckProject.layout
      })
  }, [dataIRDeckProject])

  const onChangeTab = (value: EDIT_TOOL_TAB) => {
    setCurrentTab(value)
  }

  const IconTab = ({ iconName, isActive }: { iconName: string; isActive: boolean }) => {
    switch (iconName) {
      case EDIT_TOOL_TAB.COLOR:
        return <ColorPaletteIcon pathProps={{ fill: isActive ? home.blue500 : home.gray100 }} />

      case EDIT_TOOL_TAB.FONT:
        return <FontIcon pathProps={{ fill: isActive ? home.blue500 : home.gray100 }} />

      case EDIT_TOOL_TAB.LAYOUT:
        return <LayoutIcon pathProps={{ fill: isActive ? home.blue500 : home.gray100 }} />

      default:
        break
    }
  }

  const ContentTabPanel = ({ index }: { index: EDIT_TOOL_TAB }) => {
    switch (index) {
      case EDIT_TOOL_TAB.COLOR:
        return <MenuColor dataColor={dataColor} />

      case EDIT_TOOL_TAB.FONT:
        return <MenuFont dataFont={dataFont} />

      case EDIT_TOOL_TAB.LAYOUT:
        return <MenuLayout />

      default:
        break
    }
  }

  return (
    <Box
      component={'div'}
      sx={{
        minWidth: remConvert('224px'),
        maxWidth: remConvert('300px'),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: remConvert('8px 0px 0px'),
        gap: remConvert('0px'),
        flex: '1 0 0',
        alignSelf: 'stretch',
        boxSizing: 'content-box',
        backgroundColor: home.gray600
      }}
    >
      <FilledTabStack
        value={currentTab}
        onChange={(_, e) => onChangeTab(e)}
        sx={{
          backgroundColor: 'transparent',
          width: '100%',
          height: `${remConvert('51px')} !important`,
          borderRadius: 0,
          padding: 0,
          '.MuiButtonBase-root': {
            height: '100%',
            padding: remConvert('12px 16px'),
            borderRadius: 0,
            '&.Mui-selected': {
              borderBottom: `2px solid ${home.blue500}`,
              '.MuiTypography-root': {
                color: home.blue500
              }
            },
            '.MuiTypography-root': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: remConvert('4px')
            }
          },
          '.MuiTabs-flexContainer': { width: '100%' },
          '.MuiTabs-indicator': { backgroundColor: 'transparent', borderRadius: 0 }
        }}
      >
        {EDIT_TOOL_TAB_DATA.map((item, index) => (
          <FillTabItem
            key={index}
            label={
              <>
                <IconTab iconName={item.icon} isActive={currentTab == item.value} />
                <Box component={'span'}>{item.label}</Box>
              </>
            }
            value={item.value}
            isSelected={item.value === currentTab}
            sx={{
              padding: remConvert('12px 16px'),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: remConvert('4px'),
              flex: '1 0 0',
              borderBottom: `1px solid ${home.gray200}`
            }}
          />
        ))}
      </FilledTabStack>

      <Box component={'div'} sx={{ width: '100%', padding: remConvert('20px 16px'), boxSizing: 'border-box' }}>
        {TABPANEL_DATA.map((item, index) => {
          return (
            <TabPanel key={index} value={currentTab} index={item.index}>
              <ContentTabPanel index={item.index} />
            </TabPanel>
          )
        })}
      </Box>
    </Box>
  )
}

export default EditToolbar
