import { type Metadata } from 'next'
import { type JSX } from 'react'
import { Box, Grid } from '@mui/material'
import { PageTitle } from '@/components'
import { BackButton } from '@/app/(main-routes)/community/crowdfunding/[id]/components/BackButton'
import { Divider } from '@/elements'
import { FundingIntroduction } from '@/app/(main-routes)/community/crowdfunding/[id]/components/FundingIntroduction'
import { FundingExplanation } from '@/app/(main-routes)/community/crowdfunding/[id]/components/FundingExplanation'
import { FundingStories } from '@/app/(main-routes)/community/crowdfunding/[id]/components/FundingStories'
import { CompanyList } from '@/app/(main-routes)/community/crowdfunding/[id]/components/CompanyList'
import { InvestmentProgressBar } from '@/app/(main-routes)/community/crowdfunding/[id]/components/InvestmentProgressBar'

export const metadata: Metadata = {
  title: 'Schumpeter'
}

export default function SimulationFundingDetailsPage(): JSX.Element {
  return (
    <Box
      mt={{ md: 0, xs: 1 }}
      sx={{
        minHeight: '100dvh'
      }}
      display={'flex'}
      flexDirection={'column'}
    >
      <PageTitle>모의 크라우드펀딩</PageTitle>
      <BackButton />
      <Divider
        sx={{
          my: 6,
          borderColor: 'main_grey.gray700',
          display: {
            md: 'block',
            xs: 'none'
          }
        }}
      />
      <FundingIntroduction />
      <FundingExplanation />
      <Grid container gap={6}>
        <Grid item xs={12} sm={7}>
          <FundingStories />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CompanyList />
        </Grid>
      </Grid>
      <InvestmentProgressBar />
    </Box>
  )
}
