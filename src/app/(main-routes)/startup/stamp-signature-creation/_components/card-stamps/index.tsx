'use client'
import { getStamps, removeStamp } from '@/actions/apis/stamp.action'
import { ToolKitIcon } from '@/assets/icons'
import TrashIcon from '@/assets/icons/trash'
import { PaginationList } from '@/components'
import { TrashAlert } from '@/components/dialog'
import { RES_MESSAGE } from '@/constants/common.constant'
import { FONT_NAME } from '@/constants/startup/signature-stamp.constant'
import { IconButtonSizes, ResponsiveBox, SecondaryIconButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useLanguage } from '@/hooks/use-language'
import { StampListRecord } from '@/types/startup/signature-stamp.type'
import { loadFont } from '@/utils/font'
import { createFormData } from '@/utils/object'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DialogSection from './dialog-section'
import DownloadButton from './dialog-section/download-button'

const URL = '/fonts'

const FONTS = [
  {
    name: FONT_NAME.CHOSUN,
    url: `${URL}/signature/ChosunNm.ttf`
  },
  {
    name: FONT_NAME.DESIGN_HOUSE_LIGHT,
    url: `${URL}/signature/designhouseLight.ttf`
  },
  {
    name: FONT_NAME.MAPO_DACAPO,
    url: `${URL}/signature/MapoDacapo.otf`
  },
  {
    name: FONT_NAME.NANUM_BARUNPENR,
    url: `${URL}/signature/NANUMBARUNPENR.TTF`
  },
  {
    name: FONT_NAME.NANUM_MYEONGJO,
    url: `${URL}/signature/NANUMMYEONGJO.TTF`
  },
  {
    name: FONT_NAME.NANUM_SQUARE_NEO,
    url: `${URL}/signature/NanumSquareNeo-bRg.ttf`
  },
  {
    name: FONT_NAME.ONOTFR,
    url: `${URL}/signature/ONOTFR.otf`
  },
  {
    name: FONT_NAME.ONR,
    url: `${URL}/signature/ONR.ttf`
  },
  {
    name: FONT_NAME.SANG_SANG_SHIN,
    url: `${URL}/signature/SangSangShin.otf`
  },
  {
    name: FONT_NAME.SBL,
    url: `${URL}/signature/SBL.ttf`
  },
  {
    name: FONT_NAME.THE_FACE_SHOP,
    url: `${URL}/signature/THEFACESHOP-INKLIPQUID.ttf`
  },
  {
    name: FONT_NAME.UH_BEE_MIMI,
    url: `${URL}/signature/UhBeeMiMi.ttf`
  },
  {
    name: FONT_NAME.ONOTFB,
    url: `${URL}/stamp/ONOTFB.otf`
  },
  {
    name: FONT_NAME.ONB,
    url: `${URL}/stamp/ONB.ttf`
  },
  {
    name: FONT_NAME.HJB,
    url: `${URL}/stamp/HJB.otf`
  },
  {
    name: FONT_NAME.HJA,
    url: `${URL}/stamp/HJA.otf`
  }
]

const HEIGHT = 367
const MOBILE_HEIGHT = 212
const BG_COLOR = 'main_grey.gray800'

type CreateCardStampProps = {
  data: StampListRecord
  onDelete: (id: number) => void
}

const CardStamp = ({ data, onDelete }: CreateCardStampProps) => {
  const theme = useTheme()
  const { open, onClose, onOpen } = useDialog()
  const removeStampAct = useMutation({
    mutationFn: removeStamp,
    meta: {
      offLoading: true
    }
  })

  const onRemoveStamp = async () => {
    const removeFD = createFormData({
      id: data.id
    })
    const res = await removeStampAct.mutateAsync(removeFD)
    if (res.message === RES_MESSAGE.SUCCESS) {
      onDelete(data.id)
    }
  }

  useEffect(() => {
    const loadFonts = async () => {
      FONTS.forEach(async ({ name, url }) => await loadFont(name, url))
    }

    loadFonts()
  }, [])

  return (
    <ResponsiveBox
      height={HEIGHT}
      breakpoints={{
        md: {
          height: MOBILE_HEIGHT
        }
      }}
    >
      <ResponsiveBox
        display={'flex'}
        width={'100%'}
        height={'100%'}
        p={2.5}
        breakpoints={{
          md: { p: 2 }
        }}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={2.5}
        flexShrink={0}
        borderRadius={2.5}
        bgcolor={BG_COLOR}
      >
        <ResponsiveBox
          m={'auto'}
          height={160}
          width={160}
          breakpoints={{ md: { height: 124, width: 124 } }}
          alignSelf={'stretch'}
        >
          <Image
            alt='seal'
            width={239}
            height={239}
            style={{ height: '100%', width: '100%' }}
            src={data.image.baseUrl}
          />
        </ResponsiveBox>
        <ResponsiveBox
          mt={2.5}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          gap={1.25}
          breakpoints={{ md: { gap: 0.75, mt: 0 } }}
          alignSelf={'stretch'}
        >
          <ResponsiveBox height={48} width={'100%'} breakpoints={{ md: { height: 38 } }}>
            <DownloadButton url={data.image.baseUrl} name={data.image.name} />
          </ResponsiveBox>
          <ResponsiveBox flexShrink={0} height={48} width={48} breakpoints={{ md: { height: 38, width: 36 } }}>
            <SecondaryIconButton isLoading={removeStampAct.isPending} btnSize='full' action={onOpen}>
              <TrashIcon />
            </SecondaryIconButton>
          </ResponsiveBox>
        </ResponsiveBox>
      </ResponsiveBox>
      <TrashAlert
        title='삭제 하시겠습니까?'
        description='삭제 시 다시 복구되지 않습니다.'
        onCancel={onClose}
        onSubmit={() => {
          onClose()
          onRemoveStamp()
        }}
        open={open}
        submitTxt='삭제'
        cancelTxt='취소'
      />
    </ResponsiveBox>
  )
}

const CardStamps = () => {
  const [fetchedPage, setFetchedPage] = useState(1)
  const { dict } = useLanguage()
  const { open, onClose, onOpen } = useDialog()
  const { data: stampsRes, refetch } = useQuery({
    queryKey: ['stamp-list', fetchedPage],
    queryFn: () => {
      const getStampsFD = createFormData({
        page: fetchedPage,
        limit: 15,
        order: 'DESC'
      })
      return getStamps(getStampsFD)
    }
  })

  const onDeleteItem = () => {
    refetch()
  }

  const { result = [], metaData } = stampsRes?.data || {}

  return (
    <PaginationList
      itemWidth={316}
      gap={24}
      showPagination={result.length > 0}
      responsiveListProps={{ minBreakpoints: { md: [156, 8] } }}
      curPage={fetchedPage}
      totalPage={metaData?.totalPages}
      onPageChange={(page) => setFetchedPage(page)}
      emptyTxt='신청한 모집 공고가 없습니다.'
    >
      <ResponsiveBox
        // width={WIDTH}
        height={HEIGHT}
        breakpoints={{
          md: {
            height: MOBILE_HEIGHT
            // width: MOBILE_WIDTH
          }
        }}
      >
        <Box
          display={'flex'}
          height={'100%'}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1.25}
          flexShrink={0}
          borderRadius={2.5}
          bgcolor={BG_COLOR}
        >
          <IconButtonSizes btnSize='full' onClick={onOpen}>
            <Box>
              <Box textAlign={'center'}>
                <ToolKitIcon svgProps={{ height: 72, width: 72 }} />
              </Box>
              <Typography mt={2} cate='sub_title_40' plainColor='main_grey.gray100'>
                {dict?.startup?.stamp_signature_creation.create}
              </Typography>
            </Box>
          </IconButtonSizes>
          {open && (
            <DialogSection
              onClose={onClose}
              open={open}
              refetch={() => {
                refetch()
              }}
            />
          )}
        </Box>
      </ResponsiveBox>
      {result.map((i) => (
        <CardStamp key={i.id} data={i} onDelete={onDeleteItem} />
      ))}
    </PaginationList>
  )
}

export default CardStamps
