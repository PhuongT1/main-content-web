import CardItem, { CardElementProps } from '@/components/home/card-item'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import Image from 'next/image'
import { FieldArrayitem, LiftStyle, TypeLiftStyle } from '@/types/customer-service.type'
import { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { errorMax3Message } from '@/constants/customer-service.constant'
import ErrorMessage from '@/form/ErrorMessage'
import { useQuery } from '@tanstack/react-query'
import { getLiftStyle } from '@/services/customer.service'

export interface CardLifestyleProps {
  type?: TypeLiftStyle
}

const CardLifestyle = ({ type = 'LIFT_STYLE' }: CardLifestyleProps) => {
  const { breakpoints } = useTheme()
  const { data } = useQuery({
    queryKey: ['card-lifestyle', type],
    queryFn: ({ queryKey: [, param] }) => getLiftStyle(param as TypeLiftStyle),
    meta: {
      offLoading: true
    }
  })

  const [isErrorMax, setErrorMax] = useState<Boolean>(false)
  const form = useFormContext<FieldArrayitem<LiftStyle>>()
  const {
    control,
    formState: { errors }
  } = form

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'selectList'
  })

  const handleAddCard = (card: LiftStyle) => {
    const index = fields.findIndex((item) => item.name === card.name && item.description === card.description)
    if (index > -1) remove(index)
    else {
      if (fields.length > 2) return overQuantity()
      append(card)
    }
  }

  const isActive = (card: LiftStyle) => {
    const index = fields.findIndex((item) => item.name === card.name && item.description === card.description)
    if (index > -1) return true
    return false
  }

  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 3000)
  }

  const convertTitle = (item: LiftStyle) =>
    ({
      title: item.name,
      subTitle: item.description,
      content: (
        <Box component={'div'}>
          <Image
            alt='user'
            src={(item.url as string) || ''}
            quality={100}
            width={132}
            height={165}
            style={{
              flexShrink: 0,
              borderRadius: remConvert('10px'),
              objectFit: 'cover',
              overflow: 'hidden',
              width: '100%',
              height: 'auto'
            }}
          />
        </Box>
      )
    } as CardElementProps)

  return (
    <>
      <Grid container display='flex' spacing={remConvert('12px')} alignItems='stretch' flexWrap={'wrap'}>
        {data?.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              alignItems='stretch'
              sx={{
                [breakpoints.up(1000)]: {
                  flex: '0 0 50%'
                },
                [breakpoints.up(1200)]: {
                  flex: '0 0 33.33%'
                },
                [breakpoints.up(1500)]: {
                  flex: '0 0 25%'
                },
                [breakpoints.up(1800)]: {
                  flex: '0 0 20%'
                }
              }}
            >
              <CardItem
                cardItem={convertTitle(item)}
                icon='checked'
                isActive={isActive(item)}
                sxContent={{
                  textAlign: 'center'
                }}
                onClick={() => handleAddCard(item)}
              />
            </Grid>
          )
        })}
      </Grid>
      {(isErrorMax || errors.selectList?.message) && (
        <Box component={'div'} sx={{ mb: remConvert('60px'), mt: remConvert('20px') }}>
          <ErrorMessage message={errors.selectList?.message || errorMax3Message(3)} />
        </Box>
      )}
    </>
  )
}

export default CardLifestyle
