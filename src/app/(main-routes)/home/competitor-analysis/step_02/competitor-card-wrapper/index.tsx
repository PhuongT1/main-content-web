import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { UseFormReturn } from 'react-hook-form'
import { Box, SxProps } from '@mui/material'
import { optionAutoFillItems } from '@/utils/styles'
import { ICompetitiveCompaniesResponse, IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { dataCompanyAnalyzingStep1 } from '@/atoms/home/competitor-analysis'
import CardInputCheckbox from './../../_components/card_input_checkbox'
import CardInputSelect from './../../_components/card_input_select'
import CompetitorAnalysisWrapper from './../../step_02/competitor-analysis-wrapper'

interface ICardAnalysisInfoWrapper {
  form: UseFormReturn<IFormValuesStepTwo>
  sxCard?: SxProps
  type?: 'SELECT' | 'CHECKBOX'
  onChangeHeightCardWrapper?: (number: number) => void
}
function CompetitorAnalyzingCardWrapper({ form, sxCard, type = 'SELECT' }: ICardAnalysisInfoWrapper) {
  const [dataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [activeCard, setActiveCard] = useState<number>(-1)
  const [activeInput, setActiveInput] = useState<number>(-1)
  const { getValues, setValue, watch } = form
  const selectedCompetitors = watch(`data.${activeCard}.differentCharacteristics`)?.filter(Boolean)

  const onSelectCard = (index: number) => {
    setActiveCard(index)
  }
  const otherCompanyInfoProps = {
    form,
    activeCard
  }

  const handleClickIconInputCheckbox = (indexCard: number, indexInput: number) => {
    if (indexCard !== activeCard) return

    const selectedId = getValues(`data.${activeCard}.differentCharacteristics.${indexInput}.id`)
    if (selectedId && selectedCompetitors?.some((com) => com?.id === selectedId)) {
      setValue(`data.${activeCard}.differentCharacteristics.${indexInput}`, undefined as any)
    }

    setActiveInput(indexInput)
  }

  return (
    <>
      <Box
        position='relative'
        sx={{ ...optionAutoFillItems({ minWidth: 168, maxColumn: 5, mediaQuery: 1400 }), ...sxCard }}
      >
        {[dataStep1?.myCompany, ...(dataStep1?.selectedCompetitors || [])]
          .filter(Boolean)
          .map((item: ICompetitiveCompaniesResponse | undefined, index: number) => (
            <Box key={item?.name}>
              {type === 'SELECT' && (
                <CardInputSelect
                  {...otherCompanyInfoProps}
                  item={item as ICompetitiveCompaniesResponse}
                  index={index}
                  setActiveCard={() => onSelectCard(index)}
                  isHighlight={Boolean(index === 0)}
                />
              )}
              {type === 'CHECKBOX' && (
                <CardInputCheckbox
                  {...otherCompanyInfoProps}
                  item={item as ICompetitiveCompaniesResponse}
                  index={index}
                  setActiveCard={() => onSelectCard(index)}
                  onClickInputIcon={handleClickIconInputCheckbox}
                  isHighlight={Boolean(index === 0)}
                />
              )}
            </Box>
          ))}
      </Box>

      {type === 'CHECKBOX' && activeCard >= 0 && (
        <CompetitorAnalysisWrapper
          form={form}
          indexCard={activeCard}
          indexInput={activeInput}
          setActiveInput={setActiveInput}
        />
      )}
    </>
  )
}

export default CompetitorAnalyzingCardWrapper
