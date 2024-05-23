'use server'

// Get Ongoing Mock Funding list
import axios from '@/services/axios'
import { Metadata } from '@/types/types.type'
import { Crowdfunding, CROWDFUNDING_STATUS_RECRUITMENT } from '@/types/crowdfunding.type'

interface GetOngoingMockFundingListResponse {
  data: {
    metaData: Metadata
    result: Crowdfunding[]
  }
}

export async function getOngoingMockFundingList(params?: { page?: number }) {
  const { data } = await axios.get<GetOngoingMockFundingListResponse>(
    `/crowdfunding/active?statusRecruitment=${CROWDFUNDING_STATUS_RECRUITMENT.PROGRESS}`,
    { params }
  )

  return data.data
}

interface GetCompletedMockFundingListResponse {
  data: {
    metaData: Metadata
    result: Crowdfunding[]
  }
}

// Get Completed Mock Funding list
export async function getCompletedMockFundingList(params?: { page?: number }) {
  const { data } = await axios.get<GetCompletedMockFundingListResponse>(
    `/crowdfunding/active?statusRecruitment=${CROWDFUNDING_STATUS_RECRUITMENT.FINISH}`,
    { params }
  )

  return data.data
}

interface GetCrowdfundingStatusResponse {
  data: {
    totalOfCompanies: number
    totalOfCrowdfunding: number
    totalOfInvestAmount: number
    totalOfInvestors: number
  }
}

// Get Crowdfunding Status
export async function getCrowdfundingStatus() {
  const { data } = await axios.get<GetCrowdfundingStatusResponse>('/crowdfunding/summary')

  return data.data
}
