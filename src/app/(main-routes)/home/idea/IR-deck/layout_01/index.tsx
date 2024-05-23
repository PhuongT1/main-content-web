import bg from '@/assets/images/idea/bg_layout_1.png'
import { iRPalette } from '@/atoms/home/stepper'
import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { DataIdeaIR } from '@/types/idea.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import { useRecoilValue } from 'recoil'
import CardDetail from './components'


const Layout_1_Idea = ({ data, dataIdea }: DataIdeaIR) => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)

    return (
        <LayoutOneIR
            sxContainer={{
                background: 'linear-gradient(222deg, #FAFAFA 51.31%, rgba(250, 250, 250, 0.80) 84.88%)',
                padding: remConvert('40px'),
                backgroundImage: `url(${bg.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}
            header={{
                leftItem: {
                    title: 'CREATIVE DESTRUCTION',
                    subTitle: dict.idea_ir_left_sub_title
                },
                centerItem: {
                    title: dict.teambuilding,
                    subTitle: dict.idea_ir_center_sub_title
                }
            }}
        >
            <Box
                component={'div'}
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: remConvert('20px'),
                    paddingTop: remConvert('70px'),
                    alignItems: 'center'
                }}
            >
                <Box component={'div'} sx={{ width: remConvert('260px') }} >
                    <Typography cate='text_12_semibold' color={primaryColor}>
                        IDEA
                    </Typography>
                    <Typography cate='mandatory_10' color='#000000' lineHeight={'150%'}>
                        {dataIdea}
                    </Typography>
                </Box>
                <Box component={'div'} sx={{ gap: remConvert('8px'), display: 'grid', width: remConvert('260px') }}>
                    {data?.benefit.map((item: any, index: number) => (
                        <CardDetail key={index} title={item.title} content={item?.content} primaryColor={primaryColor} />
                    ))}
                </Box>
            </Box>
        </LayoutOneIR>
    )
}

export default Layout_1_Idea
