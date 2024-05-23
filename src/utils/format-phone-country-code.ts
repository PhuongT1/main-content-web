export const formatPhoneCountryCode = (value: string) => {
  const countryCode = '+82'
  const newPhoneNumber = value.substring(1, value.length)
  return countryCode + newPhoneNumber
}
