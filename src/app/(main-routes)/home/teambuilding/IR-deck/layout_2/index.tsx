'use client'
import { Typography } from '@/elements'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { ICardMember } from '@/types/teambuilding/index.type'
import CardMember from '../../_components/card-member'
import styles from '../../teambuilding.module.scss'
import DiagramsView from '../../step-list/step_04/view/diagram-view'
import { ReactFlowProvider } from 'reactflow'
import { useLanguage } from '@/hooks/use-language'

const Layout_2_Teambuilding = ({ data }: { data: ICardMember[] }) => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const { dict } = useLanguage()

  return (
    <>
      <LayoutTwoIR
        sxContainer={{
          display: 'flex',
          minHeight: remConvert('595px'),
          background: 'white'
        }}
        sxChildren={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            height: '100%',
            padding: remConvert('40px 40px 80px'),
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            cate='caption_2_semibold'
            sx={{
              lineHeight: '150%',
              color: primaryColor
            }}
          >
            TEAM
          </Typography>
          <Typography cate='ir_16_bolder' color='#000'>
            {dict.teambuilding_ir_center_sub_title}
          </Typography>

          <Box
            className={styles.layout_02_teambuilding}
            component={'div'}
            sx={{
              display: 'flex',
              my: 'auto',
            }}
          >
            <Stack direction='row' justifyContent='center' flexWrap='wrap' gap={convertToRem(8)}>
              {data?.length === 7 ? (
                <>
                  <Stack direction='row' justifyContent='center' gap={convertToRem(8)}>
                    <CardMember direction='row' data={data[0]} />
                    <CardMember direction='row' data={data[1]} />
                  </Stack>
                  <Stack direction='row' justifyContent='center' gap={convertToRem(8)}>
                    <CardMember direction='row' data={data[2]} />
                    <CardMember direction='row' data={data[3]} />
                    <CardMember direction='row' data={data[4]} />
                  </Stack>
                  <Stack direction='row' justifyContent='center' gap={convertToRem(8)}>
                    <CardMember direction='row' data={data[5]} />
                    <CardMember direction='row' data={data[6]} />
                  </Stack>
                </>
              ) : (
                data.map((item, index) => (
                  <CardMember key={index} direction={data?.length < 5 ? 'column' : 'row'} data={item} />
                ))
              )}
            </Stack>
          </Box>
        </Box>
      </LayoutTwoIR>
      <LayoutTwoIR
        sxContainer={{
          display: 'flex',
          minHeight: remConvert('595px'),
          background: 'white',
          mt: convertToRem(4)
        }}
      >
        <Box
          component={'div'}
          sx={{
            padding: remConvert('40px'),
            pb: 0,
            height: '100%'
          }}
        >
          <Box
            component={'div'}
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              cate='caption_2_semibold'
              sx={{
                lineHeight: '150%',
                color: primaryColor
              }}
            >
              TEAM
            </Typography>
            <Typography cate='ir_16_bolder' color='#000'>
              {dict.teambuilding_ir_center_sub_title}
            </Typography>
            <Box
              className={styles.layout_02_teambuilding}
              component={'div'}
              sx={{
                px: convertToRem(30),
                my: 'auto',
                height: convertToRem(445),
                width: '100%'
              }}
            >
              <ReactFlowProvider>
                <DiagramsView />
              </ReactFlowProvider>
            </Box>
          </Box>
        </Box>
      </LayoutTwoIR>
    </>
  )
}

export default Layout_2_Teambuilding
