import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import EditImage from '../EditImage'
import { onChangeImageInCardData, onChangeTitle } from '../../../utils/common'
import Text from '../Text'
import { TOP_TITLE_SX } from '../../../utils/textStyles'

const Card1: React.FC<ICardProps> = ({ data, idx }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string) => {
    setCardNews({
      ...card,
      data: onChangeImageInCardData({ data: card.data, idx, newUrl })
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
            className: [styles.title, styles['MuiTypography-root']].join(' ')
          }}
          onSave={(newTitle: string) =>
            setCardNews({
              ...card,
              data: onChangeTitle({ data: card.data, idx, newTitle })
            })
          }
        />
        <div className={styles.imgContainer}>
          {!isEdit ? (
            <Image src={data.imgURL} alt={data.title.kr} className={styles.img} width={0} height={0} sizes='100vw' />
          ) : (
            <Box component={'div'} className={styles.img}>
              <EditImage imgURL={data.imgURL} onChangeImage={onChangeImage} />
            </Box>
          )}
        </div>
      </Box>
    </Box>
  )
}

export default Card1
