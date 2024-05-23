import DeleteIcon from '@/assets/icons/delete'
import { Box, Grid, Typography, IconButton, useTheme } from '@mui/material'
import styles from './candidates.module.scss'
import { ArrayPath, FieldArray, UseFieldArrayReturn, useFormContext } from 'react-hook-form'
import { FieldArrayitem, NamingTab } from '@/types/naming.type'
import { ButtonItem } from '@/components/home/button'
import InputItem from '@/form/input'
import { useState } from 'react'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import { remConvert } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import { Divider } from '@/elements'

export interface CandidateProps<T extends FieldArrayitem, K extends ArrayPath<T>> {
  fieldArray: UseFieldArrayReturn<T, K>
  setActiveCardList?: React.Dispatch<React.SetStateAction<NamingTab[]>>
}

const CandidateList = <T extends FieldArrayitem, K extends ArrayPath<T>>({ fieldArray }: CandidateProps<T, K>) => {
  const { fields, remove, append } = fieldArray
  const { control, getValues, resetField } = useFormContext<FieldArrayitem>()
  const [isShowInput, setShowInput] = useState<boolean>(false)
  const { dict } = useLanguage()

  const {
    palette: { home }
  } = useTheme()

  const disable = () => (fields.length > 9 ? true : false)

  const handleAdd = () => {
    const { keywordCustomize, resultKeywordCustomize } = getValues()
    if (!keywordCustomize || !resultKeywordCustomize) return

    append({ name: keywordCustomize, affectTitle: resultKeywordCustomize } as FieldArray<T, K>)
    setShowInput(false)
    resetField('keywordCustomize')
    resetField('resultKeywordCustomize')
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <Box component={'div'} sx={{ borderColor: home.gray200 }} className={styles.business_idea}>
      <Box component={'div'} className={styles.layer_title}>
        <Box component={'p'} color={home.gray50} fontWeight={600}>
          {dict.common_deck_selected_item}
          <Box component={'span'} style={{ display: 'inline-block', marginLeft: remConvert('15px'), color: '#00C7BE' }}>
            {fields.length}
            {dict.common_deck_items}
          </Box>
        </Box>
      </Box>
      <Grid
        container
        flexDirection={'row'}
        wrap='wrap'
        className={styles.category}
        spacing={['13px', '13px']}
        alignItems='stretch'
      >
        <Grid item xs={3} md={3}>
          <Box component={'div'} className={styles.btn_create} sx={{ border: `1px solid ${home.gray300}` }}>
            {!isShowInput && (
              <ButtonItem
                disableRipple
                fullWidth
                disabled={disable()}
                startIcon={
                  <Box component={'div'} onClick={() => setShowInput(true)}>
                    <PlusOutlineIcon pathProps={{ stroke: disable() ? home.gray200 : home.gray50 }} rectProps={{ fill: home.gray300 }} />
                  </Box>
                }
                sx={{
                  height: '100%',
                  minWidth: 'auto',
                  gap: remConvert('8px'),
                  paddingTop: remConvert('12px'),
                  paddingBottom: remConvert('12px'),
                  backgroundColor: home.gray400,
                  '&.Mui-disabled': {
                    backgroundColor: home.gray400,
                    span: {
                      color: home.gray200
                    }
                  },
                  '&:hover': {
                    backgroundColor: home.gray400,
                  }
                }}
              >
                <Box component={'span'} color={home.gray50}>{dict.common_deck_direct_input}</Box>
              </ButtonItem>
            )}
            {isShowInput && (
              <ButtonItem
                fullWidth
                disableRipple
                disabled={disable()}
                startIcon={
                  <Box component={'div'} onClick={handleAdd}>
                    <PlusOutlineIcon pathProps={{ stroke: disable() ? home.gray200 : home.gray50 }} rectProps={{ fill: home.gray300 }} />
                  </Box>
                }
                sx={{
                  height: '100%',
                  minWidth: 'auto',
                  padding: remConvert('6px 15px'),
                  backgroundColor: home.gray400,
                  '&.Mui-disabled': {
                    backgroundColor: home.gray400
                  },
                  '&:hover': {
                    backgroundColor: home.gray400,
                  }
                }}
              >
                <Box component={'span'} display={'flex'} gap={remConvert('5px')}>
                  <InputItem
                    control={control}
                    name={'keywordCustomize'}
                    maxLength={20}
                    textFieldProps={{
                      required: true,
                      placeholder: dict.common_deck_direct_input,
                      disabled: disable(),
                      InputProps: {
                        style: {
                          height: 42,
                          maxHeight: 'none',
                          backgroundColor: home.gray400,
                          color: home.gray50
                        }
                      }
                    }}
                    sxBox={{
                      'fieldset': {
                        display: 'none',
                      }
                    }}
                  />
                  <Divider cate='vertical' sx={{ margin: remConvert('10px 0'), borderColor: home.gray200 }} />
                  <InputItem
                    control={control}
                    name={'resultKeywordCustomize'}
                    maxLength={20}
                    textFieldProps={{
                      required: true,
                      placeholder: dict.common_deck_english_input,
                      disabled: disable(),
                      inputProps: {
                        maxLength: 20
                      },
                      InputProps: {
                        style: {
                          height: 42,
                          maxHeight: 'none',
                          backgroundColor: home.gray400,
                          color: home.blue500
                        }
                      }
                    }}
                    sxBox={{
                      'fieldset': {
                        display: 'none',
                      }
                    }}
                  />
                </Box>
              </ButtonItem>
            )}
          </Box>
        </Grid>
        {fields?.map((item: any, index) => (
          <Grid item xs={3} md={3} key={item.id} alignItems='stretch'>
            <Box component={'div'} className={styles.item_buton} sx={{backgroundColor: home.gray400}}>
              <Box
                component={'div'}
                display={'inline-flex'}
                columnGap={remConvert('12px')}
                flexWrap={'wrap'}
                textOverflow={'ellipsis'}
                sx={{ wordBreak: 'break-word' }}
              >
                <Typography color={home.gray50}>{item.name}</Typography>
                <Typography color={'#3C82F9'}>{item.affectTitle}</Typography>
              </Box>
              <IconButton onClick={() => handleRemove(index)}>
                <DeleteIcon stroke={home.gray0 } fill={home.gray300} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CandidateList
