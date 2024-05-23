import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { onChangeImageInCardData, onChangeTitle } from '../../../utils/common'
import EditImage from '../EditImage'
import Text from '../Text'
import { BOTTOM_TITLE_SX, CONTENT_DESCRIPTION_SX } from '../../../utils/textStyles'

const Card5: React.FC<ICardProps> = ({ idx, data }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string) => {
    const data = onChangeImageInCardData({ data: card.data, idx, newUrl })
    setCardNews({
      ...card,
      data
    })
  }

  const onSaveSubtitle = (newTitle: string) => {
    const newData = card.data.map((item, index) => {
      if (idx === index)
        return {
          ...item,
          subtitle: {
            ...item.subtitle,
            kr: [newTitle]
          }
        }
      return item
    })
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
              <EditImage
                imgURL={data.imgURL}
                onChangeImage={(url: string) => onChangeImage(url)}
                sxBtnProps={{ transform: 'translateX(calc(-100% - 100px))' }}
              />
            </div>
          )}
        </Box>

        <Text
          text={data.title.kr}
          props={{
            variant: 'h2',
            sx: BOTTOM_TITLE_SX,
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
            sx: CONTENT_DESCRIPTION_SX,
            className: styles.subTitle
          }}
          onSave={onSaveSubtitle}
        />
      </Box>
    </Box>
  )
}

export default Card5
