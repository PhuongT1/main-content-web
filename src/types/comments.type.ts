import { IUser } from './user.type'

export interface IComment {
	id: number
	createdAt: string
	updatedAt?: string
	deletedAt?: string
	status: string
	type: string
	userId: number
	user: IUser
	contentBlogId: number
	comment: string
	totalComment?: number
	uuid?: string;
	startupTalkId?: number;
	parentId?: number;
	totalReport?: number;
	no?: number;
	isReport: boolean
}

export interface ICommentListRequest {
	page?: number | string
	limit?: number | string
	contentBlogId?: number | string
	parentId?: number | string
	startupTalkId?: number | string
}

export interface ICreateComment {
	comment: string
	contentBlogId?: number
	parentId?: number
	startupTalkId?: number
}
