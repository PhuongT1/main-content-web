'use client'
import Add from '@/assets/icons/add'
import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { loadingAtom } from '@/atoms/loading'
import Input from '@/elements/custom-input'
import Typography from '@/elements/typography'
import { uploadFile } from '@/services/file.service'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { urlValidator } from '@/utils/validation'
import { Box, Button as MButton, Grid, IconButton, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const category = ['개발', '디자인', '기획', '마케팅', '영업', '운영관리', '인사']

const UrlFileSection = forwardRef(({ defaultValueFiles, defaultValueUrls }: any, ref) => {
	const theme = useTheme()
	const [list, setList] = useState<any>([])
	const [listError, setListError] = useState<any[]>([])
	const inputFile = useRef<any>(null)
	const setLoading = useSetRecoilState(loadingAtom)
	const addInputUrl = () => {
		const urlItem: any = { listId: list.length, url: '', type: 'url' }
		let newList = [...list]
		newList.push(urlItem)
		setList(newList)
	}
	
	useEffect(() => {
		if (list.length === 0) {
			let newList: any = []
			defaultValueFiles.forEach((file: IFile) => {
				let fileItem: any = {
					listId: newList.length,
					file: file,
					type: 'file'
				}
				newList.push(fileItem)
			})
			
			defaultValueUrls.forEach((url: string) => {
				let urlItem: any = { listId: newList.length, url: url, type: 'url' }
				newList.push(urlItem)
			})
			setList(newList)
		}
	}, [defaultValueFiles, defaultValueUrls])
	
	const addFile = (fileData: IFile) => {
		const fileItem: any = {
			listId: list.length,
			file: fileData,
			type: 'file'
		}
		let newList = [...list]
		newList.push(fileItem)
		setList(newList)
	}
	
	const deleteItem = (id: number) => {
		const newList = [...list].filter((i) => i.listId !== id)
		setList(newList)
	}
	
	const changeUrl = (value: string, id: number) => {
		let newList = [...list]
		newList.find((i) => i.listId === id).url = value
		setList(newList)
	}
	
	const uploadRelatedFile = async (event: ChangeEvent<HTMLInputElement>) => {
		setLoading(true)
		if (!event?.target?.files) {
			setLoading(false)
			return
		}
		const { data, error } = await uploadFile({ file: event?.target?.files[0] })
		if (data && !error) {
			addFile(data)
			setLoading(false)
		} else {
			enqueueSnackbar('Upload avatar failed', {
				variant: 'error'
			})
			setLoading(false)
		}
	}
	useImperativeHandle(ref, () => (
		{
			getData: () => {
				if (validate()) return { files: 'error', urls: 'error' }
				let files: { id: number }[] = []
				let urls: string[] = []
				list.forEach((i: any) => {
					if (i.type === 'file') {
						let newFile = { id: i.file.id }
						files.push(newFile)
					} else {
						urls.push(i.url)
					}
				})
				setList([])
				return { files, urls }
			}
		}
	))
	
	const validate = () => {
		let listError: any[] = []
		list.forEach((i: any) => {
			if (i.type === 'url' && !urlValidator(i.url)) {
				listError.push(i.listId)
			}
		})
		setListError(listError as any[])
		return listError.length > 0 ? true : false
	}
	
	const removeUrlError = (id: number) => {
		let newListError = [...listError].filter((i) => i !== id)
		setListError(newListError)
	}
	return (
		<Box mt={6}>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate="subtitle_1_semibold" mb={2}>
				포트폴리오
			</Typography>
			<Grid container spacing={1}>
				<Grid item lg={3} xs={12}>
					<MButton
						fullWidth
						onClick={addInputUrl}
						sx={{
							paddingY: '1.12rem',
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: theme.palette.main_grey.gray700,
							border: '1px solid ' + theme.palette.main_grey.gray500,
							alignItems: 'center',
							borderRadius: '0.5rem'
						}}
					>
						<Typography cate="body_3_semibold" color={theme.palette.main_grey.gray300} mr={1.5}>
							URL 추가
						</Typography>
						<Add stroke={theme.palette.main_grey.gray300} />
					</MButton>
				</Grid>
				<Grid item lg={3} xs={12}>
					<MButton
						fullWidth
						sx={{
							paddingY: '1.12rem',
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: theme.palette.main_grey.gray700,
							border: '1px solid ' + theme.palette.main_grey.gray500,
							alignItems: 'center',
							borderRadius: '0.5rem'
						}}
						onClick={() => {
							inputFile.current?.click()
						}}
					>
						<Typography cate="body_3_semibold" color={theme.palette.main_grey.gray300} mr={1.5}>
							파일첨부
						</Typography>
						<Add stroke={theme.palette.main_grey.gray300} />
					</MButton>
					<input
						type="file"
						id="file"
						accept=".ppt,.PPT,.PPTX,.pptx,.pdf,.PDF,.hwp,.HWP,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG"
						onChange={uploadRelatedFile}
						ref={inputFile}
						style={{ display: 'none' }}
					/>
				</Grid>
			</Grid>
			<Typography cate="caption_1" color={theme.palette.main_grey.gray400} mt={2}>
				30mb 미만 jpg,jpeg, png, pdf 파일을 업로드해주세요.
			</Typography>
			{list.length > 0 && (
				<Grid container mt={3}>
					<Grid item lg={6} xs={12}>
						<Grid container spacing={1}>
							{list.map((item: any) => (
								<Grid item xs={12} key={item.listId}>
									{item.type === 'url' ? (
										<UrlItem
											error={listError.includes(item.listId)}
											value={item.url}
											onChange={(e: ChangeEvent<HTMLInputElement>) => {
												changeUrl(e.target.value, item.listId)
												removeUrlError(item.listId)
											}}
											onDelete={() => {
												deleteItem(item.listId)
												removeUrlError(item.listId)
											}}
										/>
									) : (
										<FileItem
											file={item.file}
											onDelete={() => {
												deleteItem(item.listId)
											}}
										/>
									)}
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			)}
			<Box display="flex" width="100%" justifyContent={'flex-end'} mt={2} mb={4}></Box>
		</Box>
	)
})

UrlFileSection.displayName = 'UrlFileSection'
export default UrlFileSection

type FileItemProps = {
	file: IFile
	onDelete: any
}
const FileItem = ({ file, onDelete }: FileItemProps) => {
	const theme = useTheme()
	return (
		<Box
			padding="1.12rem 1rem"
			width="100%"
			sx={{ backgroundColor: theme.palette.main_grey.gray800 }}
			display={'flex'}
			alignItems={'center'}
		>
			<Typography width={'3rem'} color={theme.palette.main_grey.gray300} flexShrink={0} cate="body_3">
				{'파일'}
			</Typography>
			<Typography cate="body_2" width={'100%'} color={theme.palette.main_grey.gray100}>
				{file.name}
			</Typography>
			<IconButton onClick={onDelete}>
				<CloseCircleSmIcon />
			</IconButton>
		</Box>
	)
}

type UrlItemProps = {
	value: string
	onDelete: any
	onChange: any
	error?: boolean
}
export const UrlItem = ({ value, onDelete, onChange, error }: UrlItemProps) => {
	const theme = useTheme()
	
	return (
		<Input
			name="url"
			sx={{
				background: theme.palette.main_grey.gray800 + ' !important',
				height: convertToRem(72.81) + ' !important',
				borderRadius: 0 + ' !important',
				border: '1px solid',
				borderColor:
					error == true ? theme.palette.main.danger + ' !important' : theme.palette.main_grey.gray800 + ' !important',
				'.MuiOutlinedInput-input': {
					padding: 0 + ' !important',
					color: theme.palette.main.primary_light,
					textDecoration: !!value ? 'underline' : 'none',
					'&::placeholder': {
						color: theme.palette.main_grey.gray300
					}
				}
			}}
			value={value}
			placeholder="프로젝트와 연관된 URL을 입력해주세요"
			onChange={onChange}
			startAdornment={
				<Typography width={'3rem'} color={theme.palette.main_grey.gray300} flexShrink={0} cate="body_3">
					URL
				</Typography>
			}
			fullWidth
			endAdornment={
				<IconButton onClick={onDelete}>
					<CloseCircleSmIcon />
				</IconButton>
			}
		/>
	)
}
