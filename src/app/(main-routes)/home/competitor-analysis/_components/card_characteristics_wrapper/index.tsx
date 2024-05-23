'use client'
import { useState } from 'react'
import { Box } from '@mui/material'
import ScrollBar from 'react-perfect-scrollbar'
import { ICompetitiveCharacteristicsResponse } from '@/types/competitor-analysis.type'
import CardCharacteristicsItem from '@/components/cards/competitor-characteristics-card'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionAutoFillItems } from '@/utils/styles'
import ModalViewCharacteristics from '../modal_view_characteristics'

type CardCharacteristicsWrapperProps = {
  handleClickCardItem: (item: ICompetitiveCharacteristicsResponse) => void
  selectedCompetitors: ICompetitiveCharacteristicsResponse[]
  data: ICompetitiveCharacteristicsResponse[]
  fetchNextPage?: () => void
}

function CardCharacteristicsWrapper({
  handleClickCardItem,
  selectedCompetitors,
  data,
  fetchNextPage
}: CardCharacteristicsWrapperProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<ICompetitiveCharacteristicsResponse>()

  const handleClickOpenModal = (item: ICompetitiveCharacteristicsResponse) => {
    setSelectedItem(item)
    setIsOpenModal(true)
  }

  return (
    <>
      <ScrollBar style={{ width: '100%', maxHeight: convertToRem(600) }} onYReachEnd={() => fetchNextPage?.()}>
        <Box sx={{ ...optionAutoFillItems({ minWidth: 200, mediaQuery: 1560 }) }}>
          {data.map((item: ICompetitiveCharacteristicsResponse, index) => (
            <Box key={index}>
              <CardCharacteristicsItem
                onClickCardItemData={handleClickCardItem}
                selectedCompetitors={selectedCompetitors}
                item={item}
                onClickOpenModal={handleClickOpenModal}
              />
            </Box>
          ))}
        </Box>
      </ScrollBar>

      {selectedItem && (
        <ModalViewCharacteristics isOpen={isOpenModal} setIsOpen={() => setIsOpenModal(false)} data={selectedItem} />
      )}
    </>
  )
}

export default CardCharacteristicsWrapper
