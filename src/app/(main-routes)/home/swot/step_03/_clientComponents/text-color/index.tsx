import { Typography } from '@/elements'
import React from 'react'

type TText = 'W' | 'T' | 'S' | 'O'
type TTextProps = {
  textOne: TText
  textTwo: TText
}

const Color = {
  W: '#44BDBD',
  T: '#EA3939',
  S: '#3C82F9',
  O: '#F8BA1A'
}

const TextColor = ({ textOne, textTwo }: TTextProps) => {
  return (
    <>
      <Typography component='span' cate='body_3_semibold' sx={{ color: Color[textOne] }}>
        {textOne}
      </Typography>
      <Typography component='span' cate='body_3_semibold' sx={{ color: Color[textTwo] }}>
        {textTwo}
      </Typography>
    </>
  )
}

export default TextColor
