import { type HTMLAttributes, type JSX } from 'react'

interface FundingStoryThumbnailProps extends HTMLAttributes<HTMLDivElement> {}

export function FundingStoryThumbnail({ className, ...props }: FundingStoryThumbnailProps): JSX.Element {
  return <div {...props}>FundingStoryThumbnail</div>
}
