'use client'
import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { Grid, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Slogan_Step1_Type, Slogan_Step2_Type } from '@/types/slogan.type'
import { PlusButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import CardSelectedBox from '../_component/card-selected'
import InputItem from '@/form/input'
import styles from './step_02.module.scss'

interface Props {
  addSlogan: () => void
  dataStep1: Slogan_Step1_Type
}

const AddSlogan: FC<Props> = ({ addSlogan, dataStep1 }) => {
  const {
    palette: { home }
  } = useTheme()

  const { control } = useFormContext<Slogan_Step2_Type>()

  return (
    <>
      <Box className={styles.selected_item_AI}>
        <Grid container className={styles.layer_card_item} display='flex' spacing={2} alignItems='stretch'>
          {dataStep1?.referenceSlogan?.map((item, index) => (
            <Grid item xs={6} md={6} key={index} alignItems='stretch'>
              <CardSelectedBox label={item.kr} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid container gap={'20px'}>
        <Grid item flex={'1 0 0'}>
          <InputItem
            name='addSlogan'
            control={control}
            showErrorMessage
            maxLength={50}
            textFieldProps={{
              placeholder: '슬로건을 작성해주세요.'
            }}
            sxInput={{
              '& .MuiInputBase-root': {
                padding: '4px',
                backgroundColor: home.gray400,
                borderRadius: remConvert('10px')
              },
              fieldset: {
                borderColor: home.gray200
              }
            }}
          />
        </Grid>
        <Grid item>
          <PlusButton
            sx={{
              padding: remConvert('16px 18px'),
              minWidth: remConvert('120px'),
              border: `1px solid ${home.gray200}`
            }}
            onClick={() => addSlogan()}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default AddSlogan
