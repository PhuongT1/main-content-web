import { JwtPayload, jwtDecode } from 'jwt-decode'
import { AUTH_PATH, COOKIES_KEY, PUBLIC_PATHS } from '@/constants/common.constant'
import { NextRequest, NextResponse } from 'next/server'

enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR'
}
interface TokenData extends JwtPayload {
  role: USER_ROLE
}
const decodeAccessToken = (accessToken?: string): TokenData | undefined => {
  if (!accessToken) {
    return undefined
  }

  try {
    const decodedToken = jwtDecode(accessToken) as TokenData
    return decodedToken
  } catch (error) {
    return undefined
  }
}
const MY_PROJECT = '/project-home'
const OPEN_INNOVATION = '/project-home/open-innovation'

export function middleware(request: NextRequest) {
  const value = process.env.ENV
  const path = request.nextUrl.pathname
  const accessToken = request.cookies.get(COOKIES_KEY.ACCESS_TOKEN)?.value || ''
  const queryParam = request.nextUrl.searchParams

  const decode = decodeAccessToken(accessToken) as TokenData
  const HOME_PATH = decode?.role === USER_ROLE.ADMIN ? OPEN_INNOVATION : MY_PROJECT

  if (queryParam.get('token') && path === '/verify-email') {
    return NextResponse.next()
  }

  if (queryParam.get('token') && ['/reset-password', '/verify-signup', '/verify-email'].includes(path)) {
    return NextResponse.next()
  }

  if (queryParam.get('token') === null && path === '/verify-email') {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }

  if (path === '/reset-password' && queryParam.get('token') === null) {
    return NextResponse.redirect(new URL('/find-password', request.nextUrl))
  }

  if (['/components', '/elements'].includes(path) && value === 'PROD') {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }

  if (!accessToken && AUTH_PATH.concat(PUBLIC_PATHS).every((i) => !path.includes(i))) {
    console.log('im in middleware')
    return NextResponse.redirect(new URL(`/sign-in?from=${encodeURIComponent(path)}`, request.nextUrl))
  }

  if (accessToken && AUTH_PATH.some((i) => path.includes(i))) {
    return NextResponse.redirect(new URL(HOME_PATH, request.nextUrl))
  }

  if (accessToken && path === '/') {
    return NextResponse.redirect(new URL(HOME_PATH, request.nextUrl))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)']
}
