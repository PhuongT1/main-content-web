import ArrowCenter from '@/assets/icons/idea/arrow-center'
import EconomicIcon from '@/assets/icons/idea/economic'
import Mountain from '@/assets/icons/idea/mountain'
import { iRPalette } from '@/atoms/home/stepper'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { DataIdeaIR } from '@/types/idea.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Card, useTheme } from '@mui/material'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { LayoutTwo } from '@/assets/images'


const Layout_2_Idea = ({ data, dataIdea }: DataIdeaIR | any) => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)

    const {
        palette: { home }
    } = useTheme()

    const listIconIR = [
        {
            id: 1,
            icon: <EconomicIcon haveStyle={true} />,
        },
        {
            id: 2,
            icon: <ArrowCenter haveStyle={true} />,
        },
        {
            id: 3,
            icon: <Mountain haveStyle={true} />,
        }
    ]

    const combinedList = listIconIR.map((item, index) => {
        const itemIR = data.benefit[index];
        return {
            id: item.id,
            icon: item.icon,
            title: itemIR.title,
            content: itemIR.content
        };
    });

    return (
        <LayoutTwoIR sxContainer={{
            background: '#FFF',
            height: '100%',
            display: 'flex',
        }}>
            <Box component={'div'} sx={{ padding: remConvert('40px 0 0 26px') }} >
                <Typography cate='text_12_semibold' color={primaryColor} paddingBottom={remConvert('4px')}>
                    CREATIVE DESTRUCTION
                </Typography>
                <Typography cate='text_16_bold' color='#000000'>
                    {dict.idea_ir_center_sub_title}
                </Typography>
            </Box>
            <Box
                component={'div'}
                sx={{
                    height: '100%',
                    alignItems: 'center'
                }}
            >
                <Box component={'div'}>
                    <Box sx={{ display: "flex", padding: remConvert("106px 70px 0 54px"), gap: remConvert("24px"), alignItems: "center" }}>
                        <Card sx={{ backgroundColor: home.base_white, boxShadow: "0px 5px 19px -3px rgba(0,0,0,0.1)", padding: remConvert("12px"), maxWidth: remConvert("320px"), borderRadius: remConvert('6px') }}>
                            <Typography sx={{ fontSize: "10px", fontWeight: "700", color: primaryColor, textTransform: "uppercase" }}>idea</Typography>
                            <Box sx={{ width: remConvert("296px"), height: remConvert("100px"), position: "relative" }}>
                                <Image
                                    onClick={() => {
                                    }}
                                    src={LayoutTwo}
                                    style={{
                                        position: "absolute",
                                        borderRadius: remConvert("4px"),
                                        height: '100%',
                                        width: '100%',
                                        display: 'block',
                                        overflow: "hidden",
                                        objectFit: "cover"
                                    }}
                                    alt='image'
                                    width={196}
                                    height={196}
                                />
                            </Box>
                            <Typography cate='text_10_regular' style={{ paddingTop: remConvert("12px"), paddingBottom: remConvert("5px"), color: "#292A2C" }}>{dataIdea}</Typography>
                        </Card>
                        <Box sx={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "column"
                        }}>
                            {
                                combinedList?.map((item, id) =>
                                    <Card key={id} sx={{ display: "flex", gap: remConvert('12px'), backgroundColor: home.base_white, boxShadow: "0px 5px 19px -3px rgba(0,0,0,0.1)", padding: remConvert("8px 12px"), maxWidth: remConvert('320px'), borderRadius: remConvert('6px') }}>
                                        <Box>
                                            <Box sx={{ backgroundColor: primaryColor, width: remConvert("40px"), height: remConvert("40px"), borderRadius: remConvert('4px'), position: "relative" }}>
                                                {item.icon}
                                            </Box>
                                            <p style={{ textAlign: "center", fontSize: remConvert("8px"), fontWeight: "700", color: primaryColor, lineHeight: remConvert("12px"), marginTop: remConvert('4px') }}>{item.title}</p>
                                        </Box>
                                        <p style={{ fontSize: remConvert('8px'), fontWeight: "400", lineHeight: remConvert("12px"), color: "#292A2CCC", letterSpacing: remConvert("-0.25px"), wordBreak: 'break-all' }}>{item.content}</p>
                                    </Card>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutTwoIR>

    )
}

export default Layout_2_Idea
