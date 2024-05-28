import { iRPalette } from '@/atoms/home/stepper'
import { LayoutIRProps } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
// import { nanummyeongjo } from './font'
import { ENUM_LAYOUT } from '@/constants/common.constant'
import { useQuery } from '@tanstack/react-query'
import { getConfigsIRDeckProject } from '@/services/edit-ir.service'
import { useParams } from 'next/navigation'

export type ItemLayout = {
  layoutOne?: React.ReactNode
  layoutTwo?: React.ReactNode
  layoutThree?: React.ReactNode
}

export interface LayoutProps extends Partial<LayoutIRProps> {
  layout: ItemLayout
}

const LayoutIR = ({ sxContainer, layout }: LayoutProps) => {
  const [{ primaryColor, fontFamilyIR, layoutSelected }, setIRPalette] = useRecoilState(iRPalette)
  const params = useParams<{ projectId: string }>()

  // Get configs IR deck by project ID.
  const { data: dataIRDeckProject } = useQuery({
    queryKey: ['get-configs-IR-deck-project'],
    queryFn: async () => await getConfigsIRDeckProject(Number(params.projectId))
  })

  useEffect(() => {
    if (dataIRDeckProject) {
      // Apply edit IR configured.
      setIRPalette({
        primaryColor: dataIRDeckProject.color.colorValue,
        fontFamilyIR: dataIRDeckProject.font.fontName,
        layoutSelected: dataIRDeckProject.layout
      })

      // Add the src of the font configured.
      if (dataIRDeckProject.font) {
        const style = document.createElement('style')

        // Add fonts from API to style tag.
        style.innerHTML = `@font-face { font-family: '${dataIRDeckProject.font.fontName}'; src: url('${dataIRDeckProject.font.fontUrl}');}`

        document.head.appendChild(style)

        // Clean up function to remove the injected style tag when the component unmounts.
        return () => {
          document.head.removeChild(style)
        }
      }
    }
  }, [dataIRDeckProject])

  const getLayout = (layoutSelected?: ENUM_LAYOUT) => {
    switch (layoutSelected) {
      case ENUM_LAYOUT.ONE:
        return layout?.layoutOne
      case ENUM_LAYOUT.TWO:
        return layout?.layoutTwo
      case ENUM_LAYOUT.THREE:
        return layout?.layoutThree
      default:
        return (
          <>
            {layout?.layoutOne}
            {layout?.layoutTwo}
            {layout?.layoutThree}
          </>
        )
    }
  }

  return (
    <Box
      component={'div'}
      sx={{
        maxWidth: remConvert('1146px'),
        aspectRatio: 297 / 210,
        marginLeft: 'auto',
        marginRight: 'auto',
        '*': {
          fontFamily: fontFamilyIR ?? 'var(--font-pretendard)'
        },
        ...sxContainer
      }}
      // className={`${nanummyeongjo.variable}`}
    >
      {getLayout(ENUM_LAYOUT[layoutSelected!])}
    </Box>
  )
}

export default LayoutIR
