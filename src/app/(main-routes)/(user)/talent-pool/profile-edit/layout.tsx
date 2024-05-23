'use client'
import { ReactNode, useEffect, useState } from 'react'
import { PageTitle } from '@/components'
import { Divider, Stack, useMediaQuery } from '@mui/material'
import Tab from '@/elements/tab'
import Tabs from '@/elements/tabs'
import { DesignedPrimaryButton, SecondaryButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { CheckCircle, ChevronLeft } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
	editProfileStep,
	profileAtom,
	stepDefaultValue,
	submitProfileAtom
} from '@/app/(main-routes)/(user)/talent-pool/profile-atom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { arraysAreEqual, removeDuplicate } from '@/utils/array'
import { EditAlert } from '@/components/dialog'
import { getUserPool, updateUserPool } from '@/actions/apis/pool.action'
import { ProjectForm, TalentPoolForm } from '@/types/pool.type'
import { uploadMultipleFile } from '@/actions/apis/file.action'
import { createFormData } from '@/utils/object'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import { TImage } from '@/types/types.type'

type ProfileEditProps = {
	career: ReactNode
	education_information: ReactNode
	job_category: ReactNode
	other_information: ReactNode
	portfolio: ReactNode
	project: ReactNode
	children: ReactNode
}

const steps = ['career', 'education_information', 'job_category', 'other_information', 'portfolio', 'project']

const ProfileEditLayout = ({
	career,
	education_information,
	job_category,
	other_information,
	portfolio,
	project,
	children
}: ProfileEditProps) => {
	const router = useRouter()
	const [talentProfile, setTalentProfile] = useRecoilState(profileAtom)
	const submitTalentData = useRecoilValue(submitProfileAtom)
	const [editStep, setEditStep] = useRecoilState(editProfileStep)
	
	const [activeStep, setActiveStep] = useState(0)
	const [cancelAlert, setCancelAlert] = useState<boolean>(false)
	
	const [canSubmit, setCanSubmit] = useState(false)
	const mdDown = useMediaQuery('(max-width: 768px)')
	
	const uploadImageAct = useMutation({
		mutationFn: uploadMultipleFile
	})
	
	const {
		data: userProfile,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ['user-talent-profile'],
		queryFn: async () => await getUserPool()
	})
	
	const updateProfile = useMutation({
		mutationFn: async (params: Partial<TalentPoolForm>) => await updateUserPool(params),
		onSuccess: async () => {
			await refetch()
			const clone = [...editStep]
			const activeIdx = editStep.findIndex((val) => val.value === activeStep)
			
			clone[activeIdx] = { ...editStep[activeIdx], isSave: true }
			
			setEditStep(clone)
		}
	})
	
	const handleStepChange = (_: any, newValue: number) => {
		setActiveStep(newValue)
	}
	
	const handleUploadImage = async (file: File[]) => {
		if (file && file.length > 0) {
			const uploadFormData = createFormData({
				fileUploads: file,
				folderName: IMAGE_FOLDER.POOL
			})
			
			const { data } = await uploadImageAct.mutateAsync(uploadFormData)
			return data
		}
	}
	
	const handleSave = async () => {
		switch (activeStep) {
			case 0:
				if (submitTalentData.occupations.length > 0) {
					updateProfile.mutate({ occupations: submitTalentData.occupations })
				}
				break
			case 1:
				if (submitTalentData.schools.length > 0) {
					updateProfile.mutate({ schools: submitTalentData.schools })
				}
				break
			case 2:
				if (submitTalentData.experiences.length > 0) {
					updateProfile.mutate({
						experiences: submitTalentData.isFresher ? [] : submitTalentData.experiences,
						isFresher: submitTalentData.isFresher
					})
				}
				break
			case 3:
				if (submitTalentData.projects.length > 0) {
					const newSubmitProjectData = submitTalentData.projects.map((item: ProjectForm) => {
						const { formId, ...restItem } = item
						return { ...restItem }
					})
					updateProfile.mutate({ projects: newSubmitProjectData })
				}
				break
			case 4:
				if (submitTalentData.urls.length > 0) {
					const newSubmitUrlsData: any = submitTalentData.urls
						.filter((item) => item.isSubmit)
						.map((item) => {
							return item.value
						})
					const newSubmitFilesData: any = submitTalentData.files.map((item) => {
						return item.value
					})
					let finalData: any = undefined
					if (newSubmitFilesData && newSubmitFilesData?.length > 0) {
						const localUploadFile = newSubmitFilesData.filter((item: any) => !item.id)
						const uploadFiles = await handleUploadImage(localUploadFile)
						const resIds = uploadFiles?.map((i) => i.id) || []
						const serverFiles = newSubmitFilesData.filter((item: any) => item.id)
						const serverIds = serverFiles.map((i: TImage) => i.id) || []
						finalData = removeDuplicate(resIds.concat(serverIds))
							.map((i: number) => (
								{ id: i }
							))
					}
					
					updateProfile.mutate({ urls: newSubmitUrlsData, files: finalData })
				}
				break
			case 5:
				updateProfile.mutate({
					introduction: submitTalentData.introduction,
					city: submitTalentData.city,
					district: submitTalentData.district,
					skills: submitTalentData.skills
				})
				break
		}
		// if (activeStep <= steps.length) {
		// 	setActiveStep((prevActiveStep) => prevActiveStep + 1)
		// }
	}
	
	const dirtyStepOne = () => {
		const jobId = talentProfile.occupations?.map((val) => {
			return { id: val.id }
		})
		
		if (submitTalentData.occupations.length > 1) {
			return !arraysAreEqual(jobId, submitTalentData.occupations)
		} else {
			return false
		}
	}
	
	const dirtyStepTwo = () => {
		return !arraysAreEqual(talentProfile.schools, submitTalentData.schools)
	}
	
	const dirtyStepThree = () => {
		if (submitTalentData.isFresher) {
			return true
		} else {
			return !arraysAreEqual(talentProfile.experiences, submitTalentData.experiences)
			
		}
	}
	
	const dirtyStepFour = () => {
		const jobId = talentProfile.projects?.map((val) => {
			return val.id
		})
		const submitIds = submitTalentData.projects.map((val) => {
			return val.id || null
		})
		return !arraysAreEqual(jobId, submitIds)
	}
	
	const dirtyStepFive = () => {
		const urls = submitTalentData.urls
			.filter((val) => val.isSubmit)
			.map((val) => {
				return val.value
			})
		const files = submitTalentData.files.filter((item) => !item.value.id) || []
		return (
			urls.some((item) => !talentProfile.urls.includes(item)) ||
			files.length > 0 ||
			urls.length !== talentProfile.urls.length ||
			submitTalentData.files.length !== talentProfile.files.length
		)
	}
	
	const dirtyStepSix = () => {
		return (
			talentProfile.city !== submitTalentData.city ||
			talentProfile.district !== submitTalentData.district ||
			talentProfile.introduction !== submitTalentData.introduction ||
			submitTalentData.skills.some((item) => !talentProfile.skills.includes(item)) ||
			submitTalentData.skills.length !== talentProfile.skills.length
		)
	}
	
	const onBackConfirm = () => {
		router.back()
		setEditStep(stepDefaultValue)
	}
	
	const handleBack = () => {
		if (dirtyStepOne() || dirtyStepTwo() || dirtyStepThree() || dirtyStepFour() || dirtyStepFive() || dirtyStepSix()) {
			setCancelAlert(true)
		} else {
			onBackConfirm()
		}
	}
	
	const handleReset = () => {
		setActiveStep(0)
	}
	
	useEffect(() => {
		if (!isFetching && userProfile) {
			setTalentProfile(userProfile)
		}
	}, [userProfile, isFetching])
	
	useEffect(() => {
		const stepDirtyHandle = () => {
			switch (activeStep) {
				case 0:
					setCanSubmit(dirtyStepOne)
					break
				case 1:
					setCanSubmit(dirtyStepTwo)
					break
				case 2:
					setCanSubmit(dirtyStepThree)
					break
				case 3:
					setCanSubmit(dirtyStepFour)
					break
				case 4:
					setCanSubmit(dirtyStepFive)
					break
				case 5:
					setCanSubmit(dirtyStepSix)
					break
				default:
					setCanSubmit(false)
					break
			}
		}
		
		if (talentProfile) {
			stepDirtyHandle()
		}
	}, [activeStep, submitTalentData, talentProfile])
	
	return (
		<>
			<Stack direction={'column'} justifyContent={'flex-start'}>
				<PageTitle containerSx={{
					mt: 0
				}}>프로필 정보 수정</PageTitle>
				<Tabs
					value={activeStep}
					variant="scrollable"
					onChange={handleStepChange}
					scrollButtons
					allowScrollButtonsMobile
				>
					{editStep.map((item, index) => (
						<Tab
							key={index}
							value={item.value}
							label={
								<Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
									{item.isSave ? <CheckCircle /> : null}
									<Typography>{item.label}</Typography>
								</Stack>
							}
						/>
					))}
				</Tabs>
				<Stack direction={'column'} gap={6} useFlexGap={true}>
					{activeStep === 0 ? job_category : null}
					{activeStep === 1 ? education_information : null}
					{activeStep === 2 ? career : null}
					{activeStep === 3 ? project : null}
					{activeStep === 4 ? portfolio : null}
					{activeStep === 5 ? other_information : null}
					<Divider orientation="horizontal" flexItem />
					<Stack
						direction={'row'}
						justifyContent={{ md: 'space-between', sm: 'center' }}
						alignItems={'center'}
						width={'100%'}
						gap={1}
					>
						<SecondaryButton
							btnSize={mdDown ? 'designed-md' : 'xs-np'}
							fullWidth={mdDown}
							action={handleBack}
							sx={{ borderRadius: { md: '99px', sm: '8px' }, minWidth: convertToRem(121), gap: 1 }}
						>
							<ChevronLeft
								sx={{
									height: convertToRem(20),
									width: convertToRem(20),
									color: 'main_grey.gray300'
								}}
							/>
							<Typography plainColor="main_grey.gray200" cate="button_20">
								이전으로
							</Typography>
						</SecondaryButton>
						<DesignedPrimaryButton
							btnSize="designed-md"
							fullWidth={mdDown}
							sx={{
								minWidth: convertToRem(160)
							}}
							disabled={!canSubmit}
							onClick={handleSave}
						>
							{activeStep === steps.length - 1 ? '작성 완료' : '정보 저장하기'}
						</DesignedPrimaryButton>
					</Stack>
				</Stack>
			</Stack>
			<EditAlert
				open={cancelAlert}
				title={'작성이 완료되지 않았습니다.'}
				description={'작성중이던 내용이 있다면 모두 소실됩니다.'}
				submitTxt="확인"
				cancelTxt="취소"
				onCancel={() => {
					setCancelAlert(false)
				}}
				onSubmit={() => {
					onBackConfirm()
				}}
			/>
		</>
	)
}

export default ProfileEditLayout
