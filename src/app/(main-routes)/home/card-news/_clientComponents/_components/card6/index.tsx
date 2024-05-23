import { ICardProps } from '@/types/cardnews/index.type'
import React from 'react'
import styles from './card.module.scss'
import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import EditImage from '../EditImage'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { onChangeContentTitle, onChangeImageInContent, onChangeSubTitle } from '../../../utils/common'
import Text from '../Text'
import { BOTTOM_TITLE_SX, CONTENT_DESCRIPTION_SX } from '../../../utils/textStyles'

const Card6: React.FC<ICardProps> = ({ idx, data }) => {
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

  return (
    <Box component={'div'} className={styles.containerWrapper}>
      <Box component={'div'} className={styles.container} data-card-image='card-image'>
        <Text
          text={data.title.kr}
          props={{
            variant: 'h2',
            sx: BOTTOM_TITLE_SX,
            className: styles.subTitle
          }}
          onSave={(newTitle: string) =>
            setCardNews({
              ...card,
              data: onChangeSubTitle({ data: card.data, idx, newTitle })
            })
          }
        />
        <Box component={'div'} className={styles.content}>
          <Stack className={styles.content} direction={'column'} alignItems={'center'} gap={'20px'}>
            {data.content.kr.slice(0, 2).map((content, index) => {
              return (
                <Stack className={styles.content} key={index} direction={'row'} alignItems={'center'} gap={'20px'}>
                  <Box component={'div'} className={styles.imgContainer} sx={{ width: '39%' }}>
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
                  <Box component={'div'} padding={'10px'} sx={{ width: '61%' }}>
                    <Text
                      text={content.title}
                      props={{
                        variant: 'body2',
                        sx: CONTENT_DESCRIPTION_SX,
                        className: styles.contentSubTitle
                      }}
                      onSave={(newTitle: string) => {
                        onSaveContent(newTitle, index)
                      }}
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

export default Card6
