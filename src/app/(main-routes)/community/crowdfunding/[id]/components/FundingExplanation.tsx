import { type HTMLAttributes, type JSX } from 'react'

interface FundingExplanationProps extends HTMLAttributes<HTMLDivElement> {}

export function FundingExplanation({ className, ...props }: FundingExplanationProps): JSX.Element {
  return <div {...props}>FundingExplanation</div>
}
