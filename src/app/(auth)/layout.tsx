import NonAuthWrapper from '@/layouts/non-auth-wrapper'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <NonAuthWrapper>{children}</NonAuthWrapper>
}

export default AuthLayout
