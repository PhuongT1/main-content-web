import { type HTMLAttributes, type JSX } from 'react'

interface CompanyFormProps extends HTMLAttributes<HTMLDivElement> {}

export function CompanyForm({ className, ...props }: CompanyFormProps): JSX.Element {
  return <div {...props}>CompanyForm</div>
}
