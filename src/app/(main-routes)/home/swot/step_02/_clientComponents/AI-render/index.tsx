import LoadingAI from '@/elements/loadingAI'
import Box from '@mui/material/Box'
import styles from './ai-render.module.scss'
import { ButtonItem, CreateButton } from '@/components/home/button'
import useTheme from '@mui/material/styles/useTheme'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { remConvert } from '@/utils/convert-to-rem'
import CardSelectedBox from '../../../_clientComponents/card-selected'
import { useState } from 'react'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import InputItem from '@/form/input'
import { useForm } from 'react-hook-form'
import ScrollBar from 'react-perfect-scrollbar'
import { useLanguage } from '@/hooks/use-language'

const MAX_ITEM_FACTOR = 5

type TFactorBoxProps = {
  dataSloganGPT: any
  isPending: boolean
  disabled?: boolean
  onCreate: () => void
  title?: string
  subTitle: string
  formArray: any
  isView: boolean
}

const AIRender = ({
  dataSloganGPT,
  disabled,
  onCreate,
  title = '슘페터AI SWOT 분석',
  subTitle,
  isPending,
  formArray,
  isView
}: TFactorBoxProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  //NEXT_PUBLIC_API_URL=http://3.39.161.162/api

  const [isShowInput, setShowInput] = useState<boolean>(false)

  const form = useForm<any>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {}
  })

  const { control, getValues, resetField } = form

  const handleAdd = () => {
    const keyword = getValues('keywordCustomize')
    if (!keyword) return

    formArray.append(keyword)
    setShowInput(false)
    resetField('keywordCustomize')
  }

  const isMax = dataSloganGPT?.length === MAX_ITEM_FACTOR

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: !dataSloganGPT?.length ? '100%' : 'auto',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <LoadingAI isLoading={isPending}>
        <Box className={styles.slogan_AI_area}>
          {!dataSloganGPT?.length ? (
            <Box className={styles.default}>
              <Typography cate='subtitle_1_semibold' sx={{ marginBottom: convertToRem(12), color: home.gray50 }}>
                {dict.swot_schupeter_AI || title}
              </Typography>
              <Typography cate='body_30' sx={{ marginBottom: convertToRem(20), color: home.gray100 }}>
                {subTitle}
              </Typography>
              <Box>
                <CreateButton disabled={disabled} onClick={onCreate} />
              </Box>
            </Box>
          ) : (
            <>
              {!isView && !isMax && (
                <Box className={styles.btn_create} sx={{ marginTop: convertToRem(20) }}>
                  {!isShowInput && (
                    <ButtonItem
                      disableRipple
                      fullWidth
                      disabled={isMax}
                      onClick={() => setShowInput(true)}
                      startIcon={
                        <Box>
                          <PlusOutlineIcon rectProps={{ fill: home.gray200 }} pathProps={{ stroke: home.gray50 }} />
                        </Box>
                      }
                      sx={{
                        height: '100%',
                        minWidth: 'auto',
                        gap: remConvert('8px'),
                        paddingTop: remConvert('12px'),
                        paddingBottom: remConvert('12px'),
                        background: home.gray300,
                        color: home.gray100,
                        '&.Mui-disabled': {
                          background: home.gray300,
                          span: {
                            color: home.gray200
                          }
                        }
                      }}
                    >
                      <Box component={'span'}>{dict.swot_enter_keyword}</Box>
                    </ButtonItem>
                  )}
                  {isShowInput && (
                    <ButtonItem
                      fullWidth
                      disableRipple
                      startIcon={
                        <Box onClick={() => handleAdd()}>
                          <PlusOutlineIcon rectProps={{ fill: home.gray200 }} pathProps={{ stroke: home.gray50 }} />
                        </Box>
                      }
                      sx={{
                        height: '100%',
                        minWidth: 'auto',
                        padding: remConvert('6px 15px'),
                        background: home.gray300,
                        color: home.gray100,
                        '&.Mui-disabled': {
                          background: home.gray400
                        }
                      }}
                    >
                      <Box component={'span'} display={'flex'} gap={remConvert('5px')}>
                        <InputItem
                          control={control}
                          name={'keywordCustomize'}
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
              )}

              <ScrollBar
                style={{
                  maxHeight: convertToRem(320),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: convertToRem(10),
                  marginTop: convertToRem(10)
                }}
              >
                {dataSloganGPT?.map((item: any, index: number) => (
                  <CardSelectedBox
                    sx={{ background: isView ? home.gray200 : home.gray300 }}
                    key={index}
                    label={item}
                    onRemove={() => formArray?.remove(index)}
                    isView={isView}
                  />
                ))}
              </ScrollBar>
            </>
          )}
        </Box>
      </LoadingAI>
    </Box>
  )
}

export default AIRender
