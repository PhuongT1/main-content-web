import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import EditImage from '../EditImage'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { onChangeContentTitle, onChangeImageInContent, onChangeSubTitle, onChangeTitle } from '../../../utils/common'
import { CONTENT_DESCRIPTION_SX, SUB_TITLE_SX, TOP_TITLE_SX } from '../../../utils/textStyles'
import Text from '../Text'

const Card9: React.FC<ICardProps> = ({ idx, data }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string, contentIdx: number) => {
    const data = onChangeImageInContent({ data: card.data, idx, newUrl, contentIdx })
    setCardNews({
      ...card,
      data
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
          text={data.subtitle.kr[0]}
          props={{
            variant: 'h3',
            sx: SUB_TITLE_SX,
            className: [styles.subTitle, styles['MuiTypography-root']].join(' ')
          }}
          onSave={onSaveSubTitle}
        />
        <Text
          text={data.title.kr}
          props={{
            variant: 'h2',
            sx: TOP_TITLE_SX,
            className: [styles.title, styles['MuiTypography-root']].join(' ')
          }}
          onSave={onSaveTitle}
        />
        <Box component={'div'} className={styles.content}>
          <Grid
            container
            component={'div'}
            className={styles.content}
            display={'flex'}
            columnSpacing={'20px'}
            rowSpacing={'20px'}
          >
            {data.content.kr.slice(0, 3).map((content, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item component={'div'} sm={4}>
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
                    <Text
                      text={content.title}
                      props={{
                        variant: 'body2',
                        sx: CONTENT_DESCRIPTION_SX,
                        className: [styles.contentSubTitle, styles['MuiTypography-root']].join(' ')
                      }}
                      onSave={(newTitle: string) => onSaveContent(newTitle, index)}
                    />
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

export default Card9
