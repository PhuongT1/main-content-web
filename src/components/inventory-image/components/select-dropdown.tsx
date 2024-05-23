import IconArrow from '@/assets/icons/ic-arrow'
import ArrowDown from '@/assets/icons/ic-arrow-down'
import IconFilter from '@/assets/icons/ic-filter'
import { InputAdornment, InputLabel, Select as MUISelect, MenuItem, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styles from '../Inventory.module.scss'

interface SelectProps {
	items: Array<{
		id?: string | number
		value: string | number
		title: string
		color?: string
	}>
	minWidth?: number
	width?: number
	label?: string
	value: any
	setValue: (value: string) => void
	className?: string
	forColor?: boolean
	emptyValue?: boolean
	placeHolder?: string | string[]
}

const SelectDropdown: React.FC<SelectProps> = ({
	items,
	minWidth,
	width,
	value,
	setValue,
	label,
	forColor = false,
	emptyValue = false,
	placeHolder
}) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const {
		palette: { home }
	} = useTheme()
	return (
		<div className={styles.select_wrapper}>
			{!!label && (
				<InputLabel id='select-label' sx={{ color: ` ${home.gray100} !important`, mb: 0.5, fontWeight: 500 }}>
					{label}
				</InputLabel>
			)}
			<MUISelect
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				labelId='select-label'
				className={styles.select_content}
				value={value}
				onChange={(event) => {
					setValue((event.target as HTMLInputElement).value)
				}}
				IconComponent={() => (open ? <IconArrow /> : <ArrowDown />)}
				startAdornment={
					<InputAdornment position='start'>
						<IconFilter />
					</InputAdornment>
				}
				displayEmpty
				sx={{
					'& .MuiSelect-select': {
						minWidth,
						width,
						paddingLeft: '1rem',
						paddingRight: '0 !important',
						color: `${home.gray100} !important`,
						// backgroundColor: home.gray300,
						padding: '0px',
						display: 'flex',
						alignItems: 'center'
					},

					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						border: '1px solid #3C82F9'
					},
					'&.MuiInputBase-root.MuiOutlinedInput-root': {
						padding: '10px 16px !important',
						backgroundColor: home.gray300,
						borderRadius: '10px',
						width: '190px'
					},

					'& .MuiOutlinedInput-notchedOutline': {
						border: `1px solid ${home.gray200}`,
						borderRadius: '10px'
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						border: '1px solid #3C82F9'
					}
				}}
				inputProps={{
					root: {
						menuPaper: {
							boxShadow: 'none',
							top: '150px',
							backgroundColor: `${home.gray400} !important`
						}
					},
					MenuProps: {
						PaperProps: {
							sx: {
								border: `1px solid ${home.gray200}`,
								transform: 'translateY(8px) !important',
								borderRadius: '10px',
								backgroundColor: `${home.gray400} !important`
							}
						},
						MenuListProps: {
							sx: {
								borderRadius: '10px',
								backgroundColor: `${home.gray400} !important`,
								color: 'black',
								'& .Mui-selected': {
									backgroundColor: '#3C82F9 !important',
									color: '#FFFFFF',
									padding: '12px 16px',
									fontSize: '16px',
									fontWeight: 400
								},
								'&:hover .Mui-selected': {
									backgroundColor: '#3C82F9'
								},
								'& .MuiMenu-paper': {
									boxShadow: 'none !important'
								},
								'&.MuiList-root.MuiMenu-list': {
									padding: '12px 0px !important'
								},
								li: {
									color: `${home.gray50}`,
									fontSize: '16px',
									fontWeight: '400',
									li: {
										'&:hover': {
											backgroundColor: '#3C82F9'
										}
									}
								}
							}
						}
					}
				}}
				renderValue={(selected) => {
					if (emptyValue && !selected) {
						return <p>{placeHolder}</p>
					}
					return items?.find((item) => item?.value === selected)?.title ?? ''
				}}
			>
				{items?.length ? (
					items.map((item) => (
						<MenuItem value={item.value} key={item.value} className='aria-selected:bg-red'>
							{forColor && item.value != '' && (
								<div className={styles.color} style={{ backgroundColor: item.color }}></div>
							)}
							<Typography variant='inherit' noWrap title={item.title}>
								{item.title}
							</Typography>
						</MenuItem>
					))
				) : (
					<Typography variant='subtitle2'>데이터가 없습니다</Typography>
				)}
			</MUISelect>
		</div>
	)
}

export default SelectDropdown