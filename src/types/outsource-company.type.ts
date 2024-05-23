import { ICategory } from "./category.type";
import { IFile, IUser } from "./user.type";


export interface IOutsourceCompany {
    id: number;
    uuid: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    status: string;
    type: string;
    name: string;
    email: string;
    phoneNumber: string;
    ceoName: string;
    homePage: string;
    snsAddress: string;
    urls: string[];
    shortIntroduction: string;
    introduction: string;
    thumbnailId: number;
    thumbnail: IFile;
    attachments: IFile[];
    categories: ICategory[];
    userId: number;
    totalFavorites: number;
    totalBookmark: number;
    totalContact: number;
    totalView: number;
    isBookmark: boolean;
    isFavorite: boolean;
    images: IFile[]
    user: IUser;
}

export interface IOutsourceCompanyListRequest {
    category?: string,
    keyword?: string
    page?: number | string
    limit?: number | string
    keySearch?: string
}
