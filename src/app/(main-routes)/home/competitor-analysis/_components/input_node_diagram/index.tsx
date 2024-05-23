import { useState, useEffect, memo, ChangeEvent, InputHTMLAttributes } from 'react'
import { useTheme } from '@mui/material'
import { useReactFlow } from 'reactflow'

const FONT_SIZE = 9
const DEFAULT_INPUT_WIDTH = 90
interface IInputNodeDiagram extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  maxLength?: number
  id: string
  name: string
  isAutoResize?: boolean
}

function InputNodeDiagram({ placeholder, maxLength = 10, id, name, isAutoResize = true, ...rest }: IInputNodeDiagram) {
  const [textValue, setTextValue] = useState('')
  const [inputWidth, setInputWidth] = useState(DEFAULT_INPUT_WIDTH)
  const { setNodes } = useReactFlow()
  const { palette } = useTheme()

  // =====
  useEffect(() => {
    if (!isAutoResize) return
    if (textValue.length * FONT_SIZE > DEFAULT_INPUT_WIDTH) {
      setInputWidth((textValue.length + 1) * FONT_SIZE)
    } else {
      setInputWidth(DEFAULT_INPUT_WIDTH)
    }
  }, [textValue])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      updateData(e, name)
    }
  }

  const updateData = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
    const inputVal = (evt.target as HTMLInputElement).value
    setTextValue(inputVal)
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              [key]: inputVal
            }
          }
        }
        return node
      })
    )
  }

  // =====
  return (
    <input
      maxLength={maxLength}
      placeholder={placeholder || '입력해주세요.'}
      onChange={handleChangeInput}
      style={{ width: isAutoResize ? `${inputWidth}px` : '100%', color: palette.main.gray80 }}
      {...rest}
    />
  )
}

export default memo(InputNodeDiagram)
