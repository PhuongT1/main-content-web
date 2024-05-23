'use server'
import { IPool, IPoolListRequest, ITalentContact, TalentPoolForm } from '@/types/pool.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import axios from '@/services/axios'

const ENDPOINT = '/users/portfolio'

export interface IPoolResponse {
	data: any
	error: any
}

export interface ISendContactPool {
	fromNickname?: string
	fromUsername?: string
	fromUserEmail: string
	fromUserPhoneNumber: string
	message: string
}

export async function getUserPool(): Promise<IPool> {
	const { data } = await axios.get(`${ENDPOINT}`)
	return data.data as IPool
}

export async function getPoolById(id: string | number): Promise<IPoolResponse> {
	const res = await axios.get(`${ENDPOINT}/` + id)
	const { data, error }: IResponse = res
	return {
		data: data?.data?.data as IPool,
		error: error
	}
}

export async function createUserPool<T extends object>(submitData: T) {
	const res = await axios.post<any>(`${ENDPOINT}`, submitData)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function updateUserPool(submitData: Partial<TalentPoolForm>) {
	const res = await axios.put<any>(`${ENDPOINT}`, submitData)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function sendContactPool(reqData: { submitData: ISendContactPool; id: number | string }) {
	const res = await axios.post(`${ENDPOINT}/` + reqData.id + '/contact', reqData.submitData)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function getPoolList(params: IPoolListRequest) {
	const { data } = await axios.get(`${ENDPOINT}/list`, {
		params: {
			...params
		}
	})
	return {
		data: data?.data as { metaData: Metadata; result: IPool[] }
	}
}

export async function getMyContact(params: {
	limit: number
	page: number,
	sortBy: string
}): Promise<{ data: { metaData: Metadata; result: ITalentContact[] } }> {
	const { data } = await axios.get(`${ENDPOINT}/my-contact`, {
		params: {
			...params
		}
	})
	return {
		data: data?.data as { metaData: Metadata; result: ITalentContact[] }
	}
}

export async function deleteMyContact(id: number) {
	const res = await axios.delete(`${ENDPOINT}/my-contact/${id}`)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}
