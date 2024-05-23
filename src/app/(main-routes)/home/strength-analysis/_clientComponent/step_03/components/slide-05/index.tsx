import banner from '@/assets/images/home/strength-analysis/sa_slide_05.png'
import { Box, Stack, useTheme } from '@mui/material'
import SlideWrapper, { SliderBaseProps } from '../slide-wrapper'
import { getStrenghtList } from '@/services/sa.service'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { TTypesSA } from '@/types/strength-analysis.type'
import { colors_slide_05, orderBaseKeywordMapping, slide_02_colors } from '@/constants/strength-analysis.constant'

type Props = {} & Omit<SliderBaseProps, 'children'>

export default function Slide5(props: Props) {
  const {
    palette: { home }
  } = useTheme()

  const { data, isLoading } = useQuery({
    queryKey: ['GET_STRENGTH'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: () => getStrenghtList()
  })

  return (
    <SlideWrapper sxBoxWrapper={{ padding: 0 }} {...props} indexSlider={4} src={banner}>
      <Box
        component={'div'}
        display={'flex'}
        flexDirection={'column'}
        padding={remConvert('50px 44px')}
        gap={remConvert('30px')}
        alignItems={'center'}
        overflow={'scroll'}
      >
        <Typography color={'#383B45'} cate='title_60' fontSize={30}>
          장점유형 설명
        </Typography>
        <Box component={'div'}>
          <>
            {orderBaseKeywordMapping.map((strength, index) => {
              const orderedStrength = data?.data?.filter((data) => strength.includes(data.strengthType)) ?? []
              return <ContentLayout key={index} items={orderedStrength} index={index} />
            })}
          </>
        </Box>
      </Box>
    </SlideWrapper>
  )
}

const ContentLayout = ({ items, index }: { items: TTypesSA[]; index: number }) => {
  const {
    palette: { home },
    breakpoints
  } = useTheme()
  return (
    <Box
      component={'div'}
      display={'flex'}
      alignItems={'start'}
      padding={remConvert('10px 5px')}
      bgcolor={colors_slide_05[index]}
    >
      <Box width={1}>
        {items.map((item, idx) => (
          <Box key={idx} component={'div'} display={'flex'} padding={remConvert('10px 15px')} gap={remConvert('30px')}>
            {idx === 0 ? (
              <Box
                display={'flex'}
                height={1}
                width={64}
                component={'div'}
                alignItems={'center'}
                justifyContent={'center'}
                alignSelf={'center'}
              >
                <Typography color={'#333439'} fontWeight={600}>
                  {index + 1} 순위
                </Typography>
              </Box>
            ) : (
              <Box width={64}></Box>
            )}

            <Box component={'div'} maxWidth={140}>
              <Typography
                sx={{
                  [breakpoints.up(1600)]: {
                    fontSize: remConvert('16px')
                  },
                  [breakpoints.down(1600)]: {
                    fontSize: remConvert('12px')
                  }
                }}
                cate='mandatory_10'
                fontWeight={600}
                color={'#333439'}
              >
                {item.strengthType}
              </Typography>
              <Stack direction={'row'} spacing={remConvert('5px')}>
                {item.keyword.split(',').map((kw) => (
                  <Box
                    key={kw}
                    sx={{
                      display: 'inline-block',
                      padding: remConvert('0 5px'),
                      backgroundColor: '#333439',
                      borderRadius: remConvert('5px'),
                      color: home.base_white,
                      fontWeight: 400,
                      lineHeight: '150%',
                      [breakpoints.up(1600)]: {
                        fontSize: remConvert('12px')
                      },
                      [breakpoints.down(1440)]: {
                        fontSize: remConvert('9px')
                      }
                    }}
                    component={'div'}
                  >
                    {kw}
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box component={'div'} flex={1}>
              <Typography
                cate='mandatory_10'
                sx={{
                  [breakpoints.up(1600)]: {
                    fontSize: remConvert('16px')
                  },
                  [breakpoints.down(1600)]: {
                    fontSize: remConvert('14px')
                  },
                  [breakpoints.down(1440)]: {
                    fontSize: remConvert('9px')
                  }
                }}
                color={'#333439'}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
