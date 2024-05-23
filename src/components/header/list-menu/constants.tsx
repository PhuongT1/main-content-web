export interface MenuProps {
  name: string
  to: string
  icon?: JSX.Element
}

export const menus: MenuProps[] = [
  { name: '계정관리', to: '/me' },
  { name: '결제 관리', to: '/payment-management' },
  { name: '인재풀 관리', to: '/talent-pool' },
  { name: '팀빌딩 관리', to: '/team-building' },
  { name: '스타트업 토크 내역', to: '/startup-talk' },
  { name: '멘티 활동', to: '/mentee' },
  { name: '멘토 페이지', to: '/mentor' },
  { name: '교육신청 관리', to: '/education-application' },
  { name: '자격증 관리', to: '/certificate-management' },
  { name: '아이디어 경진대회', to: '/me' },
  { name: '크라우드 펀딩 현황', to: '/me' },
  { name: '강점 분석 관리', to: '/me' },
  { name: '환경설정', to: '/setting' }
]

/* { name: '계정관리', to: '/me', icon: <UserSmIcon /> },
  { name: '구매내역', to: '/community-management', icon: <CustomerManagementIcon /> },
  { name: '인재풀 관리', to: '/setting', icon: <SettingSmIcon /> }, */
