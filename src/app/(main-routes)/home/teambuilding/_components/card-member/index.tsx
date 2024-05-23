import { ICardMember } from '@/types/teambuilding/index.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import React, { memo } from 'react'
import styles from '../../teambuilding.module.scss'
import Image from 'next/image'
import { Typography } from '@/elements'
import { useRecoilValue } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { getColorAlpha } from '@/utils/styles'

interface CardMemberProps {
    direction: 'row' | 'column'
    data: ICardMember
}

const CardMember = ({ data, direction }: CardMemberProps) => {
    const { palette: { home } } = useTheme();
    const { primaryColor } = useRecoilValue(iRPalette)

    return (
        <Stack
            className={styles["ir_card_member"] + ` card-member card-${direction}`}
            sx={{ backgroundColor: !data?.level ? getColorAlpha(primaryColor, home.ir_alpha10) : '#292A2C0A' }}
            direction={direction}
            gap={convertToRem(8)}
        >
            <Box className="card-member-avt">
                <Image
                    src={data?.path || ''}
                    alt={'Member'}
                    fill
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                />
            </Box>
            <Stack gap={convertToRem(2)} width={direction === 'row' ? 'calc(100% - 58px)' : '100%'}>
                <Stack gap={convertToRem(8)} direction="row">
                    <Typography
                        sx={{
                            fontSize: { xs: convertToRem(8), lg: convertToRem(12) },
                            fontWeight: 700,
                            lineHeight: '150%'
                        }}
                        color={home.ir_neutral_alpha80}
                    >{data?.name}</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: convertToRem(8), lg: convertToRem(12) },
                            fontWeight: 700,
                            lineHeight: '150%'
                        }}
                        color={primaryColor}
                    >{data?.role}</Typography>
                </Stack>
                <Typography
                    color={home.ir_neutral_alpha80}
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                        fontSize: { xs: convertToRem(8), lg: convertToRem(12) },
                        fontWeight: 400,
                        lineHeight: '150%'
                    }}
                >
                    {data?.description ?? `· 국민대학교 글로벌창업벤처대학원 창업학 석사<br></br>
                    · 사단법인 한국창업벤처창업학회 이사<br></br>
                    · 국민대학교 객원교수<br></br>
                    · 주식회사 메인콘텐츠 대표이사`}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default memo(CardMember)