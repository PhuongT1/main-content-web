import { iRPalette } from '@/atoms/home/stepper'
import { LayoutIRProps } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { nanummyeongjo } from './font'
import { useQuery } from '@tanstack/react-query'
import { getConfigsIRDeckProject } from '@/services/edit-ir.service'
import { useParams } from 'next/navigation'

export type ItemPageLayout = {
  pageLayoutOne?: React.ReactNode
  pageLayoutTwo?: React.ReactNode
}

enum ENUM_PAGE_LAYOUT {
  ONE = 1,
  TWO = 2
}

export interface LayoutProps extends Partial<LayoutIRProps> {
  pageLayout: ItemPageLayout
}

const LayoutIR = ({ sxContainer, pageLayout }: LayoutProps) => {
  const [{ primaryColor, fontFamilyIR, layoutSelected, pageSelected }, setIRPalette] = useRecoilState(iRPalette)
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
        // pageSelected: dataIRDeckProject.
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

  const getLayout = (pageSelected?: ENUM_PAGE_LAYOUT) => {
    switch (pageSelected) {
      case ENUM_PAGE_LAYOUT.ONE:
        return pageLayout?.pageLayoutOne
      case ENUM_PAGE_LAYOUT.TWO:
        return pageLayout?.pageLayoutTwo
      default:
        return (
          <>
            {pageLayout?.pageLayoutOne}
            {pageLayout?.pageLayoutTwo}
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
      className={`${nanummyeongjo.variable}`}
    >
      <Box component={'div'} sx={{ display: 'flex', gap: remConvert('4px') }}>
        {getLayout()}
      </Box>
    </Box>
  )
}

export default LayoutIR
