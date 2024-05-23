'use client'

import EditIcon from '@/assets/icons/edit'
import { userAtom } from '@/atoms/user'
import { userPoolAtom } from '@/atoms/user-pool'
import { PrimaryButton, PrimarySwitch, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import dynamic from 'next/dynamic'
import { getUserPool, updateUserPool } from '@/actions/apis/pool.action'
import { profileDefaultValue, submitProfileAtom } from '@/app/(main-routes)/(user)/talent-pool/profile-atom'

const ProfileDetail = dynamic(() => import('../_components/profile-detail'))

const TalentPoolHistory = () => {
	const theme = useTheme()
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	const user = useRecoilValue(userAtom)
	const setUserPool = useSetRecoilState(userPoolAtom)
	const setSubmittedPoolData = useSetRecoilState(submitProfileAtom)
	const router = useRouter()
	const path = usePathname()
	
	const [isPublic, setIsPublic] = useState<boolean>(false)
	
	const { data: userPoolRes, isFetching } = useQuery({
		queryKey: ['user-talent-profile'],
		queryFn: async () => await getUserPool(),
		meta: {
			offLoading: true
		}
	})
	
	const publicMutation = useMutation({
		mutationFn: async (isPublic: boolean) => {
			const { data, error } = await updateUserPool({ isPublic })
			if (error) throw error
			
			return data
		},
		onSuccess: (data) => {
			enqueueSnackbar('update success !!', {
				variant: 'success'
			})
			setIsPublic((prev) => !prev)
		},
		onError: () => {
			enqueueSnackbar('update fail !!', {
				variant: 'error'
			})
		}
	})
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		publicMutation.mutate(event.target.checked)
	}
	
	useEffect(() => {
		if (!!userPoolRes && !isFetching) {
			setUserPool(userPoolRes)
			setIsPublic(userPoolRes.isPublic)
		} else {
			setUserPool(null)
		}
	}, [userPoolRes, isFetching])
	
	useEffect(() => {
		setSubmittedPoolData(profileDefaultValue)
	}, [])
	
	return (
		<>
			<Stack
				alignItems={'center'}
				justifyContent={'space-between'}
				direction={'row'}
				pb={2}
				borderBottom={'1px solid ' + theme.palette.main_grey.gray700}
			>
				<Typography cate={mdDown ? 'title_50' : 'title_70'}>인재풀 기본정보</Typography>
				<PrimaryButton
					outlined
					btnSize={'md-np'}
					sx={{
						width: { md: convertToRem(213), sm: 'auto' },
						height: { md: convertToRem(56), sm: convertToRem(40) },
						paddingX: { sm: convertToRem(12) }
					}}
					onClick={() => {
						router.push('/me')
					}}
				>
					<Typography cate="button_30">기본 정보 수정하기</Typography>
					<EditIcon />
				</PrimaryButton>
			</Stack>
			{user ? (
				<Stack py={6} alignItems={'center'} justifyContent={'flex-start'} direction={mdDown ? 'column' : 'row'}>
					<Avatar
						sx={{
							width: { md: '12.5rem', sm: convertToRem(140) },
							height: { md: '12.5rem', sm: convertToRem(140) }
						}}
						src={user?.avatar?.url}
					/>
					<Stack alignItems={'flex-start'} direction="column" ml={mdDown ? 0 : 4} mt={mdDown ? 2 : 0} width={'100%'}>
						<Typography
							cate={mdDown ? 'title_50' : 'title_70'}
							color={theme.palette.main_grey.gray100}
							mb={{ md: 2, sm: 1 }}
							sx={{
								width: '100%',
								textAlign: { md: 'start', sm: 'center' }
							}}
						>
							{user?.nickname}
						</Typography>
						<Stack direction={'column'} justifyContent={'flex-start'} gap={1}>
							<Stack direction={'row'} alignItems={'center'}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray300} mr={1}>
									이메일
								</Typography>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100}>
									{user?.email}
								</Typography>
							</Stack>
							<Stack direction={'row'} alignItems={'center'}>
								<Typography cate="body_3" color={theme.palette.main_grey.gray300} mr={1}>
									연락처
								</Typography>
								<Typography cate="body_3" color={theme.palette.main_grey.gray100}>
									{!!user?.phoneNumber ? user?.phoneNumber : '-'}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			) : (
				<Stack
					py={6}
					alignItems={'center'}
					justifyContent={'flex-start'}
					direction={mdDown ? 'column' : 'row'}
					width={'100%'}
				>
					<Skeleton variant="circular" width={'12.5rem'} height={'12.5rem'} />
					<Stack alignItems={mdDown ? 'center' : 'flex-start'} direction="column" ml={mdDown ? 0 : 4} flex={1}>
						<Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
						<Stack alignItems={'center'} mb={1} width={'100%'}>
							{!mdDown && <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
							<Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
						</Stack>
						<Stack alignItems={'center'} width={'100%'}>
							{!mdDown && <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
							<Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
						</Stack>
					</Stack>
				</Stack>
			)}
			<Stack
				alignItems={'center'}
				justifyContent={'space-between'}
				direction={{ md: 'row', sm: 'column' }}
				pb={2}
				gap={mdDown ? 2 : 0}
				borderBottom={'1px solid ' + theme.palette.main_grey.gray700}
			>
				<Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
					<Typography cate={mdDown ? 'title_50' : 'title_70'}>프로필 정보</Typography>
					<Stack direction={'row'} gap={6} alignItems={'center'}>
						{userPoolRes && !mdDown ? (
							<Stack
								direction={'row'}
								gap={2}
								sx={{
									alignSelf: 'center'
								}}
							>
								<Typography cate={mdDown ? 'body_40' : 'sub_title_40'}>프로필 활성화</Typography>
								<PrimarySwitch
									checked={isPublic}
									sx={{
										alignSelf: 'center'
									}}
									onChange={handleChange}
								/>
							</Stack>
						) : null}
						<PrimaryButton
							outlined
							btnSize={'md-np'}
							sx={{
								width: { md: convertToRem(213), sm: 'auto' },
								height: { md: convertToRem(56), sm: convertToRem(40) },
								paddingX: { sm: convertToRem(12) }
							}}
							onClick={() => {
								router.push(path + (
									userPoolRes ? '/profile-edit' : '/profile-registration'
								))
							}}
						>
							<Typography cate="button_30">{userPoolRes ? '프로필 정보 수정하기' : '프로필 정보 등록하기'}</Typography>
							<EditIcon />
						</PrimaryButton>
					</Stack>
				</Stack>
				{mdDown ? (
					<Stack
						direction={'row'}
						gap={2}
						sx={{
							alignSelf: 'center'
						}}
						width={mdDown ? '100%' : undefined}
						justifyContent={{ md: 'flex-end', sm: 'space-between' }}
					>
						<Typography cate={mdDown ? 'body_2_semibold' : 'body_2_bold'}>프로필 활성화</Typography>
						<PrimarySwitch
							sx={{
								alignSelf: 'center'
							}}
							checked={isPublic}
							onChange={handleChange}
						/>
					</Stack>
				) : null}
			</Stack>
			<ProfileDetail />
		</>
	)
}

export default TalentPoolHistory
