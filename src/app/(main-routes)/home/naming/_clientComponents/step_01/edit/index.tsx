import { Grid, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './edit.module.scss'
import React, { SyntheticEvent, useState } from 'react'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import SecondLanguageTab from './tabs/second-language'
import LocationTab from './tabs/location'
import NonSelect from './tabs/non-select'
import SchumpeterAI from './tabs/schumpeterAI'
import SelectItem from '@/form/select'
import InputItem from '@/form/input'
import { CartItemNamingProps, NamingTab, Namingkeyword } from '@/types/naming.type'
import CardItem, { CardElementProps } from '@/components/home/card-item'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import ErrorMessage from '@/form/ErrorMessage'
import { useFieldArray, useFormContext } from 'react-hook-form'
import CandidateList from '../../_components/candidates'
import { TAB_VALUE, dataCart } from '../../step-data'
import { CATEGORY_API, PARENT_CATEGORY } from '@/constants/naming.constant'
import TipItem from '@/components/home/tip-item'
import TabPanel from '@/elements/tab-panel'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { errorMaxMessage } from '..'
import SectionTitle from '@/components/home/section-title'
import { ModalReset } from '@/components/dialog/modal-deck'
import { useGetValue, useNamingPostData } from '@home/naming/hooks/use-naming'

const Step1Edit = () => {
  const {
    palette: { home }
  } = useTheme()

  const {
    useLang: { dict, getValueLanguage, getFieldLanguage },
    useIndustry: { data },
    getValueConcept
  } = useGetValue()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [isErrorMax, setErrorMax] = useState<Boolean>(false)

  const form = useFormContext<Namingkeyword>()
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = form
  const concept = watch('concept')
  const activeTab = watch('activeTab')

  const fieldArray = useFieldArray({
    control,
    name: 'selectedItem'
  })

  const { mutation } = useNamingPostData<Namingkeyword>(STEP.STEP_ONE)

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => setValue('activeTab', newValue)
  const handleCompleteStep = (data: Namingkeyword) => mutation(data)
  const convertTitle = (item: CartItemNamingProps) =>
    ({
      title: item.title,
      subTitle: item.subTitle,
      content: (
        <>
          <Box component={'div'} sx={{ fontWeight: 600, fontSize: convertToRem(16) }}>
            {item.content.header}
            <Box
              component={'span'}
              sx={{
                color: home.blue500,
                lineHeight: convertToRem(21),
                fontSize: convertToRem(14),
                marginLeft: convertToRem(5),
                display: 'inline-block'
              }}
            >
              {item.content.headerBlue}
            </Box>
          </Box>
          <Typography style={{ color: home.gray100, lineHeight: convertToRem(21), marginTop: convertToRem(5.5) }}>
            {item.content.main}
          </Typography>
        </>
      )
    } as CardElementProps)

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset({}, { keepDefaultValues: true })
  }

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 4000)
  }

  return (
    <Box
      component={'form'}
      sx={{ marginTop: convertToRem(52) }}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompleteStep)}
    >
      <SectionTitle title={dict.naming_step_1_business_title} subtitle={dict.naming_step_1_business_sub_title} />
      <Grid container gap={'20px'} sx={{ marginBottom: convertToRem(60) }}>
        <Grid item flex={`${remConvert('375px')} 0 0`}>
          <SelectItem
            showErrorMessage
            textFieldProps={{ required: true, placeholder: dict.common_select }}
            control={control}
            label={dict.naming_step_1_industrial}
            name={'industry'}
          >
            {data?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {getValueLanguage(item)}
              </MenuItem>
            ))}
          </SelectItem>
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            showErrorMessage
            maxLength={50}
            control={control}
            label={dict.naming_step_1_idea}
            name={'idea'}
            textFieldProps={{
              required: true,
              placeholder: dict.naming_step_1_idea_placeholder
            }}
          />
        </Grid>
      </Grid>
      <SectionTitle title={dict.naming_step_1_concept_title} subtitle={dict.naming_step_1_concept_sub_title} />
      <Grid
        container
        className={styles.layer_card_item}
        display='flex'
        spacing={remConvert('12px')}
        alignItems='stretch'
        flexWrap={'wrap'}
      >
        {Object.keys(dataCart).map((key_item, index) => {
          const itemCard = getValueConcept(key_item)
          if (!itemCard) return <></>
          return (
            <Grid
              item
              xs={3}
              md={3}
              key={index}
              className={`${styles.grid_item}`}
              alignItems='stretch'
              sx={{ minWidth: remConvert('268') }}
            >
              <CardItem
                cardItem={convertTitle(itemCard!)}
                icon='checked'
                isActive={concept === key_item}
                sxContent={{
                  padding: remConvert('10px'),
                  textAlign: 'center'
                }}
                onClick={() => {
                  setValue('concept', key_item, { shouldValidate: true })
                }}
              />
            </Grid>
          )
        })}
      </Grid>
      <Box component={'div'} sx={{ margin: remConvert('24px 0 60px') }}>
        <TipItem content={<>{dict.naming_step_1_tip_content}</>} />
      </Box>
      <SectionTitle
        title={dict?.naming_step_1_title}
        uptoTitle={`(${dict.naming_step_1_keyword_upto})`}
        subtitle={dict?.naming_step_1_keyword_sub_title}
      />
      <FilledTabStack
        value={activeTab ?? false}
        onChange={handleChangeTab}
        sx={{
          backgroundColor: home.gray400,
          color: home.gray50,
          maxHeight: remConvert('64px'),
          padding: convertToRem('12px 24px'),
          '.MuiButtonBase-root': {
            '&.Mui-selected': {
              backgroundColor: home.blue500,
              span: {
                color: home.base_white
              },
              'svg path': {
                fill: home.base_white
              }
            }
          },
          '.MuiTabs-flexContainer': { gap: convertToRem(12) },
          '.MuiTabs-indicator': { backgroundColor: home.blue500 }
        }}
        variant='scrollable'
        aria-label='Tab for keyword naming'
      >
        {TAB_VALUE(home.gray50).map(({ name }, index) => (
          <FillTabItem
            label={
              <Box
                component={'span'}
                className={styles.tab_title}
                sx={{
                  color: home.gray50,
                  fontWeight: 600
                }}
              >
                {name}
              </Box>
            }
            value={index}
            key={index}
            sx={{ padding: remConvert('6px 20px') }}
          />
        ))}
      </FilledTabStack>
      {activeTab === undefined ? (
        <NonSelect />
      ) : (
        <Box component={'div'} className={styles.layer_translate} sx={{ backgroundColor: home.gray400 }}>
          <TabPanel index={0} value={Number(activeTab)}>
            <SecondLanguageTab fieldArray={fieldArray} />
          </TabPanel>
          {CATEGORY_API.map((key, index) => {
            return (
              <TabPanel key={index} index={index + 1} value={Number(activeTab)}>
                <LocationTab
                  fieldArray={fieldArray}
                  type={key.name as keyof typeof PARENT_CATEGORY}
                  placeholder={key.placeholder}
                  index={index}
                  overQuantity={overQuantity}
                />
              </TabPanel>
            )
          })}
          <TabPanel index={5} value={Number(activeTab)}>
            <SchumpeterAI fieldArray={fieldArray} overQuantity={overQuantity} />
          </TabPanel>
        </Box>
      )}
      <CandidateList fieldArray={fieldArray} />
      {(isErrorMax || errors.selectedItem?.message) && (
        <Box component={'div'} sx={{ mb: remConvert('60px'), mt: remConvert('-30px') }}>
          <ErrorMessage message={errors.selectedItem?.message || errorMaxMessage} />
        </Box>
      )}
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_active}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={!isValid} />
      </Stack>
    </Box>
  )
}

export default Step1Edit
