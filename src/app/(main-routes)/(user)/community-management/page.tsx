'use client'

import { loadingAtom } from '@/atoms/loading'
import AlertPopup from '@/elements/alert-popup'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Button as MButton, Divider, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Mentoring from './mentoring/page'
import Team from './team/page'
import TrainingEvent from './training-event/page'

const TAB_VALUE = {
	mentoring: 1,
	pool: 2,
	team: 3,
	'training-event': 4
}

const CommunityManagement = () => {
	const theme = useTheme()
	const breadcrumbData = [{ name: '커뮤니티 관리' }]
	const setLoading = useSetRecoilState(loadingAtom)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
	const [showError, setShowError] = useState<boolean>(false)

	const mdUp = useMediaQuery('(min-width: 768px)')
	const router = useRouter()
	const query = useSearchParams()
	const pathName = usePathname()

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')
	const [newQuery, setNewQuery] = useState(new URLSearchParams(Array.from(query.entries())))
	const [tabValue, setTabValue] = useState<number>(1)

	useEffect(() => {
		if (!!query.get('tab') && Object.keys(TAB_VALUE)
			.includes(query.get('tab') as string)) {
			setTabValue(TAB_VALUE[query.get('tab') as keyof typeof TAB_VALUE])
		}
		setNewQuery(new URLSearchParams(Array.from(query.entries())))
	}, [query])
	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate="large_title" mt={4.5}>
				커뮤니티 관리
			</Typography>
			<Box
				component="div"
				display={'flex'}
				justifyContent="space-between"
				my={mdUp ? 6 : 3}
				alignItems={mdUp ? 'center' : 'flex-start'}
				flexDirection={mdUp ? 'row' : 'column'}
			>
				<Box display={'flex'} gap={1} alignItems={'center'} width={mdUp ? 'auto' : '100%'}>
					{mdUp ? (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<MButton
								sx={{
									paddingRight: mdUp ? '1.5rem' : '0.5rem',
									paddingLeft: 0
								}}
								onClick={() => {
									setTabValue(1)
									newQuery.delete('tab')
									router.push(`${pathName}?${newQuery}`)
								}}
							>
								<Typography
									cate={mdUp ? 'body_2' : 'caption_1'}
									color={tabValue === 1 ? theme.palette.main.point : theme.palette.main.white}
								>
									멘토링
								</Typography>
							</MButton>
							<Divider
								orientation="vertical"
								sx={{
									height: convertToRem(14),
									borderColor: theme.palette.main_grey.gray700
								}}
							/>
							<MButton
								sx={{ paddingX: mdUp ? '1.5rem' : '0.5rem' }}
								onClick={() => {
									setTabValue(2)
									newQuery.set('tab', 'pool')
									router.push(`${pathName}?${newQuery}`)
								}}
							>
								<Typography
									cate={mdUp ? 'body_2' : 'caption_1'}
									color={tabValue === 2 ? theme.palette.main.point : theme.palette.main.white}
								>
									인재풀
								</Typography>
							</MButton>
							<Divider
								orientation="vertical"
								sx={{
									height: convertToRem(14),
									borderColor: theme.palette.main_grey.gray700
								}}
							/>
							<MButton
								sx={{ paddingX: mdUp ? '1.5rem' : '0.5rem' }}
								onClick={() => {
									setTabValue(3)
									newQuery.set('tab', 'team')
									router.push(`${pathName}?${newQuery}`)
								}}
							>
								<Typography
									cate={mdUp ? 'body_2' : 'caption_1'}
									color={tabValue === 3 ? theme.palette.main.point : theme.palette.main.white}
								>
									팀빌딩
								</Typography>
							</MButton>
							<Divider
								orientation="vertical"
								sx={{
									height: convertToRem(14),
									borderColor: theme.palette.main_grey.gray700
								}}
							/>
							<MButton
								sx={{ paddingX: mdUp ? '1.5rem' : '0.5rem' }}
								onClick={() => {
									setTabValue(4)
									newQuery.set('tab', 'training-event')
									router.push(`${pathName}?${newQuery}`)
								}}
							>
								<Typography
									cate={mdUp ? 'body_2' : 'caption_1'}
									color={tabValue === 4 ? theme.palette.main.point : theme.palette.main.white}
								>
									교육행사
								</Typography>
							</MButton>
						</Box>
					) : (
						<Select
							placeholder="대한민국"
							displayEmpty
							value={tabValue}
							fullWidth
							renderValue={(value) => {
								if (value === -1) {
									return (
										<Typography cate="body_3" color={theme.palette.main_grey.gray300}>
											대한민국
										</Typography>
									)
								}
								return (
									<Box display={'flex'} alignItems={'center'}>
										<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
											{tabValue === 1 ? '멘토링' : tabValue === 2 ? '인재풀' : tabValue === 3 ? '팀빌딩' : '교육행사'}
										</Typography>
									</Box>
								)
							}}
							onChange={(e) => {
								setTabValue((
									e.target.value as number
								) || 1)
								if ((
									e.target.value as number
								) === 1 && !!query.get('tab')) {
									newQuery.delete('tab')
								} else {
									newQuery.set(
										'tab',
										(
											e.target.value as number
										) === 2
											? 'pool'
											: (
												e.target.value as number
											) === 3
												? 'team'
												: 'training-event'
									)
								}
								router.push(`${pathName}?${newQuery}`)
							}}
						>
							<MenuItem value={1}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
									멘토링
								</Typography>
							</MenuItem>
							<MenuItem value={2}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
									인재풀
								</Typography>
							</MenuItem>
							<MenuItem value={3}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
									팀빌딩
								</Typography>
							</MenuItem>
							<MenuItem value={4}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100} ml={2}>
									교육행사
								</Typography>
							</MenuItem>
						</Select>
					)}
				</Box>
			</Box>
			{tabValue === 1 && <Mentoring />}
			{/* {tabValue === 2 && <Pool />} */}
			{tabValue === 3 && <Team />}
			{tabValue === 4 && <TrainingEvent />}
			<AlertPopup
				onSubmit={async () => {
					setShowError(false)
					setErrorMessage('')
					setErrorTitle(undefined)
				}}
				submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
				cancelTitle={errorTitle ? '취소' : undefined}
				onCancel={
					errorTitle
						? () => {
							setShowError(false)
							setErrorMessage('')
							setErrorTitle(undefined)
						}
						: undefined
				}
				title={errorTitle}
				description={errorMessage}
				open={showError}
			/>
		</>
	)
}

export default CommunityManagement
