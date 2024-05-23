import { getCookieAuth, getCookiesToken, setCookieAuth } from '@/actions/cookies.action'
import UserManager from '@/types/classes/user-manager.class'
import { JwtToken } from '@/types/user.type'
import { useCallback, useEffect, useState } from 'react'

export const useAuth = () => {
  const [jwtToken, setJwtToken] = useState<JwtToken | undefined>()
  const userManager = UserManager.getInstance()
  const storedJwtToken = undefined

  const getData = useCallback(async () => {
    // const jwtToken = await getCookieAuth()
    const jwtToken = await getCookiesToken()
    console.log(jwtToken)
    const token = jwtToken?.accessToken && jwtToken?.refreshToken ? (jwtToken as JwtToken) : undefined
    console.log('Get jwt form server', token)
    setJwtToken(token)
    userManager.setToken(token)
  }, [])

  const changeJwtToken = useCallback(async (jwt: JwtToken) => {
    await setCookieAuth(jwt)
    getData()
  }, [])

  useEffect(() => {
    const storedToken = userManager.getToken()
    if (storedToken) {
      setJwtToken(storedToken)
    } else {
      getData()
    }
  }, [storedJwtToken])

  return { jwtToken, changeJwtToken }
}
