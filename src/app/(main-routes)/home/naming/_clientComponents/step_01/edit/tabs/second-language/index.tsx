// 'use client'
import DeleteIcon from '@/assets/icons/delete'
import TransferIcon from '@/assets/icons/naming/transfer'
import InputItem from '@/form/input'
import { LanguageList, NamingTab, Namingkeyword, TranslatePapago } from '@/types/naming.type'
import { Box, IconButton, MenuItem, useTheme } from '@mui/material'
import { UseFieldArrayReturn, UseFormReturn, useFormContext } from 'react-hook-form'
import styles from './second-language.module.scss'
import SelectItem from '@/form/select'
import { useEffect, useState } from 'react'
import CheckboxIcon from '@/assets/icons/checkbox'
import CheckFilledIcon from '@/assets/icons/check-filled'
import { languageList } from './language'
import { remConvert } from '@/utils/convert-to-rem'
import { CandidateProps } from '../../../../_components/candidates'
import { translatePapago } from '@/services/naming.service'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/elements/loading'
import { useLanguage } from '@/hooks/use-language'

export interface SecondLanguageProps {
  form: UseFormReturn<Namingkeyword>
  fieldArray: UseFieldArrayReturn<Namingkeyword, 'selectedItem'>
}

const SecondLanguageTab = ({ fieldArray }: CandidateProps<Namingkeyword, 'selectedItem'>) => {
  const {
    palette: { home }
  } = useTheme()
  const { getValueLanguage, dict } = useLanguage()

  const [isActive, setActive] = useState<boolean>(false)
  const [paramSearch, setParamSearch] = useState<TranslatePapago>()

  const { control, getValues, watch, setValue } = useFormContext<Namingkeyword>()
  const { append, fields } = fieldArray

  // Watch field
  const text = watch('text')
  const sourceLang = watch('sourceLang')
  const targetLang = watch('targetLang')

  useEffect(() => {
    const search = setTimeout(() => {
      setParamSearch({
        sourceLang,
        targetLang,
        text
      })
    }, 200)

    return () => clearTimeout(search)
  }, [sourceLang, targetLang, text])

  const { data, isFetching } = useQuery({
    queryKey: ['naming-papago', paramSearch],
    queryFn: ({ queryKey: [, param] }) => translatePapago(param as TranslatePapago),
    enabled: !!paramSearch?.sourceLang && !!paramSearch?.targetLang && !!paramSearch?.text,
    meta: {
      offLoading: true
    }
  })

  useEffect(() => {
    data?.translatedText && setValue('resultKeyword', data?.translatedText)
  }, [data])

  const resetForm = () => {
    setValue('text', '')
    setValue('resultKeyword', '')
  }

  const handleAddItem = () => {
    const resultKeyword = getValues('resultKeyword')
    if (!text || !resultKeyword) return

    setActive(true)
    append({ name: text, affectTitle: resultKeyword } as NamingTab)
    setTimeout(() => {
      resetForm()
      setActive(false)
    }, 1000)
  }

  const disable = () => (fields.length > 9 ? true : false)

  return (
    <Box className={styles.translate_box} sx={{ pointerEvents: disable() ? 'none' : 'auto' }}>
      <Box
        component={'div'}
        className={styles.item_box}
        sx={{
          backgroundColor: home.gray300
        }}
      >
        <InputItem
          sxLabel={{ marginLeft: remConvert('-20px'), marginBottom: 0 }}
          control={control}
          label={
            <SelectItem
              sxBox={{ width: remConvert('203px') }}
              control={control}
              name={'sourceLang'}
              textFieldProps={{ placeholder: dict.naming_step_1_korean_text }}
              isNoneBorder
            >
              {languageList.map((val: LanguageList) => (
                <MenuItem key={val.code} value={val.code}>
                  {getValueLanguage(val, 'label')}
                </MenuItem>
              ))}
            </SelectItem>
          }
          name={'text'}
          textFieldProps={{
            placeholder: dict.naming_step_1_schumpeter_text,
            inputProps: {
              maxLength: 20
            },
            InputProps: {
              endAdornment: (
                <IconButton onClick={() => resetForm()}>
                  <DeleteIcon fill={home.gray400} stroke={home.gray50} />
                </IconButton>
              )
            },
            disabled: disable()
          }}
          maxLength={20}
        ></InputItem>
      </Box>
      <IconButton
        onClick={() => {
          setValue('sourceLang', targetLang)
          setValue('targetLang', sourceLang)
        }}
      >
        <TransferIcon fill={home.gray0} />
      </IconButton>

      <Box
        component={'div'}
        className={styles.item_box}
        sx={{
          backgroundColor: home.gray300
        }}
      >
        <Loading isLoading={isFetching}>
          <InputItem
            control={control}
            sxLabel={{ marginLeft: remConvert('-20px'), marginBottom: 0 }}
            label={
              <SelectItem
                sxBox={{ width: remConvert('203px') }}
                control={control}
                name={'targetLang'}
                textFieldProps={{ placeholder: dict.naming_step_1_english_text }}
                isNoneBorder
              >
                {languageList.map((val: LanguageList) => (
                  <MenuItem key={val.code} value={val.code}>
                    {getValueLanguage(val, 'label')}
                  </MenuItem>
                ))}
              </SelectItem>
            }
            name={'resultKeyword'}
            textFieldProps={{
              placeholder: dict.naming_step_1_schumpeter_text,
              InputProps: {
                endAdornment: (
                  <IconButton onClick={handleAddItem}>
                    {isActive ? <CheckFilledIcon /> : <CheckboxIcon pathProps={{ stroke: home.gray100 }} />}
                  </IconButton>
                )
              },
              disabled: disable()
            }}
          ></InputItem>
        </Loading>
      </Box>
    </Box>
  )
}

export default SecondLanguageTab
