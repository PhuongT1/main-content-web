import DownloadIcon from '@/assets/icons/download'
import { ButtonItem } from '@/components/home/button'
import { useTheme } from '@mui/material'
import * as htmlToImage from 'html-to-image'
import { remConvert } from '@/utils/convert-to-rem'
import useToggle from '@/hooks/use-toggle'
import { useRecoilState } from 'recoil'
import { cardNewsData, editCardNews } from '@/atoms/home/card-news'
import { ModalNotification } from '@/components/dialog/modal-deck'
import LoadingComponent from '@/components/loading'
import { useState, useMemo } from 'react'
import { useLanguage } from '@/hooks/use-language'

const DownloadImage = () => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [isEdit, setIsEdit] = useRecoilState(editCardNews)
  const [cardNews] = useRecoilState(cardNewsData)
  const [loading, setLoading] = useState(false)

  const isSafari = useMemo(() => {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        return false
      } else {
        return true
      }
    }
    return false
  }, [])

  const onDownloadImage = async () => {
    if (isEdit) {
      setToggleShowDialog(true)
      return
    }

    const isSafari =
      navigator.userAgent.toLowerCase().indexOf('safari') > -1 &&
      navigator.userAgent.toLowerCase().indexOf('chrome') === -1
    const elements: any = document.querySelectorAll('[data-card-image="card-image"]')
    const fontEmbedCSS = await htmlToImage.getFontEmbedCSS(
      document.getElementsByClassName('card-news-step1')[0] as HTMLElement
    )
    setLoading(true)
    try {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        let svg = await htmlToImage.toSvg(element, {
          includeQueryParams: true,
          skipFonts: true,
          fontEmbedCSS
        })

        const img = new Image()
        img.src = svg
        await new Promise((resolve) => (img.onload = resolve))
        /**
         * CHEAT if safari
         * @see {@link https://bugs.webkit.org/show_bug.cgi?id=39059}
         */
        if (isSafari) {
          await new Promise((resolve) => setTimeout(resolve, 500))
          document.querySelector('#card-news-image-download')?.replaceChildren()
          document.querySelector('#card-news-image-download')?.append(img)
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        // HACK if safari
        if (isSafari && i + 1 === elements.length) document.querySelector('#card-news-image-download')?.removeChild(img)

        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)

        const link = document.createElement('a')
        link.download = `card-news-${cardNews.type}-${new Date().toTimeString()}-${i + 1}.jpg`
        link.href = dataUrl
        link.click()
      }

      setLoading(false)
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }

  return (
    <>
      <ButtonItem
        startIcon={<DownloadIcon pathProps={{ stroke: 'currentColor' }} />}
        sx={{
          flexShrink: 0,
          borderColor: home.blue500,
          backgroundColor: home.alpha_blue_10,
          lineHeight: remConvert('20px'),
          color: home.blue500,
          borderRadius: remConvert('8px'),
          padding: remConvert('18px 20px'),
          height: remConvert('44px'),
          '&:hover': {
            backgroundColor: home.alpha_blue_50
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            borderColor: home.blue500,
            color: home.blue500
          }
        }}
        variant='outlined'
        onClick={onDownloadImage}
        disabled={!cardNews}
      >
        JPG 다운로드
      </ButtonItem>
      <ModalNotification
        onSubmit={() => {
          setIsEdit(false)
          setToggleShowDialog(false)
        }}
        description={dict.deck_delete_description}
        title={dict.deck_delete_title}
        open={showDialog}
        onCancel={toggleShowDialog}
      />
      <LoadingComponent open={loading} />
    </>
  )
}

export default DownloadImage
