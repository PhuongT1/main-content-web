import TrashIcon from '@/assets/icons/trash'
import { TestImage } from '@/assets/images'
import { RoundedSolidIconButton, Typography } from '@/elements'
import { ITalentContact, ITalentProfile } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Divider, Stack, useMediaQuery } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'

type TalentPoolContactsCardProps<T> = {
	item: T
	onDelete?: () => void,
	talentProfile?: ITalentProfile
}

const TalentPoolContactsCard = ({ item, onDelete, talentProfile }: TalentPoolContactsCardProps<ITalentContact>) => {
	const mdDown = useMediaQuery('(max-width: 768px)')
	const haveDate = true
	return (
		<Stack
			p={3}
			direction={{ md: 'row', sm: 'column' }}
			gap={{ md: 4, sm: 2 }}
			borderRadius={2}
			bgcolor={'main_grey.gray800'}
			position={'relative'}
		>
			{mdDown ? (
				<RoundedSolidIconButton
					sx={{
						position: 'absolute',
						top: convertToRem(24),
						right: convertToRem(16),
						padding: 0.5
					}}
					onClick={() => onDelete?.()}
				>
					<TrashIcon pathProps={{ stroke: '#F2F2F2' }} />
				</RoundedSolidIconButton>
			) : null}
			<Stack justifyContent={'center'} alignItems={'center'} gap={2} width={'100%'} flexGrow={1}>
				<Image
					width={mdDown ? 140 : 160}
					height={mdDown ? 140 : 160}
					style={{
						objectFit: 'cover',
						borderRadius: '50%'
					}}
					src={talentProfile?.user && talentProfile?.user.avatar ? talentProfile.user.avatar.url : TestImage}
					alt={`book-mark-${0}`}
				/>
				<Stack direction={'row'} gap={1} alignItems={'center'} justifyContent={'center'} useFlexGap flexWrap={'wrap'}
				       width={'100%'}>
					<Typography cate="title_60" plainColor="main_grey.gray100" sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}>
						{talentProfile?.user.nickname || 'Talent Name'}
					</Typography>
					{haveDate && (
						<Typography cate="title_40" plainColor="main_primary.blue300">
							{talentProfile?.yearsOfExperience || 0}년
						</Typography>
					)}
				</Stack>
				<Stack gap={0.25} width={'100%'}>
					<Typography cate="sub_title_30" plainColor="main_grey.gray100">
						전문분야
					</Typography>
					{
						talentProfile && talentProfile?.skills.length > 0 ? <Typography cate="body_30" plainColor="main.blue">
							{talentProfile?.skills.join(', ')}
						</Typography> : null
					}
				</Stack>
			</Stack>
			<Divider
				orientation={mdDown ? 'horizontal' : 'vertical'}
				flexItem
				sx={{
					borderColor: 'main_grey.gray700',
					flexBasis: 0,
					flexGrow: 0
				}}
			/>
			<Stack direction={'column'} gap={2.5} width={'100%'} flexGrow={1}>
				<Stack direction={'row'} alignItems={'flex-end'} justifyContent={'space-between'}>
					<Typography cate="caption_20" plainColor={'main_grey.gray200'}>연락 일자
						: {moment(item?.createdAt).format('YYYY.MM.DD hh:mm:ss')}</Typography>
					{!mdDown ? (
						<RoundedSolidIconButton
							sx={{
								padding: 0.5
							}}
							onClick={() => onDelete?.()}
						>
							<TrashIcon pathProps={{ stroke: '#9F9EA4' }} />
						</RoundedSolidIconButton>
					) : null}
				</Stack>
				<Box
					p={2}
					borderRadius={2}
					sx={{
						width: '100%',
						height: '100%',
						minHeight: { md: 'unset', sm: convertToRem(137) },
						bgcolor: 'main_grey.gray700'
					}}
				>
					{item?.message}
				</Box>
			</Stack>
		</Stack>
	)
}

export default TalentPoolContactsCard
