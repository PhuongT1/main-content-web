'use client'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { TResponseInfinite } from '@/types/types.type'
import { GetProjectExplorersPayload } from './get-project-explorers-my-projects.use-cases'
import { IMyProject } from '../domain'

const ENDPOINT = '/project-part/project-explorers'

export const getListParticipatingProject = async (
  params: GetProjectExplorersPayload
): Promise<TResponseInfinite<IMyProject>> => {
  const res = await axios.get(`${ENDPOINT}`, { params })
  const { data, error }: IResponse = res
  if (error) throw error
  return data.data
}
