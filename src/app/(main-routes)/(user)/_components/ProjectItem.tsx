import CloseSmIcon from '@/assets/icons/close-sm'
import Typography from '@/elements/typography'
import { IProject } from '@/types/pool.type'
import { Box, BoxProps, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

const Section = styled(Box)<BoxProps>(({ theme }) => (
	{
		backgroundColor: theme.palette.main_grey.gray700,
		width: '100%',
		padding: '1rem',
		borderRadius: '1rem',
		fieldset: {
			border: 0
		}
	}
))

interface ProjectItemProps {
	item: IProject
	onClose?: any
}

const ProjectItem = ({ item, onClose }: ProjectItemProps) => {
	const theme = useTheme()
	const xlUp = useMediaQuery('(min-width: 992px)')
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	return (
		<Section>
			<Box
				display={'flex'}
				alignItems={xlUp ? 'center' : 'flex-start'}
				mb={2}
				flexDirection={xlUp ? 'row' : !!onClose ? 'row' : 'column'}
				justifyContent={'space-between'}
			>
				<Box display={'flex'} alignItems={!xlUp ? 'flex-start' : 'center'} flexDirection={!xlUp ? 'column' : 'row'}>
					<Typography cate="subtitle_1" mr={3}>
						{item?.projectName}
					</Typography>
					<Typography
						cate="caption_1"
						color={!!onClose || mdDown ? theme.palette.main.orange : theme.palette.main.point}
					>
						{moment(item?.startDateAt, 'YYYY-MM-DD')
								.format('YYYY.MM') +
							' ~ ' +
							moment(item?.endDateAt, 'YYYY-MM-DD')
								.format('YYYY.MM')}{' '}
						/ {item?.projectOwner}
					</Typography>
				</Box>
				<Box display={'flex'} alignItems={'center'}>
					{!!onClose && (
						<IconButton
							onClick={onClose}
							sx={{
								border: '1px solid ' + theme.palette.main_grey.gray500,
								padding: '0.5rem',
								marginLeft: !xlUp ? 0 : '2.5rem'
							}}
						>
							<CloseSmIcon />
						</IconButton>
					)}
				</Box>
			</Box>
			<Typography cate="caption_1" mb={2} whiteSpace={'pre-line'}>
				{item?.description}
			</Typography>
			{!!item?.relatedLink && (
				<Box
					display={'flex'}
					alignItems={xlUp ? 'center' : 'flex-start'}
					mb={2}
					flexDirection={xlUp ? 'row' : 'column'}
				>
					<Typography cate="caption_2" flexShrink={0}>
						관련 링크:{' '}
					</Typography>
					<Link href={item?.relatedLink} legacyBehavior>
						<Typography
							cate="caption_2"
							ml={xlUp ? 0.5 : 0}
							color={theme.palette.main.primary_light}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								width: '100%',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical'
							}}
						>
							{item?.relatedLink}
						</Typography>
					</Link>
				</Box>
			)}
		</Section>
	)
}

export default ProjectItem
