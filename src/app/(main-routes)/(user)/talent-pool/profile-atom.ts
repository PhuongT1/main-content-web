import { ITalentProfile, TalentPoolForm } from '@/types/pool.type'
import { atom } from 'recoil'

export const profileDefaultValue = {
	experiences: [],
	occupations: [],
	skills: [],
	title: '',
	city: '',
	district: '',
	files: [],
	introduction: '',
	location: '',
	projects: [],
	schools: [],
	urls: [],
	isPublic: false,
	isFresher: false
}

export const stepDefaultValue = [
	{ label: '직군', value: 0, isSave: false },
	{ label: '학력', value: 1, isSave: false },
	{ label: '경력', value: 2, isSave: false },
	{ label: '프로젝트', value: 3, isSave: false },
	{ label: '포트폴리오', value: 4, isSave: false },
	{ label: '기타', value: 5, isSave: false }
]

export const submitProfileAtom = atom<TalentPoolForm>({
	key: 'submitProfileAtom',
	default: profileDefaultValue
})

export const profileAtom = atom<ITalentProfile>({
	key: 'profileAtom',
	default: {} as ITalentProfile
})

export const editProfileStep = atom<{ label: string, value: number, isSave: boolean }[]>({
	key: 'editStep',
	default: stepDefaultValue
})