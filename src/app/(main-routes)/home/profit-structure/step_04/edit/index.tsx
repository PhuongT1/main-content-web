'use client'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesDiagramProfitStructure } from '@/types/profit-structure.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalReset } from '@/components/dialog/modal-deck'
import { STEP } from '@/constants/common.constant'
import { dataDiagramProfitStructureSelector } from '@/atoms/home/profit-structure'
import { useProfitStructurePostData } from '../../use-profit-structure'
import useToggle from '@/hooks/use-toggle'
import Title from '@/components/title'
import TipItem from '@/components/home/tip-item'
import ProfitStructures from './../_profit-structures'
import ProfitDiagrams from './../_profit-diagrams'
import { DATA_TIP_PROFIT_DIAGRAM } from './../../data'
import styles from './../../style.module.scss'

function Step_04_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesDiagramProfitStructure>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, formState } = form
  const [diagramsData, setDiagramData] = useRecoilState(dataDiagramProfitStructureSelector)

  const { mutation } = useProfitStructurePostData<IFormValuesDiagramProfitStructure>(STEP.STEP_FOUR, {
    keyListRefetchQuery: ['data-profit-diagram'],
    removeIdList: []
  })

  const onlyDataDiagram = diagramsData?.nodes?.map((node) => node?.data) || []
  const isValidDiagram = useMemo(() => {
    return onlyDataDiagram.length > 0 && onlyDataDiagram.every((data) => !!data?.name)
  }, [JSON.stringify(onlyDataDiagram)])

  // =====
  const handleResetForm = () => {
    const defaultValue = { profitStructures: [], profitDiagram: { type: {}, nodes: [], edges: [] } }
    reset(defaultValue)
    setToggleShowDialog(false)
    setDiagramData(defaultValue.profitDiagram)
  }

  const onSubmit = handleSubmit((data: IFormValuesDiagramProfitStructure) => {
    const newData = {
      ...data,
      profitDiagram: { type: data.profitDiagram?.type, edges: diagramsData?.edges, nodes: diagramsData?.nodes }
    }
    mutation(newData)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: remConvert('52px') }}>
        <Title label='메인 수익구조' subLabel='타깃고객이 구매 결정에 미치는 영향력 정도를 평가해 보세요.' />
        <ProfitStructures />
      </Box>

      <Box sx={{ marginTop: remConvert('60px') }}>
        <Title label='수익구조 도식화' subLabel='타깃고객이 구매 결정에 미치는 영향력 정도를 평가해 보세요.' />
        <ProfitDiagrams />
        <TipItem
          containerSx={{ paddingY: remConvert('12px'), mt: remConvert('20px') }}
          content={DATA_TIP_PROFIT_DIAGRAM}
        />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid || !isValidDiagram} />
      </Stack>
    </Box>
  )
}

export default Step_04_Edit
