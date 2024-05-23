import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Grid, Stack, Divider, Typography, useTheme } from '@mui/material'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import IMarketingStrategiesSelectView from '@/components/cards/marketing-strategies-select-view'
import useToggle from '@/hooks/use-toggle'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  IFormValuesMarketingKpiList,
  IFormValuesMarketingGoals,
  IFormValuesMarketingStrategies,
  IFormValuesMarketingChannels
} from '@/types/advertisement-marketing.type'
import InputItem from '@/form/input'
import TextareaItem from '@/form/textarea'
import { formatCurrencyKorean } from '@/utils/format-currency'
import styles from './../../style.module.scss'

function Step_04_View() {
  const { palette } = useTheme()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const form = useFormContext<IFormValuesMarketingKpiList>()
  const { reset, getValues } = form

  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )
  const { data: dataStrategies } = useAdvertisementMarketingData<IFormValuesMarketingStrategies>(
    STEP.STEP_TWO,
    'data-advertisement-marketing-strategies'
  )
  const { data: dataChannels } = useAdvertisementMarketingData<IFormValuesMarketingChannels>(
    STEP.STEP_THREE,
    'data-advertisement-marketing-channels'
  )
  const { data: dataKpiList } = useAdvertisementMarketingData<IFormValuesMarketingKpiList>(
    STEP.STEP_FOUR,
    'data-advertisement-marketing-kpiList'
  )

  // =====
  useEffect(() => {
    dataKpiList?.data && reset(dataKpiList.data)
  }, [dataKpiList])

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_FOUR))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_FOUR))
    setActiveStep(STEP.STEP_FOUR)
  }

  const handleShowCurrency = (index: number): string => {
    const dataSelected = dataKpiList?.data?.data?.[index] || getValues(`data.${index}`)
    const currency = dataSelected?.budget?.toString()?.replace(/,/g, '')
    return currency
      ? formatCurrencyKorean(Number(currency), dataKpiList?.data?.unitCurrency)
      : `0${dataKpiList?.data?.unitCurrency}`
  }

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          마케팅 목표별 KPI
        </Box>
        <Grid spacing={2} container sx={{ padding: convertToRem(2) }}>
          {(dataGoals?.data?.selectedGoals || [])?.map((goal, index) => (
            <Grid item xs={4} key={index}>
              <IMarketingStrategiesSelectView
                url={goal?.url}
                name={goal?.name}
                subTitle='KPI 설정'
                item={[]}
                prevDataList={[
                  {
                    title: '마케팅 전략',
                    data:
                      dataStrategies?.data?.data?.[index]?.strategies
                        ?.filter(Boolean)
                        ?.map((strategy) => strategy?.name) ?? []
                  },
                  {
                    title: '홍보 채널',
                    data:
                      dataChannels?.data?.data?.[index]?.channels?.filter(Boolean)?.map((channel) => channel?.name) ??
                      []
                  }
                ]}
              >
                <Box display={'flex'} gap={convertToRem(10)} flexDirection={'column'} sx={{ pointerEvents: 'none' }}>
                  <InputItem
                    name={`data.${index}.title`}
                    sxInput={{ input: { padding: `${convertToRem(10)} !important` } }}
                    textFieldProps={{
                      InputProps: {
                        readOnly: true,
                        style: { backgroundColor: palette.home.gray200, color: palette.home.gray50 }
                      }
                    }}
                  />
                  <TextareaItem
                    name={`data.${index}.description`}
                    textFieldProps={{ inputProps: { readOnly: true }, multiline: true }}
                    sxInput={{
                      '.MuiInputBase-input': { padding: convertToRem(10) },
                      '.MuiInputBase-root': {
                        alignItems: 'initial',
                        minHeight: convertToRem(100),
                        background: palette.home.gray200
                      }
                    }}
                  />
                </Box>

                <Box sx={{ pointerEvents: 'none' }}>
                  <Divider sx={{ mt: convertToRem(10), mb: convertToRem(20), bgcolor: 'main_grey.gray800' }} />
                  <Typography fontWeight={600}>{'홍보마케팅 예산 배정'}</Typography>
                  <Box mt={convertToRem(10)} display={'flex'} gap={convertToRem(10)}>
                    <Box flex={'1'}>
                      <InputItem
                        name={`data.${index}.budget`}
                        textFieldProps={{
                          InputProps: {
                            readOnly: true,
                            style: { backgroundColor: palette.home.gray200, color: palette.home.gray50 }
                          }
                        }}
                        sxInput={{
                          input: {
                            padding: `${convertToRem(10)} !important`,
                            textOverflow: 'ellipsis'
                          }
                        }}
                      />
                    </Box>
                    <InputItem
                      name={`unitCurrency`}
                      textFieldProps={{
                        InputProps: {
                          readOnly: true,
                          style: { backgroundColor: palette.home.gray200, color: palette.home.gray50 }
                        }
                      }}
                      sxInput={{ input: { padding: `${convertToRem(10)} !important` } }}
                      sxBox={{
                        width: convertToRem(100),
                        '@media only screen and (max-width: 1440px)': { width: convertToRem(80) }
                      }}
                    />
                  </Box>
                  <Box mt={convertToRem(4)}>
                    <Typography fontSize={14} fontWeight={600} color={palette.home.gray100} whiteSpace={'nowrap'}>
                      {handleShowCurrency(index)}
                    </Typography>
                  </Box>
                </Box>
              </IMarketingStrategiesSelectView>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>

      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}

export default Step_04_View
