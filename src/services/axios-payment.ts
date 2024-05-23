import { getCookieAuth, removeCookieAuth, setCookieAuth } from '@/actions/cookies.action'
import { AUTH_PATH, PUBLIC_PATHS } from '@/constants/common.constant'
import { ERROR_DIALOG_TYPE } from '@/hooks/use-error-dialog'
import { EMITTERS, errorDialogEmitter } from '@/libs/mitt/common.mitt'
import UserManager from '@/types/classes/user-manager.class'
import { jwtVerification } from '@/utils/jwt-verification'
import { isServer } from '@/utils/types'
import axios from 'axios'
import { RedirectType, redirect } from 'next/navigation'
import { getLang, getToken } from './axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showErrorDialog?: boolean
  }
}

const axiosPayment = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'kr'
  }
})

axiosPayment.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    const lang = await getLang()
    //Return if have authorization
    if (!!config?.headers?.Authorization) return config
    //Attach jwt token
    if (token && jwtVerification(token)) {
      config.headers!['Authorization'] = 'Bearer ' + token
    }
    //Attach language
    if (lang) {
      config.headers!['Accept-Language'] = lang
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosPayment.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (
      originalConfig?.url !== '/authentication/admin-login' &&
      originalConfig?.url !== '/auth/access-token' &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        const userManager = UserManager.getInstance()
        if (isServer()) {
          try {
            const { refreshToken } = await getCookieAuth()
            if (refreshToken && jwtVerification(refreshToken)) {
              const rs = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/auth/access-token', {
                headers: {
                  Authorization: 'Bearer ' + refreshToken
                }
              })
              const { data } = rs.data

              if (data) {
                // TokenService.updateLocalAccessToken(data.accessToken)
                await setCookieAuth({
                  accessToken: data.accessToken,
                  refreshToken
                })
              }
              return axiosPayment(originalConfig)
            } else {
              // TokenService.removeAuth()
              await removeCookieAuth()
              redirect('/sign-in', RedirectType.replace)

              // return Promise.resolve({ error: err.response?.data?.error })
            }
          } catch (_error) {
            console.log('_error', _error)

            // TokenService.removeAuth()
            await removeCookieAuth()
            redirect('/sign-in', RedirectType.replace)

            // return Promise.resolve(_error)
          }
        } else {
          if (!AUTH_PATH.concat(PUBLIC_PATHS).includes(window.location.pathname)) {
            try {
              const refreshToken = userManager.getToken()?.refreshToken
              if (refreshToken && jwtVerification(refreshToken)) {
                const rs = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/auth/access-token', {
                  headers: {
                    Authorization: 'Bearer ' + refreshToken
                  }
                })
                const { data } = rs.data

                if (data) {
                  const jwtToken = { accessToken: data.accessToken, refreshToken }
                  userManager.setToken(jwtToken)
                  setCookieAuth(jwtToken)
                }
                return axiosPayment(originalConfig)
              } else {
                await removeCookieAuth()
                window.location.href = '/sign-in'

                return Promise.resolve({ error: err.response?.data?.error })
              }
            } catch (_error) {
              // CometChat.CometChat.logout()
              await removeCookieAuth()

              window.location.href = '/sign-in'

              return Promise.resolve(_error)
            }
          }
        }
      }
    }
    if (originalConfig?.showErrorDialog && err?.response?.data?.error?.isShow) {
      errorDialogEmitter.emit(EMITTERS.ERROR_DIALOG, {
        msg: err?.response?.data?.error?.message || '',
        type: ERROR_DIALOG_TYPE.ERROR
      })
    }
    return Promise.reject({ error: err.response?.data?.error })
  }
)

export default axiosPayment
