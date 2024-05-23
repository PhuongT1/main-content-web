import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import {
  IConfigsColors,
  IConfigsFonts,
  IDataPostEditIR,
  IDataPostEditIRResult,
  IConfigsIRDeckProject
} from '@/types/edit-ir.type'

const ENDPOINT = '/project-part/ir-deck-configs'

export const getConfigsColors = async (): Promise<IConfigsColors> => {
  const res = await axios.get(`${ENDPOINT}/colors`)
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data
}

export const getConfigsFonts = async (): Promise<IConfigsFonts> => {
  const res = await axios.get(`${ENDPOINT}/fonts`)
  const { data, error }: IResponse = res
  if (error) throw error
  return data
}

export const saveEditIR = async (params: IDataPostEditIR) => {
  const { data } = await axios.post<IDataPostEditIRResult>(`${ENDPOINT}`, params)
  return data as IDataPostEditIRResult
}

export const getConfigsIRDeckProject = async (params?: number): Promise<IConfigsIRDeckProject> => {
  const res = await axios.get(`${ENDPOINT}/project/${params}`)
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data
}
