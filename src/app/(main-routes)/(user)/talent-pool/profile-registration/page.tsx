'use client'
import { EditAlert } from '@/components/dialog'
import { PrimaryButton, SecondaryButton, Typography } from '@/elements'
import { TalentPoolForm } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { CloseOutlined } from '@mui/icons-material'
import { Stack, useMediaQuery } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import CareerInformation, { CareerInformationRef } from './_component/career_information/page'
import CompleteRegistration from './_component/complete_registration/page'
import OccupationRegistration from './_component/occupation_registration/page'
import SkillPossess from './_component/skill_possess/page'
import { profileDefaultValue, submitProfileAtom } from '../profile-atom'
import { createUserPool } from '@/actions/apis/pool.action'

const steps = ['Occupation', 'Skill', 'Career']

const ProfileRegistration = () => {
	const router = useRouter()
	const mdDown = useMediaQuery('(max-width: 768px)')
	
	const [talentProfile, setTalentProfile] = useRecoilState(submitProfileAtom)
	
	const [activeStep, setActiveStep] = useState(2)
	const [skipped, setSkipped] = useState(new Set<number>())
	const [openCancel, setOpenCancel] = useState<boolean>(false)
	const careerInformationRef = useRef<CareerInformationRef>(null)
	
	const createUserPoolMutation = useMutation({
		mutationKey: ['create-user-talent-pool'],
		mutationFn: async (profile: TalentPoolForm) => {
			const { data, error } = await createUserPool(profile)
			if (error) throw error
			return data
		},
		onSuccess: () => {
			router.replace('/talent-pool')
		},
		onError: (error) => {
			enqueueSnackbar(error.message, {
				variant: 'warning'
			})
		}
	})
	
	const isStepOptional = (step: number) => {
		return step === 1
	}
	
	const isStepSkipped = (step: number) => {
		return skipped.has(step)
	}
	
	const handleNext = () => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}
		
		if ((
			activeStep === 0 && talentProfile.occupations.length < 1
		) || talentProfile.title === '') {
			enqueueSnackbar('모든 데이터 입력 후 다음 단계로 이동해주세요', { variant: 'error' })
			return
		}
		
		if (activeStep === 1 && talentProfile.skills.length === 0) {
			enqueueSnackbar('모든 데이터 입력 후 다음 단계로 이동해주세요', { variant: 'error' })
			return
		}
		
		if (activeStep === steps.length - 1) {
			const careerRef = careerInformationRef.current
			if (careerRef && !careerRef.fresher) {
				if (talentProfile.experiences.length === 0) {
					careerRef.validateCareer()
					return
				}
			}
			
			if (careerRef && careerRef.fresher) {
				setTalentProfile({ ...talentProfile, isFresher: true })
			}
		}
		
		if (activeStep === steps.length) {
			createUserPoolMutation.mutate(talentProfile)
			return
		}
		
		if (activeStep <= steps.length) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1)
			setSkipped(newSkipped)
		}
	}
	
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}
	
	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error('You can\'t skip a step that isn\'t optional.')
		}
		
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values())
			newSkipped.add(activeStep)
			return newSkipped
		})
	}
	
	const handleReset = () => {
		setActiveStep(0)
	}
	
	const handleCancelRegistration = () => {
		switch (activeStep) {
			case 0:
				if (talentProfile.occupations.length >= 1 || talentProfile.title !== '') {
					setOpenCancel(true)
				} else {
					router.back()
					setTalentProfile(profileDefaultValue)
				}
				break
			case 1:
			case 2:
				setOpenCancel(true)
				break
		}
	}
	
	return (
		<Stack sx={{ width: '100%' }} direction={'column'} alignItems={'center'} position={'relative'}>
			{activeStep === steps.length ? (
				<Stack
					direction={'column'}
					gap={6}
					alignItems={'center'}
					justifyContent={'flex-start'}
					sx={{
						width: { md: convertToRem(728), sx: '100%' },
						marginTop: { md: convertToRem(120), sm: 0 }
					}}
				>
					<CompleteRegistration />
					<Stack direction={'row'} gap={2}>
						<SecondaryButton
							btnSize="md-np"
							sx={{
								width: convertToRem(160)
							}}
							disabled={activeStep === 0}
							onClick={() => {
								router.replace('/talent-pool')
							}}
						>
							<Typography cate="button_30" plainColor={activeStep === 0 ? 'main_grey.gray500' : 'main.white'}>
								추가작성하기
							</Typography>
						</SecondaryButton>
						<PrimaryButton
							btnSize="md-np"
							sx={{
								width: convertToRem(160)
							}}
							onClick={handleNext}
						>
							<Typography cate="button_30">프로필 등록하기</Typography>
						</PrimaryButton>
					</Stack>
				</Stack>
			) : (
				<Stack direction={'column'} gap={6} alignItems={'center'} justifyContent={'flex-start'} width={'100%'}>
					<Stack direction={'row'} mt={3} justifyContent={'flex-start'} width={'100%'}>
						<SecondaryButton
							btnSize="xs-np"
							action={handleCancelRegistration}
							sx={{ borderRadius: '99px !important', width: 121, gap: 1 }}
						>
							<CloseOutlined
								sx={{
									height: convertToRem(16),
									width: convertToRem(16),
									color: 'main_grey.gray300'
								}}
							/>
							<Typography plainColor="main_grey.gray200" cate="button_20">
								나중에 작성
							</Typography>
						</SecondaryButton>
					</Stack>
					<Stack
						sx={{
							width: { md: convertToRem(736), sm: '100%' },
							marginTop: convertToRem(32),
							display: 'flex',
							justifyContent: 'center'
						}}
						gap={6}
					>
						<Stack direction={'column'} justifyContent={'center'} alignItems={'center'} width={'inherit'}>
							<Typography cate={mdDown ? 'body_40' : 'title_50'}>안녕하세요</Typography>
							<Typography cate={mdDown ? 'body_40' : 'title_50'}>인재풀 작성을 시작해 볼까요?</Typography>
						</Stack>
						{activeStep === 0 ? <OccupationRegistration /> : null}
						{activeStep === 1 ? <SkillPossess /> : null}
						{activeStep === 2 ? <CareerInformation ref={careerInformationRef} /> : null}
					</Stack>
					<Stack direction={'row'} justifyContent={'center'} gap={2} width={'100%'}>
						<SecondaryButton
							btnSize="md-np"
							sx={{
								width: { md: convertToRem(120), sm: '100%' }
							}}
							disabled={activeStep === 0}
							onClick={handleBack}
						>
							<Typography cate="button_30" plainColor={activeStep === 0 ? 'main_grey.gray500' : 'main.white'}>
								이전
							</Typography>
						</SecondaryButton>
						<PrimaryButton
							btnSize="md-np"
							sx={{
								width: { md: convertToRem(120), sm: '100%' }
							}}
							onClick={handleNext}
						>
							<Typography cate="button_30">{activeStep === steps.length - 1 ? '작성 완료' : '다음'}</Typography>
						</PrimaryButton>
					</Stack>
				</Stack>
			)}
			<EditAlert
				open={openCancel}
				title="작성이 완료되지 않았습니다."
				description="작성 중이던 내용이 있다면 모두 소실됩니다."
				submitTxt="확인"
				cancelTxt="취소"
				onSubmit={() => {
					router.back()
					setTalentProfile(profileDefaultValue)
				}}
				onCancel={() => setOpenCancel(false)}
			/>
		</Stack>
	)
}

export default ProfileRegistration
