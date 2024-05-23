import CommaIconLeft from '@/assets/icons/idea/comma-left'
import CommaRight from '@/assets/icons/idea/comma-right'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { DataIdeaIR } from '@/types/idea.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import CardDescription from './components'
import { useRecoilValue } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { useLanguage } from '@/hooks/use-language'

const Layout_3_Idea = ({ data, dataIdea }: DataIdeaIR) => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)

    return (
        <LayoutThreeIR
            sxContainer={{
                background: '#FFF',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}
            header={{ leftContent: 'CREATIVE DESTRUCTION', rightContent: 'SCHUMPETER PROGRAM' }}
        >
            <Box
                component={'div'}
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box component={'div'} >
                    <Typography cate='text_18_bold' color='#000000' paddingTop={remConvert('32px')}>
                        {dict.teambuilding_ir_center_sub_title}
                    </Typography>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', width: remConvert('632px'), padding: remConvert('70px 40px 60px'), textAlign: 'center', alignItem:'center', justifyContent: 'center' }}>
                    <Box component={'div'}>
                        <CommaIconLeft primaryColor={primaryColor} />
                    </Box>
                    <Typography cate='mandatory_10' color='#000000' padding={remConvert('0 16px')}>
                        {dataIdea}
                    </Typography>
                    <Box component={'div'}>
                        <CommaRight primaryColor={primaryColor} />
                    </Box>
                </Box>
                <Box component={'div'} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: remConvert('6px') }}>
                    {data?.benefit.map((item, index) => (
                        <CardDescription key={index} title={item.title} content={item?.content} primaryColor={primaryColor} />
                    ))}
                </Box>
            </Box>
        </LayoutThreeIR>
    )
}

export default Layout_3_Idea
