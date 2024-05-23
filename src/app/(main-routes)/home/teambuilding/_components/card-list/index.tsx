import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { UseFieldArrayRemove, UseFieldArraySwap } from 'react-hook-form'
import CardItem from './card-item'
import { TField, TFields } from '@/types/form.type'
import { TEducationAndExp } from '@/types/teambuilding/index.type'

type TCardListProps = {
  fields: TFields<TEducationAndExp>
  swap: UseFieldArraySwap
  remove: UseFieldArrayRemove
  setMessageError: Dispatch<SetStateAction<string>>
  message: string
}
function CardList({ message, setMessageError, swap, fields, remove }: TCardListProps) {
  // Trigger event when moving with distance 5px
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } })

  const sensors = useSensors(pointerSensor)

  const handleRemoveCardItem = (index: number) => {
    remove(index)
    if (message) {
      setMessageError('')
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // check if drag is outside area
    if (!over) return

    if (active.id !== over?.id) {
      const indexActive = fields.findIndex((field: TField<TEducationAndExp>) => field.id === active.id)
      const indexOver = fields.findIndex((field: TField<TEducationAndExp>) => field.id === over?.id)
      if (indexActive >= 0 && indexOver >= 0) {
        swap(indexActive, indexOver)
      }
    }
  }

  const items = useMemo(() => {
    return fields.map((item: TField<TEducationAndExp>, index: number) => {
      return item.id
    })
  }, [fields])
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {fields.map((field: any, index: number) => (
          <CardItem onDelete={handleRemoveCardItem} key={field._id} item={field} index={index} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default CardList
