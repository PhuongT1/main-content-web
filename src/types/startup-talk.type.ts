import { ICategory } from "./category.type";
import { IFile, IUser } from "./user.type";


export interface IStartupTalk {
    id: number;
    uuid: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    status: string;
    categoryId: number;
    title: string;
    content: string;
    isHot: boolean;
    isAnonymous: boolean;
    totalView: number;
    totalBookmark: number;
    totalComment: number;
    totalViewByDay: number;
    totalCommentByDay: number;
    totalReport: number;
    userId: number;
    category: ICategory;
    user: IUser;
    isBookmark: boolean;
    isReport: boolean;
}


export interface IStartupTalkCreate {
    title: string
    categoryId: number,
    status: string,
    content: string,
    isAnonymous: boolean,
}


export interface IStartupTalkListRequest {
    categoryId?: string,
    keyword?: string
    page?: number | string
    limit?: number | string
    currentId?: number | string
    listType?: string
}
