import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Title } from '../para-map'

const PaymentContent = () => {
  return (
    <Box>
      <Title>환불 정책</Title>
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
              <TableCell width={'30%'} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                콘텐츠 명
              </TableCell>
              <TableCell width={'70%'} align='center' sx={{ padding: 1.5, backgroundColor: '#2C2C34' }}>
                환불 정책
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                교육행사
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>2일 전 취소 시 100% 환불</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>행사전일 취소 시 70% 환불</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>행사 당일 취소 시 50% 환불</Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                멘토링
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>멘토의 승인을 통해 멘토링이 진행 중인 단계에서 환불 불가</Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                자격시험
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>
                      시험 응시 이력이 없는 경우 100% 환불 (시험지 페이지 조회 시, 테스트 응시 시도로 취급)
                    </Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>
                      교육 영상 수강 이력이 없는 경우 100% 환불 (교육 영상 페이지 조회 시, 조회로 취급)
                    </Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                프리미엄 월간 이용권
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>프로젝트 이용 히스토리가 없는 경우 3일 이내까지 100% 환불</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(32)
                    }}
                  >
                    <Typography cate='body_20'>프로젝트를 2개 이상 생성 시 이용으로 간주</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(32)
                    }}
                  >
                    <Typography cate='body_20'>유료 Deck을 포함하여 프로젝트 생성 시 이용으로 간주</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(32)
                    }}
                  >
                    <Typography cate='body_20'>유료 서비스 이용 시 (자료 실 등) 이용으로 간주</Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                프리미엄 연간 이용권
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>
                      결제일 기준 월간 이용권 금액을 사용일에 대해 차감한 금액 만큼 환불
                    </Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align='left'
                sx={{
                  borderRightColor: '#E5E5E5' + '!important'
                }}
              >
                강점 분석
              </TableCell>
              <TableCell align='left'>
                <ul>
                  <li
                    style={{
                      marginLeft: convertToRem(20)
                    }}
                  >
                    <Typography cate='body_20'>강점 분석 이용 히스토리가 없는 경우 3일 이내까지 100% 환불</Typography>
                  </li>
                  <li
                    style={{
                      marginLeft: convertToRem(32)
                    }}
                  >
                    <Typography cate='body_20'>강점 분석 결과 출력 이력이 있는 경우 이용으로 간주</Typography>
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography cate='body_30'>■ 프리미엄 이용권은 결제일부터 시작합니다.</Typography>
      <Typography cate='body_30'>
        ■ 회원이 이용권과 함께 제공되는 자료실의 프리미엄 파일을 다운로드하는 경우 프리미엄 이용권을 이용한 것으로
        간주합니다.
      </Typography>
      <Typography cate='body_30'>
        ■ 회사가 마케팅, 이벤트 등과 관련하여 무상으로 부여하는 추가 이용기간(보너스기간)은 환불에 영향을 미치지
        아니합니다.
      </Typography>
      <Typography cate='body_30'>■ 회사는 환불 시 금융거래수수료, 제세공과금 등을 공제할 수 있습니다.</Typography>
      <Typography cate='body_30'>
        ■ 회사는 회원이 관계 법령 또는 이용약관 등을 위반한 경우 이용약관 및 정책에 따라 환불을 거부할 수 있습니다.
      </Typography>
    </Box>
  )
}

export default PaymentContent
