import { IResponse } from '@/types/response.types'
import {
  ITeamBuilding,
  ITeamBuildingListRequest,
  Recruitment,
  TEAM_BUILDING_RECRUITMENT_STATUS
} from '@/types/team-building.type'
import { Metadata, PaginationPayload } from '@/types/types.type'
import axios from './axios'

const ENDPOINT = '/team-building'
export interface ITeamBuildingResponse {
  data: any
  error: any
}

export interface ISendContactTeamBuilding {
  name?: string
  attachmentId?: string | number
  email?: string
  phoneNumber?: string
  note?: string
}

export async function getUserTeamBuilding(): Promise<ITeamBuilding | any> {
  return await axios.get<any>(`${ENDPOINT}/me`)
}

export async function getTeamBuildingById(id: string | number): Promise<ITeamBuildingResponse> {
  const res = await axios.get<any>(`${ENDPOINT}/` + id)
  const { data, error }: IResponse = res
  return {
    data: data?.data as ITeamBuilding,
    error: error
  }
}

export type CreateTeamPayload = {
  name: string
  slogan: string
  introduction: string
  productOrService: string[]
  thumbnailId?: number
  activityImages?: {
    id: number
  }[]
  awardHistory: string[]
  description: string
  members: {
    avatarId?: number
    name: string
    introduction: string
    categories: {
      id: number
    }[]
  }[]
}

export async function createUserTeamBuilding(submitData: CreateTeamPayload) {
  const res = await axios.post<any>(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data: data?.data as ITeamBuilding,
    error
  }
}

export async function updateUserTeamBuilding({ id, payload }: { id: number; payload: Partial<CreateTeamPayload> }) {
  const res = await axios.patch(`${ENDPOINT}/${id}`, payload)
  const { data, error }: IResponse = res
  return {
    data: data?.data as ITeamBuilding,
    error
  }
}

export async function sendContactTeamBuilding(reqData: {
  submitData: ISendContactTeamBuilding
  id: number | string
  recruitId: number | string
}) {
  const res = await axios.post<any>(
    `${ENDPOINT}/${reqData.id}/recruit/${reqData.recruitId}/contacts`,
    reqData.submitData
  )
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function getTeamBuildingList(params: ITeamBuildingListRequest) {
  const { data } = await axios.get(`${ENDPOINT}`, {
    params: {
      ...params
    }
  })
  return data
}

export type CreateRecruitmentPayload = {
  categoryId: number
  description: string
  skills: string[]
  numberOfRecruits: number
  fromDate: string
  toDate: string
  status: TEAM_BUILDING_RECRUITMENT_STATUS
}

export async function createRecruitment({ id, payload }: { id: number; payload: CreateRecruitmentPayload }) {
  const res = await axios.post(`${ENDPOINT}/${id}/recruit`, payload)
  const { data, error }: IResponse = res
  return {
    data: data.data as Recruitment,
    error
  }
}

export async function getRecruitmentList({ id, params }: { id: number; params: PaginationPayload }) {
  const res = await axios.get(`${ENDPOINT}/${id}/recruit`, {
    params: params
  })
  const { data, error }: IResponse = res
  return {
    data: data.data as { metaData: Metadata; result: Recruitment[] },
    error
  }
}

export async function getRecruitmentDetail({
  teambuildingId,
  recruitId
}: {
  teambuildingId: number
  recruitId: number
}) {
  const res = await axios.get(`${ENDPOINT}/${teambuildingId}/recruit/${recruitId}`)
  const { data, error }: IResponse = res
  return {
    data: data.data as Recruitment,
    error
  }
}

export async function updateRecruitment({
  id,
  recruitId,
  payload
}: {
  id: number
  recruitId: number
  payload: { status?: TEAM_BUILDING_RECRUITMENT_STATUS } & Partial<CreateRecruitmentPayload>
}) {
  const res = await axios.patch(`${ENDPOINT}/${id}/recruit/${recruitId}`, payload)
  const { data, error }: IResponse = res
  return {
    data: data.data as Recruitment,
    error
  }
}
