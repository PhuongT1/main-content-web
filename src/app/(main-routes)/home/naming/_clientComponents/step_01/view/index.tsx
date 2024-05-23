import Box from '@mui/material/Box'
import React from 'react'
import { Typography } from '@/elements'
import InputItem from '@/form/input'
import { Grid, Stack, useTheme } from '@mui/material'
import styles from './view.module.scss'
import { Namingkeyword } from '@/types/naming.type'
import CardItem from '@/components/home/card-item'
import { EditButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useRecoilState } from 'recoil'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import { remConvert } from '@/utils/convert-to-rem'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { QUERY_KEY_KEYWORD } from '@/constants/naming.constant'
import { useGetValue, useNamingData } from '../../../hooks/use-naming'
import SectionTitle from '@/components/home/section-title'
import Divider from '@/elements/divider'
import InputElement from '@/form/input/inputElement'

const Step1View = () => {
  const {
    palette: { home }
  } = useTheme()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const { watch, control } = useFormContext<Namingkeyword>()
  const concept = watch('concept')

  const { data: namingKeywords } = useNamingData<Namingkeyword>(STEP.STEP_ONE, QUERY_KEY_KEYWORD)

  const {
    useLang: { dict },
    getValueIndustry,
    getValueConcept
  } = useGetValue()

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  const convertConcept = () => {
    const { title, subTitle } = getValueConcept(namingKeywords?.data.concept)

    return { title, subTitle }
  }

  return (
    <Box component={'form'}>
      <Divider
        customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px'), borderColor: home.gray200 }}
      />
      <SectionTitle title={dict.naming_step_1_concept_title} />
      <Grid container gap={'20px'}>
        <Grid item flex={`${remConvert('370px')} 0 0`}>
          <InputItem
            control={control}
            label={dict.naming_step_1_industrial}
            name={'industry'}
            renderInput={() => (
              <InputElement
                InputProps={{
                  readOnly: true
                }}
                value={getValueIndustry(namingKeywords?.data.industry) ?? ''}
              />
            )}
          />
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            control={control}
            label={dict.naming_step_1_idea}
            name={'idea'}
            textFieldProps={{
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
              InputProps: {
                readOnly: true
              }
            }}
          />
        </Grid>
      </Grid>
      <SectionTitle title={dict.naming_step_1_concept_title} />
      {concept && (
        <Grid container>
          <Grid item xs={3} md={3} sx={{ minWidth: remConvert('256px') }}>
            {namingKeywords?.data?.concept && (
              <CardItem cardItem={convertConcept()} sxCard={{ backgroundColor: home.gray300 }} />
            )}
          </Grid>
        </Grid>
      )}
      <SectionTitle title={dict?.naming_step_1_title} />
      <Box component={'div'} sx={{ backgroundColor: home.gray300 }} className={styles.business_idea}>
        <Grid
          container
          flexDirection={'row'}
          wrap='wrap'
          className={styles.category}
          spacing={['13px', '13px']}
          alignItems='stretch'
        >
          {namingKeywords?.data?.selectedItem?.map((item, index) => (
            <Grid item xs={3} md={3} key={index} alignItems='stretch' sx={{ minWidth: remConvert('269px') }}>
              <Box component={'div'} sx={{ backgroundColor: home.gray_bg_200 }} className={styles.item_buton}>
                <Box
                  component={'div'}
                  display={'flex'}
                  columnGap={'12px'}
                  flexWrap={'wrap'}
                  sx={{ wordBreak: 'break-word' }}
                >
                  <Typography color={home.gray50}>{item.name} </Typography>
                  <Typography color={home.blue500} className={styles.font_style_text}>
                    {item.affectTitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
    </Box>
  )
}
export default Step1View
