import CloseCircleSmIcon from '@/assets/icons/close-circle-sm'
import { BlankUser } from '@/assets/images'
import { GhostButton, IconButtonSizes, Typography } from '@/elements'
import { Avatar, Box } from '@mui/material'
import { MouseEvent } from 'react'

type MiniRoleCardProps = {
  color: string
  name: string
  relatedInfos: string
  avatar?: string
  category: string
  onclick?: (e?: MouseEvent<HTMLButtonElement>) => void
  onclear?: (e?: MouseEvent<HTMLButtonElement>) => void
}
const MinRoleCard = ({ color, name, relatedInfos, category, avatar, onclick, onclear }: MiniRoleCardProps) => {
  return (
    <GhostButton
      component={'span'}
      btnSize='fit-no-padding'
      action={(e: any) => {
        onclick?.(e)
      }}
      sx={{ width: { xs: '100%', md: 'auto' } }}
    >
      <Box
        sx={{ width: { xs: '100%', md: 'auto' }, textAlign: 'left' }}
        display={'flex'}
        gap={2.5}
        position={'relative'}
        p={2}
        bgcolor={'main_grey.gray700'}
        borderRadius={4}
      >
        <IconButtonSizes
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={(e) => {
            e.stopPropagation()
            onclear?.(e)
          }}
        >
          <CloseCircleSmIcon pathProps={{ stroke: color }} svgProps={{ width: 20, height: 20 }} />
        </IconButtonSizes>
        <Avatar sx={{ height: 64, width: 64 }} src={avatar ? avatar : BlankUser.src} />
        <Box minWidth={130}>
          <Typography cate='title_60' plainColor='main_grey.gray100'>
            {name}
          </Typography>
          <Typography cate='body_20' plainColor='sub.teal400'>
            {relatedInfos}
          </Typography>
          <Typography cate='body_20' plainColor='main_grey.gray100'>
            {category}
          </Typography>
        </Box>
      </Box>
    </GhostButton>
  )
}

export default MinRoleCard
