import React from 'react'
import { Box, Button, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { DowloadButtonHeader } from '@/app/(main-routes)/project-home/_modules/presenters/components/project-detail/deck-list'
import { remConvert } from '@/utils/convert-to-rem'
import { iRPalette } from '@/atoms/home/stepper'
import { saveEditIR } from '@/services/edit-ir.service'
import Typography from '@/elements/typography'
import IRGroupIcon from '@/assets/icons/edit-ir/ir-group'
import ExpandIcon from '@/assets/icons/edit-ir/expand'
import IRDownloadIcon from '@/assets/icons/edit-ir/ir-download'

export interface IGroupButtonsIRDrawerProps {}

export default function GroupButtonsIRDrawer(props: IGroupButtonsIRDrawerProps) {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  const { primaryColorID, fontFamilyID, layoutSelected } = useRecoilValue(iRPalette)

  const saveEditIRMutate = useMutation({
    mutationFn: saveEditIR
  })

  // Save edit IR to DB.
  const handleSaveEditIR = async () => {
    const { data, error } = await saveEditIRMutate.mutateAsync({
      projectId: 48,
      colorId: primaryColorID,
      fontId: fontFamilyID,
      layout: layoutSelected
    })
  }

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: remConvert('12px')
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: remConvert('8px')
        }}
      >
        <Button
          sx={{
            width: remConvert('44px'),
            minWidth: remConvert('44px'),
            height: remConvert('44px'),
            borderRadius: remConvert(' 8px'),
            border: `1px solid ${home.blue500}`,
            background: home.gray400
          }}
          onClick={() => {}}
        >
          <ExpandIcon />
        </Button>

        <DowloadButtonHeader
          sx={{
            minWidth: remConvert('188px'),
            height: remConvert('44px'),
            padding: remConvert('18px 24px'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 0 0',
            gap: remConvert('6px'),
            borderRadius: remConvert('8px'),
            background: home.blue500,
            '.MuiButton-icon': { margin: 0 }
          }}
          onClick={() => {}}
          startIcon={<IRDownloadIcon pathProps={{ stroke: home.gray500 }} />}
          customTitle={
            <Typography cate='body_3_semibold' sx={{ color: home.gray500 }}>
              전체 다운로드
            </Typography>
          }
        />
      </Box>

      <DowloadButtonHeader
        sx={{
          width: '100%',
          height: remConvert('44px'),
          display: 'flex',
          padding: remConvert('18px 16px'),
          justifyContent: 'center',
          alignItems: 'center',
          gap: remConvert('6px'),
          alignSelf: 'stretch',
          borderRadius: remConvert('8px'),
          border: `1px solid ${home.blue500}`,
          background: home.alpha_blue_10,
          '.MuiButton-icon': { margin: 0 }
        }}
        onClick={() => handleSaveEditIR()}
        startIcon={<IRGroupIcon pathProps={{ stroke: home.blue500 }} />}
        customTitle={
          <Typography cate='body_3_semibold' sx={{ color: home.blue500 }}>
            IR deck 저장하기
          </Typography>
        }
      />
    </Box>
  )
}
