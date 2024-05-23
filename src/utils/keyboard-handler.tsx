import { useEffect } from 'react'

interface KeyboardHandlerProps {
  onKeyboardShow: () => void
  onKeyboardHide: () => void
}

const KeyboardHandler = ({ onKeyboardShow, onKeyboardHide }: KeyboardHandlerProps) => {
  useEffect(() => {
    const handleResize = () => {
      // Check if the virtual keyboard is open based on the window height
      const isKeyboardVisible = window.innerHeight < window.outerHeight

      if (isKeyboardVisible) {
        onKeyboardShow()
      } else {
        onKeyboardHide()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onKeyboardShow, onKeyboardHide])

  return null
}

export default KeyboardHandler
