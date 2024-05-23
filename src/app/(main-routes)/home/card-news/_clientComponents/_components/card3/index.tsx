import { ICardData } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import EditImage from '../EditImage'
import { onChangeImageInContent } from '../../../utils/common'
import Text from '../Text'
import { SUB_TITLE_SX } from '../../../utils/textStyles'

interface ICard1Props {
  idx: number
  data: ICardData
}

const Card3: React.FC<ICard1Props> = ({ idx, data }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string, contentIdx: number) => {
    const data = onChangeImageInContent({ data: card.data, idx, newUrl, contentIdx })
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
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={12}>
            <Box component={'div'} className={styles.imgContainer}>
              {!isEdit ? (
                <Image
                  className={styles.mainImg}
                  src={data.content.kr[0].imgURL}
                  alt={data.content.kr[0].title}
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              ) : (
                <div className={styles.mainImg}>
                  <EditImage
                    imgURL={data.content.kr[0].imgURL}
                    onChangeImage={(url: string) => onChangeImage(url, 0)}
                  />
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {data.content.kr[1] && (
              <Box component={'div'} className={styles.subImgContainer}>
                {!isEdit ? (
                  <Image
                    className={styles.subMainImg}
                    src={data.content.kr[1].imgURL}
                    alt={data.content.kr[1].title}
                    width={0}
                    height={0}
                    sizes='100vw'
                  />
                ) : (
                  <div className={styles.subMainImg}>
                    <EditImage
                      imgURL={data.content.kr[1].imgURL}
                      onChangeImage={(url: string) => onChangeImage(url, 1)}
                    />
                  </div>
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {data.content.kr[2] && (
              <Box component={'div'} className={styles.subImgContainer}>
                {!isEdit ? (
                  <Image
                    className={styles.subMainImg}
                    src={data.content.kr[2].imgURL}
                    alt={data.content.kr[2].title}
                    width={0}
                    height={0}
                    sizes='100vw'
                  />
                ) : (
                  <div className={styles.subMainImg}>
                    <EditImage
                      imgURL={data.content.kr[2].imgURL}
                      onChangeImage={(url: string) => onChangeImage(url, 2)}
                    />
                  </div>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
        <Text
          text={data.subtitle.kr[0]}
          props={{
            sx: SUB_TITLE_SX,
            vairant: 'h3',
            className: styles.subTitle
          }}
          onSave={onSaveSubtitle}
        />
      </Box>
    </Box>
  )
}

export default Card3
