import { atom } from 'recoil'

interface IUserProfile {
  emailTouched: boolean
  phoneNumberTouched: boolean
  emailValidateSuccess: boolean
  phoneValidateSuccess: boolean
  pendingPhoneValidate: boolean
  enableResend: boolean
  otpSended: boolean
  enableOtpVerify: boolean
  otpSubmitValid: boolean | null
  orgEmail: string
  orgPhoneNumber: string
  resendOtp: boolean
}

export const userProfileAtom = atom<IUserProfile>({
  key: 'userProfileAtom',
  default: {
    emailTouched: false,
    phoneNumberTouched: false,
    emailValidateSuccess: false,
    phoneValidateSuccess: false,
    pendingPhoneValidate: false,
    enableResend: false,
    otpSended: false,
    enableOtpVerify: false,
    otpSubmitValid: null,
    orgEmail: '',
    orgPhoneNumber: '',
    resendOtp: false
  }
})
