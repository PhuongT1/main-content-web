import localFont from 'next/font/local'

const nanummyeongjo = localFont({
  src: [
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/Bold.otf',
      weight: '700'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/ExtraBold.otf',
      weight: '800'
    },
    {
      path: '../../../../../public/fonts/deck-06/nanummyeongjo/Regular.otf',
      weight: '400'
    }
  ],
  variable: '--font-nanummyeongjo'
})

export { nanummyeongjo }
