'use client'
import { userPoolAtom } from '@/atoms/user-pool'
import { PaginationList } from '@/components'
import { SUB_CATEGORY } from '@/constants/common.constant'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import CardCommunityTalent from '@/elements/card-community-talent'
import SearchInput from '@/elements/search-input'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import { IPool } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { handlePageFilter } from '@/utils/handle-page-filter'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getPoolList } from '@/actions/apis/pool.action'
import { getCategories } from '@/actions/apis/category.action'
import { Category } from '@/types/types.type'

const CommunityTalents = () => {
	const theme = useTheme()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
	const [showError, setShowError] = useState<boolean>(false)
	const router = useRouter()
	const queryData = useSearchParams()
	const pathName = usePathname()
	const userPool = useRecoilValue(userPoolAtom)
	const handleChange = (_: SyntheticEvent, newValue: string) => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()))
		if (newValue !== '') {
			newQuery.set('categoryId', newValue)
		} else {
			if (!!newQuery.get('categoryId')) {
				newQuery.delete('categoryId')
			}
		}
		
		router.push(`${pathName}?${newQuery}`)
	}
	const [keyword, setKeyword] = useState<string>('')
	const [page, setPage] = useState(Number(queryData.get('page')) || 1)
	const [searchKeyword, setSearchKeyword] = useState<string>((
		queryData.get('searchKeyword') as string
	) || '')
	const [categoryId, setCategoryId] = useState((
		Number(queryData.get('categoryId'))
	) || 0)
	const mdUp = useMediaQuery('(min-width: 768px)')
	
	const {
		data: poolsList,
		refetch: refetchPool,
		isFetching,
		isLoading: isLoadingPools
	} = useQuery({
		queryKey: ['pools-list', page, categoryId, searchKeyword],
		queryFn: () =>
			getPoolList({
				page: page,
				limit: 16,
				categoryId: !!categoryId ? categoryId : undefined,
				keyword: !!searchKeyword ? searchKeyword : undefined
			}),
		meta: {
			offLoading: true
		},
		select: (data) => {
			return data.data
		}
	})
	
	const { data: occupationCategories } = useQuery({
		queryKey: ['talent-community-occupations'],
		queryFn: () => getCategories({ subType: SUB_CATEGORY.OCCUPATION }),
		select: (data) => {
			return [
				{ id: 0, name: '전체' } as Category,
				...data.data
			]
		},
		meta: {
			offLoading: true
		}
	})
	
	const searchPools = () => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()))
		if (!!keyword) {
			newQuery.set('searchKeyword', keyword.trim())
			setKeyword(keyword.trim())
		} else {
			if (!!newQuery.get('searchKeyword')) {
				newQuery.delete('searchKeyword')
			}
			setKeyword(keyword.trim())
		}
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${pathName}${query}`)
		// setSearchKeyword(keyword);
	}
	
	const handlePageChange = (newValue: number) => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()))
		if (newValue !== 1) {
			newQuery.set('page', newValue + '')
		} else {
			if (!!newQuery.get('page')) {
				newQuery.delete('page')
			}
		}
		
		router.push(`${pathName}?${newQuery}`)
	}
	
	useEffect(() => {
		handlePageFilter({
			router,
			query: {
				categoryId,
				searchKeyword
			},
			pathName
		})
	}, [categoryId, searchKeyword])
	
	useEffect(() => {
		const categoryId = Number(queryData.get('categoryId'))
		const searchKeyword = queryData.get('searchKeyword')
		const page = queryData.get('page')
		
		setPage(!!page ? Number(page) : 1)
		setCategoryId(!!categoryId ? (
			categoryId
		) : 0)
		setSearchKeyword(!!searchKeyword ? (
			searchKeyword as string
		) : '')
		setKeyword(!!searchKeyword ? (
			searchKeyword as string
		) : '')
	}, [queryData])
	
	return (
		<Box my={5}>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Box
				component="div"
				display={'flex'}
				justifyContent="space-between"
				alignItems={mdUp ? 'center' : 'flex-start'}
				flexDirection={mdUp ? 'row' : 'column'}
				mb={3}
			>
				<SearchInput
					placeholder="팀원을 검색해보세요"
					value={keyword}
					onRemove={() => {
						let newQuery = new URLSearchParams(Array.from(queryData.entries()))
						newQuery.delete('searchKeyword')
						const search = newQuery.toString()
						const query = search ? `?${search}` : ''
						router.push(`${pathName}${query}`)
					}}
					onChange={(e) => {
						setKeyword(e.target.value)
					}}
					fullWidth={!mdUp}
					onSearch={searchPools}
				/>
				<Box
					display={'flex'}
					gap={1}
					alignItems={mdUp ? 'center' : 'flex-end'}
					justifyContent={!mdUp ? 'flex-end' : 'unset'}
					mb={0}
					mt={mdUp ? 0 : 2}
					width={mdUp ? 'auto' : '100%'}
				>
					<Button
						cate={'outlined'}
						customType={'active'}
						title={!!userPool ? '인재풀 수정하기' : '인재풀 등록하기'}
						sx={{
							width: mdUp ? '10rem' : '100%',
							color: theme.palette.main_grey.gray100
						}}
						onClick={() => {
							router.push(!!userPool ? '/talent-pool/profile-edit' : '/talent-pool/profile-registration')
						}}
					/>
				</Box>
			</Box>
			<Tabs
				value={categoryId}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons
				aria-label="scrollable force tabs example"
				sx={{
					backgroundColor: theme.palette.main.gray80,
					[theme.breakpoints.down('sm')]: {
						backgroundColor: theme.palette.main.gray80
					},
					mt: convertToRem(24)
				}}
			>
				{occupationCategories && occupationCategories.map((i) => (
					<Tab
						sx={{
							[theme.breakpoints.down('sm')]: {
								border: '1px solid transparent'
							},
							'&.Mui-selected': {
								color: theme.palette.main.white,
								[theme.breakpoints.down('sm')]: {
									border: '1px solid ' + theme.palette.main.primary,
									borderRadius: '500px'
								}
							}
						}}
						label={i.name}
						value={i.id}
						key={i.id}
					/>
				))}
			</Tabs>
			<PaginationList
				itemWidth={696}
				gap={24}
				sx={{ mt: 4 }}
				responsiveListProps={{ minBreakpoints: { md: [320, 24] } }}
				curPage={page}
				totalPage={poolsList?.metaData?.totalPages || 0}
				onPageChange={handlePageChange}
				emptyTxt={!!searchKeyword ? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.' : `등록된 인재풀이 없습니다.`}
				isEmpty={(
					!poolsList?.result || poolsList?.result.length === 0
				) && !isLoadingPools && !isFetching}
				isLoading={isFetching}
			>
				{poolsList?.result?.map((i: IPool) => {
					return (
						<CardCommunityTalent
							key={i.id}
							onClick={() => {
								router.push(`/community/talents/${i.userId}`)
							}}
							item={i}
						/>
					)
				})}
			</PaginationList>
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
		</Box>
	)
}

export default CommunityTalents
