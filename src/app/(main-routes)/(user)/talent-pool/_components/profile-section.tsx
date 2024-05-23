import Typography from '@/elements/typography'
import { ColorPalette } from '@/themes/get-design-tokens'
import { Stack, StackProps } from '@mui/material'

type SectionCustom = StackProps & {
	title?: string
	titleColor?: ColorPalette
}

const ProfileSection = ({ title, titleColor, children, ...rest }: SectionCustom) => {
	return (
		<Stack direction={'column'} gap={2} {...rest} width={'100%'}>
			{title ? (
				<Typography cate={'title_50'} plainColor={titleColor}>
					{title}
				</Typography>
			) : null}
			{children}
		</Stack>
	)
}
export default ProfileSection
