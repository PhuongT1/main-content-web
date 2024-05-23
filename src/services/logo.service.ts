import axios from '@/services/axios'

const ENDPOINT = '/project-part/step-resources'

export async function getLogoColor() {
  const { data } = await axios.get(`${ENDPOINT}/logo-colors`)
  return data
}

export async function getLogoColorDetail(color: string) {
  const { data } = await axios.get(`${ENDPOINT}/logo-colors/detail?colorType=${color}`)
  return data
}

export async function fetchSymbols(params?: any) {
  const { data } = await axios.get(`${ENDPOINT}/logo-colors/fetch-symbols`, { params })
  return data
}

export async function getSymbol(url: any) {
  const { data } = await axios.get(url)
  return data
}
