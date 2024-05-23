'use server'
import axios from '@/services/axios'
import { ICommentListRequest, ICreateComment } from '@/types/comments.type'
import { IResponse } from '@/types/response.types'

const ENDPOINT = '/comments'

export async function getCommentsList(params: ICommentListRequest) {
	const { data } = await axios.get(`${ENDPOINT}`, {
		params: {
			...params
		}
	})
	return data
}

export async function createComment(body: ICreateComment) {
	const res = await axios.post(`${ENDPOINT}`, { ...body })
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function deleteComment(id: number | string) {
	const res = await axios.delete(`${ENDPOINT}/${id}`)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function reportComment(body: object) {
	const res = await axios.post(`/reports/`, body)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function undoReportComment(id: number) {
	const res = await axios.delete(`/reports/${id}`)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}

export async function updateComment(reqData: { id: string | number, data: { comment: string, status: string } }) {
	const res = await axios.put(`${ENDPOINT}/${reqData.id}`, reqData.data)
	const { data, error }: IResponse = res
	return {
		data,
		error
	}
}