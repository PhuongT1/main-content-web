import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box } from '@mui/material'
import Text from '../Text'
import { CONTENT_DESCRIPTION_SX, SUB_TITLE_SX, TOP_TITLE_SX } from '../../../utils/textStyles'
import { useRecoilState } from 'recoil'
import { cardNewsData } from '@/atoms/home/card-news'
import { onChangeContentTitle, onChangeSubTitle, onChangeTitle } from '../../../utils/common'

const Card11: React.FC<ICardProps> = ({ idx, data }) => {
  const [card, setCardNews] = useRecoilState(cardNewsData)
  const onSaveTitle = (newTitle: string) =>
    setCardNews({
      ...card,
      data: onChangeTitle({ data: card.data, idx, newTitle })
    })

  const onSaveSubTitle = (newTitle: string) => {
    const newData = onChangeSubTitle({ data: card.data, idx, newTitle })
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
        <Box component={'div'}>
          <Text
            text={data.title.kr}
            props={{
              variant: 'h2',
              sx: TOP_TITLE_SX,
              className: [styles.title, styles['MuiTypography-root']].join(' ')
            }}
            onSave={onSaveTitle}
          />

          <Text
            text={data.subtitle.kr[0]}
            props={{
              variant: 'h3',
              sx: SUB_TITLE_SX,
              className: [styles.subTitle, styles['MuiTypography-root']].join(' ')
            }}
            onSave={onSaveSubTitle}
          />
        </Box>
        <Box component={'div'} className={styles.contentWrapper}>
          {data.content.kr.map((c, index) => (
            <Text
              key={c.title}
              text={c.title}
              props={{
                variant: 'body1',
                sx: CONTENT_DESCRIPTION_SX,
                className: [styles.content, styles['MuiTypography-root']].join(' ')
              }}
              onSave={(newTitle: string) => onSaveContent(newTitle, index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Card11
