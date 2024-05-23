'use client'
import Button from '@/elements/button'
import Input from '@/elements/custom-input'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { IEducation } from '@/types/pool.type'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CareerItem from '../../../talent-pool/_components/CareerItem'

export enum USER_DEGREE {
	COMPLETED = '수료',
	BACHELOR = '학사',
	MASTER = '석사',
	DOCTOR = '박사',
	ENGINEER = '졸업 예정'
}

const DEGREE_LIST = ['COMPLETED', 'BACHELOR', 'MASTER', 'DOCTOR', 'ENGINEER']

interface IEducationForm extends IEducation {
	listId: number
}

const EducationSection = forwardRef(({ defaultValue }: any, ref) => {
	const theme = useTheme()
	const mdUp = useMediaQuery('(min-width: 768px)')
	const datePickerRef = useRef<any>()
	const [degreeValue, setDegreeValue] = useState<keyof typeof USER_DEGREE | ''>('')
	const [schoolName, setSchoolName] = useState<string>('')
	const [startDateAt, setStartDateAt] = useState<string>('')
	const [endDateAt, setEndDateAt] = useState<string>('')
	
	const [educationList, setEducationList] = useState<IEducationForm[]>([])
	const [major, setMajor] = useState<string>('')
	
	useEffect(() => {
		if (educationList.length === 0) {
			let newList: IEducationForm[] = []
			defaultValue.forEach((i: IEducationForm) => {
				let newItem = { ...i, listId: newList.length }
				newList.push(newItem)
			})
			setEducationList(newList)
		}
	}, [defaultValue])
	
	const submitCreate = () => {
		if (validate()) {
			return
		}
		const newEducation = {
			listId: educationList.length,
			schoolName: schoolName,
			majors: major,
			startDateAt: startDateAt,
			endDateAt: endDateAt,
			degree: degreeValue,
			degreeKr: USER_DEGREE[degreeValue as keyof typeof USER_DEGREE]
		}
		let newEducationList = [...educationList]
		newEducationList.push(newEducation as IEducationForm)
		setEducationList(newEducationList)
		resetForm()
	}
	
	const validate = () => {
		return !schoolName || !major || !startDateAt || !endDateAt || !degreeValue
	}
	
	const resetForm = () => {
		setSchoolName('')
		setStartDateAt('')
		setEndDateAt('')
		setMajor('')
		setDegreeValue('')
		datePickerRef?.current?.resetDatePicker()
	}
	
	const removeEducation = (listId: number) => {
		let newEducationList = [...educationList].filter((i) => i.listId !== listId)
		setEducationList(newEducationList)
	}
	
	useImperativeHandle(ref, () => (
		{
			getData: () => {
				let newEducation = null
				if (!validate()) {
					newEducation = {
						listId: educationList.length,
						schoolName: schoolName,
						majors: major,
						startDateAt: startDateAt,
						endDateAt: endDateAt,
						degree: degreeValue,
						degreeKr: USER_DEGREE[degreeValue as keyof typeof USER_DEGREE]
					}
				}
				
				let newEducationList = [...educationList]
				if (!!newEducation) {
					newEducationList.push(newEducation as IEducationForm)
				}
				let submitEducationList = [...newEducationList].map((i) => (
					{
						id: !!i.id ? i.id : undefined,
						schoolName: i.schoolName,
						majors: i.majors,
						startDateAt: i.startDateAt,
						endDateAt: i.endDateAt,
						degree: i.degree,
						degreeKr: i.degreeKr
					}
				))
				resetForm()
				return submitEducationList
			}
		}
	))
	
	return (
		<Box mt={6}>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate="subtitle_1_semibold" mb={2}>
				학력
			</Typography>
			<Grid container spacing={3}>
				<Grid item lg={3} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						학교명
					</Typography>
					<Input
						type="text"
						name="schoolName"
						placeholder="학교 이름을 입력해주세요 (ex.슘페터 대학교)"
						label="schoolName"
						value={schoolName}
						onChange={(e) => {
							setSchoolName(e.target.value)
						}}
						fullWidth
					/>
				</Grid>
				<Grid item lg={3} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						전공
					</Typography>
					<Input
						value={major}
						onChange={(e) => {
							setMajor(e.target.value)
						}}
						type="text"
						name="majors"
						placeholder="전공을 입력해주세요 (ex. 국문학과)"
						label="majors"
						fullWidth
					/>
				</Grid>
				<Grid item lg={3} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						재학기간
					</Typography>
					{/* <DatePickerSelect
					 ref={datePickerRef}
					 type='year'
					 placeholder='재학 기간 선택'
					 onSubmit={(start: Date, end: Date) => {
					 setStartDateAt(moment(start).format('YYYY-MM-DD'))
					 setEndDateAt(moment(end).format('YYYY-MM-DD'))
					 }}
					 /> */}
				</Grid>
				<Grid item lg={3} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						졸업형태
					</Typography>
					<Select
						placeholder="졸업 형태 선택"
						displayEmpty
						value={degreeValue}
						onChange={(e) => {
							setDegreeValue(e.target.value as keyof typeof USER_DEGREE)
						}}
						fullWidth
						renderValue={(value) => {
							if (!value) {
								return (
									<Typography cate="body_3" color={theme.palette.main_grey.gray300}>
										졸업 형태 선택
									</Typography>
								)
							}
							return (
								<Box display={'flex'} alignItems={'center'}>
									<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
										{USER_DEGREE[value as keyof typeof USER_DEGREE]}
									</Typography>
								</Box>
							)
						}}
						// onChange={updateCountry}
					>
						{DEGREE_LIST.map((i, index) => (
							<MenuItem value={i} key={index}>
								{USER_DEGREE[i as keyof typeof USER_DEGREE]}
							</MenuItem>
						))}
					</Select>
				</Grid>
			</Grid>
			<Box display="flex" width="100%" justifyContent={'flex-end'} mt={2} mb={4}>
				<Button
					customTitle={<Typography cate="caption_1_semibold">학력 추가</Typography>}
					cate={'outlined'}
					onClick={submitCreate}
					customSize={'sm'}
					customType={'active'}
					sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
					rounded
				/>
			</Box>
			{educationList.length > 0 && (
				<Grid container spacing={1}>
					{educationList.map((item) => {
						return (
							<Grid item xs={12} key={item.listId}>
								<CareerItem
									title={`${item.schoolName} / ${item.majors} / ${item.degreeKr}`}
									period={`${moment(item.startDateAt, 'YYYY-MM-DD')
										.format('YYYY.MM')} ~ ${moment(
										item.endDateAt,
										'YYYY-MM-DD'
									)
										.format('YYYY.MM')}`}
									onClose={() => {
										removeEducation(item.listId)
									}}
								/>
							</Grid>
						)
					})}
				</Grid>
			)}
		</Box>
	)
})

EducationSection.displayName = 'EducationSection'
export default EducationSection
