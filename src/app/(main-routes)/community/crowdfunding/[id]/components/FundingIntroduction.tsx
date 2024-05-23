import { type HTMLAttributes, type JSX } from 'react'

interface FundingIntroductionProps extends HTMLAttributes<HTMLDivElement> {}

export function FundingIntroduction({ className, ...props }: FundingIntroductionProps): JSX.Element {
  return <div {...props}>FundingIntroduction</div>
}
