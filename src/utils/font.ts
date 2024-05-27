import { Nanum_Pen_Script, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export async function loadFont(fontName: string, fontUrl: string) {
  const font = new FontFace(fontName, `url(${fontUrl})`)
  await font.load()
  document.fonts.add(font)
}

export const pretendard = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
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
