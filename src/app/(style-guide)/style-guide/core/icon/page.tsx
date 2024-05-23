'use client'
import { Typography } from '@/elements'
import { Box, Stack } from '@mui/material'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { SvgComponentProps } from '@/types/types.type'
import { DARK_ICONS, LIGHT_ICONS } from './list-icons'
import styles from './icon-style-guide.module.scss'

interface Icon {
  name: string
  component: React.ComponentType<SvgComponentProps>
}

const StyledIcon = styled.svg``

const IconStyleGuide = () => {
  const [darkIcons, setDarkIcons] = useState<Icon[]>([])
  const [lightIcons, setLightIcons] = useState<Icon[]>([])

  useEffect(() => {
    const importIcons = async (iconList: string[], setState: React.Dispatch<React.SetStateAction<Icon[]>>) => {
      const importedIcons = await Promise.all(
        iconList.map(async (iconName) => {
          const { default: IconComponent } = await import(`@/assets/icons/${iconName}`)
          return { name: iconName, component: IconComponent }
        })
      )
      setState(importedIcons)
    }

    Promise.all([importIcons(DARK_ICONS, setDarkIcons), importIcons(LIGHT_ICONS, setLightIcons)])
  }, [])

  return (
    <Stack flexDirection='column' gap='30px'>
      <Typography cate='large_title' plainColor='main.black'>
        Icons
      </Typography>
      <Stack flexDirection='row' flexWrap='wrap' gap='20px' alignItems='center' justifyContent='space-between'>
        {darkIcons.map(({ name, component: IconComponent }) => (
          <Box key={name} display='flex' flexDirection='column' alignItems='center' marginBottom='10px' gap='10px'>
            <StyledIcon as={IconComponent} />
            <Typography cate='body_1' plainColor='main.black'>
              {name}
            </Typography>
          </Box>
        ))}
      </Stack>
      <Stack
        flexDirection='row'
        flexWrap='wrap'
        gap='20px'
        alignItems='center'
        justifyContent='space-between'
        className={styles.lightBlock}
      >
        {lightIcons.map(({ name, component: IconComponent }) => (
          <Box key={name} display='flex' flexDirection='column' alignItems='center' marginBottom='10px' gap='10px'>
            <StyledIcon as={IconComponent} color='white' />
            <Typography cate='body_1' plainColor='main.white'>
              {name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}

export default IconStyleGuide
