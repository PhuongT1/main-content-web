import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box } from '@mui/material'
import Text from '../Text'
import { useRecoilState } from 'recoil'
import { cardNewsData } from '@/atoms/home/card-news'
import { onChangeSubTitle, onChangeTitle } from '../../../utils/common'
import { SUB_TITLE_SX, TOP_TITLE_SX } from '../../../utils/textStyles'

const Card7: React.FC<ICardProps> = ({ idx, data }) => {
  const [card, setCardNews] = useRecoilState(cardNewsData)
  const onSaveSubtitle = (newTitle: string) => {
    const newData = onChangeSubTitle({ data: card.data, idx, newTitle })
    setCardNews({
      ...card,
      data: newData
    })
  }

  return (
    <Box component={'div'} className={styles.containerWrapper}>
      <Box component={'div'} className={styles.container} data-card-image='card-image'>
        <Text
          text={data.title.kr}
          props={{
            variant: 'h2',
            sx: TOP_TITLE_SX,
            className: styles.title
          }}
          onSave={(newTitle: string) =>
            setCardNews({
              ...card,
              data: onChangeTitle({ data: card.data, idx, newTitle })
            })
          }
        />

        <Text
          text={data.subtitle.kr[0]}
          props={{
            variant: 'h3',
            sx: SUB_TITLE_SX,
            className: styles.subTitle
          }}
          onSave={onSaveSubtitle}
        />
      </Box>
    </Box>
  )
}

export default Card7
