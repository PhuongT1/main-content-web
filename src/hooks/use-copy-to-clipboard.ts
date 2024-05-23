'use client'
import { useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (text) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        return true
      } catch (error) {
        console.log('Copy failed', error)
        setCopiedText(null)
        return false
      }
    } else {
      return false
    }

    // Try to save to clipboard then save it in the state if worked

  }

  return [copiedText, copy]
}
