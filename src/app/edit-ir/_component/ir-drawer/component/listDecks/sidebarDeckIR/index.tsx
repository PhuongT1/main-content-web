'use client'
import React, { useState } from 'react'
import { Typography } from '@/elements'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Stack, useTheme } from '@mui/material'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useSortable } from '@dnd-kit/sortable'
import { ProjectDeckItem } from '@/app/(main-routes)/project-home/_modules/domain'
import { useIREditContext } from '@/app/edit-ir/utils/provider'
import * as S from './style'
import Drag from '@/assets/icons/drag'
import FolderOpenIcon from '@/assets/icons/folder-open'
import FileIcon from '@/assets/icons/file'

interface ISidebarDeckIR {
  deckItem: ProjectDeckItem
  numberOfPages?: number
  deckIDSelected?: number | null | undefined
  setDeckIDSelected: (id: number | null) => void
}

export const SidebarDeckIR = ({ deckItem, numberOfPages, deckIDSelected, setDeckIDSelected }: ISidebarDeckIR) => {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, isDragging } = useSortable({
    id: (deckItem?.id || '') as string
  })

  const { deckSelected, setDeckSelected } = useIREditContext()

  return (
    <S.SidebarDeckIR
      ref={setNodeRef}
      width={'100%'}
      flexDirection='column'
      justifyContent='center'
      alignItems='flex-start'
      borderRadius={convertToRem(10)}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1
      }}
      {...attributes}
    >
      <Accordion
        sx={{
          width: remConvert('241px'),
          '&.Mui-expanded': {
            backgroundColor: `${home.alpha_blue_10}`
          }
        }}
        expanded={deckItem.id == deckSelected.id}
        onClick={() => {
          // setDeckIDSelected(deckItem.id)
          setDeckSelected(deckItem)
        }}
      >
        <AccordionSummary
          sx={{
            width: '100%',
            padding: remConvert('12px 8px'),
            borderRadius: remConvert('8px'),
            cursor: 'pointer',
            '.MuiAccordionSummary-content': {
              margin: `${remConvert('0px')}`
            },
            '.MuiAccordionSummary-content.Mui-expanded': {
              margin: `${remConvert('0px')}`
            },
            '&.Mui-expanded': {
              backgroundColor: `${home.alpha_blue_10}`
            },
            '&.MuiButtonBase-root': {
              minHeight: remConvert('48px')
            },
            '&:hover': {
              backgroundColor: home.alpha_blue_10
            }
          }}
        >
          <Stack flexDirection='row' gap={convertToRem(8)} alignItems='center'>
            <S.DragIcon ref={setActivatorNodeRef} {...listeners}>
              <Drag color={home.gray100} />
            </S.DragIcon>

            {numberOfPages ? (
              <FolderOpenIcon pathProps={{ fill: home.blue500 }} pathProps2={{ fill: home.blue100 }} />
            ) : (
              <FileIcon pathProps={{ fill: home.gray100 }} pathProps2={{ fill: home.gray200 }} />
            )}

            <Typography
              cate='body_3_semibold'
              color={deckItem.id == deckSelected.id ? home.blue600 : home.gray50}
              lines={1}
            >
              {deckItem.name}
            </Typography>
          </Stack>
        </AccordionSummary>

        {/* The list page of deck, if the deck has many pages. */}
        {numberOfPages && (
          <AccordionDetails>
            {Array.from({ length: numberOfPages }).map((_, index) => (
              <Stack
                key={index}
                sx={{
                  padding: remConvert('12px 8px 12px 15px'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: convertToRem(8),
                  borderRadius: remConvert('8px'),
                  cursor: 'pointer'
                }}
              >
                <S.DragIcon ref={setActivatorNodeRef} {...listeners}>
                  <Drag color={home.gray100} />
                </S.DragIcon>

                <Typography cate='body_3_semibold' sx={{ color: home.gray100 }} lines={1}>
                  {deckItem.name} {index + 1}
                </Typography>
              </Stack>
            ))}
          </AccordionDetails>
        )}
      </Accordion>
    </S.SidebarDeckIR>
  )
}
