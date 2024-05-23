import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { getColorAlpha } from '@/utils/styles'
import { Box, Divider, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'

const StrengthWeakness = () => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)

    const {
        palette: { home }
    } = useTheme()

    const colum = [
        {
            id: 0,
            title: <Typography cate='text_12_bold' sx={{ width: "100%", maxWidth: "280px", color: primaryColor, background: getColorAlpha(primaryColor, home.ir_alpha10), textAlign: "center", borderRadius: remConvert("4px"), padding: "10px 0" }}>Strength <span style={{ color: home.ir_neutral_500, marginRight: remConvert('4px') }}>{dict.swot_strength}</span> </Typography>
            ,
            border: true
        },
        {
            id: 0,
            title: <Typography cate='text_12_bold' sx={{ width: "100%", maxWidth: "280px", color: home.mint500, background: getColorAlpha(primaryColor, home.ir_alpha10), textAlign: "center", borderRadius: remConvert("4px"), padding: "10px 0" }}>Weakness <span style={{ color: home.ir_neutral_500, marginRight: remConvert('4px') }}>{dict.swot_weakness}</span>  </Typography>
            ,
            border: false
        }
    ]
    return (
        <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <Box sx={{ borderRight: `1px solid ${home.ir_neutral_alpha10}`, display: "flex", flexDirection: "column", width: remConvert("141px"), padding: "10px", }}>
                <Box sx={{ width: "140px", height: "100%", padding: "10px", }} />
            </Box>
            {
                colum.map((item, idx) =>
                    <Box key={idx} sx={{ position: "relative", padding: "0px 10px 10px 10px", width: "100%", maxWidth: "280px" }}>
                        {item.title}
                        {item.border === true ? <Divider sx={{ position: "absolute", height: "100%", borderColor: home.ir_neutral_alpha10, right: 0, top: 0 }} orientation="vertical" flexItem /> : null}
                    </Box>
                )
            }
            <Divider sx={{ position: "absolute", bottom: 0, width: "100%", maxWidth: "700px", borderColor: home.ir_neutral_alpha10 }} />
        </Box>
    )
}

export default StrengthWeakness
