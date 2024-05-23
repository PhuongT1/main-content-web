import { useState } from 'react'

export const useLoading = (defaultValue = false) => {
  const [loading, setLoading] = useState(defaultValue)

  const showLoading = () => {
    setLoading(true)
  }

  const hideLoading = () => {
    setLoading(false)
  }

  return { loading, showLoading, hideLoading }
}
