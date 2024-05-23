'use client'
import { LayoutOneIR } from '@/components/home/layout-IR'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import { ICardMember } from '@/types/teambuilding/index.type'
import CardMember from '../../_components/card-member'
import styles from '../../teambuilding.module.scss'
import { ReactFlowProvider } from 'reactflow'
import DiagramsView from '../../step-list/step_04/view/diagram-view'
import { useLanguage } from '@/hooks/use-language'

const Layout_1_Teambuilding = ({ data }: { data: ICardMember[] }) => {
  const { dict } = useLanguage()

  return (<>
    <LayoutOneIR
      sxContainer={{
        paddingBottom: remConvert('70px'),
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        // minHeight: remConvert('595px')
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      header={{
        leftItem: {
          title: 'TEAM',
          subTitle: dict.teambuilding
        },
        centerItem: {
          title: dict.teambuilding,
          subTitle: dict.teambuilding_ir_center_sub_title
        }
      }}
    >
      <Box
        className={styles.layout_01_teambuilding}
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 0',
          my: 'auto'
        }}
      >

        <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={convertToRem(8)}>
          {data?.length === 7 ? <>
            <Stack direction="row" justifyContent="center" gap={convertToRem(8)}>
              <CardMember direction="row" data={data[0]} />
              <CardMember direction="row" data={data[1]} />
            </Stack>
            <Stack direction="row" justifyContent="center" gap={convertToRem(8)}>
              <CardMember direction="row" data={data[2]} />
              <CardMember direction="row" data={data[3]} />
              <CardMember direction="row" data={data[4]} />
            </Stack>
            <Stack direction="row" justifyContent="center" gap={convertToRem(8)}>
              <CardMember direction="row" data={data[5]} />
              <CardMember direction="row" data={data[6]} />
            </Stack>
          </> : data.map((item, index) => (<CardMember
            key={index}
            direction={data?.length < 5 ? 'column' : 'row'}
            data={item} />))}
        </Stack>
      </Box>
    </LayoutOneIR>
    <LayoutOneIR
      sxContainer={{
        // paddingBottom: remConvert('70px'),
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: remConvert('595px'),
        mt: convertToRem(4)
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      header={{
        leftItem: {
          title: 'TEAM',
          subTitle: dict.teambuilding
        },
        centerItem: {
          title: dict.teambuilding,
          subTitle: dict.teambuilding_ir_center_sub_title
        }
      }}
    >
      <Box
        className={styles.layout_01_teambuilding}
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 0',
          px: convertToRem(38),
          my: 'auto',
          height: convertToRem(445)
        }}
      >
        <ReactFlowProvider>
          <DiagramsView />
        </ReactFlowProvider>
      </Box>
    </LayoutOneIR>
  </>)
}

export default Layout_1_Teambuilding
