import CardItem, { CardElementProps } from '@/components/home/card-item'
import { remConvert } from '@/utils/convert-to-rem'
import { Grid, useTheme } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'
import SliderItem from '@/form/slider/index'
import { CustomerPurchasing, Purchasing } from '@/types/customer-service.type'

export interface CardSliderProps {
  name?: keyof Pick<CustomerPurchasing, 'channelInfluence' | 'purchaseMethod'>
}

const CardSlider = ({ name = 'purchaseMethod' }: CardSliderProps) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<CustomerPurchasing>()
  const { control } = form

  const { fields } = useFieldArray({
    control,
    name
  })

  const convertTitle = (item: Purchasing, indexField: number) =>
    ({
      title: item.title,
      subTitle: item.subTitle,
      content: (
        <SliderItem
          control={control}
          sliderProps={{
            min: 1,
            max: 5,
            step: 1
          }}
          name={`${name}.${indexField}.point`}
        />
      )
    } as CardElementProps)

  return (
    <>
      <Grid container display='flex' spacing={remConvert('20px')} alignItems='stretch' flexWrap={'wrap'}>
        {fields?.map((item, index) => {
          return (
            <Grid item key={index} alignItems='stretch' sm={4}>
              <CardItem
                cardItem={convertTitle(item, index)}
                icon='checked'
                sxCard={{
                  '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'transparent'
                  },
                  button: {
                    backgroundColor: home.gray400,
                    padding: remConvert('20px 40px')
                  }
                }}
                sxContent={{
                  textAlign: 'center',
                  backgroundColor: 'initial',
                  padding: remConvert('30px 10px 0')
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default CardSlider
