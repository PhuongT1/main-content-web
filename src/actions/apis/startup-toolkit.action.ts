'use server'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { RefenrentRoomDetail, ReferenceRoom } from '@/types/startup/toolkit.type'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'

const ENDPOINT = '/data-rooms'

export const getReferenceRoomList = async <T>(
	params: T
): Promise<{ data: { metaData: Metadata; result: ReferenceRoom[] } }> => {
	const { data } = await axios.get<any>(`${ENDPOINT}/active`, {
		params: {
			...params
		}
	})
	return {
		data: data?.data as { metaData: Metadata; result: ReferenceRoom[] }
	}
}

export const getReferenceRoomById = async (id: number): Promise<{
	data: RefenrentRoomDetail;
	error: AxiosError
}> => {
	const res = await axios.get(`${ENDPOINT}/active/${id}`)
	const { data, error }: IResponse = res
	return {
		data: data?.data as RefenrentRoomDetail,
		error: error as AxiosError
	}
}