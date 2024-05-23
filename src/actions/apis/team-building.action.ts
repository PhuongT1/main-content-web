'use server'
import axios from '@/services/axios'
import { getUserTeamBuilding } from '@/services/team-building.service'
import { IResponse } from '@/types/response.types'
import { Applications, ITeamBuilding, MyApplication } from '@/types/team-building.type'
import { Metadata, PaginationPayload, TImage } from '@/types/types.type'
import { convertFormData } from '@/utils/object'
import { AxiosError } from 'axios'

const ENDPOINT = '/team-building'

export const getTeamBuildingServer = async () => {
  const res = await getUserTeamBuilding()
  const { data, error }: IResponse = res
  return {
    data: data?.data as ITeamBuilding<TImage>,
    error: error as AxiosError
  }
}

type GetTeamApplicationsPayload = {
  teambuildingId: number
} & PaginationPayload

export async function getTeamApplications(formData: FormData) {
  const { teambuildingId, page, limit }: GetTeamApplicationsPayload =
    convertFormData<GetTeamApplicationsPayload>(formData)
  const res = await axios.get(`${ENDPOINT}/${teambuildingId}/contacts`, {
    params: {
      page,
      limit
    }
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: Applications[] },
    error: error as AxiosError
  }
}

export async function getMyApplications(formData: FormData) {
  const { page, limit }: PaginationPayload = convertFormData<PaginationPayload>(formData)
  const res = await axios.get(`${ENDPOINT}/my-contact`, {
    params: {
      page,
      limit
    }
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: MyApplication[] },
    error
  }
}

type DeleteMyApplication = {
  teambuildingId: number
  recruitId: number
  applicationId: number
}

export async function deleteMyApplication(formData: FormData) {
  const { teambuildingId, recruitId, applicationId }: DeleteMyApplication =
    convertFormData<DeleteMyApplication>(formData)
  const res = await axios.delete(`${ENDPOINT}/${teambuildingId}/recruit/${recruitId}/contacts/${applicationId}`)
  const { data, error }: IResponse = res
  return {
    message: data?.data?.message as string,
    error: error as AxiosError
  }
}
