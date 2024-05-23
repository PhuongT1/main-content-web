import Box from '@mui/material/Box'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { blue_dark_home, color_gray, color_orange, gray_dark_home, yellow_dark_home } from '@/themes/system-palette'
import moment from 'moment'
import { RoundedButton } from '@/elements/v2/button'
import Image from 'next/image'
import { ITradeClassification, ITradeCompany } from '@/types/trade.type'
import { useQuery } from '@tanstack/react-query'
import { getClasifications } from '@/services/trade.service'

const dataCart = [
  {
    id: 1,
    content: {
      thumbnail: {
        url: ''
      },
      classCategories: [
        { name: '8류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '12류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '25류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' }
      ],
      appicationDate: new Date(),
      brandHolder: '주식회사 메인콘텐츠',
      status: '출원'
    }
  },
  {
    id: 2,
    content: {
      thumbnail: {
        url: ''
      },
      classCategories: [
        { name: '8류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '12류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '25류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' }
      ],
      appicationDate: new Date(),
      brandHolder: '주식회사 메인콘텐츠',
      status: '출원'
    }
  },
  {
    id: 3,
    content: {
      thumbnail: {
        url: ''
      },
      classCategories: [
        { name: '8류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '12류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '25류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' }
      ],
      appicationDate: new Date(),
      brandHolder: '주식회사 메인콘텐츠',
      status: '출원'
    }
  },
  {
    id: 4,
    content: {
      thumbnail: {
        url: ''
      },
      classCategories: [
        { name: '8류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '12류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' },
        { name: '25류', tag: '서비스표', description: '교육업: 훈련제공업: 연예오락업: 스포츠 및 문화활동업' }
      ],
      appicationDate: new Date(),
      brandHolder: '주식회사 메인콘텐츠',
      status: '출원'
    }
  }
]

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 1.25,
    maxWidth: 335
    // border: '1px solid ' + gray_dark_home.gray300
  }
}))

export const TagDescription = ({ classificationCode }: any) => {
  const { data: tradeClassifications } = useQuery({
    queryKey: ['all-trade-classifications'],
    queryFn: async () => await getClasifications()
  })

  const tagData = tradeClassifications?.find((item: ITradeClassification) => item.id === classificationCode) || null

  return (
    <CustomTooltip
      title={
        <Stack gap={1} py={1.25} px={2.5} bgcolor={gray_dark_home.gray200} borderRadius={1.25}>
          <Box display='flex' gap={1} alignItems={'center'}>
            <Typography cate='button_3_semibold'>제 {classificationCode}류</Typography>
            <Box
              sx={{
                px: 1.25,
                py: 0.125,
                bgcolor: tagData?.type === '상표' ? blue_dark_home.blue500 : color_orange.home_500,
                color: gray_dark_home.gray500,
                borderRadius: 1000
              }}
            >
              {tagData?.type}
            </Box>
          </Box>
          <Typography cate='body_20'>{tagData?.contents}</Typography>
        </Stack>
      }
    >
      <RoundedButton
        btnSize='fit-no-padding'
        sx={{
          padding: '1px 10px !important',
          color: gray_dark_home.gray500,
          bgcolor: gray_dark_home.gray100,
          maxHeight: 'unset',
          width: 'fit-content',
          minWidth: 0
        }}
      >
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: 'fit-content',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical'
          }}
          cate='mandatory_10'
        >
          {classificationCode}류
        </Typography>
      </RoundedButton>
    </CustomTooltip>
  )
}

export const cardData = (data: ITradeCompany[]) =>
  data.map((item: ITradeCompany) => ({
    id: item.indexNo,
    content: (
      <>
        <Stack gap={2.5}>
          <Image src={item.drawing || ''} height={160} width={240} alt={''} />
          <Stack gap={1.25}>
            <Box display={'flex'} gap={1.25}>
              {!!item?.classificationCode && typeof item?.classificationCode === 'string' ? (
                item?.classificationCode?.split('|').map((item) => {
                  return <TagDescription key={Number(item)} classificationCode={Number(item)} />
                })
              ) : (
                <TagDescription
                  key={Number(item.classificationCode)}
                  classificationCode={Number(item.classificationCode)}
                />
              )}
            </Box>
            <Stack gap={1}>
              <Box display='flex' gap={1.875} alignItems={'center'}>
                <Typography cate='body_20' width={60} flexShrink={0} textAlign={'left'}>
                  출원일
                </Typography>
                <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                  {!!item?.applicationDate
                    ? moment(item?.applicationDate?.toString(), 'YYYYMMDD').format('YYYY.MM.DD')
                    : '-'}
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={60} flexShrink={0}>
                  상표권자
                </Typography>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical'
                  }}
                  cate='body_20'
                  width={'100%'}
                  textAlign={'left'}
                >
                  {item.regPrivilegeName}
                </Typography>
              </Box>
              <Box display='flex' gap={1.875} alignItems={'center'} textAlign={'left'}>
                <Typography cate='body_20' width={60} flexShrink={0}>
                  진행상태
                </Typography>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.125,
                    bgcolor: yellow_dark_home.yellow,
                    color: gray_dark_home.gray500,
                    borderRadius: 1000
                  }}
                >
                  <Typography>{item.applicationStatus}</Typography>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </>
    )
  }))
