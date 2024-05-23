import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import {
  onChangeContentTitle,
  onChangeImageInCardData,
  onChangeImageInContent,
  onChangeSubTitle
} from '../../../utils/common'
import EditImage from '../EditImage'
import Text from '../Text'
import { CONTENT_DESCRIPTION_SX, CONTENT_TITLE_SX } from '../../../utils/textStyles'

const Card4: React.FC<ICardProps> = ({ idx, data }) => {
  const [isEdit] = useRecoilState(editCardNews)
  const [card, setCardNews] = useRecoilState(cardNewsData)

  const onChangeImage = (newUrl: string, contentIdx: number) => {
    const data = onChangeImageInContent({ data: card.data, idx, newUrl, contentIdx })
    setCardNews({
      ...card,
      data
    })
  }

  const onSaveContent = (newTitle: string, contentIdx: number) => {
    setCardNews({
      ...card,
      data: onChangeContentTitle({ data: card.data, idx, newTitle, contentIdx })
    })
  }

  const onSaveSubTitle = (newTitle: string, subTitleIdx: number) => {
    setCardNews({
      ...card,
      data: card.data.map((item, index) => {
        if (idx === index)
          return {
            ...item,
            subtitle: {
              ...item.subtitle,
              kr: item.subtitle.kr.map((sub, subIndex) => (subIndex === subTitleIdx ? newTitle : sub))
            }
          }
        return item
      })
    })
  }

  return (
    <Box component={'div'} className={styles.containerWrapper}>
      <Box component={'div'} className={styles.container} data-card-image='card-image'>
        <Box component={'div'} className={styles.content}>
          <Stack className={styles.content} direction={'column'} gap={2.5}>
            {data.content.kr.slice(0, 3).map((content, index) => {
              return (
                <Stack key={index} direction={'row'} gap={3.75} alignItems={'center'}>
                  <Box component={'div'} className={styles.imgContainer} sx={{ width: '40%' }}>
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
                        <EditImage imgURL={content.imgURL} onChangeImage={(url: string) => onChangeImage(url, index)} />
                      </div>
                    )}
                  </Box>
                  <Box component={'div'} className={styles.contentWrapper} sx={{ width: '60%' }}>
                    <Text
                      text={data.subtitle.kr[index]}
                      props={{
                        sx: CONTENT_TITLE_SX,
                        vairant: 'body1',
                        className: styles.contentTitle
                      }}
                      onSave={(newTitle: string) => onSaveSubTitle(newTitle, index)}
                    />
                    <Text
                      text={content.title}
                      props={{
                        sx: CONTENT_DESCRIPTION_SX,
                        vairant: 'body2',
                        className: styles.contentSubTitle
                      }}
                      onSave={(newTitle: string) => onSaveContent(newTitle, index)}
                    />
                  </Box>
                </Stack>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Card4
