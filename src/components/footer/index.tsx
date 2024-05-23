'use client'
import FooterLogo from '@/assets/icons/app-icons/LOGO_2.png'
import { Typography } from '@/elements'
import { TextButton } from '@/elements/v2/button'
import { convertToRem } from '@/utils/styles'
import { Box, Divider, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FooterPopup from '../dialog/footer-popup'
import { CATE } from '../dialog/footer-popup/footer-popup.type'
import styles from './styles.module.scss'

const FooterLink = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <TextButton
    btnSize='md-np'
    onClick={onClick}
    sx={{
      height: convertToRem(21),
      px: 0,
      minWidth: 'unset'
    }}
  >
    <Typography
      cate='body_20'
      className={styles.link_text}
      plainColor='sub.teal400'
      sx={{
        flexShrink: 0,
        whiteSpace: 'nowrap'
      }}
    >
      {text}
    </Typography>
  </TextButton>
)

const CompanyInfo = ({ info }: { info: string }) => (
  <Stack gap={1} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
    <Typography cate='caption_10' plainColor='main.gray40'>
      {info}
    </Typography>
    <Divider
      orientation='vertical'
      flexItem
      sx={{
        borderColor: 'main.gray40'
      }}
    />
  </Stack>
)

const Footer = () => {
  const [cate, setCate] = useState<CATE>(CATE.TERM)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const router = useRouter()

  const onOpenPolicy = (cate: CATE) => {
    setCate(cate)
    setOpenPopup(true)
  }

  return (
    <>
      <Box
        component={'footer'}
        className={styles.footer}
        sx={{
          bgcolor: 'main.black',
          paddingX: { md: convertToRem(48), sm: convertToRem(20) },
          paddingY: convertToRem(40)
        }}
      >
        <Box className={styles.logo} position={'relative'}>
          <Image src={FooterLogo} alt='footer logo' fill />
        </Box>
        <Stack
          direction={'row'}
          justifyContent={{ md: 'flex-start', sm: 'space-between' }}
          mt={3}
          className={styles.about_us_link_box}
          gap={{ md: 4, sm: 0 }}
        >
          <FooterLink
            text='회사소개'
            onClick={() => {
              router.push('/')
            }}
          />
          <FooterLink text='이용약관' onClick={onOpenPolicy.bind(null, CATE.TERM)} />
          <FooterLink text='개인정보처리방침' onClick={onOpenPolicy.bind(null, CATE.PRIVACY)} />
          <FooterLink text='결제/환불정책' onClick={onOpenPolicy.bind(null, CATE.PAYMENT)} />
        </Stack>
        <Stack mt={2.5} gap={1} direction={'row'} maxWidth={convertToRem(690)} flexWrap={'wrap'}>
          <CompanyInfo info='상호명：（주)메인콘텐츠' />
          <CompanyInfo info='대표자명：임한규, 김태성' />
          <CompanyInfo info='사업자등록번호：874-86-00628' />
          <CompanyInfo info='통신판매업 신고번호 : 2020-서울동작-0379' />
          <CompanyInfo info='연락처：1566-9178' />
          <CompanyInfo info='이메일：main@maincontents.com' />
          <Typography cate='caption_10' plainColor='main.gray40'>
            주소：서울시 동작구 상도로 65 금성빌딩 6층
          </Typography>
        </Stack>
      </Box>
      <FooterPopup
        open={openPopup}
        onCancel={() => {
          setOpenPopup(false)
        }}
        {...{ setCate, cate }}
      />
    </>
  )
}

export default Footer
