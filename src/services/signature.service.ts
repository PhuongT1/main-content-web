import { FONT_NAME } from '@/constants/startup/signature-stamp.constant'

const drawTextCanvas = (text: string, fontFamily: string, fontSize: number, color: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  // Define canvas size here if needed
  canvas.width = 300
  canvas.height = 150

  // Load custom font
  context!.font = `${fontSize}px ${fontFamily}`
  context!.fillStyle = color

  context!.textAlign = 'center'
  context!.textBaseline = 'middle'

  // Draw the text
  context!.fillText(text, canvas.width / 2, canvas.height / 2) // Adjust text position as needed

  return canvas.toDataURL()
}

export const generateSignatures = (txt: string, fontSize: number, color: string) => {
  const {
    CHOSUN,
    DESIGN_HOUSE_LIGHT,
    MAPO_DACAPO,
    NANUM_BARUNPENR,
    NANUM_MYEONGJO,
    NANUM_SQUARE_NEO,
    ONOTFR,
    ONR,
    SANG_SANG_SHIN,
    SBL,
    THE_FACE_SHOP,
    UH_BEE_MIMI
  } = FONT_NAME
  const signatures = [
    CHOSUN,
    DESIGN_HOUSE_LIGHT,
    MAPO_DACAPO,
    NANUM_BARUNPENR,
    NANUM_MYEONGJO,
    NANUM_SQUARE_NEO,
    ONOTFR,
    ONR,
    SANG_SANG_SHIN,
    SBL,
    THE_FACE_SHOP,
    UH_BEE_MIMI
  ].map((i) => drawTextCanvas(txt, i, fontSize, color))
  return signatures
}
