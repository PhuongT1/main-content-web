'use client'
import Add from '@/assets/icons/add'
import Button from '@/elements/button'
import Input from '@/elements/custom-input'
import Typography from '@/elements/typography'
import { IProject } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { urlValidator } from '@/utils/validation'
import { Box, Button as MButton, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import ProjectItem from '../../../_components/ProjectItem'
import { UrlItem } from '../_url-file'

export interface IProjectForm extends IProject {
	listId: number
}

const ProjectSection = forwardRef(({ defaultValue }: any, ref) => {
	const theme = useTheme()
	const mdUp = useMediaQuery('(min-width: 768px)')

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')
	const [tabValue, setTabValue] = useState<number>(1)
	const [selectOpen, setSelectOpen] = useState<boolean>(false)

	const datePickerRef = useRef<any>()
	const [projectName, setProjectName] = useState<string>('')
	const [startDateAt, setStartDateAt] = useState<string>('')
	const [endDateAt, setEndDateAt] = useState<string>('')
	const [projectOwner, setProjectOwner] = useState<string>('')
	const [relatedLink, setRelatedLink] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [showUrl, setShowUrl] = useState<boolean>(false)
	const [projectList, setProjectList] = useState<IProjectForm[]>([])
	const [urlError, setUrlError] = useState<boolean>(false)

	useEffect(() => {
		if (projectList.length === 0) {
			let newList: IProjectForm[] = []
			defaultValue.forEach((i: IProjectForm) => {
				let newItem = { ...i, listId: newList.length }
				newList.push(newItem)
			})
			setProjectList(newList)
		}
	}, [defaultValue])

	const submitCreate = () => {
		if (validate()) {
			return
		}
		const newProject = {
			listId: projectList.length,
			projectName: projectName,
			projectOwner: projectOwner,
			startDateAt: startDateAt,
			endDateAt: endDateAt,
			relatedLink: !!relatedLink ? relatedLink : undefined,
			description: description
		}
		let newProjectList = [...projectList]
		newProjectList.push(newProject as IProjectForm)
		setProjectList(newProjectList)
		resetForm()
	}

	const validate = () => {
		console.log(!!relatedLink && !urlValidator(relatedLink))

		if (!!relatedLink && !urlValidator(relatedLink)) {
			setUrlError(true)
		}
		return (
			!projectName ||
			!projectOwner ||
			!startDateAt ||
			!endDateAt ||
			!description ||
			(
				!!relatedLink && !urlValidator(relatedLink)
			)
		)
	}

	const resetForm = () => {
		setProjectName('')
		setStartDateAt('')
		setEndDateAt('')
		setProjectOwner('')
		setDescription('')
		setRelatedLink('')
		setShowUrl(false)
		datePickerRef?.current?.resetDatePicker()
	}

	const removeProject = (listId: number) => {
		let newProjectList = [...projectList].filter((i) => i.listId !== listId)
		setProjectList(newProjectList)
	}

	useImperativeHandle(ref, () => (
		{
			getData: () => {
				let newProject = null
				if (!validate()) {
					newProject = {
						listId: projectList.length,
						projectName: projectName,
						projectOwner: projectOwner,
						startDateAt: startDateAt,
						endDateAt: endDateAt,
						relatedLink: !!relatedLink ? relatedLink : undefined,
						description: description
					}
				}

				let newProjectList = [...projectList]
				if (!!newProject) {
					newProjectList.push(newProject as IProjectForm)
				}
				let submitProjectList = [...newProjectList].map((i) => (
					{
						id: !!i.id ? i.id : undefined,
						projectName: i.projectName,
						projectOwner: i.projectOwner,
						startDateAt: i.startDateAt,
						endDateAt: i.endDateAt,
						relatedLink: i.relatedLink,
						description: i.description
					}
				))
				resetForm()
				return submitProjectList
			}
		}
	))
	console.log(urlError)

	return (
		<Box mt={6}>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate="subtitle_1_semibold" mb={2}>
				프로젝트{' '}
			</Typography>
			<Grid container spacing={3}>
				<Grid item lg={4} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						프로젝트명
					</Typography>
					<Input
						type="text"
						name="projectName"
						placeholder="진행한 프로젝트의 이름을 입력해주세요."
						label="projectName"
						value={projectName}
						onChange={(e) => {
							setProjectName(e.target.value)
						}}
						fullWidth
					/>
				</Grid>
				<Grid item lg={4} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						프로젝트 기간
					</Typography>
					{/* <DatePickerSelect
					 ref={datePickerRef}
					 placeholder='프로젝트 기간 선택'
					 type='year'
					 onSubmit={(start: Date, end: Date) => {
					 setStartDateAt(moment(start).format('YYYY-MM-DD'))
					 setEndDateAt(moment(end).format('YYYY-MM-DD'))
					 }}
					 /> */}
				</Grid>
				<Grid item lg={4} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						소속기관
					</Typography>
					<Input
						type="text"
						name="projectOwner"
						placeholder="프로젝트를 진행한 소속기관을 입력해주세요."
						label="projectOwner"
						value={projectOwner}
						onChange={(e) => {
							setProjectOwner(e.target.value)
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						설명
					</Typography>
					<Input
						name="description"
						fullWidth
						value={description}
						onChange={(e) => {
							setDescription(e.target.value)
						}}
						placeholder="간단하게 프로젝트에 대해 설명해주세요."
						multiline
						inputProps={{
							maxLength: 500
						}}
						sx={{
							height: convertToRem(200) + ' !important',
							padding: '1rem !important',
							fieldset: {
								padding: '0 !important'
							},
							'.MuiInputAdornment-root': {
								display: 'none'
							},
							'.MuiInputBase-input': {
								overflow: 'auto',
								width: '100%',
								height: '100% !important'
							}
						}}
					/>
				</Grid>
				<Grid item lg={6} xs={12}>
					<Typography cate="body_3" color={theme.palette.main_grey.gray100} mb={1}>
						관련링크(선택)
					</Typography>
					<MButton
						fullWidth
						sx={{
							paddingY: '1.12rem',
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: theme.palette.main_grey.gray700,
							border: '1px solid ' + theme.palette.main_grey.gray500,
							alignItems: 'center',
							borderRadius: '0.5rem',
							marginBottom: showUrl ? '1rem' : 0
						}}
						onClick={() => {
							setShowUrl(true)
						}}
					>
						<Typography cate="body_3_semibold" color={theme.palette.main_grey.gray300} mr={1.5}>
							URL 추가
						</Typography>
						<Add stroke={theme.palette.main_grey.gray300} />
					</MButton>
					{showUrl && (
						<UrlItem
							value={relatedLink}
							error={urlError}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setRelatedLink(e.target.value)
								setUrlError(false)
							}}
							onDelete={() => {
								setShowUrl(false)
								setRelatedLink('')
								setUrlError(false)
							}}
						/>
					)}
				</Grid>
			</Grid>
			<Box display="flex" width="100%" justifyContent={'flex-end'} mt={2} mb={4}>
				<Button
					customTitle={<Typography cate="caption_1_semibold">프로젝트 추가</Typography>}
					onClick={submitCreate}
					cate={'outlined'}
					customSize={'sm'}
					customType={'active'}
					sx={{ padding: '0.81rem 1.5rem', width: 'auto', height: 'auto' }}
					rounded
				/>
			</Box>
			{projectList.length > 0 && (
				<Grid container spacing={1}>
					{projectList.map((i: IProjectForm) => {
						return (
							<Grid item xs={12} key={i.listId}>
								<ProjectItem
									item={i}
									onClose={() => {
										removeProject(i.listId)
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

ProjectSection.displayName = 'ProjectSection'
export default ProjectSection
