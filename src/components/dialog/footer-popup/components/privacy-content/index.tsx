import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import ParagraphMap from '../para-map'

const PrivacyContent = () => {
  return (
    <Typography component={'div'} cate='body_3' plainColor='popup.general.subtitle'>
      (주)메인콘텐츠(이하 회사)는 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
      정보통신서비스 제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한
      개인정보처리방침을 정하여 회원 권익 보호에 최선을 다하고 있습니다.
      <br />
      <br />
      “회사”의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
      <br />
      <br />
      <ParagraphMap
        title='제 1조 개인정보 처리방침 및 개인정보 수집항목'
        list={[
          {
            title: '개인정보 처리 방침',
            child: [
              '회사에서 처리하고 있는 개인정보는 개인정보처리방침에 따라 처리되며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.'
            ]
          },
          {
            title: '개인정보 수집항목',
            child: []
          },
          {
            title:
              '① 회사는 회원가입, 원활한 고객상담, 멘토링, 콘텐츠 등의 각종 서비스의 제공을 위해 최초 회원가입 당시 아래와 같은 개인정보를 수집하고 있습니다.',
            child: [
              '목적 : 본인여부 확인, 멘토링 서비스 제공, 크라우드펀딩 연동, 유료콘텐츠 제공, 화상 채팅 연동, 민원처리',
              '항목 : 성명, 전화번호, 이메일, 비밀번호',
              '선택 수집항목 : 생년월일, 성별, 지역, 설문 항목별 내용',
              '개인정보 수집방법 : 홈페이지 (회원가입 및 회원정보 등록)',
              '보유기간 : 회원탈퇴 시까지'
            ],
            circle: true
          },
          {
            title: '② 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.',
            child: ['IP Address, 쿠키, 방문 일시, 서비스 이용기록, 불량 이용기록'],
            circle: true
          },
          {
            title:
              '③ 부가 서비스 및 맞춤식 서비스 이용 또는 이벤트 응모 과정에서 해당 서비스의 회원에 한해서만 아래와 같은 정보들이 수집될 수 있습니다.',
            child: ['개인정보 추가 수집에 대해 동의를 받는 경우'],
            circle: true
          },
          {
            title: '④ 유료 서비스 이용과정에서 아래와 같은 결제 정보들이 수집될 수 있습니다.',
            child: [
              '신용카드 결제 시 : 카드사명, 카드번호 등 결제 및 인증을 위한 정보',
              '휴대전화 결제 시 : 이동전화번호, 통신사, 결제승인번호 등 결제 및 인증을 위한 정보',
              '계좌이체 시 : 은행명, 계좌번호 등 결제 및 인증을 위한 정보',
              '쿠폰 이용 시 : 쿠폰 번호'
            ],
            circle: true
          },
          {
            title: '⑤ 이벤트 응모시',
            child: ['이벤트 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.'],
            circle: true
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 2조 개인정보 수집 방법 및 이용 목적'
        list={[
          {
            title: '개인정보 수집 방법',
            child: [
              '회원가입 시 약관에 동의하며 쿠키 사용을 포함한 데이터 정책을 읽고 이해하신 것으로 간주됩니다.“라는 문구 하에, 회사는 회원이 사이트 가입 시 개인정보보호정책과 이용약관의 각각의 내용에 동의한 것으로 봅니다.'
            ]
          },
          {
            title: '이용 목적',
            child: [
              <Box key={'para-1'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  개인정보란 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 주민등록번호 등의 사항에 의하여 당해
                  개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게
                  결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  회사는 귀하의 개인정보보호를 매우 중요시하며 “개인정보보호법”상의 개인정보보호규정을 준수하고
                  있습니다. 회사는 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로
                  이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  개인정보처리방침은 정부의 법령이나 지침의 변경, 또는 보다 나은 서비스의 제공을 위하여 그 내용이 변경될
                  수 있습니다. 이 경우 회사는 웹 사이트에서 공지사항에 이를 올리거나 이메일을 통해서 공지하고 있습니다
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  회사는 개인정보처리방침을 사이트 첫 화면 또는 첫 화면과의 연결화면을 통해 서비스에 가입한 사용자가
                  언제나 용이하게 보실 수 있도록 조치하고 있습니다
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  회사는 개인정보처리방침의 지속적인 개선을 위하여 개인정보처리방침을 개정하는데 필요한 절차를 정하고
                  있습니다
                </Typography>
              </Box>
            ]
          }
        ]}
      />
      <br />
      <ParagraphMap
        list={[
          {
            title: '① 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산',
            child: [
              '제반 서비스(모바일 웹/앱 포함)의 회원관리, 본인인증, 멘토링 등의 특정 맞춤 서비스 제공, 콘텐츠 제공, 제품 또는 청구서 등 발송, 구매 및 요금 결제, 요금추심'
            ],
            circle: true
          },
          {
            title: '② 회원관리',
            child: [
              '회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 불량회원(회사 이용약관 제20조 1항중 제11조 1항 1호~8호 위반사유로 인한 영구이용정지 및 2항에 따라 계약 해지된 영구이용정지 회원)의 부정 이용방지와 비인가 사용방지, 가입 의사 확인, 가입 및 가입 횟수 제한, 만 14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달'
            ],
            circle: true
          },
          {
            title: '③ 신규 서비스 개발 및 마케팅·광고에의 활용',
            child: [
              '신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 정보(정부지원사업 소식 등) 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속빈도 파악, 회원의 서비스이용에 대한 통계'
            ],
            circle: true
          },
          {
            title: '④ 콘텐츠 구현',
            child: ['서비스 활용 현황, 제 3자와의 커뮤니케이션 내용 등 서비스 이용 기록의 게시'],
            circle: true
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 3조 개인정보의 제공 및 위탁'
        list={[
          {
            title:
              '회사는 회원의 개인정보를 "제 2조 개인정보의 수집 방법 및 이용 목적"에서 고지한 범위 내에서 사용하며, 회원의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 회원의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.',
            child: [
              '회원이 사전에 공개에 동의한 경우',
              '법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우'
            ]
          },
          {
            title:
              '회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다. 회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.',
            child: []
          }
        ]}
      />
      <ParagraphMap
        content={
          <TableContainer
            component={Box}
            sx={{
              marginY: convertToRem(16)
            }}
          >
            <Table
              key={'table-1'}
              sx={{
                '& .MuiTableCell-root': {
                  border: '1px solid #333439',
                  verticalAlign: 'text-top'
                }
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell width={1} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                    위탁받는 자
                  </TableCell>
                  <TableCell width={1} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                    위탁하는 항목
                  </TableCell>
                  <TableCell width={1} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                    위탁받는 자의 이용목적
                  </TableCell>
                  <TableCell width={1} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                    보유 및 이용 기간
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell width={'20%'} align='left'>
                    브릭메이트
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    성명, 생년월일, 휴대폰 번호, 이메일
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    개발 및 보수 과정, 계정 오류 시
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    개발 및 보수 기간 내
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>토스페이먼츠(주)</TableCell>
                  <TableCell align='left'>
                    휴대폰 번호, 생년월일, 카드번호, 가상 카드번호, CVC, 유효기간, 패스워드, 기타 인증값
                  </TableCell>
                  <TableCell align='left'>서비스 결제 및 환불</TableCell>
                  <TableCell align='left'>업무 목적 달성까지</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>배송업체</TableCell>
                  <TableCell align='left'>성명, 생년월일, 휴대폰 번호, 이메일, 주소</TableCell>
                  <TableCell align='left'>상품의 배송 및 배송 추적</TableCell>
                  <TableCell align='left'>업무 목적 달성까지</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>
                    회원이 의뢰하는 <br /> 서비스 제공 주체
                  </TableCell>
                  <TableCell align='left'>성명, 생년월일, 휴대폰 번호, 이메일</TableCell>
                  <TableCell align='left'>서비스 진행 및 서비스 관련 마케팅</TableCell>
                  <TableCell align='left'>서비스 종료 후 1년간</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>이벤트 및 캠페인 진행 시</TableCell>
                  <TableCell align='left'>성명, 생년월일, 휴대폰 번호, 이메일</TableCell>
                  <TableCell align='left'>캠페인 진행 및 캠페인 관련 마케팅</TableCell>
                  <TableCell align='left'>이벤트 종료 후 1년 간</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
      3. 회사는 위탁 내용 및 위탁사의 변경이 있을 시 지체 없이 공개합니다.
      <Box
        sx={{
          height: convertToRem(40)
        }}
      />
      <ParagraphMap
        title='제 4조 개인정보의 보유 및 이용 기간'
        content='회원의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.'
        list={[
          {
            title: '회사 내부 방침에 의한 정보보유 사유',
            child: [
              <Box key={'제 4조 개인정보의 보유 및 이용 기간-1'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  부정이용기록
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  보존 목적 : 부정 이용 방지
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  보존 기간 : 1년
                </Typography>
              </Box>,
              <Box key={'제 4조 개인정보의 보유 및 이용 기간-2'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  로그인 ID, 결제기록
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  보존 목적 : 신용정보의 이용 및 보호에 관한 법률
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  보존 기간 : 3년
                </Typography>
              </Box>
            ]
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 5조 개인정보 파기절차 및 방법'
        content={
          <Box>
            <Typography cate='body_30' plainColor='main_grey.gray200'>
              회원의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 또 탈퇴 요청이
              있을 경우 최장 10일 이내에 탈퇴 처리와 함께 모든 개인 정보를 파기합니다.
            </Typography>
            <Typography cate='body_30' plainColor='main_grey.gray200'>
              회사의 개인정보 파기절차 및 방법은 다음과 같습니다.
            </Typography>
          </Box>
        }
        list={[
          {
            title: '파기절차',
            child: [
              '회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)일정 기간 저장된 후 파기됩니다.',
              '동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.'
            ]
          },
          {
            title: '파기방법',
            child: [
              '종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.',
              '전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.'
            ]
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 6조 회원 및 법정대리인의 권리와 의무'
        list={[
          {
            title:
              '회원 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수 있습니다.',
            child: []
          },
          {
            title: `회원 혹은 만 14세 미만 아동의 개인정보 조회, 수정을 위해서는 '개인정보변경'(또는 '회원정보수정' 등)을, 가입해지(동의철회)를 위해서는 ‘회원탈퇴’를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.`,
            child: []
          },
          {
            title: `혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치합니다.`,
            child: []
          },
          {
            title: `회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제 3자에게 지체 없이 통지하여 정정이 이루어지도록 합니다.`,
            child: []
          },
          {
            title: `회사는 회원 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "제 4조 개인정보의 보유 및 이용 기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리합니다.`,
            child: []
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 7조 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항'
        content={`회사는 개인화 서비스를 제공하기 위해서 회원의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 회원의 브라우저에게 보내는 아주 작은 텍스트 파일로 회원 컴퓨터의 하드디스크에 저장됩니다.`}
        list={[
          {
            title: '회사의 쿠키 운용',
            child: [
              '회원이 방문한 회사의 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 뉴스편집, 이용 규모, 인기 콘텐츠 사용 빈도 등을 파악하여 회원에게 최적화된 정보 제공을 위하여 사용합니다.',
              ''
            ]
          },
          {
            title: '쿠키의 설치/운영 및 거부',
            child: [
              '쿠키의 광고 식별자, 디바이스 ID를 적재해 기기별로 차별화된 정보를 제공',
              '회원과 비회원의 접속빈도 또는 머문 시간 등을 분석하여 이용자의 취향과 관심 분야를 파악하여 타켓 마케팅에 활용',
              '클릭한 정보들에 대한 세부정보와 관심 있게 둘러본 정보들에 대한 자취를 분석하여 다음 번 접속때 개인 맟춤 서비스를 제공',
              '회원들의 습관을 분석하여 서비스 개편 등의 척도로 이용'
            ]
          },
          {
            title: '쿠키설정 방법의 예',
            child: [
              'Chrome (https://support.google.com)',
              'Microsoft Edge (https://help.webex.com/)',
              'Firefox (https://support.mozilla.org)'
            ]
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 8조 개인정보의 기술적/관리적 보호 대책'
        content={`회사는 회원의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.`}
        list={[
          {
            title: '비밀번호 암호화',
            child: [
              '회사 회원 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.',
              ''
            ]
          },
          {
            title: '해킹 등에 대비한 대책',
            child: [
              '회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.',
              '개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 회원의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.',
              '침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.'
            ]
          },
          {
            title: '취급 직원의 최소화 및 교육',
            child: [
              '회사의 개인정보관련 취급 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 회사 개인정보처리방침의 준수를 항상 강조하고 있습니다.',
              ''
            ]
          },
          {
            title: '개인정보보호전담기구의 운영',
            child: [
              '사내 개인정보보호전담기구 등을 통하여 회사 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다. 단, 회원 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호, 주민등록번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.',
              ''
            ]
          }
        ]}
      />
      <br />
      <ParagraphMap
        title='제 9조 개인정보관리책임자 및 담당자의 연락처'
        content={
          <Box>
            <Typography cate='body_30' plainColor='main_grey.gray200'>
              귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은
              담당부서로 신고하실 수 있습니다. 회사는 회원의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
            </Typography>
            <Typography cate='body_30' plainColor='main_grey.gray200'>
              개인정보 관리책임자
            </Typography>
          </Box>
        }
      />
      <br />
      <Box>
        <Typography cate='body_3_semibold'>{`[고객센터]`}</Typography>
        <Typography cate='body_3_semibold'>이메일 : info@maincontents.com</Typography>
        <Typography cate='body_3_semibold'>전화번호 : 02-6409-0085</Typography>
      </Box>
      <br />
      <Box>
        <Typography cate='body_3_semibold'>{`기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하셔서 도움을 받을 수 있습니다.`}</Typography>
        <ul>
          <li
            style={{
              marginLeft: convertToRem(24)
            }}
          >
            <Typography cate='body_30'>개인정보침해신고센터 (www.118.or.kr / 118)</Typography>
          </li>
          <li
            style={{
              marginLeft: convertToRem(24)
            }}
          >
            <Typography cate='body_30'>정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)</Typography>
          </li>
          <li
            style={{
              marginLeft: convertToRem(24)
            }}
          >
            <Typography cate='body_30'>대검찰청 첨단범죄수사과 (www.spo.go.kr / 02-3480-2000)</Typography>
          </li>
          <li
            style={{
              marginLeft: convertToRem(24)
            }}
          >
            <Typography cate='body_30'>경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)</Typography>
          </li>
        </ul>
      </Box>
      <br />
      <ParagraphMap
        title='제 10조 기타'
        content={
          '회사에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "회사 개인정보처리방침"이 적용되지 않음을 알려 드립니다.'
        }
      />
      <br />
      <ParagraphMap
        title='제 11조 고지의 의무'
        list={[
          {
            title: `현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일 전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다.`,
            child: ['공고일자 : 2024년 3월 14일', '시행일자 : 2024년 3월 20일'],
            circle: true
          }
        ]}
      />
    </Typography>
  )
}

export default PrivacyContent
