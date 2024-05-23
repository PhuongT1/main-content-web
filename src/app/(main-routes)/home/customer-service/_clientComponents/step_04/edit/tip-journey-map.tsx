import TipItem from '@/components/home/tip-item'
import { Box } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

const TipJourneyMap = () => {
  return (
    <Box component={'div'} mt={remConvert('20px')}>
      <TipItem
        content={
          <>
            저니맵(Journey Map)은 사용자 경험(UX) 디자인 및 마케팅 전략을 개발하고 개선하기 위한 강력한 도구로, 사용자가
            제품 또는 서비스를 경험하는 과정을 시각적으로 표현합니다. 이를 통해 사용자의 관점에서 제품 또는 서비스를
            살펴보고, 사용자의 요구를 파악하며, 개선할 수 있는 지점을 식별할 수 있습니다.
            <Box
              component={'ol'}
              style={{ paddingLeft: remConvert('20px') }}
              sx={{
                ul: {
                  li: {
                    listStyle: 'initial'
                  }
                }
              }}
            >
              <Box component={'li'}>동기 (Awareness) : 사용자 인식과 관심 유도, 초기 관심 유발</Box>
              <Box component={'ul'}>
                <Box component={'li'}>
                  동기 단계는 사용자 여정의 시작입니다. 사용자는 처음으로 제품이나 서비스에 대한 인식을 가지게 됩니다.
                </Box>
                <Box component={'li'}>
                  이 단계에서 사용자는 어떤 문제를 해결하거나 목표를 달성하기 위한 동기를 얻습니다.
                </Box>
              </Box>
              <Box component={'li'}>탐색 (Exploration) : 제품 또는 서비스에 대한 선택과 구체적인 이해 유도</Box>
              <Box component={'ul'}>
                <Box component={'li'}>탐색 단계에서 사용자는 더 많은 정보를 찾기 위해 더 깊이 탐구합니다.</Box>
                <Box component={'li'}>
                  제품 또는 서비스 옵션을 비교하고 다양한 리소스 및 채널을 활용하여 정보를 수집합니다.
                </Box>
              </Box>
              <Box component={'li'}>경험 (Experience) : 긍정적인 사용자 경험 제공 및 장기적인 만족도 유도</Box>
              <Box component={'ul'}>
                <Box component={'li'}>경험 단계에서 사용자는 제품 또는 서비스를 구매하고 처음으로 사용합니다.</Box>
                <Box component={'li'}>
                  이 때 사용자는 사용 중에 어떤 감정을 느끼는지, 어떤 문제 또는 어려움을 경험하는지 등을 평가하게
                  됩니다.
                </Box>
              </Box>
              <Box component={'li'}>달성 (Achievement) : 사용자 목표 달성과 성공 경험 지원</Box>
              <Box component={'ul'}>
                <Box component={'li'}>달성 단계에서 사용자는 목표를 달성하기 위해 제품 또는 서비스를 사용합니다.</Box>
                <Box component={'li'}>
                  피드백 (Feedback) : 사용자 의견 수집 및 지속적인 개선을 통한 고객 만족도 유지
                </Box>
              </Box>
              <Box component={'li'}>달성 (Achievement) : 사용자 목표 달성과 성공 경험 지원</Box>
              <Box component={'ul'}>
                <Box component={'li'}>피드백 단계에서는 사용자의 후속 행동과 피드백을 수집하고 분석합니다.</Box>
                <Box component={'li'}>
                  사용자의 의견, 리뷰, 평가, 불만족 사항 및 제안을 고려하여 제품 또 서비스를 개선하는 데 활용됩니다.
                </Box>
              </Box>
            </Box>
          </>
        }
      />
    </Box>
  )
}

export { TipJourneyMap }
