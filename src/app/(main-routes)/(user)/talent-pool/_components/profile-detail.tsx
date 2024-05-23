import { userPoolAtom } from '@/atoms/user-pool'
import { BaseChip, ResponsiveList, SecondaryActiveChip, Typography } from '@/elements'
import { IEducation, IExperience, IProject, Occupation } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Collapse, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import ProjectItem from '../../_components/ProjectItem'
import FileTag from './FileTag'
import CareerCardItem from './career-card-item'
import PaperCard from './paper-card'
import ProfileSection from './profile-section'
import EducationCard from '@/components/cards/education.card'
import { OutlineBlue300Button, RoundedButton } from '@/elements/v2/button'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import ChevronDownSmIcon from '@/assets/icons/chevrons/chevron-down-sm'
import { useState } from 'react'

const ProfileDetail = () => {
	const userPool = useRecoilValue(userPoolAtom)
	const theme = useTheme()
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	
	const [show, setShow] = useState<boolean>(false)
	const visibleCharacters = 200
	
	return !!userPool ? (
		<Stack gap={mdDown ? 5 : 6} direction={'column'} alignItems={'center'} pt={{ md: 6, sm: 3 }}>
			{/* Occupation Section */}
			<ProfileSection title="직군">
				<Stack direction={'row'} gap={1} flexWrap={'wrap'}>
					{userPool.occupations?.length > 0 &&
						userPool.occupations.map((i: Occupation, index: number) => (
							<BaseChip
								key={index}
								label={<Typography cate="button_20_bold">{i.name}</Typography>}
								sx={{ height: convertToRem(38) }}
							/>
						))}
				</Stack>
			</ProfileSection>
			{/* School Section */}
			{userPool.schools && userPool.schools.length > 0 ? (
				<ProfileSection title="학력">
					<PaperCard>
						<ResponsiveList minGap={[600, 16]} minBreakpoints={{ md: [320, 24] }}>
							{userPool.schools.map((i: IEducation, idx) => (
								<EducationCard key={idx} education={i} />
							))}
						</ResponsiveList>
					</PaperCard>
				</ProfileSection>
			) : null}
			{/* Experiences Section */}
			{userPool.experiences && userPool.experiences.length > 0 ? (
				<Stack direction={'column'} gap={2} width={'100%'}>
					<Typography cate="title_50">
						경력{' '}
						<Typography component={'span'} cate="sub_title_30" plainColor="sub.teal400">
							{userPool?.yearsOfExperience}년
						</Typography>
					</Typography>
					<PaperCard>
						<ResponsiveList minGap={[600, 16]} minBreakpoints={{ md: [320, 24] }}>
							{userPool.experiences.map((i: IExperience) => (
								<CareerCardItem key={i.uuid} item={i} />
							))}
						</ResponsiveList>
					</PaperCard>
				</Stack>
			) : null}
			{/* Skill Section */}
			{userPool.skills && userPool.skills.length > 0 ? (
				<ProfileSection title="보유기술 / 자격증">
					<Stack direction={'row'} gap={1} useFlexGap flexWrap={'wrap'}>
						{userPool?.skills?.map((i: string, index: number) => (
							<SecondaryActiveChip
								key={index}
								chipHeight={38}
								sx={{
									minWidth: convertToRem(65)
								}}
								label={
									<Typography cate="button_20_bold" plainColor="main_primary.blue300">
										{i}
									</Typography>
								}
							/>
						))}
					</Stack>
				</ProfileSection>
			) : null}
			{/* Project Section */}
			{userPool.projects && userPool.projects.length > 0 ? (
				<ProfileSection title="프로젝트">
					<Grid container gap={2}>
						{userPool?.projects?.map((item: IProject) => (
							<Grid item xs={12} key={item.id}>
								<ProjectItem item={item} />
							</Grid>
						))}
					</Grid>
				</ProfileSection>
			) : null}
			{(
				userPool.files && userPool.files.length > 0
			) || (
				userPool.urls && userPool.urls.length > 0
			) ? (
				<Stack width={'100%'} gap={mdDown ? 5 : 6}>
					<Typography cate="title_50">포트폴리오</Typography>
					{/* File Section */}
					{userPool.files.length > 0 ? (
						<ProfileSection title="파일">
							<Grid container gap={2}>
								{userPool?.files?.map((i: any) => (
									<FileTag
										title={i.name}
										key={i.id}
										onClick={() => {
											window.open(i.url)
										}}
									/>
								))}
							</Grid>
						</ProfileSection>
					) : null}
					{/* Url Section */}
					{userPool.urls.length > 0 ? (
						<ProfileSection title="URL">
							<Grid container gap={1}>
								{userPool?.urls?.map((url: string, index: number) => (
									<Grid key={index} item py={2} xs={12} alignItems={'center'} direction={'row'}
									      display={'flex'}>
										<Box component={'a'} href={'https://' + url} target="__blank">
											<Typography
												cate="link_20_bold"
												color={theme.palette.main.primary_light}
												sx={{
													textDecoration: 'underline',
													wordBreak: 'break-all'
												}}
											>
												{url}
											</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</ProfileSection>
					) : null}
				</Stack>
			) : null}
			{/* Address Section */}
			{userPool.city && userPool.district ? (
				<ProfileSection title="활동지역">
					<Stack direction={'row'} gap={1} useFlexGap flexWrap={'wrap'}>
						<BaseChip label={<Typography cate="link_20_bold">{userPool.district}</Typography>} />
						<BaseChip label={<Typography cate="link_20_bold">{userPool.city}</Typography>} />
						{
							userPool.location
								? <BaseChip label={<Typography cate="link_20_bold">{userPool.location}</Typography>} />
								: null
						}
					</Stack>
				</ProfileSection>
			) : null}
			{/* Introduction Section */}
			{userPool.introduction ? (
				<ProfileSection title="자기소개">
					<PaperCard
						sx={{
							maxWidth: '1416px',
							padding: '40px'
						}}
					>
						<Stack direction={'column'} gap={3} alignItems={'center'}>
							<Collapse in={show} collapsedSize={50}>
								<Typography cate="body_30">
									{show
										? userPool.introduction
										: userPool.introduction.length > visibleCharacters
											? `${userPool.introduction.slice(0, visibleCharacters)}...`
											: userPool.introduction}
								</Typography>
							</Collapse>
							<RoundedButton
								btnSize="xxs-np"
								sx={{
									width: '104px'
								}}
								onClick={() => {
									setShow((prev) => !prev)
								}}
							>
								{show ? (
									<>
										<Typography cate="button_20">접기</Typography>
										<ChevronUp stroke={'white'} />
									</>
								) : (
									<>
										<Typography cate="button_20">펼치기</Typography>
										<ChevronDownSmIcon stroke={'white'} />
									</>
								)}
							</RoundedButton>
						</Stack>
					</PaperCard>
				</ProfileSection>
			) : null}
			<Divider orientation={'horizontal'} flexItem />
			<OutlineBlue300Button btnSize={'md'}>
				<Typography cate="button_20">인재풀 바로가기</Typography>
			</OutlineBlue300Button>
		</Stack>
	) : (
		<Typography
			cate="body_3"
			color={theme.palette.main_grey.gray300}
			my={mdDown ? 10 : 20}
			sx={{ width: '100%' }}
			textAlign={'center'}
		>
			등록된 프로필 정보가 없습니다.
		</Typography>
	)
}

export default ProfileDetail
