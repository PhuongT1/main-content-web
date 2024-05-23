import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import styles from './card-my-test.module.scss'

type TCardMyTestProps = {
  thumbnail: string
  type: string
  name: string
  result: string
  id: number
}

const CardMyTest = ({ thumbnail, type, name, result, id }: TCardMyTestProps) => {
  const renderColor = () => {
    let style = 'border'
    if (result === '합격') {
      style = 'blue'
    } else if (result === '재응시') {
      style = 'purple'
    } else if (result === '불합격') {
      style = 'red'
    }
    return style
  }

  const dynamicClasses = `${styles.tag} ${styles[`tag_${renderColor()}`]}`
  const { palette } = useTheme()

  return (
    <Link href={`certificate-management/${id}`}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: convertToRem(16),
          borderRadius: convertToRem(16),
          padding: convertToRem(16),
          background: palette.main.gray80
        }}
      >
        <Image
          src={thumbnail}
          alt={name}
          height={171}
          width={336}
          style={{ width: '100%', borderRadius: 10, objectFit: 'cover' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: convertToRem(4) }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: convertToRem(4), flex: 1 }}>
            <Typography cate='sub_title_20' sx={{ color: palette.main.point }}>
              {type}
            </Typography>
            <Typography cate='sub_title_30' plainColor='main.grayf7'>
              {name}
            </Typography>
          </Box>
          <Box className={dynamicClasses}>
            <Typography cate='button_20' plainColor={result === '미응시' ? 'main_grey.gray200' : 'main_grey.gray100'}>
              {result}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default CardMyTest
