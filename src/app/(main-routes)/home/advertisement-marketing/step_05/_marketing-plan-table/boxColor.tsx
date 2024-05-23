import { useState, useRef, useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

interface IBoxColor {
  defaultColor?: string
  defaultValue?: string[]
  handleChange: (colors: string[]) => void
}
function BoxColor({ defaultColor = '', defaultValue = [], handleChange }: IBoxColor) {
  const { palette } = useTheme()
  const [colors, setColors] = useState<string[]>(Array(12).fill(''))
  const [selectedRange, setSelectedRange] = useState<number[]>([])
  const startBoxRef = useRef<number | null>(null)

  // =====
  useEffect(() => {
    if (defaultValue?.length > 0) {
      setColors(defaultValue)
    }
  }, [defaultValue])

  const handleBoxLeave = () => setSelectedRange([])
  const handleBoxHover = (index: number) => {
    if (startBoxRef.current !== null) {
      const min = Math.min(startBoxRef.current, index)
      const max = Math.max(startBoxRef.current, index)
      setSelectedRange(Array.from({ length: max - min + 1 }, (_, i) => min + i))
    }
  }

  const handleClick = (index: number) => {
    const newColors = [...colors]

    if (startBoxRef.current === null) {
      newColors[index] = newColors[index] ? '' : defaultColor
      startBoxRef.current = newColors[index] ? index : null
    } else {
      const min = Math.min(startBoxRef.current, index)
      const max = Math.max(startBoxRef.current, index)
      for (let i = min; i <= max; i++) {
        newColors[i] = defaultColor
      }
      startBoxRef.current = null
    }

    setSelectedRange([])
    setColors(newColors)
    handleChange(newColors)
  }

  // =====
  return (
    <Box width='100%' sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {colors.map((color, index) => {
        const isSelected = selectedRange.includes(index)
        const borderWidth = isSelected || colors[index] ? '2.4px' : '2px'
        const borderStyle = `${borderWidth} solid ${palette.home.blue500}`
        const sxBoxWhenHover = {
          '&:hover': { background: palette.home.gray400, boxShadow: `0px 0px 0px 2px ${palette.home.blue500} inset` },
          '&:hover > div': { borderLeft: borderStyle, borderRight: borderStyle }
        }
        const sxBoxWhenHoverDrag = {
          background: palette.home.dark_blue700,
          boxShadow: `0px 2px 0px ${palette.home.blue500} inset, 0px -2px 0px ${palette.home.blue500} inset`,
          ...(selectedRange?.[0] === index && { borderLeft: borderStyle }),
          ...(selectedRange?.[selectedRange?.length - 1] === index && { borderRight: borderStyle })
        }

        return (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              width: 'calc(100% / 12)',
              height: remConvert('64px'),
              borderLeft: `1px solid ${palette.home.gray200}`,
              ...(!isSelected ? sxBoxWhenHover : sxBoxWhenHoverDrag)
            }}
            onMouseLeave={handleBoxLeave}
            onMouseEnter={() => handleBoxHover(index)}
            onClick={() => handleClick(index)}
          >
            <Box
              sx={{
                height: remConvert('30px'),
                margin: remConvert('17px 0'),
                backgroundColor: isSelected ? defaultColor : color
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default BoxColor
