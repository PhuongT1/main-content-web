import { DeleteIcon, PlusIcon } from '@/assets/icons'
import { TooltipTitle } from '@/components/home/tooltip-item'
import { BaseChip, Divider, EllipsisText, Typography } from '@/elements'
import { Box, IconButton } from '@mui/material'
import { TSelectionBusinessListProps } from '../../types/business-model-canvas.type'
import SelectableCard from '../selectable-card'

const SelectionBusinessList = ({
  icon,
  title,
  selections,
  selectionBgColor,
  bgColor,
  isSelected,
  listHeight = 440,
  onClick,
  onDelete,
  isViewing,
  isErr,
  height = 560
}: TSelectionBusinessListProps) => {
  return (
    <SelectableCard
      slots={{
        cardActionAreaProps: {
          onClick: !isViewing ? onClick : undefined,
          disableTouchRipple: true,
          disableRipple: true,
          sx: { p: 2.5 }
        },
        cardProps: {
          sx: {
            height: height,
            minWidth: 140,
            borderStyle: 'none',
            '& .MuiCardActionArea-focusHighlight': {
              opacity: '0 !important'
            },
            border: `2px solid #191A1C`,
            ...(bgColor && {
              bgcolor: bgColor
            }),
            ...(isSelected && {
              bgcolor: 'rgba(60, 130, 249, 0.10)',
              border: '2px solid #3C82F9'
            }),
            '&:hover': {
              bgcolor: 'rgba(60, 130, 249, 0.10)',
              border: '2px solid #3C82F9'
            },
            ...(isErr && {
              border: '1px solid #FF3932'
            })
          }
        },
        cardContentProps: {
          sx: {
            p: 0
          }
        }
      }}
    >
      <Box>
        <Box display={'flex'} justifyContent={'center'} gap={1}>
          {icon}
          <Typography cate='body_3_semibold' plainColor='home.gray50'>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ my: 2, borderColor: 'home.gray200' }} />
        <Box>
          <Box
            sx={{
              height: listHeight,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflow: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            {selections?.length > 0 ? (
              selections?.map((i, idx) => (
                <TooltipTitle
                  key={idx}
                  sxBoxWrapper={{
                    flex: 0
                  }}
                  sxBox={{
                    display: 'flex'
                  }}
                  title={i.name}
                >
                  <BaseChip
                    sx={{
                      p: 1.5,
                      bgcolor: selectionBgColor,
                      height: 'fit-content',
                      justifyContent: 'flex-start',
                      width: '100%'
                    }}
                    borderStyle='rounded-10'
                    fullWidth
                    label={
                      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <EllipsisText ellipsisLine={1} plainColor='home.gray50' cate='body_3_semibold'>
                          {i.name}
                        </EllipsisText>
                        {!isViewing && (
                          <IconButton
                            sx={{
                              p: 0
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              onDelete(i)
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    }
                  />
                </TooltipTitle>
              ))
            ) : (
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1.5}
                height={'100%'}
                width={'100%'}
              >
                <PlusIcon />
                <Typography cate='body_3' plainColor='home.gray100'>
                  내용 추가
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </SelectableCard>
  )
}

export default SelectionBusinessList
