import { iRPalette } from '@/atoms/home/stepper'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { getColorAlpha } from '@/utils/styles'
import { Box, useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useRecoilValue } from 'recoil'

const Layout_3_Swot = ({ data }: any) => {
    const { primaryColor } = useRecoilValue(iRPalette)
    const {
        palette: { home }
    } = useTheme()

    const { dict } = useLanguage()

    const dataPageTwo = [
        {
            id: 0,
            title: dict.swot_increase,
            des: dict.swot_increase_des,
            list: data[2].data.expansionOfMarketShare
        },
        {
            id: 1,
            title: dict.swot_improved,
            des: dict.swot_improved_des,
            list: data[2].data.improveCustomerSatisfaction
        },
        {
            id: 2,
            title: dict.swot_sustainable,
            des: dict.swot_sustainable_des,
            list: data[2].data.sustainableGrowth
        }
    ]

    return (
        <>
            <LayoutThreeIR sxContainer={{
                background: '#FFF',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}
                header={{ leftContent: 'SWOT', rightContent: 'SCHUMPETER PROGRAM' }}
            >
                <Typography cate='text_18_bold' sx={{ paddingTop: remConvert("32px"), paddingBottom: remConvert("60px"), textAlign: "center", color: home.ir_black }}>{dict.swot_ir_layout1_2}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ position: "relative", maxWidth: remConvert("130px"), width: "100%", background: home.ir_other_yellow_500, borderRadius: remConvert("4px"), marginBottom: remConvert("10px"), marginTop: remConvert("58px"), marginRight: remConvert("10px") }}>
                        <Box sx={{ textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                            <Typography cate='text_12_bold' sx={{ color: home.ir_white }}>Opportunity <span style={{ marginTop: remConvert('4px') }}>{dict.swot_opportunity}</span></Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", paddingRight: remConvert("10px"), paddingLeft: remConvert("10px"), width: "100%", position: "relative", maxWidth: remConvert("280px") }}>
                        <Typography cate='text_12_bold' sx={{ marginBottom: remConvert("20px"), color: home.base_white, background: primaryColor, paddingTop: remConvert("10px"), paddingBottom: remConvert("10px"), textAlign: "center", borderRadius: remConvert("4px") }}>Strength <span style={{ marginLeft: remConvert('4px') }}>{dict.swot_strength}</span></Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px"), marginBottom: remConvert("10px") }}>
                            {data[1].data.strengthAndOpportunity.map((item: any) =>
                                <Typography cate='ir_8' key={item.id} style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item}</Typography>
                            )}
                        </Box>
                        <Divider sx={{ position: "absolute", bottom: 0, width: "93%", borderStyle: "dashed", borderColor: `${primaryColor} !important` }} />
                        <Divider sx={{ position: "absolute", height: "96%", borderStyle: "dashed", borderColor: `${primaryColor} !important`, right: 0 }} orientation="vertical" flexItem />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: remConvert("10px"), width: "100%", maxWidth: remConvert("280px"), position: "relative" }}>
                        <Typography cate='text_12_bold' sx={{ marginBottom: remConvert("20px"), color: home.base_white, background: home.ir_other_cyan_500, paddingTop: remConvert("10px"), paddingBottom: remConvert("10px"), textAlign: "center", borderRadius: remConvert("4px") }}>Weakness <span style={{ marginLeft: remConvert('4px') }}>{dict.swot_weakness}</span></Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px") }}>
                            {
                                data[1].data.weaknessAndOpportunity.map((item: any) =>
                                    <Typography cate='ir_8' key={item.id} style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item}</Typography>
                                )
                            }
                        </Box>
                        <Divider sx={{ position: "absolute", bottom: 0, right: 0, width: "96%", borderStyle: "dashed", borderColor: `${primaryColor} !important` }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ maxWidth: remConvert("130px"), width: "100%", position: "relative", background: home.red500, marginTop: remConvert("10px"), marginRight: remConvert("10px"), borderRadius: remConvert("4px") }}>
                        <Box sx={{ textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                            <Typography cate='text_12_bold' sx={{ color: home.ir_white }}>Thread <span style={{ marginTop: remConvert('4px'), display: 'block' }}>{dict.swot_threat}</span></Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", marginTop: remConvert("10px"), flexDirection: "column", paddingRight: remConvert("10px"), paddingLeft: remConvert("10px"), width: "100%", position: "relative", maxWidth: remConvert("280px") }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px") }}>
                            {data[1].data.strengthAndThreat.map((item: any) =>
                                <Typography cate='ir_8' key={item.id} style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item}</Typography>
                            )}
                        </Box>
                        <Divider sx={{ position: "absolute", height: "100%", borderStyle: "dashed", borderColor: `${primaryColor} !important`, right: 0 }} orientation="vertical" flexItem />
                    </Box>
                    <Box sx={{ display: "flex", marginTop: remConvert("10px"), flexDirection: "column", paddingLeft: remConvert("10px"), width: "100%", maxWidth: remConvert("280px") }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px") }}>
                            {
                                data[1].data.weaknessAndThreat.map((item: any) =>
                                    <Typography cate='ir_8' key={item.id} style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item}</Typography>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </LayoutThreeIR >
            <LayoutThreeIR sxContainer={{
                background: '#FFF',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginTop: remConvert("4px")
            }}
                header={{ leftContent: 'SWOT', rightContent: 'SCHUMPETER PROGRAM' }}
            >
                <Box>
                    <Typography cate='text_18_bold' sx={{ paddingTop: remConvert("32px"), paddingBottom: remConvert("70px"), textAlign: "center", color: home.ir_black }}>{dict.swot_ir_layout1_2}</Typography>
                    <Box sx={{ padding: remConvert("0 60px") }}>
                        <Typography cate='text_12_bold' sx={{ wordBreak: "break-all", borderRadius: remConvert("4px"), background: primaryColor, textAlign: "center", color: home.ir_white, padding: remConvert("21px 0"), marginBottom: remConvert("10px") }}><span style={{ marginRight: remConvert('4px') }}>{data[0]?.data?.brandName}</span> {data[0]?.data?.idea}</Typography>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                            {dataPageTwo.map((item) =>
                                <Box sx={{ width: "100%", maxWidth: remConvert("318px") }} key={item.id}>
                                    <Box sx={{ background: getColorAlpha(primaryColor, home.ir_alpha10), padding: remConvert("16px"), borderRadius: remConvert("4px"), textAlign: "center" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Typography sx={{ wordBreak: "break-all", width: "fit-content", background: primaryColor, padding: remConvert("2px 4px"), borderRadius: remConvert("2px"), marginBottom: remConvert("8px") }} cate="ir_10_bold" >{item.title}</Typography>
                                        </Box>
                                        <Typography cate='text_12_bold' sx={{ wordBreak: "break-all", color: home.ir_neutral_500 }}>{item.des}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px"), marginTop: remConvert("10px") }}>
                                        {
                                            item.list.map((item: any) =>
                                                <Typography cate='ir_8' key={item.id} style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item.text}</Typography>
                                            )
                                        }
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </LayoutThreeIR >
        </>
    )
}

export default Layout_3_Swot