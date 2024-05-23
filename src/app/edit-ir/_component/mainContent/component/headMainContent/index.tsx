import React from 'react'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { DowloadButtonHeader } from '@/app/(main-routes)/project-home/_modules/presenters/components/project-detail/deck-list'
import Typography from '@/elements/typography'
import IRDownloadIcon from '@/assets/icons/edit-ir/ir-download'
import RefreshIcon from '@/assets/icons/refresh'

export interface IHeadMainContentProps {}

const HeadMainContent = (props: IHeadMainContentProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: remConvert('24px')
      }}
    >
      {/* Group titles */}
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: remConvert('8px'),
          flex: '1 0 0'
        }}
      >
        <Typography
          cate='title_5_semibold'
          sx={{
            color: home.gray50,
            fontStyle: 'normal'
          }}
        >
          IR Deck 편집하기
        </Typography>

        <Typography
          cate='body_3'
          sx={{
            color: home.gray100,
            fontStyle: 'normal'
          }}
        >
          타이틀 아래 &apos;서브 타이틀&apos; 은 수정 가능합니다.
        </Typography>
      </Box>

      {/* Group buttons. */}
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: remConvert('12px')
        }}
      >
        <DowloadButtonHeader
          sx={{
            width: '100%',
            minWidth: remConvert('105px'),
            height: remConvert('44px'),
            display: 'flex',
            padding: remConvert('18px 16px'),
            justifyContent: 'center',
            alignItems: 'center',
            gap: remConvert('6px'),
            borderRadius: remConvert('8px'),
            border: `1px solid ${home.blue500}`,
            background: home.alpha_blue_10,
            '.MuiButton-icon': { margin: 0 }
          }}
          onClick={() => {}}
          startIcon={<RefreshIcon pathProps={{ stroke: home.blue500 }} />}
          customTitle={
            <Typography cate='body_3_semibold' sx={{ color: home.blue500 }}>
              초기화
            </Typography>
          }
        />

        <DowloadButtonHeader
          sx={{
            minWidth: remConvert('165px'),
            height: remConvert('44px'),
            padding: remConvert('18px 24px'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: remConvert('6px'),
            borderRadius: remConvert('8px'),
            background: home.blue500,
            '.MuiButton-icon': { margin: 0 }
          }}
          onClick={() => {}}
          startIcon={<IRDownloadIcon pathProps={{ stroke: home.gray500 }} />}
          customTitle={
            <Typography cate='body_3_semibold' sx={{ color: home.gray500 }}>
              개별 다운로드
            </Typography>
          }
        />
      </Box>
    </Box>
  )
}

export default HeadMainContent
