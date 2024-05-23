'use client'
import {
  formGroup1,
  formGroup2,
  formGroup3,
  formGroup4,
  formGroup5,
  formGroup6
} from '@/atoms/home/employment-contract'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, List, ListItem, ListProps, Stack, styled } from '@mui/material'

import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { TEXT_STYLE, UserTypes, UserTypesText, bgHightLight } from '../utils/constants'
import { EFlexibleWorkSystem, EOperationPeriod, EWorkingType, EmploymentType } from '../contractDetailsForm2'
import { ContractForm6 } from './form6'
import { ContractForm4 } from './form4'
import { ContractForm5 } from './form5'
import { ContractForm3 } from './form3'
import ContractForm2 from './form2'

export const ListItemStyled = styled(ListItem)(
  ({ theme }) =>
    `&::marker {
color: ${theme.palette.main_grey.gray700};
  }
  margin-left: 20px;
  padding: 0 20px 0 0;
  display: list-item;
  list-style: decimal;
    `
)

export const ListStyled = styled(List)<ListProps>(`
  display: flex;
  gap: 6px;
  flex-direction: column
`)

const Contract = () => {
  const [form1Data] = useRecoilState(formGroup1)
  const [form2Data] = useRecoilState(formGroup2)
  const [form3Data] = useRecoilState(formGroup3)
  const [form4Data] = useRecoilState(formGroup4)
  const [form5Data] = useRecoilState(formGroup5)
  const [form6Data] = useRecoilState(formGroup6)

  const userType = useMemo(() => {
    if (!form1Data) return null
    const data = form1Data.data
    switch (data.user) {
      case UserTypes.corporation:
        return UserTypesText.corporation
      case UserTypes.individualBusinessOwner:
        return UserTypesText.individualBusinessOwner
      case UserTypes.individual:
        return UserTypesText.individual
      default:
        return null
    }
  }, [form1Data])

  const userData = useMemo(() => {
    if (!form1Data) return null
    const data = form1Data.data
    switch (data.user) {
      case UserTypes.corporation:
        return [
          data.cooporation_name,
          data.cooporation_uniqueNumber,
          data.cooporation_companyCEO,
          data.cooporation_companyAddress,
          data.cooporation_companyPhoneNumber
        ]
      case UserTypes.individualBusinessOwner:
        return [
          data.individualBusinessOwner_name,
          data.individualBusinessOwner_uniqueNumber,
          data.individualBusinessOwner_companyCEO,
          data.individualBusinessOwner_companyAddress,
          data.individualBusinessOwner_companyPhoneNumber
        ]
      case UserTypes.individual:
        return [
          data.individual__name,
          data.individual_residentRegistrationNumber,
          '',
          data.individual_companyAddress,
          data.individual_companyPhoneNumber
        ]
    }
    return null
  }, [form1Data])

  const workerData = useMemo(() => {
    if (!form1Data) return []
    const data = form1Data.data
    return [data.worker, data.residentRegistrationNumber.replace(/(\*)+/g, ''), data.address, data.phoneNumber]
  }, [form1Data, userData])

  return (
    <Stack flexDirection={'column'} gap={3} padding={remConvert('60px')}>
      {/* SLOT FORM1 */}
      {/*END  SLOT FORM1 */}
      <Typography {...TEXT_STYLE.title} sx={{ textAlign: 'center' }}>
        근로계약서
      </Typography>
      {userType && userData && (
        <Typography
          {...TEXT_STYLE.body}
          style={{
            backgroundColor: 'rgba(0, 199, 190, 0.20)'
          }}
        >
          {userType === UserTypesText.corporation ? '주식회사 ' : ''}
          <Typography {...TEXT_STYLE.bodySemi}>{userData[0]}</Typography>
          (이하 ‘회사’)와 <Typography {...TEXT_STYLE.bodySemiHightlight}>{form1Data.data.worker}</Typography>
          (이하 ‘근로자’)은 상호 자유 의사에 따라 다음과 같이 근로계약(이하 ‘본 계약’)을 체결한다.
        </Typography>
      )}
      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (목적)</Typography>
        <Typography {...TEXT_STYLE.body}>
          본 계약은 ‘근로자’가 ‘회사’가 지정한 장소에서 지정된 업무를 수행하고, ‘회사’가 이에 대한 대가를 ‘근로자’에게
          지급하는 것을 근거로 한다. 이 계약은 양 당사자의 권리와 의무, 그리고 기타 관련 사항들을 분명하게 정의하고
          명시하는 것을 목적으로 한다.
        </Typography>
      </Stack>
      {/* SLOT FORM2 */}
      {form2Data && <ContractForm2 data={form2Data.data} />}
      {/* END SLOT FORM2 */}

      {/* SLOT FORM3 */}
      {form3Data && <ContractForm3 data={form3Data.data} />}
      {/* END SLOT FORM3 */}

      {/* SLOT FORM4 */}
      {form4Data && <ContractForm4 data={form4Data.data} />}
      {/* END SLOT FORM4 */}
      {/* SLOT FORM5 */}
      {form5Data && <ContractForm5 data={form5Data.data} />}
      {/* END SLOT FORM5 */}

      {/* SLOT FORM6 */}
      {form6Data && <ContractForm6 data={form6Data.data} />}
      {/* END SLOT FORM6 */}

      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (계약해지, 해고, 퇴직 등)</Typography>
        <ListStyled component='ol'>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자 또는 회사가 본 계약을 해지하기 원할 경우, 상대방에게 최소 30일 전에 서면으로 통지해야 한다. 다만,
              긴급한 상황이나 중대한 위반행위가 발생한 경우, 수습기간인 경우에는 예고 기간 없이 계약을 즉시 해지할 수
              있다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              회사와 근로자는 근로자의 신체적 또는 정신적 장애, 근로자의 업무지시 거부, 근로자의 법적분쟁 야기 및 회사의
              급여 미지급 등의 사유가 발생한 경우, 1개월의 기간 동안 시정을 요구하고 이 기간 내에 시정되지 않을 경우
              계약을 해지할 수 있다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자는 본 조에 의해 계약의 해지, 해고, 퇴직 등이 된 경우, 회사로부터 제공받은 자료와 자산을 즉시
              반환하여야 하며 이전 직위나 보직의 대외 표명이 금지되며 회사의 명예를 훼손하거나 재산상 손해를 입히는
              행위를 하여서는 아니된다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자는 본 조에 의해 계약의 해지, 해고, 퇴직 등이 된 경우, 자신의 업무에 대해 명호가한 인수인계를
              진행해야 하며 인수인계 과정에 필요한 협력을 성실하게 이행해야 한다.
            </Typography>
          </ListItemStyled>
        </ListStyled>
      </Stack>

      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무지)</Typography>
        <ListStyled component='ol'>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자 또는 회사가 본 계약을 해지하기 원할 경우, 상대방에게 최소 30일 전에 서면으로 통지해야 한다. 다만,
              긴급한 상황이나 중대한 위반행위가 발생한 경우, 수습기간인 경우에는 예고 기간 없이 계약을 즉시 해지할 수
              있다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              회사와 근로자는 근로자의 신체적 또는 정신적 장애, 근로자의 업무지시 거부, 근로자의 법적분쟁 야기 및 회사의
              급여 미지급 등의 사유가 발생한 경우, 1개월의 기간 동안 시정을 요구하고 이 기간 내에 시정되지 않을 경우
              계약을 해지할 수 있다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자는 본 조에 의해 계약의 해지, 해고, 퇴직 등이 된 경우, 회사로부터 제공받은 자료와 자산을 즉시
              반환하여야 하며 이전 직위나 보직의 대외 표명이 금지되며 회사의 명예를 훼손하거나 재산상 손해를 입히는
              행위를 하여서는 아니된다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자는 본 조에 의해 계약의 해지, 해고, 퇴직 등이 된 경우, 자신의 업무에 대해 명호가한 인수인계를
              진행해야 하며 인수인계 과정에 필요한 협력을 성실하게 이행해야 한다.
            </Typography>
          </ListItemStyled>
        </ListStyled>
      </Stack>

      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (비밀유지의무와 손해배상)</Typography>
        <ListStyled component='ol'>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자는 계약기간 동안 본인이 직접 또는 간접적으로 지득한 회사의 영업비밀을 보호할 의무가 있으며, 퇴직
              후라도 사용자의 사전 허가 없이 사용, 복제, 누설하여서는 아니된다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              근로자의 고의 또는 중대한 과실로 회사에 손해를 끼쳤을 경우 근로자는 그 손실액을 배상하여야 한다.
            </Typography>
          </ListItemStyled>
        </ListStyled>
      </Stack>

      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (분쟁해결)</Typography>
        <ListStyled component='ol'>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              본 계약에 대한 해석에 이견이 있거나 계약서에 명시되지 않은 사항이 발생할 경우, 양 당사자는 대한민국의 관련
              법령, 단체협약, 취업규칙 등을 기준으로 상호 협의하여 적극적으로 문제를 해결하기로 합의한다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>본 계약과 관련한 분쟁사항은 회사 소재지 법원의 관할에 따른다.</Typography>
          </ListItemStyled>
        </ListStyled>
      </Stack>

      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (근로계약서의 교부 등)</Typography>
        <ListStyled component='ol'>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              회사와 근로자는 본 계약의 유효성을 증명하기 위해 계약서를 작성하고 서명하거나 도장을 찍어, 각각 한 부씩
              보관한다.
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <Typography {...TEXT_STYLE.body}>
              본 계약이 전자서명을 통해 체결될 경우, 계약서의 작성, 서명 및 교부가 전자적 방법으로 이루어진 것에 대한
              효력을 인정하며, 이러한 절차에 대해 동의한 것으로 간주한다.
            </Typography>
          </ListItemStyled>
        </ListStyled>
      </Stack>
      <Stack gap={'6px'}>
        <Typography {...TEXT_STYLE.bodySemi}>제0조 (계약의 효력)</Typography>
        <Typography {...TEXT_STYLE.body}>
          본 계약은 계약 체결 이전에 회사와 근로자 간에 문서상이나 구두로 이루어진 모든 합의를 대체하며, 이에 우선하여
          적용된다.
        </Typography>
      </Stack>
      {form1Data ? (
        <Typography {...TEXT_STYLE.bodySemi} sx={{ textAlign: 'center' }}>
          {form1Data.data.contractDate}
        </Typography>
      ) : null}

      <Grid
        container
        rowSpacing={'10px'}
        style={{
          backgroundColor: 'rgba(0, 199, 190, 0.20)'
        }}
      >
        {userData?.length && (
          <>
            <Grid item xs={12}>
              <Typography {...TEXT_STYLE.bodySemi}>사용자</Typography>
            </Grid>

            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  법인명:
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>
                  {form1Data.data.user === UserTypes.corporation && '주식회사 '}
                  {userData[0]}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  고유번호 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{userData[1]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  대표이사 :
                </Typography>

                <Typography {...TEXT_STYLE.bodySmall}>{userData[2]} (서명 또는 인)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  회사주소 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{userData[3]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  전화번호 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{userData[4]}</Typography>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      <Grid
        container
        rowSpacing={'10px'}
        style={{
          backgroundColor: 'rgba(0, 199, 190, 0.20)'
        }}
      >
        {workerData?.length && (
          <>
            <Grid item xs={12}>
              <Typography {...TEXT_STYLE.bodySemi}>근로자</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  성명 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{workerData[0]} (서명 또는 인)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  주민등록번호 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{workerData[1]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  주소 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{workerData[2]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'row'}>
                <Typography width={'100px'} {...TEXT_STYLE.bodySemi}>
                  전화번호 :
                </Typography>
                <Typography {...TEXT_STYLE.bodySmall}>{workerData[3]}</Typography>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Stack>
  )
}

export default Contract
