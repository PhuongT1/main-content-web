'use client'
import { getCookieAuth, getCookiesAccessToken } from '@/actions/cookies.action'
import { emailVerifyAtom } from '@/atoms/email-verify'
import { loadingAtom } from '@/atoms/loading'
import { verifyEmail } from '@/services/auth.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import LinkExpired from '../(auth)/_components/link-expired'

const VerifyEmail = () => {
  const router = useRouter()
  const setLoading = useSetRecoilState(loadingAtom)
  const setEmailVerify = useSetRecoilState(emailVerifyAtom)
  const [showExpiredNoti, setShowExpiredNoti] = useState<boolean>(false)
  const query = new URLSearchParams(useSearchParams())

  async function checkVerifyToken() {
    setLoading(true)

    if (query.get('token') === null) {
      setLoading(false)
      router.replace('/sign-in')
    } else {
      const { data, error } = await verifyEmail({
        token: query.get('token') as string
      })

      if (data && error === undefined) {
        setLoading(false)
        if ((await getCookieAuth()).accessToken) {
          router.replace('/me')
        } else {
          router.replace('/sign-in')
          setEmailVerify(true)
        }
      } else {
        setLoading(false)
        setShowExpiredNoti(true)
      }
    }
  }

  const handleLinkExpired = async () => {
    const token = await getCookiesAccessToken()

    if (token) {
      router.replace('/me')
    } else {
      router.replace('/sign-in')
    }
  }

  useEffect(() => {
    checkVerifyToken()
  }, [])

  return <>{showExpiredNoti && <LinkExpired buttonTitle=' 로그인 페이지로 이동하기' onClick={handleLinkExpired} />}</>
}

export default VerifyEmail
