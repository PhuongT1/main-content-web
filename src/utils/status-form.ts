import { StatusPartnershipAgreemen } from '@/constants/partnership-agreement'


export const handleGetStatusForm = (value: string, home: any) => {
  switch (value) {
    case StatusPartnershipAgreemen.INIT:
      return home.gray50
    case StatusPartnershipAgreemen.PROCESS:
      return home.orange500
    case StatusPartnershipAgreemen.DONE:
      return home.alpha_mint_10
  }
}
