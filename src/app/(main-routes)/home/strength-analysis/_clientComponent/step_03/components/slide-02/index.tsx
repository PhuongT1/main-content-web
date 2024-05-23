import banner from '@/assets/images/home/strength-analysis/sa_slide_02.png'
import { Box, Grid, useTheme } from '@mui/material'
import SlideWrapper, { SliderBaseProps } from '../slide-wrapper'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import DoughnutChartSlide_02 from './chart'
import runner from '@/assets/images/home/strength-analysis/slide_02_runner.png'

import Image from 'next/image'

type Props = {} & Omit<SliderBaseProps, 'children'>

export default function Slide2(props: Props) {
  const {
    palette: { home, main_grey }
  } = useTheme()

  return (
    <SlideWrapper {...props} indexSlider={1} src={banner}>
      <Box component={'div'} pb={remConvert('10px')} borderBottom={`1px solid ${main_grey.gray900}`}>
        <Typography color={home.base_black} cate='sub_title_10'>
          01. 장점유형 분석결과
        </Typography>
      </Box>
      <Box component={'div'} display={'flex'} mt={remConvert('40px')}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('32px')}>
              <Typography cate='body_3_semibold' fontWeight={500} color={home.base_black}>
                내가 생각하는 나의 강점은 <br />
                <b style={{ fontWeight: 700 }}>번개스피드 리더형 </b>
                인재입니다.
              </Typography>
              <Image src={runner} alt='runner' width={136} height={186} style={{ objectFit: 'contain' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <DoughnutChartSlide_02
              backgroundColor={['#DF9A3F', '#A9AAAB', '#A9AAAB', '#953272']}
              data={[1, 1, 1, 1]}
              labels={[]}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component={'div'} display={'flex'} gap={remConvert('16px')} mt={remConvert('40px')}>
        <Typography
          sx={{
            display: 'block'
          }}
          width={136}
          cate='title_60'
          fontWeight={500}
          fontSize={17}
          lineHeight={'150%'}
          mt={remConvert('16px')}
          color={home.base_black}
        >
          나를따르라 리더형 인재는 어떤 특징을 가지고 있을까요?
        </Typography>
        <Typography flex={1} color={home.base_black} fontSize={remConvert('10px')} fontWeight={400} lineHeight={'150%'}>
          나를따르라 리더형 인재는 강력한 리더십 특징을 지닌 개인을 나타내며, 이들은 조직 또는 팀을 이끄는 데 필수적인
          다양한 능력과 특성을 보유하고 있습니다. 이 유형의 리더는 먼저, 뚜렷한 비전과 목표를 가지고 있습니다. 미래의
          방향을 명확히 설정하고 이를 향해 단호하게 나아가며, 팀원들을 함께 이끌어 나갑니다. 이러한 비전은 조직 전체에
          원동력을 부여하고 목표를 향한 공동의 노력을 촉진합니다. 열정과 헌신도 나를따르라 리더의 중요한 특징 중
          하나입니다. 업무에 대한 열정과 헌신은 리더 자체뿐만 아니라 팀원들에게도 전염되어 긍정적인 분위기를 조성합니다.
          어려운 상황에서도 불굴의 의지로 도전하며, 팀을 이끌어 성공으로 이끄는 원동력이 됩니다. 이러한 리더는 탁월한
          의사소통 능력을 지닙니다. 자신의 생각과 비전을 명확하게 전달하고, 동시에 팀원들과의 원활한 소통을 통해 상황을
          파악하고 조율합니다. 팀원들과의 긴밀한 상호작용을 통해 협력을 촉진하며, 문제 발생 시 효과적인 해결책을
          모색합니다. 또한, 팀 빌딩 능력이 뛰어나며 동료들을 통솔하고 통제하면서도 그들의 강점을 살려 협업을 강화합니다.
          문제 해결에 대한 창의성과 효율성을 기르고, 팀원들에게 동기부여를 제공하여 목표 달성에 도움을 줍니다.
          마지막으로, 나를 따르라 리더는 자신의 행동에 대한 책임감을 지닙니다. 업무와 팀의 성과에 대한 책임을 느끼며,
          이를 통해 조직 전반의 성공을 위해 헌신하고 노력합니다. 이러한 종합적인 특징들을 통해 나를 따르라 리더는 팀이나
          조직을 안정적으로 이끌어 나가는 데 기여하며 성공적인 리더십을 발휘합니다.
        </Typography>
      </Box>
    </SlideWrapper>
  )
}
