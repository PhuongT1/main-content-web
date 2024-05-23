import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Box, Stack, useTheme } from '@mui/material'
import { ResponsiveBox, RoundedSolidIconButton } from '@/elements'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { ChevronLeftSmIcon, ChevronRightSmIcon } from '@/assets/icons'
import { useIREditContext } from '@/app/edit-ir/utils/provider'
import { LIST_DECKS } from '@/app/edit-ir/_modules/constants'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Layout_IR_Teambuilding from '@/app/(main-routes)/home/teambuilding/IR-deck'
import Layout_IR_Idea from '@/app/(main-routes)/home/idea/IR-deck'
import Layout_IR_Naming from '@/app/(main-routes)/home/naming/IR-deck'
import Layout_IR_Slogan from '@/app/(main-routes)/home/slogan/IR-deck'
import Layout_IR_Swot from '@/app/(main-routes)/home/swot/IR-deck'
import Layout_IR_Customer from '@/app/(main-routes)/home/customer-service/IR-deck'
import Layout_IR_AdvMarketing from '@/app/(main-routes)/home/advertisement-marketing/IR-deck'

export interface IBodyMainContentProps {
  projectID: number
}

export default function BodyMainContent({ projectID }: IBodyMainContentProps) {
  const { projectDetail, deckSelected } = useIREditContext()
  const [currentItem, setCurrentItem] = useState(1)
  const theme = useTheme()
  const carouselRef = useRef<Carousel>(null)

  const decks = useMemo(() => projectDetail.decks || [], [projectDetail])

  const ViewIR = ({ IDDeckSelected }: { IDDeckSelected: number }) => {
    switch (IDDeckSelected) {
      case LIST_DECKS.teamBuilding.id:
        return <Layout_IR_Teambuilding />

      case LIST_DECKS.idea.id:
        return <Layout_IR_Idea />

      case LIST_DECKS.naming.id:
        return <Layout_IR_Naming />

      case LIST_DECKS.slogan.id:
        return <Layout_IR_Slogan id={projectID} />

      case LIST_DECKS.logo.id:
        return <></>

      case LIST_DECKS.competitorAnalysis.id:
        return <></>

      case LIST_DECKS.swot.id:
        return <Layout_IR_Swot />

      case LIST_DECKS.customerPersona.id:
        return <Layout_IR_Customer />

      case LIST_DECKS.estabilshmentOfStructure.id:
        return <></>

      case LIST_DECKS.prMarketing.id:
        return <Layout_IR_AdvMarketing />

      case LIST_DECKS.businessModel.id:
        return <></>

      default:
        return <></>
    }
  }

  return (
    <ResponsiveBox>
      <Carousel
        ref={carouselRef}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        showArrows={true} //false
        onChange={(current) => {
          setCurrentItem(Number(current) + 1)
        }}
      >
        {decks.map((item, index) => {
          return <ViewIR key={index} IDDeckSelected={deckSelected.id} />
        })}
      </Carousel>

      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} py={1} px={3} width={'100%'}>
        <RoundedSolidIconButton
          onClick={() => {
            carouselRef?.current?.onClickPrev()
          }}
          sx={{
            width: convertToRem(32),
            height: convertToRem(32),
            borderRadius: convertToRem(250),
            backgroundColor: theme.palette.main_grey.gray600,
            '&:hover': {
              backgroundColor: theme.palette.main_grey.gray600
            },
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          <ChevronLeftSmIcon svgProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 2 }} />
        </RoundedSolidIconButton>

        <Typography color={theme.palette.main_grey.gray300} cate='sub_title_40'>
          {/* {currentItem}/{item?.images?.length || 1} */}
          1/12
        </Typography>

        <RoundedSolidIconButton
          onClick={() => {
            carouselRef?.current?.onClickNext()
          }}
          sx={{
            width: convertToRem(32),
            height: convertToRem(32),
            borderRadius: convertToRem(250),
            backgroundColor: theme.palette.main_grey.gray600,
            '&:hover': {
              backgroundColor: theme.palette.main_grey.gray600
            },
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
        >
          <ChevronRightSmIcon svgProps={{ stroke: theme.palette.main_grey.gray100, strokeWidth: 2 }} />
        </RoundedSolidIconButton>
      </Stack>
    </ResponsiveBox>
  )
}
