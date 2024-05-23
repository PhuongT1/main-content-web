'use client'
import { PageParams } from '@/types/types.type'
import { isNumber } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { ComponentType, useEffect } from 'react'

export type ProductDetailProps = {}

/**
 * HOC for detail checking
 */
const ProductDetailWrapper = <P extends PageParams<{ id: string }>>(WrappedComponent: {
  component: ComponentType<P>
  url?: string
}) => {
  const { url, component: Component } = WrappedComponent
  const WithDetailCheck: React.FC<P & ProductDetailProps> = (props) => {
    const router = useRouter()

    const { params: { id } = {} } = props

    useEffect(() => {
      if (!isNumber(id)) {
        url ? router.push(url) : router.back()
      }
    }, [id])

    return <Component {...(props as P)} />
  }

  WithDetailCheck.displayName = `WithDetailCheck(${getDisplayName(Component)})`

  return WithDetailCheck
}

const getDisplayName = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default ProductDetailWrapper
