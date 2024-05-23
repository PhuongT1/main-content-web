import Box from '@mui/material/Box'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { gray_dark_home } from '@/themes/system-palette'
import { BrandType_1, BrandType_2, BrandType_3 } from '@/assets/images/trade'
import Image, { StaticImageData } from 'next/image'

export type ITradeConceptType = {
  title: string
  content: {
    description: string
    main: string
    image: StaticImageData
  }
}

export const cardData = (conceptData: ITradeConceptType[]) =>
  conceptData.map((item) => ({
    title: item.title,
    content: (
      <>
        <Box component={'div'} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              width: '160px',
              height: '106.67px',
              borderRadius: 2
            }}
          >
            <Image width={160} height={106.67} style={{ borderRadius: 2 }} src={item.content.image || ''} alt={''} />
          </Box>
          <Box flex={1}>
            <Typography
              noWrap
              sx={{
                color: gray_dark_home.gray100,
                textAlign: ' left',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                display: '-webkit-box',
                WebkitLineClamp: '6',
                WebkitBoxOrient: 'vertical',
                cursor: 'pointer'
              }}
              cate='mandatory_10'
            >
              {item.content.description}
            </Typography>
          </Box>
        </Box>
      </>
    )
  }))
