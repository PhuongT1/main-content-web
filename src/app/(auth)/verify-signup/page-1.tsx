'use client'
import { getCookiesAccessToken } from '@/actions/cookies.action'
import { loadingAtom } from '@/atoms/loading'
import { logout, verifyAccount } from '@/services/auth.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import LinkExpired from '../_components/link-expired'

const VerifySignUp = () => {
  const query = new URLSearchParams(useSearchParams())
  const router = useRouter()
  const setLoading = useSetRecoilState(loadingAtom)
  // const setAuthVerify = useSetRecoilState(authVerifyAtom)
  const [showExpiredNoti, setShowExpiredNoti] = useState<boolean>(false)

  async function checkVerifyToken() {
    setLoading(true)

    if (!Boolean(query.get('token'))) {
      setLoading(false)
      router.push('/sign-in')
      return
    }

    const { data, error } = await verifyAccount({
      token: query.get('token') || ''
    })

    if (data && error === undefined) {
      setLoading(false)
      // setAuthVerify(true)
      router.push('/sign-in')
    } else {
      setLoading(false)
      setShowExpiredNoti(true)
    }
  }

  const handleLinkExpired = async () => {
    const token = await getCookiesAccessToken()

    if (token) {
      await logout()
    }

    router.replace('/sign-up')
  }

  useEffect(() => {
    checkVerifyToken()
  }, [])

  return <>{showExpiredNoti && <LinkExpired onClick={handleLinkExpired} />}</>
}

export default VerifySignUp
