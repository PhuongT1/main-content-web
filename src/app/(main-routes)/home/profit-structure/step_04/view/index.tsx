import { useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, Divider, useTheme, Grid } from '@mui/material'
import { IFormValuesDiagramProfitStructure, IItemProfitGenerationStructure } from '@/types/profit-structure.type'
import { STEP } from '@/constants/common.constant'
import { EditButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import { convertToRem } from '@/utils/convert-to-rem'
import { dataDiagramProfitStructureSelector } from '@/atoms/home/profit-structure'
import { useProfitStructureData, useClickButtonEdit } from '../../use-profit-structure'
import { useGetDefaultValueProfitDiagram } from './../useValue'
import EditorFlow from './../_editor'
import styles from './../../style.module.scss'

function Step_04_View() {
  const { palette } = useTheme()
  const { reset } = useFormContext<IFormValuesDiagramProfitStructure>()
  const [, setDiagramsData] = useRecoilState(dataDiagramProfitStructureSelector)
  const { dataProfitDiagrams } = useGetDefaultValueProfitDiagram({
    defaultImageProps: { colorLine: palette.home.gray100, colorHeadText: palette.home.base_gray50 }
  })
  const { data } = useProfitStructureData<IFormValuesDiagramProfitStructure>(STEP.STEP_FOUR, 'data-profit-diagram')
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_FOUR)

  // =====
  const dataProfitDiagramInfo: IItemProfitGenerationStructure = useMemo(() => {
    if (!data?.data?.profitDiagram?.type) return {}
    return dataProfitDiagrams.find((diagram) => diagram?.id === data.data.profitDiagram.type?.id) || {}
  }, [data?.data?.profitDiagram])

  useEffect(() => {
    if (data?.data) {
      reset(data.data)
      // setDiagramsData(data.data?.profitDiagram || {})
    }
  }, [data?.data])

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', borderColor: palette.home.gray200 }} />

      <SectionTitle title='메인 수익구조' />
      <Grid container display='flex' wrap='wrap' spacing={convertToRem(12)} alignItems='stretch'>
        {data?.data?.profitStructures?.map((item, index) => (
          <Grid item md={4} key={index} alignItems='stretch' sx={{ pointerEvents: 'none' }}>
            <CardMarketingGoal isView item={item} sxBoxTitle={{ fontSize: convertToRem(20) }} />
          </Grid>
        ))}
      </Grid>

      <SectionTitle title='수익구조 도식화' />
      <Box position='relative' sx={{ pointerEvents: 'none' }}>
        {dataProfitDiagramInfo?.id && (
          <>
            <Box
              zIndex={1}
              position='absolute'
              top={convertToRem(20)}
              left={convertToRem(20)}
              bgcolor={palette.home.gray_bg_200}
              borderRadius={convertToRem(10)}
              padding={convertToRem('20px 16px')}
              maxWidth={convertToRem(340)}
            >
              <CardMarketingGoal
                isView
                item={dataProfitDiagramInfo}
                sxCard={{
                  backgroundColor: palette.home.gray_bg_200,
                  button: {
                    padding: 0,
                    flexDirection: 'row-reverse',
                    '.MuiBox-root': {
                      marginTop: 0,
                      backgroundColor: 'initial',
                      svg: { width: convertToRem(160), height: convertToRem(155), mr: convertToRem(16) },
                      '> .MuiBox-root': { padding: 0, span: { textOverflow: 'initial', display: 'inline-block' } }
                    }
                  }
                }}
              >
                <Box textAlign={'center'} p={convertToRem(16)}>
                  {dataProfitDiagramInfo?.image}
                </Box>
              </CardMarketingGoal>
            </Box>
            <EditorFlow type={dataProfitDiagramInfo.id as string} isView />
          </>
        )}
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}

export default Step_04_View
