import { CirclePrimaryCheckbox, WhiteInput } from '@/elements'
import Typography from '@/elements/typography'
import { PrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, Grid, Stack, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import React, { ChangeEvent, useState } from 'react'
import { ReportPopupProps } from './report-popup.type'
import styles from './styles.module.scss'
import { reportComment } from '@/actions/apis/comment.action'

const reasonList = [
	'영리목적/홍보성',
	'개인정보 노출',
	'불법정보',
	'음란성/선정성',
	'욕설/인신공격',
	'아이디/DB거래',
	'같은 내용 반복(도배)',
	'기타'
]

export default function ReportPopup({
	title,
	description,
	onSubmit,
	onCancel,
	submitTitle,
	cancelTitle,
	commentId,
	onClose,
	...props
}: ReportPopupProps) {
	const theme = useTheme()
	const { themeMode } = useThemeMode()
	const [checkedList, setCheckedList] = useState<number[]>([])
	const [reason, setReason] = useState<string>('')
	const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
		if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
			event.preventDefault()
			return
		} else {
			if (onCancel) {
				setCheckedList([])
				onCancel()
			} else if (onSubmit) {
				setCheckedList([])
				onSubmit()
			}
		}
	}
	
	const reportCommentMutation = useMutation({
		mutationKey: ['report-comment'],
		mutationFn: async () => {
			const body = {
				type: 'COMMENT',
				commentId: commentId,
				reason,
				category: checkedList
			}
			const { data, error } = await reportComment(body)
			
			if (error) throw error
			
			return data
		},
		onSuccess: () => {
			onCancel?.()
			setCheckedList([])
			enqueueSnackbar('신고접수가 완료되었습니다.', { variant: 'success' })
		},
		onError: (error) => {
			onCancel?.()
			setCheckedList([])
			enqueueSnackbar(error.message, {
				variant: 'error'
			})
		}
	})
	
	const setCheckItem = (value: number) => {
		if (checkedList.includes(value)) {
			let newCheckedList = [...checkedList].filter((i) => i !== value)
			setCheckedList(newCheckedList)
		} else {
			let newCheckedList = [...checkedList]
			newCheckedList.push(value)
			setCheckedList(newCheckedList)
		}
	}
	
	const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
		setReason(event.target.value)
	}
	
	return (
		<Dialog
			onClose={handleClose}
			{...props}
			classes={{
				paper: styles.popup_paper,
				// container: styles.popup_container,
				root: styles.popup_root
			}}
			sx={{
				'& .MuiDialog-paper': {
					maxWidth: 'unset',
					width: convertToRem(560)
				}
			}}
		>
			<DialogContent
				sx={{
					backgroundColor: theme.palette.popup.general.background.color
				}}
				className={`${styles.popup_wrapper}`}
			>
				<Stack
					direction={'column'}
					justifyContent={'center'}
					alignItems={'flex-start'}
					className={`${styles.content_wrapper}`}
					sx={{
						paddingX: convertToRem(32),
						paddingY: { md: convertToRem(32), sm: convertToRem(20) }
					}}
					gap={5}
				>
					<Typography cate="title_70" plainColor="popup.general.title" className={`${styles.title}`}>
						신고 사유를 선택해주세요.
					</Typography>
					<Stack direction="column" alignItems="flex-start" gap={3}>
						<Grid container spacing={2}>
							{reasonList?.map((item: string, index: number) => (
								<Grid item xs={12} md={6} key={index}>
									<Stack direction={'row'} gap={0.5} justifyContent={'flex-start'} alignItems={'center'}>
										<CirclePrimaryCheckbox
											checked={checkedList.includes(index)}
											sx={{
												'& .MuiTypography-root': {
													color: theme.palette.popup.general.title
												}
											}}
											onChange={() => {
												setCheckItem(index)
											}}
										/>
										<Typography cate="body_40" plainColor="popup.general.title">
											{item}
										</Typography>
									</Stack>
								</Grid>
							))}
						</Grid>
						<Stack gap={1} width={'100%'}>
							<Typography cate="body_30" plainColor={'popup.general.title'}>
								신고 사유 작성(선택)
							</Typography>
							<WhiteInput
								name="content"
								fullWidth
								multiline
								value={reason}
								onChange={handleReasonChange}
								placeholder="사유를 작성해주세요."
								sx={{
									height: convertToRem(128) + ' !important',
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
						</Stack>
					</Stack>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'} gap={1}>
						<SecondaryGrayButton
							sx={{
								width: convertToRem(120)
							}}
							btnSize="xs-np"
							onClick={() => {
								onCancel?.()
								setCheckedList([])
								setReason('')
							}}
						>
							<Typography plainColor={'button.neutral.label'} cate="button_30">
								취소
							</Typography>
						</SecondaryGrayButton>
						<PrimaryButton
							sx={{
								width: convertToRem(120)
							}}
							btnSize="xs-np"
							onClick={() => {
								reportCommentMutation.mutateAsync()
									.then(() => {
										setCheckedList([])
										setReason('')
									})
							}}
							disabled={checkedList.length === 0}
						>
							<Typography
								cate="button_30"
								plainColor={checkedList.length === 0 ? 'button.primary.disabled.label' : 'button.primary.label'}
							>
								신고하기
							</Typography>
						</PrimaryButton>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	)
}
