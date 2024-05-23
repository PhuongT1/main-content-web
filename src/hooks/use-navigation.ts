'use client'
import { loadingAtom } from '@/atoms/loading'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

interface NavigationEvents {
  routeChanged?: ({ pathname, searchParams }: { pathname: string | null; searchParams: URLSearchParams | null }) => void
  routeChanging?: () => void
}

export const useNavigation = ({ on }: { on?: NavigationEvents }) => {
  const pathname = usePathname()
  const prevPathname = usePrevious(pathname)

  const searchParams = useSearchParams()
  const prevSearchParams = usePrevious(searchParams)

  const { routeChanged, routeChanging } = on || {}
  const [route, setRoute] = useState({ pathname, searchParams })

  useEffect(() => {
    if (searchParams?.toString() !== prevSearchParams?.toString() || pathname !== prevPathname) {
      routeChanging?.()
      setRoute({ pathname, searchParams })
      routeChanged?.({ pathname, searchParams })
    }
  }, [pathname, prevPathname, prevSearchParams, routeChanged, searchParams])

  return { route }
}
