import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { SortableContext } from '@dnd-kit/sortable'
import { IDeckSelected } from '@/app/(main-routes)/project-home/_modules/domain'
import { SidebarDeckIR } from './sidebarDeckIR'
import { ARR_DECKS_HAS_MULTIPLE_PAGE } from '@/app/edit-ir/_modules/constants'

type IListDecksProps = {
  deckItemsSelected: IDeckSelected[]
  setDeckItemsSelected: (deckItems: IDeckSelected[]) => void
}

const ListDecks = ({ deckItemsSelected, setDeckItemsSelected }: IListDecksProps) => {
  const [deckIDSelected, setDeckIDSelected] = useState<number | null>(null)

  // Handle darg and drop title deck.
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

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={deckItemsSelected.map((item) => item.id)}>
          {!!deckItemsSelected.length &&
            deckItemsSelected.map((item, index) => {
              // Get the number of deck pages in the list ARR_DECKS_HAS_MULTIPLE_PAGE.
              const numberOfPages = ARR_DECKS_HAS_MULTIPLE_PAGE.find(
                (listItem) => listItem.id === item.id
              )?.numberOfPages

              return (
                <SidebarDeckIR
                  key={index}
                  deckItem={item}
                  numberOfPages={numberOfPages}
                  deckIDSelected={deckIDSelected}
                  setDeckIDSelected={setDeckIDSelected}
                />
              )
            })}
        </SortableContext>
      </DndContext>
    </Box>
  )
}

export default ListDecks
