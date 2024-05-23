import { iRPalette } from '@/atoms/home/stepper'
import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { getColorAlpha } from '@/utils/styles'
import { Box, Divider, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import OpportunityAndThread from './opportunity-thread'
import StrengthWeakness from './strength-weakness'

const Layout_1_Swot = ({ data }: any) => {
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
            list: data[2]?.data?.expansionOfMarketShare
        },
        {
            id: 1,
            title: dict.swot_improved,
            des: dict.swot_improved_des,
            list: data[2]?.data?.improveCustomerSatisfaction
        },
        {
            id: 2,
            title: dict.swot_sustainable,
            des: dict.swot_sustainable_des,
            list: data[2]?.data?.sustainableGrowth
        }
    ]
    const listRow = [
        {
            id: 0,
            borderDividerLeft: false,
            titleBox: "Opportunity",
            colorText: home.ir_other_yellow_500,
            listMap: [
                {
                    id: 0,
                    list: data[1]?.data?.strengthAndOpportunity
                    ,
                    border: true
                },
                {
                    id: 0,
                    list: data[1]?.data?.weaknessAndOpportunity
                    ,
                    border: false
                }
            ]

        },
        {
            id: 1,
            borderDividerLeft: true,
            titleBox: "Thread",
            colorText: home.ir_other_red_500,
            listMap: [
                {
                    id: 0,
                    list: data[1]?.data?.strengthAndThreat
                    ,
                    border: true
                },
                {
                    id: 0,
                    list: data[1]?.data?.weaknessAndThreat
                    ,
                    border: false
                }
            ]

        }
    ]

    return (
        <>
            <LayoutOneIR
                sxContainer={{
                    background: '#FFF',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}

                header={{ leftItem: { title: 'SWOT', subTitle: dict.swot }, centerItem: { title: data[0]?.data?.brandName, subTitle: data[0]?.data?.idea } }}
            >

                <Box sx={{ marginTop: remConvert('52px') }}>

                    <StrengthWeakness />
                    {
                        listRow.map((itt, idxx) =>
                            <Box key={idxx} sx={{ display: "flex", justifyContent: "center" }}>
                                <OpportunityAndThread borderTop={itt.borderDividerLeft === true ? true : false} title={itt.titleBox} color={itt.colorText} />
                                {itt.listMap.map((item) =>
                                    <Box key={item.id} sx={{ borderTop: itt.borderDividerLeft === true ? `1px solid ${home.ir_neutral_alpha10}` : "", display: "flex", flexDirection: "column", width: "100%", position: "relative", maxWidth: remConvert("280px") }}>
                                        <Box sx={{ padding: item.border === true ? "10px" : "10px 0 10px 10px", display: "flex", flexDirection: "column", gap: remConvert("4px") }}>
                                            {
                                                item.list.map((it: any, idx: any) =>
                                                    <Typography key={idx} cate='ir_8' style={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("4px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{it}</Typography>
                                                )
                                            }
                                        </Box>
                                        {
                                            item.border === true ?
                                                <Divider sx={{ position: "absolute", height: "100%", borderColor: home.ir_neutral_alpha10, right: 0 }} orientation="vertical" flexItem />
                                                : null
                                        }
                                    </Box>
                                )}
                            </Box>

                        )
                    }
                </Box>
            </LayoutOneIR >

            <LayoutOneIR
                sxContainer={{
                    background: '#FFF',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: remConvert('4px')
                }}
                header={{ leftItem: { title: 'SWOT', subTitle: dict.swot }, centerItem: { title: dict.swot, subTitle: dict.swot_ir_layout1_2 } }}
            >
                <Box sx={{ marginTop: remConvert('52px'), padding: remConvert("0 60px") }}>
                    <Typography cate='ir_12_bolder' sx={{ wordBreak: "break-all", borderRadius: remConvert("4px"), background: getColorAlpha(primaryColor, home.ir_alpha10), color: home.ir_neutral_500, textAlign: "center", padding: remConvert("20px 0"), marginBottom: remConvert("10px") }}><span style={{ color: primaryColor, marginRight: remConvert('4px') }}>{data[0]?.data?.brandName}</span> {data[0]?.data?.idea}</Typography>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                        {dataPageTwo.map((item) =>
                            <Box key={item?.id} sx={{ maxWidth: remConvert("318px") }}>
                                <Box sx={{ background: "#292A2C0F", padding: remConvert("16px"), borderRadius: remConvert("4px"), textAlign: "center" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Typography sx={{ wordBreak: "break-all", width: "fit-content", background: primaryColor, padding: remConvert("2px 4px"), borderRadius: remConvert("2px"), marginBottom: remConvert("8px"), color: home.base_white }} cate="ir_10_bold" >{item.title}</Typography>
                                    </Box>
                                    <Typography cate='ir_12_bolder' sx={{ wordBreak: "break-all", color: home.ir_neutral_500 }}>{item.des}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: remConvert("4px"), marginTop: remConvert("10px") }}>
                                    {
                                        item.list.map((item: any) =>
                                            <Typography key={item.id} cate='ir_8' sx={{ wordBreak: "break-all", padding: remConvert("6px 12px"), borderRadius: remConvert("2px"), background: home.ir_neutral_alpha4, color: home.ir_neutral_500 }}>{item.text}</Typography>
                                        )
                                    }
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </LayoutOneIR >
        </>
    )
}

export default Layout_1_Swot