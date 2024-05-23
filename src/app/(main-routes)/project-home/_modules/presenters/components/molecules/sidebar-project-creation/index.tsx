import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import Button from '@/elements/button'
import { SidebarDeckItem } from '..'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { IDeckSelected } from '../../../../domain'
import { useLanguage } from '@/hooks/use-language'

interface ISidebarProjectCreation {
  onCancel: () => void
  onSubmit: () => void
  setDeckItemsSelected: (deckItems: IDeckSelected[]) => void
  deckItemsSelected: IDeckSelected[]
}

export const SidebarProjectCreation = ({
  onCancel,
  onSubmit,
  setDeckItemsSelected,
  deckItemsSelected
}: ISidebarProjectCreation) => {
  const { palette } = useTheme()
  const { dict } = useLanguage()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const decksSorted = arrayMove(
        deckItemsSelected,
        deckItemsSelected.findIndex((item) => item.id === active.id),
        deckItemsSelected.findIndex((item) => item.id === over.id)
      )
      setDeckItemsSelected(decksSorted)
    }
  }

  const onDeleteDeck = (deckItem: IDeckSelected) => {
    const newList = deckItemsSelected.filter((deck: IDeckSelected) => deck.id !== deckItem.id)
    setDeckItemsSelected(newList)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={convertToRem(32)}
      width='100%'
      paddingX={convertToRem(20)}
      paddingY={convertToRem(40)}
    >
      <Typography cate='body_2_semibold' color={palette.home.gray50}>
        {dict.project_home_deck_list}
      </Typography>

      <Divider sx={{ backgroundColor: palette.home.gray300 }} />

      <Box>
        <Stack flexDirection='row' justifyContent='space-between'>
          <Stack flexDirection='row' gap={convertToRem(6)}>
            <Typography cate='body_2_semibold' color={palette.home.gray50}>
              {dict.project_home_total}
            </Typography>
            <Stack flexDirection='row'>
              <Typography cate='body_2_semibold' color={palette.home.mint500}>
                {deckItemsSelected.length}
              </Typography>
              <Typography cate='body_2_semibold' color={palette.home.gray50}>
                {dict.project_home_piece}
              </Typography>
            </Stack>
          </Stack>

          <Typography cate='caption_1_semibold' color={palette.home.gray100}>
            {dict.common_delete_all}
          </Typography>
        </Stack>

        <Box marginTop={convertToRem(10)}>
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={deckItemsSelected.map((item) => item.id)}>
              {!!deckItemsSelected.length ? (
                deckItemsSelected.map((item, index) => {
                  return <SidebarDeckItem key={index} deckItem={item} onDelete={onDeleteDeck} />
                })
              ) : (
                <Typography cate='body_3_semibold' color={palette.home.gray100}>
                  {dict.project_home_please_add_deck}
                </Typography>
              )}
            </SortableContext>
          </DndContext>
        </Box>
      </Box>

      {!!deckItemsSelected.length && (
        <Button
          title={dict.project_home_create_a_project}
          type='submit'
          onClick={onSubmit}
          cate='outlined'
          customSize={'sm'}
          sx={{
            fontWeight: 600,
            fontSize: convertToRem(18),
            color: palette.home.blue500,
            backgroundColor: 'rgba(60, 130, 249, 0.10)',
            borderColor: palette.home.blue500,
            paddingY: convertToRem(12),
            minHeight: convertToRem(48)
          }}
        />
      )}

      <Button
        title='돌아가기'
        onClick={onCancel}
        type='button'
        cate='contained'
        customSize={'sm'}
        sx={{
          fontWeight: 600,
          fontSize: convertToRem(18),
          color: palette.home.gray100,
          borderColor: palette.home.gray300,
          paddingY: convertToRem(12),
          minHeight: convertToRem(48)
        }}
      />
    </Box>
  )
}

export default SidebarProjectCreation
