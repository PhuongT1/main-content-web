import LinkExpiredIcon from '@/assets/icons/link-expired'
import { PrimaryButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { useTheme } from '@mui/material'
import { Box } from '@mui/system'
import styles from '../styles.module.scss'

const LinkExpired = ({ onClick, buttonTitle }: any) => {
	const theme = useTheme()

	return (
		<>
			<Box
				className={styles.send_email}
				sx={{ backgroundColor: { md: theme.palette.main.black, xs: 'transparent' } }}
				p={{ md: 6, xs: 3 }}
			>
				<Box
					alignItems={'center'}
					justifyContent={'center'}
					display={'flex'}
					borderRadius={'50%'}
					sx={{
						backgroundColor: theme.palette.main_grey.gray700,
						width: convertToRem(120),
						height: convertToRem(120)
					}}
				>
					<LinkExpiredIcon />
				</Box>
				<Typography cate={'title_70'} breakpoints={{ md: 'title_60' }} my={3}>
					유효기간이 만료된 링크입니다.
				</Typography>
				<Typography
					cate="body_40"
					breakpoints={{ md: 'body_3' }}
					color={theme.palette.main_grey.gray300}
					textAlign="center"
				>
					유효기간이 종료된 링크입니다. 이메일 인증을 다시 시도해주세요
				</Typography>
				<PrimaryButton
					btnSize={'md'}
					fullWidth
					onClick={onClick}
					sx={{
						mt: 6
					}}
				>
					<Typography cate="button_40">{buttonTitle || '회원가입 페이지로 이동하기'}</Typography>
				</PrimaryButton>
			</Box>
		</>
	)
}

export default LinkExpired
