'use client'
import Box from '@mui/material/Box'
import styles from './page-header.module.scss'
import Home from '@/assets/icons/home'
import Ellipse from '@/assets/icons/naming/ellipse'
import { Divider, Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { useTheme } from '@mui/material'
import { ButtonItem } from '../home/button'
import { DELETE_ON_DOWNLOAD_PDF } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'

export interface IPageHeaderProps {
  title: React.ReactNode
}

const PageHeader: React.FC<IPageHeaderProps> = ({ title }) => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  return (
    <>
      <Box component={'div'} sx={{ breakBefore: 'page' }} className={styles.header_title}>
        <Box component={'div'} className={styles.sub_title}>
          <Typography cate='title_5_semibold' color={home.gray50}>
            {title}
          </Typography>
        </Box>
        <Box component={'div'} className={[styles.right_title, DELETE_ON_DOWNLOAD_PDF].join(' ')}>
          <ButtonItem
            sx={{
              backgroundColor: home.gray400,
              '&:hover': {
                backgroundColor: home.gray300
              }
            }}
            startIcon={<Home stroke={home.gray50} />}
          >
            <Typography cate='caption_1_semibold' color={home.gray50}>
              {dict.common_deck_project_home}
            </Typography>
          </ButtonItem>
          <ButtonItem
            startIcon={<Ellipse pathProps={{ fill: home.gray50 }} />}
            sx={{
              backgroundColor: home.gray400,
              '&:hover': {
                backgroundColor: home.gray300
              }
            }}
          >
            <Typography cate='caption_1_semibold' color={home.gray50}>
              {dict.common_deck_list}
            </Typography>
          </ButtonItem>
        </Box>
      </Box>
      <Divider sx={{ margin: remConvert('40px 0'), borderColor: home.gray200 }} />
    </>
  )
}
export default PageHeader
