import Button from '@/elements/button'
import ControlInput from '@/elements/control-input'
import InputPhoneNumber from '@/elements/input-phone-number'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Box, Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm, ValidationMode } from 'react-hook-form'
import * as yup from 'yup'
import { ContactPopupProps } from './ContactPopup.type'
import ContactTerm from './ContactTerm/ContactTerm'
import styles from './styles.module.scss'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { ISendContactPool, sendContactPool } from '@/actions/apis/pool.action'

export default function ContactPopup({
	title,
	description,
	onCancel,
	submitTitle,
	id,
	cancelTitle,
	type = 'dark',
	poolData,
	onClose,
	...props
}: ContactPopupProps) {
	const theme = useTheme()
	const mdUp = useMediaQuery('(min-width: 768px)')
	const user = useRecoilValue(userAtom)
	useEffect(() => {
		setValue('nickname', user?.nickname || '')
		setValue('email', user?.email)
		setValue('phoneNumber', '')
		setCheckedTerm(false)
	}, [props.open])
	
	const schema = yup
		.object({
			nickname: yup.string()
				.required('이름을 입력해주세요.'),
			email: yup.string()
				.test('email', '이메일 형식을 확인해주세요', (value?: string) => emailValidator(value)),
			
			phoneNumber: yup
				.string()
				.trim()
				.test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) => phoneOptionalValidator(value))
		})
		.required()
	
	const defaultValues = {
		nickname: '',
		email: '',
		phoneNumber: '',
		message: ''
	}
	
	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
		mode: 'onChange' as keyof ValidationMode
	}
	const { handleSubmit, formState, getValues, control, register, setValue, reset, setError } = useForm(formOptions)
	const { isValid, errors } = formState
	const [checkedTerm, setCheckedTerm] = useState<boolean>(false)
	const sendContactMutate = useMutation({
		mutationFn: sendContactPool
	})
	const onSubmit = async (dataSubmit: any) => {
		const reqData: ISendContactPool = {
			fromUsername: dataSubmit.nickname,
			fromUserEmail: dataSubmit.email,
			fromUserPhoneNumber: dataSubmit.phoneNumber?.split('-')
				?.join(''),
			message: dataSubmit.message
		}
		const { data, error } = await sendContactMutate.mutateAsync({ submitData: reqData, id })
		if (error) {
			enqueueSnackbar(error.message, { variant: 'error' })
		} else {
			enqueueSnackbar('메일전송이 완료 되었습니다', { variant: 'success' })
			onCancel?.()
			setCheckedTerm(false)
			reset()
		}
	}
	
	const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
		if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
			event.preventDefault()
			return
		} else {
			reset()
			onCancel?.()
			setCheckedTerm(false)
		}
	}
	return (
		<Dialog
			onClose={handleClose}
			{...props}
			classes={{
				paper: styles.popup_paper,
				container: styles.popup_container,
				root: styles.popup_root
			}}
			sx={{
				'& .MuiPaper-root': {
					backgroundImage: 'none',
					maxWidth: convertToRem(560) + ' !important'
				}
			}}
		>
			<DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
				<div className={`${styles.content_wrapper}`}>
					<Typography
						cate="title_70"
						color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
						className={`${styles.title}`}
					>
						연락하기
					</Typography>
					<Typography
						cate="body_30"
						color={type === 'dark' ? theme.palette.main_grey.gray200 : theme.palette.main_grey.gray600}
						mt={1}
					>
						수신자에게 메일을 보냅니다.
					</Typography>
					<Box component={'form'} sx={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
						<Box
							display={'flex'}
							flexDirection="column"
							alignItems="flex-start"
							width={'100%'}
							my={mdUp ? 5 : 3}
							gap={2.5}
						>
							<Box display={'flex'} flexDirection="column" alignItems="flex-start" width={'100%'}>
								<Typography
									cate="sub_title_40"
									color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
									mb={1}
								>
									수신자
								</Typography>
								<Box
									sx={{
										height: convertToRem(56),
										width: '100%',
										backgroundColor: theme.palette.main.gray70,
										borderRadius: '0.5rem',
										display: 'flex',
										alignItems: 'center',
										padding: '0.75rem 1rem'
									}}
								>
									<Avatar
										sx={{ width: '2rem', height: '2rem' }}
										src={!!poolData?.user?.avatar?.url ? poolData?.user?.avatar?.url : '/images/blank-user.png'}
									/>
									<Typography
										cate="body_30"
										color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
										ml={1.5}
										flexShrink={(
											poolData?.user?.nickname?.length || 0
										) > 6 ? 1 : 0}
										sx={
											(
												poolData?.user?.nickname?.length || 0
											) > 6
												? {
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													display: '-webkit-box',
													WebkitLineClamp: '1',
													WebkitBoxOrient: 'vertical'
												}
												: {}
										}
									>
										{poolData?.user?.nickname}
									</Typography>
									{/* <Typography
									 cate='caption_2'
									 color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
									 ml={1.5}
									 sx={{
									 overflow: 'hidden',
									 textOverflow: 'ellipsis',
									 display: '-webkit-box',
									 WebkitLineClamp: '1',
									 WebkitBoxOrient: 'vertical'
									 }}
									 >
									 {`(${poolData?.experiences[0]?.undertaking} ${poolData?.experiences[0]?.yearsOfExperience}년차, @${poolData?.projects[0]?.projectOwner} ${poolData?.projects[0]?.projectName})`}
									 </Typography> */}
								</Box>
							</Box>
							<Box display={'flex'} flexDirection="column" alignItems="flex-start" width={'100%'}>
								<Typography
									cate="sub_title_40"
									color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
								>
									발신자 정보
								</Typography>
								<Box display={'flex'} mb={1} mt={1}>
									<Typography cate="body_30">이름</Typography>
									<Typography color={theme.palette.main.danger} cate="body_30">
										*
									</Typography>
								</Box>
								<ControlInput
									register={register}
									type="text"
									name="nickname"
									label="nickname"
									onKeyDown={(event) => {
										if (event.keyCode === 13 || event.keyCode === 176) {
											event.preventDefault()
										}
									}}
									sx={{
										padding: '0 !important'
									}}
									autoComplete="off"
									placeholder="이름 입력"
									inputProps={{
										autoComplete: 'off'
									}}
									fullWidth
									control={control}
								/>
								<Box display={'flex'} mb={1} mt={3}>
									<Typography cate="body_30">이메일</Typography>
									<Typography color={theme.palette.main.danger} cate="body_30">
										*
									</Typography>
								</Box>
								<ControlInput
									register={register}
									type="text"
									name="email"
									label="email"
									placeholder="이메일 입력"
									sx={{
										padding: '0 !important'
									}}
									onKeyDown={(event) => {
										if (event.keyCode === 13 || event.keyCode === 176) {
											event.preventDefault()
										}
									}}
									autoComplete="off"
									inputProps={{
										autoComplete: 'off'
									}}
									fullWidth
									control={control}
								/>
								<Box display={'flex'} mb={1} mt={3}>
									<Typography cate="body_30">연락처</Typography>
								</Box>
								<InputPhoneNumber
									register={register}
									sx={{
										padding: '0 !important',
										fieldset: {
											padding: 0
										},
										'.MuiInputBase-input': {
											height: 'max-content'
										}
									}}
									type="tel"
									name="phoneNumber"
									control={control}
									placeholder="연락처 입력"
								/>
								<Box display={'flex'} flexDirection="column" alignItems="flex-start" width={'100%'}>
									<Typography
										cate="sub_title_40"
										color={type === 'dark' ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray950}
										mb={1}
										mt={3}
									>
										전달 메세지
									</Typography>
									<ControlInput
										name="message"
										fullWidth
										maxLength={500}
										multiline
										register={register}
										placeholder="수신자에게 전달할 메세지를 입력해주세요."
										control={control}
										sx={{
											height: convertToRem(128) + ' !important',
											paddingY: '1rem !important',
											paddingX: '1rem !important',
											fieldset: {
												padding: '0 !important'
											},
											'.MuiInputAdornment-root': {
												display: 'none'
											},
											'.MuiInputBase-input': {
												overflow: 'auto',
												width: '100%',
												height: '100% !important',
												padding: 0
											}
										}}
									/>
								</Box>
								<ContactTerm
									checked={checkedTerm}
									onChange={() => {
										setCheckedTerm((prev) => !prev)
									}}
								/>
							</Box>
						</Box>
						<Box display={'flex'} alignItems={'center'} justifyContent={mdUp ? 'flex-end' : 'center'} width={'100%'}>
							<Button
								sx={{ width: mdUp ? convertToRem(120) : '100%', height: convertToRem(44) }}
								cate={'outlined'}
								onClick={() => {
									onCancel?.()
									setCheckedTerm(false)
									reset()
								}}
								isNonSubmit
								customTitle={
									<Typography color={theme.palette.main.gray20} cate="body_3_semibold">
										닫기
									</Typography>
								}
							/>
							<Button
								sx={{
									marginLeft: '0.5rem',
									width: mdUp ? convertToRem(120) : '100%',
									height: convertToRem(44)
								}}
								customType={'active'}
								disabled={!isValid || !checkedTerm}
								cate={'primary'}
								isOnFormPopup
								customTitle={<Typography cate="body_3_semibold">메일 보내기</Typography>}
								fullWidth
							/>
						</Box>
					</Box>
				</div>
			</DialogContent>
		</Dialog>
	)
}
