'use client'
import { Pagination, SortTabStack } from '@/components'
import TalentPoolContactsCard from '@/components/cards/talent-pool-contacts.card'
import { TrashAlert } from '@/components/dialog'
import { ResponsiveList } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack, useMediaQuery } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteMyContact, getMyContact } from '@/actions/apis/pool.action'

enum SORT_TYPE {
	LATEST = 'latest',
	NAME = 'name',
	OLDEST = 'oldest'
}

const SortData = [
	{
		label: '최근연락순',
		value: SORT_TYPE.LATEST
	},
	{
		label: '오래된순',
		value: SORT_TYPE.OLDEST
	}
	// {
	// 	label: '이름순',
	// 	value: SORT_TYPE.NAME
	// }
]

const TalentContacts = () => {
	const router = useRouter()
	const path = usePathname()
	const searchParams = useSearchParams()
	const newQuery = new URLSearchParams(searchParams)
	
	const mdDown = useMediaQuery('(max-width: 768px)')
	
	const [sortValue, setSortValue] = useState(SORT_TYPE.LATEST)
	const [deleteContact, setDeleteContact] = useState<boolean>(false)
	const [deleteId, setDeleteId] = useState<number>()
	const [page, setPage] = useState<number>(1)
	
	const handleSortChange = (_: any, newValue: SORT_TYPE) => {
		if (newValue !== null) {
			newQuery.set('sortBy', newValue.toString())
		} else {
			if (!!newQuery.get('sortBy')) {
				newQuery.delete('sortBy')
			}
		}
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
	}
	
	const deleteContactMutation = useMutation({
		mutationKey: ['delete-my-contact'],
		mutationFn: async (id: number) => {
			const { data, error } = await deleteMyContact(id)
			if (error) throw error
			
			return data
		},
		onSuccess: async () => {
			await refetch()
			console.log('delete success')
		},
		onError: () => {
			console.log('delete fail')
		},
		onSettled: () => {
			setDeleteContact(false)
		}
	})
	
	const handleDeleteContact = () => {
		if (deleteId && deleteId > 0) {
			deleteContactMutation.mutate(deleteId)
		}
	}
	
	const { refetch, error, data, isFetching, isPlaceholderData } = useQuery({
		queryKey: ['my-contact-list', page, sortValue],
		queryFn: async () => await getMyContact({ page, limit: 10, sortBy: sortValue }),
		placeholderData: keepPreviousData,
		meta: {
			offLoading: true
		}
	})
	
	useEffect(() => {
		newQuery.set('sortBy', SORT_TYPE.LATEST)
		setSortValue(SORT_TYPE.LATEST)
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
	}, [])
	
	return (
		<>
			<Stack
				direction={'column'}
				position={'relative'}
				sx={{
					marginTop: { md: convertToRem(-24) },
					minHeight: convertToRem(1000)
				}}
				gap={{ md: 6, sm: 3 }}
			>
				<SortTabStack
					data={SortData}
					value={sortValue}
					handleChange={(_e, value: SORT_TYPE) => {
						handleSortChange(_e, value)
						setSortValue(value)
					}}
				/>
				{data?.data && data.data.result.length > 0 ? (
					<ResponsiveList minGap={[500, 24]} verticalGap={mdDown ? 16 : 48}>
						{data?.data?.result.map((val) => (
							<TalentPoolContactsCard
								key={val.uuid}
								item={val}
								talentProfile={val.talentPool}
								onDelete={() => {
									setDeleteContact(true)
									setDeleteId(val.id)
								}}
							/>
						))}
					</ResponsiveList>
				) : null}
				{data?.data && data.data.metaData.totalRecords > 10 ? (
					<Box position={'absolute'} bottom={0} width={'100%'} display={'flex'} justifyContent={'center'}>
						<Pagination count={data?.data?.metaData.totalPages} nextPage={data?.data.metaData.nextPage} />
					</Box>
				) : null}
			</Stack>
			<TrashAlert
				open={deleteContact}
				title="삭제 하시겠습니까?"
				cancelTxt="취소"
				submitTxt="삭제"
				onCancel={() => {
					setDeleteContact(false)
				}}
				onSubmit={handleDeleteContact}
			/>
		</>
	)
}

export default TalentContacts
