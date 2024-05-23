import { iRPalette } from '@/atoms/home/stepper'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { getColorAlpha } from '@/utils/styles'
import { Box, Card, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'

const Layout_2_Swot = ({ data }: any) => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)
    const {
        palette: { home }
    } = useTheme()

    const dataPageOne = [
        {
            id: 0,
            title: "SO",
            arrayType: [
                {
                    id: 0,
                    title: "Strength",
                    des: dict.swot_strength,
                    color: primaryColor,
                    backgroundCl: getColorAlpha(primaryColor, home.ir_alpha10)
                },
                {
                    id: 1,
                    title: "Opportunity",
                    des: dict.swot_opportunity,
                    color: home.yellow,
                    backgroundCl: "#F8BA1A1A"
                }
            ],
            listDescription: data[1]?.data?.strengthAndOpportunity
        },
        {
            id: 1,
            title: "WO",
            arrayType: [
                {
                    id: 0,
                    title: "Weakness",
                    des: dict.swot_weakness,
                    color: home.ir_other_cyan_500,
                    backgroundCl: "#44BDBD1A"
                },
                {
                    id: 1,
                    title: "Opportunity",
                    des: dict.swot_opportunity,
                    color: home.yellow,
                    backgroundCl: "#F8BA1A1A"
                }
            ],
            listDescription: data[1]?.data?.weaknessAndOpportunity
        },
        {
            id: 2,
            title: "ST",
            arrayType: [
                {
                    id: 0,
                    title: "Strength",
                    des: dict.swot_strength,
                    color: primaryColor,
                    backgroundCl: getColorAlpha(primaryColor, home.ir_alpha10)
                },
                {
                    id: 1,
                    title: "Thread",
                    des: dict.swot_threat,
                    color: home.ir_other_red_500,
                    backgroundCl: "#EA39391A"
                }
            ],
            listDescription: data[1]?.data?.strengthAndThreat
        },
        {
            id: 3,
            title: "WT",
            arrayType: [
                {
                    id: 0,
                    title: "Weakness",
                    des: dict.swot_weakness,
                    color: home.ir_other_cyan_500,
                    backgroundCl: "#44BDBD1A"
                },
                {
                    id: 1,
                    title: "Thread",
                    des: dict.swot_threat,
                    color: home.ir_other_red_500,
                    backgroundCl: "#EA39391A"
                }
            ],
            listDescription: data[1]?.data?.weaknessAndThreat
        }
    ]

    const dataPageTwo = [
        {
            id: 0,
            title: dict.swot_increase,
            des: dict.swot_increase_des,
            listMap: data[2].data.expansionOfMarketShare
        },
        {
            id: 1,
            title: dict.swot_improved,
            des: dict.swot_improved_des,
            listMap: data[2].data.improveCustomerSatisfaction
        },
        {
            id: 2,
            title: dict.swot_ir_sustainable,
            des: dict.swot_ir_sustainable_des,
            listMap: data[2].data.sustainableGrowth
        }
    ]
    return (
        <>
            <LayoutTwoIR sxContainer={{
                background: '#FFF',
                height: '100%',
                display: 'flex'
            }}>
                <Box component={'div'} sx={{ padding: remConvert('40px 0 0 26px') }} >
                    <Typography cate='text_12_semibold' color={primaryColor} paddingBottom={remConvert('4px')}>
                        SWOT
                    </Typography>
                    <Typography cate='text_16_bold' color={home.base_black}>
                        {dict.swot_ir_layout1_2}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: remConvert("10px"), marginTop: remConvert("110px"), paddingLeft: remConvert("26px"), paddingRight: remConvert("40px") }}>
                    {
                        dataPageOne.map((item) =>
                            <Card key={item?.id} sx={{ backgroundColor: home.ir_white, boxShadow: "0px 5px 19px -3px rgba(0,0,0,0.1)", padding: remConvert("12px 10px"), maxWidth: remConvert("173px"), borderRadius: remConvert('6px') }}>
                                <Typography cate='ir_12_bolder' sx={{ color: home.base_white, textTransform: "uppercase", background: primaryColor, padding: remConvert("4px 69px"), borderRadius: remConvert("999px") }}>{item?.title}</Typography>
                                <Box sx={{ display: "flex", gap: remConvert("4px"), paddingTop: remConvert("8px") }}>
                                    {
                                        item.arrayType.map((item) =>
                                            <Box key={item.id} sx={{ background: item.backgroundCl, borderRadius: remConvert("4px"), textAlign: "center", width: remConvert("74.5px"), padding: remConvert('6px') }}>
                                                <Typography sx={{ color: item.color }} cate='text_10_bold'>{item.title}</Typography>
                                                <span style={{ fontSize: remConvert("8px"), fontWeight: "700", lineHeight: remConvert('12px'), color: home.ir_neutral_500 }}>{item.des}</span>
                                            </Box>)
                                    }
                                </Box>
                                <Box sx={{
                                    paddingTop: remConvert("8px"),
                                    display: "flex",
                                    gap: remConvert("4px"),
                                    flexDirection: "column"
                                }}>
                                    {item.listDescription.map((item: any) =>
                                        <Typography cate='ir_8' key={item.id} style={{ padding: remConvert("2px 6px"), borderRadius: remConvert("2px"), background: home.base_gray50, color: home.ir_neutral_alpha80 }}>{item}</Typography>

                                    )}
                                </Box>
                            </Card>
                        )
                    }
                </Box>
            </LayoutTwoIR >

            <LayoutTwoIR sxContainer={{
                background: '#FFF',
                height: '100%',
                display: 'flex',
                marginTop: remConvert('4px')
            }}>
                <Box component={'div'} sx={{ padding: remConvert('40px 0 0 26px') }} >
                    <Typography cate='text_12_semibold' color={primaryColor} paddingBottom={remConvert('4px')}>
                        SWOT
                    </Typography>
                    <Typography cate='text_16_bold' color='#000000'>
                        {dict.swot_ir_layout1_2}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: remConvert("110px"), paddingLeft: remConvert("26px"), paddingRight: remConvert("40px") }}>
                    <Card sx={{ width: "100%", backgroundColor: home.base_white, boxShadow: "0px 5px 19px -3px rgba(0,0,0,0.1)", padding: remConvert("12px 10px"), borderRadius: remConvert('6px') }}>
                        <Typography cate='ir_12_bolder' sx={{ textAlign: "center", color: home.ir_neutral_500 }}><span style={{ color: primaryColor, marginRight: remConvert('4px') }}>{data[0]?.data?.brandName}</span> {data[0]?.data?.idea}</Typography>
                    </Card>
                    <Box sx={{ paddingTop: remConvert("12px"), display: "flex", gap: remConvert("10px") }}>
                        {
                            dataPageTwo.map((item) =>
                                <Card key={item.id} sx={{ width: "100%", paddingTop: remConvert("8px"), backgroundColor: home.base_white, boxShadow: "0px 5px 19px -3px rgba(0,0,0,0.1)", padding: remConvert("12px 10px"), borderRadius: remConvert('6px') }}>
                                    <Typography cate='ir_8_bolder' sx={{ width: "fit-content", padding: remConvert("4px 6px"), borderRadius: remConvert("4px"), color: primaryColor, background: getColorAlpha(primaryColor, home.ir_alpha10) }}>{item.title}</Typography>
                                    <Typography cate="text_10_bold" sx={{ color: home.ir_neutral_500, paddingTop: remConvert("8px") }}>{item.des}</Typography>
                                    <Box sx={{
                                        paddingTop: remConvert("8px"),
                                        display: "flex",
                                        gap: remConvert("4px"),
                                        flexDirection: "column"
                                    }}>
                                        {item.listMap.map((item: any) =>
                                            <Typography cate='ir_8' key={item.id} sx={{ padding: remConvert("2px 6px"), borderRadius: remConvert("2px"), background: home.base_gray50, color: "#292A2CCC" }}>{item.text}</Typography>
                                        )}
                                    </Box>
                                </Card>)
                        }
                    </Box>
                </Box>
            </LayoutTwoIR>
        </>

    )
}

export default Layout_2_Swot