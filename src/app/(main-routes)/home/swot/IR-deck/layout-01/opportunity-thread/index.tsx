import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { remConvert } from '@/utils/convert-to-rem'
import { getColorAlpha } from '@/utils/styles'
import { Box, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
interface Props {
    title: string;
    color: string;
    borderTop: boolean
}

const OpportunityAndThread = ({ title, color, borderTop }: Props) => {
    const { dict } = useLanguage()
    const { primaryColor } = useRecoilValue(iRPalette)

    const {
        palette: { home }
    } = useTheme()
    return (
        <Box >
            <Box sx={{ height: "100%", borderTop: borderTop === true ? ` 1px solid ${home.ir_neutral_alpha10}` : "", borderRight: `1px solid #292A2C1A`, padding: "10px 10px 10px 0", position: "relative" }}>
                <Box sx={{ background: getColorAlpha(primaryColor, home.ir_alpha10), width: remConvert('130px'), height: "100%", position: "relative", borderRadius: remConvert('4px') }}>
                    <Box sx={{ color: home.ir_white, fontSize: remConvert("12px"), fontWeight: "700", lineHeight: remConvert("18px"), textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                        <Typography cate='text_12_bold' sx={{ color: color }} >{title} <span style={{ color: home.ir_neutral_500, display: 'block', marginTop: remConvert('4px') }}>{dict.swot_opportunity}</span></Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default OpportunityAndThread
