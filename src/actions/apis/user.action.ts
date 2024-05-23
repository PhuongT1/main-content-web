'use client'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { IUser } from '@/types/user.type'

const ENDPOINT = '/users'
export const getUserProfile = async (): Promise<IUser> => {
  const { data } = await axios.get(`${ENDPOINT}/my-profile`)
  return data?.data
}

export async function updateUserProfile(submitData: any) {
  const res = await axios.put(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function updatePartialUserProfile(submitData: any) {
  const res = await axios.patch(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function deleteUserProfile() {
  const res = await axios.delete(`${ENDPOINT}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function checkEmailExists(email: string) {
  const res = await axios.get(`${ENDPOINT}/check-exists-email?email=${email}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function checkUsernameExists(username: string) {
  const res = await axios.get(`${ENDPOINT}/check-exists-username?username=${username}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function checkPhoneNumberExists(phone: string) {
  const res = await axios.get(`${ENDPOINT}/check-exists-phone?phoneNumber=${phone}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
