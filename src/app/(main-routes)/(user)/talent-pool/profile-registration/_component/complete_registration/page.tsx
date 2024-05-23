'use client'

import completeProfileImg from '@/assets/images/profile-complete.png'
import { Typography } from '@/elements'
import { Divider, Stack, useMediaQuery } from '@mui/material'
import Image from 'next/image'

const CompleteRegistration = () => {
	const mdDown = useMediaQuery('(max-width:768px)')
	return (
		<Stack direction={'column'} gap={6} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
			<Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
				<Typography cate={mdDown ? 'body_40' : 'title_50'} textAlign={'center'}>
					인재풀 이용을 위한 {mdDown ? <br /> : ''} 필수항목 작성을 완료했어요!
				</Typography>
				<Typography cate={mdDown ? 'body_40' : 'title_50'}>추가 내용을 기입하여, 나를 더 어필해보세요.</Typography>
			</Stack>
			<Typography cate={mdDown ? 'title_70' : 'title_80'} textAlign={'center'}>
				지금 바로 시작 해볼까요?
			</Typography>
			<Image src={completeProfileImg} alt="complete profile image" />
			<Divider
				sx={{
					width: 'inherit'
				}}
			/>
		</Stack>
	)
}

export default CompleteRegistration
