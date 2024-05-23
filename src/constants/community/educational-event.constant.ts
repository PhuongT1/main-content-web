export enum EVENT_STATUS {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  REMOVED = 'REMOVED'
}

export enum EVENT_STATUS_RECRUITMENT {
  WAITING = 'WAITING',
  PROGRESS = 'PROGRESS',
  FINISH = 'FINISH'
}

export enum EDUCATIONAL_EVENT_TYPE {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export enum EVENT_APPLICATION_NOTIFICATION {
  APPLICANT = 'APPLICANT',
  WAITING = 'WAITING',
  FULL = 'FULL'
}

export enum EVENT_APPLICATION_TYPE {
  APPLICANT = 'APPLICANT',
  WAITING = 'WAITING',
  CANCEL = 'CANCEL'
}

export const EDUCATIONAL_APPLY_TERMS = [
  {
    title: '만 14세 이상입니다.',
    content:
      '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
    required: true
  },
  {
    title: '개인정보 수집 동의',
    content:
      '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
    required: true
  },
  {
    title: '서비스 이용약관 동의',
    content:
      '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
    required: true
  },
  {
    title: '전자결제대행 이용 동의',
    content:
      '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
    required: true
  }
]

export enum VERIFY_STEP {
  WAITING_SEND_OTP = 'waitingSendOtp',
  WAITING_VERIFY_OTP = 'waitingVerifyOtp'
}
