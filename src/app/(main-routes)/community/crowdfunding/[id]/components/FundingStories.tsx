'use client'

import { type JSX, type SyntheticEvent, useState } from 'react'
import { FundingStoryThumbnail } from '@/app/(main-routes)/community/crowdfunding/[id]/components/FundingStoryThumbnail'
import { FundingStoryFeedbackArea } from '@/app/(main-routes)/community/crowdfunding/[id]/components/FundingStoryFeedbackArea'
import { Box } from '@mui/material'
import { TabUnderline } from '@/components/tabs'
import TabPanel from '@/elements/tab-panel'
import { BoxProps } from '@mui/material/Box/Box'

enum Tab {
  FUNDING_STORY = 0,
  FUNDING_FEEDBACK = 1
}

interface FundingStoriesProps extends BoxProps {}

export function FundingStories(props: FundingStoriesProps): JSX.Element {
  const [value, setValue] = useState(Tab.FUNDING_STORY)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box {...props}>
      <TabUnderline
        value={value}
        data={[
          {
            label: '펀딩 스토리', // Funding Story
            value: Tab.FUNDING_STORY
          },
          {
            label: '펀딩 피드백', // Funding Feedback
            value: Tab.FUNDING_FEEDBACK
          }
        ]}
        handleChange={handleChange}
        activeColor={'base_gray.900'}
      />
      <TabPanel value={Tab.FUNDING_STORY} index={value}>
        <FundingStoryThumbnail />
      </TabPanel>
      <TabPanel value={Tab.FUNDING_FEEDBACK} index={value}>
        <FundingStoryFeedbackArea />
      </TabPanel>
    </Box>
  )
}
