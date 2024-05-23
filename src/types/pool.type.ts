import { TImage } from './types.type'
import { IFile, IUser } from './user.type'

export enum Degree {
	COMPLETED = 'COMPLETED', //"수료",
	BACHELOR = 'BACHELOR', //"학사",
	MASTER = 'MASTER', //"석사",
	DOCTOR = 'DOCTOR', //"박사",
	ENGINEER = 'ENGINEER' //"엔지니어",
}

export interface IEducation {
	id: number;
	uuid: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: null;
	schoolName: string;
	majors: string;
	schoolType: string;
	graduationType: string;
	startDateAt: string;
	endDateAt: string;
	isCurrentlyStudying: boolean;
	degree: string;
	degreeKr: string;
	userId: number;
	portfolioId: number;
	yearsOfStudy: number;
}

export interface IExperience {
	id: number;
	uuid: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: null;
	companyName: string;
	undertaking: string;
	startDateAt: string;
	endDateAt: string;
	isCurrentlyWorking: boolean;
	userId: number;
	portfolioId: number;
	yearsOfExperience: number;
}

export interface IProject {
	id?: number
	projectName: string
	projectOwner: string
	relatedLink: string
	relatedLinks: string[]
	description: string
	startDateAt: string
	endDateAt: string
}

export interface Occupation {
	id: number
	uuid: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	status: string
	type: string
	subType: string
	name: string
	code: string
	note: string
	order: null
	isEditable: boolean
}

export interface IPool {
	id: number
	uuid: string
	createdAt: string
	updatedAt: string
	deletedAt: null
	userId: number
	status: string
	urls: any[]
	introduction: string
	location: string
	city: string
	district: string
	title: string
	yearsOfExperience: number
	skills: string[]
	isPublic: boolean
	isFresher: boolean,
	totalFavorites: number
	totalBookmark: number
	totalContacted: number
	isBookmark: boolean
	schools: any[]
	experiences: IExperience[]
	projects: IProject[]
	files: IFile[]
	user: IUser
	occupations: Occupation[]
	jobTitles: any[]
}

export interface IPoolListRequest {
	categoryId?: number
	keyword?: string
	page?: number | string
	limit?: number | string
}

/* Occupation Category Interface */
export interface IOccupation {
	id: number
	uuid: string
	createdAt: Date
	updatedAt: Date
	deletedAt: null
	status: string
	type: string
	subType: string
	name: string
	code: string
	note: string
	order: null
	isEditable: boolean
	totalItems: number
}

/* Talent pool submit form interface */
export interface TalentPoolForm {
	occupations: File[]
	title: string
	schools: SchoolForm[]
	experiences: ExperienceForm[]
	skills: string[]
	projects: ProjectForm[]
	files: { value: TImage, formId: string }[]
	urls: { value: string, isSubmit: boolean, formId: string }[]
	city: string
	district: string
	location: string
	introduction: string
	isPublic: boolean,
	isFresher: boolean
}

export interface ExperienceForm {
	companyName: string
	undertaking: string
	startDateAt: string
	endDateAt: string
	isCurrentlyWorking: boolean
}

export interface File {
	id: number
}

export type ProjectForm = IProject & {
	formId?: string
}

export interface SchoolForm {
	schoolName: string
	schoolType: string
	graduationType: string
	majors: string
	startDateAt: string
	endDateAt: string
	isCurrentlyStudying: boolean
}

export interface ITalentContact {
	id: number
	uuid: string
	createdAt: Date
	updatedAt: Date
	deletedAt: null
	status: string
	userId: number
	fromUserId: null
	fromUserEmail: string
	fromUsername: string
	fromUserPhoneNumber: string
	message: string
	toUserId: number
	portfolioId: number
	talentPool: ITalentProfile
	user: IUser
	no: number
}

export interface ITalentProfile {
	id: number;
	uuid: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: null;
	userId: number;
	status: string;
	urls: any[];
	introduction: string;
	location: string;
	city: string;
	district: string;
	title: string;
	yearsOfExperience: number;
	skills: string[];
	isPublic: boolean;
	isFresher: boolean;
	totalFavorites: number;
	totalBookmark: number;
	totalContacted: number;
	isBookmark: boolean;
	schools: IEducation[];
	experiences: IExperience[];
	projects: any[];
	files: any[];
	user: IUser;
	occupations: Occupation[];
}