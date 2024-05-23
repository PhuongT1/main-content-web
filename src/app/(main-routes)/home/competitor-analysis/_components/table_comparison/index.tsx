import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Box } from '@mui/material'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import {
  dataCompanyAnalyzingStep1,
  dataCompanyAnalyzingStep2,
  dataCompanyAnalyzingStep3
} from '@/atoms/home/competitor-analysis'
import { IFormValuesStepThree } from '@/types/competitor-analysis.type'
import ErrorMessage from '@/form/ErrorMessage'
import { convertToRem } from '@/utils/convert-to-rem'
import { MAXLENGTH_INPUT, FIELD_TYPE } from '../utils'
import TableDrag from '../table_drag'
import ModalAddDifferent from '../modal_add_difference'

interface ITableComparison {
  form: UseFormReturn<IFormValuesStepThree>
}

function TableComparison({ form }: ITableComparison) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [dataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [dataStep2] = useRecoilState(dataCompanyAnalyzingStep2)
  const [dataStep3] = useRecoilState(dataCompanyAnalyzingStep3)

  const { control } = form
  const fieldArray = useFieldArray<IFormValuesStepThree>({ control, name: 'rowList' })
  const { fields, append, remove } = fieldArray

  // =====
  const selectedCompetitor = useMemo(() => {
    return [dataStep1?.myCompany, ...(dataStep1?.selectedCompetitors || [])]?.filter(Boolean) || []
  }, [dataStep1])

  useEffect(() => {
    if (dataStep3?.rowList && dataStep3.rowList?.length > 0) return
    if (selectedCompetitor?.length > 0) {
      const [defaultValueTargetCustomer, defaultValueCharacteristics] = selectedCompetitor?.reduce(
        (acc: [Record<string, string[]>, Record<string, string[]>], competitor, index) => {
          const keyName = competitor?.name ?? ''
          const dataCharacteristics: any = dataStep2?.data?.[index] ?? {}
          if (keyName) {
            acc[0][keyName] = [dataCharacteristics?.age, dataCharacteristics?.gender, dataCharacteristics?.job]
            acc[1][keyName] = dataCharacteristics?.differentCharacteristics?.map((char: any) => char?.name)
          }
          return acc
        },
        [{}, {}]
      )

      // add default values
      append([
        { type: FIELD_TYPE.TARGET_CUSTOMER, name: '타깃고객', data: defaultValueTargetCustomer },
        { type: FIELD_TYPE.DIFFERENT_CHARACTERISTICS, name: '차별화특성', data: defaultValueCharacteristics }
      ])
    }
  }, [selectedCompetitor, dataStep3])

  const handleDeleteRow = (index: number) => {
    setMessageAlert('')
    remove(index)
  }

  const handleAddDifference = async () => {
    if (fields?.length < MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS) {
      setIsOpenModal(true)
    } else {
      setMessageAlert(`비교항목은 최대 ${MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS}개까지 추가 가능합니다.`)
    }
  }

  const handleConfirmAddDifference = (type: string) => {
    setIsOpenModal(false)

    const name =
      type === FIELD_TYPE.SELECT_STRUCTURE ? '수익구조' : type === FIELD_TYPE.SELECT_PROMOTION ? '홍보마케팅' : ''
    const data = selectedCompetitor?.reduce((acc: Record<string, string>, competitor) => {
      if (competitor?.name) acc[competitor.name] = ''
      return acc
    }, {})

    append({ type, name, data })
  }

  // =====
  return (
    <>
      <TableDrag
        fieldArray={fieldArray}
        form={form}
        data={fields}
        headers={selectedCompetitor?.map((item) => item?.name || '') ?? []}
        onDelete={handleDeleteRow}
        onAddDifference={handleAddDifference}
      />

      <ModalAddDifferent
        isOpen={isOpenModal}
        setIsOpen={() => setIsOpenModal(false)}
        onConfirm={handleConfirmAddDifference}
      />

      {messageAlert && (
        <Box sx={{ marginTop: convertToRem(20) }}>
          <ErrorMessage message={messageAlert} />
        </Box>
      )}
    </>
  )
}

export default TableComparison
