import ImageItem from '@/components/home/image'
import { KeyStrengthType, TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Button, ButtonProps, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'
import DotList from '../../../../components/dot'
import { Typography } from '@/elements'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { LabelKeyword } from '../../../../components/label'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'

type Props = {
  item: TTypesSA
  buttonProps?: ButtonProps
  sxBox?: SxProps<Theme>
  isHover?: boolean
  onRemove?: (item: TTypesSA) => void
  content?: React.ReactNode
  isSelected?: boolean
  type: KeyStrengthType
}

const CardItemStrength = ({
  item,
  buttonProps,
  sxBox,
  isHover = false,
  onRemove,
  content,
  isSelected,
  type
}: Props) => {
  const {
    palette: { home }
  } = useTheme()
  const isStrengthType = type === STRENGTH_TYPE.strength
  return (
    <Box
      component={'button'}
      type='button'
      sx={{
        position: 'relative',
        minWidth: remConvert('225px'),
        minHeight: remConvert('225px'),
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: remConvert('10px'),
        overflow: 'hidden',
        outline: 'none',
        border: 'none',
        backgroundColor: isStrengthType ? home.alpha_purple_10 : home.alpha_gray_50,
        '&:hover': {
          cursor: 'pointer',
          ...(isHover && {
            '& .remove_box': {
              display: 'flex'
            }
          })
        }
      }}
      {...buttonProps}
    >
      <ImageItem
        style={{
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          objectFit: 'cover',
          borderRadius: '10px',
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'brightness(32%)'
        }}
        isLoading={false}
        width={205}
        height={205}
        src={item.url}
        alt={item.strengthType}
      />
      <Box
        component={'div'}
        padding={remConvert('20px')}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          minWidth: remConvert('225px'),
          minHeight: remConvert('225px'),
          width: '100%',
          height: '100%',
          borderRadius: remConvert('10px'),
          zIndex: 10,
          overflow: 'hidden',
          border: `1px solid ${home.purple}`,
          backgroundColor: home.alpha_purple_10,
          ...sxBox
        }}
      >
        <Box
          py={remConvert('20px')}
          component={'div'}
          display={'flex'}
          flexDirection={'column'}
          gap={remConvert('10px')}
        >
          <Box alignItems={'start'} component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('4px')}>
            <DotList
              {...(!isStrengthType && {
                color: home.gray200
              })}
              number={Number(item.star)}
            />
            <Typography cate='sub_title_30' color={home.gray50}>
              {item.strengthType}
            </Typography>
          </Box>
          <TooltipTitle
            sxBox={{
              WebkitLineClamp: 4,
              textAlign: 'left',
              height: remConvert('80px')
            }}
            title={item.description}
          >
            <Typography color={home.gray50} cate='body_20'>
              {item.description}
            </Typography>
          </TooltipTitle>
          {LabelKeyword(item, type)}
        </Box>
      </Box>
      <Box
        component={'div'}
        className='remove_box'
        padding={remConvert('20px')}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          minWidth: remConvert('225px'),
          minHeight: remConvert('225px'),
          width: '100%',
          height: '100%',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: remConvert('10px'),
          zIndex: 20,
          overflow: 'hidden',
          border: `1px solid ${home.purple}`,
          backgroundColor: home.gray400,
          opacity: 0.8,
          transition: 'all 2s ease-out',
          ...sxBox
        }}
      >
        <Button
          onClick={() => onRemove?.(item)}
          sx={{
            borderRadius: remConvert('10px')
          }}
        >
          <Typography
            sx={{
              textShadow: '10px 10px rgba(0,0,0,0.2)'
            }}
            cate='title_50'
            color={home.gray50}
          >
            선택해제
          </Typography>
        </Button>
      </Box>
      {!isHover && content && (
        <Box
          component={'div'}
          className='remove_box'
          padding={remConvert('20px')}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            minWidth: remConvert('225px'),
            minHeight: remConvert('225px'),
            width: '100%',
            height: '100%',
            display: isSelected ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: remConvert('10px'),
            zIndex: 15,
            overflow: 'hidden',
            border: `1px solid ${home.purple}`,
            backgroundColor: home.gray400,
            opacity: 0.8,
            ...sxBox
          }}
        >
          {content}
        </Box>
      )}
    </Box>
  )
}

export default CardItemStrength
