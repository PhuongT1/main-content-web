import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { onChangeImageInCardData, onChangeSubTitle, onChangeTitle } from '../../../utils/common'
import EditImage from '../EditImage'
import Text from '../Text'
import { CONTENT_DESCRIPTION_SX, SUB_TITLE_SX } from '../../../utils/textStyles'

const Card10: React.FC<ICardProps> = ({ idx, data }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string) => {
    setCardNews({
      ...card,
      data: onChangeImageInCardData({ data: card.data, idx, newUrl })
    })
  }

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

  return (
    <Box component={'div'} className={styles.containerWrapper}>
      <Box component={'div'} className={styles.container} data-card-image='card-image'>
        <Box component={'div'} className={styles.imgContainer}>
          {!isEdit ? (
            <Image src={data.imgURL} alt={data.title.kr} className={styles.img} width={0} height={0} sizes='100vw' />
          ) : (
            <div className={styles.img}>
              <EditImage imgURL={data.imgURL} onChangeImage={onChangeImage} />
            </div>
          )}
        </Box>
        <Text
          text={data.title.kr}
          props={{
            variant: 'h2',
            sx: SUB_TITLE_SX,
            className: [styles.title, styles['MuiTypography-root']].join(' ')
          }}
          onSave={onSaveTitle}
        />

        <Text
          text={data.subtitle.kr[0]}
          props={{
            variant: 'h3',
            sx: CONTENT_DESCRIPTION_SX,
            className: [styles.subTitle, styles['MuiTypography-root']].join(' ')
          }}
          onSave={onSaveSubTitle}
        />
      </Box>
    </Box>
  )
}

export default Card10
