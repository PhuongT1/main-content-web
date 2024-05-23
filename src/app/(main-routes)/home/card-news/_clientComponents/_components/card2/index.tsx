import { ICardData } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import EditImage from '../EditImage'
import { onChangeContentTitle, onChangeImageInContent, onChangeTitle } from '../../../utils/common'
import Text from '../Text'
import { CONTENT_DESCRIPTION_SX, SUB_TITLE_SX, TOP_TITLE_SX } from '../../../utils/textStyles'

interface ICard1Props {
  idx: number
  data: ICardData
}

const Card2: React.FC<ICard1Props> = ({ idx, data }) => {
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

  const onSaveContent = (newTitle: string, contentIdx: number) => {
    setCardNews({
      ...card,
      data: onChangeContentTitle({ data: card.data, idx, newTitle, contentIdx })
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
        <Box component={'div'} className={styles.content}>
          <Grid
            container
            component={'div'}
            className={styles.content}
            display={'flex'}
            alignItems={'center'}
            spacing={'20px'}
          >
            {data.content.kr.slice(0, 2).map((content, index) => {
              if (index % 2 === 0) {
                return (
                  <React.Fragment key={index}>
                    <Grid item component={'div'} xs={6}>
                      <Box component={'div'} className={styles.imgContainer}>
                        {!isEdit ? (
                          <Image
                            src={content.imgURL}
                            alt={content.title}
                            className={styles.img}
                            width={0}
                            height={0}
                            sizes='100vw'
                          />
                        ) : (
                          <div className={styles.img}>
                            <EditImage
                              imgURL={content.imgURL}
                              onChangeImage={(url: string) => onChangeImage(url, index)}
                            />
                          </div>
                        )}
                      </Box>
                    </Grid>
                    <Grid item component={'div'} xs={6}>
                      <Text
                        text={content.title}
                        props={{
                          variant: 'body2',
                          sx: CONTENT_DESCRIPTION_SX,
                          className: styles.contentTitle
                        }}
                        onSave={(newTitle: string) => onSaveContent(newTitle, index)}
                      />
                    </Grid>
                  </React.Fragment>
                )
              }
              return (
                <React.Fragment key={index}>
                  <Grid item component={'div'} xs={6}>
                    <Text
                      text={content.title}
                      props={{
                        variant: 'body2',
                        sx: CONTENT_DESCRIPTION_SX
                      }}
                      onSave={(newTitle: string) => onSaveContent(newTitle, index)}
                    />
                  </Grid>
                  <Grid item component={'div'} xs={6}>
                    <Box component={'div'} className={styles.imgContainer}>
                      {!isEdit ? (
                        <Image
                          src={content.imgURL}
                          alt={content.title}
                          className={styles.img}
                          width={0}
                          height={0}
                          sizes='100vw'
                        />
                      ) : (
                        <div className={styles.img}>
                          <EditImage
                            imgURL={content.imgURL}
                            onChangeImage={(url: string) => onChangeImage(url, index)}
                          />
                        </div>
                      )}
                    </Box>
                  </Grid>
                </React.Fragment>
              )
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Card2
