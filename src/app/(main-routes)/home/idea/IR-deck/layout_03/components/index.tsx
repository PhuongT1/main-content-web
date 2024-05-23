import { Typography } from '@/elements'
import { Box } from '@mui/material'
import React from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import EconomicIcon from '@/assets/icons/idea/economic'

interface CardDescriptionProps {
    title: string
    content: string
    primaryColor?: string
}

const CardDescription = ({ title, content, primaryColor }: CardDescriptionProps) => {
    return (
        <Box component={'div'} sx={{
            padding: remConvert('36px 20px 20px 20px'),
            bgcolor: '#FAFAFA',
            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
            width: remConvert('200px'),
            height: remConvert('165px'),
            position: 'relative',
            borderRadius: remConvert('6px')
        }}>
            <Box component={'div'} sx={{ position: 'absolute', top: remConvert('-15px'), width: remConvert('44px'), height: remConvert('44px'), borderRadius: remConvert('50%'), bgcolor: primaryColor }}>
                <EconomicIcon />
            </Box>
            <Typography cate='text_10_bold'
                paddingBottom={remConvert('4px')}
                color={primaryColor}
                display='inline-block'
                borderRadius={remConvert('4px 4px 0px 0px')}>
                {title}
            </Typography>
            <Typography cate='text_10_regular'
                color='#292A2C'
                borderRadius={remConvert('0px 6px 6px 6px')}
                style={{ wordBreak: 'break-all' }}
            >
                {content}
            </Typography>
        </Box>
    )
}

export default CardDescription