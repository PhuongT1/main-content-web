'use client'
import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, useTheme } from '@mui/material'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import { ButtonItem } from '@/components/home/button'
import styles from './step_01.module.scss'
import Alert from '@/elements/alert'
import CardSelectedBox from '../_clientComponents/card-selected'
import CardCheckBox from '@/components/home/card-checkbox'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import InputItem from '@/form/input'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import CustomTypography from '@/elements/typography'
import { Swot_Step1_Type } from '@/types/swot.type'
import { DERIVATION_OF_BUSINESS_OBJECTIVES } from '../constants'
import { v4 as uuidv4 } from 'uuid'
import ScrollBar from 'react-perfect-scrollbar'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  formArray: UseFieldArrayReturn<Swot_Step1_Type, 'derivationOfBusinessObjectives'>
  isView?: boolean
}

const MAX_ITEM_DERIVATION_SWOT = 3

const BusinessObjectives: FC<Props> = ({ formArray: { remove, fields, append }, isView = false }) => {
  const { dict, getValueLanguage } = useLanguage()

  const {
    palette: { home }
  } = useTheme()

  const {
    getValues,
    watch,
    control,
    resetField,
    formState: { errors }
  } = useFormContext<Swot_Step1_Type>()

  const dataSloganGPT = DERIVATION_OF_BUSINESS_OBJECTIVES

  const [isShowInput, setShowInput] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const choosenSlogan = () => {
    if (isView) {
      return (
        <Box className={styles.layer_card_item} sx={{ background: home.gray300 }}>
          {fields?.map((item, index) => (
            <CardSelectedBox
              key={index}
              tag={getValueLanguage(item, 'tag')}
              label={getValueLanguage(item, 'title') as any}
              onRemove={() => remove(index)}
              isView
              sx={{
                background: home.gray200
              }}
            />
          ))}
        </Box>
      )
    }

    const disable = fields.length === MAX_ITEM_DERIVATION_SWOT

    const handleAdd = () => {
      const { keywordCustomize, resultKeywordCustomize } = getValues() as any
      if (!keywordCustomize || !resultKeywordCustomize) return

      append({ tag: keywordCustomize, title: resultKeywordCustomize, uuid: uuidv4() } as any)
      setShowInput(false)
      resetField('keywordCustomize' as any)
      resetField('resultKeywordCustomize' as any)
    }

    return (
      <>
        <Box className={styles.list_slogan_AI_area} sx={{ background: home.gray400, borderRadius: convertToRem(10) }}>
          <ScrollBar style={{ maxHeight: convertToRem(390), overflow: 'hidden' }} className={styles['wrapper-list']}>
            <Grid container className={styles.paper_slogan_AI} display='flex' spacing={2} alignItems='stretch'>
              {dataSloganGPT?.map((item, index) => (
                <Grid item xs={6} md={6} key={index} className={`${styles.grid_item}`} alignItems='stretch'>
                  <CardCheckBox
                    isHaveHover
                    nowrap
                    maxWidth={300}
                    icon='checked'
                    sxCard={{ height: '100%', backgroundColor: home.gray300 }}
                    isActive={watch('derivationOfBusinessObjectives')
                      ?.map((item) => getValueLanguage(item, 'tag'))
                      ?.includes(getValueLanguage(item, 'tag'))}
                    onClick={() => {
                      const dataReferenceSlogan = getValues('derivationOfBusinessObjectives')
                      if (
                        dataReferenceSlogan
                          ?.map((item) => getValueLanguage(item, 'tag'))
                          ?.includes(getValueLanguage(item, 'tag'))
                      ) {
                        remove(
                          dataReferenceSlogan.findIndex(
                            (data) => getValueLanguage(data, 'tag') === getValueLanguage(item, 'tag')
                          )
                        )
                      } else if (fields.length < MAX_ITEM_DERIVATION_SWOT) {
                        append(item)
                      } else {
                        setIsError(true)
                      }
                    }}
                    cardItem={{ title: getValueLanguage(item, 'title') }}
                  >
                    <Box sx={{ background: home.blue500 }} className={styles.card_tag}>
                      <CustomTypography
                        cate='body_3_semibold'
                        sx={{
                          color: home.base_gray50,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {getValueLanguage(item, 'tag')}
                      </CustomTypography>
                    </Box>
                  </CardCheckBox>
                </Grid>
              ))}
            </Grid>
          </ScrollBar>
        </Box>
        <Box className={styles.selected_item_AI} sx={{ border: `1px solid ${home.gray200}` }}>
          <Box component={'div'} className={`${styles.child_layer_title}`}>
            <Box component={'h2'} color={home.gray50}>
              {dict.swot_select_text}
            </Box>
            <Box component={'p'} className={styles.card_note}>
              {fields.length}
              {dict.swot_select_unit}
            </Box>
          </Box>
          <Grid container spacing={2} alignItems='stretch'>
            <Grid item xs={6} md={6} className={`${styles.grid_item}`} alignItems='stretch'>
              <Box component={'div'} className={styles.btn_create} sx={{ border: `1px solid ${home.gray300}` }}>
                {!isShowInput && (
                  <ButtonItem
                    disableRipple
                    fullWidth
                    disabled={disable}
                    onClick={() => setShowInput(true)}
                    startIcon={
                      <Box component={'div'}>
                        <PlusOutlineIcon pathProps={{ stroke: disable ? home.gray200 : home.base_gray50 }} />
                      </Box>
                    }
                    sx={{
                      height: '100%',
                      minWidth: 'auto',
                      gap: remConvert('8px'),
                      paddingTop: remConvert('12px'),
                      paddingBottom: remConvert('12px'),
                      justifyContent: 'start',
                      background: home.gray400,
                      '&.Mui-disabled': {
                        background: home.gray400,
                        span: {
                          color: home.gray200
                        }
                      }
                    }}
                  >
                    <CustomTypography cate='body_3_semibold' plainColor='home.gray100'>
                      {dict.swot_enter_keyword}
                    </CustomTypography>
                  </ButtonItem>
                )}
                {isShowInput && (
                  <ButtonItem
                    fullWidth
                    disableRipple
                    disabled={disable}
                    startIcon={
                      <Box component={'div'} onClick={handleAdd}>
                        <PlusOutlineIcon pathProps={{ stroke: disable ? home.gray200 : home.base_gray50 }} />
                      </Box>
                    }
                    sx={{
                      height: '100%',
                      minWidth: 'auto',
                      padding: remConvert('6px 15px'),
                      background: home.gray400,
                      '&.Mui-disabled': {
                        background: home.gray400
                      }
                    }}
                  >
                    <Box component={'span'} display={'flex'} gap={remConvert('5px')}>
                      <InputItem
                        control={control}
                        name={'keywordCustomize' as any}
                        textFieldProps={{
                          required: true,
                          placeholder: '직접 입력',
                          disabled: disable,
                          inputProps: {
                            maxLength: 10
                          },
                          InputProps: {
                            style: {
                              height: 42,
                              maxHeight: 'none',
                              backgroundColor: home.blue500,
                              color: home.base_gray50
                            }
                          }
                        }}
                      />
                      <InputItem
                        control={control}
                        name={'resultKeywordCustomize' as any}
                        textFieldProps={{
                          required: true,
                          placeholder: '직접 입력',
                          disabled: disable || !watch('keywordCustomize' as any),
                          inputProps: {
                            maxLength: 20
                          },
                          InputProps: {
                            style: {
                              height: 42,
                              maxHeight: 'none'
                            }
                          }
                        }}
                      />
                    </Box>
                  </ButtonItem>
                )}
              </Box>
            </Grid>
            <Grid item xs={6} md={6} className={`${styles.grid_item}`} alignItems='stretch'></Grid>
          </Grid>
          <Grid container display='flex' spacing={2} alignItems='stretch'>
            {fields?.map((item: any, index) => (
              <Grid item xs={6} md={6} key={index} alignItems='stretch'>
                <CardSelectedBox
                  tag={getValueLanguage(item, 'tag')}
                  label={getValueLanguage(item, 'title') as any}
                  onRemove={() => remove(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Alert
          key={`${isError}`}
          isOpen={isError}
          color='error'
          severity='error'
          variant='outlined'
          setIsError={setIsError}
        >
          <CustomTypography cate='body_3' plainColor='home.gray50'>
            {dict.swot_error_goals}
          </CustomTypography>
        </Alert>
      </>
    )
  }

  return (
    <Box component={'div'} className={styles.part_area} sx={{ gap: convertToRem(24) }}>
      <Box component={'div'}>
        <Box component={'div'} className={`${styles.layer_title}`}>
          <Box component={'h2'} color={home.gray50}>
            {dict.swot_derive}
          </Box>
          {!isView && (
            <Box component={'p'} className={styles.card_note}>
              ({dict.swot_select})
            </Box>
          )}
        </Box>
        {!isView && (
          <Typography sx={{ color: home.gray100 }} className={styles.sub_title}>
            {dict.swot_business_goal}
          </Typography>
        )}
      </Box>
      {choosenSlogan()}
    </Box>
  )
}
export default BusinessObjectives
