'use client'
import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, useTheme } from '@mui/material'
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import { ButtonItem } from '@/components/home/button'
import styles from './step_01.module.scss'
import Alert from '@/elements/alert'
import CardSelectedBox from '../_clientComponents/card-selected'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import InputItem from '@/form/input'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import CardFactor from '../_clientComponents/card-factor'
import { Swot_Step1_Type } from '@/types/swot.type'
import { useSwot } from '../hooks/useSwot'
import { v4 as uuidv4 } from 'uuid'
import { Typography as CustomTypography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

interface Props {
  isView?: boolean
  strengthArray: UseFieldArrayReturn<Swot_Step1_Type, 'strengthArray'>
  weaknessArray: UseFieldArrayReturn<Swot_Step1_Type, 'weaknessArray'>
  opportunityArray: UseFieldArrayReturn<Swot_Step1_Type, 'opportunityArray'>
  threatArray: UseFieldArrayReturn<Swot_Step1_Type, 'threatArray'>
}

const MAX_ITEM_FACTOR = 3

const EnvironmentFactors: FC<Props> = ({
  strengthArray,
  weaknessArray,
  opportunityArray,
  threatArray,
  isView = false
}) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict, lang } = useLanguage()
  const {
    trigger,
    getValues,
    setValue,
    watch,
    control,
    resetField,
    formState: { errors }
  } = useFormContext<Swot_Step1_Type>()
  const [isError, setIsError] = useState(false)

  const [isShowInput, setShowInput] = useState<boolean>(false)
  const { data: strength, isLoading: isLoadingStrength } = useSwot(1)
  const { data: weakness, isLoading: isLoadingWeakness } = useSwot(2)
  const { data: opportunity, isLoading: isLoadingOpportunity } = useSwot(3)
  const { data: threat, isLoading: isLoadingThreat } = useSwot(4)

  const choosenSlogan = () => {
    if (isView) {
      return (
        <Grid container display='flex' spacing={2} alignItems='stretch'>
          <Grid item xs={3} md={3} alignItems='stretch'>
            <CardFactor
              form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
              formArray={strengthArray}
              title={dict.swot_strength}
              tag='Strength'
              isView
              data={strengthArray.fields || []}
              name='strengthArray'
              sx={{ paddingTop: 0 + '!important' }}
              isLoading={isLoadingStrength}
            />
          </Grid>
          <Grid item xs={3} md={3} alignItems='stretch'>
            <CardFactor
              form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
              formArray={weaknessArray}
              title={dict.swot_weakness}
              tag='Weakness'
              isView
              data={weaknessArray.fields || []}
              name='weaknessArray'
              sx={{ paddingTop: 0 + '!important' }}
              isLoading={isLoadingWeakness}
            />
          </Grid>
          <Grid item xs={3} md={3} alignItems='stretch'>
            <CardFactor
              form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
              formArray={opportunityArray}
              title={dict.swot_opportunity}
              tag='Opportunity'
              isView
              data={opportunityArray.fields || []}
              name='opportunityArray'
              sx={{ paddingTop: 0 + '!important' }}
              isLoading={isLoadingOpportunity}
            />
          </Grid>
          <Grid item xs={3} md={3} alignItems='stretch'>
            <CardFactor
              form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
              formArray={threatArray}
              title={dict.swot_threat}
              tag='Threat'
              isView
              data={threatArray.fields || []}
              name='threatArray'
              sx={{ paddingTop: 0 + '!important' }}
              isLoading={isLoadingThreat}
            />
          </Grid>
        </Grid>
      )
    }

    const handleAdd = (arr: any, id: any) => {
      if (!getValues(`keywordCustomize${id}` as any)) return

      arr.append({ nameKr: getValues(`keywordCustomize${id}` as any), uuid: uuidv4() } as any)
      setShowInput(false)
      resetField(`keywordCustomize${id}` as any)
    }

    return (
      <>
        <Box component={'div'} className={styles.list_slogan_AI_area}>
          <Grid container className={styles.paper_slogan_AI} display='flex' spacing={2} alignItems='stretch'>
            <Grid item xs={3} md={3} alignItems='stretch'>
              <CardFactor
                form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
                formArray={strengthArray}
                title={dict.swot_strength}
                tag='Strength'
                data={strength}
                name='strengthArray'
                setError={setIsError}
              />
            </Grid>
            <Grid item xs={3} md={3} alignItems='stretch'>
              <CardFactor
                form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
                formArray={weaknessArray}
                title={dict.swot_weakness}
                tag='Weakness'
                data={weakness}
                name='weaknessArray'
                setError={setIsError}
              />
            </Grid>
            <Grid item xs={3} md={3} alignItems='stretch'>
              <CardFactor
                form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
                formArray={opportunityArray}
                title={dict.swot_opportunity}
                tag='Opportunity'
                data={opportunity}
                name='opportunityArray'
                setError={setIsError}
              />
            </Grid>
            <Grid item xs={3} md={3} alignItems='stretch'>
              <CardFactor
                form={{ trigger, getValues, setValue, watch, control, resetField, formState: { errors } }}
                formArray={threatArray}
                title={dict.swot_threat}
                tag='Threat'
                data={threat}
                name='threatArray'
                setError={setIsError}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container alignItems='stretch' spacing={2}>
          {[strengthArray, weaknessArray, opportunityArray, threatArray].map((x: any, index: number) => (
            <Grid item xs={3} md={3} key={index}>
              <Box
                className={styles.selected_item_AI}
                sx={{ paddingX: '16px !important', paddingY: '20px !important', border: `1px solid ${home.gray200}` }}
              >
                <Box component={'div'} className={`${styles.child_layer_title}`}>
                  <Box component={'h2'} color={home.gray0}>
                    {dict.swot_select_text}
                  </Box>
                  <Box component={'p'} className={styles.card_note}>
                    {x.fields.length}
                    {dict.swot_select_unit}
                  </Box>
                </Box>
                <Box component={'div'} className={styles.btn_create} sx={{ border: `1px solid ${home.gray300}` }}>
                  {!isShowInput && (
                    <ButtonItem
                      disableRipple
                      fullWidth
                      disabled={x.fields.length === MAX_ITEM_FACTOR}
                      onClick={() => setShowInput(true)}
                      startIcon={
                        <Box component={'div'}>
                          <PlusOutlineIcon
                            pathProps={{
                              stroke: x.fields.length === MAX_ITEM_FACTOR ? home.gray200 : home.base_gray50
                            }}
                          />
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
                        {dict.swot_direct}
                      </CustomTypography>
                    </ButtonItem>
                  )}
                  {isShowInput && (
                    <ButtonItem
                      fullWidth
                      disableRipple
                      startIcon={
                        <Box component={'div'} onClick={() => handleAdd(x, index)}>
                          <PlusOutlineIcon
                            pathProps={{
                              stroke: x.fields.length === MAX_ITEM_FACTOR ? home.gray200 : home.base_gray50
                            }}
                          />
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
                          name={`keywordCustomize${index}` as any}
                          textFieldProps={{
                            required: true,
                            placeholder: '직접 입력',
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
                <Box className={styles['card-common']}>
                  {x?.fields?.map((item: any, index: number) => (
                    <CardSelectedBox
                      key={index}
                      label={lang === LANG.EN ? item.nameEn : item.name}
                      onRemove={() => x?.remove(index)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Alert
          key={`${isError}`}
          isOpen={isError}
          color='error'
          severity='error'
          variant='outlined'
          setIsError={setIsError}
        >
          <CustomTypography cate='body_3' plainColor='home.gray50'>
            {dict.swot_error_environmental}
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
            {dict.swot_environmental}
          </Box>
        </Box>
        {!isView && (
          <Typography className={styles.sub_title} color={home.gray100}>
            {dict.swot_environmental_des}
          </Typography>
        )}
      </Box>
      {choosenSlogan()}
    </Box>
  )
}
export default EnvironmentFactors
