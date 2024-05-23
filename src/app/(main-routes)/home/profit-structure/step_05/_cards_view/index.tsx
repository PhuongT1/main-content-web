import { CSSProperties } from 'react'
import { Box, useTheme } from '@mui/material'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import { useGetDefaultCardsValue } from './../useData'
import { ShapeCircle, ShapeTriangle, ShapeSquare, DotLine } from './shapes'
import CardsViewText from './text'

interface ICardsView {
  data: IFormValuesTamSamSom | undefined
}
function CardsView({ data }: ICardsView) {
  const { palette } = useTheme()
  const { type: typeCard } = useGetDefaultCardsValue()

  // ====
  const sxDefault = { display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }
  const renderCardsView = () => {
    switch (data?.type) {
      case typeCard.TYPE_01:
        return (
          <Box display={'flex'} alignItems={'baseline'} gap={remConvert('20px')} justifyContent={'center'}>
            {[
              { size: '300px', color: palette.home.gray200, text: 'TAM', width: '200px' },
              { size: '200px', color: palette.home.gray50, text: 'SAM', width: '180px' },
              { size: '120px', color: palette.home.blue500, text: 'SOM', width: '120px' }
            ].map(({ size, color, text, width }, index) => (
              <Box key={text} sx={{ ...sxDefault }}>
                <ShapeCircle color={color} size={size} />
                <Typography cate='title_3_bold' color={palette.home.gray50}>
                  {text}
                </Typography>
                <DotLine />
                <CardsViewText item={data?.data?.[index]} sxBox={{ width }} />
              </Box>
            ))}
          </Box>
        )
      case typeCard.TYPE_02:
        return (
          <Box display='flex' justifyContent='center' position='relative' width={'100%'} alignItems={'center'}>
            <Box
              width={remConvert('402px')}
              height={remConvert('402px')}
              display={'flex'}
              position={'relative'}
              flexDirection={'column'}
              flex={1}
            >
              {[
                { size: '402px', color: palette.home.gray200, sxBox: {} },
                { size: '268px', color: palette.home.gray50, sxBox: { bottom: remConvert('24px') } },
                { size: '162px', color: palette.home.blue500, sxBox: { bottom: remConvert('48px') } }
              ].map(({ size, color, sxBox }, index) => (
                <Box key={index} sx={{ ...sxDefault }}>
                  <Box display='flex' justifyContent='center' position='absolute' sx={sxBox} gap={remConvert('64px')}>
                    <ShapeCircle color={color} size={size} />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box flex={1} position={'relative'} ml={'-36%'} top={'-6%'}>
              {[{ text: 'TAM' }, { text: 'SAM' }, { text: 'SOM' }].map(({ text }, index) => (
                <Box
                  key={index}
                  sx={{
                    ...sxDefault,
                    textAlign: 'left',
                    flexDirection: 'row',
                    gap: remConvert('20px'),
                    mb: remConvert('24px')
                  }}
                >
                  <Typography cate='title_3_bold' color={index === 0 ? palette.home.gray50 : palette.home.gray400}>
                    {text}
                  </Typography>
                  <DotLine type='horizontal' sxBox={{ flex: 1, mt: 0 }} />
                  <CardsViewText item={data?.data?.[index]} sxBox={{ width: '100%', marginTop: 0, flex: 2 }} />
                </Box>
              ))}
            </Box>
          </Box>
        )
      case typeCard.TYPE_03:
        return (
          <Box display={'flex'} alignItems={'end'} justifyContent={'center'}>
            {[
              {
                size: '216px',
                color: palette.home.gray200,
                text: 'TAM',
                heightLine: '44px',
                sxBoxCard: { width: '200px', textAlign: 'right', position: 'absolute', right: remConvert('-64px') },
                sxBoxShape: { mb: remConvert('44px'), '> p': { top: '-35px', left: '60%' } }
              },
              {
                size: '142px',
                color: palette.home.gray50,
                text: 'SAM',
                heightLine: '92px',
                sxBoxCard: { width: '180px', textAlign: 'center' },
                sxBoxShape: { mb: remConvert('32px'), '> p': { top: '-35px', left: '50%' } }
              },
              {
                size: '85px',
                color: palette.home.blue500,
                text: 'SOM',
                heightLine: '133px',
                sxBoxCard: { width: '200px', textAlign: 'left', position: 'absolute' },
                sxBoxShape: { mb: remConvert('20px'), '> p': { top: '-35px', left: '32%' } }
              }
            ].map(({ size, color, text, heightLine, sxBoxCard, sxBoxShape }, index) => (
              <Box key={text} sx={{ ...sxDefault }} ml={remConvert('0px')}>
                <ShapeSquare
                  color={color}
                  size={size}
                  text={text}
                  sxBox={{
                    transform: 'rotate(-45deg)',
                    ...sxBoxShape
                  }}
                />
                <DotLine sxBox={{ marginTop: remConvert('16px'), height: heightLine }} />
                <Box height={150} position='relative'>
                  <CardsViewText
                    item={data?.data?.[index]}
                    sxBox={{ ...(sxBoxCard as Record<string, CSSProperties>) }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )
      case typeCard.TYPE_04:
        return (
          <Box display={'flex'} alignItems={'baseline'} justifyContent={'center'}>
            {[
              {
                size: '300px',
                color: palette.home.gray200,
                text: 'TAM',
                sxBox: { width: '200px', textAlign: 'right', position: 'absolute', right: remConvert('-88px') }
              },
              {
                size: '200px',
                color: palette.home.gray50,
                text: 'SAM',
                sxBox: { width: '200px', textAlign: 'center' }
              },
              {
                size: '120px',
                color: palette.home.blue500,
                text: 'SOM',
                sxBox: { width: '200px', textAlign: 'left', position: 'absolute' }
              }
            ].map(({ size, color, text, sxBox }, index) => (
              <Box key={text} sx={{ ...sxDefault }} ml={remConvert('-18px')}>
                <ShapeTriangle
                  color={color}
                  size={size}
                  text={text}
                  sxBox={{
                    marginTop: remConvert('32px'),
                    '> p': { top: '-40px', left: '50%', transform: 'translate(-48%, 0px)' }
                  }}
                />
                <DotLine sxBox={{ marginTop: remConvert('16px') }} />
                <Box height={150} position='relative'>
                  <CardsViewText item={data?.data?.[index]} sxBox={{ ...(sxBox as Record<string, CSSProperties>) }} />
                </Box>
              </Box>
            ))}
          </Box>
        )
      case typeCard.TYPE_05:
        return (
          <Box display={'flex'} alignItems={'end'} justifyContent={'center'}>
            {[
              {
                size: '300px',
                color: palette.home.gray200,
                text: 'TAM',
                heightLine: '44px',
                sxBox: { width: '200px', textAlign: 'right', position: 'absolute', right: remConvert('-80px') }
              },
              {
                size: '200px',
                color: palette.home.gray50,
                text: 'SAM',
                heightLine: '92px',
                sxBox: { width: '180px', textAlign: 'center' }
              },
              {
                size: '120px',
                color: palette.home.blue500,
                text: 'SOM',
                heightLine: '132px',
                sxBox: { width: '200px', textAlign: 'left', position: 'absolute' }
              }
            ].map(({ size, color, text, heightLine, sxBox }, index) => (
              <Box key={text} sx={{ ...sxDefault }} ml={remConvert('-40px')}>
                <ShapeTriangle
                  color={color}
                  size={size}
                  text={text}
                  sxBox={{
                    marginTop: remConvert('32px'),
                    '> p': { top: '-22px', left: '14%', transform: 'rotate(30deg)' },
                    '> svg': { transform: 'rotate(90deg)' }
                  }}
                />
                <DotLine sxBox={{ marginTop: 0, height: heightLine }} />
                <Box height={150} position='relative'>
                  <CardsViewText item={data?.data?.[index]} sxBox={{ ...(sxBox as Record<string, CSSProperties>) }} />
                </Box>
              </Box>
            ))}
          </Box>
        )
      case typeCard.TYPE_06:
        return (
          <Box display='flex' justifyContent='center' position='relative' width={'100%'} alignItems={'center'}>
            <Box
              width={remConvert('402px')}
              height={remConvert('402px')}
              display={'flex'}
              position={'relative'}
              flexDirection={'column'}
              flex={1}
            >
              {[
                { size: '402px', color: palette.home.gray200, sxBox: {} },
                {
                  size: '268px',
                  color: palette.home.gray50,
                  sxBox: { bottom: remConvert('24px'), marginRight: remConvert('-80px') }
                },
                {
                  size: '160px',
                  color: palette.home.blue500,
                  sxBox: { bottom: remConvert('48px'), marginRight: remConvert('-132px') }
                }
              ].map(({ size, color, sxBox }, index) => (
                <Box key={index} sx={{ ...sxDefault }}>
                  <Box display='flex' justifyContent='center' position='absolute' sx={sxBox} gap={remConvert('64px')}>
                    <ShapeSquare color={color} size={size} />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box flex={1} position={'relative'} ml={'-31%'} top={'-5%'}>
              {[{ text: 'TAM' }, { text: 'SAM' }, { text: 'SOM' }].map(({ text }, index) => (
                <Box
                  key={index}
                  sx={{
                    ...sxDefault,
                    textAlign: 'left',
                    flexDirection: 'row',
                    gap: remConvert('20px'),
                    mb: remConvert('24px')
                  }}
                >
                  <Typography cate='title_3_bold' color={index === 0 ? palette.home.gray50 : palette.home.gray400}>
                    {text}
                  </Typography>
                  <DotLine type='horizontal' sxBox={{ flex: 1, mt: 0 }} />
                  <CardsViewText item={data?.data?.[index]} sxBox={{ width: '100%', marginTop: 0, flex: 2 }} />
                </Box>
              ))}
            </Box>
          </Box>
        )
      default:
        return <></>
    }
  }

  // ====
  return renderCardsView()
}

export default CardsView
