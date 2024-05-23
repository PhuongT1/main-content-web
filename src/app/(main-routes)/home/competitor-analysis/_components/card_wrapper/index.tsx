'use client'
import { Box } from '@mui/material'
import ScrollBar from 'react-perfect-scrollbar'
import { ICompetitiveCompaniesResponse } from '@/types/competitor-analysis.type'
import { CardItemDataAdd, CardItemData } from '@/components/cards/competitor-card'
import { convertToRem } from '@/utils/convert-to-rem'
import { optionAutoFillItems } from '@/utils/styles'

type CardWrapperProps = {
  handleClickCardItem: (item: ICompetitiveCompaniesResponse | undefined) => void
  handleClickCardItemAdd?: () => void
  selectedCompetitors: ICompetitiveCompaniesResponse[]
  data: ICompetitiveCompaniesResponse[]
  enableAddCardItem?: boolean
  fetchNextPage?: () => void
}

function CardWrapper({
  handleClickCardItem,
  handleClickCardItemAdd,
  selectedCompetitors,
  data,
  enableAddCardItem = false,
  fetchNextPage
}: CardWrapperProps) {
  return (
    <ScrollBar style={{ width: '100%', maxHeight: convertToRem(640) }} onYReachEnd={() => fetchNextPage?.()}>
      <Box sx={{ ...optionAutoFillItems({}) }}>
        {enableAddCardItem && (
          <Box>
            <CardItemDataAdd onClickCardItemDataAdd={handleClickCardItemAdd && handleClickCardItemAdd} />
          </Box>
        )}
        {data.map((item: ICompetitiveCompaniesResponse, index) => (
          <Box key={index}>
            <CardItemData
              onClickCardItemData={handleClickCardItem}
              selectedCompetitors={selectedCompetitors}
              item={item}
            />
          </Box>
        ))}
      </Box>
    </ScrollBar>
  )
}

export default CardWrapper
