'use client'
import { Typography } from '@/elements'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import React from 'react'
import { ICardMember } from '@/types/teambuilding/index.type'
import CardMember from '../../_components/card-member'
import styles from '../../teambuilding.module.scss'
import { ReactFlowProvider } from 'reactflow'
import DiagramsView from '../../step-list/step_04/view/diagram-view'
import { useLanguage } from '@/hooks/use-language'

const Layout_3_Teambuilding = ({ data }: { data: ICardMember[] }) => {
  const { dict } = useLanguage()
  return (
    <>
      <LayoutThreeIR
        sxContainer={{
          minHeight: remConvert('595px'),
          background: 'white',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        sxChildren={{
          display: 'flex',
          flexDirection: 'column',
        }}
        header={{ leftContent: 'TEAM', rightContent: 'SCHUMPETER PROGRAM' }}
      >
        <Typography
          cate='title_40'
          sx={{
            fontWeight: 700,
            color: '#000',
            textAlign: 'center',
            paddingTop: convertToRem(32)
          }}
        >
          {dict.teambuilding_ir_center_sub_title}
        </Typography>

        <Box
          className={styles.layout_03_teambuilding}
          sx={{
            px: convertToRem(38),
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
      </LayoutThreeIR>
      <LayoutThreeIR
        sxContainer={{
          minHeight: remConvert('595px'),
          background: 'white',
          overflow: 'hidden',
          mt: convertToRem(4),
          display: 'flex',
          flexDirection: 'column'
        }}
        header={{ leftContent: 'TEAM', rightContent: 'SCHUMPETER PROGRAM' }}
      >
        <Box
          component={'div'}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 0',
            padding: 0,
            position: 'relative'
          }}
        >
          <Typography
            cate='title_40'
            sx={{
              fontWeight: 700,
              color: '#000',
              textAlign: 'center',
              paddingTop: convertToRem(32)
            }}
          >
            {dict.teambuilding_ir_center_sub_title}
          </Typography>

          <Box
            className={styles.layout_03_teambuilding}
            component={'div'}
            sx={{
              display: 'flex',
              position: 'relative',
              my: 'auto',
              justifyContent: 'center',
              px: convertToRem(38),
              height: convertToRem(445)
            }}
          >
            <ReactFlowProvider>
              <DiagramsView />
            </ReactFlowProvider>
          </Box>
        </Box>
      </LayoutThreeIR>
    </>
  )
}

export default Layout_3_Teambuilding
