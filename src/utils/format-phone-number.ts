export const formatPhoneNumber = (value: string) => {
  if (!value) return
  let phoneNumber = value.split('-').join('')
  if (phoneNumber.length >= 4 && phoneNumber.length < 8) {
    phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3)
    return phoneNumber
  } else if (phoneNumber.length >= 8) {
    phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3)
    phoneNumber = phoneNumber.substring(0, 8) + '-' + phoneNumber.substring(8)
    return phoneNumber
  }
  return value
}
