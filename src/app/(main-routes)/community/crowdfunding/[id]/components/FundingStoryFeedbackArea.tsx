import { type HTMLAttributes, type JSX } from 'react'

interface FundingStoryFeedbackAreaProps extends HTMLAttributes<HTMLDivElement> {}

export function FundingStoryFeedbackArea({ className, ...props }: FundingStoryFeedbackAreaProps): JSX.Element {
  return <div {...props}>FundingStoryFeedbackArea</div>
}
