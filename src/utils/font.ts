import { Nanum_Pen_Script, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export async function loadFont(fontName: string, fontUrl: string) {
  const font = new FontFace(fontName, `url(${fontUrl})`)
  await font.load()
  document.fonts.add(font)
}

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Light.otf',
      weight: '300'
    },
    {
      path: '../../public/fonts/Pretendard-Regular.otf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Pretendard-Bold.otf',
      weight: '700'
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.otf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Pretendard-ExtraBold.otf',
      weight: '800'
    }
  ],
  variable: '--font-pretendard'
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
})

export const nanum_pen = Nanum_Pen_Script({
  adjustFontFallback: false,
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
  variable: '--nanum_pen'
})
