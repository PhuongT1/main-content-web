import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Grid } from '@mui/material'
import Text from '../Text'
import { CONTENT_DESCRIPTION_SX, SUB_TITLE_SX } from '../../../utils/textStyles'
import { onChangeContentTitle, onChangeSubTitle } from '../../../utils/common'
import { useRecoilState } from 'recoil'
import { cardNewsData } from '@/atoms/home/card-news'

const Card8: React.FC<ICardProps> = ({ idx, data }) => {
  const [card, setCardNews] = useRecoilState(cardNewsData)
  const onSaveSubtitle = (newTitle: string, contentIdx: number) => {
    const newData = onChangeSubTitle({ data: card.data, idx, newTitle, contentIdx })
    setCardNews({
      ...card,
      data: newData
    })
  }

  const onSaveContent = (newTitle: string, contentIdx: number) => {
    setCardNews({
      ...card,
      data: onChangeContentTitle({ data: card.data, idx, newTitle, contentIdx })
    })
  }

  return (
    <Box component={'div'} className={styles.containerWrapper}>
      <Box component={'div'} className={styles.container} data-card-image='card-image'>
        <Grid container spacing={'20px'}>
          {data.subtitle.kr.slice(0, 4).map((subTitle, index) => (
            <Grid item xs={12} md={6} key={index} className={styles.cardWrapper}>
              <Text
                text={data.content.kr[index].title}
                props={{
                  variant: 'h3',
                  sx: CONTENT_DESCRIPTION_SX,
                  className: [styles.subTitle, styles['MuiTypography-root']].join(' ')
                }}
                onSave={(newTitle) => {
                  onSaveContent(newTitle, index)
                }}
              />
              <Text
                text={subTitle}
                props={{
                  variant: 'h3',
                  sx: SUB_TITLE_SX,
                  className: [styles.title, styles['MuiTypography-root']].join(' ')
                }}
                onSave={(newTitle) => onSaveSubtitle(newTitle, index)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Card8
