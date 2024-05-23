import {
  FONT_NAME,
  bigCircleRadius,
  starSize,
  svgSealType1Path,
  svgSealType2Path,
  svgStarPath
} from '@/constants/startup/signature-stamp.constant'
import { DrawProps, SealDemoProps } from '@/types/startup/signature-stamp.type'

export const FXQ = {
  //시그니처 색상 정의
  colors: ['red', 'blue', '#000'],

  //서명 글꼴 정의
  fonts: [FONT_NAME.HJA, FONT_NAME.HJB, FONT_NAME.ONB, FONT_NAME.ONOTFB],

  baseConf: {
    color: '',
    font: ''
  },

  commonMethod: function (cType: any, fType: any) {
    var color = null
    color = this.colors[cType]
    if (color === undefined || color == 'undefined') {
      color = this.colors[0]
    }

    var font = this.fonts[fType]
    // if (font === undefined || font == 'undefined') {
    //   font = this.fonts[0]
    // }

    this.baseConf.color = color
    this.baseConf.font = font
  },

  /**
   *
   * @param company 회사 이름
   * @param cType 색깔 0.빨간색  1. 푸른 2.다른
   * @param fType 폰트 0.송나라
   * @param sType 서명 유형 0.공식 인감 1.계약 인감
   * @param seaNo  서명의 일련 번호입니다
   */
  companySeal: function (company: any, cType: any, fType: any, sType: any, seaNo: any) {
    //문서 객체 가져오기
    // var canvas = document.getElementById('canvas');
    var canvas = document.createElement('canvas')

    var context = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 300

    this.commonMethod(cType, fType)

    var width = canvas.width / 2
    var height = canvas.height / 2

    //원을 그리는 방법
    drawCircle()

    draw5Start()

    drawTitle()

    writeSerNo(seaNo)

    writeFont()

    //이미지 base64 반환
    return canvas.toDataURL()

    /**
     * 원을 그리는 방법
     * color : 원 테두리의 색상
     * lineWidth: 선의 폭
     */
    function drawCircle() {
      context?.translate(0, 0)
      context!.lineWidth = 5
      context!.strokeStyle = FXQ.baseConf.color
      context?.beginPath()
      context?.arc(width, height, 110, 0, Math.PI * 2)
      context?.stroke()
      context?.save()
      var data = canvas.toDataURL('image/jpeg')
      console.log(canvas)
    }

    /**
     * 별 다섯개를 그려주세요
     * @param sx
     * @param sy
     * @param radius
     * @param color
     * @param rotato
     */
    function draw5Start() {
      context?.save()
      context!.fillStyle = FXQ.baseConf.color
      //좌표 원점, 중심점을 이동하여 그리기 시작
      context?.translate(width, height)
      //회전
      context?.rotate(Math.PI)
      context?.beginPath()
      var dig = (Math.PI / 5) * 4
      for (var i = 0; i < 5; i++) {
        var x = Math.sin(i * dig)
        var y = Math.cos(i * dig)
        context?.lineTo(x * 30, y * 30)
      }
      context?.closePath()
      context?.stroke()
      context?.fill()
      context?.restore()
    }

    /**
     * 공식 인장 제목 그리기
     */
    function drawTitle() {
      var title = ''
      if (sType != 0) {
        title = '계약 인감'
      }

      // 스탬프 이름 그리기
      context!.font = 'bolder 20px ' + FXQ.baseConf.font
      context!.textBaseline = 'middle' //텍스트의 세로 맞춤 설정
      context!.textAlign = 'center' //텍스트의 가로 맞춤 설정
      context!.lineWidth = 1
      context!.fillStyle = FXQ.baseConf.color
      context!.fillText(title, width, height + 65)
    }

    /**
     * 회사 이름을 그리다
     */
    function writeFont() {
      context!.font = 'bolder 30px ' + FXQ.baseConf.font
      var count = company.length // 단어 수
      var angle = (-4 * Math.PI) / (3 * (count - 1)) // 단어 각도
      var chars = company.split('')
      var trueChars = chars.reverse()
      var c
      for (var i = 0; i < count; i++) {
        c = trueChars[i] // 그릴 캐릭터
        if (i == 0) context?.rotate((5 * Math.PI) / 6.1)
        else context?.rotate(angle)
        context?.save()
        context?.translate(95, 0) // 이 위치로 이동합니다. 이때 단어는 x축에 수직입니다，첫 번째 매개변수는 원의 바깥쪽 가장자리로부터의 거리입니다，거리가 멀수록 가깝다.
        context?.rotate(Math.PI / 2) // 90도 회전,단어를 x축에 평행하게 만들기
        context?.fillText(c, 0, 5) // 이 점은 단어의 중심점입니다.
        context?.restore()
      }
    }

    /**
     * 서명 일련 번호 그리기
     * @param serNo
     */
    function writeSerNo(serNo: any) {
      context?.translate(width, height)
      context!.font = 'bolder 8px ' + FXQ.baseConf.font
      var count = serNo.length // 단어 수
      var angle = (-2 * Math.PI) / (6 * (count - 1)) // 단어 각도
      var chars = serNo.split('')

      for (var i = 0; i < count; i++) {
        var c = chars[i] // 그릴 캐릭터
        if (i == 0) context?.rotate((10 * Math.PI) / 5.95)
        else context?.rotate(angle)
        context?.save()
        context?.translate(-95, 5) // 이 위치로 이동,이 때 단어는 x축에 수직입니다，첫 번째 매개변수는 원의 바깥쪽 가장자리로부터의 거리입니다，거리가 멀수록 가깝다
        context?.rotate(Math.PI / 2) // 90도 회전,단어를 x축에 평행하게 만들기
        context!.fillStyle = FXQ.baseConf.color
        context?.fillText(c, 0, 5) // 이 점은 단어의 중심점입니다.
        context?.restore()
      }
    }
  },
  /**
   * 개인 서명 그리기
   * @param name 이름
   * @param cType 글꼴 색상
   * @param fType 폰트
   * @param type 유형
   */
  personal: function (name: any, cType: any, fType: any, type: any, border: any) {
    this.commonMethod(cType, fType)
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = 112
    canvas.height = 112

    if (type != 0) {
      let color = FXQ.baseConf.color

      // Adjustments for border and text drawing
      if (border == 0) {
        context?.rect(2, 2, 108, 108)
        context!.strokeStyle = color
        context!.lineWidth = 2
        context?.stroke()
      }

      context!.fillStyle = color
      this.wrapText(context, name, canvas.width / 2, canvas.height / 2, 90, 80)
    }

    return canvas.toDataURL()
  },

  //타원형 서명(개인)
  personalEllipse: function (p_name: any, cType: any, fType: any, lType: any) {
    var radiusX = 0
    var radiusY = 0

    if (lType == 0) {
      //타원 장축 반경
      var radiusX = 60
      //단축 반경
      var radiusY = 90
    } else if (lType == 1) {
      //타원 장축 반경
      var radiusX = 90
      //단축 반경
      var radiusY = 90
    }
    this.commonMethod(cType, fType)
    var color = FXQ.baseConf.color
    var font = FXQ.baseConf.font

    //var canvas = document.getElementById('canvas');
    var canvas = document.createElement('canvas')

    canvas.width = 300
    canvas.height = 300

    canvas.width = 2 * radiusX + 5
    canvas.height = 2 * radiusY + 5

    var context = canvas.getContext('2d')

    writeFont(p_name, lType)

    //writeTitle();
    drawEllipse()

    function writeFont(words: any, lType: any) {
      // 스탬프 이름 그리기
      context!.font = '30px ' + font

      var personal = ''
      var names = p_name.split('')

      context!.textBaseline = 'middle' //텍스트의 세로 맞춤 설정
      context!.textAlign = 'center' //텍스트의 가로 맞춤 설정
      context!.lineWidth = 1
      context!.fillStyle = color
      context!.textAlign = 'center' //텍스트의 가로 맞춤 설정

      switch (words.length) {
        case 9:
          /* 여기에 로직 작성 */
          break
        case 8:
          /* 여기에 로직 작성 */
          break
        case 7:
          /* 여기에 로직 작성 */
          break
        case 6:
          /* 여기에 로직 작성 */
          break
        case 5:
        /* 여기에 로직 작성 */
        case 4:
          context!.font = '60px ' + font
          context?.fillText(names[0], 60, 60)
          context?.fillText(names[1], 120, 60)
          context?.fillText(names[2], 60, 130)
          context?.fillText(names[3], 120, 130)
          break
        case 3:
          if (lType == 0) {
            context!.font = '50px ' + font
            context?.fillText(names[0], 60, 45)
            context?.fillText(names[1], 60, 95)
            context?.fillText(names[2], 60, 145)
          } else if (lType == 1) {
            context!.font = '60px ' + font
            context?.fillText(names[0], 60, 60)
            context?.fillText(names[1], 120, 60)
            context?.fillText(names[2], 60, 130)
            context?.fillText('인', 120, 130)
          }
          break
        case 2:
          context!.font = '65px ' + font
          context?.fillText(names[0], 60, 60)
          context?.fillText(names[1], 60, 130)
          break
        case 1:
          context!.font = '90px ' + font
          context?.fillText(names[0], 60, 95)
        default:
          break
      }

      //this.wrapTextvalign(context,personal,8,45,80,40);
    }

    function drawEllipse() {
      context?.ellipse(
        radiusX + context?.lineWidth + 1,
        radiusY + context?.lineWidth + 1,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2
      )
      //투명한 배경
      context!.fillStyle = 'rgba(255, 255, 255, 0)'
      context!.strokeStyle = color
      context!.lineWidth = 3
      context?.fill()
      context?.stroke()
    }

    //이미지 base64 반환
    return canvas.toDataURL()
  },
  //타원형 서명
  companyEllipse: function (company: any, serNo: any, fType: any, cType: any) {
    //타원 장축 반경
    var radiusX = 140
    //단축 반경
    var radiusY = 90
    this.commonMethod(cType, fType)
    var color = FXQ.baseConf.color
    var font = FXQ.baseConf.font

    //var canvas = document.getElementById('canvas');
    var canvas = document.createElement('canvas')

    canvas.width = 300
    canvas.height = 300

    canvas.width = 2 * radiusX + 5
    canvas.height = 2 * radiusY + 5

    var context = canvas.getContext('2d')

    writeFont(true, company)
    writeFont(false, serNo)
    writeTitle()
    drawEllipse()

    function writeFont(isTop: any, words: any) {
      var totalArcAng = 180
      font = '20px ' + font

      //글꼴 길이
      if (!isTop) {
        totalArcAng = 60
        font = '10px ' + font
      }
      var fontTextLen = words.length

      var radiusWidth = radiusX + context!.lineWidth
      var radiusHeight = radiusY + context!.lineWidth

      //가장자리에서 중심으로의 이동 계수
      var minRat = 0.9
      //시작 각도
      var startAngle = isTop == true ? -90 - totalArcAng / 2 : 90 - totalArcAng / 2
      var step = 0.5
      var alCount = Math.ceil(totalArcAng / step) + 1
      var angleArr = new Array(alCount)
      var arcLenArr = new Array(alCount)
      var num = 0
      var accArcLen = 0
      angleArr[num] = startAngle
      arcLenArr[num] = accArcLen
      num++
      var angR = (startAngle * Math.PI) / 180
      var lastX = radiusX * Math.cos(angR) + radiusWidth
      var lastY = radiusY * Math.sin(angR) + radiusHeight

      for (var i = startAngle + step; num < alCount; i += step) {
        angR = (i * Math.PI) / 180
        var x = radiusX * Math.cos(angR) + radiusWidth
        var y = radiusY * Math.sin(angR) + radiusHeight
        accArcLen += Math.sqrt((lastX - x) * (lastX - x) + (lastY - y) * (lastY - y))
        angleArr[num] = i
        arcLenArr[num] = accArcLen
        lastX = x
        lastY = y
        num++
      }

      var arcPer = accArcLen / fontTextLen
      for (var i = 0; i < fontTextLen; i++) {
        var arcL = i * arcPer + arcPer / 2
        var ang = 0

        for (var p = 0; p < arcLenArr.length - 1; p++) {
          if (arcLenArr[p] <= arcL && arcL <= arcLenArr[p + 1]) {
            ang = arcL >= (arcLenArr[p] + arcLenArr[p + 1]) / 2 ? angleArr[p + 1] : angleArr[p]
            break
          }
        }
        angR = (ang * Math.PI) / 180
        var x = radiusX * Math.cos(angR) + radiusX
        var y = radiusY * Math.sin(angR) + radiusY
        var qxang = Math.atan2(radiusY * Math.cos(angR), -radiusX * Math.sin(angR))
        var fxang = qxang + Math.PI / 2

        var subIndex = isTop == true ? i : fontTextLen - 1 - i
        var c = words[subIndex]
        var w = 25
        var h = 31

        if (!isTop) {
          w = 2
          h = 10
        }

        x += h * minRat * Math.cos(fxang)
        y += h * minRat * Math.sin(fxang)
        if (isTop) {
          x += (-w / 2) * Math.cos(qxang)
          y += (-w / 2) * Math.sin(qxang)
        } else {
          x += (w / 2) * Math.cos(qxang)
          y += (w / 2) * Math.sin(qxang)
        }

        context?.save()
        context?.translate(x, y)
        if (isTop == true) {
          context?.rotate((((fxang * 180) / Math.PI - 90) * Math.PI) / 180)
        } else {
          context?.rotate((((fxang * 180) / Math.PI + 180 - 90) * Math.PI) / 180)
        }
        context?.translate(-x, -y)
        context!.fillStyle = color
        context!.font = font
        context?.fillText(c, x, y)
        context?.restore()
      }
    }

    function writeTitle() {
      context!.fillStyle = color
      context!.font = '20px SimSun'
      context!.textAlign = 'center'
      context?.fillText('계약 인감', radiusX, radiusY + 20)
      context?.restore()
    }

    function drawEllipse() {
      context?.ellipse(
        radiusX + context?.lineWidth + 1,
        radiusY + context?.lineWidth + 1,
        radiusX,
        radiusY,
        0,
        0,
        Math.PI * 2
      )
      //투명한 배경
      context!.fillStyle = 'rgba(255, 255, 255, 0)'
      context!.strokeStyle = color
      context!.lineWidth = 3
      context?.fill()
      context?.stroke()
    }

    //이미지 base64 반환
    return canvas.toDataURL()
  },
  /**
   * 글꼴 랩
   * */
  // Correcting the font assignment in wrapText function
  wrapText: function (ctx: any, text: string, x: any, y: any, maxWidth: any, _lineHeight: any) {
    let newText = text
    if ([5, 7].includes(newText.length)) {
      newText = newText + '인'
    }
    let charCount = newText.length
    let rows, cols

    const sizeBasedOnLength = new Map([
      [4, 40],
      [6, 25],
      [8, 20],
      [9, 25]
    ])

    const lineHeightBasedOnLength = new Map([
      [4, 80],
      [6, 80],
      [8, 80],
      [9, 100]
    ])

    // Adjusting rows and columns based on character count
    switch (charCount) {
      case 4:
        rows = 2
        cols = 2
        break
      case 6:
        rows = 2
        cols = 3
        break
      case 8:
        rows = 2
        cols = 4
        break
      case 9:
        rows = 3
        cols = 3
        break
      default:
        // For other cases, default to a single row
        rows = 1
        cols = Math.min(charCount, maxWidth / 10) // Assuming minimum character width
        break
    }

    // Dynamic font size calculation
    let fontSize = sizeBasedOnLength.get(charCount)
    let lineHeight = lineHeightBasedOnLength.get(charCount) || 0
    ctx.font = `${fontSize}px ${FXQ.baseConf.font}`

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Render characters with adjusted positions
    for (let i = 0; i < charCount; i++) {
      let col = i % cols
      let row = Math.floor(i / cols)
      let posX = x + ((col - (cols - 1) / 2) * maxWidth) / cols
      let posY = y + ((row - (rows - 1) / 2) * lineHeight) / rows

      ctx.fillText(newText[i], posX, posY)
    }
  }
}

const companySeal = ({ type, companyName, bold }: SealDemoProps) => {
  var canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = 110
  canvas.height = 110

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  if (context) {
    drawCircle({
      context,
      width: centerX,
      height: centerY,
      radius: bigCircleRadius
    })
    // if (bold) {
    drawSealType({
      context,
      width: centerX,
      height: centerY,
      radius: bigCircleRadius - 33,
      bold
    })
    // } else {
    // 	drawCircle({
    // 		context,
    // 		width: centerX,
    // 		height: centerY,
    // 		radius: bigCircleRadius - 20,
    // 	});
    // 	drawSealType1({
    // 		context,
    // 		width: centerX,
    // 		height: centerY,
    // 		radius: bigCircleRadius - 33,
    // 	});
    // }

    if (type === 'star') {
      drawStart({
        context,
        width: centerX,
        height: centerY,
        radius: bigCircleRadius
      })
    } else {
      drawDot({
        context,
        width: centerX,
        height: centerY,
        radius: bigCircleRadius
      })
    }
    writeCompanyName({
      context,
      width: centerX,
      height: centerY,
      name: companyName ?? '',
      radius: bigCircleRadius
    })
  }
  return canvas.toDataURL()
}

const drawCircle = ({ context, width, height, radius }: DrawProps) => {
  context.lineWidth = 2
  context.strokeStyle = 'red'
  context.beginPath()
  context.arc(width, height, radius!, 0, 2 * Math.PI)
  context.stroke()
  context.closePath()
}

const drawSealType = ({ context, width, height, radius, bold }: DrawProps) => {
  const starX = width - 31
  const starY = height - radius! - 15

  context.save()
  context.translate(starX, starY)
  context.scale(starSize / 2.4, starSize / 2.4)

  const path2D = new Path2D(bold ? svgSealType2Path : svgSealType1Path)

  context.fillStyle = 'red'
  context.fill(path2D, 'evenodd')

  context.restore()
}

const drawStart = async ({ context, height, width, radius }: DrawProps) => {
  const starX = width - 6
  const starY = height - radius! + 2

  context.save()
  context.translate(starX, starY)
  context.scale(starSize / 2, starSize / 2)

  const path2D = new Path2D(svgStarPath)

  context.fillStyle = 'red'
  context.fill(path2D, 'evenodd')

  context.restore()
}

const drawDot = async ({ context, height, width, radius }: DrawProps) => {
  const dotX = width
  const dotY = height - radius! + 10

  context.beginPath()
  context.arc(dotX, dotY, 5, 0, 2 * Math.PI)
  context.fillStyle = 'red'
  context.fill()
  context.closePath()
}

const writeCompanyName = ({ context, height, width, name }: DrawProps) => {
  context.save()
  context.translate(width, height)
  context.rotate(-Math.PI / 2) // Rotate the entire text 90 degrees counterclockwise
  context.textAlign = 'center'
  context.font = `bolder 16px ${FONT_NAME.ONOTFB}`
  context.fillStyle = 'red'

  const count = name!.length

  if (count > 1 && count === 2) {
    // If there are 2 characters, place them at specific angles
    const angle1 = (135 * Math.PI) / 180
    const angle2 = (225 * Math.PI) / 180

    drawRotatedText(context, name![0], angle1, 40, 0)
    drawRotatedText(context, name![1], angle2, 40, 0)
  } else {
    const startAngle = count === 1 ? (180 * Math.PI) / 180 : (45 * Math.PI) / 180
    const endAngle = (315 * Math.PI) / 180

    const totalAngle = endAngle - startAngle
    const angle = totalAngle / (count - 1) // Adjusted for even spacing

    if (count === 1) {
      drawRotatedText(context, name![0], startAngle, 40, 0)
    } else {
      for (let i = 0; i < count; i++) {
        const rotationAngle = startAngle + angle * i
        drawRotatedText(context, name![i], rotationAngle, 40, 0)
      }
    }
  }

  context.restore()
}

const drawRotatedText = (
  context: CanvasRenderingContext2D,
  text: string,
  rotationAngle: number,
  translateX: number,
  translateY: number
): void => {
  context.save()
  context.rotate(rotationAngle)
  context.translate(translateX, translateY)
  context.rotate(Math.PI / 2)
  context.fillText(text, 0, 5)
  context.restore()
}

export const generatePersonalSeal = (txt: string) => {
  const count = txt.length
  const seals: string[] = []
  if ([1, 2].includes(count)) {
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personalEllipse(txt, 0, i, 0)
      seals.push(seal)
    })
  }
  if ([3].includes(count)) {
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personalEllipse(txt, 0, i, 0)
      seals.push(seal)
    })
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personalEllipse(txt, 0, i, 1)
      seals.push(seal)
    })
  }
  if ([4].includes(count)) {
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personalEllipse(txt, 0, i, 1)
      seals.push(seal)
    })
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personal(txt, 0, i, 1, 0)
      seals.push(seal)
    })
  }
  if ([5, 6, 7, 8, 9].includes(count)) {
    ;[0, 1, 2, 3].forEach((i) => {
      const seal = FXQ.personal(txt, 0, i, 1, 0)
      seals.push(seal)
    })
  }
  return seals
}

export const generateCompanySeal = (txt: string) => {
  const count = txt.length
  const seals: string[] = []
  ;[1, 2].forEach(() => {
    const seal = companySeal({ type: 'dot', companyName: txt, bold: true })
    seals.push(seal)
  })
  ;[1, 2].forEach(() => {
    const seal = companySeal({ type: 'star', companyName: txt, bold: true })
    seals.push(seal)
  })
  ;[1, 2].forEach(() => {
    const seal = companySeal({ type: 'dot', companyName: txt, bold: false })
    seals.push(seal)
  })
  ;[1, 2].forEach(() => {
    const seal = companySeal({ type: 'star', companyName: txt, bold: false })
    seals.push(seal)
  })
  return seals
}
