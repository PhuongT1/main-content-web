'use client'

import { type JSX, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCrowdfundingStatus } from '@/actions/apis/simulation-funding.action'
import { Box, BoxProps, Grid, useMediaQuery } from '@mui/material'
import { Typography } from '@/elements'
import FundingNumberIcon from '@/assets/icons/funding/funding-number'
import CompanyIcon from '@/assets/icons/funding/company'
import InvestorIcon from '@/assets/icons/funding/investor'
import InvestorAmountIcon from '@/assets/icons/funding/investor-amount'
import { convertToRem } from '@/utils/convert-to-rem'

// - 누적 투자 금액 Cumulative investment amount
// if 1,000,000 ₩ -> 1 백만원
// if 10,000,000 ₩ -> 1 천만원
// if 100,000,000 ₩ -> 1 억원

function convertToUnit(amount: number): [number, string] {
  if (amount < 1_0000_000) {
    return [amount / 1_000_000, '백만원']
  } else if (amount < 10_0000_000) {
    return [amount / 10_000_000, '천만원']
  } else {
    return [amount / 10_0000_000, '억원']
  }
}

export function CrowdfundingStatus(): JSX.Element {
  const mdUp = useMediaQuery('(min-width: 768px)')
  const { data } = useQuery({
    queryKey: ['crowdfunding-status'],
    queryFn: () => getCrowdfundingStatus()
  })

  if (!data) {
    return <></>
  }

  const [convertedAmount, unit] = convertToUnit(data.totalOfInvestAmount)

  return (
    <Grid
      container
      rowGap={{
        xs: 1.625,
        md: 3
      }}
      columnSpacing={3}
    >
      <Grid item xs={12} md={6} xl={3}>
        <StatusItem
          icon={<FundingNumberIcon svgProps={{ width: mdUp ? '48px' : '32px', height: mdUp ? '48px' : '32px' }} />}
          title={'펀딩 수'}
          value={data.totalOfCrowdfunding.toLocaleString()}
          unit={'개'}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <StatusItem
          icon={<CompanyIcon svgProps={{ width: mdUp ? '48px' : '32px', height: mdUp ? '48px' : '32px' }} />}
          title={'참여 기업'}
          value={data.totalOfCompanies.toLocaleString()}
          unit={'개'}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <StatusItem
          icon={<InvestorIcon svgProps={{ width: mdUp ? '48px' : '32px', height: mdUp ? '48px' : '32px' }} />}
          title={'누적 투자자 수'}
          value={data.totalOfInvestors.toLocaleString()}
          unit={'명'}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <StatusItem
          icon={<InvestorAmountIcon svgProps={{ width: mdUp ? '48px' : '32px', height: mdUp ? '48px' : '32px' }} />}
          title={'누적 투자 금액'}
          value={convertedAmount.toLocaleString()}
          unit={unit}
        />
      </Grid>
    </Grid>
  )
}

interface StatusItemProps extends BoxProps {
  icon: ReactNode
  title: string
  value: string | number
  unit: string
}

function StatusItem({ icon, title, value, unit }: StatusItemProps) {
  return (
    <Box p={3} border={1} borderColor={'blue.300'} borderRadius={3} display={'flex'} gap={3} bgcolor={'alpha.blue_10'}>
      <Box
        width={{
          xs: convertToRem(32),
          md: convertToRem(48)
        }}
        height={{
          xs: convertToRem(32),
          md: convertToRem(48)
        }}
        display={'flex'}
        alignItems={'center'}
        justifyItems={'center'}
      >
        {icon}
      </Box>
      <Box
        display={'flex'}
        flexDirection={{
          xs: 'row',
          md: 'column'
        }}
        justifyContent={{
          xs: 'space-between',
          md: 'center'
        }}
        flexGrow={1}
      >
        <Box
          height={{
            xs: convertToRem(32),
            md: convertToRem(48)
          }}
          display={'flex'}
          alignItems={'center'}
        >
          <Typography breakpoints={{ md: 'body_2_semibold' }} cate={'title_3_semibold'}>
            {title}
          </Typography>
        </Box>

        <Typography cate='title_2_bold' breakpoints={{ md: 'body_1_semibold' }} color={'blue.300'}>
          {value} {unit}
        </Typography>
      </Box>
    </Box>
  )
}
