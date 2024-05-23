'use client'

import { SortTabStack } from '@/components'
import { FilledTabStack, FillTabItem } from '@/components/tabs'
import { Label, PrimaryCheckbox, Typography } from '@/elements'
import SearchInput from '@/elements/v2/input/search-input'
import { Stack } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { CONTENT_TYPE } from '../../_client-components/data-room-table'
import { Category } from '@/types/types.type'

enum SORT_TYPE {
	POPULARY = 'POPULARY',
	NEWEST = 'NEWEST',
	OLDEST = 'OLDEST'
}

type FilterBarType = {
	cate: Category[]
	seletedCate: number
	sort: keyof typeof SORT_TYPE
	keyword: string
}

const SortData = [
	{
		label: '인기순',
		value: SORT_TYPE.POPULARY
	},
	{
		label: '최신순',
		value: SORT_TYPE.NEWEST
	},
	{
		label: '오래된순',
		value: SORT_TYPE.OLDEST
	}
]

const FilterBar = ({ cate, seletedCate, sort, keyword }: FilterBarType) => {
	const router = useRouter()
	const path = usePathname()
	const searchParams = useSearchParams()
	const newQuery = new URLSearchParams(searchParams)
	
	const [sortValue, setSortValue] = useState<keyof typeof SORT_TYPE>(sort)
	const [category, setCategory] = useState<number>(seletedCate)
	const [isCheck, setIsCheck] = useState<boolean>(false)
	const [searchKey, setSearchKey] = useState(keyword)
	
	const handleCategoryChange = (_: any, newValue: number) => {
		if (newValue !== 0) {
			newQuery.set('categoryId', newValue.toString())
		} else {
			if (!!newQuery.get('categoryId')) {
				newQuery.delete('categoryId')
			}
		}
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
		setCategory(newValue)
	}
	
	const handleSortChange = (_: any, newValue: keyof typeof SORT_TYPE) => {
		newQuery.set('listType', newValue)
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
		setSortValue(newValue)
	}
	
	const handleCheckChange = (_: any, checked: boolean) => {
		if (checked) {
			newQuery.set('type', CONTENT_TYPE.FREE)
		} else {
			if (!!newQuery.get('type')) {
				newQuery.delete('type')
			}
		}
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
		setIsCheck(checked)
	}
	
	const handleKeywordChange = (key: string) => {
		if (key !== '') {
			newQuery.set('keyword', key)
		} else {
			if (!!newQuery.get('keyword')) {
				newQuery.delete('keyword')
			}
		}
		const search = newQuery.toString()
		const query = search ? `?${search}` : ''
		
		router.push(`${path}${query}`)
	}
	
	return (
		<Stack direction={'column'} gap={3}>
			<Stack direction={{ md: 'row', sm: 'column' }} justifyContent={{ md: 'space-between' }} gap={3}>
				<SortTabStack data={SortData} value={sortValue} handleChange={handleSortChange} />
				<Stack direction={{ md: 'row', sm: 'column-reverse' }} gap={3} alignItems={{ md: 'center' }}>
					<Stack direction={'row'} alignItems={'center'}>
						<PrimaryCheckbox ariaLabel="checkbox" value={isCheck} onChange={handleCheckChange} />
						<Label id="checkbox">
							<Typography cate="body_20">무료 자료 필터</Typography>
						</Label>
					</Stack>
					<SearchInput
						onClear={() => {
							handleKeywordChange('')
							setSearchKey('')
						}}
						placeholder="Search"
						value={searchKey}
						onChange={(e) => {
							setSearchKey(e.target.value)
						}}
						onSearch={() => {
							handleKeywordChange(searchKey)
						}}
					/>
				</Stack>
			</Stack>
			<FilledTabStack value={category} onChange={handleCategoryChange} variant="scrollable">
				{cate.map((item) => (
					<FillTabItem key={item.uuid} value={item.id} label={item.name} />
				))}
			</FilledTabStack>
		</Stack>
	)
}

export default FilterBar
