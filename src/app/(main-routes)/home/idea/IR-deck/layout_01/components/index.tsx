import { Typography } from '@/elements'
import { Box } from '@mui/material'
import React from 'react'
import { remConvert } from '@/utils/convert-to-rem'

interface CardIdeaProps {
    title: string
    content: string
    primaryColor?: string
}


const CardDetail = ({ title, content, primaryColor }: CardIdeaProps) => {
    return (
        <Box component={'div'} sx={{ width: remConvert('260px') }}>
            <Typography cate='text_10_bold' color='#FFFFFF'
                padding={remConvert('5px 15px')}
                bgcolor={primaryColor}
                display='inline-block'
                borderRadius={remConvert('4px 4px 0px 0px')}>
                {title}
            </Typography>
            <Typography cate='text_10_regular'
                color='#292A2CCC'
                bgcolor='#292A2C0A'
                padding={remConvert('12px 8px 12px 16px')}
                borderRadius={remConvert('0px 6px 6px 6px')}
                style={{ wordBreak: 'break-all' }}
            >
                {content}
            </Typography>
        </Box>
    )
}

export default CardDetail