import AuthWrapper from '@/layouts/auth-wrapper'
import { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <AuthWrapper>{children}</AuthWrapper>
}

export default MainLayout
