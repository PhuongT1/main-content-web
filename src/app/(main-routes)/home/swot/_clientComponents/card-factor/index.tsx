'use client'
import Box from '@mui/material/Box'
import CardCheckBox from '@/components/home/card-checkbox'
import { SxProps, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import CardSelectedBox from '../../_clientComponents/card-selected'
import styles from './card-factor.module.scss'
import ScrollBar from 'react-perfect-scrollbar'
import { convertToRem } from '@/utils/styles'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

type TTypeFactor = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat'
type TCardFactorProps = {
  data: any
  formArray: any
  form: any
  title: string
  tag: TTypeFactor
  isView?: boolean
  name: string
  setError?: (value: any) => void
  sx?: SxProps
  isLoading?: boolean
}

const MAX_ITEM_FACTOR = 3

const CardFactor = ({
  data,
  formArray,
  form,
  title,
  tag,
  isView = false,
  name,
  setError,
  sx,
  isLoading
}: TCardFactorProps) => {
  const { lang, getValueLanguage } = useLanguage()

  const { append, remove, fields } = formArray || {}
  const { getValues, watch } = form || {}

  const {
    palette: { home }
  } = useTheme()

  if (!data?.length) return null

  return (
    <Box className={styles['card-factor']} sx={{ background: isView ? home.gray300 : home.gray400 }}>
      <Box className={styles['header-title']} sx={{ background: isView ? home.gray300 : home.gray400 }}>
        <Typography component='span' cate='sub_title_20' plainColor='home.gray50'>
          {title}
        </Typography>
        <Typography component='span' cate='body_3_medium' className={styles[tag]}>
          {tag}
        </Typography>
      </Box>
      <Box className={styles['line']} sx={{ background: home.gray200 }}></Box>
      <ScrollBar style={{ width: '100%', maxHeight: convertToRem(420) }}>
        <Box className={styles['list-card']} sx={{ paddingX: 2, ...sx }}>
          {data?.map((item: any, index: any) => {
            if (isView) {
              return (
                <CardSelectedBox
                  key={index}
                  label={getValueLanguage(item, 'name') as any}
                  onRemove={() => remove(index)}
                  isView
                  sx={{ background: home.gray200 }}
                />
              )
            }
            return (
              <CardCheckBox
                key={index}
                icon='checked'
                sxCard={{ height: '100%', width: '100%', backgroundColor: home.gray300 }}
                isActive={watch(name)
                  ?.map((tem: any) => tem.uuid)
                  ?.includes(item.uuid)}
                onClick={() => {
                  const dataReferenceSlogan = getValues(name)
                  if (dataReferenceSlogan?.map((tem: any) => tem.uuid)?.includes(item.uuid)) {
                    remove(dataReferenceSlogan.findIndex((data: any) => data.uuid === item.uuid))
                  } else if (fields.length < MAX_ITEM_FACTOR) {
                    append(item)
                  } else {
                    setError?.(true)
                  }
                }}
                cardItem={{ title: lang === LANG.EN ? item.nameEn : item.nameKr }}
              ></CardCheckBox>
            )
          })}
        </Box>
      </ScrollBar>
    </Box>
  )
}

export default CardFactor
