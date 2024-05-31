import Providers from '@/libs/provider'
import { nanum_pen, pretendard, roboto_mono } from '@/utils/font'
import { Box } from '@mui/material'
import moment from 'moment'
import 'moment/locale/ko'
import type { Metadata } from 'next'
import './globals.scss'

moment().locale('ko')

export const metadata: Metadata = {
  title: 'Schumpeter'
}

export const viewport = {
  width: 1
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <Box
        component={'body'}
        // sx={{
        //   '*': {
        //     fontFamily: 'var(--font-pretendard)'
        //   }
        // }}
        // className={`${pretendard.className} ${roboto_mono.variable} ${nanum_pen.variable}`}
        className={`${pretendard.className}`}
      >
        <Providers>
          <Box component={'div'}>{children}</Box>
        </Providers>
      </Box>
    </html>
  )
}
